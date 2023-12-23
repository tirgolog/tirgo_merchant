import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { GridOptions } from "ag-grid-community";
import { SpollersService } from "src/app/services/spollers.service";
import { OrderComponent } from "../order/order.component";
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { SocketService } from "../../services/socket.service";
import { ListService } from "../../services/list.service";
import { jwtDecode } from "jwt-decode";
import { CreateorderComponent } from "../createorder/createorder.component";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { SseService } from "src/app/services/sse.service";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  host: { id: "main" },
})
export class OrdersComponent {
  dataSource = new MatTableDataSource<any>([]); 
  @ViewChild(MatSort) sort: MatSort;

  id: string = "";
  id_client: string = "";
  from_city: string = "";
  to_city: string = "";
  dateCreate: string = "";
  dateSend: string = "";
  price: string = "";
  status: string = "all";
  saveorder: string = "all";
  typetransport: string = "";
  typecargo: string = "";
  currentUser;
  sizespage = [50, 100, 200, 500, 1000, 5000];
  gridOptions: any;
  items: any[] = [];
  orders: any;
  private sseSubscription: Subscription;
  constructor(
    public dialog: MatDialog,
    public spoller: SpollersService,
    public helper: HelperService,
    private route: ActivatedRoute,
    private socketService: SocketService,
    public listService: ListService,
    public authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private sseService: SseService,
    private _liveAnnouncer: LiveAnnouncer,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.currentUser = jwtDecode(localStorage.getItem("jwttirgomerhant"));
    if (+this.route.snapshot.paramMap.get("status") === 100) {
      this.status = "all";
    } else {
      this.status = this.route.snapshot.paramMap.get("status");
    }
    this.getAllOrders();
    // this.helper.global_loading = true;
    this.spoller.initSpollers();
    this.gridOptions = <GridOptions>{};
    this.gridOptions.localeText = this.helper.localeTextAgGrid;
    this.gridOptions.suppressScrollOnNewData = true;
    this.gridOptions.headerHeight = 75;
    // this.socketService.updateAllList().subscribe(async (res: any) => {
    // })

    //   this.sseSubscription = this.sseService.getUpdates().subscribe(
    //     (data) => {
    //       if(data.type == 'driver-finish' || data.type == 'driver-offer') {
    //         this.getAllOrders();
    //       }
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
  }

  ngOnChanges()	 {
    this.dataSource.data = this.helper.orders
    this.ref.detectChanges();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;    
    this.spoller.initSpollers();
  }
  getAllOrders() {
    this.listService.getOrdersByMerchant(this.currentUser.merchantId).subscribe(
      (res: any) => {
        if (res) {
          this.spinner.hide();
          this.helper.orders = res.data;
          this.dataSource.data = this.helper.orders; 
          this.ref.detectChanges();
        }
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.message);
      }
    );
  }
  openCreateOrder(): void {
    const dialogRef = this.dialog.open(CreateorderComponent, {
      width: "90%",
      height: "80%",
      panelClass: "custom-dialog-class",
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllOrders();
    });
  }
  viewOrder(ev: any) {
    const isActionButton = (event.target as HTMLElement).classList.contains(
      "btn-green"
    );
    if (!isActionButton) {
      const dialogRef = this.dialog.open(OrderComponent, {
        width: "90%",
        height: "80%",
        panelClass: "custom-dialog-class",
        data: ev,
      });
    }
  }
  statusOrderCheck(params) {
    switch (params) {
      case 0:
        return "Ожидающий";
      case 1:
        return "Выполняется";
      case 2:
        return "Выполнен";
      case 3:
        return "Завершен";
      case 4:
        return "Отменен";
      default:
        return "Не определен";
    }
  }
  returnClassStatusOrder(params) {
    switch (params) {
      case 0:
        return "status-order-blue";
      case 1:
        return "status-order-yellow";
      case 2:
        return "status-order-green";
      case 3:
        return "status-order-info";
      case 4:
        return "status-order-red";
      default:
        return "status-order";
    }
  }
  transportTypeFind(ev) {
    this.typetransport = ev.target.value;
  }
  cargoTypeFind(ev) {
    this.typecargo = ev.target.value;
  }
  statusFind(ev) {
    this.status = ev.target.value;
  }
  saveOrder(ev) {
    this.saveorder = ev.target.value;
  }
  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize;
    this.listService
      .getOrdersByMerchant(this.currentUser.merchantId)
      .subscribe((res: any) => {
        if (res.success) {
          this.helper.orders = res.data;
          this.helper.orders_count = res.data_count;
          this.helper.global_loading = false;
        }
      });
    console.log(e);
    console.log(e.pageIndex);
    console.log(e.pageSize);
  }
  async onScroll() {
    let neworders = await this.listService
      .getAllOrders(
        this.helper.orders.length,
        50,
        this.id,
        this.id_client,
        this.from_city,
        this.to_city,
        this.status !== "all" ? this.status : null,
        this.typecargo !== "all" ? this.typecargo : null,
        this.typetransport !== "all" ? this.typetransport : null,
        this.price,
        this.dateCreate,
        this.dateSend,
        this.saveorder !== "all" ? this.saveorder : null
      )
      .toPromise();
    this.helper.orders = this.helper.orders.concat(...neworders.data);
    this.helper.orders_count = neworders.data_count;
  }
  async filterList() {
    this.helper.isLoading = true;
    let neworders = await this.listService
      .getAllOrders(
        0,
        50,
        this.id,
        this.id_client,
        this.from_city,
        this.to_city,
        this.status !== "all" ? this.status : null,
        this.typecargo !== "all" ? this.typecargo : null,
        this.typetransport !== "all" ? this.typetransport : null,
        this.price,
        this.dateCreate,
        this.dateSend,
        this.saveorder !== "all" ? this.saveorder : null
      )
      .toPromise();
    this.helper.orders = neworders.data;
    this.helper.orders_count = neworders.data_count;
    this.helper.isLoading = false;
  }
  async filterClear() {
    this.helper.isLoading = true;
    let neworders = await this.listService
      .getAllOrders(
        0,
        50,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      )
      .toPromise();
    this.helper.orders = neworders.data;
    this.helper.orders_count = neworders.data_count;
    this.helper.isLoading = false;
  }
  orderFinished(item) {
    this.authService.finishOrder(item).subscribe(
      (res: any) => {
        if (res) {
          this.toastr.success("Заказ завершен");
          this.getAllOrders();
        }
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}