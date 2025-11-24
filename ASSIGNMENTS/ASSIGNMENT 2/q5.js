function num(){
    num=[1,3,5,7,9];
    sum=num[0]+num[1]+num[2]+num[3]+num[4]
    console.log(`the sum of the array of numbers is ${sum}`)
}
    function largestnumber(){
    const num=[12,3,5,7,9];
    let largenumber=num[0];
    for(let i=0; i<=4;i++){
        if(num[i]>largenumber){
        largenumber =num[i];
    }
    }
    console.log(`the largest number is ${largenumber}`)
}

num()
largestnumber()