import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WorkplanCategory } from 'src/app/_enums/worplan-category.enum';
import { Supplier } from 'src/app/_models/supplier';
import { WorkplanItem } from 'src/app/_models/workplan-item';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ToastService } from 'src/app/_services/toast.service';
import { WorkplanService } from 'src/app/_services/workplan.service';
import { BrlMoneyFormatter } from '../../../_helpers/brl-money-formater';
import { Project } from '../../../_models/project';
import { catchError, throttleTime } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-civil-work',
  templateUrl: './civil-work.component.html',
  styleUrls: ['./civil-work.component.scss']
})
export class CivilWorkComponent implements OnInit {

  @Input()
  projectId: number;

  @Input()
  project: Project;

  @Input()
  workplanItem: WorkplanItem;

  suppliersDropdown: Supplier[];
  selectedSupplierIndex: any = "";

  @Output()
  finishEdition = new EventEmitter<any>();

  isEdition: boolean = false;

  @ViewChild("appFunds") appFunds: any;

  constructor(
    private workplanService: WorkplanService,
    private supplierService: SupplierService,
    private ts: ToastService
  ) { }

  ngOnInit(): void {
    if (!this.workplanItem) {
      this.resetWorkplan();
    } else {
      this.isEdition = true;
    }
    this.loadSuppliersDropdown();
  }

  loadSuppliersDropdown() {
    this.supplierService.getSuppliersDropdown().subscribe((res: any) => {
      this.suppliersDropdown = res;
      if (this.workplanItem.wpiCivilEngineering) {
        const ob = this.suppliersDropdown.find( (s) => s.id === this.workplanItem.wpiCivilEngineering.supplierId);
        if(ob)
          this.selectedSupplierIndex = this.suppliersDropdown.indexOf(ob);
      }
    });
  }

  setSelectedSupplier() {
    const supplier = this.suppliersDropdown[this.selectedSupplierIndex];
    this.workplanItem.wpiCivilEngineering.supplierId = supplier.id;
    this.workplanItem.wpiCivilEngineering.supplierName = supplier.name;
  }

  resetWorkplan() {
    this.workplanItem = new WorkplanItem();
    this.workplanItem.category = WorkplanCategory.CIVIL_ENGINEERING;
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
