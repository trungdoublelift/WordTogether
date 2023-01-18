import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ErrorComponent } from 'src/app/components/error/error.component';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorModule, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import { WarningComponent } from 'src/app/components/warning/warning.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent,
    WarningComponent
  ],
  imports: [
    CommonModule,
    RichTextEditorModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatExpansionModule,
    MatBadgeModule,
    MatMenuModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    DragDropModule,


  ],
  exports:[
    LoadingComponent,
    MatDialogModule,
    ReactiveFormsModule,
    ErrorComponent,
    WarningComponent,
    RichTextEditorModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatTooltipModule,
    MatExpansionModule,
    MatBadgeModule,
    MatMenuModule,
    MatChipsModule,
    MatStepperModule,
    MatSnackBarModule,
    DragDropModule,


  ],
  providers: [ToolbarService,LinkService,ImageService,HtmlEditorService],
})
export class ShareModule { }
