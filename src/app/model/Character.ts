export class Character {
  name: string;
  imageSrc: string;
  genres: string[] = [];

  constructor(name: string, genres: string[], imageSrc: string) {
    this.name = name;
    this.genres = genres;
    this.imageSrc = imageSrc;
  }
}
