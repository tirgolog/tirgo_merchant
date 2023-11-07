import { Component } from '@angular/core';
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ListService} from "../../services/list.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-createorder',
  templateUrl: './createorder.component.html',
  styleUrls: ['./createorder.component.scss']
})
export class CreateorderComponent {
  findList: any[] | undefined = [];
  viewText = false;
  time:string = '';
  citystart: string = '';
  cityfinish: string = '';
  data = {
    userid:'',
    typetransport:'',
    typecargo:'',
    add_two_days: false,
    adr: false,
    no_cash: false,
    weight: '',
    price:'',
    length_box:'',
    width_box:'',
    height_box:'',

    city_start_id: 0,
    city_start: '',
    start_lat:'',
    start_lng:'',
    city_finish_id: 0,
    city_finish: '',
    finish_lat:'',
    finish_lng:'',
    date_start: new Date()
  }
  constructor(
      public helper: HelperService,
      public dialog: MatDialog,
      private toastr: ToastrService,
      private authService: AuthService,
      public listService: ListService
  ) {
  }
  returnCity(city:string){
    if (city){
      return '';
    }else {
      return city.split(':')[0]
    }
  }
  async findCity(ev:any) {
    const findText = ev.target.value.toString().trim().toLowerCase();
    console.log(findText)
    if (findText.length >= 2) {
      this.viewText = true;
      this.findList = await this.authService.findCity(findText).toPromise();
    } else {
      this.viewText = false;
      this.findList = [];
    }
  }
  selectUserId(id:string){
    this.data.userid = id;
  }
  selectAdr(ev:any){
    this.data.adr = ev.checked
  }
  selectNoCash(ev:any){
    this.data.no_cash = ev.checked
  }
  addTwoDays(ev:any){
    this.data.add_two_days = ev.checked
  }
  async addOrder(){
    const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите создать заказ?', 2)
    if (confirm){
      await this.helper.loadingCreate();
      const time = this.time.split(":");
      this.data.date_start = new Date(new Date(this.data.date_start).setHours(+time[0],+time[1],0,0));
      this.data.userid = this.data.userid.split(' - ')[0];
      this.data.typetransport = this.data.typetransport.split(' - ')[0];
      this.data.typecargo = this.data.typecargo.split(' - ')[0];
      this.data.city_start_id = +this.citystart.split(':')[1];
      this.data.city_finish_id = +this.cityfinish.split(':')[1];
      this.data.city_start = this.citystart.split(':')[0];
      this.data.city_finish = this.cityfinish.split(':')[0];
      this.data.start_lat = this.citystart.split(':')[2];
      this.data.start_lng = this.citystart.split(':')[3];
      this.data.finish_lat = this.cityfinish.split(':')[2];
      this.data.finish_lng = this.cityfinish.split(':')[3];
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
