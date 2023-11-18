import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericModalEditComponent } from './generic-modal-edit.component';

describe('GenericModalEditComponent', () => {
  let component: GenericModalEditComponent;
  let fixture: ComponentFixture<GenericModalEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericModalEditComponent]
    });
    fixture = TestBed.createComponent(GenericModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
