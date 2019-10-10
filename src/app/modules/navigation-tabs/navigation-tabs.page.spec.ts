import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTabsPage } from './navigation-tabs.page';

describe('NavigationTabsPage', () => {
  let component: NavigationTabsPage;
  let fixture: ComponentFixture<NavigationTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationTabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
