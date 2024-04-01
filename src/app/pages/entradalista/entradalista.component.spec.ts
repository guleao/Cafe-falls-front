import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradalistaComponent } from './entradalista.component';

describe('EntradalistaComponent', () => {
  let component: EntradalistaComponent;
  let fixture: ComponentFixture<EntradalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradalistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntradalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
