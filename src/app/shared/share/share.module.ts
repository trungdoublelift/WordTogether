import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    RichTextEditorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,

  ],
  exports:[
    LoadingComponent,
    ErrorComponent,
    RichTextEditorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,

  ],
  providers: [ToolbarService,LinkService,ImageService,HtmlEditorService],
})
export class ShareModule { }
