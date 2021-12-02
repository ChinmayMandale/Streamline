import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { DatavizService } from 'src/app/services/dataviz.service';
import { UserService } from 'src/app/services/user.service';
import { TicketService } from 'src/app/ticket/service/ticket.service';
import { TicketDTO } from 'src/app/ticket/shared/TicketDTO';

@Component({
  selector: 'app-dataviz',
  templateUrl: './dataviz.component.html',
  styleUrls: ['./dataviz.component.css']
})
export class DatavizComponent implements OnInit {

  private tickets: any;
  private ticketMapPieChart = [
    {"status": "OPEN", "value": ""},
    {"status": "IN_PROGRESS", "value": ""},
    {"status": "TEST", "value": ""},
    {"status": "COMPLETE", "value": ""},
  ]
  
  private toDoTickets: Array<TicketDTO>;
  private inProgressTickets: Array<TicketDTO>;
  private testTickets: Array<TicketDTO>;
  private doneTickets: Array<TicketDTO>;
  

  // private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  // private width: number;
  // private height: number;
  // private x: any;
  // private y: any;
  // private svg: any;
  // private line: d3Shape.Line<[number, number]>; // this is line defination
  // private data: any[] = [
  //   {date: new Date('2010-01-01'), value: 40},
  //   {date: new Date('2010-01-04'), value: 93},
  //   {date: new Date('2010-01-05'), value: 95},
  //   {date: new Date('2010-01-06'), value: 130},
  //   {date: new Date('2010-01-07'), value: 110},
  //   {date: new Date('2010-01-08'), value: 120},
  //   {date: new Date('2010-01-09'), value: 129},
  //   {date: new Date('2010-01-10'), value: 107},
  //   {date: new Date('2010-01-11'), value: 140},
  // ];

  constructor(private userService: UserService,
              private authService: AuthService,
              private ticketService: TicketService,
              private dataVizService: DatavizService) {
    // this.width = 960 - this.margin.left - this.margin.right;
    // this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {

    this.userService.getUserByUserName(this.authService.getUserName()).subscribe(res => {
      this.ticketService.getTicketsByAssignedTo(res.userId).subscribe(val => {
        this.tickets = val;

        this.toDoTickets=this.tickets.filter(ticket =>ticket.status=="OPEN");
        this.inProgressTickets=this.tickets.filter(ticket =>ticket.status=="IN_PROGRESS");
        this.testTickets=this.tickets.filter(ticket =>ticket.status=="TEST");
        this.doneTickets=this.tickets.filter(ticket =>ticket.status=="COMPLETE");

        this.ticketMapPieChart[0].value = this.toDoTickets.length.toString();
        this.ticketMapPieChart[1].value = this.inProgressTickets.length.toString();
        this.ticketMapPieChart[2].value = this.testTickets.length.toString();
        this.ticketMapPieChart[3].value = this.doneTickets.length.toString();

        this.dataVizService.createSvgForPieChart();
        this.dataVizService.createColorsForPieChart(this.ticketMapPieChart);
        this.dataVizService.drawPieChart(this.ticketMapPieChart);
      })
    });

  }


  // private addXandYAxis() {
  //   // range of data configuring
  //   this.x = d3Scale.scaleTime().range([0, this.width]);
  //   this.y = d3Scale.scaleLinear().range([this.height, 0]);
  //   this.x.domain(d3Array.extent(this.data, (d) => d.date));
  //   this.y.domain(d3Array.extent(this.data, (d) => d.value));
  //   // Configure the X Axis
  //   this.svg.append('g')
  //     .attr('transform', 'translate(0,' + this.height + ')')
  //     .call(d3Axis.axisBottom(this.x));
  //   // Configure the Y Axis
  //   this.svg.append('g')
  //     .attr('class', 'axis axis--y')
  //     .call(d3Axis.axisLeft(this.y));
  // }

  // private drawLineAndPath() {
  //   this.line = d3Shape.line()
  //     .x((d: any) => this.x(d.date))
  //     .y((d: any) => this.y(d.value));
  //   // Configuring line path
  //   this.svg.append('path')
  //     .datum(this.data)
  //     .attr('class', 'line')
  //     .attr('d', this.line);
  // }

}
