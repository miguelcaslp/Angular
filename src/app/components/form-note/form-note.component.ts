import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INote } from 'src/app/model/INote';

@Component({
  selector: 'app-form-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit {
  @Input() note!:INote;
  @Output() onsubmit = new EventEmitter<INote>();
  public form:FormGroup;

  @ViewChild('title') title!:ElementRef;
  public description!:String;

  constructor(private fb:FormBuilder,) { 
    this.form = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(4) ]],
      description: [''],
      id:['']
    })
  }

  ngOnInit(): void {
    if(this.note && this.note.title){
      this.form.setValue(this.note);
      /**this.form.patchValue({
        id: this.note.id,
      });*/

    }
  }

  submit(){
    console.log(this.form);
    let newNote:INote = {
      title: this.form.value.title,
      description : this.form.value.description
    }
    this.onsubmit.emit(newNote);
    this.form.reset();
  }

}
