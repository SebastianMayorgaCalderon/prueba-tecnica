import { MatchesDetailsRoute } from '../../my-matches/matches-details/matches-details.route';
import { Route } from '@angular/router';
import { TournamentDetailComponent } from './tournament-detail.component';
export const TournamentDetailRoute: Route = {
  path: ':id',
  component: TournamentDetailComponent,
  children: [MatchesDetailsRoute]
};
