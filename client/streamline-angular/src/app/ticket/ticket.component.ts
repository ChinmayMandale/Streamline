import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from './service/ticket.service';
import { TicketDTO } from './shared/TicketDTO';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  id: string;
  ticket: TicketDTO

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ticketService.getTicketById(this.id).subscribe(res => {
      debugger;
      this.ticket = res;
      console.log(res);
    })
  }

}
