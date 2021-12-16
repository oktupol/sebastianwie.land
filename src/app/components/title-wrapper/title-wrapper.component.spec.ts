import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { TitleWrapperComponent } from './title-wrapper.component';

const mockStore = {
  select() {
    return of('up');
  }
}

@Component({ selector: 'nwie-title', template: 'title component' })
class MockTitleComponent {
  @Input() public position!: string;
}
describe('TitleWrapperComponent', () => {
  let component: TitleWrapperComponent;
  let fixture: ComponentFixture<TitleWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleWrapperComponent, MockTitleComponent ],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
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
      expect(component.position).toEqual('up');
    });
  });
});
