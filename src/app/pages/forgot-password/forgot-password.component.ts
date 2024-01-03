import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Route, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription, filter, takeUntil } from "rxjs";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  codeEntered: boolean = false;
  loading: boolean = false;
  showChangePasswordModal: boolean = false;
  login: any;
  code: any;

  newPassword: any;
  repeatPassword: any;

  showNewPassword: boolean = false;
  showRepeatPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params) => {
      this.login = params["login"];
    });
  }

  onCodeChanged(code: string) {
    code.length == 6 ? (this.codeEntered = true) : (this.codeEntered = false);
    this.code = code;
  }

  onCodeCompleted(code: string) {
    this.codeEntered = true;
  }

  codeCompleted() {
    this.loading = true;
    this.authService.emailVerify({email: this.login,code: +this.code}).subscribe((res:any) => {
      if(res.success) {
        this.showChangePasswordModal = true;
        this.loading = false;
      }
      else if (!res.success && res.errors[0] === 'Code is Invalid') {
        this.loading = false;
        this.toastr.success("Неверный код");
      }
    },error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }

  resetPassword() {
    this.loading = true;
    if (this.newPassword == this.repeatPassword) {
      this.authService
        .resetPassword({ email: this.login, password: this.newPassword })
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.loading = false;
              this.toastr.success("Пароль успешно обновлен");
              this.router.navigate(['auth']);
            } 
            else if (!res.success) {
              this.loading = false;
              this.toastr.success("Fail");
            }
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.message);
          }
        );
    } else {
      this.loading = false;
      this.toastr.error("Пароль не совпадает");
    }
  }

  toggleShowNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleShowRepeatPassword() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }
}
