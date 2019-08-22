import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Article } from '../article';
import { ArticleService } from '../article.service';
@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  @Input() article: Article;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getArticle();
  }

  getArticle(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticle(id)
    .subscribe( article => this.article = article);
    // console.log(this.article);
    // this.articleService.getArticle(id)
    // .subscribe((response: any) => {
    //   this.article = response;
    //   console.log(this.article);
    // });
  }

  goBack(): void {
    this.location.back();
  }

  // save(): void {
  //   this.articleService.updateArticle(this.article)
  //   .subscribe(() => this.goBack);
  // }
  save(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.articleService.updateArticle(id, this.article)
    .subscribe();
  }
  // save(title: string, contents: string): void {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   const paper1 = new Article();
  //   paper1.id = id;
  //   paper1.title = title;
  //   paper1.contents = contents;
  //   if (!id || !title || !contents) { return; }
  //   this.articleService.updateArticle(id, paper1)
  //   .subscribe((response: any) => {
  //     this.article = response;
  //     console.log(this.article);
  //   });
  // }

}
