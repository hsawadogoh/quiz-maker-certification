import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { QuizQuestion } from './models/quiz-question.model';
import { QuizRequest } from './models/quiz-request.model';
import { TriviaCategories } from './models/trivia-categories.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private BASE_URL: string = 'https://opentdb.com';
  private AMOUNT: number = 5;
  private TYPE: string = 'multiple';
  private userQuizAnswers: QuizQuestion[] = [];
  private score: number = 0;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<TriviaCategories> {
    return this.http.get<TriviaCategories>(`${this.BASE_URL}/api_category.php`);
  }

  onCreateQuizQuestion(categoryId: number, difficulty: string): Observable<QuizRequest> {
    return this.http.get<QuizRequest>(`${this.BASE_URL}/api.php?amount=${this.AMOUNT}&category=${categoryId}&difficulty=${difficulty}&type=${this.TYPE}`
    );
  }

  formatQuiz(quizRequest: QuizRequest): QuizQuestion[] {
    let quizQuestions: QuizQuestion[] = [];

    if (quizRequest.response_code === 0 && quizRequest.results !== undefined) {
      quizQuestions = quizRequest.results.map((quiz) => {
        let quizQuestion: QuizQuestion = new QuizQuestion();
        quizQuestion.category = quiz.category;
        quizQuestion.question = quiz.question;
        quizQuestion.correct_answer = quiz.correct_answer;
        quizQuestion.answers = quiz.incorrect_answers;
        quizQuestion.answers?.push(quiz.correct_answer!);
        quizQuestion.answers = this.shuffleAnswers(quizQuestion.answers!);
        return quizQuestion;
      });
    }

    this.userQuizAnswers = quizQuestions;
    return quizQuestions;
  }

  private shuffleAnswers(answers: string[]): string[] {
    return answers.sort(() => Math.random() - 0.5);
  }

  setUserAnswer(userAnswer: QuizQuestion): number {
    let numberOfAnswerQuiz = 0;
    this.score = 0;
    this.userQuizAnswers = this.userQuizAnswers.map(
      answer => {
        if (answer.question === userAnswer.question) {
          return userAnswer;
        }
        return  answer;
      }
    );

    this.userQuizAnswers.map(
      answer => {
        if (answer.user_answer) {
          numberOfAnswerQuiz++;
        }
        if (answer.correct_answer === answer.user_answer) {
          this.score++;
        }
      }
    );

    return numberOfAnswerQuiz;
  }

  getUserAnswers(): QuizQuestion[] {
    return this.userQuizAnswers;
  }

  getScore(): number {
    return this.score;
  }
}
