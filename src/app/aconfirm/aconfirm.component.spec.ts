import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AconfirmComponent } from './aconfirm.component';

describe('AconfirmComponent', () => {
  let component: AconfirmComponent;
  let fixture: ComponentFixture<AconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AconfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
