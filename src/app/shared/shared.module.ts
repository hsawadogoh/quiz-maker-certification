import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChoiceAnswerColorDirective } from './choice-answer-color.directive';
import { AnswerBtnColorDirective } from './answer-btn-color.directive';
import { ScoredBgColorDirective } from './scored-bg-color.directive';

@NgModule({
  declarations: [ChoiceAnswerColorDirective, AnswerBtnColorDirective, ScoredBgColorDirective],
  imports: [CommonModule],
  exports: [ChoiceAnswerColorDirective, AnswerBtnColorDirective, ScoredBgColorDirective],
})
export class SharedModule {}
