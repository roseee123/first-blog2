import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { UtilsService } from './services/utils.service';
import { Article } from './article';
// import { ARTICLES } from './mock-articles';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articleUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
   })
  };
  articles: Article[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private utils: UtilsService
  ) { }

  getArticles(): Observable<Article[]> {
    // this.messageService.add(`articleService: fetch articles`);
    // return of(ARTICLES);
    return this.http.get<Article[]>(this.articleUrl)
    .pipe(
      tap(_ => this.log('fetched articles')),
      catchError(this.handleError<Article[]>('getArticles', []))
    );
  }

  getArticle(id: number): Observable<Article> {
    // this.messageService.add(`ArticleService: fetched article id=${id}`);
    // return of(ARTICLES.find(article => article.id === id));
    const url = `${this.articleUrl}/${id}`;
    return this.http.get<Article>(url)
    .pipe(
      tap(_ => this.log('fetched article id= ${id}')),
      catchError(this.handleError<Article>('getArticle id= ${id}'))
    );
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    // const id = typeof article === 'number' ? article : article.id;
    // const id = +article.id;
    const url = `${this.articleUrl}/${id}`;
    console.log(article);
    return this.http.put<Article>(url, article, this.httpOptions)
    .pipe(
      tap(_ => this.log('updated article id= ${id}')),
      catchError(this.handleError<Article>('updateArticle'))
    );
  }

  addArticle(article: Article): Observable<Article> {
    const id =  +article.id;
    console.log(id);
    return this.http.post<Article>(this.articleUrl, article, this.httpOptions)
    .pipe(
      tap(_ => this.log('add article id= ${id}')),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  deleteArticle(article: Article | number): Observable<Article> {
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.articleUrl}/${id}`;
    return this.http.delete<Article>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log('delete article id=${id}')),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }

  private log(message: string) {
    this.messageService.add(`ArticleService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }
}
