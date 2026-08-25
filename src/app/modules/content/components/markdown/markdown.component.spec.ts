import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { Subject } from 'rxjs';

import { MarkdownComponent } from './markdown.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMarkdown } from 'ngx-markdown';

const activatedRouteData = new Subject<Data>();
const activatedRouteMock = {
  data: activatedRouteData,
}

@Component({
    selector: 'markdown', template: 'markdown mock',
    changeDetection: ChangeDetectionStrategy.OnPush
})
class MockMarkdownComponent {
  public readonly src = input.required<string>();
}
@Component({
    selector: 'nwie-content-page', template: '<p><ng-content /></p>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
class MockContentPageComponent {
}
describe('MarkdownComponent', () => {
  let component: MarkdownComponent;
  let fixture: ComponentFixture<MarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MarkdownComponent, MockMarkdownComponent, MockContentPageComponent],
    providers: [
        provideMarkdown({ loader: HttpClient }),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState: { navigation: { open: false } } }),{ provide: ActivatedRoute, useValue: activatedRouteMock }]
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

      expect(component.markdownFile()).toEqual('/path/to/some-file.md');
    });
  })
});
