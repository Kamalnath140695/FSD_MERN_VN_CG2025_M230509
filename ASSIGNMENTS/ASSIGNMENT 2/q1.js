//odd or even

function oddoreven(num){
    if(num%2==0){
        console.log("even");
    }else
        console.log("odd");
    }
oddoreven(5);
oddoreven(10);


// whether number is zero positive or negative

function checkNumber(number){
 if(number<0){
    console.log("The number is negative")
 }else if(number==0){
    console.log("The number is zero")
 }else{
    console.log("The number is positive")
 }
}
  checkNumber(5);
  checkNumber(-1);
  checkNumber(0);

  // number is divisible by 3 or 5

  function divisible(num3){
    if(num3%3==0 && num3%5==0){
        console.log("The number is divisible by 3 and 5");
  }else{
    console.log("The number is not divisible by 3 and 5");
  }
}
divisible(15);
divisible(5);

