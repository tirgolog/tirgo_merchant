import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
	host: { "id": "main" }
})

export class UsersComponent implements OnInit {
	currentUser;
	users:any;
	sizespage = [
		50, 100, 200, 500, 1000, 5000
	]
	defaultColDef: ColDef = {
		sortable: true,
		filter: true,
		enableRowGroup: true
	}
	data
	rowData: any[] = []

	colDefs: ColDef[] = [
		{ headerName: 'ID', field: "id" },
		{ headerName: "Ф.И.О.", field: 'full_name' },
		{ headerName: "Роль", field: 'role' },
		{ headerName: "Логин", field: 'login' },
		{ headerName: "Дата регистрации", field: 'register_date' }
	]

	constructor(
		public dialog: MatDialog,
		public helper: HelperService,
		public list: ListService,
		public toastr: ToastrService,
		private router: Router,
		private spinner: NgxSpinnerService
	) { }

	ngOnInit(): void {
		this.spinner.show();
		this.currentUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));
		this.getAllUsers();
	}

	getAllUsers() {
		this.list.getUsersMerchant(this.currentUser.merchantId).subscribe((res) => {
			if (res) {
				this.users = res.data;
				this.spinner.hide();
			}
		})
	}

	

	view(e) {
		this.router.navigate(['/user/' + e.id])
	}

	changeStatus(item) {
		this.helper.global_loading = true;
		this.list.changeStatus(item).subscribe((res:any) => {
			if(res.success) {
				this.helper.global_loading = false;
				this.toastr.success('Статус успешно обновлен')
				this.getAllUsers()
			}
		}, error => {
			this.helper.global_loading = false;
			this.toastr.success(error.message)
		})
	}

	async handlePage(e: any) {
		this.helper.global_loading = true;
		let from = e.pageIndex * e.pageSize
		let neworders = await this.list.getAllUsers(from, e.pageSize, this.data.id, this.data.phone, this.data.dateReg, this.data.dateLogin, this.data.name, this.data.city, null, null).toPromise();
		this.helper.orders = neworders.data;
		this.helper.orders_count = neworders.data_count;
		this.helper.global_loading = false;
		console.log(e)
		console.log(e.pageIndex)
		console.log(e.pageSize)
	}

}
