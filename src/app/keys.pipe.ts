import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
 
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}

@Pipe({
  name: 'SearchConvo'
})
export class SearchConvoPipe implements PipeTransform {
 
  transform(value:object[], search:string[]) : any {
        return (search!="")?value.filter(convo=>convo.display_name.trim().toUpperCase().indexOf(search.toUpperCase())!=-1):value;
  }
}



@Pipe({
  name: 'filerUsers'
})
export class filerUsersPipe implements PipeTransform {
 
  transform(members, from:string[]) : string {
    // console.log(from);
    // console.log((from!="")?members.filter(m=>m.value.trim().toUpperCase()==from.trim().toUpperCase())[0].UserName:"");
  
    return (from!="")?members.filter(m=>m.value.trim().toUpperCase()==from.trim().toUpperCase())[0].UserName:"";
  }
}


@Pipe({
  name: 'filerMembers'
})
export class filerMembersPipe implements PipeTransform {
 
  transform(members: Array<object>,SelectedConvoMembers):Array<object> {
     console.log('Piped')
    // console.log(members.filter(x=> !SelectedConvoMembers.filter(y=>y.value==x.key).length));
      return members.filter(x=> !SelectedConvoMembers.filter(y=>y.value==x.key).length);
  }
}