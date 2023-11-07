import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { SpollersService } from 'src/app/services/spollers.service';

@Component({
   selector: 'app-countries',
   templateUrl: './countries.component.html',
   styleUrls: ['./countries.component.scss'],
   host: { "id": "main" }
})

export class CountriesComponent {

   defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      enableRowGroup: true
   }

   rowData: any[] = [
      {
         id: 1,
         name: "Афганистан",
         iso3: "AFG",
         phone_code: "93",
         currancy: "AFN / ؋",
      },
      {
         id: 1,
         name: "Афганистан",
         iso3: "AFG",
         phone_code: "93",
         currancy: "AFN / ؋",
      },
      {
         id: 1,
         name: "Афганистан",
         iso3: "AFG",
         phone_code: "93",
         currancy: "AFN / ؋",
      },
   ]

   colDefs: ColDef[] = [
      { headerName: 'ID', field: "id" },
      { field: "name" },
      { field: "iso3" },
      { field: "phone_code" },
      { field: "currancy" },
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
