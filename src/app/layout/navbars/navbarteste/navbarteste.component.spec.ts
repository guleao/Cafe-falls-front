import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbartesteComponent } from './navbarteste.component';

describe('NavbartesteComponent', () => {
  let component: NavbartesteComponent;
  let fixture: ComponentFixture<NavbartesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbartesteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbartesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
