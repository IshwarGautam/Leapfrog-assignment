var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
};

NewArr = [];
NewID = [];
function Normalization(obj){
  for(let key in obj){
    if (typeof obj[key] == 'object'){
      if (obj[key]['children']){
        temp_id = []
        for(let i=0; i<obj[key]['children'].length;i++){
          temp_id.push(obj[key]['children'][i]['id']);
        }
        NewID.push(temp_id);
      }
      Normalization(obj[key]);
    }
    else if (key == 'id'){
      NewArr.push(obj);
    }
  }
  return NewArr;
}

arr = Normalization(input);

Output = {}
for (let i=1; i<=arr.length; i++){
  Output[i]=arr[i-1];
}

index = 0;
for (let key in Output) {
  if (Output[key]['children']){
    Output[key]['children'] = NewID[index];
    index++;
  }
}

console.log(Output);

