import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { Subject } from 'rxjs';

import { MarkdownComponent } from './markdown.component';

const activatedRouteData = new Subject<Data>();
const activatedRouteMock = {
  data: activatedRouteData,
}
describe('MarkdownComponent', () => {
  let component: MarkdownComponent;
  let fixture: ComponentFixture<MarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkdownComponent ],
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
