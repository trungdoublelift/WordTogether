import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {RichTextEditorComponent} from '@syncfusion/ej2-angular-richtexteditor';
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
  test(event:any){

      this.docData=this.componentObject.getHtml();
      console.log(this.docData)

  }
  // pages = [{
  //   pageNumber: 1,
  //   content: "",

  // },
  // {
  //   pageNumber: 2,
  //   content: "",
  // }
  // ]
  // NextPage(){
  //   this.currentPage++;
  // }
  // PreviousPage(){
  //   this.currentPage--;
  // }
  // getContent(pageNum:number,content:any){
  //   console.log(content)
  //   this.pages[pageNum].content=content;
  // }
}
