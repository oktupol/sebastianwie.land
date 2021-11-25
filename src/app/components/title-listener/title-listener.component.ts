import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as titleActions from '../../store/actions/title.actions';

@Component({
  selector: 'nwie-title-listener',
  template: '',
})
export class TitleListenerComponent implements OnInit, OnDestroy {

  constructor(private store: Store) { }

  private keyboardListener: EventListenerOrEventListenerObject | null = null;

  ngOnInit(): void {
    this.addKeyboardListener();
  }

  ngOnDestroy(): void {
    this.removeKeyboardListener();
  }

  private addKeyboardListener(): void {
    const upKeys = ['k', 'ArrowUp'];
    const downKeys = ['j', 'ArrowDown'];

    this.keyboardListener = ((event: KeyboardEvent) => {
      let key = event.key;

      if (upKeys.includes(key)) {
        this.store.dispatch(titleActions.setPosition({ position: 'up' }));
      } else if (downKeys.includes(key)) {
        this.store.dispatch(titleActions.setPosition({ position: 'down' }));
      }
    }) as EventListenerOrEventListenerObject;

    document.addEventListener('keydown', this.keyboardListener);
  }

  private removeKeyboardListener(): void {
    document.removeEventListener('keydown', this.keyboardListener as EventListenerOrEventListenerObject);
  }
}
