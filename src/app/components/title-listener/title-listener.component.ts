import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nwie-title-listener',
  template: '',
})
export class TitleListenerComponent implements OnInit {

  constructor() { }

  private readonly upKeys = ['k', 'ArrowUp'];
  private readonly downKeys = ['j', 'ArrowDown'];

  ngOnInit(): void {
  }

}
