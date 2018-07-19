import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { LoginComponent } from './components/login/login.component'; 
import { RouterModule, Routes } from '@angular/router'; 
import { MainComponent } from './components/main/main.component';
 
export const routes: Routes = [ 
  {path: 'login', component: LoginComponent}, 
  {path: 'main', component: MainComponent}, 
  {path: '', redirectTo: '/login', pathMatch: 'full'} 
]; 
 
@NgModule({ 
  imports: [ 
      RouterModule.forRoot(routes) 
  ], 
  exports: [RouterModule], 
}) 
 
export class AppRoutingModule { } 

