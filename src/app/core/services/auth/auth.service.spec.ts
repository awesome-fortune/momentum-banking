import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { authResponseStub } from '../../../shared/stubs/auth-response.stub';

describe('AuthService', () => {
  beforeEach(() => {
    const authServiceSpy = jasmine
      .createSpyObj('AuthService', ['login', 'logout', 'authState']);

    authServiceSpy.login.and.returnValue(of(authResponseStub));
    authServiceSpy.authState.and.returnValue(authResponseStub);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should log the user out', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service.logout()).toBeUndefined();
  });

  it('should log the user in', fakeAsync(() => {
    const service: AuthService = TestBed.get(AuthService);

    service.login({
      email: 'test@domain.com',
      password: 'pwd',
      returnSecureToken: true
    }).subscribe(response => {
      expect(response).toBe(authResponseStub);
    });
  }));
});
