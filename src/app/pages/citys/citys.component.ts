import { Component } from '@angular/core';
import { SpollersService } from 'src/app/services/spollers.service';

const ELEMENT_DATA = [
   {
      id: 1,
      name: "Ашкашам",
   },
   {
      id: 1,
      name: "Ашкашам",
   },
   {
      id: 1,
      name: "Ашкашам",
   },
];

@Component({
   selector: 'app-citys',
   templateUrl: './citys.component.html',
   styleUrls: ['./citys.component.scss'],
   host: { "id": "main" }
})

export class CitysComponent {

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

   displayedColumns: string[] = [
      'id',
      'name',
      'settings_icon'
   ];

   dataSource = ELEMENT_DATA;
}
