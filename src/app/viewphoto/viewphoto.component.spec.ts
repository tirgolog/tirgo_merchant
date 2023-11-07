import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewphotoComponent } from './viewphoto.component';

describe('ViewphotoComponent', () => {
  let component: ViewphotoComponent;
  let fixture: ComponentFixture<ViewphotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewphotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
