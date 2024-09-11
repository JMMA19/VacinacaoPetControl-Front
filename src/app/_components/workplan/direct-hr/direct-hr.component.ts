import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WorkplanCategory } from 'src/app/_enums/worplan-category.enum';

import { WorkplanItem } from 'src/app/_models/workplan-item';
import { ToastService } from 'src/app/_services/toast.service';
import { WorkplanService } from 'src/app/_services/workplan.service';
import { BrlMoneyFormatter } from '../../../_helpers/brl-money-formater';
import { Project } from '../../../_models/project';
import { catchError, throttleTime } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-direct-hr',
  templateUrl: './direct-hr.component.html',
  styleUrls: ['./direct-hr.component.scss']
})
export class DirectHrComponent implements OnInit {

  @Input()
  projectId: number;

  @Input()
  project: Project;

  educationLevels = [
    "Ensino Superior",
    "Graduação",
    "Especialização",
    "Mestrado",
    "Doutorado",
    "Pós-Doutorado",
    "Ensino Fundamental (1o grau) incompleto",
    "Ensino Fundamental (1o grau)",
    "Ensino Médio (2o grau)",
    "Ensino Profissional de nível técnico",
    "Mestrado Profissional",
    "MBA"
  ];

  @Input()
  workplanItem: WorkplanItem;

  @Output()
  finishEdition = new EventEmitter<any>();

  isEdition: boolean = false;

  @ViewChild("appFunds") appFunds: any;

  constructor(
    private workplanService: WorkplanService,
    private ts: ToastService
  ) { }

  ngOnInit(): void {
    if (!this.workplanItem) {
      this.resetWorkplan();
    } else {
      this.isEdition = true;
    }
  }

  resetWorkplan() {
    this.workplanItem = new WorkplanItem();
    this.workplanItem.category = WorkplanCategory.RH_DIRECT;
    this.workplanItem.idProject = this.projectId;
  }

  addWorkplan() {
    const evaluated = this.appFunds.invalidTotal;
    if(evaluated != 0) {
      return this.ts.error("Ops!", `Total parcial diferente do valor total. Diferença: ${BrlMoneyFormatter.format(evaluated)} (${evaluated < 0 ? 'abaixo' : 'acima' } do total)`);
    };

    this.workplanService.addWorkplanItem(this.workplanItem)
    .pipe(
      throttleTime(500),
      catchError(err => {
        console.error(err)
        this.ts.error('Ocorreu um erro!', err)
        return throwError(err)
    }))
    .subscribe((res) => {
      this.ts.success('Ação concluída!', 'O gasto foi salvo com sucesso.');
      this.resetWorkplan();
      this.finishEdition.emit();
    });
  }

  updateWorkplanItem() {
    const evaluated = this.appFunds.invalidTotal;
    if(evaluated != 0) {
      return this.ts.error("Ops!", `Total parcial diferente do valor total. Diferença: ${BrlMoneyFormatter.format(evaluated)} (${evaluated < 0 ? 'abaixo' : 'acima' } do total)`);
    };

    this.workplanService.editWorkplanItem(this.workplanItem).subscribe((res) => {
      this.ts.success('Ação concluída!', 'Os dados foram salvos com sucesso.');
      this.finishEdition.emit();
    });
  }

  cancel() {
    this.finishEdition.emit();
  }
  
}
