import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TossComponent } from './toss.component';

describe('TossComponent', () => {
  let component: TossComponent;
  let fixture: ComponentFixture<TossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
