import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { AddCarTypeComponent } from './pages/add-car-type/add-car-type.component';
import { AddCargoTypeComponent } from './pages/add-cargo-type/add-cargo-type.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { AddCountryComponent } from './pages/add-country/add-country.component';
import { AddDriverComponent } from './pages/add-driver/add-driver.component';
import { AddPartnerComponent } from './pages/add-partner/add-partner.component';
import { AddPromocodeComponent } from './pages/add-promocode/add-promocode.component';
import { AddRateComponent } from './pages/add-rate/add-rate.component';
import { AddReviewBadgeComponent } from './pages/add-review-badge/add-review-badge.component';
import { AddRoleComponent } from './pages/add-role/add-role.component';
import { AddStateComponent } from './pages/add-state/add-state.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AdminsComponent } from './pages/admins/admins.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CarTypesComponent } from './pages/car-types/car-types.component';
import { CargoTypesComponent } from './pages/cargo-types/cargo-types.component';
import { ChatComponent } from './pages/chat/chat.component';
import { CitysComponent } from './pages/citys/citys.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { DriverComponent } from './pages/driver/driver.component';

import { DriversComponent } from './pages/drivers/drivers.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PartnerComponent } from './pages/partner/partner.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PromocodesComponent } from './pages/promocodes/promocodes.component';
import { RatesComponent } from './pages/rates/rates.component';
import { ReviewBadgesComponent } from './pages/review-badges/review-badges.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { RolesComponent } from './pages/roles/roles.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ShippersComponent } from './pages/shippers/shippers.component';
import { StatesComponent } from './pages/states/states.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { TransactionComponent } from './pages/transaction/transaction.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';
import {ViewphotoComponent} from "./viewphoto/viewphoto.component";
import {ActivityComponent} from "./activity/activity.component";
import {ViewadminComponent} from "./viewadmin/viewadmin.component";
import {CreateorderComponent} from "./pages/createorder/createorder.component";
import {RoutersTruckComponent} from "./routers-truck/routers-truck.component";
import {LoadingComponent} from "./loading/loading.component";
import {ArchiveComponent} from "./pages/archive/archive.component";
import {SecuretransComponent} from "./pages/securetrans/securetrans.component";
import {ExchangerateComponent} from "./exchangerate/exchangerate.component";
import { RegistrationComponent } from './pages/registration/registration.component';
import { FinanceComponent } from './pages/finance/finance.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { SupportComponent } from './support/support.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { EdituserComponent } from './pages/edituser/edituser.component';


