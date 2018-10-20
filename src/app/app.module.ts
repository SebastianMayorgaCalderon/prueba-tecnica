import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app.routing.module';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { LoaderComponent } from './utils/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { TournamentsService } from './tournaments/tournaments.service';
import { TournamentDetailComponent } from './tournaments/tournament-detail/tournament-detail.component';
import { TournamentStartComponent } from './tournaments/tournament-start/tournament-start.component';
import { PageableControlsComponent } from './utils/pageable-controls/pageable-controls.component';
import { environment } from '../environments/environment';
import { MyTournamentsComponent } from './my-tournaments/my-tournaments.component';
import { ListComponent } from './utils/list/list.component';
import { TournamentItemComponent } from './utils/list/tournament-item/tournament-item.component';
import { MatchListItemComponent } from './utils/list/match-list-item/match-list-item.component';
import { MatchesService } from './my-matches/matches.service';
import { MatchesDetailsComponent } from './my-matches/matches-details/matches-details.component';
import { MyMatchesComponent } from './my-matches/my-matches.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TournamentsComponent,
    LoaderComponent,
    TournamentItemComponent,
    TournamentDetailComponent,
    TournamentStartComponent,
    PageableControlsComponent,
    MatchesDetailsComponent,
    MyTournamentsComponent,
    MyMatchesComponent,
    MatchListItemComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    MatchesService,
    TournamentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
