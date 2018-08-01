import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongAddComponent } from './song-add/song-add.component';
import { SongEditComponent } from './song-edit/song-edit.component';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SongAddComponent, SongEditComponent, SongListComponent]
})
export class SongsModule { }
