import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string ='nb2gAcKsvyK2v7msXZpxKY6FOEn6GKND';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';
  localStorage: any;

  constructor(private http: HttpClient) {
    /*
    Cuando el servicio sea iyectado por primera vez se ve si hay algo en el almacenamiento
    del LocalStorage para leerlo y sacar la info.
    */
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {

    tag = tag.toLocaleLowerCase();

    //Eliminar el tag viejo repetido
    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    //Insertarlo de nuevo al principio
    this._tagsHistory.unshift(tag);

    //Limitarlo a 10 busquedas
    this._tagsHistory = this.tagsHistory.splice(0,10);

    //Llamar al método para guardar info en el LocalStorage una vez que ha cambiado la información
    this.saveLocalStorage();

  }

  //Guardar en el almacenamiento del navegador información
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  //Leer info del localStorage
  private loadLocalStorage(): void {

    //Si no hay datos -> no hacer nada
    if(!localStorage.getItem('history')) return;

    //Si hay datos (indicar que no es null):
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    //Hacer validación para ver si el historial es 0
    if (this._tagsHistory.length === 0) return;

    //Sino buscamos el primero para mostrarlo al recargar o abrir de nuevo
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {

    if(tag.length === 0) return;

    this.organizeHistory(tag);

    //Hacer petición a la Api para sacar datos -> Se saca por el app.module mejor
    //Luego el private de arriba con el http
    //Luego lo que hay debajo de esto.
    // fetch('http://api.giphy.com/v1/gifs/search?api_key=nb2gAcKsvyK2v7msXZpxKY6FOEn6GKND&q=valorant&limit=10')
    //   .then(resp => resp.json)
    //   .then(data => console.log({data}));

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.gifsList = resp.data;
      });
  }

}
