import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GLOBAL } from '../../properties/global';
import { User } from '../user.models';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.html',
  providers: [ UserService ]
})

export class UserEditComponent implements OnInit {
  public title: String;
  public user: User;
  public identity;
  public token;
  public alertMessage;
  public url: string;
  public fileToUpload: Array<File>;

  constructor (
    private _userService: UserService
  ) {
    this.title = 'User Edit';

    // LocalStorage Variable
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit () {

  }

  /**
   * onSubmit
   */
  public onSubmitUpdate () {

    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.alertMessage = 'El usuario no se ha actualizado';
        } else {
          // this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
          document.getElementById('identityName').innerHTML = this.user.name;

          console.log(this.fileToUpload);

          if (!this.fileToUpload) {
            // Redirect
          } else {
            this.makeFileRequest(this.url + 'upload/' + this.user._id, [], this.fileToUpload).then(
              (result: any) => {
                this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user));

                var imgPath = this.url + 'get-image/' + this.user.image;
                document.getElementById('imageLoged').setAttribute('src', imgPath);
              });
          }
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

  /**
   * fileChangeEvent
   */
  public fileChangeEvent (fileInput: any) {
    this.fileToUpload = <Array<File>>fileInput.target.files;
    console.log(this.fileToUpload);
  }

  /**
   * makeFileRequest
   */
  public makeFileRequest (url: string, params: Array<string>, files: Array<File>) {
    var token = this.token;

    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[ i ], files[ i ].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
