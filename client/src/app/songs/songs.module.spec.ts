import { SongsModule } from './songs.module';

describe('SongsModule', () => {
  let songsModule: SongsModule;

  beforeEach(() => {
    songsModule = new SongsModule();
  });

  it('should create an instance', () => {
    expect(songsModule).toBeTruthy();
  });
});
