import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ErrorComponent } from 'src/app/components/error/error.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoadingComponent,
    ErrorComponent,

  ]
})
export class ShareModule { }
