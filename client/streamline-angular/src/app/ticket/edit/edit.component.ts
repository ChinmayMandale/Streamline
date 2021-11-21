import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from 'src/app/shared/UserDTO';
import { TicketService } from '../service/ticket.service';
import { CreateEditTicketPayload } from '../shared/create-edit-ticket.payload';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  users: Array<UserDTO>;
  editTicketForm: FormGroup;
  createEditTicketPayload: CreateEditTicketPayload;
  priorityValues = ['high','medium','low'];
  statusValues = ['open','inprogress','closed'];
  assignedToUsers = [];
  projectValues = ['test1','test2'];

  constructor(private ticketService: TicketService,
    private userService: UserService,) { 
    this.createEditTicketPayload = {
      ticketId: '',
      summary: '',
      assignedTo: '',
      assignee: '',
      createDate: new Date,
      estimatedTime: 0,
      actualTime: 0,
      description: '',
      dueDate: new Date,
      priority: '',
      status: ''
    };
  }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      this.users.forEach(user => {
        this.assignedToUsers.push(user.userName);
      })
    })

    this.editTicketForm = new FormGroup({
      summary: new FormControl('', Validators.required),
      projects: new FormControl('', Validators.required),
      assignee: new FormControl('', Validators.required),
      assignedTo: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      priority: new FormControl('', Validators.required),
      createDate: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      estimatedTime: new FormControl('', Validators.required),
      actualTime: new FormControl('', Validators.required),
      attachment: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const attachment = event.target.files[0];
      this.editTicketForm.patchValue({
        fileSource: attachment
      });
    }
  }

  submit() {
    this.createEditTicketPayload.summary = this.editTicketForm.get('summary').value;
    this.createEditTicketPayload.assignee = this.editTicketForm.get('assignee').value;
    this.createEditTicketPayload.assignedTo = this.editTicketForm.get('assignedTo').value;
    this.createEditTicketPayload.createDate = this.editTicketForm.get('createDate').value;
    this.createEditTicketPayload.description = this.editTicketForm.get('description').value;
    this.createEditTicketPayload.dueDate = this.editTicketForm.get('dueDate').value;
    this.createEditTicketPayload.estimatedTime = this.editTicketForm.get('estimatedTime').value;
    this.createEditTicketPayload.actualTime = this.editTicketForm.get('actualTime').value;
    this.createEditTicketPayload.priority = this.editTicketForm.get('priority').value;
    this.createEditTicketPayload.status = this.editTicketForm.get('status').value;

    this.ticketService.createEditTicket(this.createEditTicketPayload).subscribe(res => {
      console.log(res);
    })
  }
}
