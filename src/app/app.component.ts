import {Component} from '@angular/core';
import {Character} from "./model/Character";
import {Genres} from "./Genres";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upside-down';
  user = null;
  artists: [{ genres: string[]; }] | undefined;
  genres: string[] | undefined;
  characters: Character[] = [];
  matchedCharacter: Character | undefined;
  matchedCharacterName: string = '';


  constructor() {
    this.ngOnInit();
  }

  /**
   * ngOnInit is a life cycle hook called by Angular to indicate that the Angular is done creating the component
   */
  ngOnInit() {
    this.setUpCharacters();
    // get access token for API calls from URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    let accessToken = urlSearchParams.get('access_token');

    // get the logged in user's name
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then(response => {
      return response.json()
    }).then(data => {
      this.user = data.display_name;
    })

    // Get users top artists
    this.getUsersTopArtists(accessToken);
  }

  /**
   * Gets Users top artists
   * @param accessToken from Spotify API
   */
  private getUsersTopArtists(accessToken: string | null) {
    fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }).then(response => {
      return response.json()
    }).then(data => {
      this.artists = data.items;
      // get users top genres
      this.getUserGenres();
    })
  }

  /**
   * Iterates through users top artists and pushes the artists associated genres to the user's genres array
   */
  private getUserGenres() {
    let genres: string[] = [];
    // @ts-ignore
    this.artists.forEach(artist => {
      artist.genres.forEach(genre => {
        genres.push(genre);
      })
    });
    this.genres = genres;
    // Checks how many genres the user has in common with each character
    this.getCharacterMatches();
  }

  /**
   * Sets up the Stranger Things characters with name, genres, and path to their image
   * Adds characters to character array
   */
  private setUpCharacters() {
    let mike: Character = new Character('Mike', Genres.Mike, 'assets/images/mike.jpg');
    let eleven: Character = new Character('Eleven', Genres.Eleven, 'assets/images/eleven.jpg');
    let will: Character = new Character('Will', Genres.Will, 'assets/images/will.jpg');
    let dustin: Character = new Character('Dustin', Genres.Dustin, 'assets/images/dustin.jpg');
    let lucas: Character = new Character('Lucas', Genres.Lucas, 'assets/images/lucas.jpg');
    let max: Character = new Character('Max', Genres.Max, 'assets/images/max.jpg');
    let hopper: Character = new Character('Hopper', Genres.Hopper, 'assets/images/hopper.jpg');
    let nancy: Character = new Character('Nancy', Genres.Nancy, 'assets/images/nancy.jpg');
    let jonathan: Character = new Character('Jonathan', Genres.Nancy, 'assets/images/jonathan.jpg');
    let joyce: Character = new Character('Joyce', Genres.Joyce, 'assets/images/joyce.jpg');
    let billy: Character = new Character('Billy', Genres.Billy, 'assets/images/billy.jpg');
    let robin: Character = new Character('Robin', Genres.Robin, 'assets/images/robin.jpg');
    let steve: Character = new Character('Steve', Genres.Steve, 'assets/images/steve.jpg');
    let murray: Character = new Character('Murray', Genres.Murray, 'assets/images/murray.jpg');
    let mrsWheeler: Character = new Character('Mrs. Wheeler', Genres.MrsWheeler, 'assets/images/mrswheeler.jpg');
    let argyle: Character = new Character('Argyle', Genres.Argyle, 'assets/images/argyle.jpg');
    let eddie: Character = new Character('Eddie', Genres.Eddie, 'assets/images/eddie.jpg');
    let bob: Character = new Character('Bob', Genres.Bob, 'assets/images/bob.jpg');

    this.characters = [];
    this.characters?.push(
      mike,
      eleven,
      will,
      dustin,
      lucas,
      max,
      hopper,
      nancy,
      steve,
      murray,
      jonathan,
      joyce,
      billy,
      robin,
      bob,
      mrsWheeler,
      argyle,
      eddie
    )
  }

  /**
   * Checks number of matches between users top genre and each Stranger Things characters top genres
   */
  private getCharacterMatches() {
    let maxMatches: number = 0;
    let bestMatchedCharacter: Character;
    this.characters?.forEach(character => {
      let matches = 0;
      for (let i = 0; i < character.genres.length; i++) {
        // @ts-ignore
        for (let j = 0; j < this.genres?.length; j++) {
          // @ts-ignore
          if (character.genres[i] === this.genres[j]) {
            matches++;
          }
        }
      }
      // 10 artists per playlist
      character.numUserGenreMatches = matches / 10;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatchedCharacter = character;
      }
    })
    // Get users percentage matched with each character
    this.getCharacterPercentages();
  }

  /**
   *  Get users percentage matched with each character
   */
  private getCharacterPercentages() {
    // total number of genres matched between user and all characters
    let totalMatches: number | undefined = 0;
    // iterate through each character
    for (let character of this.characters) {
      // add number of matches per character to total matches
      // @ts-ignore
      totalMatches = totalMatches + character.numUserGenreMatches;
    }
    // iterate through characters
    for (let character of this.characters) {
      // @ts-ignore
      character.percentageCharacter = ((character.numUserGenreMatches / totalMatches) * 100).toFixed(2);
    }
    // sort characters by percentage matched
    this.sortCharacters();
  }

  /**
   * Sorts array of characters by the usersPercentageMatch
   */
  private sortCharacters() {
    this.characters.sort((a, b) => a.percentageCharacter - b.percentageCharacter);
  }
}
