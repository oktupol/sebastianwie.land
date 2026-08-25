import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprintComponent } from './imprint.component';
import { provideMockStore } from '@ngrx/store/testing';

@Component({
    selector: 'nwie-content-page', template: '<p><ng-content /></p>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
class MockContentPageComponent {
}
describe('ImprintComponent', () => {
  let component: ImprintComponent;
  let fixture: ComponentFixture<ImprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ImprintComponent, MockContentPageComponent],
    providers: [provideMockStore({ initialState: { navigation: { open: false } } })]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
