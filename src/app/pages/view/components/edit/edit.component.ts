import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { DocumentService } from 'src/app/services/document/document.service';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { getStorage,ref,getDownloadURL} from "firebase/storage";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  mobileQuery!: MediaQueryList;
  edit = false;
  docData: string = "";
  @ViewChild('docValue') componentObject!: RichTextEditorComponent;
  docId: string = "";
  storage= getStorage();
  customToolBar: Object = {
    items: ['Redo', 'Undo', '|', 'FontName', 'Formats', '|', 'Bold', 'Italic', 'Underline', '|', 'Alignments', 'JustifyLeft',
      'JustifyRight', 'JustifyCenter', 'JustifyFull', 'image']
  }
  currentPage = 0;
  constructor(public docService: DocumentService, private fb: Firestore, private AvRoute: ActivatedRoute,
    private http:HttpClient) {
    this.docId = this.AvRoute.snapshot.params['id'];
    // this.docService.emit('test',{});
    // this.docService.listen('add-document').subscribe((data:any)=>{

    //   this.componentObject.value=data;

    // })
    // this.docService.listen('recieve-test').subscribe((data:any)=>{
    //   console.log(data);
    // })

  }
  test(event: any) {
    // this.docData = this.componentObject.getHtml();
    // this.docService.emit('document', this.docData);

  }
  ngOnInit(): void {
    this.getDoc();
  }
  generateDocument() {

  }
  async getDoc(){
     this.docService.readDocument(this.docId)

  }
  save() {
    let documentValue = this.componentObject.getHtml();
    this.docService.saveDocument(this.docId,documentValue);

  }


}
