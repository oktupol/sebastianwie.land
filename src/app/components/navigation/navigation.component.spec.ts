import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';

import { NavigationComponent } from './navigation.component';

const eventsMock = new Subject<NavigationEnd>();
const routerMock = {
  events: eventsMock,
  createUrlTree: () => ({}),
  serializeUrl: () => '',
}

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        provideMockStore({ initialState: { navigation: { open: false } } }),
        { provide: Router, useValue: routerMock },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();

    eventsMock.next(new NavigationEnd(0, '/', '/'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isHomepage', () => {
    it('should be true when url is /', () => {
      eventsMock.next(new NavigationEnd(1, '/', '/'));

      expect(component.isHomepage()).toBeTrue();
    });

    it('should be false when url is not /', () => {
      eventsMock.next(new NavigationEnd(2, '/some-page', '/some-page'));

      expect(component.isHomepage()).toBeFalse();
    });
  });

  describe('navOpen', () => {
    it('should be identical to store value', () => {
      store.setState({ navigation: { open: true } });
      expect(component.navOpen()).toBeTrue();

      store.setState({ navigation: { open: false } });
      expect(component.navOpen()).toBeFalse();
    });
  });
});
