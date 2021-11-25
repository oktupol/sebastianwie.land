import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleListenerComponent } from './title-listener.component';

describe('TitleListenerComponent', () => {
  let component: TitleListenerComponent;
  let fixture: ComponentFixture<TitleListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleListenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
