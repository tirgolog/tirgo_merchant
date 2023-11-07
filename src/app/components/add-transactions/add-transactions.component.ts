import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HelperService} from "../../services/helper.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-add-transactions',
  templateUrl: './add-transactions.component.html',
  styleUrls: ['./add-transactions.component.scss']
})
export class AddTransactionsComponent {

  protected readonly event = event;
  amount:string = '';
  description:string = '';
  type:number = 0;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private toastr: ToastrService,
      public helper: HelperService,
      private authService: AuthService,
  ) {
    console.log(this.data)
  }
  selectType(ev){
    this.type = ev;
  }
  async addTransaction(){
    if (this.description && this.amount && this.type){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить платеж на сумму ' +this.amount+ '?', 2)
      if (confirm){
        const res = await this.authService.addPayment(this.description,this.amount,this.type,this.data.id).toPromise();
        if (res.status) {
          const index = this.helper.users.findIndex(e => e.id === this.data.id)
          if (index>0){
            this.helper.users[index].balance = this.helper.users[index].balance + this.amount
          }
          this.toastr.success('Баланс пополнен')
        }
      }
    }else {
      this.toastr.error('Пожалуйста заполните все поля')
    }
  }
}
