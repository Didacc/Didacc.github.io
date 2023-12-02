document.addEventListener("DOMContentLoaded", function() {
    // Make an AJAX request to the server to update the visitor count
    fetch('update_visitorCounter.php')
        .then(response => response.json())
        .then(data => {
            // Update the visitor count on the page
            document.getElementById('visitorCount').innerText = data.count;
        })
        .catch(error => console.error('Error updating visitor count:', error));
});
