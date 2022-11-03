import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INote } from 'src/app/model/INote';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input('note') public note:INote = {
    id:-1,
    title:'',
    description:''
  };

  @Output() editNote = new EventEmitter<INote>();
  @Output() removeNote = new EventEmitter<INote>();

  constructor() { }

  ngOnInit(): void {
   
  }

  ngAfterContentInit(): void {
    
  }

  public editNoteFn(){
    if(this.note.id==-1) return;
    this.editNote.emit(this.note);
  }

  public removeNoteFn(){
    if(this.note.id==-1) return;
    this.removeNote.emit(this.note);
  }

}
