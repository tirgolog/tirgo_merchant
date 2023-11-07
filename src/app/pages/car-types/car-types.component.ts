import { Component } from '@angular/core';
import {ColDef, GridOptions} from 'ag-grid-community';
import { SpollersService } from 'src/app/services/spollers.service';
import {HelperService} from "../../services/helper.service";
import {AddCargoTypeComponent} from "../add-cargo-type/add-cargo-type.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCarTypeComponent} from "../add-car-type/add-car-type.component";

@Component({
   selector: 'app-car-types',
   templateUrl: './car-types.component.html',
   styleUrls: ['./car-types.component.scss'],
   host: { "id": "main" }
})

export class CarTypesComponent {
   gridOptions: any;
   defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      enableRowGroup: true
   }

   colDefs: ColDef[] = [
      { headerName: 'ID', field: "id" },
      { headerName:'Наименование',field: "name",width: 300 },
      { headerName:'Сторона погрузки',field: "loading_side",width: 300 },
      { headerName:'Объем',field: "volume",width: 100 },
      { headerName:'Грузоподъемность',field: "weight",width: 200 },
   ]


   constructor(
       public spoller: SpollersService,
       public dialog: MatDialog,
       public helper: HelperService
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
   }

   ngAfterViewInit(): void {
      this.spoller.initSpollers()
   }

   createCarTypes(): void {
      const dialogRef = this.dialog.open(AddCarTypeComponent, {
         width: '150',
         height: '150',
         panelClass: 'custom-dialog-class',
      });
      dialogRef.afterClosed().subscribe(data=>{
         console.log('iamclosed')
         this.gridOptions.api.setRowData(this.helper.typetruck)
      })
   }
}
