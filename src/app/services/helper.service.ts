import { Injectable } from '@angular/core';
import {ViewphotoComponent} from "../viewphoto/viewphoto.component";
import {MatDialog} from "@angular/material/dialog";
import {AconfirmComponent} from "../aconfirm/aconfirm.component";
import {AloadingComponent} from "../aloading/aloading.component";

@Injectable({
   providedIn: 'root'
})


export class HelperService {
   public global_loading: boolean = false;
   public orders: any[] = [];
   public orders_count: number = 0;

   public save_orders: any[] = [];
   public save_orders_count: number = 0;

   public drivers: any[] = [];
   public drivers_count: number = 0;

   public users: any[] = [];
   public users_count: number = 0;

   public deletedusers: any[] = [];
   public deletedusers_count: number = 0;

   public activity: any[] = [];
   public activity_count: number = 0;

   public admins: any[] = [];
   public roles: any[] = [];
   public typetruck: any[] = [];
   public typecargo: any[] = [];
   public securetrans: any[] = [];
   public transactions_type: any[] = [];
   public currencies: any[] = [];
   //tracking
   public lat:number = 41.79269086748189;
   public lng:number = 69.41499107230395;

   //messages
   public messages: any[] = [];

   public partners: any[] = [];
   public reviews: any[] = [];

   public isLoading:boolean = false;

   public localeTextAgGrid = {
      // for filter pa
      page: 'страница',
      more: 'больше',
      to: 'до',
      of: 'из',
      next: 'следующая',
      last: 'последняя',
      first: 'первая',
      previous: 'предыдущая',
      loadingOoo: 'загрузка...',

      // for set filter
      selectAll: 'Выделить все',
      searchOoo: 'Поиск...',
      blanks: 'Пустые',

      // for number filter and text filter
      filterOoo: 'Фильтр...',
      applyFilter: 'Применить фильтр...',
      equals: 'Равно',
      notEqual: 'Не равно',

      // for number filter
      lessThan: 'Меньше, чем',
      greaterThan: 'Больше, чем',
      lessThanOrEqual: 'Меньше или равно',
      greaterThanOrEqual: 'Больше или равно',
      inRange: 'В диапазоне',

      // for text filter
      contains: 'Содержит',
      notContains: 'Не содержит',
      startsWith: 'Начинается с',
      endsWith: 'Заканчивается на',

      // filter conditions
      andCondition: 'И',
      orCondition: 'ИЛИ',

      // the header of the default group column
      group: 'laGroup',

      // tool panel
      columns: 'laColumns',
      filters: 'laFilters',
      rowGroupColumns: 'laPivot Cols',
      rowGroupColumnsEmptyMessage: 'Фильтр и поиск интегрированы в таблицу',
      valueColumns: 'laValue Cols',
      pivotMode: 'laPivot-Mode',
      groups: 'laGroups',
      values: 'laValues',
      pivots: 'laPivots',
      valueColumnsEmptyMessage: 'la drag cols to aggregate',
      pivotColumnsEmptyMessage: 'la drag here to pivot',
      toolPanelButton: 'la tool panel',

      // other
      noRowsToShow: 'Нет данных',

      // enterprise menu
      pinColumn: 'Закрепить столбец',
      valueAggregation: 'laValue Agg',
      autosizeThiscolumn: 'Автоподбор ширины столбца',
      autosizeAllColumns: 'Автоподбор ширины всех столбцов',
      groupBy: 'laGroup by',
      ungroupBy: 'laUnGroup by',
      resetColumns: 'Сбросить колонки',
      expandAll: 'laOpen-em-up',
      collapseAll: 'laClose-em-up',
      toolPanel: 'laTool Panelo',
      export: 'Экспорт',
      csvExport: 'Экспорт в CSV',
      excelExport: 'Экспорт в Excel (.xlsx)',
      excelXmlExport: 'Экспорт в Excel (.xml)',

      // enterprise menu pinning
      pinLeft: 'Закрепить слева',
      pinRight: 'Закрепить справа',
      noPin: 'Снять закрепление',

      // enterprise menu aggregation and status bar
      sum: 'laSum',
      min: 'laMin',
      max: 'laMax',
      none: 'laNone',
      count: 'laCount',
      average: 'laAverage',
      filteredRows: 'Отфильтровано',
      selectedRows: 'Выбрано',
      totalRows: 'Всего строк',
      totalAndFilteredRows: 'Строк',

      // standard menu
      copy: 'Копировать',
      copyWithHeaders: 'Копировать с заголовками',
      ctrlC: 'Ctrl + C',
      paste: 'Вставить',
      ctrlV: 'Ctrl + V'
   };
   loading:any;
   constructor(
       public dialog: MatDialog,
       ) {
   }
   async openDialogConfirm(header:string,text:string,type:number){
      const dialogRef = this.dialog.open(AconfirmComponent, {
         width: '280px',
         height: '250px',
         panelClass: 'custom-confirm-dialog',
         data: {header,text,type}
      });
      return dialogRef.afterClosed().toPromise()
   }
   async loadingCreate(){
      this.loading = this.dialog.open(AloadingComponent, {
         width: '280px',
         height: '250px',
         panelClass: 'custom-confirm-dialog',
         disableClose:true
      });
   }
   async loadingClose(){
      this.loading.close()
   }
   returnDate(date:any){
      return new Date(date).toString()
   }
   returnNameTypeTransport(type:number){
      const index = this.typetruck.findIndex(e => +e.id === +type)
      if (index>=0){
         return this.typetruck[index].name
      }else {
         return 'Не выбрано'
      }
   }
   returnNameCargoType(id:number){
      const index = this.typecargo.findIndex(e => +e.id === +id)
      if (index>=0){
         return this.typecargo[index].name
      }else {
         return 'Не выбрано'
      }
   }
   returnNameRole(id:number){
      const index = this.roles.findIndex(e => +e.id === +id)
      if (index>=0){
         return this.roles[index].name
      }else {
         return 'Не выбрано'
      }
   }
   viewPhoto(ev:any): void {
      const dialogRef = this.dialog.open(ViewphotoComponent, {
         width: 'auto',
         height: 'auto',
         panelClass: 'custom-dialog-class',
         data: ev
      });
   }


}
