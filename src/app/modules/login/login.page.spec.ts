import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { authResponseStub } from '../../shared/stubs/auth-response.stub';
import { AuthService } from '../../core/services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine
      .createSpyObj('AuthService', [ 'login', 'logout', 'authState' ]);

    authServiceSpy.login.and.returnValue(of(authResponseStub));
    authServiceSpy.authState.and.returnValue(authResponseStub);

    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, IonicModule ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
