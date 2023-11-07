import { Component } from '@angular/core';
import {ColDef, GridOptions} from "ag-grid-community";
import {formatDate} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SpollersService} from "../../services/spollers.service";
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {DriverComponent} from "../driver/driver.component";
import {AddDriverComponent} from "../add-driver/add-driver.component";
import {PushComponent} from "../../components/push/push.component";
import {ListService} from "../../services/list.service";
import {User} from "../../models/user";
import {UserComponent} from "../user/user.component";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  host: { "id": "main" }
})
export class ArchiveComponent  {
  gridOptions: any;
  drivers:any[]=[];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    enableRowGroup: true
  }
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
  colDefs: ColDef[] = [
    { headerName: '№', valueGetter: (args) => args.node?.rowIndex ? args.node?.rowIndex + 1: 1 ,width:80},
    { headerName: 'ID', field: "id", width: 80, resizable:true,},
    { headerName: 'ФИО Водителя', field: "name", resizable:true, },
    { headerName: 'Телефон', field: "phone", resizable:true, },
    { headerName: 'Транспорт', field: "trucks", resizable:true,
      valueGetter: params => {
        let data = '';
        for (let row of params.data.trucks){
          data = data + '' + this.helper.returnNameTypeTransport(row.type) + ', '
        }
        return data.slice(0, -2);
      }
    },
    { headerName: 'Рейтинг', field: "raiting", width: 150, resizable:true, },
    { headerName: 'Дата регистрации', field: "date_reg",
      valueFormatter: (params) => {
        return formatDate(params.value, 'dd.MM.yyyy в HH:mm', 'ru');
      }
    },
    { headerName: 'Последний вход', field: "date_last_login" , resizable:true,
      valueFormatter: (params) => {
        return formatDate(params.value, 'dd.MM.yyyy в HH:mm', 'ru');
      }
    },
    { headerName: 'Заказы', field: "orders", width: 150, resizable:true,
      valueGetter: params => {
        return params.data.orders.length;
      }
    },
    { headerName: 'Геопозиция', field: "lat", width: 150, resizable:true,
      valueGetter: params => {
        return params.data.lat ? 'Есть':'Нет разрешения';
      }
    },
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
  goToColumn(id:any): void {
    const dialogRef = this.dialog.open(DriverComponent, {
      width: '90%',
      height: '80%',
      panelClass: 'custom-dialog-class',
      data: id
    });
  }
  goToAddDriver(): void {
    const dialogRef = this.dialog.open(AddDriverComponent, {
      width: '90%',
      height: '80%',
      panelClass: 'custom-dialog-class',
    });
    dialogRef.afterClosed().subscribe(data=>{
      console.log('iamclosed')
      this.gridOptions.api.setRowData(this.drivers)
    })
  }
  ngAfterViewInit(): void {
    this.spoller.initSpollers()
  }

  openPush(): void {
    this.dialog.open(PushComponent, {});
  }
  async onScroll() {
    let newusers = await this.listService.getDeletedUsers(this.helper.deletedusers.length,100).toPromise();
    this.helper.deletedusers = this.helper.deletedusers.concat(...newusers.data);
    this.helper.deletedusers_count = newusers.data_count;
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
}

