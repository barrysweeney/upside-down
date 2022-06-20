export class Character {
  name: string;
  imageSrc: string;
  genres: string[] = [];
  numUserGenreMatches: number | undefined;
  percentageCharacter: number = 0;

  constructor(name: string, genres: string[], imageSrc: string) {
    this.name = name;
    this.genres = genres;
    this.imageSrc = imageSrc;
  }
}
