import { Component, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PushComponent } from 'src/app/components/push/push.component';
import { HelperService } from 'src/app/services/helper.service';
import { SpollersService } from 'src/app/services/spollers.service';
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { OrderPipe } from 'ngx-order-pipe';
import { ActivatedRoute } from "@angular/router";
import { ColDef } from 'ag-grid-community';


@Component({
   selector: 'app-partners',
   templateUrl: './partners.component.html',
   styleUrls: ['./partners.component.scss'],
   host: { "id": "main" }
})

export class PartnersComponent {
   items: any[] = [];
   selectedType: string = "all";
   selectedActive: string = "all";
   searchtext: string = "";

   rowData: any[] = [
      {
         position: 2252,
         id: 2646,
         identification: "UZB001968",
         fio: "Sherzod Mamatkulov",
         login: "shakhzod_umurzakov",
         reg_date: "05.12.2022",
         active_date: "05.12.2022 - 10:08:41",
         subscribe: "Нет подписки",
         status: "Активный",
      },
      {
         position: 2252,
         id: 2646,
         identification: "UZB001968",
         fio: "Sherzod Mamatkulov",
         login: "shakhzod_umurzakov",
         reg_date: "05.12.2022",
         active_date: "05.12.2022 - 10:08:41",
         subscribe: "Нет подписки",
         status: "Активный",
      },
      {
         position: 2252,
         id: 2646,
         identification: "UZB001968",
         fio: "Sherzod Mamatkulov",
         login: "shakhzod_umurzakov",
         reg_date: "05.12.2022",
         active_date: "05.12.2022 - 10:08:41",
         subscribe: "Нет подписки",
         status: "Блокирован",
      }
   ]

   colDefs: ColDef[] = [
      { field: "position" },
      { field: "id" },
      { field: "identification" },
      { field: "fio" },
      { field: "login" },
      { field: "reg_date" },
      { field: "active_date" },
      { field: "subscribe" },
      { field: "status" },
   ]


   constructor(
      public dialog: MatDialog,
      public spoller: SpollersService,
      private orderPipe: OrderPipe,
      private route: ActivatedRoute,
      public helper: HelperService
   ) {

   }
   ngAfterViewInit() {
      this.spoller.initSpollers()
   }
   ngOnChanges() {
      this.spoller.initSpollers()
   }

   ngOnInit() {
      this.spoller.initSpollers()
      this.items = this.helper.partners
   }

   selectType(ev: any) {
      this.selectedType = ev.value;
      this.filterPartners();
   }

   selectActive(ev: any) {
      this.selectedActive = ev.value;
      this.filterPartners();
   }


   filterPartners() {
      this.items = this.helper.partners.filter(item => {
         return (this.selectedType !== "all" ? item.type === this.selectedType : true) &&
            (this.selectedActive !== "all" ? item.active === +this.selectedActive : true) &&
            (this.searchtext !== '' ? item.title.toLowerCase().includes(this.searchtext.toLowerCase()) : true);
      })
   }
   filterClear() {
      this.selectedActive = 'all';
      this.selectedType = 'all';
      this.searchtext = '';
      this.items = this.helper.partners;
   }
   serachForText(ev: any) {
      this.searchtext = ev.target.value;
      console.log(this.searchtext)
      this.filterPartners()
   }

   openPush(): void {
      this.dialog.open(PushComponent, {});
   }

   sortedList(ev: any) {
      const value = ev.value.split(',');
      const sort = value[0];
      const reverse = (value[1] === 'true');
      this.items = this.orderPipe.transform(this.items, sort, reverse)
   }
}
