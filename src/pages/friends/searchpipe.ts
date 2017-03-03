import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})

export class SearchPipe implements PipeTransform {

  transform(value, queryString) {
    if (value == null) {
      return null;
    }
    if (value == "") {
      return null;
    }

    if (queryString !== null) {
      return value.filter(item => item.username.toLowerCase().indexOf(queryString.toLowerCase()) > -1);
    } else {
      return value;
    }
  }
}
