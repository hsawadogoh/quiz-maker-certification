import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { QuizQuestion } from './models/quiz-question.model';
import { QuizRequest } from './models/quiz-request.model';
import { TriviaCategories } from './models/trivia-categories.model';
import {CacheService} from "./cache.service";


@Injectable({
  providedIn: 'root',
})
export class QuizService {

  // The URL of trivia API
  private BASE_URL: string = 'https://opentdb.com';

  // The number of question to generate
  private AMOUNT: number = 5;

  // The type of quiz to generate
  private TYPE: string = 'multiple';

  // Array of answers of user
  private userQuizAnswers: QuizQuestion[] = [];

  // The score of user
  private score: number = 0;

  // The key to cache answers of user in localStorage
  private CACHED_USER_QUIZ_ANSWERS_KEY: string = 'CACHED_USER_QUIZ_ANSWERS';

  // The key to cache score of user in localStorage
  private CACHED_SCORE_KEY: string = 'CACHED_SCORE';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  /**
   * Request to get categories of quiz question
   * @return: an Observable of TriviaCategories
   */
  getCategories(): Observable<TriviaCategories> {
    return this.http.get<TriviaCategories>(`${this.BASE_URL}/api_category.php`);
  }

  /**
   * Request to generate questions for the quiz
   * @param categoryId is the id of category of quiz
   * @param difficulty is the difficulty of quiz
   * @return an Observable of QuizRequest
   */
  onCreateQuizQuestion(categoryId: number, difficulty: string): Observable<QuizRequest> {
    return this.http.get<QuizRequest>(`${this.BASE_URL}/api.php?amount=${this.AMOUNT}&category=${categoryId}&difficulty=${difficulty}&type=${this.TYPE}`
    );
  }

  /**
   * Request to format QuizRequest to QuizQuestion array
   * @param quizRequest is the object to format
   * @return an Array of QuizQuestion
   */
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

  /**
   * Request to shuffle the answers in random order
   * @param answers is the answers to shuffle
   * @return the shuffled answers
   */
  private shuffleAnswers(answers: string[]): string[] {
    return answers.sort(() => Math.random() - 0.5);
  }

  /**
   * Request to set the answer of user in array
   * @param userAnswer is the answer of user
   * @return the number of question that user answered
   */
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

  /**
   * Request to save the user's answers in localStorage
   */
  onSaveUserQuizAnswers(): void {
    this.cacheService.saveData(this.CACHED_USER_QUIZ_ANSWERS_KEY, JSON.stringify(this.userQuizAnswers));
    this.cacheService.saveData(this.CACHED_SCORE_KEY, this.score.toString());
  }

  /**
   * Request to get the user's answers from localStorage
   * @return an Array that contains the answers of user
   */
  getUserAnswers(): QuizQuestion[] {
    return JSON.parse(this.cacheService.getData(this.CACHED_USER_QUIZ_ANSWERS_KEY));
  }

  /**
   * Request to get the score of user from localStorage
   * @return the score of user
   */
  getScore(): number {
    return Number(this.cacheService.getData(this.CACHED_SCORE_KEY));
  }
}
