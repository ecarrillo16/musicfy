import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home.component';
import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'artists', component: ArtistListComponent},
  {path: 'artist-add', component: ArtistAddComponent},
  {path: 'playlist', component: ArtistListComponent},
  {path: 'account', component: UserEditComponent},
  {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
