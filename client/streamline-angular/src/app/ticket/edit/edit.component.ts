import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectDTO } from 'src/app/shared/ProjectDTO';
import { UserDTO } from 'src/app/shared/UserDTO';
import { TicketService } from '../service/ticket.service';
import { TicketDTO } from '../shared/TicketDTO';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  users: Array<UserDTO>;
  projects: Array<ProjectDTO>;
  editTicketForm: FormGroup;
  createEditTicketPayload: TicketDTO;
  priorityValues = ['high','medium','low'];
  statusValues = ['open','inprogress','closed'];
  assignedToUsers = [];
  projectValues = [];

  constructor(private ticketService: TicketService,
    private userService: UserService,
    private projectService: ProjectService) { 
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
      status: '',
      projectName: ''
    };
  }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      this.users.forEach(user => {
        this.assignedToUsers.push(user.userName);
      })
    })

    this.projectService.getAllProjects().subscribe(res => {
      this.projects = res;
      this.projects.forEach(project => {
        this.projectValues.push(project.projectName);
      })
    })

    this.editTicketForm = new FormGroup({
      summary: new FormControl('', Validators.required),
      projectName: new FormControl('', Validators.required),
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
    this.createEditTicketPayload.projectName = this.editTicketForm.get('projectName').value;

    this.ticketService.createEditTicket(this.createEditTicketPayload).subscribe(res => {
      console.log(res);
    })
  }
}
