import { MatchesDetailsComponent } from './matches-details.component';
import { Route } from '@angular/router';
export const MatchesDetailsRoute: Route = {
  path: ':tournamentId/:matchId',
  component: MatchesDetailsComponent
};

