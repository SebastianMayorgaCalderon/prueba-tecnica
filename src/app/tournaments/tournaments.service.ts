import { BASE_URL_FOOTBALL_API, AUTH_KEY, PLAN } from './../cofig';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private resourceUrl = `${BASE_URL_FOOTBALL_API}competitions?${PLAN}`;
  private tournamentsList = [];
  public firebaseTournamentCollectionOvservable;
  public myTournaments;


  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.firebaseTournamentCollectionOvservable = db.list('/tournaments').valueChanges();
    db.list('/tournaments').valueChanges().subscribe((list) => {
      this.myTournaments = Object.values(list);
    });
  }

  getAllTournaments(callback) {
    this.http.get(this.resourceUrl, {headers: AUTH_KEY}).subscribe((res: any) => {
      this.tournamentsList = res.competitions;
      callback(this.tournamentsList);
    });
  }
  getTournamentById(id, callback) {
    this.getAllTournaments((res) => {
      callback(this.tournamentsList.find((item) => item.id === id));
    });
  }
  addTournament(tournament) {
    this.db.list('/tournaments').push(tournament);
  }
  updateTournament(tournament) {
    this.db.list('/tournaments').snapshotChanges().subscribe((list) => {
      const key = list.find((item: any) => item.payload.val().id === tournament.id).key;
      this.db.list('/tournaments').update(key, tournament);
    });
  }
  removeFromFavorites(tournament) {
    if (tournament) {
      this.db.list('/tournaments').snapshotChanges().subscribe((list) => {
        const key = list.find((item: any) => item.payload.val().id === tournament.id).key;
        this.db.list('/tournaments').update(key, {...tournament, favorite: false });
      });
    }
  }
  addToFavorites(tournament) {
    this.db.list('/tournaments').snapshotChanges().subscribe((list) => {
      const key = list.find((item: any) => item.payload.val().id === tournament.id).key;
      this.db.list('/tournaments').update(key, {...tournament, favorite: true });
    });
  }
  tournamentInMyList(t) {
    if (this.myTournaments) {
      const aux = this.myTournaments.find((item) => item.id === t.id);
      return aux;
    }
    return false;
  }
  removeTournamnet(tournament) {
    this.db.list('/tournaments').snapshotChanges().subscribe((list) => {
      const key = list.find((item: any) => item.payload.val().id === tournament.id).key;
      this.db.object(`/tournaments/${key}`).remove();
    });
  }

}
