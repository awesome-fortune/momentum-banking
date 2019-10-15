import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsPage } from './accounts.page';
import { of } from 'rxjs';
import { authResponseStub } from '../../shared/stubs/auth-response.stub';
import { AuthService } from '../../core/services/auth/auth.service';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountsPage', () => {
  let component: AccountsPage;
  let fixture: ComponentFixture<AccountsPage>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine
      .createSpyObj('AuthService', [ 'login', 'logout', 'authState' ]);

    authServiceSpy.login.and.returnValue(of(authResponseStub));
    authServiceSpy.authState.and.returnValue(authResponseStub);

    TestBed.configureTestingModule({
      declarations: [ AccountsPage ],
      imports: [ HttpClientTestingModule, IonicModule, RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy, }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
