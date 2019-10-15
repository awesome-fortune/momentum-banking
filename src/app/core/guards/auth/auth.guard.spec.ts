import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs';
import { authResponseStub } from '../../../shared/stubs/auth-response.stub';

describe('AuthGuard', () => {
  beforeEach(() => {
    const authServiceSpy = jasmine
      .createSpyObj('AuthService', [ 'login', 'logout', 'authState' ]);

    authServiceSpy.login.and.returnValue(of(authResponseStub));
    authServiceSpy.authState.and.returnValue(authResponseStub);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ AuthGuard,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  it('should ...', inject([ AuthGuard ], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
