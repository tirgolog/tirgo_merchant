import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { HelperService } from "../../services/helper.service";
import { AuthService } from "../../services/auth.service";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ListService } from "../../services/list.service";
import { ToastrService } from "ngx-toastr";
import { jwtDecode } from "jwt-decode";
import { MatDatepickerTimeHeaderComponent } from "mat-datepicker-time-header";
import { AbstractControl, NgForm, ValidatorFn } from "@angular/forms";

@Component({
  selector: "app-createorder",
  templateUrl: "./createorder.component.html",
  styleUrls: ["./createorder.component.scss"],
})
export class CreateorderComponent {
  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;
  @ViewChild("myForm") form: NgForm;

  findList: any[] | undefined = [];
  viewText = false;
  sendCargoTime;
  sendCargoDate;
  citystart: string = "";
  cityfinish: string = "";
  types: any[] = [];
  transportTypes: any[] = [];
  currencies: any[] = [];
  isSafeModal: boolean = false;
  currentUser;
  timeHeader = MatDatepickerTimeHeaderComponent;
  data = {
    transportTypeIds: "",
    cargoTypeId: "",
    offeredPrice: "",
    cargoWeight: "",
    cargoLength: "",
    cargoWidth: "",
    cargoHeight: "",
    sendLocation: "",
    cargoDeliveryLocation: "",
    currencyId: "",
    isUrgent: false,
    isDangrousCargo: false,
    isCashlessPayment: false,
    sendCargoDate: "",
    sendCargoTime: "",
    merchantId: "",
    isSafe: false,
    start_lat: "",
    start_lng: "",
    finish_lat: "",
    finish_lng: "",
  };

  constructor(
    public helper: HelperService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private authService: AuthService,
    public listService: ListService,
  ) {
    this.listService.getTypeCargo().subscribe((res) => {
      if (res) {
        this.types = res;
      }
    });

    this.listService.getTypeTruck().subscribe((res) => {
      if (res) {
        this.transportTypes = res;
      }
    });

    this.listService.getCurrencies().subscribe((res) => {
      if (res) {
        this.currencies = res;
      }
    });
    this.currentUser = jwtDecode(localStorage.getItem("jwttirgomerhant"));
  }
  returnCity(city: string) {
    if (city) {
      return "";
    } else {
      return city.split(":")[0];
    }
  }
  async findCity(ev: any) {
    try {
      const findText = ev.target.value.toString().trim().toLowerCase();
      if (findText.length >= 2) {
        this.viewText = true;
        this.findList = await this.authService.findCity(findText).toPromise();
      } else {
        this.viewText = false;
        this.findList = [];
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  }
  selectAdr(ev: any) {
    this.data.isDangrousCargo = ev.checked;
  }
  selectNoCash(ev: any) {
    this.data.isCashlessPayment = ev.checked;
  }
  selectIsSafe(ev: any) {
    if (ev.checked) {
      this.isSafeModal = true;
      this.data.isCashlessPayment = ev.checked;
      this.data.isSafe = ev.checked;
    } else {
      this.isSafeModal = false;
      this.data.isCashlessPayment = false;
    }
  }
  addTwoDays(ev: any) {
    this.data.isUrgent = ev.checked;
  }
  addOrder() {
    const sendCargoDateOnly = new Date(this.sendCargoDate);
    sendCargoDateOnly.setHours(0, 0, 0, 0);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (sendCargoDateOnly.getTime() < currentDate.getTime()) {
      this.toastr.error("Выбранная дата не может быть меньше текущей даты.");
    }
    else if (this.citystart == '') {
      this.toastr.error('Не можем создать заказ, Нужно выбрать место отправки груза');
    }
    else if (this.cityfinish == '') {
      this.toastr.error('Не можем создать заказ, Нужно выбрать место доставки груза');
    }
    else if (this.data.cargoTypeId == '') {
      this.toastr.error('Не можем создать заказ, Нужно выбрать тип груза');
    }
    else if (this.data.transportTypeIds == '') {
      this.toastr.error('Не можем создать заказ, Нужно выбрать тип транспорта');
    }
    else if (this.sendCargoDate == undefined) {
      this.toastr.error('Не можем создать заказ, Нужно выбрать дата отправки груза');
    }
    else if (this.sendCargoTime == undefined) {
      this.toastr.error('Не можем создать заказ, Нужно выбрать время отправки груза');
    }
    else if (this.data.cargoWeight == '') {
      this.toastr.error('Не можем создать заказ, Нужно выбрать вес груза');
    }
    else {
      this.data.sendLocation = this.citystart.split(":")[0];
      this.data.cargoDeliveryLocation = this.cityfinish.split(":")[0];
      this.data.sendCargoDate = this.sendCargoDate;
      this.data.sendCargoTime = this.sendCargoTime;
      this.data.merchantId = this.currentUser.merchantId;
      this.data.currencyId = '74d13e0a-4cd0-4fb1-ae66-5f87e25d67f4'

      this.data.start_lat = this.citystart.split(":")[1];
      this.data.start_lng = this.citystart.split(":")[2];
      this.data.finish_lat = this.cityfinish.split(":")[1];
      this.data.finish_lng = this.cityfinish.split(":")[2];

      this.authService.createOrder(this.data).subscribe((res: any) => {
        if (res.success) {
          this.helper.loadingClose();
          this.toastr.success("Заказ успешно создан");
          this.dialog.closeAll();
        }
        else {
          this.helper.loadingClose();
          this.toastr.error("Что то пошло не так");
        }
      })
    }
  }
  getTypes() {
    this.listService.getTypeCargo().subscribe((res) => {
      if (res) this.types = res;
    });
    this.listService.getTypeTruck().subscribe((res) => {
      if (res) this.transportTypes = res;
    });
  }
  changeIsSafe(type) {
    this.isSafeModal = false;
    this.data.isSafe = type;
    this.data.isCashlessPayment = type;
  }
  getFormattedValue(city: any): string {
    return city.data.city + ", " + city.data.country;
  }
}
