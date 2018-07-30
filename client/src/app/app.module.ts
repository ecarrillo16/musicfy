import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { appRoutingProviders, routing } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserEditComponent } from './users/users-edit/user-edit.component';
import { ArtistListComponent } from './artists/list-artist/artist-list.component';
import { ArtistAddComponent } from './artists/add-artist/artist-add.component';
import { ArtistEditComponent } from './artists/edit-artist/artist-edit.component';
import { NgbdDropdownMenu } from './shared/dropdown-menu/dropdown-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    NgbdDropdownMenu
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
