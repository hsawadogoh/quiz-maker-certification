import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnswerBtnColorDirective } from './directives/answer-btn-color.directive';
import { ScoredBgColorDirective } from './directives/scored-bg-color.directive';
import { HtmlFormatterPipe } from './pipes/html-formatter.pipe';

@NgModule({
  declarations: [AnswerBtnColorDirective, ScoredBgColorDirective, HtmlFormatterPipe],
  imports: [CommonModule],
    exports: [AnswerBtnColorDirective, ScoredBgColorDirective, HtmlFormatterPipe],
})
export class SharedModule {}
