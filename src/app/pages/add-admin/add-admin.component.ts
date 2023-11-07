import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {ListService} from "../../services/list.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
   selector: 'app-add-admin',
   templateUrl: './add-admin.component.html',
   styleUrls: ['./add-admin.component.scss'],
   host: { "id": "main" }
})

export class AddAdminComponent {
   name:string = '';
   role:number = 1;
   username:string = '';
   phone:string = '';
   password:string = '';
   editaid:number = 0;
   ban:boolean = false;
   constructor(
       @Inject(MAT_DIALOG_DATA) public data: any,
       public dialog: MatDialog,
       private toastr: ToastrService,
       private authService: AuthService,
       public listService: ListService,
       public helper: HelperService,
       private snackBar: MatSnackBar
   ) {
   }
   async ngOnInit() {
      console.log(this.data)
      this.password = new Array(10).fill("0123456789ABCDEFGHKLMNPQRSTUVWXYZabcdefghikmnpqrstuvwxyz").map(x => (function(chars) { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while(r[0] > max); return chars[r[0] % chars.length]; })(x)).join('');
      if (this.data){
         this.name = this.data.name;
         this.role = this.data.role;
         this.username = this.data.username;
         this.phone = this.data.phone;
         this.editaid = this.data.id;
         this.ban = this.data.ban;
         this.password = '';
      }
   }
   generPass(){
      this.password = new Array(10).fill("0123456789ABCDEFGHKLMNPQRSTUVWXYZabcdefghikmnpqrstuvwxyz").map(x => (function(chars) { let umax = Math.pow(2, 32), r = new Uint32Array(1), max = umax - (umax % chars.length); do { crypto.getRandomValues(r); } while(r[0] > max); return chars[r[0] % chars.length]; })(x)).join('');
   }
   async addUser(){
      if (!this.name.length || !this.username.length || !this.password.length || !this.phone.length){
         await this.helper.openDialogConfirm('Ошибка', 'Не все поля заполнены корректно', 1)
      }else {
         const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите сохранить данного пользователя?', 2)
         if (confirm){
            await this.helper.loadingCreate();
            const res = await this.authService.addAdmin(this.name,this.role,this.username,this.password,this.phone,this.editaid).toPromise();
            if (res.status){
               await this.helper.loadingClose();
               this.toastr.success(this.editaid ? 'Информация успешно изменена':'Администратор добавлен')
               this.dialog.closeAll()
            }else {
               await this.helper.loadingClose();
               this.toastr.error('Ошибка сохранения администратора')
            }
         }
      }
   }
   async banned(){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите изменить данного пользователя?', 2)
      if (confirm){
         let banned = !this.ban;
         const res = await this.authService.adminBanned(banned,this.editaid).toPromise();
         if (res.status){
            this.helper.admins = await this.listService.getAllAdmins().toPromise();
            this.toastr.success(this.ban ? 'Администратор разблокирован':'Администратор заблокирован')
            this.ban = banned;
         }else {
            this.toastr.error('Ошибка сохранения изменений')
         }
      }
   }
}
