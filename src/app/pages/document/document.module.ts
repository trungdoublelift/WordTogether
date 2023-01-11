import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { TableComponent } from './components/table/table.component';
import { ShareModule } from 'src/app/shared/share/share.module';


@NgModule({
  declarations: [
    DocumentComponent,
    TableComponent,

  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    ShareModule,
  ]
})
export class DocumentModule { }
