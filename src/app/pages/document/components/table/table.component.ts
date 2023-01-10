import { Component } from '@angular/core';
import { DocumentService } from 'src/app/services/document/document.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  constructor(public documentSvc:DocumentService) { }
}
