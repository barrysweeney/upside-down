export class Character {
  name: string;
  imageSrc: string;
  genres: string[] = [];
  percentageCharacter: Number | undefined;

  constructor(name: string, genres: string[], imageSrc: string) {
    this.name = name;
    this.genres = genres;
    this.imageSrc = imageSrc;
  }
}
