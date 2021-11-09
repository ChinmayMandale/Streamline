import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editTicketForm: FormGroup;
  priorityValues : ['high','medium','low'];
  statusValues : ['open','inprogress','closed'];
  assignedToUsers : ['sanjoli','sruthi'];
  projectValues : ['test1','test2'];
  constructor() { }

  ngOnInit(): void {
    this.editTicketForm = new FormGroup({
      summary: new FormControl('', Validators.required),
      projects: new FormControl('', Validators.required),
      assignee: new FormControl('', Validators.required),
      assignedTo: new FormControl('', Validators.required),
      status: new FormControl(['open','inprogress','closed'], Validators.required),
      priority: new FormControl(['high','medium','low'], Validators.required),
      createDate: new FormControl('', Validators.required),
      estimatedTime: new FormControl('', Validators.required),
      actualTime: new FormControl('', Validators.required),
      attachment: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

}
