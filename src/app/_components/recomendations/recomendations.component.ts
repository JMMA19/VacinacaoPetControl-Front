import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { petFiltro } from 'src/app/_interfaces';
import { AuthService } from 'src/app/_services/auth.service';
import { RecomendationService } from 'src/app/_services/recomendation.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss'
})
export class RecomendationsComponent {

  public pets = [];

  constructor(
    public user: AuthService,
    public router: Router,
    private toastService: ToastService,
    private recomendation: RecomendationService) { }
    
    ngOnInit(): void {
      let filtro: petFiltro = {
        tutor : this.user.user.id
      }
      this.user.getAllPet(filtro, { itemsPerPage : 9999 }).subscribe((x) => {
        this.pets = x;
      })
    }

    reduceTitle(title) {
      if (title.length > 20) {
        title =  title.substring(0, 20) + "...";
      }
      return title;
    }

    seeMore(id : number) {
     
    }

    goVacinacaoCartao(id, name) {
      this.router.navigate(['/details'], { queryParams: { editalId: id, petName: name} });
    }
      
}
