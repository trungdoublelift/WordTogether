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
import { Document } from 'src/app/models/document.model';
import { DocumentState } from 'src/ngrx/states/document.state';
import { DocumentActions } from 'src/ngrx/actions/document.action';

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
  tempSub!: Subscription;
  checkFirstLogin= false;
  watchDoc!: Subscription;
  customToolBar: Object = {
    items: ['Redo', 'Undo', '|', 'FontName', 'Formats', '|', 'Bold', 'Italic', 'Underline', '|', 'Alignments', 'JustifyLeft',
      'JustifyRight', 'JustifyCenter', 'JustifyFull', 'image']
  }
  currentUser!: Account;
  currentPage = 0;
  socket!: Socket;
  client!: Subject<string>;
  currentDocumentData!: Document;
  users: Array<any> = [];
  socketURL = 'http://localhost:3000';
  document$ = this.store.select('document');
  auth$ = this.store.select('auth');
  constructor(public docService: DocumentService, private fb: Firestore, private AvRoute: ActivatedRoute,
    private accountSvc: AuthService, private store: Store<{ auth: AuthState, document: DocumentState }>,
    private http: HttpClient) {
    this.docId = this.AvRoute.snapshot.params['id'];
    this.store.select('auth').subscribe((data) => {
      if (data.auth) {
        this.currentUser = data.auth;
        //  this.tempSub= this.docService.getDocument(this.docId).subscribe((data) => {
        //     this.currentDocumentData=data;
        //   })

        try{
          this.socket = io(this.socketURL);
        }catch(err){
          console.log(err)
          this.socket = io(this.socketURL);
        }
        this.joinRoom(this.docId, data.auth!);
        this.watchRoom = this.watchRoomChange().subscribe((data:any) => {
          this.users = data.users;
          console.log(this.users)
          //Kiểm tra xem có phải người dùng đầu tiên đăng nhập vào document hay không
          if (data.users.length == 1) {
            this.checkFirstLogin= true;
            if(this.componentObject.value==''){
              // nếu chưa có dữ liệu thì lấy dữ liệu từ firebase
              this.store.dispatch(DocumentActions.readDocment({ docId: this.docId }));
            }else{}
          }else{
            if(this.socket.id==data.users[0].socketId){
              this.socket.emit('sendDocumentData',{docId:this.docId,documentString:this.componentObject.getHtml()});
            }
            this.checkFirstLogin= false;
            // Lấy dữ liệu document sau khi lấy xong huỷ lắng nghe
            this.watchDoc=this.getDocumentData(this.docId).subscribe((data:any)=>{
              if(data){
                this.componentObject.value=data;
                try{
                  this.watchDoc.unsubscribe();
                }catch(err){}
              }


            })

          }
        })

      } else { }
    })
  }


  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.leaveRoom(this.docId, this.currentUser);
    this.socket.disconnect();
    try {
      this.watchRoom.unsubscribe();
      this.tempSub.unsubscribe();
    } catch (err) { }

  }

  test(event: any) {
  }
  save() {
    let documentValue = this.componentObject.getHtml();
    this.docService.saveDocument(this.docId, documentValue);
  }
  joinRoom(docId: string, user: Account) {
    let payload = {
      docId: docId,
      user: user
    }
    this.socket.emit('joinRoom', payload);
  }
  leaveRoom(docId: string, user: Account) {
    let payload = {
      docId: docId,
      user: user
    }
    this.socket.emit('leaveRoom', payload);
  }
  watchRoomChange() {
    return new Observable((observer) => {
      this.socket.on('joinRoom', (data: any) => {
        observer.next(data);
      })
    })
  }
  getDocumentData(docId:string){
    return new Observable((observer)=>{
      this.socket.on('getSentDocumentData', (data:any)=>{
        observer.next(data);
      })
    })
  }

}
