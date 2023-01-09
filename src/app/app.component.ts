import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WordTogether';
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
