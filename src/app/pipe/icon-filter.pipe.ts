import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconFilter',
  pure:false
})
export class IconFilterPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    if(!value || !args){
      return value
    }
    return value.filter( val => val.name.indexOf(args.name) !== -1);
  }

}
