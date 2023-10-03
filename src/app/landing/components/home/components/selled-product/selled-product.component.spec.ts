import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelledProductComponent } from './selled-product.component';

describe('SelledProductComponent', () => {
  let component: SelledProductComponent;
  let fixture: ComponentFixture<SelledProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelledProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelledProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
