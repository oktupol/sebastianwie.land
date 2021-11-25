import { Component, OnInit, Input } from '@angular/core';

type Position = 'up' | 'down';

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

  constructor() { }

  ngOnInit(): void {
  }

  private isPosition(position: string | Position): position is Position {
    return ['up', 'down'].includes(position);
  }
}
