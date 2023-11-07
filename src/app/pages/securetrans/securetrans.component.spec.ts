import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuretransComponent } from './securetrans.component';

describe('SecuretransComponent', () => {
  let component: SecuretransComponent;
  let fixture: ComponentFixture<SecuretransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecuretransComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuretransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
