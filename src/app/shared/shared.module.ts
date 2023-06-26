import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnswerBtnColorDirective } from './directives/answer-btn-color.directive';
import { ScoredBgColorDirective } from './directives/scored-bg-color.directive';

@NgModule({
  declarations: [AnswerBtnColorDirective, ScoredBgColorDirective],
  imports: [CommonModule],
  exports: [AnswerBtnColorDirective, ScoredBgColorDirective],
})
export class SharedModule {}
