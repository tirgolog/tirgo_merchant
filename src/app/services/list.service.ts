import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

const API_URL = 'https://merchant.tirgo.io/api/v1'
@Injectable({
  providedIn: 'root'
})

export class ListService {

  adminJwt;
  orderFinishedSubject$ = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
  ) {
  }

  getAllOrders(from: number, limit: number, id, id_client, from_city, to_city, status, typecargo, typetransport, price, dateCreate, dateSend, saveorder) {
    const sUrl = API_URL + '/merchant/getAllOrders';
    const body = JSON.stringify({
      from, limit, id, id_client, from_city, to_city, status, typecargo, typetransport, price, dateCreate, dateSend, saveorder
    });
    return this.http.post<any>(sUrl, body);
  }
  getAllDrivers(from: number, limit: number, id, phone, dateReg, dateLogin, name, indentificator, typetransport) {
    const sUrl = API_URL + '/merchant/getAllDrivers';
    const body = JSON.stringify({
      from, limit, id, phone, dateReg, dateLogin, name, indentificator, typetransport
    });
    return this.http.post<any>(sUrl, body);
  }
  getAllTrackingDrivers() {
    const sUrl = API_URL + '/merchant/getAllTrackingDrivers';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body);
  }
  getAllUsers(from: number, limit: number, id, phone, dateReg, dateLogin, name, city, sort, revers) {
    const sUrl = API_URL + '/merchant/getAllUsers';
    const body = JSON.stringify({
      from, limit, id, phone, dateReg, dateLogin, name, city, sort, revers
    });
    return this.http.post<any>(sUrl, body);
  }
  getDeletedUsers(from: number, limit: number) {
    const sUrl = API_URL + '/merchant/getDeletedUsers';
    const body = JSON.stringify({
      from, limit
    });
    return this.http.post<any>(sUrl, body);
  }
  getActivityUsers(from: number, limit: number) {
    const sUrl = API_URL + '/merchant/getActivityUsers';
    const body = JSON.stringify({
      from, limit
    });
    return this.http.post<any>(sUrl, body);
  }

  getUsers() {
    const sUrl = API_URL + '/users';
    return this.http.get<any>(sUrl);
  }
  getMerchantById(id) {
    const sUrl = API_URL + '/merchant/id?id='+id;
    return this.http.get<any>(sUrl);
  }

  getUsersMerchant(id) {
    const sUrl = API_URL + '/users/merchant?id='+id;
    return this.http.get<any>(sUrl);
  }

  getUserById(id) {
    const sUrl = API_URL + '/users/id?id=' + id;
    return this.http.get<any>(sUrl);
  }

  updateUser(data) {
    const sUrl = API_URL + '/users?id=' + data.id;
    return this.http.put<any>(sUrl, data);
  }

  changeStatus(data) {
    const sUrl = API_URL + '/users/state?id=' + data.id;
    return this.http.patch<any>(sUrl, data);
  }

  changePassword(data) {
    const sUrl = API_URL + '/users/password?id=' + data.id;
    return this.http.patch<any>(sUrl, data);
  }

  getOrders() {
    const sUrl = API_URL + '/cargo/all';
    return this.http.get<any>(sUrl);
  }

  getOrdersByMerchant(id) {
    const sUrl = API_URL + '/cargo/merchant?id=' + id;
    return this.http.get<any>(sUrl);
  }

  getOrderById(id) {
    const sUrl = API_URL + '/cargo/id?id=' + id;
    return this.http.get<any>(sUrl);
  }

  getAllPayments() {
    return null
  }

  getFinanceByMerchant(id) {
    const sUrl = API_URL + '/transaction/merchant?id=' + id;
    return this.http.get<any>(sUrl);
  }

  createTransaction(data) {
    const sUrl = API_URL + '/transaction';
    return this.http.post<any>(sUrl, data);
  }

  getBalanceMerchant(id) {
    const sUrl = API_URL + '/transaction/merchant/balance?id=' + id;
    return this.http.get<any>(sUrl);
  }

  getVerifiedTransactions(id) {
    const sUrl = API_URL + '/transaction/merchant/verified?id=' + id;
    const body = JSON.stringify({});
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res) {
          return res;
        } else {
          return [];
        }
      }));
  }

  getRejectedTransactions(id) {
    const sUrl = API_URL + '/transaction/merchant/verify?id=' + id;
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res) {
          return res;
        } else {
          return [];
        }
      }));
  }

  getTransactionsByUser(id) {
    const sUrl = API_URL + '/transaction/user?id=' + id;
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res) {
          return res;
        } else {
          return [];
        }
      }));
  }
  //old_version
  getAllAdmins() {
    const sUrl = API_URL + '/admin/getAllAdmins';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getAllRoles() {
    const sUrl = API_URL + '/role/all';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getSecureTrans() {
    const sUrl = API_URL + '/admin/getSecureTrans';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getTransactionsType() {
    const sUrl = API_URL + '/admin/getTransactionsType';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getAllMessages() {
    const sUrl = API_URL + '/admin/getAllMessages';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return [];
        }
      }));
  }
  getTypeCargo() {
    this.adminJwt = localStorage.getItem('adminJWT')
    const sUrl = API_URL + '/cargo-type/all';
    return this.http.get<any>(sUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.adminJwt}`
      }
    })
      .pipe(map(res => {
        if (res) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getTypeTruck() {
    const sUrl = API_URL + '/transport-type/all';
    return this.http.get<any>(sUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.adminJwt}`
      }
    })
      .pipe(map(res => {
        if (res) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getCurrencies() {
    const sUrl = API_URL + '/currency/all';
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getDocument(id) {
    const sUrl = API_URL + '/merchant/id?id=' + id;
    return this.http.get<any>(sUrl)
      .pipe(map(res => {
        if (res) {
          return res.data;
        } else {
          return [];
        }
      }));
  }

  getAllReviews() {
    const sUrl = API_URL + '/users/getAllReviews';
    const body = JSON.stringify({});
    return this.http.post<any>(sUrl, body)
      .pipe(map(res => {

        if (res.data) {
          return res.data;
        } else {
          return false;
        }
      }));
  }

}
