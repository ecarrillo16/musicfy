import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { appRoutingProviders, routing } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { ArtistAddComponent, ArtistDetailComponent, ArtistEditComponent, ArtistListComponent } from './artists/index';
import { NgbdDropdownMenu } from './addons/dropdown-menu/dropdown-menu.component';
import { SongsComponent } from './songs/songs.component';
import { AlbumAddComponent } from './albums/album-add/album-add.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    NgbdDropdownMenu,
    UserAddComponent,
    SongsComponent,
    AlbumAddComponent,
    ArtistDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule.forRoot()
  ],
  providers: [ appRoutingProviders ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
