import { Component, Input } from '@angular/core';
import { spollers } from 'src/assets/scripts/functions';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HelperService } from "../../services/helper.service";
import { ListService } from "../../services/list.service";
import { AppComponent } from "../../app.component";
import { jwtDecode } from 'jwt-decode';

@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss'],
   host: { "class": "app-sidebar" }
})

export class SidebarComponent {
   currentUser: any;

   constructor(
      public authService: AuthService,
      private router: Router,
      public helper: HelperService,
      public listService: ListService,
      private toastr: ToastrService,
      private app: AppComponent
   ) {
   }
   ngOnInit(): void {
      this.currentUser = 
      this.getAllUsers();
   }
   @Input() logo = ""

   closeMenu() {
      document.documentElement.classList.remove("menu-open")
   }
   async logOut() {
      localStorage.clear()
      this.authService.authenticationState.next(false);
      await this.router.navigate(['auth']);
   }
   async refreshAll() {
      this.authService.globalLoading = true;
      await this.app.getUsers()
      this.authService.globalLoading = false;
   }

   getAllUsers() {
      this.listService.getUsers().subscribe((res) => {
         let curUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));
         if (res) {
            this.helper.users = res.data;
            this.currentUser = res.data.filter(user => user.id === curUser.sub)[0];
         }
      })
   }

}
