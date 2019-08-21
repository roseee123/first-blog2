import { Component, OnInit } from '@angular/core';

import { Article } from '../article';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  article: Article = {
    id: 1,
    title: 'title1',
    contents: 'contents1'
  };

  constructor() { }

  ngOnInit() {
  }

}
