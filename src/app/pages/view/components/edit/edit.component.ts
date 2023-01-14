import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {RichTextEditorComponent} from '@syncfusion/ej2-angular-richtexteditor';
import { DocumentService } from 'src/app/services/document/document.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  mobileQuery!: MediaQueryList;
  edit=false;
  docData:string="";
  @ViewChild('docValue') componentObject!:RichTextEditorComponent;

  customToolBar:Object={
    items:['Redo', 'Undo', '|', 'FontName','Formats','|','Bold','Italic','Underline','|','Alignments','JustifyLeft',
  'JustifyRight','JustifyCenter','JustifyFull']
  }
  currentPage=0;
  constructor(public docService:DocumentService){
    this.docService.emit('test',{});
    this.docService.listen('add-document').subscribe((data:any)=>{

      this.componentObject.value=data;

    })
    this.docService.listen('recieve-test').subscribe((data:any)=>{
      console.log(data);
    })

  }
  test(event:any){
      this.docData=this.componentObject.getHtml();
      this.docService.emit('document',this.docData);

  }

}
