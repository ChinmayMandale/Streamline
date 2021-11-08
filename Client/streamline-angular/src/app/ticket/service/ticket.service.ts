import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEditTicketPayload } from '../shared/create-edit-ticket.payload';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }


  createEditTicket(createEditTicketPayload: CreateEditTicketPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/ticket/createOrUpdateTicket', 
    createEditTicketPayload, { responseType: 'text' });
  }

}
