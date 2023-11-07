import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PushComponent } from 'src/app/components/push/push.component';
import { SpollersService } from 'src/app/services/spollers.service';
import {AuthService} from "../../services/auth.service";
import {HelperService} from "../../services/helper.service";
import {ColDef, GridOptions,RowNode} from 'ag-grid-community';
import {formatDate} from "@angular/common";
import {DriverComponent} from "../driver/driver.component";
import {AddDriverComponent} from "../add-driver/add-driver.component";
import {ListService} from "../../services/list.service";

@Component({
   selector: 'app-drivers',
   templateUrl: './drivers.component.html',
   styleUrls: ['./drivers.component.scss'],
   host: { "id": "main" }
})

export class DriversComponent {
   id:string = '';
   phone:string = '';
   indentificator:string = '';
   typetransport:string = '';
   dateReg:string = '';
   dateLogin:string = '';
   name:string = '';

   sort:string = 'id';
   reverse:boolean = true;

   gridOptions: any;
   drivers:any[]=[];
   sizespage = [
       50,100,200,500,1000,5000
   ]
   constructor(
      public dialog: MatDialog,
      public spoller: SpollersService,
      public helper: HelperService,
      public listService: ListService,
      public authService: AuthService
   ) {

   }

   ngOnInit(): void {
      this.spoller.initSpollers()
      this.gridOptions = <GridOptions> {};
      this.gridOptions.localeText = this.helper.localeTextAgGrid;
      this.gridOptions.defaultExportParams = {onlySelected: true};
      this.gridOptions.rowSelection = 'multiple';
      this.gridOptions.suppressRowClickSelection = true;
      this.gridOptions.suppressScrollOnNewData = true;
      this.gridOptions.resizable = true;
      this.updateListDrivers();
   }

   getContextMenuItems(params:any) {
      return [
         'autoSizeAll',
         'separator',
         'copy',
         'separator',
         {
            name: 'Экспорт',
            subMenu: [
               'csvExport',
               'excelExport',
               {
                  name: 'Экспорт в Excel только выбранные (.xlsx)',
                  action: () => {
                     params.api.exportDataAsExcel({onlySelected: true});
                  },
               },
            ]
         },

      ];
   }
   goToColumn(ev:any): void {
      const dialogRef = this.dialog.open(DriverComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
         data: ev
      });
      /*dialogRef.afterClosed().subscribe(data=>{
         console.log('iamclosed')
         this.updateListDrivers();
         this.gridOptions.api.setRowData(this.drivers)
      })*/
   }
   goToAddDriver(): void {
      const dialogRef = this.dialog.open(AddDriverComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
      });
      dialogRef.afterClosed().subscribe(async data=>{
         console.log('iamclosed')
         await this.updateListDrivers();
         this.gridOptions.api.setRowData(this.drivers)
      })
   }
   ngAfterViewInit(): void {
      this.spoller.initSpollers()
   }

   openPush(): void {
      this.dialog.open(PushComponent, {});
   }
   updateListDrivers(){
      this.drivers = this.helper.drivers.filter(e => e.deleted === 0)
   }
   async handlePage(e: any) {
      this.helper.global_loading = true;
      let from = e.pageIndex * e.pageSize
      let newusers = await this.listService.getAllDrivers(from,e.pageSize,this.id,this.phone,this.dateReg,this.dateLogin,this.name,this.indentificator,this.typetransport !== 'all' ? this.typetransport:null).toPromise();
      this.helper.drivers = newusers.data;
      this.helper.drivers_count = newusers.data_count;
      this.helper.global_loading = false;
      console.log(e)
      console.log(e.pageIndex)
      console.log(e.pageSize)
   }
   async onScroll() {
      let newusers = await this.listService.getAllDrivers(this.helper.drivers.length,50,this.id,this.phone,this.dateReg,this.dateLogin,this.name,this.indentificator,this.typetransport !== 'all' ? this.typetransport:null).toPromise();
      this.helper.drivers = this.helper.drivers.concat(...newusers.data);
      this.helper.drivers_count = newusers.data_count;
   }
   async filterList(){
      this.helper.global_loading = true;
      let newusers = await this.listService.getAllDrivers(0,50,this.id,this.phone,this.dateReg,this.dateLogin,this.name,this.indentificator,this.typetransport !== 'all' ? this.typetransport:null).toPromise();
      this.helper.drivers = newusers.data;
      this.helper.drivers_count = newusers.data_count;
      this.helper.global_loading = false;
   }
   async filterClear(){
      this.id = '';
      this.phone = '';
      this.dateReg = '';
      this.dateLogin = '';
      this.name = '';
      this.indentificator = '';
      this.typetransport = '';
      this.helper.isLoading = true;
      let newusers = await this.listService.getAllDrivers(0,50,null,null,null,null,null,null,null).toPromise();
      this.helper.drivers = newusers.data;
      this.helper.drivers_count = newusers.count;
      this.helper.isLoading = false;
   }
   moderCheck(params){
      switch (params) {
         case 0:
            return "Не пройдена";
         case 1:
            return "Пройдена";
         default:
            return "Не определен";
      }
   }
   busyCheck(params){
      switch (params) {
         case 0:
            return "Свободен";
         case 1:
            return "Занят";
         default:
            return "Не определен";
      }
   }
   transportCheck(params){
      let data = '';
      if (params && params.length){
         for (let row of params){
            data = data + '' + this.helper.returnNameTypeTransport(row.type) + ', '
         }
         return data.slice(0, -2);
      }else {
         return '';
      }
   }
   categoryFind(ev){
      this.typetransport = ev.target.value;
   }
   changeSort(ev){
      this.reverse = !this.reverse
      this.sort = ev.target.value;
   }
}
