import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent {
  @Input() errorType={
    message:"Đã có lỗi xảy ra",
    icon:"warning",
  }
}
