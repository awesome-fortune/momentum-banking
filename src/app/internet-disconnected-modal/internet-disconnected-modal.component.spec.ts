import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetDisconnectedModalComponent } from './internet-disconnected-modal.component';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { IonicModule } from '@ionic/angular';

describe('InternetDisconnectedModalComponent', () => {
  let component: InternetDisconnectedModalComponent;
  let fixture: ComponentFixture<InternetDisconnectedModalComponent>;

  beforeEach(async(() => {
    const openNativeSettingsSpy = jasmine.createSpyObj('OpenNativeSettings', [ 'open' ]);
    TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [ InternetDisconnectedModalComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: OpenNativeSettings, useValue: openNativeSettingsSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetDisconnectedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
