totalSeats=120;
bookedSeats=120;
function theatreBooking(booknow){
    
    let AvailableSeats = totalSeats-bookedSeats
    console.log(AvailableSeats)
    if(AvailableSeats>0 && AvailableSeats<20){
        console.log("Almost Full")
    }else if(AvailableSeats>=20 && AvailableSeats<60){
        console.log("Plenty of seats Available")
    } else if(AvailableSeats>60){
        console.log(`the exact seat left is ${AvailableSeats} and please immediately book now`)
    }else{
        console.log("No seats for this show. please try again for another show with another timings")
    }
}

theatreBooking(0); 