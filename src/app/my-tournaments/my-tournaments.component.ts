import { Component, OnInit } from '@angular/core';
import { TournamentsService } from '../tournaments/tournaments.service';

@Component({
  selector: 'app-my-tournaments',
  templateUrl: './my-tournaments.component.html',
  styleUrls: ['./my-tournaments.component.css']
})
export class MyTournamentsComponent implements OnInit {
  public tournamentsList;

  constructor(
    private tournamentService: TournamentsService,
  ) { }

  ngOnInit() {
    this.tournamentService.firebaseTournamentCollectionOvservable.subscribe((tournamentsList) => {
      this.tournamentsList = tournamentsList;
    });
  }
}
