import {Component, OnInit} from '@angular/core';
import {ColDef, GridOptions} from 'ag-grid-community';
import { SpollersService } from 'src/app/services/spollers.service';
import {AddDriverComponent} from "../add-driver/add-driver.component";
import {MatDialog} from "@angular/material/dialog";
import {AddAdminComponent} from "../add-admin/add-admin.component";
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {DriverComponent} from "../driver/driver.component";
import {formatDate} from "@angular/common";
import {ViewadminComponent} from "../../viewadmin/viewadmin.component";

@Component({
	selector: 'app-admins',
	templateUrl: './admins.component.html',
	styleUrls: ['./admins.component.scss'],
	host: { "id": "main" }
})

export class AdminsComponent implements OnInit {
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
		{ headerName: '№', valueGetter: (args) => args.node?.rowIndex ? args.node?.rowIndex + 1: 1 ,width:60},
		{ headerName: 'ID', field: "id", width: 70,},
		{ headerName: 'ФИО', field: "name" },
		{ headerName: 'Роль', field: "role", resizable:true,
			valueFormatter: (params) => {
				return this.helper.returnNameRole(params.value)
			}
		},
		{ headerName: 'Логин', field: "username", resizable:true},
		{ headerName: 'Дата регистрации', field: "date_reg",
			valueFormatter: (params) => {
				return formatDate(params.value, 'dd.MM.yyyy в HH:mm', 'ru');
			}
		},
		{ headerName: 'Последний вход', field: "date_last_login" ,
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
		const dialogRef = this.dialog.open(AddAdminComponent, {
			width: '90%',
			height: '80%',
			panelClass: 'custom-dialog-class',
			data: ev
		});
	}
}
