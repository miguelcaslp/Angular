import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      notes works!
    </p>
  `,
  styles: [
  ]
})
export class NotesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
