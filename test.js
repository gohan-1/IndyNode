let arr= [];

let obj ={};

obj2={
	"name1":[1,2,3,4],
	"values2":["a","b","c","d"]
};
console.log( obj2.name1.length)
for(let i=0;i<obj2.name1.length;i++){
    console.log(obj2.name1[i])
    
   

    arr.push({
        name : obj2.name1[i],
        value : obj2.values2[i]
    })
}




console.log(arr)