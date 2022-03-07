import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxWheelComponent, TextAlignment, TextOrientation } from "ngx-wheel";
import { RuletaService } from 'src/app/services/ruleta.service';


@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements OnInit {
  form = new FormControl('');

  ruleta :any;
  jugando:number = 0;
  tipoApuesta:number = 0;
  valorApuesta:number;
  numeroApuesta:number;
  colorApuesta:number  = 0;
  apostado:number=0;
  ganancia:number = 0;
  constructor(private _ruletaService:RuletaService, private activeRouter:ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  
  idToLandOn = 0;
  items: any[] = [];

  
   ngOnInit(): void {
    this.ruletas();
  }
   

   ruletas(){
    let id = this.activeRouter.snapshot.paramMap.get('id');
     this._ruletaService.getId(id).subscribe(data =>{
      this.ruleta = data;

      const colors = ["#FF0000", "#000000"];
      for(var i = this.ruleta.numeroMinimo; i<=this.ruleta.numeroMaximo; i++){
        
        if(i%2==0){
          this.items.push({id:i, text:""+i,fillStyle:"#FF0000",textFillStyle: "white"})
        
        }else{
          this.items.push({id:i, text:""+i, fillStyle:"#000000",textFillStyle: "white"})
            
        }
      }
    }, error =>{
      console.log(error);
    })
  }

  before(){
    console.log("before");
  }

  after(){
    console.log("after");
  }

  myReset(){
    this.idToLandOn = this.items[Math.floor(Math.random() * this.items.length)].id;
    this.jugando=1;
    console.log(this.idToLandOn);
  }
  
   play(){
    
    this.jugando = 2;

      this._ruletaService.updateRuleta(this.ruleta.id,this.ruleta).subscribe(data=>{

      },error =>{
        console.log(error);
      })

    console.log("poro"+this.numeroApuesta);
    if(this.tipoApuesta == 1 && this.numeroApuesta == this.idToLandOn){
      this.ganancia = this.valorApuesta * 5;
      setTimeout(() => {
        this.toastr.success('Felicidades has ganado ' + this.valorApuesta * 5+ '$ !', 'Ganador!');
      }, 9000);
      
      this.apostado = this.apostado + this.valorApuesta;      
    }
    
    if(this.idToLandOn%2==0 && this.colorApuesta == 2 && this.tipoApuesta == 2){
      this.ganancia = this.valorApuesta * 1.8;
      setTimeout(() => {
        this.toastr.success('Felicidades has ganado ' +  this.valorApuesta * 1.8 + '$ !', 'Ganador!');
      }, 9000);
      
      this.apostado = this.apostado + this.valorApuesta;      
      
    }else if(this.colorApuesta == 1 && this.tipoApuesta == 2){
      this.ganancia = this.valorApuesta * 1.8;
      setTimeout(() => {
        this.toastr.success('Felicidades has ganado ' + this.valorApuesta * 1.8 + '$ !', 'Ganador!');
      }, 9000);
      
      this.apostado = this.apostado + this.valorApuesta;      
    }if(this.ganancia == 0){

      setTimeout(() => {
        this.toastr.error('Sigue intentando solo perdiste ' + this.valorApuesta + '$ !', 'Perdiste!');
      }, 9000);
      
      this.apostado = this.apostado + this.valorApuesta;      
    }
    if(this.numeroApuesta > this.ruleta.numeroMaximo && this.tipoApuesta == 1){
      this.toastr.success('Acabas de apostar ' + this.valorApuesta + '$ a un numero que no se encuentra en la ruleta, sigue asi', 'Felicidades!');
      console.log("khe");
    }
    this.ganancia =0;
    this.ruleta.apuesta = this.apostado;
    console.log(this.ruleta.numeroMaximo);
    this._ruletaService.updateRuleta(this.ruleta.id,this.ruleta).subscribe(data=>{

    },error =>{
      console.log(error);
    })
  }
  cerrar(){
    this.ruleta.estado = 0;
    this.toastr.success('Se han apostado un total de ' + this.ruleta.apuesta  + '$ hasta el cierre de la ruleta', 'La ruleta ha cerrado');
    this._ruletaService.updateRuleta(this.ruleta.id,this.ruleta).subscribe(data=>{

    },error =>{
      console.log(error);
    })
  }

  abrir(){
    this.ruleta.estado = 1;
    this.ruleta.apuesta =0;
    this._ruletaService.updateRuleta(this.ruleta.id,this.ruleta).subscribe(data=>{

    },error =>{
      console.log(error);
    })
  }

  numero(){
    this.tipoApuesta = 1;
  }
  color(){
    this.tipoApuesta = 2;
  }
  rojo(){
    this.colorApuesta = 2;
  }
  negro(){
    this.colorApuesta = 1;
  }
}
