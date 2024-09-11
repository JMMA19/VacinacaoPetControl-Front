import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { RecomendationService } from 'src/app/_services/recomendation.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrl: './recomendations.component.scss'
})
export class RecomendationsComponent {

  public editais = [];

  constructor(
    public user: AuthService,
    private router: Router,
    private toastService: ToastService,
    private recomendation: RecomendationService) { }
    
    ngOnInit(): void {
      
    }

    reduceTitle(title) {
      if (title.length > 20) {
        title =  title.substring(0, 20) + "...";
      }
      return title;
    }

    seeMore(id : number) {
      this.router.navigate(['/details'], { queryParams: { editalId: id } });
    }
      
}
