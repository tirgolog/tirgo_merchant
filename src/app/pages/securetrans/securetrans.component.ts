import { Component } from '@angular/core';
import {ColDef, GridOptions} from "ag-grid-community";
import {formatDate} from "@angular/common";
import {SpollersService} from "../../services/spollers.service";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {AddAdminComponent} from "../add-admin/add-admin.component";
import {OrderComponent} from "../order/order.component";
import {ListService} from "../../services/list.service";

@Component({
  selector: 'app-securetrans',
  templateUrl: './securetrans.component.html',
  styleUrls: ['./securetrans.component.scss'],
  host: { "id": "main" }
})
export class SecuretransComponent {
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

  gridOptions: any;
  statusBar = {
    statusPanels: [
      {
        statusPanel: 'agTotalAndFilteredRowCountComponent',
        align: 'left'
      },
      {
        statusPanel: 'agSelectedRowCountComponent',
        align: 'left'
      },
    ]
  };
  sizespage = [
    50,100,200,500,1000,5000
  ]

  constructor(
      public spoller: SpollersService,
      public dialog: MatDialog,
      public listService: ListService,
      public helper: HelperService,
      public authService: AuthService
  ) {

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
  async ngOnInit() {
    this.helper.global_loading = true;
    this.spoller.initSpollers()
    let neworders = await this.listService.getAllOrders(0,50,this.id,this.id_client,this.from_city,this.to_city,this.status !== 'all' ? this.status:null,this.typecargo !== 'all' ? this.typecargo:null,this.typetransport !== 'all' ? this.typetransport:null,this.price,this.dateCreate,this.dateSend,true).toPromise();
    this.helper.save_orders = neworders.data;
    this.helper.save_orders_count = neworders.data_count;
    this.helper.global_loading = false;
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

  ngAfterViewInit(): void {
    this.spoller.initSpollers()
  }
  viewOrder(ev:any){
    const dialogRef = this.dialog.open(OrderComponent, {
      width: '90%',
      height: '80%',
      panelClass: 'custom-dialog-class',
      data: ev
    });
  }
  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize
    let neworders = await this.listService.getAllOrders(from,e.pageSize,this.id,this.id_client,this.from_city,this.to_city,this.status !== 'all' ? this.status:null,this.typecargo !== 'all' ? this.typecargo:null,this.typetransport !== 'all' ? this.typetransport:null,this.price,this.dateCreate,this.dateSend,true).toPromise();
    this.helper.save_orders = neworders.data;
    this.helper.save_orders_count = neworders.data_count;
    this.helper.global_loading = false;
    console.log(e)
    console.log(e.pageIndex)
    console.log(e.pageSize)
  }
  goToColumn(ev:any): void {/*
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '90%',
      height: '80%',
      panelClass: 'custom-dialog-class',
      data: ev.data
    });*/
  }
}
