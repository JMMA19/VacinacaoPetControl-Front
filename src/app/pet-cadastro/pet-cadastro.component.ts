import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-pet-cadastro',
  templateUrl: './pet-cadastro.component.html',
  styleUrl: './pet-cadastro.component.scss'
})
export class PetCadastroComponent {

  public petForm = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      nome: [null],
      tipo: [null],
      raça: [null],
      idade: [null]
    });
  }

  savePet() {
    let formValues = this.petForm.value;
    //this.userService.createPet()
    console.log("salvou", formValues)
  }

}
