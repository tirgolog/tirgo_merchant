import {Component, ElementRef, ViewChild} from '@angular/core';
import {HelperService} from "../../services/helper.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {SocketService} from "../../services/socket.service";

@Component({
   selector: 'app-chat',
   templateUrl: './chat.component.html',
   styleUrls: ['./chat.component.scss'],
   host: { "id": "main" }
})
export class ChatComponent {
   currentid: number = 0;
   message:string = '';
   constructor(
       public helper: HelperService,
       private toastr: ToastrService,
       private socketService:SocketService,
       public authService: AuthService
   ) {
   }
   async ngOnInit() {
      this.currentid = this.helper.messages[0].user_id;
      this.socketService.updateAllMessages().subscribe(async (res:any) => {
         // @ts-ignore
      })
   }
   selectUser(item:any){
      this.currentid = item.user_id;
      setTimeout(() => {
         this.scrollToBottom()
      },150)
   }
   scrollToBottom(): void {
      document.getElementById('target').scrollIntoView({ behavior: 'smooth', block: 'center' });
   }
   sendMessage(){
      this.authService.sendMessage(this.message,this.currentid).toPromise().then((res) => {
         this.message = '';
         this.scrollToBottom()
      }).catch((err)=>{
         this.toastr.error('Упс','Не удалось отправить сообщение попробуйте позже')
      })
   }
   getMessagesFromCurrentId(){
      const index = this.helper.messages.findIndex(e => e.user_id === this.currentid)
      return this.helper.messages[index].messages
   }
}
