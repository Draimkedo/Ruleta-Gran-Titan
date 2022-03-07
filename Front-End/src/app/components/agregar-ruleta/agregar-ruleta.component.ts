import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RuletaService } from 'src/app/services/ruleta.service';





@Component({
  selector: 'app-agregar-ruleta',
  templateUrl: './agregar-ruleta.component.html',
  styleUrls: ['./agregar-ruleta.component.css']
})
export class AgregarRuletaComponent implements OnInit {


  

  form: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private _ruletaService:RuletaService) {

     

    this.form = this.fb.group({
      creador:['', Validators.required],
      documento:['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      nMin:['',[Validators.required,Validators.maxLength(2), Validators.minLength(1)]],
      nMax:['',[Validators.required,Validators.maxLength(2), Validators.minLength(1)]],
      estado:[0],
      numeroRuleta:[this.generaNss]
    })
   }

  ngOnInit(): void {
   
  }

  agregarRuleta(){

    const ruleta:any = {
      id:0,
      creadorNombre:this.form.get('creador')?.value,
      creadorDocumento:this.form.get('documento')?.value,
      numeroMinimo:this.form.get('nMin')?.value,
      numeroMaximo:this.form.get('nMax')?.value,
      estado:0,
      numeroRuleta:this.generaNss()
    }
    console.log(ruleta);
    this._ruletaService.saveRuleta(ruleta).subscribe(data =>{
      this.toastr.success('La ruleta con el Id ' +ruleta.numeroRuleta+ ' fue registrada con exito', 'La ruleta fue agregada!');
      
      this.form.reset();
    }, error=>{
      this.toastr.error('La ruleta no pudo ser creada, porfavor verificar que todos los campos sean correctos', 'La ruleta No fue agregada!');
      console.log(error);
    })
    
    
  }

  generaNss() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let numeroRuleta = result.substring(0,9)
    return numeroRuleta;
}
}
