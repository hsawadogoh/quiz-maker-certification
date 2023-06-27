import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { QuizQuestion } from '../shared/models/quiz-question.model';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css'],
})
export class QuizFormComponent implements OnInit {
  categories$: Observable<Category[] | undefined> = new Observable<Category[]>();
  quizQuestions$: Observable<QuizQuestion[] | undefined> = new Observable<QuizQuestion[]>();
  numberOfAnswerQuiz = 0;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.quizService
      .getCategories()
      .pipe(map((response) => response.trivia_categories));
  }

  onCreateQuiz(categoryId: string, difficulty: string): void {
    if (categoryId !== 'null' && difficulty !== 'null') {
      this.quizQuestions$ = this.quizService
        .onCreateQuizQuestion(Number(categoryId), difficulty)
        .pipe(map((response) => this.quizService.formatQuiz(response)));
    }
  }

  getUserAnswer(currentUserAnswer: QuizQuestion): void {
    this.numberOfAnswerQuiz = this.quizService.setUserAnswer(currentUserAnswer);
  }

  onSubmitQuiz() {
    this.quizService.onSaveUserQuizAnswers();
    this.router.navigate(['/results']);
  }
}
