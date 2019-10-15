import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { AuthResponse } from '../../../shared/models/auth-response';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  const authResponseStub: AuthResponse = {
    localId: 'testLocalId',
    email: 'test@email.com',
    idToken: 'testIdToken',
    displayName: '',
    expiresIn: '3600',
    kind: 'testKind',
    refreshToken: 'ahsofhaosf1afa1sfasf0',
    registered: true
  };

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
