import { ChangeDetectorRef, Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/ngrx/states/auth.state';
import { Router } from '@angular/router';
import { AuthActions } from 'src/ngrx/actions/auth.action';
import { DocumentActions } from 'src/ngrx/actions/document.action';
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
      link:"/all",
      icon:"library_books",
    },
    {
      name:"Tài liệu được chia sẻ",
      link:"",
      icon:"folder shared icon",
    },
    {
      name:"Lời mời truy cập",
      link:"/invite",
      icon:"mail",
    },
    {
      name:"Thùng rác",
      link:"/delete",
      icon:"delete",
    },
    {
      name:"Đăng xuất",
      link:"/document/logout",
      icon:"delete",
    },


  ]
  mobileQuery!: MediaQueryList;
  auth=this.authState.select('auth')
  private _mobileQueryListener: () => void;
  constructor(public changeDetectorRef: ChangeDetectorRef,private route:Router,
     public media: MediaMatcher,private authState:Store<{auth:AuthState}>) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  navigate(link:string){
    if(link=="/document/logout"){
      this.authState.dispatch(AuthActions.googleLogout())
    }else{
      this.route.navigate([`${link}`]);
    }

  }



}
