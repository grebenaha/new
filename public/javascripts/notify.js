$('#pagination-here').bootpag({
    total: 7,          // total pages
    page: 1,            // default page
    maxVisible: 2,     // visible pagination
    leaps: true         // next/prev leaps through maxVisible
}).on("page", function(event, num){
    $("#content").html("Page " + num); // or some ajax content loading...
    // ... after content load -> change total to 10
    $(this).bootpag({total: 10, maxVisible: 10});
});
