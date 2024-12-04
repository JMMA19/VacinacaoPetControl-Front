import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmNoticiasComponent } from './adm-noticias.component';

describe('AdmNoticiasComponent', () => {
  let component: AdmNoticiasComponent;
  let fixture: ComponentFixture<AdmNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmNoticiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
