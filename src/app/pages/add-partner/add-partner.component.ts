import { Component } from '@angular/core';

@Component({
   selector: 'app-add-partner',
   templateUrl: './add-partner.component.html',
   styleUrls: ['./add-partner.component.scss'],
   host: { "id": "main" }
})
export class AddPartnerComponent {

   constructor(

   ) {

   }

   getFile(e: any, el: any) {
      el.value = e.files[0].name
   }
}
