import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Application} from '../model/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private url = environment.apiUrl + '/applications';
  constructor(private httpClient: HttpClient) { }
  public getAll(): Observable<Application[]> {
    return this.httpClient.get<Application[]>(this.url);
  }
}
