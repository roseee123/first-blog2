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
  sortArticles: Article[];
  randomNum: number;
  peopleCount: number;
  itemsPerSlide = 3;
  singleSlideOffset = true;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getArticles();
    this.getArticlesSort();
    this.randomCount();
  }

  getArticles(): void {
    this.articleService.getArticlesTotal()
    .subscribe(articles => {
      this.articles = articles;
      // this.sortArticles = articles.sort((a, b) => {
      //   const dateA = +new Date(a.createAt);
      //   const dateB = +new Date(b.createAt);
      //   return dateA - dateB; });
      this.randomNum = Math.floor(Math.random() * articles.length) - 5;
    });
  }
  getArticlesSort(): void {
    this.articleService.getArticlesTotal()
    .subscribe(sortArticles => {
      this.sortArticles = sortArticles.sort((a, b) => {
        const dateA = +new Date(a.createAt);
        const dateB = +new Date(b.createAt);
        return dateA - dateB; });
    });
  }

  randomCount(): void {
    this.peopleCount = Math.floor(Math.random() * 1000);
  }
}
