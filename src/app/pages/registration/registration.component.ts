import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";
import { HelperService } from "src/app/services/helper.service";
import { ListService } from "src/app/services/list.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  showPassword: boolean = false;

  loading: boolean = false;
  data: any;
  factAddressShow: boolean = false;
  phone2: boolean = false;
  bankAccountCurrency: boolean = false;
  currency;
  currency2;
  currencies: any;
  selectedFiles: FileList;
  selectedFileNames: string[] = [];
  countrCodes: any[];
  certificateFile: FileList;
  certificateNames: string[] = [];

  passportFile: FileList;
  passportNames: string[] = [];

  formDone: boolean = false;
  formData = new FormData();

  startVerficationCode: boolean = false;
  registrationStart: boolean = false;
  phone: any;
  countryCode: any;
  country: any;
  verifyCode: any;
  verificationCode: any;
  constructor(
    public authService: AuthService,
    public helper: HelperService,
    public list: ListService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getCurrencies();
    this.countrCodes = [
      { id: 1, code: "+998", country: "Узбекистан" },
      { id: 2, code: "+7", country: "Казахстан" },
      { id: 6, code: "+992", country: "Таджикистан	" },
      { id: 3, code: "+93", country: "Афганистан" },
      { id: 4, code: "+993", country: "Туркменистан" },
      { id: 5, code: "+996", country: "Кыргызстан" },
    ];
    this.countryCode = this.countrCodes[0];
    this.data = {
      email: "",
      legalAddress: "",
      factAddress: "",
      phoneNumbers: [""],
      phone2: "",
      bankName: "",
      bankAccounts: [],
    };
  }

  sendSms() {
    this.spinner.show();
    this.authService.phoneVerify({ phone: this.countryCode.code + this.phone, countryCode: this.countryCode.country }).subscribe((res: any) => {
      if (res.success) {
        this.spinner.hide();
        this.verificationCode = res.data.code;
        this.startVerficationCode = true;
      }
      else {
        this.spinner.hide();
        this.toastr.error(res.errors[0]);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error.message);
    })
  }
  startRegistr() {
    this.spinner.show();
    if (this.verificationCode == this.verifyCode) {
      this.spinner.hide();
      this.registrationStart = true;
    } else {
      this.spinner.hide();
      this.toastr.error('Пароль не совпадает')
    }
  }
  saveMerchant() { }
  changedCountry(e) {
    this.phone = e.code;
    this.country = e.country;
  }
  addItem() {
    this.data.phoneNumbers.push("");
  }
  removeItem(i) {
    this.data.phoneNumbers.splice(i, 1);
  }
  trackByFn(index: any, item: any) {
    return item;
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
  async createMerchant() {
    let patch = {
      email: this.data.email,
      password: this.data.password,
      companyName : this.data.companyName,
      phoneNumber: this.phone.toString()
    }
    this.authService.addMerchant(patch).subscribe((res: any) => {
      if (res.success) {
        // this.formDone = true;
        this.toastr.success("Мерчант успешно добавлен");
        this.loading = false;
      }else {
        this.toastr.success("Что то пошло не так");
        this.loading = false;
      }
    })
    // if (this.phone2) this.data.phoneNumbers.push(this.data.phone2);
    // if (this.data.bankAccountCurrency) {
    //   this.data.bankAccounts = [
    //     { account: this.data.bankAccounts, currency: this.currency },
    //     { account: this.data.bankAccountCurrency, currency: this.currency2 },
    //   ];
    // } else {
    //   this.data.bankAccounts = [
    //     { account: this.data.bankAccounts, currency: this.currency },
    //   ];
    // }
    // let patch = {
    //   bankAccounts: this.data.bankAccounts,
    //   bankName: this.data.bankName,
    //   companyName: this.data.companyName,
    //   password: this.data.password,
    //   notes: this.data.notes,
    //   mfo: this.data.mfo,
    //   inn: this.data.inn,
    //   oked: this.data.oked,
    //   dunsNumber: this.data.dunsNumber,
    //   supervisorFullName: this.data.supervisorFullName,
    //   legalAddress: this.data.legalAddress,
    //   factAddress: this.data.factAddress,
    //   email: this.data.email,
    //   phoneNumber: this.countryCode.code + this.phone,
    //   logoFilePath: this.data.logo,
    //   passportFilePath: this.data.supervisor_passport,
    //   registrationCertificateFilePath: this.data.certificate_registration,
    // };
    // const res = await this.authService.addMerchant(patch).toPromise();
    // if (res) {
    //   this.formDone = true;
    //   this.toastr.success("Мерчант успешно добавлен");
    //   this.loading = false;
    // } else {
    //   this.toastr.error(res.error);
    //   this.loading = false;
    // }
  }
  getCurrencies() {
    this.list.getCurrencies().subscribe((res) => {
      this.currencies = res;
      this.currency = this.currencies[0].id;
      this.currency2 = this.currencies[0].id;
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
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
