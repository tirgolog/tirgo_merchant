import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../services/helper.service";
import {MatDialog} from "@angular/material/dialog";
import {ListService} from "../../services/list.service";
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
   selector: 'app-add-user',
   templateUrl: './add-user.component.html',
   styleUrls: ['./add-user.component.scss'],
   host: { "id": "main" }
})

export class AddUserComponent implements OnInit {
   findList: any[] | undefined = [];
   viewText = false;
   currentUser
   data: any;
   name:string = '';
   password:string = '';
   phone:string = '';
   login:string = '';
   constructor(
       private authService: AuthService,
       private toastr: ToastrService,
       public dialog: MatDialog,
       public listService: ListService,
       public helper: HelperService,
       public router: Router
   ) {
      this.data = {fullName: '', password: '',phone: ""}
   }

   ngOnInit(): void {
      this.currentUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));
      this.listService.getAllRoles().subscribe((res:any) => {
         if(res) {
           this.helper.roles = res;
         }
       })
   }

   async adduser(){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить пользователя?', 2)
      if (confirm){
         this.data.merchantId = this.currentUser.merchantId; 
         const res = await this.authService.createClient(this.data).toPromise();
         if (res) {
            this.toastr.success('Пользователь успешно добавлен')
            this.dialog.closeAll();
            this.router.navigate(['/users'])
         }
      }
   }
}
