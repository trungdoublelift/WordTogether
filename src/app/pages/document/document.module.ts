import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { TableComponent } from './components/table/table.component';
import { ShareModule } from 'src/app/shared/share/share.module';
import { InviteListComponent } from './components/invite-list/invite-list.component';
import { AddDocumentComponent } from './components/add-document/add-document.component';


@NgModule({
  declarations: [
    DocumentComponent,
    TableComponent,
    InviteListComponent,
    AddDocumentComponent,

  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    ShareModule,
  ]
})
export class DocumentModule { }
