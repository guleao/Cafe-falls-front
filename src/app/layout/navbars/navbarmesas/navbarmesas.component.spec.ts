import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarmesasComponent } from './navbarmesas.component';

describe('NavbarmesasComponent', () => {
  let component: NavbarmesasComponent;
  let fixture: ComponentFixture<NavbarmesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarmesasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarmesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
