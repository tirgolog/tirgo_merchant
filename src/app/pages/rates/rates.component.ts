import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { SpollersService } from 'src/app/services/spollers.service';

const ELEMENT_DATA = [

];

@Component({
   selector: 'app-rates',
   templateUrl: './rates.component.html',
   styleUrls: ['./rates.component.scss'],
   host: { "id": "main" }
})

export class RatesComponent {

   defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      enableRowGroup: true
   }

   rowData: any[] = [
      {
         id: 3,
         icon: "assets/img/rate.png",
         name: "START",
         details: {
            type: "Обычный",
            price: 110000,
            validity: 6
         },
         sort_order: 0,
      },
      {
         id: 3,
         icon: "assets/img/rate.png",
         name: "START",
         details: {
            type: "Обычный",
            price: 110000,
            validity: 6
         },
         sort_order: 0,
      },
      {
         id: 3,
         icon: "assets/img/rate.png",
         name: "START",
         details: {
            type: "Обычный",
            price: 110000,
            validity: 6
         },
         sort_order: 0,
      },
   ]

   colDefs: ColDef[] = [
      { headerName: 'ID', field: "id" },
      { field: "icon" },
      { field: "name" },
      { field: "details" },
      { field: "sort_order" },
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
