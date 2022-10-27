import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { INote } from 'src/app/model/INote';
import { SharedModule } from 'src/app/components/SharedModule';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule,FormsModule,SharedModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @ViewChild('colorpicker') cp!: ElementRef;

  public color:String = "#fff"
  public page = "Inicio";

  public notes:INote[] = [
    {title:'note1', description:'hola'},
    {title:'note2', description:'hola mundo'},
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
  refresh(){
    location.reload();
  }

  cambiacolor($event:any){
    this.color=$event.target.value;
  }

  public removingNote($event:INote){
    console.log("Eliminando Nota")
    console.log($event);
  }
  public editingNote($event:INote){
    console.log("Editando Nota")
    console.log($event);
  }
  public trackByNotes(index:number, item:INote){
      return item.id;
  }
}
