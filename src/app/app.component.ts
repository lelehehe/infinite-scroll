import { Component, OnInit } from '@angular/core';
import { Brewery } from './brewery.model';
import { BreweryService } from './brewery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  throttle = 0;
  distance = 2;
  page = 1;
  breweries: Brewery[]= [];

  constructor(private breweryService: BreweryService) {}

  ngOnInit(): void {
    this.breweryService
      .getBreweries(this.page)
      .subscribe((breweries: Brewery[]) => {
        this.breweries = breweries;
      });
  }

  onScroll(): void {
    this.breweryService
      .getBreweries(++this.page)
      .subscribe((breweries: Brewery[]) => {
        this.breweries.push(...breweries);
      });
  }

  markRead() {
    this.breweries = this.breweries.map((item) => ({...item, isRead: true}));
    console.log(this.breweries);
  }
}
