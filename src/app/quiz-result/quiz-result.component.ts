import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizQuestion } from '../shared/models/quiz-question.model';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
})
export class QuizResultComponent implements OnInit {
  userAnswers: QuizQuestion[] = [];
  score: number = 0;
  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.userAnswers = this.quizService.getUserAnswers();
    this.score = this.quizService.getScore();
  }
}
