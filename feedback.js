// Store reviews in localStorage
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Function to filter and display high-rated reviews (3 stars and above)
function filterAndDisplayReviews() {
    displayedReviews = allReviews.filter(review => parseInt(review.rating) >= 3);
    displayReviews();
}

// Function to fetch reviews from backend
async function fetchReviews() {
    try {
        const response = await fetch('http://localhost:5000/api/reviews');
        const data = await response.json();
        reviews = data;
        displayReviews();
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
}

// Function to add new review
async function addReview(name, rating, text) {
    try {
        const response = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                rating,
                text
            })
        });
        
        if (response.ok) {
            await fetchReviews(); // Refresh reviews after adding new one
        }
    } catch (error) {
        console.error('Error adding review:', error);
    }
}

// Handle form submission
document.getElementById('feedbackForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('reviewerName').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const text = document.getElementById('reviewText').value;

    await addReview(name, rating, text);
    this.reset();
});

// Display reviews on page load
document.addEventListener('DOMContentLoaded', fetchReviews);