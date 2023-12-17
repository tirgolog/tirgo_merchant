import { Component, OnInit } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from "src/app/services/auth.service";
import { HelperService } from "src/app/services/helper.service";
import { ListService } from "src/app/services/list.service";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements OnInit {
  passportFile: FileList;
  passportNames: string[] = [];

  certificateFile: FileList;
  certificateNames: string[] = [];

  selectedFiles: FileList;
  selectedFileNames: string[] = [];

  phone2: boolean = false;
  factAddressShow: boolean = false;
  bankAccountCurrency: boolean = false;
  data;
  currentUser: any;
  constructor(
    public list: ListService,
    public authService: AuthService,
    public helper: HelperService,
    public spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.currentUser = jwtDecode(localStorage.getItem("jwttirgomerhant"));
    this.data = {
      supervisor_passport: "",
      certificate_registration: "",
      email: "",
      phoneNumbers: [""],
    };
    this.getAllDocuments();
  }

  getAllDocuments() {
    this.list.getDocument(this.currentUser.merchantId).subscribe((res) => {
      if (res) {
        this.data = res;
        this.spinner.hide();
      } 
    });
  }

  selectPassport(event: any): void {
    this.passportNames = [];
    this.passportFile = event.target.files;

    if (this.passportFile && this.passportFile[0]) {
      const numberOfFiles = this.passportFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {};
        reader.readAsDataURL(this.passportFile[i]);
        this.passportNames.push(this.passportFile[i].name);
      }
    }
  }

  selectCertificate(event: any): void {
    this.certificateNames = [];
    this.certificateFile = event.target.files;

    if (this.certificateFile && this.certificateFile[0]) {
      const numberOfFiles = this.certificateFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {};
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
        reader.onload = (e: any) => {};
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
}
