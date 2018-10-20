import { MatchesDetailsRoute } from '../my-matches/matches-details/matches-details.route';
import { Route } from '@angular/router';
import { TournamentsComponent } from './tournaments.component';
import { TournamentDetailRoute } from './tournament-detail/tournament-detail.route';
import { TournamentStartRoute } from './tournament-start/tournament-start.route';

export const tournamentsRoute: Route = {
  path: 'tournaments',
  component: TournamentsComponent,
  children: [
    TournamentStartRoute,
    TournamentDetailRoute,
    MatchesDetailsRoute
  ]
};
