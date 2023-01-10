import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'document', loadChildren: () => import('./pages/document/document.module').then(m => m.DocumentModule) }, { path: 'view', loadChildren: () => import('./pages/view/view.module').then(m => m.ViewModule) }, { path: '', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
