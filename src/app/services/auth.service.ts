import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { ListService } from './list.service';

const TOKEN_KEY = 'jwttirgomerhant';
const API_URL = 'https://merchant.tirgo.io/api/v1'
@Injectable({
   providedIn: 'root'
})

export class AuthService {
   globalLoading: boolean = true;
   authenticationState = new BehaviorSubject(false);
   public currentUser: User | undefined;
   public myrole: any;
   static jwt: any;
   static adminJWT: any;

   constructor(
      private http: HttpClient,
      private list: ListService
   ) { }

   loginAdmin(username: string, password: string) {
      const sUrl = API_URL + '/auth/login';
      const body = JSON.stringify({
         username, password
      });
      return this.http.post<any>(sUrl, body);
   }

   getUsers() {
      let curUser = jwtDecode(localStorage.getItem('jwttirgomerhant'));
      const sUrl = API_URL + "/users/id?id=" + curUser.sub;
      return this.http.get<any>(sUrl).pipe(map(res => {
         if (res.data) {
            return new User(res.data);
         } else {
            return false;
         }
      }));
   }

   // checkSession() {
   // const sUrl = API_URL + '/merchant/checkSessionAdmin';
   // return this.http.get<any>(sUrl)
   //     .pipe(map(res => {
   //        if (res.user) {
   //           return new User(res.user);
   //        } else {
   //           return false;
   //        }
   //     }));
   // }
   saveUser(data: any, id: number) {
      const sUrl = API_URL + '/admin/saveUser';
      const body = JSON.stringify({
         data, id
      });
      return this.http.post<any>(sUrl, body);
   }
   saveUserInfo(name: string, birthday: string, country: string, city: string, id: number) {
      const sUrl = API_URL + '/admin/saveUserInfo';
      const body = JSON.stringify({
         name, birthday, country, city, id
      });
      return this.http.post<any>(sUrl, body);
   }
   deleteUser(id: number) {
      const sUrl = API_URL + '/admin/deleteUser';
      const body = JSON.stringify({
         id
      });
      return this.http.post<any>(sUrl, body);
   }
   savePassportUser(passport: string, passportdate: string, id: number) {
      const sUrl = API_URL + '/admin/savePassportUser';
      const body = JSON.stringify({
         passport, passportdate, id
      });
      return this.http.post<any>(sUrl, body);
   }
   saveDriverLicenseUser(license: string, id: number) {
      const sUrl = API_URL + '/admin/saveDriverLicenseUser';
      const body = JSON.stringify({
         license, id
      });
      return this.http.post<any>(sUrl, body);
   }
   delDirty(id: number) {
      const sUrl = API_URL + '/admin/delDirty';
      const body = JSON.stringify({
         id
      });
      return this.http.post<any>(sUrl, body);
   }
   modarateUser(id: number) {
      const sUrl = API_URL + '/admin/modarateUser';
      const body = JSON.stringify({
         id
      });
      return this.http.post<any>(sUrl, body);
   }
   returnUser(id: number) {
      const sUrl = API_URL + '/admin/returnUser';
      const body = JSON.stringify({
         id
      });
      return this.http.post<any>(sUrl, body);
   }
   saveRole(data: any, id: number) {
      const sUrl = API_URL + '/admin/saveRole';
      const body = JSON.stringify({
         data, id
      });
      return this.http.post<any>(sUrl, body);
   }
   addAdmin(name: string, role: number, username: string, password: string, phone: string, editaid: number) {
      const sUrl = API_URL + '/admin/addAdmin';
      const body = JSON.stringify({
         name, role, username, password, phone, editaid
      });
      return this.http.post<any>(sUrl, body);
   }
   addUser(datauser: any, cityinfo: any) {
      const sUrl = API_URL + '/admin/addUser';
      const body = JSON.stringify({
         datauser, cityinfo
      });
      return this.http.post<any>(sUrl, body);
   }
   addMerchant(data: any) {
      const sUrl = API_URL + '/merchant';
      return this.http.post<any>(sUrl, data);

   }
   adminBanned(banned: boolean, userid: number) {
      const sUrl = API_URL + '/admin/bannedAdmin';
      const body = JSON.stringify({
         banned, userid
      });
      return this.http.post<any>(sUrl, body);
   }
   closeOrder(orderid: any) {
      const sUrl = API_URL + '/admin/closeOrder';
      const body = JSON.stringify({
         orderid
      });
      return this.http.post<any>(sUrl, body);
   }
   endOrder(orderid: any) {
      const sUrl = API_URL + '/admin/endOrder';
      const body = JSON.stringify({
         orderid
      });
      return this.http.post<any>(sUrl, body);
   }
   acceptOrderDriver(userid: number, price: string, orderid: number) {
      const sUrl = API_URL + '/admin/acceptOrderDriver';
      const body = JSON.stringify({
         userid, price, orderid
      });
      return this.http.post<any>(sUrl, body);
   }
   acceptOfferDriver(data) {
      const sUrl = API_URL + '/cargo/accept-offer';
      return this.http.post<any>(sUrl, data);
   }
   createClient(data) {
      const sUrl = API_URL + '/users';
      return this.http.post<any>(sUrl, data);
   }
   addTransportToUser(datacar: any) {
      const sUrl = API_URL + '/admin/addTransportToUser';
      const body = JSON.stringify({
         data: datacar
      });
      return this.http.post<any>(sUrl, body);
   }
   logout() {
      localStorage.removeItem(TOKEN_KEY);
      this.authenticationState.next(false);
   }
   isAuthenticated() {
      return this.authenticationState.value;
   }
   setJwt(jwt: string) {
      AuthService.jwt = jwt;
      localStorage.setItem(TOKEN_KEY, jwt);
      this.authenticationState.next(true);
      this.getUsers();
   }
   setAdminJwt(jwt: string) {
      AuthService.adminJWT = jwt;
      localStorage.setItem('adminJWT', jwt);
   }
   checkToken() {
      const res = localStorage.getItem(TOKEN_KEY)
      if (res) {
         AuthService.jwt = res;
         this.authenticationState.next(true);
      } else {
         this.authenticationState.next(false);
      }
   }

