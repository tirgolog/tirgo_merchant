import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ColDef, GridOptions} from 'ag-grid-community';
import { PushComponent } from 'src/app/components/push/push.component';
import { SpollersService } from 'src/app/services/spollers.service';
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {DriverComponent} from "../driver/driver.component";
import {formatDate} from "@angular/common";
import {UserComponent} from "../user/user.component";
import {AddUserComponent} from "../add-user/add-user.component";
import {ListService} from "../../services/list.service";

@Component({
   selector: 'app-shippers',
   templateUrl: './shippers.component.html',
   styleUrls: ['./shippers.component.scss'],
   host: { "id": "main" }
})

export class ShippersComponent {
   id:string = '';
   phone:string = '';
   dateReg:string = '';
   dateLogin:string = '';
   name:string = '';
   city:string = '';

   sort:string = 'id';
   reverse:boolean = true;

   sizespage = [
      50,100,200,500,1000,5000
   ]
   constructor(
       public dialog: MatDialog,
       public spoller: SpollersService,
       public helper: HelperService,
       public authService: AuthService,
       public listService: ListService
   ) {

   }

   ngOnInit(): void {
      this.spoller.initSpollers()
   }

   goToColumn(ev:any): void {
      const dialogRef = this.dialog.open(UserComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
         data: ev
      });
      dialogRef.afterClosed().subscribe(async data=>{
         //this.gridOptions.api.setRowData(this.helper.users)
      })
   }
   addUser(){
      const dialogRef = this.dialog.open(AddUserComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
      });
   }
   ngAfterViewInit(): void {
      this.spoller.initSpollers()
   }
   async handlePage(e: any) {
      this.helper.global_loading = true;
      let from = e.pageIndex * e.pageSize
      let newusers = await this.listService.getAllUsers(from,e.pageSize,this.id,this.phone,this.dateReg,this.dateLogin,this.name,this.city,this.sort,this.reverse).toPromise();
      this.helper.users = newusers.data;
      this.helper.users_count = newusers.data_count;
      this.helper.global_loading = false;
      console.log(e)
      console.log(e.pageIndex)
      console.log(e.pageSize)
   }
   async onScroll() {
      let newusers = await this.listService.getAllUsers(this.helper.users.length,50,this.id,this.phone,this.dateReg,this.dateLogin,this.name,this.city,this.sort,this.reverse).toPromise();
      this.helper.users = this.helper.users.concat(...newusers.data);
      this.helper.users_count = newusers.data_count;
   }
   openPush(): void {
      this.dialog.open(PushComponent, {});
   }
   changeSort(ev){
      this.reverse = !this.reverse
      this.sort = ev.target.value;
   }
   async filterList(){
      this.helper.isLoading = true;
      let newusers = await this.listService.getAllUsers(0,50,this.id,this.phone,this.dateReg,this.dateLogin,this.name,this.city,this.sort,this.reverse).toPromise();
      this.helper.users = newusers.data;
      this.helper.users_count = newusers.count;
      this.helper.isLoading = false;
   }
   async filterClear(){
      this.id = '';
      this.phone = '';
      this.dateReg = '';
      this.dateLogin = '';
      this.name = '';
      this.city = '';
      this.sort = 'id'
      this.helper.isLoading = true;
      let newusers = await this.listService.getAllUsers(0,50,null,null,null,null,null,null,null,this.reverse).toPromise();
      this.helper.users = newusers.data;
      this.helper.users_count = newusers.count;
      this.helper.isLoading = false;
   }
}
