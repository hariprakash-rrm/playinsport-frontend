import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeCricketComponent } from './exchange-cricket.component';

describe('ExchangeCricketComponent', () => {
  let component: ExchangeCricketComponent;
  let fixture: ComponentFixture<ExchangeCricketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeCricketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeCricketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
