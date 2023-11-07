import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { ToastrService } from 'ngx-toastr';

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


   constructor(
      public authService: AuthService,
      private toastr: ToastrService,
   ) {

   }

   async changePassword() {
      const res = await this.authService.changePassword(this.currentPassword, this.newPassword).toPromise()
      if (res.status) {
         this.toastr.success("Пароль успешно изменён")
         this.currentPassword = ""
         this.newPassword = ""
         this.repeatNewPassword = ""
      } else {
         this.toastr.error(res.error)
      }
   }

}
