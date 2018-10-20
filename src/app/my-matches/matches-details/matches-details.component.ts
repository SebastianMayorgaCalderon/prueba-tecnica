import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-matches-details',
  templateUrl: './matches-details.component.html',
  styleUrls: ['./matches-details.component.css']
})
export class MatchesDetailsComponent implements OnInit {
  public match;
  public id;
  constructor(private matchesService: MatchesService,
              private route: ActivatedRoute,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['matchId'];
      this.matchesService.getMatchById(this.id, (match) => {
        this.match = match;
        // tslint:disable-next-line:max-line-length
        this.match.homeTeamImageUrl = 'https://images.vexels.com/media/users/3/130462/isolated/preview/7db804bcbdc99731a2d432435f99597b-football-player-kicking-silhouette-by-vexels.png';
        // tslint:disable-next-line:max-line-length
        this.match.awayTeamImageUrl = 'https://images.vexels.com/media/users/3/130462/isolated/preview/7db804bcbdc99731a2d432435f99597b-football-player-kicking-silhouette-by-vexels.png'
        this.db.list('/matches').stateChanges().subscribe((result: any) => {
          if (result.payload.val().id === this.match.id) {
            this.match = result.payload.val();
          }
        });
      });
    });
  }
  addToMyMatches(match) {
    this.matchesService.addMatchToMyLibrary(match);
  }
  addToFavorites() {
    if (this.matchesService.matchInMyList(this.match)) {
      this.matchesService.addMatchToFavorites(this.match);
    } else {
      this.addToMyMatches({...this.match, favorite: true});
    }
  }
  removeFromMyMatches() {
    this.matchesService.removeMatchFromMyLibrary(this.match);
  }
  matchInMyList() {
    return this.matchesService.matchInMyList(this.match);
  }
  removeFromFavorites() {
    this.matchesService.removeMatchFromFavorites(this.match);
    this.matchesService.getMatchById(this.id, (match) => {
      this.match = match;
    });
  }
}
