import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-noticias',
  templateUrl: './adm-noticias.component.html',
  styleUrls: ['./adm-noticias.component.scss'],
})
export class AdmNoticiasComponent implements OnInit {
  public breadcrumbPages = [
    { name: 'Início', path: '/' },
    { name: 'Administração de Notícias', path: '/adm-noticias' },
  ];

  public noticias: Array<{
    nomeUsuario: string;
    titulo: string;
    mensagem: string;
  }> = [];

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.noticias = [
      {
        nomeUsuario: '',
        titulo: '',
        mensagem: '',
      },
      {
        nomeUsuario: '',
        titulo: '',
        mensagem: '',
      },
    ];
  }

  adicionarNoticia(): void {
    this.router.navigate(['/pet-noticias']);
  }

  validarMensagem(index: number): void {
    const noticia = this.noticias[index];
    alert(`Mensagem do usuário ${noticia.nomeUsuario} validada com sucesso!`);
  }

  excluirMensagem(index: number): void {
    const confirmacao = confirm(
      'Tem certeza que deseja excluir esta mensagem?'
    );
    if (confirmacao) {
      this.noticias.splice(index, 1);
      alert('Mensagem excluída com sucesso.');
    }
  }
}
