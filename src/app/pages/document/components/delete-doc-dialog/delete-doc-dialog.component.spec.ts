import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDocDialogComponent } from './delete-doc-dialog.component';

describe('DeleteDocDialogComponent', () => {
  let component: DeleteDocDialogComponent;
  let fixture: ComponentFixture<DeleteDocDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDocDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
