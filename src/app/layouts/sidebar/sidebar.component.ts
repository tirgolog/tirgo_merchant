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
  selectedUser:any;
  @Input() logo = "";

  constructor(
    public authService: AuthService,
    private router: Router,
    public helper: HelperService,
    public listService: ListService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("jwttirgomerhant")) {
      let curUser:any = jwtDecode(localStorage.getItem("jwttirgomerhant"));
      curUser;
      this.listService.getUserById(curUser.sub).subscribe((res) => {
        if (res.success) {
          this.selectedUser = res.data;
        }
      })

      this.listService.getMerchantById(curUser.merchantId).subscribe((res) => {
        if (res.success) {
          this.currentUser = res.data;
        }
      })
    }
  }
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
    this.authService.globalLoading = false;
  }

}
