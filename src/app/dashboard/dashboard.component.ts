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
    this.randomCount();
  }

  getArticles(): void {
    this.articleService.getArticlesTotal()
      .subscribe(articles => {
        const randomNum = Math.floor(Math.random() * (articles.length - 5));
        this.articles = articles;
        this.sliceArticles = articles.slice(randomNum, randomNum + 5);
        this.sortArticles = JSON.parse(JSON.stringify(this.sliceArticles));
        // this.sortArticles = this.sliceArticles.sort((a, b) => {
        this.sortArticles.sort((a, b) => {
          const dateA = +new Date(a.createAt);
          const dateB = +new Date(b.createAt);
          return dateA - dateB;
        });
        console.log(randomNum);
        console.log(typeof(this.articles));
        console.log(this.articles);
        console.log(this.sliceArticles);
        console.log(this.sortArticles);
      });
  }

  randomCount(): void {
    this.peopleCount = Math.floor(Math.random() * 1000);
  }
}
