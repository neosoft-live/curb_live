import { BootstrapOptions, Component, ViewChild } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';
import { Note } from '../note';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {

    noteForm!: FormGroup;
    editForm!: FormGroup;
    noteDetail:any;
    notes:any = [];

    @ViewChild('ngmodalclose') modalClose:any;
  


    noteObj:Note = {
      id:'',
      note_title:'',
      note_description:''
    }

    constructor(private note_serve:NoteService, private formBuilder:FormBuilder){
      this.noteForm = this.formBuilder.group({
        title:['',Validators.required],
        description:['',Validators.required]
      })
      this.editForm = this.formBuilder.group({
        edit_title:['',Validators.required],
        edit_description:['',Validators.required]
      })
    }


    ngOnInit(){
      this.getAllNotes()
    }


    addNote(){
      const {value} = this.noteForm;
      console.log(value);
      

      this.noteObj.id = '';
      this.noteObj.note_title = value.title;
      this.noteObj.note_description = value.description;


      this.note_serve.addNote(this.noteObj).then((note)=>{
        if(note){
          alert('Note Add Succesfully')
          this.noteForm.reset();
          this.modalClose.nativeElement.click();
        }
      })
      

    }




    getAllNotes(){
      this.note_serve.getNotes().subscribe((res:Note[])=>{
        console.log(res);
        this.notes = res;
      })
    }


    deleteNote(note:Note){
      let decision = confirm("Are you sure you want to delete this note");

      if(decision === true){
        this.note_serve.deleteNotes(note);
      }
    }

    getNoteDetail(note:Note){
      this.noteDetail = note
    }

    updateNote(note: Note){
      const {value} = this.editForm;
      console.log(value);


      (this.noteObj.id = note.id), 
      (this.noteObj.note_title = value.edit_title),
      (this.noteObj.note_description = value.edit_description); 


      this.note_serve.updateNote(note,this.noteObj).then(()=>{
          alert("Note Updates Successfully");
          this.modalClose.nativeElement.click();
      })

      this.editForm.reset();
      
    }



}
