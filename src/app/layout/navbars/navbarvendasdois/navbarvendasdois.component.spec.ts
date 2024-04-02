import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarvendasdoisComponent } from './navbarvendasdois.component';

describe('NavbarvendasdoisComponent', () => {
  let component: NavbarvendasdoisComponent;
  let fixture: ComponentFixture<NavbarvendasdoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarvendasdoisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarvendasdoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
