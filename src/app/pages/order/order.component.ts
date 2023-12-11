import {Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../services/helper.service";
import {SpollersService} from "../../services/spollers.service";
import {AuthService} from "../../services/auth.service";
import {DriverComponent} from "../driver/driver.component";
import {ToastrService} from "ngx-toastr";
import {ListService} from "../../services/list.service";
import {FormControl} from "@angular/forms";
import {UserComponent} from "../user/user.component";

@Component({
   selector: 'app-order',
   templateUrl: './order.component.html',
   styleUrls: ['./order.component.scss'],
   host: { "id": "main" }
})
export class OrderComponent {
   @ViewChild("dialogRef") dialogRef: TemplateRef<any>;

   gridOptions: any;
   orders_accepted:any[]=[];
   drivers:any[]=[];
   selectdriver:boolean = false;
   selectDriver:any;
   driverid:number = 0;
   price:string = '';
   public citiesSelected: FormControl = new FormControl();
   public selectTechnicalRoomFilterCtrl: FormControl = new FormControl();
   constructor(
       @Inject(MAT_DIALOG_DATA) public data: any,
       public helper: HelperService,
       public dialog: MatDialog,
       public spoller: SpollersService,
       private toastr: ToastrService,
       public authService: AuthService,
       public listService: ListService
   ) {
   }
   async ngOnInit() {      
         this.data = this.data;
         const index = this.helper.orders.findIndex(e => e.id === +this.data.id)
         if (index>=0){
            this.helper.orders[index] = this.data;
         }
   }
   returnStatus(status:number){
      switch (status) {
         case 0:
            return "Создан";
         case 1:
            return "В работе";
         case 2:
            return "Завершен";
         case 3:
            return "Отменен";
         default:
            return "Не определен";
      }
   }
   returnStatusDriver(status:number){
      switch (status) {
         case 0:
            return "В ожидании";
         case 1:
            return "Принят";
         case 2:
            return "Отклонен";
         default:
            return "Не определен";
      }
   }
   close(){
      this.dialog.closeAll()
   }
   findDriver(ev:any){
      this.drivers = this.helper.drivers.filter((row:any) => {
         return !row.id ? row.id: row.id.toString().includes(ev.target.value) ||
         !row.name ? row.name: row.name.toLowerCase().includes(ev.target.value.toLowerCase());
      });
      console.log(this.drivers)
   }
   goToColumn(ev:any): void {
      const dialogRef = this.dialog.open(DriverComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
         data: ev.data
      });
   }
   async closeOrder(){
      const res = await this.authService.closeOrder(this.data.id).toPromise();
      if (res.status) {
         this.toastr.success('Заказ успешно отменен')
         const res = await this.authService.getOrderInfo(this.data.id).toPromise();
         console.log(res)
         if (res.status) {
            this.data = res.data;
            const index = this.helper.orders.findIndex(e => e.id === +this.data.id)
            if (index>=0){
               this.helper.orders[index] = res.data;
            }
         }
         this.dialog.closeAll();
      }
   }
   async endOrder(){
      const res = await this.authService.endOrder(this.data.id).toPromise();
      if (res.status) {
         this.toastr.success('Заказ успешно отменен')
         const res = await this.authService.getOrderInfo(this.data.id).toPromise();
         console.log(res)
         if (res.status) {
            this.data = res.data;
            const index = this.helper.orders.findIndex(e => e.id === +this.data.id)
            if (index>=0){
               this.helper.orders[index] = res.data;
            }
         }
         this.dialog.closeAll();
      }
   }
   viewUser(id:number){ 
      const dialogRef = this.dialog.open(DriverComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
         data: id
      });
   }
   async saveNewDriver(){
      if (this.driverid !== 0 && this.price !== ''){
         const res = await this.authService.acceptOrderDriver(this.driverid,this.price,this.data.id).toPromise();
         if (res.status) {
            this.toastr.success('Водитель успешно назначен')
            const res = await this.authService.getOrderInfo(this.data.id).toPromise();
            if (res.status) {
               this.data = res.data;
               const index = this.helper.orders.findIndex(e => e.id === +this.data.id)
               if (index>=0){
                  this.helper.orders[index] = res.data;
               }
            }
            this.selectdriver = !this.selectdriver
         }else {
            this.toastr.error(res.error)
         }
      }else {
         this.toastr.error('Невозможно назначить водителя. Не все поля заполнены')
      }
   }

   acceptOffer(item: any): void {
      let clientId = this.data.id.split('M')[1] ? this.data.id.split('M')[1] : this.data.id;
      const obj = {
         clientId,
         driverId: item.user_id,
         order_id: item.order_id,
         amount: item.price,
         additionalAmount: item.additional_price,
         isSafe: this.data.isSafe
      }
      this.authService.acceptOfferDriver(obj).subscribe((res: any) => {
         this.dialog.closeAll();
      })
   }

   showAcceptOffer(item) {
      this.selectDriver = item
      const dialogRef = this.dialog.open(this.dialogRef, {
         data: '',
       });
   } 
}
