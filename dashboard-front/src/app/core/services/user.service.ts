import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Application} from "../model/application";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiUrl + '/user';
  constructor(private httpClient: HttpClient) { }
  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }
  public getById(id): Observable<User> {
    return this.httpClient.get<User>(this.url + '/'+ id);
  }
  public save(user: User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }
  public update(user: User): Observable<User> {
    return this.httpClient.put<User>(this.url, user);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.url + '/' + id);
  }

  public assign(id,application: Application): Observable<User> {
    return this.httpClient.put<User>(this.url + '/assign/'+ id, application);
  }
  public unassign(id,application: Application): Observable<User> {
    return this.httpClient.put<User>(this.url + '/unassign/'+ id, application);
  }
}
