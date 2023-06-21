import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotTokenComponent } from './slot-token.component';

describe('SlotTokenComponent', () => {
  let component: SlotTokenComponent;
  let fixture: ComponentFixture<SlotTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
