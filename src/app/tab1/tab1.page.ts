import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];
  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true
  }

  constructor(private movieServices: MoviesService) {}

  ngOnInit() {
    this.movieServices.getFeature().subscribe(resp => {
      //console.log("Resp", resp);
      this.peliculasRecientes = resp.results;
    });
    this.movieServices.getPopulares().subscribe(resp => {
      console.log("Populares",resp);
      this.populares = resp.results;
    });
  }
}
