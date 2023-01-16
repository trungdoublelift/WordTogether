import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { DocumentService } from 'src/app/services/document/document.service';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/ngrx/states/auth.state';
import { Account } from 'src/app/models/account.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  mobileQuery!: MediaQueryList;
  edit = false;
  docData: string = "";
  @ViewChild('docValue') componentObject!: RichTextEditorComponent;
  docId: string = "";
  storage = getStorage();
  watchRoom!: Subscription;

  customToolBar: Object = {
    items: ['Redo', 'Undo', '|', 'FontName', 'Formats', '|', 'Bold', 'Italic', 'Underline', '|', 'Alignments', 'JustifyLeft',
      'JustifyRight', 'JustifyCenter', 'JustifyFull', 'image']
  }
  currentPage = 0;
  socket!: any;
  client!: Subject<string>;
  users: Array<Account> = [];
  socketURL = 'http://localhost:3000';
  constructor(public docService: DocumentService, private fb: Firestore, private AvRoute: ActivatedRoute,
    private accountSvc: AuthService, private store: Store<{ auth: AuthState }>,
    private http: HttpClient) {
    this.docId = this.AvRoute.snapshot.params['id'];
    this.store.select('auth').subscribe((data) => {
      if (data.auth) {
        this.socket = io(this.socketURL);

          this.joinRoom(this.docId, data.auth!);

        this.watchRoom = this.watchRoomChange().subscribe((data) => {
          console.log(data)
        })

      } else { }
    })
  }
  joinRoom(docId: string, user: Account) {
    let payload={
      docId:docId,
      user:user
    }
    this.socket.emit('joinRoom', payload);
  }
  leaveRoom(docId: string, user: Account) {
    let payload={
      docId:docId,
      user:user
    }
    this.socket.emit('leaveRoom', payload);
  }
  watchRoomChange() {
    return new Observable((observer) => {
      this.socket.on('joinRoom', (data:any) => {
        observer.next(data);
      })
    })
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.socket.disconnect();

  }

  test(event: any) {
  }




  getDoc() {
    this.docService.readDocument(this.docId)
  }


  save() {
    let documentValue = this.componentObject.getHtml();
    this.docService.saveDocument(this.docId, documentValue);

  }
}
