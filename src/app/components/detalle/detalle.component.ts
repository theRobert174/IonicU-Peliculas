import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Cast, PeliculaDetalle } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];
  estrella: boolean = false;
  slideOptsActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private dataLocalService: DataLocalService) { }

  ngOnInit() {
    //console.log("ID",this.id);
    
    this.dataLocalService.existePelicula(this.id).then(existe => {
      //console.log("Detalle component existe: ", existe);
      this.estrella = existe;
    });
  
    this.moviesService.getPeliculasDetalle(this.id).subscribe(resp => {
      //console.log(resp);
      this.pelicula = resp;
    });
    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {
      //console.log(resp);
      this.actores = resp.cast;
    });
  }
  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.estrella = this.dataLocalService.guardarPelicula(this.pelicula);
  }

}
