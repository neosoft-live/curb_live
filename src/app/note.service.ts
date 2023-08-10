import { Injectable } from '@angular/core';
import {Note} from './note';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { updateDoc } from '@firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private afs:Firestore ) { }


  // Add a New Note

  addNote(note:Note){
    note.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, 'Notes'),note);
  }


  getNotes():Observable<Note[]>{
    let notesRef = collection(this.afs, 'Notes');
    return collectionData(notesRef,{idField:'id'}) as Observable<Note[]>;
  }


  // Delete a Note
  deleteNotes(note:Note){
    let docRef = doc(this.afs, `Notes/${note.id}`);
    return deleteDoc(docRef);
  }


  // Update a Note
  updateNote(note:Note, notes:any){
    let docRef = doc(this.afs,`Notes/${note.id}`);
    return updateDoc(docRef,notes);
  }
}
