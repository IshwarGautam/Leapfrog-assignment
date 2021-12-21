var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]

function SearchByName(object, name){
    //no matter if the input is lower or uppercase at any index
    name = name.toLowerCase(); 
    name = name[0].toUpperCase() + name.slice(1);

    for(var i=0; i<object.length;i++){
        if(object[i].name==name){
            return object[i];
        }
    }
}

console.log("----Search By Name----");
console.log(SearchByName(fruits, 'BaNaNa' ));
console.log("\n");


function SearchByKey(object, key, value){
    //no matter if the input is lower or uppercase at any index
    if (typeof key=='string'){
        key = key.toLowerCase(); 
    }

    if (typeof value=='string'){
        value = value.toLowerCase(); 
        value = value[0].toUpperCase() + value.slice(1);
    }

    for(var i=0; i<object.length;i++){
        if (Object.keys(object[i]).includes(key)){
            if (object[i][key]==value){
                return object[i];
            }
        }
    } 
}
console.log("----Search By Key----");
console.log(SearchByKey(fruits, 'id', 2));

   