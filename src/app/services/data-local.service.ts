import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle, Pelicula } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];
  private _storage: Storage | null = null;

  constructor(private storage : Storage, public toastController: ToastController) { 
    this.init();
    this.cargarFavoritos();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPelicula(pelicula: PeliculaDetalle){
    let existe = false;
    let msg = '';
    
    for(const peli of this.peliculas){
      if(peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if(existe){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      msg = 'Removido de Favoritos';
    }
    else{
      this.peliculas.push(pelicula);
      msg='Agregada a Favoritos';
    }

    this.presentToast(msg);
    this.storage.set('peliculas', this.peliculas);
    return !existe;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.dismiss();
    toast.present();
  }

  async cargarFavoritos(){
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    
    return this.peliculas;
  }

  async existePelicula(id){
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true : false;
  }
}
