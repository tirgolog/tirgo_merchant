import {Component, OnInit} from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss'],
   host: { "id": "main" }
})
export class HomeComponent implements OnInit {
   waitcount: number = 0;
   runcount: number = 0;
   endcount: number = 0;
   cancelcount: number = 0;
   constructor(
      public helper: HelperService,
      public authService: AuthService,
      private router: Router,
   ) {
   }

   ngOnInit() {
      for (let row of this.helper.orders){
         if (row.status === 0){
            this.waitcount = this.waitcount + 1;
         }else if(row.status === 1){
            this.runcount = this.runcount + 1;
         }else if(row.status === 2){
            this.endcount = this.endcount + 1;
         }else if(row.status === 10){
            this.cancelcount = this.cancelcount + 1;
         }
      }
   }
   gotoOrders(status:number){
      this.router.navigate(['orders/'+status]);
   }
}
