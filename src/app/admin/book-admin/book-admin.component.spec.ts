import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAdminComponent } from './book-admin.component';

describe('BookAdminComponent', () => {
  let component: BookAdminComponent;
  let fixture: ComponentFixture<BookAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
