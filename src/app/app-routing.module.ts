import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { CitasComponent } from './pages/citas/citas.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'reset-password', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  { path: 'user-home', loadChildren: () => import('./pages/user-home/user-home.module').then(m => m.UserHomePageModule) },
  { path: 'vet-home', loadChildren: () => import('./pages/vet-home/vet-home.module').then(m => m.VetHomePageModule) },
  { path: 'admin-home', loadChildren: () => import('./pages/admin-home/admin-home.module').then(m => m.AdminHomePageModule) },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'citas/:mascotaId', component: CitasComponent },
  {
    path: 'user-home',
    loadChildren: () => import('./pages/user-home/user-home.module').then(m => m.UserHomePageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'usuario' }
  },
  {
    path: 'vet-home',
    loadChildren: () => import('./pages/vet-home/vet-home.module').then(m => m.VetHomePageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'veterinario' }
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./pages/admin-home/admin-home.module').then(m => m.AdminHomePageModule),
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'agregar-mascota',
    loadChildren: () => import('./pages/agregar-mascota/agregar-mascota.module').then( m => m.AgregarMascotaPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
