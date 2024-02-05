import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarlistaComponent } from './navbarlista.component';

describe('NavbarlistaComponent', () => {
  let component: NavbarlistaComponent;
  let fixture: ComponentFixture<NavbarlistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarlistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarlistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
