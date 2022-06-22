import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  private _storage: Storage | null = null;

  constructor(private storage : Storage, public toastController: ToastController) { 
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.peliculas = await this.storage.get('peliculas');
  }

  guardarPelicula(pelicula: PeliculaDetalle){
    let existe = false;
    let msg = '';
    //debugger;
    for(const peli of this.peliculas){
      if(peli.id === pelicula.id){
        existe = true;
        break;
      }
    }
    if(existe){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      msg = 'Removido de Favoritos';
    }else{
      this.peliculas.push(pelicula);
      msg='Agregada a Favoritos';
    }
    this.presentToast(msg);
    this.storage.set('peliculas', this.peliculas);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
