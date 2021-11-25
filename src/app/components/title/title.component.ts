import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Position } from 'src/app/util/types';

import * as titleActions from '../../store/actions/title.actions';

@Component({
  selector: 'nwie-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  private _position: Position = 'up';

  @Input() set position(position: string) {
    if (this.isPosition(position)) {
      this._position = position;
    }
  }

  get position(): Position {
    return this._position;
  }

  private readonly _hrefs = {
    up: "https://sebastianwie.land",
    down: "mailto:sebasti@nwie.land"
  }

  get href() {
    return this._hrefs[this.position];
  }

  constructor(public store: Store) { }

  ngOnInit(): void {
  }

  private isPosition(position: string | Position): position is Position {
    return ['up', 'down'].includes(position);
  }

  public setPosition(position: Position): void {
    this.store.dispatch(titleActions.setPosition({position}));
  }
}
