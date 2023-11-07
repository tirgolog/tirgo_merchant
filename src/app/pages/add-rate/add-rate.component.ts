import { Component } from '@angular/core';

@Component({
	selector: 'app-add-rate',
	templateUrl: './add-rate.component.html',
	styleUrls: ['./add-rate.component.scss'],
	host: { "id": "main" },
})

export class AddRateComponent {
	getFile(e: any, el: any) {
		el.value = e.files[0].name
	}
}
