var arr = [
    {
    id: 1,
    name: 'John',
   }, 
   {
    id: 2,
    name: 'Mary',
   }, 
   {
    id: 3,
    name: 'Andrew',
   }
];

var arr2=arr;
function sortBy(array, key) {
    do{
        var swapped= false;
        for (let i=0;i<array.length-1;i++){
            if (array[i][key]>array[i+1][key]){
                let temp = array[i];
                array[i]= array[i+1];
                array[i+1]= temp;
                swapped= true;
            }
        }
    }while(swapped);
    
    return array;
}

var sorted = sortBy(arr2, 'id');
console.log(sorted);
