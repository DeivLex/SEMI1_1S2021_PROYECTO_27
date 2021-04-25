import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoIndividualComponent } from './producto-individual.component';

describe('ProductoIndividualComponent', () => {
  let component: ProductoIndividualComponent;
  let fixture: ComponentFixture<ProductoIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
