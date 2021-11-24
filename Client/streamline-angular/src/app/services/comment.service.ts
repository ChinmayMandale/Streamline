import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsDTO } from '../shared/CommentDTO';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  createProject(comment: CommentsDTO): Observable<CommentsDTO> {
    return this.httpClient.post<CommentsDTO>('http://localhost:8080/api/comment/createComment', comment);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.httpClient.delete<void>('http://localhost:8080/api/comment/deleteComment/' + commentId);
  }

  updateProject(comment: CommentsDTO): Observable<CommentsDTO> {
    return this.httpClient.post<CommentsDTO>('http://localhost:8080/api/comment/updateComment', comment);
  }
}
