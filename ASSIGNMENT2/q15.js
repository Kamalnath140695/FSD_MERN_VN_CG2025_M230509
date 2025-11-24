function calculate(){
    let monthlyExpenses=[2000,1500,3500,4000]
    var TotalAmountSpent=0;
    for(let i=0;i<monthlyExpenses.length;i++){
  let PassTheAmount=  monthlyExpenses[i]
   TotalAmountSpent=TotalAmountSpent+PassTheAmount;
}
console.log(TotalAmountSpent)
}

calculate()