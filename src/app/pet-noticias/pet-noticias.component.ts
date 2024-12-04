import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-noticias',
  templateUrl: './pet-noticias.component.html',
  styleUrls: ['./pet-noticias.component.scss'],
})
export class PetNoticiasComponent {
  public noticiasForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.noticiasForm = this.formBuilder.group({
      titulo: [null, Validators.required],
      mensagem: [null, Validators.required],
    });
  }

  savenoticias() {
    if (this.noticiasForm.valid) {
      const formData = this.noticiasForm.value;
      alert('Notícia cadastrada enviada para o admirador.');
      console.log('Dados enviados:', formData);
      this.router.navigate(['/recomendations']);
    } else {
      alert('Por favor, preencha todos os campos antes de salvar.');
    }
  }
}
