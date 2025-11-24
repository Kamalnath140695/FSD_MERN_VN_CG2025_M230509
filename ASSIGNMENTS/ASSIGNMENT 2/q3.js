var name="kamalnath"
console.log(name)
function variables(names){
    console.log(`Hello, ${names}! Welcome to JavaScript.`);
    console.log(names.toUpperCase())
    
    length= names.length
    console.log(length)
    if(length > 10){
        console.log(names)
    }else{
        console.log("name is less than 10 characters please type the message more than 10 characters")
    }

}


variables("m kamalnath")

// message need to be more than 10 characters

function message(mes){
    length= mes.length
    if(length > 10){
    console.log(`the message as you typed as ${mes}`)
    }else{
        console.log("name is less than 10 characters please type the message more than 10 characters")
    }

}
message("i hate you")
message("i like you, i appreciate you")

//check if the word contains javascript

function checkwords(words){

    if (words === "JAVASCRIPT"){
        console.log(`The word contains JAVASCRIPT as same as given word ${words}`)
    }
    else{
        console.log(`The word does not contain the JAVASCRIPT, The given word is ${words}`)
    }
}
checkwords("JAVASCRIPT")
checkwords("JAVAScript")
checkwords("PYTHON")