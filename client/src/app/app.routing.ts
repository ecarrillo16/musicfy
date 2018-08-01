import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistAddComponent } from './artists/artist-add/artist-add.component';
import { ArtistEditComponent } from './artists/artist-edit/artist-edit.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artists', component: ArtistListComponent },
  { path: 'artist-add', component: ArtistAddComponent },
  { path: 'artist-edit/:id', component: ArtistEditComponent },
  { path: 'playlist', component: ArtistListComponent },
  { path: 'account', component: UserEditComponent },
  { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
