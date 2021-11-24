import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  allowDrop(ev) {
    ev.preventDefault();
    }
    
    drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    }
    
    drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    }
  }