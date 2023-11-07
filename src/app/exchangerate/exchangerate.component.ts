import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-exchangerate',
  templateUrl: './exchangerate.component.html',
  styleUrls: ['./exchangerate.component.scss'],
  host: { "id": "main" }
})
export class ExchangerateComponent {
  exchanges: any[] = [];
  summ:string = '';
  constructor() {
  }
    setCalc(ev){
      console.log(ev.target.value)

    }
  ngOnInit(): void {
    axios.get('https://cbu.uz/ru/arkhiv-kursov-valyut/json/')
        .then((res) => {
          this.exchanges = res.data;
          console.log(res);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
  }
}
