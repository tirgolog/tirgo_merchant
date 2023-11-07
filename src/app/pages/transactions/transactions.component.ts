import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { AddTransactionsComponent } from 'src/app/components/add-transactions/add-transactions.component';
import { SpollersService } from 'src/app/services/spollers.service';

@Component({
   selector: 'app-transactions',
   templateUrl: './transactions.component.html',
   styleUrls: ['./transactions.component.scss'],
   host: { "id": "main" }
})

export class TransactionsComponent {

   defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      enableRowGroup: true
   }

   rowData: any[] = [
      {
         id: 884,
         name: "OBID",
         type: "Франшиза",
         base: "Списание с баланса за Подписку Водителя",
         date: "15.12.2022 15:08",
         summa: "+165000",
      },
      {
         id: 884,
         name: "OBID",
         type: "Франшиза",
         base: "Списание с баланса за Подписку Водителя",
         date: "15.12.2022 15:08",
         summa: "+165000",
      },
      {
         id: 884,
         name: "OBID",
         type: "Франшиза",
         base: "Списание с баланса за Подписку Водителя",
         date: "15.12.2022 15:08",
         summa: "+165000",
      },
   ]

   colDefs: ColDef[] = [
      { headerName: 'ID', field: "id" },
      { field: "name" },
      { field: "type" },
      { field: "base", width: 200 },
      { field: "date" },
      { field: "summa" },
   ]

   constructor(
      public dialog: MatDialog,
      public spoller: SpollersService
   ) {

   }

   ngOnInit(): void {
      this.spoller.initSpollers()
   }

   ngAfterViewInit(): void {
      this.spoller.initSpollers()
   }

   openAddTransactions() {
      this.dialog.open(AddTransactionsComponent, {});
   }

}