   tokenExist() {
      const res = localStorage.getItem(TOKEN_KEY)
      if (res) {
         return true
      } else {
         return false
      }
   }

   changePassword(currPass: string, newPass: string) {
      const sUrl = API_URL + '/admin/editPassword';
      const body = JSON.stringify({
         currPass, newPass
      });
      return this.http.post<any>(sUrl, body);
   }
   sendMessage(message: string, id: number) {
      const sUrl = API_URL + '/admin/sendMessageSupport';
      const body = JSON.stringify({
         message, id
      });
      return this.http.post<any>(sUrl, body);
   }
   addTypeCargo(type: string) {
      const sUrl = API_URL + '/admin/addTypeCargo';
      const body = JSON.stringify({
         type
      });
      return this.http.post<any>(sUrl, body);
   }
   addPayment(description, amount, type, id) {
      const sUrl = API_URL + '/admin/addPayment';
      const body = JSON.stringify({
         description, amount, type, id
      });
      return this.http.post<any>(sUrl, body);
   }
   addTypeCar(data: any) {
      const sUrl = API_URL + '/admin/addTypeCar';
      const body = JSON.stringify({
         data
      });
      return this.http.post<any>(sUrl, body);
   }
   getUserInfo(id: any) {
      const sUrl = API_URL + '/reborn/getUserInfo';
      const body = JSON.stringify({
         id
      });
      return this.http.post<any>(sUrl, body);
   }
   getOrderInfo(id: any) {
      const sUrl = API_URL + '/reborn/getOrderInfo';
      const body = JSON.stringify({
         id
      });
      return this.http.post<any>(sUrl, body);
   }
   finishOrder(item) {
      const sUrl = API_URL + '/cargo/finish-cargo';
      return this.http.put<any>(sUrl, { orderId: item.id });
   }
   
