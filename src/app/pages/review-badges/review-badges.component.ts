import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { SpollersService } from 'src/app/services/spollers.service';

@Component({
   selector: 'app-review-badges',
   templateUrl: './review-badges.component.html',
   styleUrls: ['./review-badges.component.scss'],
   host: { "id": "main" }
})

export class ReviewBadgesComponent {

   defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      enableRowGroup: true
   }

   rowData: any[] = [
      {
         id: 3,
         name: "Вежливость",
         type: "danger",
         for: "Грузоотправителя",
         sort_order: 2,
      },
      {
         id: 3,
         name: "Вежливость",
         type: "danger",
         for: "Грузоотправителя",
         sort_order: 2,
      },
      {
         id: 3,
         name: "Вежливость",
         type: "success",
         for: "Грузоотправителя",
         sort_order: 2,
      },
   ]

   colDefs: ColDef[] = [
      { headerName: 'ID', field: "id" },
      { field: "name" },
      { field: "type" },
      { field: "for" },
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
