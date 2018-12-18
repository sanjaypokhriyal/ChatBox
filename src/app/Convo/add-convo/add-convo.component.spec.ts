import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConvoComponent } from './add-convo.component';

describe('AddConvoComponent', () => {
  let component: AddConvoComponent;
  let fixture: ComponentFixture<AddConvoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConvoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
