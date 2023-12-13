import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ListService} from "../../services/list.service";
import {ToastrService} from "ngx-toastr";
import { jwtDecode } from 'jwt-decode';
import { MatDatepickerTimeHeaderComponent } from 'mat-datepicker-time-header';


@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss']
})
export class CreateorderComponent {
  @ViewChild("dialogRef") dialogRef: TemplateRef<any>;

  findList: any[] | undefined = [];
  viewText = false;
  sendCargoTime;
  sendCargoDate;
  citystart: string = '';
  cityfinish: string = '';
  types:any[]= [];
  transportTypes:any[]= [];
  currencies:any[]= [];
  isSafeModal:boolean = false;
  currentUser
  timeHeader = MatDatepickerTimeHeaderComponent;
  data = {
    transportTypeId:'',
    cargoTypeId:'',
    offeredPrice:'',
    cargoWeight: '',
    cargoLength:'',
    cargoWidth:'',
    cargoHeight:'',
    sendLocation: '',
    cargoDeliveryLocation: '',
    currencyId:'',
    isUrgent: false,
    isDangrousCargo: false,
    isCashlessPayment: false,
    sendCargoDate: '',
    sendCargoTime: '',
    merchantId: '',
    isSafe: false,
    start_lat: '',
    start_lng: '',
    finish_lat: '',
    finish_lng: ""
  }

  constructor(
      public helper: HelperService,
      public dialog: MatDialog,
      private toastr: ToastrService,
      private authService: AuthService,
      public listService: ListService,
  ) {
    this.listService.getTypeCargo().subscribe((res) => {
      if(res) {
        this.types = res
      }
    })

    this.listService.getTypeTruck().subscribe((res) => {
      if(res) {
        this.transportTypes = res
      }
    })

    this.listService.getCurrencies().subscribe((res) => {
      if(res) {
        this.currencies = res
      }
    })
    this.currentUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));

  }
  returnCity(city:string){
    if (city){
      return '';
    }else {
      return city.split(':')[0]
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

  selectAdr(ev:any){
    this.data.isDangrousCargo = ev.checked
  }
  selectNoCash(ev:any){
    this.data.isCashlessPayment = ev.checked
  }
  selectIsSafe(ev: any) {
    if(ev.checked) {
      this.isSafeModal = true
      this.data.isSafe = ev.checked;
    }else {
      this.isSafeModal = false
    }
  }

  addTwoDays(ev:any){
    this.data.isUrgent = ev.checked
  }

  async addOrder(){
    const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите создать заказ?', 2)
    if (confirm){
      await this.helper.loadingCreate();
      this.data.sendLocation = this.citystart.split(':')[0];
      this.data.cargoDeliveryLocation = this.cityfinish.split(':')[0];
      this.data.sendCargoDate = this.sendCargoDate
      this.data.sendCargoTime = this.sendCargoTime
      this.data.merchantId = this.currentUser.merchantId
      
      this.data.start_lat = this.citystart.split(':')[2];
      this.data.start_lng = this.citystart.split(':')[3];
      this.data.finish_lat = this.cityfinish.split(':')[2];
      this.data.finish_lng = this.cityfinish.split(':')[3];

      try {
        const res = await this.authService.createOrder(this.data).toPromise()
        if (res.success){
          await this.helper.loadingClose();
          this.toastr.success('Заказ успешно создан')
          this.dialog.closeAll();
        }
      }catch (err){
        await this.helper.loadingClose();
        this.toastr.error('Что то пошло не так')
      }
    }
  }

  getTypes() {
    this.listService.getTypeCargo().subscribe((res) => {
      if(res) 
        this.types = res;
    })
    this.listService.getTypeTruck().subscribe((res) => {
      if(res) 
        this.transportTypes = res;
    })
  }

  changeIsSafe(type) {
    this.isSafeModal = false;
    this.data.isSafe = type;
  }

  getFormattedValue(city: any): string {
    return city.data.city + ', ' + city.data.country;
  }

}
