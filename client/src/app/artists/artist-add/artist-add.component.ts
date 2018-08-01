import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Artist } from '../properties/artist.models';
import { GLOBAL } from '../../properties/global';
import { UserService } from '../../users/user.service';
import { ArtistService } from '../properties/artist.service';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  providers: [
    UserService,
    ArtistService
  ]
})

export class ArtistAddComponent implements OnInit {
  public title: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService
  ) {
    this.title = 'Artist Add';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('', '', '');
  }

  ngOnInit () {
    // Llamado metodo startup
  }

  onSubmit () {
    console.log(this.artist);

    this._artistService.addArtist(this.token, this.artist).subscribe(
      response => {

        if (!this.artist) {
          console.log('Error al agregar artista');
        } else {
          this.artist = response.artist;
          // this._router.navigated(['/artist-edit'], response.artist._id);
        }

      },
      error => {
        var errorMessage = <any>error;

        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          this.alertMessage = body.message;

        }
      }
    );
  }
}
