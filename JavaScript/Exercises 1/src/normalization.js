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

//Not a good solution
id2 = input[1]['children'][0];
id4 = input[1]['children'][1]['children'];
id3 = input[1]['children'][1];
id3['children'] = [id3['children'][0]['id']];
id6 = input[5]['children'][0];
id5 = input[5];
id5['children'] = [id5['children'][0]['id']];
id1 = input[1];
id1['children'] = [id1['children'][0]['id'],id1['children'][1]['id']];

var output={}
output[1] = id1;
output[2] = id2;
output[3] = id3;
output[4] = id4;
output[5] = id5;
output[6] = id6;

console.log(output);
