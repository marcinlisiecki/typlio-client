import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@app/features/landing/landing.module').then((m) => m.LandingModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('@app/features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'speed-test',
    loadChildren: () =>
      import('@app/features/speed-test/speed-test.module').then((m) => m.SpeedTestModule),
  },
  {
    path: 'users',
    loadChildren: () => import('@app/features/user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
