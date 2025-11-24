//grade

function grade(marks){
    if(marks>=80 && marks<=100){
        console.log("Grade A")
    }else if(marks>=60 && marks<=79){
        console.log("GRADE B")
    }else if(marks>=40 && marks<=59){
        console.log("GRADE C")
    }else{
        console.log("GRADE F")
    }
}
grade(20)
grade(40)
grade(60)
grade(100)

// adult or minor

function ageOld(age){
    age =age>=18 ? "Adult":"Minor"
    console.log(age)
}
ageOld(18)
ageOld(17)