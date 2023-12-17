import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  host: { id: "main" },
})
export class FinanceComponent implements OnInit {
  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;
  currentUser: any;
  data: any[] = [];
  payment: any;
  activeBalance: any;
  frozenBalance: any;
  id: string = '';
  sizespage = [
    50, 100, 200, 500, 1000, 5000
  ]
  constructor(
    public helper: HelperService,
    private list: ListService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private app: AppComponent,
    private spinner: NgxSpinnerService
  ) { }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.spinner.show();
    this.payment = { transactionType: '', amount: '', merchantId: '' }
    this.currentUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));
    this.getAllFinance();
    this.getBalance();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(this.dialogRef, {
      data: '',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllFinance();
    });
  }

  getAllFinance() {
    if (this.app.currentUser.role.name === 'Super admin') {
      this.list.getFinanceByMerchant(this.currentUser.merchantId).subscribe((res) => {
        if (res) {
          this.spinner.hide();
          this.helper.transactions_type = res.data;
        }
      })
    } else {
      this.list.getTransactionsByUser(this.currentUser.sub).subscribe((res) => {
        if (res) {
          this.helper.transactions_type = res.data;
          this.spinner.hide();
        }
      })
    }
  }

  getBalance() {
    this.list.getBalanceMerchant(this.currentUser.merchantId).subscribe((res) => {
      if (res.success) {
        this.activeBalance = res.data.activeBalance;
        this.frozenBalance = res.data.frozenBalance;
      }
    })
  }

  createTransaction() {
    this.helper.loadingCreate();
    this.payment.merchantId = this.currentUser.merchantId
    this.list.createTransaction(this.payment).subscribe((res) => {
      if (res) {
        this.helper.loadingClose();
        this.toastr.success('Запрос  успешно отправлен')
        this.dialog.closeAll();
        this.payment = { transactionType: '', amount: '', merchantId: '' }
      }
    }, error => {
      this.helper.loadingClose();
      this.toastr.error('Что то пошло не так')
    })
  }

  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize
    let neworders = await this.list.getAllPayments().toPromise();
    this.helper.orders = neworders.data;
    this.helper.orders_count = neworders.data_count;
    this.helper.global_loading = false;
  }

}
