function deepEqual(x,y){
  var flag = true;
  
  //Checks to make sure that both objects are not null
  if (x && y){
      //object case
      if (typeof x == 'object' && typeof y == 'object'){
          for (var prop in x){
              //calls itself (this is used in case
              //one of the properties in the object is an
              //object, so that it can loop through the
              //properties of that inner object in the
              //same way it does the outer).
              if (!deepEqual(x[prop],y[prop])){
                  flag = false;
              }
          }
      }
  }
  
  //equalities for everything else
  else{
      flag = (x === y);
  }
  
  //catch all at the end, in case it didn't recognize that
  //the objects were not the same type.
  if (typeof x != typeof y){
    flag = false;
  }
  return flag;
};