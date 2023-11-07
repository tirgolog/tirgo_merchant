import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// @ts-ignore
import io from "socket.io-client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: SocketIOClient.Socket | any; // SocketIOClient.Socket;
  constructor(

  ) { }
  disconect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  connect() {
    this.socket = io('https://tirgo-server.onrender.com');
    this.socket.on('connect', () => {
      this.socket.emit('authenticate', {token: AuthService.jwt})
          .on('authenticated', (data:any) => {
            console.warn('подключился к сокету')
          })
          .on('unauthorized', function(msg:any) {
            console.log('unauthorized: ' + JSON.stringify(msg.data));
            // throw new Error(msg.data.type);
          });
    });
  }
  emit(event:any, ...args: any[]) {
    this.socket.emit(event, ...args);
  }
  on(name:any, data:any) {
    this.socket.on(name, data);
  }

  detectOnline() {
    return new Observable<any>(observer => {
      this.socket.on('users-changed', (data:any) => {
        observer.next(data);
      });
    });
  }
  updateAllOrders() {
    return new Observable<any>(observer => {
      this.socket.on('update-all-list', (data:any) => {
        observer.next(data);
      });
    });
  }
  updateAllMessages() {
    return new Observable<any>(observer => {
      this.socket.on('update-all-messages', (data:any) => {
        observer.next(data);
      });
    });
  }
  updateActivity() {
    return new Observable<any>(observer => {
      this.socket.on('update-activity', (data:any) => {
        observer.next(data);
      });
    });
  }
  updateAllList() {
    return new Observable<any>(observer => {
      this.socket.on('update-all-list', (data:any) => {
        observer.next(data);
      });
    });
  }
  logOutUser() {
    return new Observable<any>(observer => {
      this.socket.on('log-out-user', (data:any) => {
        observer.next(data);
      });
    });
  }
}
