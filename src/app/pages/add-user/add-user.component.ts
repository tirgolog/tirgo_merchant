import { Component, ViewChild } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../services/helper.service";
import {MatDialog} from "@angular/material/dialog";
import {ListService} from "../../services/list.service";

@Component({
   selector: 'app-add-user',
   templateUrl: './add-user.component.html',
   styleUrls: ['./add-user.component.scss'],
   host: { "id": "main" }
})

export class AddUserComponent {
   findList: any[] | undefined = [];
   viewText = false;
   city: string = '';
   name:string = '';
   email:string = '';
   phone:string = '';
   cityInfo:any[]=[]
   public citiesSelected: FormControl = new FormControl();
   public selectTechnicalRoomFilterCtrl: FormControl = new FormControl();
   constructor(
       private authService: AuthService,
       private toastr: ToastrService,
       public dialog: MatDialog,
       public listService: ListService,
       public helper: HelperService
   ) {

   }

   getFile(e: any, el: any) {
      el.value = e.files[0].name
   }
   async findCity(ev:any) {
      const findText = ev.target.value.toString().trim().toLowerCase();
      if (findText.length >= 2) {
         this.viewText = true;
         this.findList = await this.authService.findCity(findText).toPromise();
      } else {
         this.viewText = false;
         this.findList = [];
      }
   }
   async adduser(){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить пользователя?', 2)
      if (confirm){
         this.cityInfo = this.citiesSelected.value;
         const res = await this.authService.createClient(this.phone,this.name,this.email,this.cityInfo).toPromise();
         if (res.status) {
            this.toastr.success('Пользователь успешно добавлен')
            this.dialog.closeAll();
         }else {
            this.toastr.error(res.error)
         }
      }
   }
}
