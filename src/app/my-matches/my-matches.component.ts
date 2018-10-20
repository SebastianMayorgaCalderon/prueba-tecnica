import { Component, OnInit } from '@angular/core';
import { MatchesService } from './matches.service';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.css']
})
export class MyMatchesComponent implements OnInit {
  public myMatchList;
  public start = 0;
  public end = 5;
  public showingAmmount = 5;
  public showingList = [];
  public cantPages;
  public currentPage = 1;
  public toNextPage;
  public toPreviousPage;
  public toFilter;
  constructor(
    private matchesService: MatchesService
  ) { }

  ngOnInit() {
    this.matchesService.firebaseMatchesObservable.subscribe((matchesList) => {
      this.myMatchList = matchesList;
    });
  }

}
