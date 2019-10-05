import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Article } from '../article';
import { ArticleService } from '../services/article.service';
import { UserService } from '../services/user.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: Article;
  login$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.login$ = this.userService.getLoginStatus();
    this.getArticle();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(id)
      // .subscribe( article => this.article = article);
      .subscribe((response: any) => {
        this.article = response;
        if (environment.production) {
          console.log(this.article);
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(title: string, contents: string): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const paper1 = new Article();
    paper1.id = id;
    paper1.title = title;
    paper1.contents = contents;
    if (environment.production) {
      console.log('title: ' + paper1.title);
      console.log('contents: ' + paper1.contents);
    }
    if (!id || !title || !contents) { return; }
    this.articleService.updateArticle(id, paper1)
      .subscribe(
        () => this.router.navigate(['/articles'])
      );
  }

}
