import { Component } from '@angular/core';
import {ColDef, GridOptions} from 'ag-grid-community';
import { SpollersService } from 'src/app/services/spollers.service';
import {HelperService} from "../../services/helper.service";
import {DriverComponent} from "../driver/driver.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCargoTypeComponent} from "../add-cargo-type/add-cargo-type.component";

@Component({
   selector: 'app-cargo-types',
   templateUrl: './cargo-types.component.html',
   styleUrls: ['./cargo-types.component.scss'],
   host: { "id": "main" }
})

export class CargoTypesComponent {
   gridOptions: any;
   defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      enableRowGroup: true
   }

   colDefs: ColDef[] = [
      { headerName: 'ID', field: "id" },
      { headerName:'Наименование',field: "name",width: 500 },
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

   createCargoTypes(): void {
      const dialogRef = this.dialog.open(AddCargoTypeComponent, {
         width: '150',
         height: '150',
         panelClass: 'custom-dialog-class',
      });
      dialogRef.afterClosed().subscribe(data=>{
         console.log('iamclosed')
         this.gridOptions.api.setRowData(this.helper.typecargo)
      })
   }

    protected readonly length = length;
}
