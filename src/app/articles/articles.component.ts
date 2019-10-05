import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[];
  count = 10;
  p: number;
  totalData: number;
  maxSize = 10;

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getArticles();
    // this.getArticleCount();
  }

  // getArticleCount(): void {
  //   this.articleService.getArticleCount()
  //   .subscribe(Response => {
  //     console.log(Response[0].total);
  //     this.totalData = Response[0].total;
  //   });
  // }

  getArticles(): void {
    this.articleService.getArticles()
    .subscribe(articles => {
      this.articles = articles;
    });
  }

  delete(article: Article): void {
    this.articles = this.articles.filter(h => h !== article);
    this.articleService.deleteArticle(article).subscribe();
    console.log(article.id);
    this.router.navigate(['/articles']);
  }

}
