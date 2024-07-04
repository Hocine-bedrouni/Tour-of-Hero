import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";

//import {HEROES} from "../mock-heroes";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) {}

  public selectedHero?: Hero;

  public heroes: Hero[] = [];

  @ViewChild("heroName")
  public heroName!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.getHeroes()
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  // }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }




  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };


  add(name: string):void {
    name = name.trim();
    if(!name) {return;}
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        console.log(this.heroName.nativeElement.value);
        // @ts-ignore
        this.heroName.nativeElement.value="Va chier mec";
      })

  }
}
