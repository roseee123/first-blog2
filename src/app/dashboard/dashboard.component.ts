import { Component, OnInit } from '@angular/core';

import { Article } from '../article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles: Article[];
  peopleCount: number;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getArticles();
    this.randomCount();
  }

  getArticles(): void {
    this.articleService.getArticles()
    .subscribe(articles => this.articles = articles.slice(0, 4));
  }

  randomCount(): void {
    this.peopleCount = Math.floor(Math.random() * 1000);
  }
}
