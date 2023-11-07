import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutersTruckComponent } from './routers-truck.component';

describe('RoutersTruckComponent', () => {
  let component: RoutersTruckComponent;
  let fixture: ComponentFixture<RoutersTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutersTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutersTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
