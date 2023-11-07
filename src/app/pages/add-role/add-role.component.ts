import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../services/helper.service";

@Component({
   selector: 'app-add-role',
   templateUrl: './add-role.component.html',
   styleUrls: ['./add-role.component.scss'],
   host: { "id": "main" }
})

export class AddRoleComponent {
   id:number = 0;
   newdata = {
      name:'',
      add_driver:false,
      add_client:false,
      add_order:false,
      cancel_order:false,
      drivers:false,
      clients:false,
      admins:false,
      orders:false,
      tracking:false,
      memo:false,
      activity:false,
      add_driver_to_order:false,
      send_push:false,
   }
   constructor(
       @Inject(MAT_DIALOG_DATA) public data: any,
       public dialog: MatDialog,
       private authService: AuthService,
       private toastr: ToastrService,
       public helper: HelperService,
       ) {
   }

   async ngOnInit() {
      console.log(this.data)
      if (this.data){
         this.id = this.data.id;
         this.newdata.name = this.data.name;
         this.newdata.add_driver = this.data.add_driver === 1;
         this.newdata.add_client = this.data.add_client === 1;
         this.newdata.add_order = this.data.add_order === 1;
         this.newdata.cancel_order = this.data.cancel_order === 1;
         this.newdata.drivers = this.data.drivers === 1;
         this.newdata.clients = this.data.clients === 1;
         this.newdata.admins = this.data.admins === 1;
         this.newdata.orders = this.data.orders === 1;
         this.newdata.tracking = this.data.tracking === 1;
         this.newdata.memo = this.data.memo === 1;
         this.newdata.activity = this.data.activity === 1;
         this.newdata.add_driver_to_order = this.data.add_driver_to_order === 1;
         this.newdata.send_push = this.data.send_push === 1;
         console.log('newdata',this.newdata)
      }
   }
   ngAfterContentChecked(){

   }
   async saveRole(){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите изменить роль пользователя?', 2)
      if (confirm){
         const res = await this.authService.saveRole(this.newdata,this.id).toPromise();
         if (res.status){
            this.toastr.success('Роль сохранена')
            this.dialog.closeAll()
         }else {
            this.toastr.error('Ошибка сохранения роли')
         }
      }
   }
   close(){
      this.dialog.closeAll()
   }
}
