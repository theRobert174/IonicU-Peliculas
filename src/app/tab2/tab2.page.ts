import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string = '';
  ideas:string[] = ['Spiderman', 'Multiverse Of Madness', 'Lightyear', 'Memory'];

  constructor(private moviesService : MoviesService) {}

  buscar( event ){
    const valor = event.detail.value;
    console.log(valor);
    this.moviesService.getSearch(valor).subscribe(resp => console.log(resp));
  }

}