const routes: Routes = [
   {
      path: "loading",
      component: LoadingComponent,
      title: "Загрузка"
   },
   {
      path: "dashboard",
      component: HomeComponent,
      title: "Главная"
   },
   {
      path: "users",
      component: UsersComponent,
      title: "Все пользователи"
   },
   {
      path: "user",
      component: UserComponent,
      title: "Подробнее о пользователе"
   },
   {
      path: "add-user",
      component: AddUserComponent,
      title: "Все пользователи / Добавить пользователя"
   },
   {
      path: "user/:id",
      component: EdituserComponent,
      title: "Все пользователи / Редактировать пользователя"
   },
   {
      path: "partners",
      component: PartnersComponent,
      title: "Партнеры"
   },
   {
      path: "partner/:id",
      component: PartnerComponent,
      title: "Подробнее о Партнере"
   },
   {
      path: "add-partner",
      component: AddPartnerComponent,
      title: "Добавить Партнера"
   },
   {
      path: "shippers",
      component: ShippersComponent,
      title: "Грузоотправители"
   },
   {
      path: "drivers",
      component: DriversComponent,
      title: "Водители"
   },
   {
      path: "driver",
      component: DriverComponent,
      title: "Подробнее о водителе"
   },
   {
      path: "add-driver",
      component: AddDriverComponent,
      title: "Водители: Добавление"
   },
   {
      path: "orders",
      component: OrdersComponent,
      title: "Заказы"
   },
   {
      path: "order",
      component: OrderComponent,
      title: "Подробнее о заказах"
   },
   {
      path: "transactions",
      component: TransactionsComponent,
      title: "Транзакции"
   },
   {
      path: "transaction",
      component: TransactionComponent,
      title: "Детали транзакции"
   },
   {
      path: "tracking",
      component: TrackingComponent,
      title: "Трекинг"
   },
   {
      path: "admins",
      component: AdminsComponent,
      title: "Администраторы"
   },
   {
      path: "add-admin",
      component: AddAdminComponent,
      title: "Админы: Добавление"
   },
   {
      path: "roles",
      component: RolesComponent,
      title: "Роли пользователей"
   },
   {
      path: "add-role",
      component: AddRoleComponent,
      title: "Роли пользователей: Добавление"
   },
   {
      path: "rates",
      component: RatesComponent,
      title: "Подписки"
   },
   {
      path: "add-rate",
      component: AddRateComponent,
      title: "Подписки: Добавление"
   },
   {
      path: "promocodes",
      component: PromocodesComponent,
      title: "Промо-коды"
   },
   {
      path: "add-promocode",
      component: AddPromocodeComponent,
      title: "Промо-коды: Добавление"
   },
   {
      path: "car-types",
      component: CarTypesComponent,
      title: "Типы транспорта"
   },
   {
      path: "add-car-type",
      component: AddCarTypeComponent,
      title: "Типы транспорта: Добавление"
   },
   {
      path: "cargo-types",
      component: CargoTypesComponent,
      title: "Типы грузов"
   },
   {
      path: "add-cargo-type",
      component: AddCargoTypeComponent,
      title: "Типы грузов: Добавление"
   },
   {
      path: "review-badges",
      component: ReviewBadgesComponent,
      title: "Критерии отзывов"
   },
   {
      path: "add-review-badge",
      component: AddReviewBadgeComponent,
      title: "Критерии отзывов: Добавление"
   },
   {
      path: "countries",
      component: CountriesComponent,
      title: "Страны"
   },
   {
      path: "add-country",
      component: AddCountryComponent,
      title: "Страны: Добавление"
   },
   {
      path: "states",
      component: StatesComponent,
      title: "Страны: Регионы"
   },
   {
      path: "add-state",
      component: AddStateComponent,
      title: "Страны | Регионы: Добавление"
   },
   {
      path: "citys",
      component: CitysComponent,
      title: "Страны: Города"
   },
   {
      path: "add-city",
      component: AddCityComponent,
      title: "Страны | Города: Добавление"
   },
   {
      path: "reviews",
      component: ReviewsComponent,
      title: "Отзывы"
   },
   {
      path: "chat",
      component: ChatComponent,
      title: "Чат"
   },
   {
      path: "settings",
      component: SettingsComponent,
      title: "Настройки"
   },
   {
      path: "profile",
      component: ProfileComponent,
      title: "Профиль"
   },
   {
      path: "auth",
      component: AuthComponent,
      title: "Логин"
   },
   {
      path: "registration",
      component: RegistrationComponent,
      title: "Регистрация"
   },
   {
      path: "viewphoto",
      component: ViewphotoComponent,
      title: "Просмотр фото"
   },
   {
      path: "activity",
      component: ActivityComponent,
      title: "Активность пользователей"
   },
   {
      path: "viewadmin",
      component: ViewadminComponent,
      title: "Просмотр администратора"
   },
   {
      path: "createorerd",
      component: CreateorderComponent,
      title: "Просмотр администратора"
   },
   {
      path: "routers-truck", 
      component: RoutersTruckComponent,
      title: "Маршруты"
   },
   {
      path: "loading",
      component: LoadingComponent,
      title: "Загрузка"
   },
   {
      path: "archive",
      component: ArchiveComponent,
      title: "Архивные водители"
   },
   {
      path: "securetrans",
      component: SecuretransComponent,
      title: "Безопасная сделка"
   },
   {
      path: "exchangerate",
      component: ExchangerateComponent,
      title: "Курс валют"
   },
   {
      path: "finance",
      component: FinanceComponent,
      title: "Финансы"
   },
   {
      path: "documents",
      component: DocumentsComponent,
      title: "Документы"
   },
   {
      path: "support",
      component: SupportComponent,
      title: "Служба поддержки"
   },
   {
      path: "analytics",
      component: AnalyticsComponent,
      title: "Аналитика"
   }

];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
