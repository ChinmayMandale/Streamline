import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import { UserDTO } from 'src/app/shared/UserDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  users: Array<UserDTO>;
  editProjectForm: FormGroup;
  selected: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.editProjectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required)
    });
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    });
  }

  submit() {

  }
}
