import { MatchesDetailsRoute } from './matches-details/matches-details.route';
import { Route } from '@angular/router';
import { MyMatchesComponent } from './my-matches.component';

export const MyMatchesRoute: Route = {
  path: 'my-matches',
  component: MyMatchesComponent,
  children: [
    MatchesDetailsRoute
  ]
};
