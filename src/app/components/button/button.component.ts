import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input('clase') clase:string = 'btn btn-primary';
  @Input('texto') texto:string = 'Alerta';
  @Output() action = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

}


