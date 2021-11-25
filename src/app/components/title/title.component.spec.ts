import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TitleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('position', () => {
    it('should accept "up" and "down" as values', () => {
      component.position = 'up';
      expect(component.position).toEqual('up');
      component.position = 'down';
      expect(component.position).toEqual('down');
      component.position = 'up';
      expect(component.position).toEqual('up');
    });

    it('should not accept values other than "up" and "down"', () => {
      component.position = 'left';
      expect(component.position).not.toEqual('left');
      component.position = 'right';
      expect(component.position).not.toEqual('right');
    })
  });
});
