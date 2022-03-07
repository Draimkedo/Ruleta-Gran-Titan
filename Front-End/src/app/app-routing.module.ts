import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './components/lista/lista.component';
import { AgregarRuletaComponent } from './components/agregar-ruleta/agregar-ruleta.component';
import { RuletaComponent } from './components/ruleta/ruleta.component';

const routes: Routes = [
  {path:'', redirectTo:'lista', pathMatch:'full'},
  {path:'lista', component:ListaComponent},
  {path:'agregar', component:AgregarRuletaComponent},
  {path:'ruleta/:id', component:RuletaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
