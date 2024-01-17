import { Component, OnInit } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { HelperService } from "src/app/services/helper.service";
import { ListService } from "src/app/services/list.service";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"],
})
export class DocumentsComponent implements OnInit {
  fileApi = "https://merchant.tirgo.io/api/v1/file/download/"
  loading: boolean = false;
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
  phone
  currentUser: any;
  currencies
  currency2
  currency

  formDone: boolean = false;
  constructor(
    public list: ListService,
    public authService: AuthService,
    public helper: HelperService,
    public spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    if (localStorage.getItem("jwttirgomerhant")) {
      let curUser: any = jwtDecode(localStorage.getItem("jwttirgomerhant"));
      this.list.getMerchantById(curUser.merchantId).subscribe((res) => {
        if (res) {
          this.spinner.hide();
          this.currentUser = res.data;
          if(!this.currentUser.verified && this.currentUser.completed && !this.currentUser.rejected) { 
           this.formDone = true; 
          }
          this.getAllDocuments(this.currentUser);
          this.getCurrencies();
        }
      })
    }
    this.data = { supervisor_passport: "", certificate_registration: "", email: "", phoneNumbers: [""] };
  }
  getAllDocuments(user) {
    this.list.getDocument(user.id).subscribe((res) => {
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
        reader.onload = (e: any) => { };
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
        reader.onload = (e: any) => { };
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
        reader.onload = (e: any) => { };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
  createMerchant() {
    this.loading = true;
    if (this.data.bankAccountCurrency) {
      this.data.bankAccounts = [
        { account: +this.data.bankAccounts, currency: this.currency },
        { account: +this.data.bankAccountCurrency, currency: this.currency2 },
      ];
    } else {
      this.data.bankAccounts = [
        { account: this.data.bankAccounts, currency: this.currency }
      ];
    }
    let patch = {
      id: this.data.id.toString(),
      responsiblePersonFistName: this.data.responsiblePersonFistName,
      responsiblePersonLastName: this.data.responsiblePersonLastName,
      bankName: this.data.bankName,
      bankAccounts: this.data.bankAccounts,
      notes: this.data.notes,
      mfo: this.data.mfo,
      inn: this.data.inn,
      oked: this.data.oked,
      dunsNumber: this.data.dunsNumber,
      supervisorLastName: this.data.supervisorLastName,
      supervisorFirstName: this.data.supervisorFirstName,
      legalAddress: this.data.legalAddress,
      factAddress: this.data.factAddress,
      email: this.data.email,
      logoFilePath: this.data.logo,
      passportFilePath: this.data.supervisor_passport,
      registrationCertificateFilePath: this.data.certificate_registration,
    };
    this.authService.merchantComplete(patch).subscribe((res: any) => {
      if (res) {
        this.formDone = true;
        this.toastr.success("Мерчант успешно добавлен");
        this.loading = false;
      } else {
        this.toastr.error(res.error);
        this.loading = false;
      }
    }, error => {
      this.toastr.error(error.message);
      this.loading = false;
    })
  }
  getCurrencies() {
    this.list.getCurrencies().subscribe((res) => {
      this.currencies = res;
      const targetCurrency = this.currencies.find(currency => currency.name === 'UZS');
      if (targetCurrency) {
        this.currency = targetCurrency.id;
        this.currency2 = targetCurrency.id;
      }
    });
  }
  selectFile(event: any, name: string) {
    if (name == "logo") this.selectedFileNames = event.target.files[0].name;
    if (name == "certificate_registration")
      this.certificateNames = event.target.files[0].name;
    if (name == "supervisor_passport")
      this.passportNames = event.target.files[0].name;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    this.authService.fileUpload(formData).subscribe(
      (response) => {
        if (response) {
          this.toastr.success("Файл успешно загружен");
          this.data[name] = response.filename;
        }
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }
}
