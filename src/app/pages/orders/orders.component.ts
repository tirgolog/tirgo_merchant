import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ColDef, GridOptions} from 'ag-grid-community';
import { PushComponent } from 'src/app/components/push/push.component';
import { SpollersService } from 'src/app/services/spollers.service';
import {OrderComponent} from "../order/order.component";
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {formatDate} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {CreateorderComponent} from "../createorder/createorder.component";
import {SocketService} from "../../services/socket.service";
import {ListService} from "../../services/list.service";

@Component({
   selector: 'app-orders',
   templateUrl: './orders.component.html',
   styleUrls: ['./orders.component.scss'],
   host: { "id": "main" }
})

export class OrdersComponent {
   id:string = '';
   id_client:string = '';
   from_city:string = '';
   to_city:string = '';
   dateCreate:string = '';
   dateSend:string = '';
   price:string = '';
   status:string = 'all';
   saveorder:string = 'all';
   typetransport:string = '';
   typecargo:string = '';

   sizespage = [
      50,100,200,500,1000,5000
   ]
   gridOptions: any;
   items:any[]=[];

   constructor(
       public dialog: MatDialog,
       public spoller: SpollersService,
       public helper: HelperService,
       private route: ActivatedRoute,
       private socketService: SocketService,
       public listService: ListService,
       public authService: AuthService
   ) {

   }

   ngOnInit(): void {
      // @ts-ignore
      if(+this.route.snapshot.paramMap.get('status') === 100){
         this.status = 'all';
      }else {
         this.status = this.route.snapshot.paramMap.get('status')
      }
      this.spoller.initSpollers()
      this.gridOptions = <GridOptions> {};
      this.gridOptions.localeText = this.helper.localeTextAgGrid;
      this.gridOptions.suppressScrollOnNewData = true;
      this.gridOptions.headerHeight = 75;
      this.socketService.updateAllList().subscribe(async (res:any) => {
         console.log('new_order')
      })
      console.log(this.helper.orders)

   }
   ngAfterViewInit(): void {
      this.spoller.initSpollers()
   }

   openCreateOrder(): void {
      const dialogRef = this.dialog.open(CreateorderComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class'
      });
   }
   viewOrder(ev:any){
      const dialogRef = this.dialog.open(OrderComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
         data: ev
      });
   }
   statusOrderCheck(params){
      switch (params) {
         case 0:
            return "Ожидающий";
         case 1:
            return "Выполняется";
         case 2:
            return "Выполнен";
         case 3:
            return "Отменен";
         default:
            return "Не определен";
      }
   }
   returnClassStatusOrder(params){
      switch (params) {
         case 0:
            return "status-order-blue";
         case 1:
            return "status-order-yellow";
         case 2:
            return "status-order-green";
         case 3:
            return "status-order-red";
         default:
            return "status-order";
      }
   }

   transportTypeFind(ev){
      this.typetransport = ev.target.value;
   }
   cargoTypeFind(ev){
      this.typecargo = ev.target.value;
   }
   statusFind(ev){
      this.status = ev.target.value;
   }
   saveOrder(ev){
      this.saveorder = ev.target.value;
   }
   async handlePage(e: any) {
      this.helper.global_loading = true;
      let from = e.pageIndex * e.pageSize
      let neworders = await this.listService.getAllOrders(from,e.pageSize,this.id,this.id_client,this.from_city,this.to_city,this.status !== 'all' ? this.status:null,this.typecargo !== 'all' ? this.typecargo:null,this.typetransport !== 'all' ? this.typetransport:null,this.price,this.dateCreate,this.dateSend,this.saveorder !== 'all' ? this.saveorder:null).toPromise();
      this.helper.orders = neworders.data;
      this.helper.orders_count = neworders.data_count;
      this.helper.global_loading = false;
      console.log(e)
      console.log(e.pageIndex)
      console.log(e.pageSize)
   }
   async onScroll() {
      let neworders = await this.listService.getAllOrders(this.helper.orders.length,50,this.id,this.id_client,this.from_city,this.to_city,this.status !== 'all' ? this.status:null,this.typecargo !== 'all' ? this.typecargo:null,this.typetransport !== 'all' ? this.typetransport:null,this.price,this.dateCreate,this.dateSend,this.saveorder !== 'all' ? this.saveorder:null).toPromise();
      this.helper.orders = this.helper.orders.concat(...neworders.data);
      this.helper.orders_count = neworders.data_count;
   }

   async filterList(){
      this.helper.isLoading = true;
      let neworders = await this.listService.getAllOrders(0,50,this.id,this.id_client,this.from_city,this.to_city,this.status !== 'all' ? this.status:null,this.typecargo !== 'all' ? this.typecargo:null,this.typetransport !== 'all' ? this.typetransport:null,this.price,this.dateCreate,this.dateSend,this.saveorder !== 'all' ? this.saveorder:null).toPromise();
      this.helper.orders = neworders.data;
      this.helper.orders_count = neworders.data_count;
      this.helper.isLoading = false;
   }
   async filterClear(){
      this.helper.isLoading = true;
      let neworders = await this.listService.getAllOrders(0,50,null,null,null,null,null,null,null,null,null,null,null).toPromise();
      this.helper.orders = neworders.data;
      this.helper.orders_count = neworders.data_count;
      this.helper.isLoading = false;
   }

}
