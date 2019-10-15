import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../core/services/auth/auth.service';
import { ClientDetailsService } from '../../core/services/client-details/client-details.service';
import { of } from 'rxjs';
import { authResponseStub } from '../../shared/stubs/auth-response.stub';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
    const authServiceSpy = jasmine
      .createSpyObj('AuthService', [ 'login', 'logout', 'authState' ]);

    authServiceSpy.login.and.returnValue(of(authResponseStub));
    authServiceSpy.authState.and.returnValue(authResponseStub);

    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        ClientDetailsService,
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
