import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { Subject } from 'rxjs';

import { MarkdownComponent } from './markdown.component';

const activatedRouteData = new Subject<Data>();
const activatedRouteMock = {
  data: activatedRouteData,
}

@Component({ selector: 'markdown', template: 'markdown mock' })
class MockMarkdownComponent {
  @Input() public src!: string;
}
@Component({ selector: 'nwie-content-page', template: '<p><ng-content></ng-content></p>' })
class MockContentPageComponent {
}
describe('MarkdownComponent', () => {
  let component: MarkdownComponent;
  let fixture: ComponentFixture<MarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownComponent, MockMarkdownComponent, MockContentPageComponent ],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('markdownFile', () => {
    it('should be identical to file provided by ActivatedRoute', () => {
      activatedRouteData.next({
        markdownFile: '/path/to/some-file.md'
      });

      expect(component.markdownFile).toEqual('/path/to/some-file.md');
    });
  })
});
