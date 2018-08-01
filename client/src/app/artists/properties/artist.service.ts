import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { GLOBAL } from '../../properties/global';
import { Artist } from './artist.models';

@Injectable()
export class ArtistService {

  public url: string;
  public identity;
  public token;

  constructor (private _http: Http) {
    this.url = GLOBAL.url;
  }

  public getArtists (token, page) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'listArtists/' + page, options)
    .pipe(map(res => res.json()));
  }

  public getArtist (token, id: string) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'getArtist/' + id, options)
    .pipe(map(res => res.json()));
  }

  public addArtist (token, artist: Artist) {
    let params = JSON.stringify(artist);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.post(this.url + 'saveArtist', params, { headers: headers })
    .pipe(map(res => res.json()));
  }

  public editArtist (token, id: string, artist: Artist) {
    let params = JSON.stringify(artist);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.put(this.url + 'updateArtist/' + id, params, { headers: headers })
    .pipe(map(res => res.json()));
  }

  public deleteArtit (token, id: string) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({ headers: headers });

    return this._http.get(this.url + 'deleteArtist/' + id, options)
    .pipe(map(res => res.json()));
  }

}
