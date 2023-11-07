import { Component } from '@angular/core';
import { SpollersService } from 'src/app/services/spollers.service';
import {ColDef, GridOptions} from "ag-grid-community";
import {formatDate} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {DriverComponent} from "../driver/driver.component";
import {ListService} from "../../services/list.service";
import {AddRoleComponent} from "../add-role/add-role.component";

@Component({
   selector: 'app-roles',
   templateUrl: './roles.component.html',
   styleUrls: ['./roles.component.scss'],
   host: { "id": "main" }
})

export class RolesComponent {
   gridOptions: any;
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
      { headerName: 'ID', field: "id", width: 70,},
      { headerName: 'ФИО', field: "name" },
      { headerName: 'Добавление водителя', field: "add_driver", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.add_driver ? "Да":'Нет';
         }
      },
      { headerName: 'Добавление клиента', field: "add_client", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.add_client ? "Да":'Нет';
         }
      },
      { headerName: 'Добавление заказа', field: "add_order", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.add_order ? "Да":'Нет';
         }
      },
      { headerName: 'Отмена заказа', field: "cancel_order", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.cancel_order ? "Да":'Нет';
         }
      },
      { headerName: 'Просмотр водители', field: "drivers", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.drivers ? "Да":'Нет';
         }
      },
      { headerName: 'Просмотр клиенты', field: "clients", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.clients ? "Да":'Нет';
         }
      },
      { headerName: 'Просмотр администраторы', field: "admins", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.clients ? "Да":'Нет';
         }
      },
      { headerName: 'Просмотр заказы', field: "orders", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.orders ? "Да":'Нет';
         }
      },
      { headerName: 'Просмотр трекинг', field: "tracking", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.tracking ? "Да":'Нет';
         }
      },
      { headerName: 'Просмотр справочники', field: "memo", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.memo ? "Да":'Нет';
         }
      },
      { headerName: 'Просмотр активность', field: "activity", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.activity ? "Да":'Нет';
         }
      },
      { headerName: 'Добавление водителя к заказу', field: "add_driver_to_order", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.add_driver_to_order ? "Да":'Нет';
         }
      },
      { headerName: 'Отправка уведомлений', field: "send_push", width: 200, resizable:true,
         valueGetter: params => {
            return params.data.send_push ? "Да":'Нет';
         }
      },
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
      this.gridOptions = <GridOptions> {};
      this.gridOptions.localeText = this.helper.localeTextAgGrid;
      this.gridOptions.defaultExportParams = {onlySelected: true};
      this.gridOptions.defaultColDef = this.defaultColDef;
      this.gridOptions.localeText = this.helper.localeTextAgGrid;
      this.gridOptions.rowSelection = 'multiple';
      this.gridOptions.suppressRowClickSelection = true;
      this.gridOptions.statusBar = this.statusBar;
      this.gridOptions.resizable = true;
   }

   ngAfterViewInit(): void {
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
   goToColumn(ev:any): void {
      const dialogRef = this.dialog.open(AddRoleComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
         data: ev.data
      });
      dialogRef.afterClosed().subscribe(async data=>{
         console.log('iamclosed')
         this.helper.roles = await this.listService.getAllRoles().toPromise()
         this.gridOptions.api.setRowData(this.helper.roles)
         this.dialog.closeAll();
      })
   }
   addRole(){
      const dialogRef = this.dialog.open(AddRoleComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
      });
      dialogRef.afterClosed().subscribe(async data=>{
         console.log('iamclosed')
         this.helper.roles = await this.listService.getAllRoles().toPromise()
         this.gridOptions.api.setRowData(this.helper.roles)
         this.dialog.closeAll();
      })
   }

}
