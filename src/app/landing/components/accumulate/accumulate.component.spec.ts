import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulateComponent } from './accumulate.component';

describe('AccumulateComponent', () => {
  let component: AccumulateComponent;
  let fixture: ComponentFixture<AccumulateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccumulateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccumulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
