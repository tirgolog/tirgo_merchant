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

  login: string = "admin"
  password: string = "admin"
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
    //    this.router.navigate(['users']);
    // }
  }
  async getLogin() {
    const res = await this.authService.loginAdmin(this.login, this.password).toPromise();
    if (res) {
      await this.authService.setJwt(res.access_token);
      this.error = false
    } else {
      this.error = true
      this.toastr.error(res.error)
    }
  }
}
