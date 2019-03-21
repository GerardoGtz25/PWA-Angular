import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NodesService } from './services/nodes.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  panelOpenState = false;
  categorias: any = ['Laboral', 'Estudio', 'Personal']
  nota: any = {}
  notas: any = []

  constructor(private swUpdate: SwUpdate, private nodesService: NodesService, private snackBar: MatSnackBar) {
    this.nodesService.getNotes().valueChanges().subscribe((item) => {
      this.notas = item.reverse()
      console.log(this.notas)
    })
  }

  ngOnInit(): void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      })
    }
  }

  guardarNota() {
    if(!this.nota.id){
      this.nota.id = Date.now()
    }
    console.log(this.nota)
    this.nodesService.createNote(this.nota).then(() => {
      this.nota = {}
      this.snackBar.open('Nota creada', null, {
        duration: 2000,
      });
    })
  }

  seleccionarNota(nota){
    this.nota = nota
  }

  eliminarNota(nota) {
    this.nodesService.deleteNote(nota.id).then(() => {
      this.nota = {}
      this.snackBar.open('Nota eliminada', null, {
        duration: 2000,
      });
    })
  }

  


}
