import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

@Component({
    selector: 'nwie-content-page', template: '<p><ng-content></ng-content></p>',
    changeDetection: ChangeDetectionStrategy.Eager
})
class MockContentPageComponent {
}
describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NotFoundComponent, MockContentPageComponent],
    providers: [
        provideRouter([]),provideMockStore()]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
