import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import { AuthService } from 'src/app/auth/shared/auth.service';
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
  private ticketMap = [
    {"status": "OPEN", "value": ""},
    {"status": "IN_PROGRESS", "value": ""},
    {"status": "TEST", "value": ""},
    {"status": "COMPLETE", "value": ""},
  ]
  // private data = [
  //   {"Framework": "Vue", "Stars": "25", "Released": "2014"},
  //   {"Framework": "React", "Stars": "25", "Released": "2013"},
  //   {"Framework": "Angular", "Stars": "50", "Released": "2016"},
  //   {"Framework": "Backbone", "Stars": "20", "Released": "2010"},
  //   {"Framework": "Ember", "Stars": "10", "Released": "2011"},
  // ];
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
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
              private ticketService: TicketService) {
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

        this.ticketMap[0].value = this.toDoTickets.length.toString();
        this.ticketMap[1].value = this.inProgressTickets.length.toString();
        this.ticketMap[2].value = this.testTickets.length.toString();
        this.ticketMap[3].value = this.doneTickets.length.toString();

        console.log(this.ticketMap);

        this.createSvg();
        this.createColors();
        this.drawChart();
      })
    });

  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.ticketMap.map(d => d.value.toString()))
    .range(["#693dd1", "#3dd191", "#d92b3a", "#e6cd10"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.ticketMap))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.ticketMap))
    .enter()
    .append('text')
    .text(d => d.status)
    .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
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
