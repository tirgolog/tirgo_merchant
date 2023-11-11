import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';

const API_URL = 'http://192.168.1.103:3000/api/v1'

@Injectable({
    providedIn: 'root'
})

export class ListService {

    constructor(
        private http: HttpClient,
    ) {
    }


    getAllOrders(from: number, limit: number,id,id_client,from_city,to_city,status,typecargo,typetransport,price,dateCreate,dateSend,saveorder) {
        const sUrl = API_URL + '/merchant/getAllOrders';
        const body = JSON.stringify({
            from,limit,id,id_client,from_city,to_city,status,typecargo,typetransport,price,dateCreate,dateSend,saveorder
        });
        return this.http.post<any>(sUrl, body);
    }
    getAllDrivers(from: number, limit: number,id,phone,dateReg,dateLogin,name,indentificator,typetransport) {
        const sUrl = API_URL + '/merchant/getAllDrivers';
        const body = JSON.stringify({
            from,limit,id,phone,dateReg,dateLogin,name,indentificator,typetransport
        });
        return this.http.post<any>(sUrl, body);
    }
    getAllTrackingDrivers() {
        const sUrl = API_URL + '/merchant/getAllTrackingDrivers';
        const body = JSON.stringify({});
        return this.http.post<any>(sUrl, body);
    }
    getAllUsers(from: number, limit: number,id,phone,dateReg,dateLogin,name,city,sort,revers) {
        const sUrl = API_URL + '/merchant/getAllUsers';
        const body = JSON.stringify({
            from,limit,id,phone,dateReg,dateLogin,name,city,sort,revers
        });
        return this.http.post<any>(sUrl, body);
    }
    getDeletedUsers(from: number, limit: number) {
        const sUrl = API_URL + '/merchant/getDeletedUsers';
        const body = JSON.stringify({
            from,limit
        });
        return this.http.post<any>(sUrl, body);
    }
    getActivityUsers(from: number, limit: number) {
        const sUrl = API_URL + '/merchant/getActivityUsers';
        const body = JSON.stringify({
            from,limit
        });
        return this.http.post<any>(sUrl, body);
    }

    getAllPayments() {
        return null
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
        const sUrl = API_URL + '/admin/getAllRoles';
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
        const sUrl = API_URL + '/admin/getTypeCargo';
        return this.http.get<any>(sUrl)
            .pipe(map(res => {
                if (res.status) {
                    return res.data;
                } else {
                    return [];
                }
            }));
    }
    getTypeTruck() {
        const sUrl = API_URL + '/users/getTypeTruck';
        return this.http.get<any>(sUrl)
            .pipe(map(res => {

                if (res.status) {
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
