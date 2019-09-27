import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  articles: Article[];

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  add(title: string, contents: string): void {
    const paper1 = new Article();
    paper1.title = title.trim();
    paper1.contents = contents.trim();
    if (!title || !contents) { return; }
    this.articleService.addArticle(paper1).subscribe(
      article => this.articles.push(article));
    this.router.navigate(['/articles']);
  }

}
