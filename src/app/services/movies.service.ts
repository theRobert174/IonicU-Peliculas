import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaMDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http : HttpClient) { }

  getFeature(){
    return this.http.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-01-01&primary_release_date.lte=2022-06-01&api_key=6d4907204e31e1cbf4de9b6fa7671171&language=es&include_image_language=es`);
  }
}
