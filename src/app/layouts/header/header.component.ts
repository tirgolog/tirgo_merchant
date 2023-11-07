import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpollersService } from 'src/app/services/spollers.service';
import { spollers } from 'src/assets/scripts/functions';


@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss'],
   host: { "class": "app-header" }
})
export class HeaderComponent {

   constructor(
      public spollers: SpollersService,
      public authService: AuthService,
      private router: Router
   ) {

   }

   logout() {
      this.authService.logout()
      this.router.navigate(['auth'], { replaceUrl: true })
   }

   ngOnInit() {
   }


   toggleMenu() {
      document.documentElement.classList.toggle("menu-open");
   }

}
