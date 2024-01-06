import { Component } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { SpollersService } from "src/app/services/spollers.service";
import { Router } from "@angular/router";
import { ListService } from "src/app/services/list.service";
import { jwtDecode } from "jwt-decode";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent {
  currentUser:any;
  login: string = "";
  password: string = "";
  error: boolean = false;
  showForgotPassword: boolean = false;
  showPassword: boolean = false;
  loading:boolean = false;
  constructor(
    public authService: AuthService,
    public list: ListService,
    private app: AppComponent,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("jwttirgomerhant")) {
      let curUser = jwtDecode(localStorage.getItem("jwttirgomerhant"));
      this.list.getMerchantById(curUser.sub).subscribe((res) => {
        if (res.success) {
          this.currentUser = res.data;
        }
      })
    }
    
    // this.router.navigate(['forgot-password']); 
    if (this.authService.isAuthenticated()) {
      if(this.currentUser?.completed) {
        this.router.navigate(["orders"]);
      }
      else {
        this.router.navigate(["documents"]);
      }
    }
    // if (!this.authService.isAuthenticated()) {
    //    this.router.navigate(['/registration']);
    // }
  }
  getLogin() {
    this.authService
      .loginAdmin(this.login, this.password)
      .subscribe((res: any) => {
        if (res.success) {
          this.authService.setJwt(res.data.access_token);
          this.authService.setAdminJwt(res.data.admin_access_toke);
          this.router.navigate(["orders"]);
          this.error = false;
        } else {
          this.error = true;
          this.toastr.error("Пользователь не найден");
        }
      });
  }
  sendEmail() {
    this.loading = true;
    this.authService.sendEmail({ email: this.login }).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastr.success("Sms-код будет отправлен на вашу электронную почту");
          this.router.navigate(["forgot-password",this.login]);
          this.loading = false;
        }
        else if(res.errors[0] == "Create data failed") {
          this.toastr.error("Адрес электронной почты не найден");
          this.loading = false;
        }
      },
      (error) => {
        if (error.error.message == "email must be an email") {
          this.toastr.error("Должен быть электронный почта");
          this.loading = false;
        }
      }
    );
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
