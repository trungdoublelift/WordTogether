import { ChangeDetectorRef, Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/ngrx/states/auth.state';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent {
  events: string[] = [];
  opened: boolean=true;
  menuItems=[
    {
      name:"Tài liệu của tôi",
      link:"/document",
      icon:"library_books",
    },
    {
      name:"Tài liệu được chia sẻ",
      link:"/document",
      icon:"folder shared icon",
    },
    {
      name:"Lời mời truy cập",
      link:"/document",
      icon:"mail",
    },
    {
      name:"Thùng rác",
      link:"/document",
      icon:"delete",
    },


  ]
  mobileQuery!: MediaQueryList;
  auth=this.authState.select('auth')
  private _mobileQueryListener: () => void;
  constructor(public changeDetectorRef: ChangeDetectorRef,
     public media: MediaMatcher,private authState:Store<{auth:AuthState}>) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }





  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
