import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-aconfirm',
  templateUrl: './aconfirm.component.html',
  styleUrls: ['./aconfirm.component.scss']
})
export class AconfirmComponent {
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<AconfirmComponent>
  ) {
  }
  async ngOnInit() {
    console.log(this.data)
  }
  async returnConfirm(send:any){
    this.dialogRef.close(send);
  }
}
