import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { UserService } from '../services/user.service';
import { TicketService } from '../ticket/service/ticket.service';
import { TicketDTO } from '../ticket/shared/TicketDTO';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  username: any;
  userid: any;
  tickets: Array<TicketDTO>;


  constructor(private authservice: AuthService,
    private userservice: UserService,
    private ticketservice: TicketService
  ) {

  }

  ngOnInit(): void {
    this.username = this.authservice.getUserName();
    this.userservice.getUserByUserName(this.username).subscribe(res => {
      this.userid = res.userId;
      this.ticketservice.getTicketsByAssignedTo(this.userid).subscribe(val => {
        this.tickets = val;
        console.log(this.tickets);

      })
    });
  }

}
