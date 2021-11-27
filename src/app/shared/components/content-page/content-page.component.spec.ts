import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { ContentPageComponent } from './content-page.component';

const navigationOpen = new Subject<boolean>();
const storeMock = {
  select: function () {
    return navigationOpen;
  }
}
describe('ContentPageComponent', () => {
  let component: ContentPageComponent;
  let fixture: ComponentFixture<ContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPageComponent ],
      providers: [{ provide: Store, useValue: storeMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navigationOpen.next(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
