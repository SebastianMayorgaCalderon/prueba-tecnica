import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { MyTournamentsComponent } from '../my-tournaments/my-tournaments.component';

export const homeRoute: Route  = {
  path: '',
  redirectTo: 'my-tournaments',
  pathMatch: 'full'

};

