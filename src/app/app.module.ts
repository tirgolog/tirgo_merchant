import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';

import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatCheckboxModule } from '@angular/material/checkbox'
import {MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion'

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { PartnersComponent } from './pages/partners/partners.component'
import { AddPartnerComponent } from './pages/add-partner/add-partner.component';
import { AddDriverComponent } from './pages/add-driver/add-driver.component';
import { ShippersComponent } from './pages/shippers/shippers.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

import { PushComponent } from './components/push/push.component';
import { AddTransactionsComponent } from './components/add-transactions/add-transactions.component';
import { ModalComponent } from './components/modal/modal.component';

import { TrackingComponent } from './pages/tracking/tracking.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { AdminsComponent } from './pages/admins/admins.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { UserComponent } from './pages/user/user.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { DriverComponent } from './pages/driver/driver.component';
import { OrderComponent } from './pages/order/order.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { RatesComponent } from './pages/rates/rates.component';
import { AddRateComponent } from './pages/add-rate/add-rate.component';
import { PromocodesComponent } from './pages/promocodes/promocodes.component';
import { AddPromocodeComponent } from './pages/add-promocode/add-promocode.component';
import { CarTypesComponent } from './pages/car-types/car-types.component';
import { AddCarTypeComponent } from './pages/add-car-type/add-car-type.component';
import { CargoTypesComponent } from './pages/cargo-types/cargo-types.component';
import { AddCargoTypeComponent } from './pages/add-cargo-type/add-cargo-type.component';
import { ReviewBadgesComponent } from './pages/review-badges/review-badges.component';
import { AddReviewBadgeComponent } from './pages/add-review-badge/add-review-badge.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { AddCountryComponent } from './pages/add-country/add-country.component';
import { StatesComponent } from './pages/states/states.component';
import { AddStateComponent } from './pages/add-state/add-state.component';
import { CitysComponent } from './pages/citys/citys.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ReviewComponent } from './components/review/review.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './services/api.interceptor';
import { AuthComponent } from './pages/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormatTimePipe } from './pipes/format-time.pipe';

import ruLocale from '@angular/common/locales/ru';
import { registerLocaleData } from "@angular/common";
import { OrderModule } from 'ngx-order-pipe';
import { AgGridModule } from 'ag-grid-angular';

import "ag-grid-enterprise";
import { ViewphotoComponent } from './viewphoto/viewphoto.component'
import {NgxMaskModule} from "ngx-mask";
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {MatSlideToggle, MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ActivityComponent } from './activity/activity.component';
import { ViewadminComponent } from './viewadmin/viewadmin.component';
import { CreateorderComponent } from './pages/createorder/createorder.component';
import {MatAutocomplete, MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { RoutersTruckComponent } from './routers-truck/routers-truck.component';
import { LoadingComponent } from './loading/loading.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { EdituserComponent } from './pages/edituser/edituser.component';
import { EditdriverComponent } from './pages/editdriver/editdriver.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AconfirmComponent } from './aconfirm/aconfirm.component';
import { AloadingComponent } from './aloading/aloading.component';
import { SecuretransComponent } from './pages/securetrans/securetrans.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { AddmoneyComponent } from './components/addmoney/addmoney.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ExchangerateComponent } from './exchangerate/exchangerate.component';
import {NgPipesModule} from 'ngx-pipes';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { MatDatepickerTimeHeaderModule } from "mat-datepicker-time-header";
import {MatRadioModule} from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';

import { RegistrationComponent } from './pages/registration/registration.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutModule } from '@angular/cdk/layout';
import { FinanceComponent } from './pages/finance/finance.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { SupportComponent } from './support/support.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AddDaysPipe } from './pipes/add-days.pipe';


registerLocaleData(ruLocale);

const mapConfig: YaConfig = {
   apikey: 'df0cb391-97e5-47ce-a954-f54cb0644e56',
   lang: 'ru_RU',
};

@NgModule({
   declarations: [
      AppComponent,
      SidebarComponent,
      HeaderComponent,
      HomeComponent,
      UsersComponent,
      ShippersComponent,
      DriversComponent,
      OrdersComponent,
      PushComponent,
      TransactionsComponent,
      AddTransactionsComponent,
      ModalComponent,
      AddUserComponent,
      AddPartnerComponent,
      AddDriverComponent,
      TrackingComponent,
      AdminsComponent,
      RolesComponent,
      AddRoleComponent,
      AddAdminComponent,
      UserComponent,
      PartnerComponent,
      DriverComponent,
      OrderComponent,
      TransactionComponent,
      RatesComponent,
      AddRateComponent,
      PromocodesComponent,
      AddPromocodeComponent,
      CarTypesComponent,
      AddCarTypeComponent,
      CargoTypesComponent,
      AddCargoTypeComponent,
      ReviewBadgesComponent,
      AddReviewBadgeComponent,
      CountriesComponent,
      AddCountryComponent,
      StatesComponent,
      AddStateComponent,
      CitysComponent,
      AddCityComponent,
      ReviewsComponent,
      ReviewComponent,
      ChatComponent,
      SettingsComponent,
      AuthComponent,
      ProfileComponent,
      PartnersComponent,
      FormatTimePipe,
      ViewphotoComponent,
      ActivityComponent,
      ViewadminComponent,
      CreateorderComponent,
      RoutersTruckComponent,
      LoadingComponent,
      ArchiveComponent,
      EdituserComponent,
      EditdriverComponent,
      AconfirmComponent,
      AloadingComponent,
      SecuretransComponent,
      AddmoneyComponent,
      ExchangerateComponent,
      RegistrationComponent,
      FinanceComponent,
      DocumentsComponent,
      SupportComponent,
      AnalyticsComponent,
      AddDaysPipe
   ],
   imports: [
      MatSortModule,
      MatPaginatorModule,
      NgPipesModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatSnackBarModule,
      MatSelectModule,
      NgxMatSelectSearchModule,
      NgxMaskModule.forRoot(),
      OrderModule,
      CommonModule,
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatInputModule,
      MatTableModule,
      MatDialogModule,
      MatSlideToggleModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatCheckboxModule,
      MatRippleModule,
      MatGridListModule,
      MatIconModule,
      MatDividerModule,
      MatButtonToggleModule,
      MatCardModule,
      MatDatepickerTimeHeaderModule,
      MatExpansionModule,
      MatRadioModule,
      MatCheckboxModule,
      MatAutocompleteModule,
      MatInputModule,
      MatMenuModule,
      LayoutModule,
      InfiniteScrollModule,
      AngularYandexMapsModule.forRoot(mapConfig),
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot(),
      MatExpansionModule,
      AgGridModule,
      MatButtonModule,
      MatToolbarModule
   ],

   providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ApiInterceptor,
         multi: true,
      },
      {provide: LocationStrategy, useClass: HashLocationStrategy}
   ],
   bootstrap: [
       AppComponent
   ]
})

export class AppModule { }
