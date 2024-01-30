import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarvendasComponent } from './navbarvendas.component';

describe('NavbarvendasComponent', () => {
  let component: NavbarvendasComponent;
  let fixture: ComponentFixture<NavbarvendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarvendasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarvendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
