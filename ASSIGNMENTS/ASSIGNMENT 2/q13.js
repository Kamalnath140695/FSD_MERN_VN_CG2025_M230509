function sales(DaysNumber){
    let amount = [2500,4000,1800,3200,5000]
        for(let i=0;i<DaysNumber;i++){
                console.log(`Days${i+1}:₹${amount[i]}`)
        }
}
sales(4)