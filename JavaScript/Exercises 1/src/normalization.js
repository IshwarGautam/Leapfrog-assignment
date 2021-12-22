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

NewArr = []

//Incomplete 
function Normalization(obj){
  for(let key in obj){
    if (typeof obj[key] == 'object'){
      Normalization(obj[key]);
    }
    else{
      NewArr.push(obj);
    }
  }
  return NewArr;
}

// for (let key in input){
//   if (typeof input[key]=='object'){
//     console.log("Object");
//   }
//   else{
//     console.log("No");
//   }
// }



console.log(Normalization(input));
