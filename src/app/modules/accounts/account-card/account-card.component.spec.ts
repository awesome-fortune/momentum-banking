import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCardComponent } from './account-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BankAccountService } from '../../../core/services/bank-account/bank-account.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { of } from 'rxjs';
import { authResponseStub } from '../../../shared/stubs/auth-response.stub';

describe('AccountCardComponent', () => {
  let component: AccountCardComponent;
  let fixture: ComponentFixture<AccountCardComponent>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine
      .createSpyObj('AuthService', [ 'login', 'logout', 'authState' ]);

    authServiceSpy.login.and.returnValue(of(authResponseStub));
    authServiceSpy.authState.and.returnValue(authResponseStub);

    TestBed.configureTestingModule({
      declarations: [ AccountCardComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
