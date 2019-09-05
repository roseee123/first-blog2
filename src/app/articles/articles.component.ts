import { Component, OnInit } from '@angular/core';

import { Article } from '../article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[];
  count = 10;
  p = 1;
  totalDate: number;
  maxSize = 10;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getArticles()
    .subscribe(articles => {
      this.articles = articles;
    this.totalDate = this.articles.length;
  console.log(this.totalDate);});
  }

  // add(id: number, title: string, contents: string): void {
  //   const paper1 = new Article();
  //   paper1.id = id;
  //   paper1.title = title.trim();
  //   paper1.contents = contents.trim();
  //   if (!id || !title || !contents) { return; }
  //   this.articleService.addArticle(paper1).subscribe(
  //     article => this.articles.push(article));
  // }
  add(title: string, contents: string): void {
    const paper1 = new Article();
    paper1.title = title.trim();
    paper1.contents = contents.trim();
    if (!title || !contents) { return; }
    this.articleService.addArticle(paper1).subscribe(
      article => this.articles.push(article));
  }

  delete(article: Article): void {
    this.articles = this.articles.filter(h => h !== article);
    this.articleService.deleteArticle(article).subscribe();
    console.log(article.id);
  }

}
