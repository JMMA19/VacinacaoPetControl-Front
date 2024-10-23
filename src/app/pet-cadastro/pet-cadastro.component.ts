import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { PetService } from '../_services/pet.service';
import { ToastService } from '../_services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-pet-cadastro',
  templateUrl: './pet-cadastro.component.html',
  styleUrl: './pet-cadastro.component.scss'
})
export class PetCadastroComponent {

  public petForm = null;
  caes = [
    { value: 'Vira-lata' },
    { value: 'Labrador Retriever' },
    { value: 'Golden Retriever' },
    { value: 'Bulldog Francês' },
    { value: 'Poodle' },
    { value: 'Pastor Alemão' },
    { value: 'Beagle' },
    { value: 'Rottweiler' },
    { value: 'Dachshund' },
    { value: 'Shih Tzu' },
    { value: 'Pug' },
    { value: 'Border Collie' },
    { value: 'Chihuahua' },
    { value: 'Cocker Spaniel' },
    { value: 'Schnauzer' },
    { value: 'Akita' }
  ];

  gatos = [
    { value: 'Vira-lata' },
    { value: 'Persa' },
    { value: 'Siamês' },
    { value: 'Maine Coon' },
    { value: 'Sphynx' },
    { value: 'Bengal' },
    { value: 'Ragdoll' },
    { value: 'British Shorthair' },
    { value: 'Scottish Fold' },
    { value: 'Savannah' },
    { value: 'Abyssinian' },
    { value: 'Birman' },
    { value: 'Russian Blue' },
    { value: 'Norwegian Forest' },
    { value: 'Oriental Shorthair' },
    { value: 'Siberian' }
  ];

  tipos = [
    { value: 'Cachorro' },
    { value: 'Gato' }
  ];


  
  constructor(
    private petService: PetService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    public user: AuthService,
  ) { }

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      nome: [null, Validators.required],
      tipo: [null, Validators.required],
      raca: [null, Validators.required],
      idade: [null, Validators.required],
      tutor: [null]
    });
    this.petForm.get('raca').disable()
  }

  savePet() {
    this.petForm.get('tutor').setValue(this.user.user.id);
    if (this.petForm.valid) {
      this.petService.save(this.petForm.value).subscribe((x) => {
        this.toastService.success('Parabens', 'Seu pet foi cadastrado !');
        this.petForm.reset();
        this.petForm.get('raca').disable()
      })
    } else {
      this.toastService.error('Formulario invalido ', 'Confira todos os campos do formulario e tente novamente !');
    }
  }

  back() {
    this.router.navigate(['/recomendations']);
  }


  resetRaca(value) {
    if (value.value == this.petForm.get('tipo').value) {
      this.petForm.get('raca').enable();
      this.petForm.get('raca').reset();
    } else {
      this.petForm.get('raca').disable();
    }
  }
}
