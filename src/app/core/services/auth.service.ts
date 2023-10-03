import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../model/register';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient
  ){}
  
  postRegister(register: Register){
    return this.http.post("https://6440b4a0fadc69b8e070cdb4.mockapi.io/login", register);
  }

  checkExistingUser(email: string): Observable<boolean> {
    return this.http.get<any[]>(`https://6440b4a0fadc69b8e070cdb4.mockapi.io/login?email=${email}`).pipe(
      map(users => users.length > 0)
    );
  }
  
  getLogin(){
    return this.http.get("https://6440b4a0fadc69b8e070cdb4.mockapi.io/login");
  }


}
