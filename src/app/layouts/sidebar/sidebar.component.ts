import { Component, Input } from '@angular/core';
import { spollers } from 'src/assets/scripts/functions';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HelperService} from "../../services/helper.service";
import {ListService} from "../../services/list.service";
import {AppComponent} from "../../app.component";

@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss'],
   host: { "class": "app-sidebar" }
})

export class SidebarComponent {
   constructor(
       public authService:AuthService,
       private router: Router,
       public helper: HelperService,
       public listService: ListService,
       private toastr: ToastrService,
       private app: AppComponent
   ) {
   }
   ngOnInit(): void {
      // spollers()
   }

   @Input() logo = ""

   closeMenu() {
      document.documentElement.classList.remove("menu-open")
   }
   async logOut(){
      localStorage.clear()
      this.authService.authenticationState.next(false);
      await this.router.navigate(['auth']);
   }
   async refreshAll(){
      this.authService.globalLoading = true;
      await this.app.checkSession();
      this.authService.globalLoading = false;
   }
}
