import { Component } from '@angular/core';
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {ListService} from "../../services/list.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";

@Component({
   selector: 'app-add-driver',
   templateUrl: './add-driver.component.html',
   styleUrls: ['./add-driver.component.scss'],
   host: { "id": "main" },
})

export class AddDriverComponent {
   dataUser = {
      name:'',
      phone:'',
      email:'',
      country:'Узбекистан',
      city:'Ташкент',
      birthday: new Date()
   };
   dataCar = {
      userid:0,
      type: 0,
      maxweight:21000,
      name:'',
      description:'',
      adr:false,
      cubature:'96',
      state_number:''
   };
   dial_code:string = '';
   count_number:string = '7';
   step:number = 1;
   loading:boolean = false;
   public citiesSelected: FormControl = new FormControl();
   public selectTechnicalRoomFilterCtrl: FormControl = new FormControl();
   findList: any[] | undefined = [];
   viewText = false;
   cityInfo:any[]=[]
   constructor(
       public helper:HelperService,
       private toastr: ToastrService,
       private authService: AuthService,
       public dialog: MatDialog,
       public listService: ListService,
   ) {
   }
   getFile(e: any, el: any) {
      el.value = e.files[0].name
   }

   nextStep() {
   }
   onDate(event:any): void {
      console.log(event)
      this.dataUser.birthday = event;
   }
   async addUser(){
      const confirm = await this.helper.openDialogConfirm('Вы уверены?', 'Вы уверены что хотите добавить данного пользователя?', 2)
      if (confirm){
         this.cityInfo = this.citiesSelected.value;
         this.dataUser.phone = this.dial_code + '' + this.dataUser.phone
         console.log(this.dataUser,this.cityInfo)
         const res = await this.authService.addUser(this.dataUser,this.cityInfo).toPromise();
         if (res.status) {
            this.step = 2
            this.dataCar.userid = res.id
            this.toastr.success('Пользователь успешно добавлен')
            this.loading = false;
         }else {
            this.toastr.error(res.error)
            this.loading = false;
         }
      }
   }
   getActualPrefix() {
      //this.citiesSelected.value
      const phoneInfo = this.authService.phones.filter(e => e.code === this.citiesSelected.value.country_iso_code)
      this.dial_code = phoneInfo[0].dial_code
      return phoneInfo[0].dial_code
   }
   getActualMask(){
      const phoneInfo = this.authService.phones.filter(e => e.code === this.citiesSelected.value.country_iso_code)
      return phoneInfo[0].mask
   }
   selectAdr(ev:any){
      this.dataCar.adr = ev.checked
   }
   async addTransportToUser(){
      const res = await this.authService.addTransportToUser(this.dataCar).toPromise();
      if (res.status) {
         this.toastr.success('Транспорт успешно добавлен')
         this.dialog.closeAll();
      }else {
         this.toastr.error(res.text)
      }
   }

   async findCity(ev:any) {
      const findText = ev.target.value.toString().trim().toLowerCase();
      if (findText.length >= 2) {
         this.viewText = true;
         this.findList = await this.authService.findCity(findText).toPromise();
      } else {
         this.viewText = false;
         this.findList = [];
      }
   }
}
