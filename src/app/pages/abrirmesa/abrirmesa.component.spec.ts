import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirmesaComponent } from './abrirmesa.component';

describe('AbrirmesaComponent', () => {
  let component: AbrirmesaComponent;
  let fixture: ComponentFixture<AbrirmesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbrirmesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbrirmesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
