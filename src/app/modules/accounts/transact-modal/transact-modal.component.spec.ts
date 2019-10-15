import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactModalComponent } from './transact-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

describe('TransactModalComponent', () => {
  let component: TransactModalComponent;
  let fixture: ComponentFixture<TransactModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactModalComponent ],
      imports: [ ReactiveFormsModule, IonicModule ],
      providers: [ CurrencyPipe, TitleCasePipe ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactModalComponent);
    component = fixture.componentInstance;
    component.bankAccount = { balance: 0, overdraft: 0, accountNumber: '6841868' };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
