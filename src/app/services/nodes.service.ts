import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class NodesService {

  constructor(private angularFireDataBase: AngularFireDatabase) { }

  public getNotes() {
    return this.angularFireDataBase.list('/notes/')
  }

  public getNote(id) {
    return this.angularFireDataBase.object('/notes/' + id)
  }

  public createNote(note) {
    return this.angularFireDataBase.object('/notes/'+ note.id).set(note);
  }

  public editNote(note) {
    return this.angularFireDataBase.object('/notes/'+ note.id).set(note);
  }

  public deleteNote(id) {
    return this.angularFireDataBase.object('/notes/'+ id).remove();
  }
}
