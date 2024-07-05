import {Injectable} from '@angular/core';
import {Hero} from "./hero";
// import {HEROES} from "./mock-heroes";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient) {
  }

  private heroesUrl = 'api/heroes';  // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };


  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES)
  //   this.messageService.add('HeroService: fetched heroes')
  //   return heroes;
  // }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log("fetched heroes")),
        catchError(this.handleError<Hero[]>("getHeoes", []))
      );
  }

  // getHero(id: Number): Observable<Hero>{
  //   // For now, assume that a hero with the specified `id` always exists.
  //   // Error handling will be added in the next step of the tutorial.
  //   const hero = HEROES.find(h =>h.id === id)!;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   console.log(id, hero.name);
  //   return of(hero)
  // }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  /** Enregistrez un message HeroService avec MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  // getHeroes(): Hero[] {
  //   return  HEROES;
  // }


  /** * Gérer l'opération HTTP qui a échoué. * Laissez l'application continuer. * * Opération @param - nom de l'opération qui a échoué * @param result - valeur facultative à renvoyer comme résultat observable */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log(error);

      //  better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>("updateHero"))
      )
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero)=> this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>("addHero"))

      );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id = ${id}`)),
        catchError(this.handleError<Hero>("deleteHero"))
      )
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x =>x.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>("searchHeroes", []))
      );
  }


}
