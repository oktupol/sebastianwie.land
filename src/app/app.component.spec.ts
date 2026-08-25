import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { GlobalMessagesService } from './shared/services/global-messages.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    // AppComponent is standalone and pulls in its real children, so they are
    // rendered here rather than stubbed.
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideMockStore(),
        GlobalMessagesService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
