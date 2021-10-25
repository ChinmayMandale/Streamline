import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean>{
return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login', loginRequestPayload).pipe(map(data=> {
this.localStorage.store('authenticationToken',data.authenticationToken);
this.localStorage.store('username',data.username);
this.localStorage.store('authenticationToken',data.refreshToken);
this.localStorage.store('authenticationToken',data.expiresAt);
return true;
}))
}
}
