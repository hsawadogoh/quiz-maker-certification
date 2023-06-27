import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlFormatter'
})
export class HtmlFormatterPipe implements PipeTransform {

  transform(data: string | null | undefined): unknown {
    if (data === null || data === undefined) {
      return '';
    }
    return new DOMParser().parseFromString(data, "text/html").documentElement.textContent;;
  }

}
