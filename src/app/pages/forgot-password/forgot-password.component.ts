import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{
  codeEntered:boolean = false;
  loading:boolean = false;
  showChangePasswordModal: boolean = false;

  constructor() {}
  
  ngOnInit() {
    
  }

  onCodeChanged(code: string) {
    code.length == 5 ? this.codeEntered = true : this.codeEntered = false;
  }
  
  onCodeCompleted(code: string) {
    this.codeEntered = true;
  }

  codeCompleted() {
    this.loading = true;
    this.showChangePasswordModal = true;
  }

}
