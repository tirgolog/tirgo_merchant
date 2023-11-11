import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;
  data:any;
  id:string = '';
  sizespage = [
    50, 100, 200, 500, 1000, 5000
  ]
  constructor(
    public helper: HelperService,
    private list: ListService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.data = [
  
    ]
  }

  openDialog(): void {
    this.dialog.open(this.dialogRef, { 
      data: '',
    });
}

  async handlePage(e: any) {
    this.helper.global_loading = true;
    let from = e.pageIndex * e.pageSize
    let neworders = await this.list.getAllPayments().toPromise();
    this.helper.orders = neworders.data;
    this.helper.orders_count = neworders.data_count;
    this.helper.global_loading = false;
    console.log(e)
    console.log(e.pageIndex)
    console.log(e.pageSize)
  }

}
