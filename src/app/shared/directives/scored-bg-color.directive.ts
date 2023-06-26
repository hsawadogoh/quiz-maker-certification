import {AfterViewInit, Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appScoredBgColor]'
})
export class ScoredBgColorDirective implements  AfterViewInit  {

  constructor() { }

  @HostBinding('style.background-color') scoreBgColor!: string;

  @Input()
  public scored!: number;

  ngAfterViewInit(): void {
    if (this.scored <= 1) {
      this.scoreBgColor = "red";
    } else if (this.scored <=3) {
      this.scoreBgColor = "yellow";
    } else {
      this.scoreBgColor = "green";
    }
  }

}
