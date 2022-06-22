import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar: string = '';
  ideas:string[] = ['Spiderman', 'Multiverse Of Madness', 'Lightyear', 'Memory'];
  peliculas: Pelicula[] = [];
  buscando: boolean = false;

  constructor(private moviesService : MoviesService, private modalCtrl: ModalController) {}

  buscar( event ){
    const valor: string = event.detail.value;
    console.log(valor);
    if(valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;
    this.moviesService.getSearch(valor).subscribe(resp => {
      console.log(resp['results']);
      this.peliculas = resp.results;
      this.buscando = false;
    });
  }

  async verDetalle(id : number){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps:{
        id
      }
    });
    modal.present();
  }

}
