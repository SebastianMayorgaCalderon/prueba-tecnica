import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() isTournament;
  @Input() isInMyList;
  @Input() list;
  public toNextPage;
  public toPreviousPage;
  public favoriteView = false;
  public showingList;
  public start = 0;
  public end = 5;
  public showingAmmount = 5;
  public cantPages;
  public currentPage = 1;

  constructor() {}

  ngOnInit() {
    this.changePage(this.start, this.end);
    this.cantPages = Math.round(this.list.length / this.showingAmmount) + 1;
    this.toPreviousPage = this.previousPageHandler.bind(this);
    this.toNextPage = this.nextPageHandler.bind(this);
  }

  filter() {
    this.favoriteView = !this.favoriteView;
    if (this.favoriteView) {
      this.showingList = this.showingList.filter((item) => item.favorite);
    } else {
      this.changePage(this.start, this.end);
    }
  }
  changePage(start, end) {
    this.showingList = [];
    if (this.favoriteView) {
      this.showingList = this.showingList.slice(start, end);
    } else {
      this.showingList = this.list.slice(start, end);
    }
    if (this.isTournament) {
      this.showingList.forEach(item => {
            item.image = 'https://cdn.onlinewebfonts.com/svg/img_22367.png';
      });
    }
  }
  nextPageHandler() {
    this.start += this.showingAmmount;
    this.end += this.showingAmmount;
    this.changePage(this.start, this.end);
    this.currentPage++;
  }
  previousPageHandler() {
    this.end -= this.showingAmmount;
    this.start -= this.showingAmmount;
    this.changePage(this.start, this.end);
    this.currentPage--;
  }
}
