
// $('.navbar-nav .nav-link').click(function(){
//     $('.navbar-nav .nav-link').removeClass('active');
//     $(this).addClass('active');
// })

// $(' li').click(function(){
//     alert('Done')
// })

// Get the container element
var test = document.getElemetby
var btnContainer = document.getElementById("ulContent");
console.log(btnContainer)
// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByTagName("li");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}