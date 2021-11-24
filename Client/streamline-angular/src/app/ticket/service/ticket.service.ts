import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsDTO } from 'src/app/shared/CommentDTO';
import { TicketDTO } from '../shared/TicketDTO';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  createEditTicket(createEditTicketPayload: TicketDTO): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/ticket/createOrUpdateTicket', 
    createEditTicketPayload);
  }

  deleteTicket(ticketId: number): Observable<void> {
    return this.httpClient.delete<void>('http://localhost:8080/api/project/deleteTicket/' + ticketId);
  }

  getAllTickets(): Observable<Array<TicketDTO>> {
    return this.httpClient.get<Array<TicketDTO>>('http://localhost:8080/api/ticket/getAllTickets');
  }

  getTicketById(ticketId: number): Observable<TicketDTO> {
    return this.httpClient.get<TicketDTO>('http://localhost:8080/api/ticket/getTicketDetails' + ticketId);
  }

  getTicketsByAssignee(assigneeId: number): Observable<Array<TicketDTO>> {
    return this.httpClient.get<Array<TicketDTO>>('http://localhost:8080/api/ticket/getTicketsByAssignee' + assigneeId);
  }

  getTicketsByAssignedTo(assignedToId: number): Observable<Array<TicketDTO>> {
    return this.httpClient.get<Array<TicketDTO>>('http://localhost:8080/api/ticket/getTicketsByAssignedTo' + assignedToId);
  }

  getCommentsByTicketId(ticketId: number): Observable<Array<CommentsDTO>> {
    return this.httpClient.get<Array<CommentsDTO>>('http://localhost:8080/api/ticket/getCommentsByTicket' + ticketId);
  }
}
