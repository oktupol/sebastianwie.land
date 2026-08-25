import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ContentPageComponent } from './content-page.component';

describe('ContentPageComponent', () => {
  let component: ContentPageComponent;
  let fixture: ComponentFixture<ContentPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPageComponent],
      providers: [provideMockStore({ initialState: { navigation: { open: false } } })],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
