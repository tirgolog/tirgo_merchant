import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  loading: boolean = false;
  data: any;
  factAddressShow: boolean = false;
  phone2: boolean = false;
  bankAccountCurrency: boolean = false;
  currency
  currency2
  currencies: any;
  selectedFiles: FileList;
  selectedFileNames: string[] = [];

  certificateFile: FileList;
  certificateNames: string[] = [];

  passportFile: FileList;
  passportNames: string[] = [];

  formDone: boolean = false;
  formData = new FormData();
  constructor(
    public authService: AuthService,
    public helper: HelperService,
    public list: ListService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getCurrencies();
    this.data = { email: '', legalAddress: '', factAddress: '', phoneNumbers: [''], phone2: "", bankName: '', bankAccounts: [] };
  }

  addItem() {
    this.data.phoneNumbers.push('')
  }

  removeItem(i) {
    this.data.phoneNumbers.splice(i, 1)
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

  async createMerchant() {
    if (this.phone2)
      this.data.phoneNumbers.push(this.data.phone2)
    if (this.data.bankAccountCurrency) {
      this.data.bankAccounts = [{ account: this.data.bankAccounts, currency: this.currency }, { account: this.data.bankAccountCurrency, currency: this.currency2 }]
    } else {
      this.data.bankAccounts = [{ account: this.data.bankAccounts, currency: this.currency }]
    }
    let patch = {
      bankAccounts: this.data.bankAccounts,
      bankName: this.data.bankName,
      companyName: this.data.companyName,
      password: this.data.password,
      notes: this.data.notes,
      mfo: this.data.mfo,
      inn: this.data.inn,
      oked: this.data.oked,
      dunsNumber: this.data.dunsNumber,
      supervisorFullName: this.data.supervisorFullName,
      legalAddress: this.data.legalAddress,
      factAddress: this.data.factAddress,
      email: this.data.email,
      phoneNumbers: this.data.phoneNumbers,
      logoFilePath: this.data.logo,
      passportFilePath: this.data.supervisor_passport,
      registrationCertificateFilePath: this.data.certificate_registration,
    }
    const res = await this.authService.addMerchant(patch).toPromise();
    if (res) {
      this.formDone = true;
      this.toastr.success('Мерчант успешно добавлен')
      this.loading = false;
    } else {
      this.toastr.error(res.error)
      this.loading = false;
    }
  }

  getCurrencies() {
    this.list.getCurrencies().subscribe((res) => {
      this.currencies = res;
      this.currency = this.currencies[0].id;
      this.currency2 = this.currencies[0].id;
    })
  }

  selectFile(event: any, name: string) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    this.authService.fileUpload(formData).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
        // Handle the response as needed
        if (response) {
          this.data[name] = response.filename
        }
      },
      error => {
        console.error('Error uploading file:', error);
        // Handle the error as needed
      }
    );
  }
}
