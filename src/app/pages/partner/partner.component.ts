import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HelperService} from "../../services/helper.service";

@Component({
   selector: 'app-partner',
   templateUrl: './partner.component.html',
   styleUrls: ['./partner.component.scss'],
   host: { "id": "main" }
})

export class PartnerComponent {
   item:any;
   constructor(
       private route: ActivatedRoute,
       public helper: HelperService
       ) {
   }

   ngOnInit() {
      const partnerid = parseInt(<string>this.route.snapshot.paramMap.get('id'));
      const index = this.helper.partners.findIndex(e => e.id === partnerid)
      if (index>=0){
         this.item = this.helper.partners[index]
         console.log(this.item)
      }
   }
}
