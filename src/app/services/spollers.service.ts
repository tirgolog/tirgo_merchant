import { Injectable } from '@angular/core';
import { spollers } from 'src/assets/scripts/functions';


@Injectable({
   providedIn: 'root'
})

export class SpollersService {

   constructor() { }

   public initSpollers() {
      spollers()
   }
} 
