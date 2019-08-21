import { Component, OnInit } from '@angular/core';

import { Article } from '../article';
import { ARTICLES } from '../mock-articles';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  selectedArticle: Article;

  articles = ARTICLES;

  constructor() { }

  ngOnInit() {
  }

  onSelect(article: Article): void {
    this.selectedArticle = article;
  }

}
