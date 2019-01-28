import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogInResponse, Pic, User, CheckExistResponse } from '../../interface/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {


  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  isLoggedIn = false;


  getAllMedia() {
    return this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media');
  }

  getSingleMedia = (id) => {
    return this.http.get<Pic>(`http://media.mw.metropolia.fi/wbma/media/${id}`);
  };

  checkIfUserExists = (user: User) => {
    return this.http.get<CheckExistResponse>('http://media.mw.metropolia.fi/wbma/users/username/'+user.username);
  };

  logInUser = (user: User)  => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
      return this.http.post<LogInResponse>('http://media.mw.metropolia.fi/wbma/login', user, httpOptions);
  };

  registerUser = (user: User) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post<LogInResponse>('http://media.mw.metropolia.fi/wbma/users', user, httpOptions);
  };

  getUserAvatar = () => {
    return this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/tags/profile');
  };
}
