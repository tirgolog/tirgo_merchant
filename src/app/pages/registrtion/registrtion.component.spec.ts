import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrtionComponent } from './registrtion.component';

describe('RegistrtionComponent', () => {
  let component: RegistrtionComponent;
  let fixture: ComponentFixture<RegistrtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrtionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
