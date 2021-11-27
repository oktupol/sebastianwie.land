import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { NavigationComponent } from './navigation.component';

const navigationOpen = new Subject<boolean>();
const storeMock = {
  select() {
    return navigationOpen;
  }
}
const eventsMock = new Subject<NavigationEnd>();
const routerMock = {
  events: eventsMock,
}
describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    navigationOpen.next(false);
    eventsMock.next(new NavigationEnd(0, '/', '/'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isHomepage', () => {
    it('should be true when url is /', () => {
      eventsMock.next(new NavigationEnd(1, '/', '/'));

      expect(component.isHomepage).toBeTrue();
    });

    it('should be false when url is not /', () => {
      eventsMock.next(new NavigationEnd(2, '/some-page', '/some-page'));

      expect(component.isHomepage).toBeFalse();
    });
  });

  describe('navOpen', () => {
    it('should be identical to store value', () => {
      navigationOpen.next(true);

      expect(component.navOpen).toBeTrue();

      navigationOpen.next(false);

      expect(component.navOpen).toBeFalse();
    });
  });
});
