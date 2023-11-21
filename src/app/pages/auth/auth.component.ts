import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { jwtDecode } from "jwt-decode";

import { ToastrService } from 'ngx-toastr';
import { SpollersService } from 'src/app/services/spollers.service';
import { Router } from "@angular/router";
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})


export class AuthComponent {

  login: string = "emial@tirgoooo.uz"
  password: string = "password"
  error: boolean = false

  constructor(
    public authService: AuthService,
    public list: ListService,
    private app: AppComponent,
    private router: Router,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['orders']);
    }
    // if (!this.authService.isAuthenticated()) {
    //    this.router.navigate(['/registration']);
    // }
  }
  getLogin() {
    this.authService.loginAdmin(this.login, this.password).subscribe((res: any) => {
      if (res.success) {
        this.authService.setJwt(res.data.access_token);
        this.authService.setAdminJwt(res.data.admin_access_toke);
        this.router.navigate(['orders']);
        this.error = false
      } else {
        this.error = true
        this.toastr.error('Пользователь не найден')
      }
    })

  }
}
