import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LambiComponent } from './lambi.component';

describe('LambiComponent', () => {
  let component: LambiComponent;
  let fixture: ComponentFixture<LambiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LambiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LambiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
