import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaitemComponent } from './entradaitem.component';

describe('EntradaitemComponent', () => {
  let component: EntradaitemComponent;
  let fixture: ComponentFixture<EntradaitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntradaitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
