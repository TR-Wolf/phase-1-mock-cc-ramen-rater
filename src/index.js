// write your code here

//Deliverable 1.
//See all ramen images in the div with the id of ramen-menu.
//get ramen-menu-div
const ramenMenuDiv = document.getElementById("ramen-menu")
const editRamenForm = document.getElementById("edit-ramen")
const url = "http://localhost:3000/ramens"

//Deliverable 5
// we need a variable to store who the featured ramen is
let featuredRamen = {}


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

    //Deliverable 4. - First advanced deliverable
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
        //if we wrote all the code for this here
        //we could mvoe out to a function,
        //then call it from our fetch above, to satisfy deliverable 4.
    
    })


    //inside the #ramen-menu div.
    //append it to the ramen menu div
    ramenMenuDiv.append(ramenImg)
}


// Deliverable 2.


// See all the info about that ramen displayed inside the #ramen-detail div 
function fillRamenDetail(ramen){
    //Deliverable 5.
    //update featured ramen, ever time we feature one!
    featuredRamen = ramen
    editRamenForm["rating"].value = featuredRamen.rating
    editRamenForm["new-comment"].value = featuredRamen.comment

    // Grab the ramen detail div
    const ramenDetailDiv = document.getElementById("ramen-detail")

    const detailImg = ramenDetailDiv.children[0]
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
        "name": newRamenForm.name.value,
        "restaurant":newRamenForm.restaurant.value,
        "image":newRamenForm.image.value,
        "rating": parseInt(newRamenForm.rating.value),
        "comment":newRamenForm['new-comment'].value
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

//deliverable 5.
//Update the rating and comment for a ramen by submitting a form
//No need to persist
//1. get the form (at top of file)

//2. add a submit listener
editRamenForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    //3. edit the ramen.
    //e.target OR editRamenForm
    //. nameOfInputField .
    //value
    const newRating = editRamenForm["rating"].value
    const newComment = editRamenForm["new-comment"].value

    // featuredRamen.rating = newRating
    // featuredRamen.comment = newComment

    //now we have a local version of the ramen we want to change
    //fetch to Patch the old ramen
    // let valuesToPatch = {
    //     rating:newRating,
    //     comment:newComment
    // }
    // if the comment is blank, remove it from valuesToPatch
    // valuesToPatch.remove

    fetch(url + "/" + featuredRamen.id, {
        method: 'PATCH',
        body: JSON.stringify({
                rating:newRating,
                comment:newComment
            }),
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then((response) => response.json())
    .then(fillRamenDetail);
    // ^^^ this is pessimistic rendering

    //This was optimistic! :
    // fillRamenDetail(featuredRamen)
})






