import { Injectable } from '@angular/core';
import { INote } from '../model/INote';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private dbPath = '/notes';
  notesRef!: AngularFirestoreCollection<any>;

  public notes: INote[] = [
  ];
  constructor(private db: AngularFirestore, private user:LoginService ) {
    this.notesRef = db.collection(this.user.user.id);

    //Cargar todas las notas del servidor
    this.notesRef.get().subscribe(d => {
      let docs = d.docs;
      /*docs.forEach(d=>{
        let newd = {id:d.id,...d.data()}; 
        this.notes.push(newd);
      });*/
      this.notes = docs.map(d => {
        return { id: d.id, ...d.data() };
      });

    })


  }
  public async createNote(newNote: INote) {

    try {
      let { id, ...newNoteWithoutID } = newNote;
      let dRef: DocumentReference<any> = await this.notesRef.add({ ...newNoteWithoutID });
      newNote.id = dRef.id;
      this.notes.push(newNote);
    } catch (err) {
      console.error(err);
    }
  }
  public removeNote(id: any): Promise<void> {
    let newNotes = this.notes.filter((n) => {
      return n.id != id;
    });
    this.notes = newNotes;
    return this.notesRef.doc(id).delete();
  }

  public getNotes(): INote[] {
    return this.notes;
  }

  public updateNote(note: INote): Promise<void> {
    let idtobeupdated: any;
    let data: any;
    this.notes.forEach(n => {
      if (n.id == note.id) {
        n.title = note.title;
        n.description = note.description;
        let { id, ...newData } = note;
        idtobeupdated = id;
        data = newData;
      }
    });
    if (idtobeupdated) {
      return this.notesRef.doc(idtobeupdated as string).update(data);
    } else {
      return Promise.resolve();
    }
  }


}
