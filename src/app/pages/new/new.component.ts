import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      new works!
    </p>
  `,
  styles: [
  ]
})
export class NewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
