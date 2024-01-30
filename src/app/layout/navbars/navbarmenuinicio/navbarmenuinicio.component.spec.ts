import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarmenuinicioComponent } from './navbarmenuinicio.component';

describe('NavbarmenuinicioComponent', () => {
  let component: NavbarmenuinicioComponent;
  let fixture: ComponentFixture<NavbarmenuinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarmenuinicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarmenuinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
