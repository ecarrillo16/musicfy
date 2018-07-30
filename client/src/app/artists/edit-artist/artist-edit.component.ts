import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GLOBAL } from '../../properties/global';
import { UserService } from '../../users/user.service';
import { ArtistService } from '../artist.service';
import { UploadService } from '../../properties/upload.service';
import { Artist } from '../artist.models';

@Component({
  selector: 'app-artist-edit',
  templateUrl: '../add-artist/artist-add.html',
  providers: [
    UserService,
    ArtistService,
    UploadService
  ]
})

export class ArtistEditComponent implements OnInit {
  public title: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public isEdit;
  public fileToUpload: Array<File>;

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _artistService: ArtistService,
    private _uploadService: UploadService
  ) {
    this.title = 'Artist Edit';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('', '', '');
    this.isEdit = true;
  }

  ngOnInit () {
    // Llamado metodo startup

    this.getArtist();
  }

  public getArtist () {
    this._route.params.forEach((params: Params) => {
      let id = params[ 'id' ];

      this._artistService.getArtist(this.token, id).subscribe(
        response => {

          if (!this.artist) {
            this._router.navigate([ '/' ]);
          } else {
            this.artist = response.artist;
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
    });
  }

  onSubmit () {
    this._route.params.forEach((params: Params) => {
      let id = params[ 'id' ];

      this._artistService.editArtist(this.token, id, this.artist).subscribe(
        response => {

          if (!this.artist) {
            this.alertMessage = 'Error al Editar artista';
          } else {
            this.alertMessage = 'El Artista se Editar de forma correcta';

            this._uploadService.makeFileRequest(this.url, [], this.fileToUpload, this.token, 'image')
            .then(
              result => {
                this._router.navigate(['/artist']);
              },
              error => {
                console.log(error);
              }
            );
            // this.artist = response.artist;
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
    });
  }


  /**
   * fileChangeEvent
   */
  public fileChangeEvent (fileInput: any) {
    this.fileToUpload = <Array<File>>fileInput.target.files;
    console.log(this.fileToUpload);
  }
}
