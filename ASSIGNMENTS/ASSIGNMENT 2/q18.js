function startExam(callback){
    console.log(`Exam Started`)
    callback()
}
function evaluateExam(callback){
    console.log(`Evaluating answers`)
    callback()
}
function declareResult(){
    console.log(`Result Declared`)

}

startExam(()=>{
    evaluateExam(()=>{
        declareResult();
    })
})
