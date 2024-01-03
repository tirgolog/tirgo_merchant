import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { ListService } from 'src/app/services/list.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
   selector: 'app-profile',
   templateUrl: './profile.component.html',
   styleUrls: ['./profile.component.scss'],
   host: { "id": "main" }
})
export class ProfileComponent {

   currentPassword: string = ""
   newPassword: string = ""
   repeatNewPassword: string = ""
   currentUser

   constructor(
      public authService: AuthService,
      private toastr: ToastrService,
      private list: ListService,
      private router: Router
   ) {
      this.currentUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));
   }

   async changePassword() {
      this.list.changePassword({password: this.currentPassword, newPassword:this.newPassword , id:this.currentUser.sub}).subscribe((res) => {
         if(res.success) {
            this.toastr.success('Пароль успешно обновлен');
            this.router.navigate(['/orders'])
         }
      })

      // const res = await this.authService.changePassword(this.currentPassword, this.newPassword).toPromise()
      // if (res.status) {
      //    this.toastr.success("Пароль успешно изменён")
      //    this.currentPassword = ""
      //    this.newPassword = ""
      //    this.repeatNewPassword = ""
      // } else {
      //    this.toastr.error(res.error)
      // }
   }

}
