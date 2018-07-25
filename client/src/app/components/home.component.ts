import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: '../views/home.html',
  providers: []
})

export class HomeComponent implements OnInit {
  public title: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Welcome';
  }

  ngOnInit() {

  }
}
