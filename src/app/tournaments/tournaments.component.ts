import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { TournamentsService } from './tournaments.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
  public tournamentsList = [];
  public start = 0;
  public end = 5;
  public showingAmmount = 5;
  public showingList = [];
  public cantPages;
  public currentPage = 1;
  public toNextPage;
  public toPreviousPage;
  constructor(private tournamentsService: TournamentsService) {}

  ngOnInit() {
    this.tournamentsService.getAllTournaments((res) => {
      this.tournamentsList = res;
    });
  }
}
