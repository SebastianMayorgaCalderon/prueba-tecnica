import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL_FOOTBALL_API, AUTH_KEY, FIREBASE_URL } from '../cofig';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private resourceUrl = BASE_URL_FOOTBALL_API + 'competitions';
  private myMatchList;
  public firebaseMatchesObservable;
  constructor( private http: HttpClient, private db: AngularFireDatabase) {
    this.firebaseMatchesObservable = db.list('/matches').valueChanges();
    db.list('/matches').valueChanges().subscribe((list) => {
      this.myMatchList = Object.values(list);
    });
  }

  getAllMatchesFromCopmetition(callback, competitionId) {
    this.http.get(`${this.resourceUrl}/${competitionId}/matches`, {headers: AUTH_KEY}).subscribe((res: any) => {
      callback(res.matches);
    });
  }
  getMatchById(id, callback) {
    this.http.get(`${BASE_URL_FOOTBALL_API}/matches/${id}`, {headers: AUTH_KEY}).subscribe((res: any) => {
      callback(res.match);
    });
  }
  addMatchToMyLibrary(match) {
    this.db.list('/matches').push(match);
  }
  removeMatchFromMyLibrary(match) {
    this.db.list('/matches').snapshotChanges().subscribe((list) => {
      const key = list.find((item: any) => item.payload.val().id === match.id).key;
      this.db.object(`/matches/${key}`).remove();
    });
  }
  addMatchToFavorites(match) {
    this.db.list('/matches').snapshotChanges().subscribe((list) => {
      const key = list.find((item: any) => item.payload.val().id === match.id).key;
      this.db.list('/matches').update(key, {...match, favorite: true });
    });
  }
  removeMatchFromFavorites(match) {
    if (match) {
      this.db.list('/matches').snapshotChanges().subscribe((list) => {
        const key = list.find((item: any) => item.payload.val().id === match.id).key;
        this.db.list('/matches').update(key, {...match, favorite: false });
      });
    }
  }
  matchInMyList(match) {
    if (this.myMatchList) {
      const aux = this.myMatchList.find((item) => item.id === match.id);
      return aux;
    }
    return false;
  }
}
