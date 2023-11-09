import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { SpollersService } from 'src/app/services/spollers.service';
import {Router} from "@angular/router";

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss'],
})


export class AuthComponent {

   login: string = "Jamshid2"
   password: string = "37302078"
   error: boolean = false

   constructor(
      public authService: AuthService,
      private app: AppComponent,
      private router: Router,
      private toastr: ToastrService,
   ) {

   }

   ngOnInit() {
      if (this.authService.isAuthenticated()) {
         // this.router.navigate(['dashboard']);
      }
      // if (!this.authService.isAuthenticated()) {
      //    this.router.navigate(['registration']);
      // }
   }
   async getLogin() {
      const res = await this.authService.loginAdmin(this.login, this.password).toPromise();
      if (res) {
         await this.authService.setJwt(res.token);
         this.error = false
      } else {
         this.error = true
         this.toastr.error(res.error)
      }
   }
}
