import { Component } from '@angular/core';
import {ColDef, GridOptions} from "ag-grid-community";
import {formatDate} from "@angular/common";
import {SpollersService} from "../services/spollers.service";
import {MatDialog} from "@angular/material/dialog";
import {HelperService} from "../services/helper.service";
import {AuthService} from "../services/auth.service";
import {AddAdminComponent} from "../pages/add-admin/add-admin.component";
import {DriverComponent} from "../pages/driver/driver.component";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  host: { "id": "main" }
})
export class ActivityComponent {

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
    { headerName: 'ID', field: "id", width: 75,},
    { headerName: 'ФИО', field: "name" , resizable:true,},
    { headerName: 'Действие', field: "text", resizable:true, width: 600},
    { headerName: 'Дата', field: "date", resizable:true,
      valueFormatter: (params) => {
        return formatDate(params.value, 'dd.MM.yyyy в HH:mm', 'ru');
      }
    },
  ]

  constructor(
      public spoller: SpollersService,
      public dialog: MatDialog,
      public helper: HelperService,
      public authService: AuthService
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
  goToAddAdmins(): void {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '90%',
      height: '80%',
      panelClass: 'custom-dialog-class',
    });
  }
  goToColumn(ev:any): void {
    const index = this.helper.drivers.findIndex(e => e.id === ev.data.userid)
    const dialogRef = this.dialog.open(DriverComponent, {
      width: '90%',
      height: '80%',
      panelClass: 'custom-dialog-class',
      data: this.helper.drivers[index]
    });
  }
}
