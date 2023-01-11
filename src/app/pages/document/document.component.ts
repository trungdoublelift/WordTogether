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
  mobileQuery!: MediaQueryList;
  auth=this.authState.select('auth')
  private _mobileQueryListener: () => void;
  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher,private authState:Store<{auth:AuthState}>) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }





  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
