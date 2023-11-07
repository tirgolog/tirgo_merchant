import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../services/helper.service";

@Component({
   selector: 'app-add-cargo-type',
   templateUrl: './add-cargo-type.component.html',
   styleUrls: ['./add-cargo-type.component.scss'],
   host: { "id": "main" }
})
export class AddCargoTypeComponent {
   type:string = '';
   constructor(
       public dialog: MatDialog,
       private authService: AuthService,
       private toastr: ToastrService,
       public helper: HelperService,
   ) {
   }
   async addCargoType(){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данный тип груза?', 2)
      if (confirm){
         const res = await this.authService.addTypeCargo(this.type).toPromise();
         if (res.status) {
            this.toastr.success('Тип груза успешно добавлен')
            this.helper.typecargo.push({
               id:res.id,
               name:this.type,
               admin_id:this.authService.currentUser?.id
            });
            console.log(this.helper.typecargo)
            this.dialog.closeAll();
         }
      }
   }
   close(){
      this.dialog.closeAll()
   }
}
