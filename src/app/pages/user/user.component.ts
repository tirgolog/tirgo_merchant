import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../services/helper.service";
import {AddTransactionsComponent} from "../../components/add-transactions/add-transactions.component";

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.scss'],
   host: { "id": "main" }
})
export class UserComponent {
   user: any;
   constructor(
       @Inject(MAT_DIALOG_DATA) public data: any,
       public dialog: MatDialog,
       private authService: AuthService,
       private toastr: ToastrService,
       public helper: HelperService,
   ) {
   }
   async ngOnInit(){
      console.log(this.data)
      const res = await this.authService.getUserInfo(+this.data).toPromise();
      console.log(res)
      if (res.status) {
         this.user = res.data
      }
   }
   addMoney() {
      this.dialog.open(AddTransactionsComponent, {
         data:this.data
      });
   }
}
