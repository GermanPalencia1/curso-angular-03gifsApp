import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey: string ='nb2gAcKsvyK2v7msXZpxKY6FOEn6GKND';

  constructor() { }

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

  }

  public searchTag(tag: string): void {

    if(tag.length === 0) return;

    this.organizeHistory(tag);

  }

}
