var numbers = [1, 2, 3, 4];

var arr=[];
function transform(collection, tranFunc){
    for (var i=0; i<collection.length; i++){
        arr.push(tranFunc(collection[i]))
    }
    return arr;
}


var output = transform(numbers, function(num) {
    return num * 2;
});

console.log(output);
