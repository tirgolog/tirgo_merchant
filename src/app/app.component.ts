import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { documentActions } from "src/assets/scripts/document.actions";
import { AuthService } from "./services/auth.service";
import { HelperService } from "./services/helper.service";
import { ListService } from "./services/list.service";
import { SpollersService } from "./services/spollers.service";
import { SocketService } from "./services/socket.service";
import { ToastrService } from "ngx-toastr";
import { jwtDecode } from "jwt-decode";
import { SseService } from "./services/sse.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  host: { class: "wrapper" },
})
export class AppComponent implements AfterViewInit, OnDestroy {
  currentUser;
  constructor(
    public authService: AuthService,
    private router: Router,
    public spoller: SpollersService,
    public helper: HelperService,
    private socketService: SocketService,
    private toastr: ToastrService,
    public listService: ListService,
    private sseService: SseService,
    private ref: ChangeDetectorRef
  ) { }
  title = "tirgo-merchant";
  logo = "/assets/img/logo.svg";
  receivedData: any;
  private sseSubscription: Subscription;

  async ngOnInit() {
    if (localStorage.getItem("jwttirgomerhant")) {
      let curUser:any = jwtDecode(localStorage.getItem("jwttirgomerhant"));
      this.listService.getMerchantById(curUser.merchantId).subscribe((res) => {
        if (res.success) {
          this.currentUser = res.data;
          if(this.currentUser.completed) {
            this.socket();
            this.getAllOrders();
            this.getBalance();
          }
          else if(!this.currentUser?.completed && !this.currentUser?.verified) {
            this.router.navigate(["documents"]);
          }
        }
      })
    }
    this.spoller.initSpollers();
    this.authService.checkToken();
    if (this.authService.currentUser) {
      this.authService.globalLoading = false;
    } else {
      await this.router.navigate(["auth"]);
    }
    this.authService.authenticationState.subscribe(async (res) => {
      if (res) {
        // await this.checkSession();
        this.authService.globalLoading = false;
      } else {
        await this.router.navigate(["auth"]);
      }
    });
  }
  socket() {
    this.sseSubscription = this.sseService.getUpdates().subscribe(
      (data) => {
        if (localStorage.getItem("jwttirgomerhant")) {
          const user: any = jwtDecode(localStorage.getItem("jwttirgomerhant"));
          if (data.type == "update-balance") {
            this.getBalance();
          } else if (data.type == "transaction-verified") {
            if (this.currentUser.role.name === "Super admin") {
              this.listService.getFinanceByMerchant(this.currentUser.id).subscribe(
                (res) => {
                  if (res) {
                    this.getBalance();
                    this.helper.transactions_type = res.data;
                  }
                },
                (error) => {
                  this.toastr.error(error.message);
                }
              );
            } else {
              this.listService.getTransactionsByUser(user.sub).subscribe(
                (res) => {
                  if (res) {
                    this.helper.transactions_type = res.data;
                  }
                },
                (error) => {
                  this.toastr.error(error.message);
                }
              );
            }
          } else if (
            data.type == "driver-finish" ||
            data.type == "driver-offer"
          ) {
            this.getAllOrders();
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  disconnect() {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }
  getBalance() {
    if (localStorage.getItem("jwttirgomerhant")) {
      const user: any = jwtDecode(localStorage.getItem("jwttirgomerhant"));
      this.listService.getBalanceMerchant(this.currentUser.id).subscribe((res) => {
        if (res.success) {
          this.helper.merchantBalance.activeBalance = res.data.activeBalance;
          this.helper.merchantBalance.frozenBalance = res.data.frozenBalance;
          this.ref.detectChanges();
        }
      });
    }
  }
  ngAfterViewInit() {
    if (localStorage.getItem("jwttirgomerhant")) {
      this.currentUser = jwtDecode(localStorage.getItem("jwttirgomerhant"));
    }
    documentActions();
    this.spoller.initSpollers();
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if (position) {
            console.log(
              "Latitude: " +
              position.coords.latitude +
              "Longitude: " +
              position.coords.longitude
            );
            this.helper.lat = position.coords.latitude;
            this.helper.lng = position.coords.longitude;
            console.log(this.helper.lat);
            console.log(this.helper.lat);
          }
        },
        (error: any) => console.log(error)
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  ngOnDestroy() {
    this.disconnect();
  }
  getAllOrders() {
    if (localStorage.getItem("jwttirgomerhant")) {
      this.listService.getOrdersByMerchant(this.currentUser.id).subscribe(
        (res: any) => {
          if (res) {
            this.helper.orders = res.data;
            this.ref.detectChanges();
          }
        },
        (error) => {
          this.toastr.error(error.message);
        }
      );
    }
  }
}
