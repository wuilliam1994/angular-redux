import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseModalComponent } from './house-modal.component';

describe('HouseModalComponent', () => {
  let component: HouseModalComponent;
  let fixture: ComponentFixture<HouseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseModalComponent]
    });
    fixture = TestBed.createComponent(HouseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
