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
      this.peliculasRecientes = resp.results;
    });
    this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.movieServices.getPopulares().subscribe(resp => {
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    });
  }
}
