import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { SpollersService } from 'src/app/services/spollers.service';

@Component({
   selector: 'app-promocodes',
   templateUrl: './promocodes.component.html',
   styleUrls: ['./promocodes.component.scss'],
   host: { "id": "main" }
})

export class PromocodesComponent {


   defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      enableRowGroup: true
   }

   rowData: any[] = [
      {
         code: "OYBEK1",
         refer: "oybek",
         sub_month: 8,
         auto_block: 0,
         partner: "Cамозанятый",
         for: "Водителя",
         registers: 0,
         save_contracts: {
            all: 0,
            completed: 0,
            canceled: 0
         },
         status: "Активный",
      },
      {
         code: "OYBEK1",
         refer: "oybek",
         sub_month: 8,
         auto_block: 0,
         partner: "Cамозанятый",
         for: "Водителя",
         registers: 0,
         save_contracts: {
            all: 0,
            completed: 0,
            canceled: 0
         },
         status: "Активный",
      },
      {
         code: "OYBEK1",
         refer: "oybek",
         sub_month: 8,
         auto_block: 0,
         partner: "Cамозанятый",
         for: "Водителя",
         registers: 0,
         save_contracts: {
            all: 0,
            completed: 0,
            canceled: 0
         },
         status: "Активный",
      },
   ]

   colDefs: ColDef[] = [
      { field: "code" },
      { field: "refer" },
      { field: "sub_month" },
      { field: "auto_block" },
      { field: "for" },
      { field: "registers" },
      { field: "save_contracts" },
      { field: "status" },
   ]

   constructor(
      public spoller: SpollersService
   ) {

   }

   ngOnInit(): void {
      this.spoller.initSpollers()
   }

   ngAfterViewInit(): void {
      this.spoller.initSpollers()
   }
}
