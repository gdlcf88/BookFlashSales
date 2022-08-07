import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PayComponent } from './pay/pay.component';
import { RegisterComponent } from './register/register.component';
import { SeckillComponent } from './seckill/seckill.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  { path: '', redirectTo: 'login', pathMatch: "login" },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'pay',
    component: PayComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'seckill',
    component: SeckillComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
