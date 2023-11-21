import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  data: any;
  currentUser: any;
  constructor(
    public router: ActivatedRoute,
    private route: Router,
    private list: ListService,
    public helper: HelperService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));

    this.data = {};
    this.list.getAllRoles().subscribe((res: any) => {
      if (res) {
        this.helper.roles = res;
      }
    })
    this.getUser();
  }

  getUser() {
    this.router.params.subscribe((res: any) => {
      if (res) {
        this.list.getUserById(res.id).subscribe((user: any) => {
          if (user)
            this.data = user.data;
          this.data.role = this.data.role.id
        })
      }
    })
  }

  patchData() {
    this.helper.loadingCreate();
    let patch = {
      id: this.data.id,
      fullName: this.data.fullName,
      username: this.data.username,
      role: this.data.role,
      phoneNumber: this.data.phoneNumber,
    }
    this.list.updateUser(patch).subscribe((res: any) => {
      if (res) {
        this.helper.loadingClose();
        this.toastr.success('Успешно обновлен');
        this.route.navigate(['/users'])
      }
    })

  }
}
