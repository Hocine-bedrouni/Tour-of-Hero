import { Component, Input } from '@angular/core';
import {Hero} from "../hero";
import {ActivatedRoute, Router} from "@angular/router";
import {HeroService} from "../hero.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private heroservice: HeroService,
    private location: Location
  ) {}

  @Input() hero?: Hero;

  ngOnInit(): void {
    this.getHero();
}

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroservice.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack():void {
    console.log("hello");
    this.location.back();

  }


  save(): void {
    if (this.hero) {
      this.heroservice.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
