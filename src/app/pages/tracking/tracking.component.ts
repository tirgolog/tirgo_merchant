import { Component } from '@angular/core';
import {HelperService} from "../../services/helper.service";
import {DriverComponent} from "../driver/driver.component";
import {MatDialog} from "@angular/material/dialog";
import {YaReadyEvent} from "angular8-yandex-maps";
import {FormControl} from "@angular/forms";
import {ListService} from "../../services/list.service";

@Component({
   selector: 'app-tracking',
   templateUrl: './tracking.component.html',
   styleUrls: ['./tracking.component.scss'],
   host: { "id": "main" }
})
export class TrackingComponent {
   map:any;
   isLoading:boolean = true;
   status:number = 0;
   typecar:number = 0;
   drivers:any[]=[];
   public citiesSelected: FormControl = new FormControl();
   public selectTechnicalRoomFilterCtrl: FormControl = new FormControl();
   constructor(
       public dialog: MatDialog,
       public listService: ListService,
       public helper: HelperService
   ) {
   }

   async ngOnInit() {
      const res = await this.listService.getAllTrackingDrivers().toPromise();
      if (res.status){
         this.drivers = res.data
         this.isLoading = false;
      }
   }
   async findDriver(ev:any){
      this.drivers = this.helper.drivers.filter((row:any) => {
         return !row.id ? row.id: row.id.toString().includes(ev.target.value) ||
         !row.name ? row.name: row.name.toLowerCase().includes(ev.target.value.toLowerCase());
      });
      await this.onReady(this.map);
   }

   viewDriver(item:any){
      this.dialog.open(DriverComponent, {
         width: '90%',
         height: '80%',
         panelClass: 'custom-dialog-class',
         data: item
      });
   }
   async selectStatus(status:number){
      this.status = status;
      if (status === 1){
         this.drivers = this.helper.drivers.filter(item=>{
            if (item.orders) {
               return item.orders.find((e: {status: number;status_order: number;}) => e.status_order === 1 && e.status === 1)
            }
         })
      }else if (status === 2){
         this.drivers = this.helper.drivers.filter(item=>{
            if (item.orders) {
               return item.orders.find((e: {status: number;status_order: number;}) => e.status_order === 0 && e.status === 1)
            }
         })
      }else if (status === 3){
         this.drivers = this.helper.drivers.filter(item=>{
            if (!item.orders){
               return item
            }
         })
      }else {
         this.drivers = this.helper.drivers
      }
      await this.onReady(this.map);
   }
   async selectTypeCar(id:number){
      this.typecar = id;
      if (id > 0){
         this.drivers = this.helper.drivers.filter(item=>{
            if (item.trucks && item.trucks.length){
               return item.trucks.find((e: { type: number; }) => +e.type === +this.typecar)
            }
         })
      }else {
         this.drivers = this.helper.drivers
      }
      await this.onReady(this.map);
   }
   onReady(e: YaReadyEvent<ymaps.Map>){
      let dialog = this.dialog;
      this.map = e;
      const { ymaps, target } = e;
      const clusterer = new ymaps.Clusterer({
         preset: 'islands#invertedOrangeClusterIcons',
         clusterHideIconOnBalloonOpen: false,
         geoObjectHideIconOnBalloonOpen: false
      });
      clusterer.removeAll();
      target.geoObjects.removeAll();
      for (let row of this.drivers){
         /*let contacts = '';
         for (let contact of row.contacts){
            contacts = contacts + '<strong>+' + contact.text + '</strong><br>'
         }*/
         if (row.lat){
            let placemark = new ymaps.Placemark(
                [row.lat, row.lng],
                {
                   clusterCaption: '<strong>' + row.id + ' ' + row.name + '</strong>',
                   //balloonContentBody: row.id + ' ' + row.name + '<br>Контакты ' + contacts
                },
                // any as IPlacemarkOptions is missing balloonContentLayout
                {
                   iconLayout: this.getOptionsBaloon(row),
                   iconShape: {
                      type: 'Rectangle',
                      coordinates: [
                         [0, -22], [65, 22]
                      ]
                   }
                } as any,

            );
            placemark.events.add('click', function (e) {
               dialog.open(DriverComponent, {
                  width: '90%',
                  height: '80%',
                  panelClass: 'custom-dialog-class',
                  data: row
               });
            })
            clusterer.add(placemark);
         }
      }
      target.geoObjects.add(clusterer);
   }
   getOptionsBaloon(item:any){
      let busy = item.busy;
      /*if (item.orders){
         if (item.orders.find((e: {
            status: number;
            status_order: number; }) => e.status_order === 1 && e.status === 1)){
            busy = 1
         }else if (item.orders.find((e: {
            status: number;
            status_order: number; }) => e.status_order === 0 && e.status === 1)){
            busy = 2
         }
      }*/
      let circleLayout;
      if (busy === 1){
         circleLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark-map-busy"><span>'+item.id+'</span></div>')
      }else if (busy === 0) {
         circleLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark-map"><span>'+item.id+'</span></div>')
      }else if (busy === 2) {
         circleLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark-map-wait"><span>'+item.id+'</span></div>')
      }
      return circleLayout
   }
}
