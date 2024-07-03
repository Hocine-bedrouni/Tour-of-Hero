import { Injectable } from '@angular/core';
import {Hero} from "./hero";
import {HEROES} from "./mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class HeroService {
  constructor(
    private messageService: MessageService,
    private http : HttpClient) {}

  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES)
  //   this.messageService.add('HeroService: fetched heroes')
  //   return heroes;
  // }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: Number): Observable<Hero>{
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h =>h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    console.log(id, hero.name);
    return of(hero)
  }

  /** Enregistrez un message HeroService avec MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes';  // URL to web api


  // getHeroes(): Hero[] {
  //   return  HEROES;
  // }



}
