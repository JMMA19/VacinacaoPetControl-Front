import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetNoticiasComponent } from './pet-noticias.component';

describe('PetNoticiasComponent', () => {
  let component: PetNoticiasComponent;
  let fixture: ComponentFixture<PetNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetNoticiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
