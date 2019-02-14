import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LogInResponse,
  Pic,
  User,
  CheckExistResponse,
  UploadResponse,
} from '../../interface/pic';

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
  isRegistered = false;


  getAllMedia = () => {
    return this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media');
  };

  getUserFiles = () => {
    const user_id = localStorage.getItem('user_id');
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media/user/'+user_id, httpOptions);
  };

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

  upload = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.post<UploadResponse>('http://media.mw.metropolia.fi/wbma/media', data, httpOptions)
  };

  getUserInfo = (user_id) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.get<Pic>(`http://media.mw.metropolia.fi/wbma/users/${user_id}`, httpOptions);
  };

  deleteMedia = (file_id) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.delete<Pic>(`http://media.mw.metropolia.fi/wbma/media/${file_id}`, httpOptions);
  };

  updateMedia = (file_id, json) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.put<String>(`http://media.mw.metropolia.fi/wbma/media/${file_id}`, json, httpOptions);
  };
}