   findCity(query: any): Observable<any[]> {
      const sUrl = API_URL + '/users/findCity';
      const body = JSON.stringify({
         query
      });
      return this.http.post<any>(sUrl, body)
         .pipe(map(res => {
            if (res.status) {
               return res.data.suggestions;
            } else {
               return [];
            }
         }));
   }
   createOrder(data: any) {
      const sUrl = API_URL + '/cargo';
      return this.http.post<any>(sUrl, data);
   }
   phones = [
      {
         "name": "Afghanistan",
         "flag": "🇦🇫",
         "code": "AF",
         "dial_code": "+93",
         "mask": "(00)-000-0000"
      },
      {
         "name": "Armenia",
         "flag": "🇦🇲",
         "code": "AM",
         "dial_code": "+374",
         "mask": "(00)-000-000"
      },
      {
         "name": "Azerbaijan",
         "flag": "🇦🇿",
         "code": "AZ",
         "dial_code": "+994",
         "mask": "(00)-000-00-00"
      },
      {
         "name": "Belarus",
         "flag": "🇧🇾",
         "code": "BY",
         "dial_code": "+375",
         "mask": "(00) 000-00-00"
      },
      {
         "name": "Germany",
         "flag": "🇩🇪",
         "code": "DE",
         "dial_code": "+49",
         "mask": "(0000) 000-0000"
      },
      {
         "name": "Georgia",
         "flag": "🇬🇪",
         "code": "GE",
         "dial_code": "+995",
         "mask": "(000) 000-000"
      },
      {
         "name": "Iran, Islamic Republic of Persian Gulf",
         "flag": "🇮🇷",
         "code": "IR",
         "dial_code": "+98",
         "mask": "(000) 000-0000"
      },
      {
         "name": "Kazakhstan",
         "flag": "🇰🇿",
         "code": "KZ",
         "dial_code": "+7",
         "mask": "(000) 000-00-00"
      },
      {
         "name": "Kyrgyzstan",
         "flag": "🇰🇬",
         "code": "KG",
         "dial_code": "+996",
         "mask": "(000) 000-000"
      },
      {
         "name": "Latvia",
         "flag": "🇱🇻",
         "code": "LV",
         "dial_code": "+371",
         "mask": "(00)-000-000"
      },
      {
         "name": "Lithuania",
         "flag": "🇱🇹",
         "code": "LT",
         "dial_code": "+370",
         "mask": "(000) 00-000"
      },
      {
         "name": "Moldova",
         "flag": "🇲🇩",
         "code": "MD",
         "dial_code": "+373",
         "mask": "(000)-00-000"
      },
      {
         "name": "Poland",
         "flag": "🇵🇱",
         "code": "PL",
         "dial_code": "+48",
         "mask": "(000) 000-000"
      },
      {
         "name": "Tajikistan",
         "flag": "🇹🇯",
         "code": "TJ",
         "dial_code": "+992",
         "mask": "(00)-000-0000"
      },
      {
         "name": "Turkmenistan",
         "flag": "🇹🇲",
         "code": "TM",
         "dial_code": "+993",
         "mask": "(0)-000-0000"
      },
      {
         "name": "Turkey",
         "flag": "🇹🇷",
         "code": "TR",
         "dial_code": "+90",
         "mask": "(000) 000-0000"
      },
      {
         "name": "Uzbekistan",
         "flag": "🇺🇿",
         "code": "UZ",
         "dial_code": "+998",
         "mask": "(00) 000-00-00"
      },
      {
         "name": "Ukraine",
         "flag": "🇺🇦",
         "code": "UA",
         "dial_code": "+380",
         "mask": "(00) 000-00-00"
      },
      {
         "name": "Sweden",
         "flag": "🇸🇪",
         "code": "SE",
         "dial_code": "+46",
         "mask": "(00)-000-0000"
      },
      {
         "name": "Estonia",
         "flag": "🇪🇪",
         "code": "EE",
         "dial_code": "+372",
         "mask": "0000-0000"
      },
      {
         "name": "Serbia",
         "flag": "🇷🇸",
         "code": "RS",
         "dial_code": "+381",
         "mask": "(00)-000-0000"
      },
      {
         "name": "Russia",
         "flag": "🇷🇺",
         "code": "RU",
         "dial_code": "+7",
         "mask": "(000) 000-00-00"
      }
   ]

}
