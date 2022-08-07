/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeckillComponent } from './seckill.component';

describe('SeckillComponent', () => {
  let component: SeckillComponent;
  let fixture: ComponentFixture<SeckillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeckillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeckillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
