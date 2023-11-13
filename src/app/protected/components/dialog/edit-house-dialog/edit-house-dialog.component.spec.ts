import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHouseDialogComponent } from './edit-house-dialog.component';

describe('EditHouseDialogComponent', () => {
  let component: EditHouseDialogComponent;
  let fixture: ComponentFixture<EditHouseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHouseDialogComponent]
    });
    fixture = TestBed.createComponent(EditHouseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
