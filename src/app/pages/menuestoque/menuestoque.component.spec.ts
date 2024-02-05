import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuestoqueComponent } from './menuestoque.component';

describe('MenuestoqueComponent', () => {
  let component: MenuestoqueComponent;
  let fixture: ComponentFixture<MenuestoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuestoqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuestoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
