// Creating Object containing information about myself
const obj={};

obj['name']='Ishwar Gautam';
obj['address']='Butwal';
obj['emails']='ishwargautam1@gmail.com';
obj['interests']='Programming';
obj['education']=[
    {
        'name':'Galaxy English Boarding',
        'enrolledDate': '2058'
    },
    {
        'name':'Sun-light English Bording',
        'enrolledDate':'2061'
    },
    {
        'name':'Prabhat English Boarding',
        'enrolledDate':'2068'
    },
    {
        'name':'Manimukunda College',
        'enrolledDate':'2070'
    },
    {
        'name':'Butwal Multiple Campus',
        'enrolledDate':'2072'
    }
]

//Iterate over the 'education' key
for (let i = 0; i < obj['education'].length; i++) { 
    console.log('Name: '+obj['education'][i].name+", Date: "+obj['education'][i].enrolledDate);
  }

