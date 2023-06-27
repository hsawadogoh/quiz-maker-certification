import {AfterViewInit, Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appAnswerBtnColor]'
})
export class AnswerBtnColorDirective implements  AfterViewInit {

  constructor() { }

  @HostBinding('class') btnClass: string = 'mx-2 mt-1 btn ';

  @Input()
  public answer!: string;

  @Input()
  public correct_answer!: string;

  @Input()
  public user_answer!: string;

  ngAfterViewInit(): void {
    if (this.answer === this.user_answer) {
      if (this.correct_answer === this.user_answer) {
        this.btnClass = this.btnClass + 'btn-success';
      } else {
        this.btnClass = this.btnClass + 'btn-danger';
      }

    } else if (this.answer === this.correct_answer) {
      this.btnClass = this.btnClass + 'btn-success';
    } else {
      this.btnClass = this.btnClass + 'btn-outline-success';
    }
  }
}
