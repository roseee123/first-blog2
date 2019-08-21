import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Article } from './article';
import { ARTICLES } from './mock-articles';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private messageService: MessageService
  ) { }

  getArticles(): Observable<Article[]> {
    this.messageService.add(`articleService: fetch articles`);
    return of(ARTICLES);
  }

  getArticle(id: number): Observable<Article> {
    this.messageService.add(`ArticleService: fetched article id=${id}`);
    return of(ARTICLES.find(article => article.id === id));
  }
}
