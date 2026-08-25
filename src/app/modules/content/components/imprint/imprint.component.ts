import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'nwie-imprint',
    templateUrl: './imprint.component.html',
    styleUrls: ['./imprint.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ImprintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
