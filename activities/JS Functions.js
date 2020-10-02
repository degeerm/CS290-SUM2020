//ACTIVITY 1
console.log(isPrime(12));

function isPrime(x){
  var flag = true;
	if(x === null){
		flag = false
	}
	else{
		for(i = 2; i <= x - 1; i++)
			if (x % i == 0) {
				flag = false;
				break;
		}
	}
	return flag;
};

 

//ACTIVITY 2

var z = addTwoNumbers(3,4);
console.log(z);
var addTwoNumbers = function(x,y){
  return(x+y);
}