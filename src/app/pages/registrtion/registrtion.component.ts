import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-registrtion',
  templateUrl: './registrtion.component.html',
  styleUrls: ['./registrtion.component.scss']
})
export class RegistrtionComponent implements OnInit{
  data:any;
  factAddressShow: boolean = false;
  phone2: boolean = false;

  selectedFiles: FileList;
  selectedFileNames: string[] = [];

  certificateFile: FileList;
  certificateNames: string[] = [];

  passportFile: FileList;
  passportNames: string[] = [];

  constructor(
    public authService: AuthService,
    private uploadService: FileUploadService) {}

  ngOnInit() {
    this.data = {email:'', legalAddress:'',factAddress:'', phoneNumbers: [''], phone2: "", bankName:''}
  }

  addItem() {
    this.data.phoneNumbers.push('')
  }

  removeItem(i) {
      this.data.phoneNumbers.splice(i,1)
  }

  trackByFn(index:any, item:any) {
    return item;
  }

  
  selectCertificate(event: any): void {
    this.certificateNames = [];
    this.certificateFile = event.target.files;

    if (this.certificateFile && this.certificateFile[0]) {
      const numberOfFiles = this.certificateFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
        };
        reader.readAsDataURL(this.certificateFile[i]);
        this.certificateNames.push(this.certificateFile[i].name);
      }
    }
  }

  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  selectPassport(event: any): void {
    this.passportNames = [];
    this.passportFile = event.target.files;

    if (this.passportFile && this.passportFile[0]) {
      const numberOfFiles = this.passportFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
        };
        reader.readAsDataURL(this.passportFile[i]);
        this.passportNames.push(this.passportFile[i].name);
      }
    }
  }


 
  
}
