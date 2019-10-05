import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

import { Article } from '../article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})
export class DashboardComponent implements OnInit {
  sliceArticles: Article[];
  articles: Article[];
  sortArticles: Article[];
  peopleCount: number;
  itemsPerSlide = 3;
  singleSlideOffset = true;
  hideIndicator = false;

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
        const randomNum = Math.floor(Math.random() * articles.length) - 5;
        this.articles = articles;
        this.sliceArticles = articles.slice(randomNum, randomNum + 5);
      });
  }

  getArticlesSort(): void {
    this.articleService.getArticlesTotal()
      .subscribe(sortArticles => {
        const randomNum = Math.floor(Math.random() * sortArticles.length) - 5;
        this.sortArticles = sortArticles.sort((a, b) => {
          const dateA = +new Date(a.createAt);
          const dateB = +new Date(b.createAt);
          return dateA - dateB;
        }).slice(randomNum, randomNum + 4);
      });
  }

  randomCount(): void {
    this.peopleCount = Math.floor(Math.random() * 1000);
  }
}
