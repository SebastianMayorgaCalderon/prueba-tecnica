import { MatchesDetailsRoute } from './../my-matches/matches-details/matches-details.route';
import { TournamentDetailRoute } from './../tournaments/tournament-detail/tournament-detail.route';
import { Route } from '@angular/router';
import { MyTournamentsComponent } from './my-tournaments.component';

export const MyTournamentsRoute: Route = {
  path: 'my-tournaments',
  component: MyTournamentsComponent,
  children: [
    TournamentDetailRoute,
    MatchesDetailsRoute
  ]
};
