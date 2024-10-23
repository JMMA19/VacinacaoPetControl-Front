import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { petFiltro } from 'src/app/_interfaces';
import { Breadcrumb } from 'src/app/_interfaces/breadcrumb';
import { EditalService } from 'src/app/_services/edital.service';
import { LoaderService } from 'src/app/_services/loader.service';
import { PetService } from 'src/app/_services/pet.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  public edital: any;
  vacForm: any;
 petid: any;
  hascreate: boolean;
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private editalService: EditalService,
    private petService: PetService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private spinnerService: LoaderService,
    ) { 
      this.spinnerService.show();
    }

  public breadcrumbPages: Breadcrumb[] = [
    { label: 'gerenciamento de pet', route: '/recomendations' },
    { label: 'cartão de vacina', route: '/details', active: true }
  ];

  public tiposVac;
  public petName;
  ngOnInit(): void {
    this.vacForm = this.formBuilder.group({
      nome: [null, Validators.required],
      obs: [null, Validators.required],
      data: [null, Validators.required],
      pet: [null]
    });

    this.petService.gettiposVac().subscribe((x) => {
      this.tiposVac = x;
    })
    let editalId = this.activatedRoute.snapshot.queryParamMap.get('editalId');
    this.petName = this.activatedRoute.snapshot.queryParamMap.get('petName');
    console.log(editalId)
    this.petid = editalId
    let filtro: petFiltro = {
      id : editalId
    }
    this.editalService.getAllPetvacinas(filtro, { itemsPerPage : 9999 }).subscribe((x) => {
      this.edital = x;
    })
   /*  this.editalService.getById(editalId).subscribe(data => {
      this.edital = data;
      this.edital.areaList = data.areaList.split(";")
    }, 
    error => { 
      this.spinnerService.hide();
      console.log('Ocorreu um erro: ', error)
    }).add(() => this.spinnerService.hide());
  } */}
  salvarVac() {
    console.log(this.vacForm.value)
    this.petService.saveVac(
      {
        obs: this.vacForm.get('obs').value,
        tipo: this.vacForm.get('nome').value,
        dataDeVacina:  moment(this.vacForm.get('data').value).format('YYYY-MM-DD') + 'T00:00:00',
        pet: this.petid,
      }
    ).subscribe((x) => {
      this.toastService.success('Sucesso! ','Vacina foi cadastrada.')
      let filtro: petFiltro = {
        id : this.petid
      }
      this.editalService.getAllPetvacinas(filtro, { itemsPerPage : 9999 }).subscribe((x) => {
        this.edital = x;
      })
    })


  }

  resetForm() {
    this.vacForm.reset();
    this.cancel();
  }
  create() {
    this.hascreate = true;
  }
  cancel() {
    this.hascreate = false;
  }
}
