import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../services/helper.service";

@Component({
   selector: 'app-add-car-type',
   templateUrl: './add-car-type.component.html',
   styleUrls: ['./add-car-type.component.scss'],
   host: { "id": "main" }
})
export class AddCarTypeComponent {
   getFile(e: any, el: any) {
      el.value = e.files[0].name
   }
   data = {
      name:'',
      weight:'',
      volume:'',
      loading_side:'',
   }
   constructor(
       public dialog: MatDialog,
       private authService: AuthService,
       private toastr: ToastrService,
       public helper: HelperService,
       ) {

   }
   close(){
      this.dialog.closeAll()
   }
   async addNewCarType(){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данный тип транспорта?', 2)
      if (confirm){
         const res = await this.authService.addTypeCar(this.data).toPromise();
         if (res.status) {
            this.toastr.success('Тип транспорта успешно добавлен')
            this.helper.typetruck.push({
               id:res.id,
               name:this.data.name,
               weight:this.data.weight,
               volume:this.data.volume,
               loading_side:this.data.loading_side,
               type:1,
               trailer:0,
            });
            this.dialog.closeAll();
         }
      }
   }
}
