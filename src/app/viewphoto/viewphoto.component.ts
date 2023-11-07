import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-viewphoto',
  templateUrl: './viewphoto.component.html',
  styleUrls: ['./viewphoto.component.scss']
})
export class ViewphotoComponent {
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data)
  }
}
