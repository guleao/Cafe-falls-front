import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FecharmesaComponent } from './fecharmesa.component';

describe('FecharmesaComponent', () => {
  let component: FecharmesaComponent;
  let fixture: ComponentFixture<FecharmesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FecharmesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FecharmesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
