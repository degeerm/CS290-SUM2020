// You are not permitted to change this in any way
function Student(name, major, yearInSchool, club) {
  this.name = name; // string, (e.g. "Jim", "Pam", "Michael")
  this.major = major; // string, (e.g. "Computer Science", "Art", "Business")
  this.yearInSchool = yearInSchool; // int, (e.g. 1, 2, 3, 4)
  this.club = club; // string, (e.g. "Improv", "Art")
}

var students = [
  new Student("Pam", "Art", 2, "Art"),
  new Student("Michael", "Business", 4, "Improv"),
  new Student("Dwight", "Horticulture", 1, "Karate"),
  new Student("Jim", "Sports Science", 2, "Guitar"),
  new Student("Angela", "Accounting", 4, "Cat"),
  new Student("Toby", "Human Resources", 3, "Photography")
];

/* This function sorts arrays using an arbitrary comparator. You pass it a comparator 
and an array of objects appropriate for that comparator and it will return a new array 
which is sorted with the largest object in index 0 and the smallest in the last index*/
/*Note: Bubble Sort Algorithm*/
function sortArr(comparator, array) {
  for (var i = 0; i < array.length; i++){
    for (var j = 0; j < array.length-1; j++){
      if (!comparator(array[j], array[j+1])){
        var temp = array[j];
        array[j] = array[j+1];
        array[j+1] = temp;
      }
    }
  }
}

/* A comparator takes two arguments and uses some algorithm to compare them. If the first 
argument is larger or greater than the 2nd it returns true, otherwise it returns false.
Here is an example that works on integers*/
function exComparator( int1, int2){
  if (int1 > int2){
    return true;
  } else {
      return false;
  }
}

/* For all comparators if students are 'tied' according to the comparison rules then the order of 
those 'tied' students is not specified and either can come first*/

/* This compares two students based on their year in school. Sort in descending order.*/
function yearComparator(student1, student2) {
  if (student1.yearInSchool >= student2.yearInSchool){
    return true;
  } else{
    return false;
  }
}

/* This compares two students based on their major. It should be case insensitive and 
makes which are alphabetically earlier in the alphabet are "greater" than ones that 
come later (from A-Z).*/
function majorComparator(student1, student2) {
  if (student1.major.toLowerCase() <= student2.major.toLowerCase()){
    return true;
  }else{
    return false;
  }
}

/* This compares two students based on the club they're in. The ordering from "greatest" 
to "least" is as follows: improv, cat, art, guitar, (types not otherwise listed). 
It should be case insensitive. If two clubs are of equal type then the student who
has the higher year in school should be "greater."*/
function clubComparator(student1, student2) {
  /*Base variables: Assumes types will not be in list above*/
  var comparison1 = 0;
  var comparison2 = 0;
  if (student1.club.toLowerCase() == "improv"){
    comparison1 = 4;
  }
  if (student2.club.toLowerCase() == "improv"){
    comparison2 = 4;
  }
  if (student1.club.toLowerCase() == "cat"){
    comparison1 = 3;
  }
  if (student2.club.toLowerCase() == "cat"){
    comparison2 = 3;
  }
  if (student1.club.toLowerCase() == "art"){
    comparison1 = 2;
  }
  if (student2.club.toLowerCase() == "art"){
    comparison2 = 2;
  }
  if (student1.club.toLowerCase() == "guitar"){
    comparison1 = 1;
  }
  if (student2.club.toLowerCase() == "guitar"){
    comparison2 = 1;
  }

  if (comparison1 > comparison2){
    return true;
  }else if (comparison2 > comparison1){
    return false;
  }else{
    return(yearComparator(student1, student2));
  }
}

/*This function is used to format printing out a single student. Takes in
a student argument, as well as an "include_club" boolean which determines
whether or not to also print out the student's club.*/
function logMe(student_arg, include_club){
  if (include_club){
    console.log(student_arg.name + " - " + student_arg.major + " - " +
    student_arg.yearInSchool + " - " + student_arg.club);
  }else{
    console.log(student_arg.name + " - " + student_arg.major + " - " +
    student_arg.yearInSchool);
  }
}

/*Printing everything out*/
console.log("\n**********\nThe students sorted by year in school are:");
sortArr(yearComparator, students);
for (var i = 0; i < students.length; i++){
  logMe(students[i], false);
}

console.log("\n**********\nThe students sorted by major are:");
sortArr(majorComparator, students);
for (var i = 0; i < students.length; i++){
  logMe(students[i], false);
}

console.log("\n**********\nThe students sorted by club affiliation are:");
sortArr(clubComparator, students);
for (var i = 0; i < students.length; i++){
  logMe(students[i], true);
}

console.log("\n**********");

