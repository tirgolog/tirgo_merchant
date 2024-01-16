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
  loading:boolean = false;
  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private list: ListService,
    private router: Router
  ) {
    this.currentUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));
  }

  async changePassword() {
    this.loading = true;
    if (this.currentPassword && this.newPassword) {
      this.list.changePassword({ password: this.currentPassword, newPassword: this.newPassword, id: this.currentUser.sub }).subscribe((res) => {
        if (res.success) {
          this.loading = false;
          this.toastr.success('Пароль успешно обновлен');
          this.router.navigate(['/orders'])
        }
        else if(!res.success && res.errors[0] == 'Old password is invalid') {
          this.loading = false;
          this.toastr.error('Старый пароль неверен');
        }
      },error => {
        this.loading = false;
        this.toastr.error('Что то пошло не так, попробуйте позже');
      })
    }
    else if (!this.newPassword) {
      this.loading = false;
      this.toastr.error('Требуется новый пароль');
    }
    else if (!this.currentPassword) {
      this.loading = false;
      this.toastr.error('Требуется текущий пароль');
    }
  }
}