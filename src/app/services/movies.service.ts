import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits } from '../interfaces/interfaces';

const url = environment.url;
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;

  constructor(private http : HttpClient) { }

  private executeQuery<T>(query : string){
    query = url + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    
    return this.http.get<T>(query);
  }

  getFeature(){
    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth()+1;

    let mesStr;

    if( mes < 10 ){
      mesStr = '0' + mes;
    } else {
      mesStr = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesStr}-01`;
    const fin = `${hoy.getFullYear()}-${mesStr}-${ultimoDia}`;
    
    //return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-01-01&primary_release_date.lte=2022-06-01&api_key=6d4907204e31e1cbf4de9b6fa7671171&language=es&include_image_language=es`);
    return this.executeQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPopulares(){
    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

    return this.executeQuery<RespuestaMDB>(query);
  }

  getPeliculasDetalle(id : string){
    return this.executeQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id : string){
    return this.executeQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  getSearch(query: string){
    return this.executeQuery<RespuestaMDB>(`/search/movie?query=${query}`);
  }
}
