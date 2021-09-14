import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brewery } from './brewery.model';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BreweryService {
  constructor(private http: HttpClient) {}

  getBreweries(page: number): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(
      `https://api.openbrewerydb.org/breweries?page=${page}&per_page=10`
    ).pipe(
      map((items: Brewery[]) => {
        let res = items.map(item => ({...item, isRead: false}));
        return res;
      })
    );
  }
}
