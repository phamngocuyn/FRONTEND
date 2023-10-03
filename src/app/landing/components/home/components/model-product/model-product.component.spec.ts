import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelProductComponent } from './model-product.component';

describe('ModelProductComponent', () => {
  let component: ModelProductComponent;
  let fixture: ComponentFixture<ModelProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
