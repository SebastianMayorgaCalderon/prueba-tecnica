import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentsService } from '../tournaments.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MatchesService } from '../../my-matches/matches.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  public tournament;
  public id;
  public loading = true;
  public tournamentMatches = null;
  public showingMatchesList = null;
  public showingAmmount = 5;
  public cantPages;
  public currentPage = 1;
  public toNexPage;
  public toPreviousPage;
  public start = 0;
  public end = 5;

  constructor(
    private tournamentService: TournamentsService,
    private route: ActivatedRoute,
    private matchesService: MatchesService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.toNexPage = this.nextPageHandler.bind(this);
    this.toPreviousPage = this.previousPageHandler.bind(this);
    this.route.params.subscribe(params => {
      this.initPageValues();
      this.id = +params['id'];
      this.tournamentService.getTournamentById(this.id, tournament => {
        this.tournament = tournament;
        tournament.image = 'https://cdn.onlinewebfonts.com/svg/img_22367.png';
        this.matchesService.getAllMatchesFromCopmetition(res => {
          this.tournamentMatches = res;
          this.cantPages =
            Math.round(this.tournamentMatches.length / this.showingAmmount) + 1;
          this.changePage(this.start, this.end);
        }, this.id);
        this.db.list('/tournaments').stateChanges().subscribe((changes: any) => {
          if (changes.payload.val().id === this.tournament.id) {
            this.tournament = changes.payload.val();
          }
        });
      });
    });
  }
  initPageValues() {
    this.tournamentMatches = null;
    this.showingMatchesList = null;
    this.cantPages = null;
    this.currentPage = 1;
    this.start = 0;
    this.end = 5;
  }
  changePage(start, end) {
    this.showingMatchesList = [];
    this.showingMatchesList = this.tournamentMatches.slice(start, end);
  }
  getTournamentName() {
    return this.tournament ? this.tournament.name : '';
  }
  nextPageHandler() {
    this.start += this.showingAmmount;
    this.end += this.showingAmmount;
    this.changePage(this.start, this.end);
    this.currentPage++;
  }
  addTournament(tournament) {
    this.tournamentService.addTournament(tournament);
  }
  addTournamentToFavorites() {
    if (this.tournamentService.tournamentInMyList(this.tournament)) {
      this.tournamentService.addToFavorites(this.tournament);
    } else {
      this.addTournament({...this.tournament, favorite: true});
    }
  }
  removeTournament() {
    this.tournamentService.removeTournamnet(this.tournament);
    this.tournamentService.getTournamentById(this.id, tournament => {
      this.tournament = tournament;
    });
  }
  removeTournamentFromFavorites() {
    this.tournamentService.removeFromFavorites(this.tournament);
  }
  previousPageHandler() {
    this.end -= this.showingAmmount;
    this.start -= this.showingAmmount;
    this.changePage(this.start, this.end);
    this.currentPage--;
  }
  tournamentsIsInMyList() {
    return this.tournamentService.tournamentInMyList(this.tournament);
  }
}
