import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { PushComponent } from 'src/app/components/push/push.component';

@Component({
   selector: 'app-users',
   templateUrl: './users.component.html',
   styleUrls: ['./users.component.scss'],
   host: { "id": "main" }
})

export class UsersComponent {

   defaultColDef: ColDef = {
      sortable: true,
      filter: true,
      enableRowGroup: true
   }

   rowData: any[] = [
      {
         position: 1,
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
         position: 2,
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
         position: 3,
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
      { headerName: 'ID', field: "id" },
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
   ) {

   }

   openPush(): void {
      this.dialog.open(PushComponent, {});
   }
}
