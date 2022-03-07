import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RuletaService } from 'src/app/services/ruleta.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  
 lista: any[] = [];
  constructor(private _ruletaService:RuletaService, private router:Router) { }

  ngOnInit(): void {
    this.listarRuletas();
    console.log(this.lista);
  }

  editar(id:number){
    this.router.navigate(['ruleta', id])
  }
  agregar(){
    this.router.navigate(['agregar'])
  }

  listarRuletas(){
    this._ruletaService.getLista().subscribe(data => {
      console.log(data);
      this.lista = data;
    }, error=>{
      console.log(error);
    }
    
    );
  }
}
