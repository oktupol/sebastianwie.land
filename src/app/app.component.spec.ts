import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({
    selector: 'nwie-title-wrapper', template: 'title wrapper',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class MockTitleWrapper {}

@Component({
    selector: 'nwie-navigation', template: 'navigation',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class MockNavigation {}

@Component({
    selector: 'nwie-global-messages', template: 'global messages',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
class MockGlobalMessages {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockTitleWrapper,
        MockNavigation,
        MockGlobalMessages,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
