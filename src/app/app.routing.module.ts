import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { tournamentsRoute } from './tournaments/tournamets.route';
import { MyTournamentsRoute } from './my-tournaments/my-tournament.route';
import { MyMatchesRoute } from './my-matches/my-matches.route';
import { homeRoute } from './home/home.route';

const appRoutes: Routes = [
  homeRoute,
  tournamentsRoute,
  MyMatchesRoute,
  MyTournamentsRoute
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
