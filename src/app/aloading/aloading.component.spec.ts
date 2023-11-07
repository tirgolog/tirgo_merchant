import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AloadingComponent } from './aloading.component';

describe('AloadingComponent', () => {
  let component: AloadingComponent;
  let fixture: ComponentFixture<AloadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AloadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
