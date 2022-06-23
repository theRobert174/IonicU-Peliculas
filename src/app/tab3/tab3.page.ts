import { Component, OnInit } from '@angular/core';
import { Pelicula, PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favGenre : any[] = [];

  constructor(private datalocal: DataLocalService, private moviesService :MoviesService) {}

  ngOnInit(){
  }
  
  async ionViewWillEnter(){
    this.peliculas = await this.datalocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos,this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
    this.favGenre = [];
    generos.forEach(genero =>{
      this.favGenre.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => { return peli.genres.find(genre => genre.id === genero.id); })
      })
    });
  }

}
