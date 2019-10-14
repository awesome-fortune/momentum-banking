import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementModalComponent } from './account-management-modal.component';

describe('AccountManagementModalComponent', () => {
  let component: AccountManagementModalComponent;
  let fixture: ComponentFixture<AccountManagementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountManagementModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
