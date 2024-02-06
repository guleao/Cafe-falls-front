import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarconsultarComponent } from './navbarconsultar.component';

describe('NavbarconsultarComponent', () => {
  let component: NavbarconsultarComponent;
  let fixture: ComponentFixture<NavbarconsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarconsultarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarconsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
