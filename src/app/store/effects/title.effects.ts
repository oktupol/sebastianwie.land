import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, take } from 'rxjs';
import * as titleActions from '../actions/title.actions';
import * as titleSelectors from '../selectors/title.selectors';

@Injectable()
export class TitleEffects {
  activate$ = createEffect(() => this.actions$.pipe(
    ofType(titleActions.activate),
    mergeMap(() => this.store.select(titleSelectors.getPosition).pipe(
      take(1),
      map(position => {
        switch(position) {
          case 'up':
            this.router.navigate(['sites', 'about']);
            return titleActions.activateSuccess();
          case 'down':
            this.router.navigate(['contact']);
            return titleActions.activateSuccess();
          default:
            console.log('activating while what?');
            return titleActions.activateFailure();
        }
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
  ) {}
}
