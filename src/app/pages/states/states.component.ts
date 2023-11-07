import { Component } from '@angular/core';
import { SpollersService } from 'src/app/services/spollers.service';

const ELEMENT_DATA = [
   {
      id: 1,
      name: "Бадахшан",
   },
   {
      id: 1,
      name: "Бадахшан",
   },
   {
      id: 1,
      name: "Бадахшан",
   },
];

@Component({
   selector: 'app-states',
   templateUrl: './states.component.html',
   styleUrls: ['./states.component.scss'],
   host: { "id": "main" }
})
export class StatesComponent {

   constructor (
      public spoller: SpollersService
   ) {

   }

   ngOnInit(): void {
      this.spoller.initSpollers()
   }

   ngAfterViewInit(): void {
      this.spoller.initSpollers()
   }

   displayedColumns: string[] = [
      'id',
      'name',
      'settings_icon'
   ];

   dataSource = ELEMENT_DATA;
}
