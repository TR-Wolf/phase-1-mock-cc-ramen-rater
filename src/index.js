// write your code here

//Deliverable 1.
//See all ramen images in the div with the id of ramen-menu.
//get ramen-menu-div
const ramenMenuDiv = document.getElementById("ramen-menu")
const url = "http://localhost:3000/ramens"
//When the page loads, request the data from the server to get all the ramen objects.
//fetch to the server to GET ALL ramen objects 
fetch(url)
.then(response => response.json())
.then(ramens => {
    //we now have an array of ramen objects.
    // console.log(ramens)
    // for each of the ramens:
    // for(let index in ramens){
    //     console.log(ramens[index])
    // }
    // ramens.forEach((ramen) => {renderRamen(ramen)})

    fillRamenDetail(ramens[0])
    ramens.forEach(renderRamen)
    
})


//for each of the ramen
//Create img tags and put them in ramen menu 
function renderRamen(ramen) {
    //using an img tag
    //create an image tag
    const ramenImg = document.createElement("img")
    
    //Then, display the image 
    //set the image to be a ramen image
    ramenImg.src = ramen.image
    ramenImg.alt = ramen.name
    
    // Click on an image from the #ramen-menu div
    // add an eventListener to the image, for a click.
    ramenImg.addEventListener("click", (evt) => {
        //what do we want to happen when we click on these....
        fillRamenDetail(ramen)
    
    })


    //inside the #ramen-menu div.
    //append it to the ramen menu div
    ramenMenuDiv.append(ramenImg)
}


// Deliverable 2.


// See all the info about that ramen displayed inside the #ramen-detail div 
function fillRamenDetail(ramen){
    // Grab the ramen detail div
    const ramenDetailDiv = document.getElementById("ramen-detail")
    
    // grab the img, h2 and h3 tags that belong to ramen detail div.
    
    // 1 way: grab the elements by their class - from the detail div
    const detailImg = ramenDetailDiv.getElementsByClassName("detail-image")[0]
    //                or... = ramenDetailDiv.querySelector(".detail-image")
    
    // 2nd way: in our html, add id's to those tags, and grab them by those id's
    // const detailImg = document.getElementById("ramen-detail-img")
    
    // 3rd way : access the div's children
    // const detailImg = ramenDetailDiv.children[0]
    detailImg.src = ramen.image
    detailImg.alt = ramen.name
    
    const detailNameTag = ramenDetailDiv.children[1]
    detailNameTag.innerText = ramen.name
    
    const detailRestTag = ramenDetailDiv.children[2]
    detailRestTag.innerText = ramen.restaurant
    
    // also fill in where it says insert comment here and insert rating here.
    const detailRating = document.getElementById("rating-display")
    detailRating.innerText = ramen.rating

    const detailComment = document.getElementById("comment-display")
    detailComment.innerText = ramen.comment
}

// Deliverable 3.
// Create a new ramen after submitting the new-ramen form.

// 1. get the form
const newRamenForm = document.getElementById("new-ramen")

// 2. add event listener for form submission
newRamenForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    // 3. create new ramen object
    // access the forms children by their names
    const newRamen = {
        "name": e.target.name.value,
        "restaurant":e.target.restaurant.value,
        "image":e.target.image.value,
        "rating": parseInt(e.target.rating.value),
        "comment":e.target['new-comment'].value
    }
    // The new ramen should be added to the#ramen-menu div.
    // IF we wanted it to persist
    // POST it to the server
    // then pessimistically do the render
    renderRamen(newRamen)


})

// The new ramen does not need to persist; 
// in other words, if you refresh the page, 
// it's okay that the new ramen is no longer on the page.
// ^^^ we don't need to do another fetch call!






