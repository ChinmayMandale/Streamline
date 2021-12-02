import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ProjectDTO } from '../shared/ProjectDTO';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  projects: Array<ProjectDTO>;

  constructor(private projectservice: ProjectService) {
    
   }

  ngOnInit(): void {
    this.projectservice.getAllProjects().subscribe(val => {
      this.projects = val;
  })
}

}
