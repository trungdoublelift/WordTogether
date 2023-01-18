import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InviteListComponent } from './components/invite-list/invite-list.component';
import { TableComponent } from './components/table/table.component';
import { DocumentComponent } from './document.component';

const routes: Routes = [{ path: '', component: DocumentComponent,children:[
  {path:':type',component:TableComponent},
  {path:'invite',component:InviteListComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
