import { Component } from '@angular/core';
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ListService} from "../../services/list.service";
import {ToastrService} from "ngx-toastr";
import { MatDatepickerTimeHeaderComponent } from "mat-datepicker-time-header";

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss']
})
export class CreateorderComponent {
  findList: any[] | undefined = [];
  viewText = false;
  sendCargoTime;
  sendCargoDate;
  citystart: string = '';
  cityfinish: string = '';
  types:any[]= [];
  transportTypes:any[]= [];
  currencies:any[]= [];

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
    merchantId: ''
  }

  constructor(
      public helper: HelperService,
      public dialog: MatDialog,
      private toastr: ToastrService,
      private authService: AuthService,
      public listService: ListService
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
  addTwoDays(ev:any){
    this.data.isUrgent = ev.checked
  }
  async addOrder(){
    const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите создать заказ?', 2)
    if (confirm){
      await this.helper.loadingCreate();
      this.data.sendCargoDate = this.sendCargoDate
      this.data.sendCargoTime = this.sendCargoTime
      this.data.merchantId = this.authService.currentUser.id
      try {
        const res = await this.authService.createOrder(this.data).toPromise()
        if (res.status){
          await this.helper.loadingClose();
          this.toastr.success('Заказ успешно создан')
          this.dialog.closeAll();
        }
      }catch (err){
        await this.helper.loadingClose();
        this.toastr.error('Что то пошло не так')
      }
    }

    /*if (new Date(this.data.date_start).getTime() < new Date().getTime()){
      this.toastr.error('Невозможно создать заказ на старую дату')
    }else {

    }*/
  }
}
