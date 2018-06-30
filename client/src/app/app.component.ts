import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'Musicfy';
  public user: User;
  public register: User;
  public identity;
  public token;
  public errorMessage;
  // TODO :: Check this 
  public succesMessage;

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    this.register = new User('', '', '', '', '', 'ROLE_USER', '');
  }
  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log('Token :: ', this.token);
    console.log('Identity :: ', this.identity);

  }

  /**
   * onSubmit
   */
  public onSubmit() {

    // Conseguir datos de usuario logeado
    this._userService.signUp(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          console.log("El usuario no sea ha logeado");
        } else {
          // Crea elemento en local storage para mantener una sesión 
          localStorage.setItem('identity', JSON.stringify(identity));

          // Conseguir token de login
          this._userService.signUp(this.user, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if (this.token.length <= 0) {
                console.log("El token no se ha generado");
              } else {
                localStorage.setItem('token', token);

                console.log(token);
                console.log(identity);
              }
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {

                var body = JSON.parse(error._body);
                this.errorMessage = body.message;

              }
            }
          );
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {

          var body = JSON.parse(error._body);
          this.errorMessage = body.message;

        }
      }
    );
  }

  /**
   * onSubmitRegister
   */
  public onSubmitRegister() {
    console.log(this.register);

    this._userService.register(this.register).subscribe(
      response => {

        let user = response.user;
        this.register = user;

        if (!user._id) {
          this.succesMessage = "Todo bien";
        } else {
          this.succesMessage = "Todo mal";
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {

          var body = JSON.parse(error._body);
          this.succesMessage = body.message;

        }
      }
    );
  }

  /**
   * logout
   */
  public logout() {
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }
}
