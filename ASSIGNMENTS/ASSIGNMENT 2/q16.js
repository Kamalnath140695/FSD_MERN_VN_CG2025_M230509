function placeOrder(callback){
    console.log(`Order Placed`)
    callback()
}

function cookFood(callback){
    console.log(`Food cooking`)
    callback()
}
function deliverFood(){
    setTimeout(() => console.log(`Food Delivered`),4000);
}

// Call the functions to see the callback chain
placeOrder(() => {
    cookFood(() => {
        deliverFood();
    });
});