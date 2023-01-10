import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  currentPage=0;
  pages = [{
    pageNumber: 1,
    content: "",

  },
  {
    pageNumber: 2,
    content: "",
  }
  ]
  NextPage(){
    this.currentPage++;
  }
  PreviousPage(){
    this.currentPage--;
  }
  getContent(pageNum:number,content:any){
    console.log(content)
    this.pages[pageNum].content=content;
  }
}
