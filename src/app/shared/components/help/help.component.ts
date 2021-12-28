import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nwie-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public isOpen = false;

  public preventDefault(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  public openHelp(event: Event): void {
    this.preventDefault(event);
    this.isOpen = true;
  }

  public closeHelp(event: Event): void {
    this.preventDefault(event);
    this.isOpen = false;
  }
}
