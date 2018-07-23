import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { UserService } from './user.service';
import { Artist } from '../models/artist.models';

@Injectable()
export class ArtistService {

	public url: string;
	public identity;
	public token;

	constructor(private _http: Http) {
		this.url = GLOBAL.url;
	}

	addArtist(token, artist: Artist) {
		let params = JSON.stringify(artist);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.post(this.url + 'saveArtist', params, { headers: headers })
			.pipe(map(res => res.json()));
	}
}