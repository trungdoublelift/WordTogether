import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';
import { EditComponent } from './components/edit/edit.component';
import { ShareModule } from 'src/app/shared/share/share.module';


@NgModule({
  declarations: [
    ViewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    ShareModule
  ]
})
export class ViewModule { }
