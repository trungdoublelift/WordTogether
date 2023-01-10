import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    RichTextEditorModule,

    HttpClientModule,

  ],
  exports:[
    LoadingComponent,
    ErrorComponent,
    RichTextEditorModule,

    HttpClientModule,

  ],
  providers: [ToolbarService,LinkService,ImageService,HtmlEditorService],
})
export class ShareModule { }
