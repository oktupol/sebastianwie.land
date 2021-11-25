import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleWrapperComponent } from './title-wrapper.component';

describe('TitleWrapperComponent', () => {
  let component: TitleWrapperComponent;
  let fixture: ComponentFixture<TitleWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
