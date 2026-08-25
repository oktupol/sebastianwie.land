
import { Component, OnDestroy, OnInit, DOCUMENT, ChangeDetectionStrategy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import * as titleActions from '../../store/actions/title.actions';

@Component({
    selector: 'nwie-title-listener',
    templateUrl: './title-listener.component.html',
    styleUrls: ['./title-listener.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleListenerComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private document = inject<Document>(DOCUMENT);
  private platformId = inject<Object>(PLATFORM_ID);


  private keyboardListener: EventListenerOrEventListenerObject | null = null;
  private mc: HammerManager | null = null;

  ngOnInit(): void {
    // Both listeners rely on browser-only APIs, and Hammer touches `window`
    // as a side effect of being imported, so it is loaded lazily here.
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.addKeyboardListener();
    void this.addSwipeListener();
  }

  ngOnDestroy(): void {
    this.removeKeyboardListener();
    this.removeSwipeListener();
  }

  private addKeyboardListener(): void {
    const upKeys = ['k', 'ArrowUp'];
    const downKeys = ['j', 'ArrowDown'];
    const enterKeys = ['Enter'];

    this.keyboardListener = ((event: KeyboardEvent) => {
      let key = event.key;

      if (upKeys.includes(key)) {
        this.store.dispatch(titleActions.setPosition({ position: 'up' }));
      } else if (downKeys.includes(key)) {
        this.store.dispatch(titleActions.setPosition({ position: 'down' }));
      } else if (enterKeys.includes(key)) {
        this.store.dispatch(titleActions.activate());
      }
    }) as EventListenerOrEventListenerObject;

    this.document.addEventListener('keydown', this.keyboardListener);
  }

  private removeKeyboardListener(): void {
    if (this.keyboardListener) {
      this.document.removeEventListener('keydown', this.keyboardListener);
    }
  }

  private async addSwipeListener(): Promise<void> {
    await import('hammerjs');

    this.mc = new Hammer.Manager(this.document.body, {
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_UP | Hammer.DIRECTION_DOWN | Hammer.DIRECTION_RIGHT
        }]
      ]
    });

    this.mc.on('swipeup swipedown swiperight', event => {
      switch (event.type) {
        case 'swipeup':
          this.store.dispatch(titleActions.setPosition({ position: 'up' }));
          break;
        case 'swipedown':
          this.store.dispatch(titleActions.setPosition({ position: 'down' }));
          break;
        case 'swiperight':
          this.store.dispatch(titleActions.activate());
      }
    });
  }

  private removeSwipeListener(): void {
    if (this.mc) {
      this.mc.stop(true);
      this.mc.destroy();
    }
  }
}
