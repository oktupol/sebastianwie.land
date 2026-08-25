import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { TitleWrapperComponent } from './title-wrapper.component';

describe('TitleWrapperComponent', () => {
  let component: TitleWrapperComponent;
  let fixture: ComponentFixture<TitleWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleWrapperComponent],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState: { title: { position: 'up' } } }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('position', () => {
    it('should be set', () => {
      expect(component.position()).toEqual('up');
    });
  });
});
