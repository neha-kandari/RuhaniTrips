// Initialize reviews array from localStorage or empty array
let allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
let displayedReviews = [];

// Function to filter and display high-rated reviews (3 stars and above)
function filterAndDisplayReviews() {
    displayedReviews = allReviews.filter(review => parseInt(review.rating) >= 3);
    displayReviews();
}

// Function to add a new review
function addReview(e) {
    e.preventDefault();

    const name = document.getElementById('reviewerName').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const text = document.getElementById('reviewText').value;
    const date = new Date().toLocaleDateString();

    const review = {
        name,
        rating,
        text,
        date,
        id: Date.now()
    };

    // Add to main reviews array
    allReviews.unshift(review);
    localStorage.setItem('reviews', JSON.stringify(allReviews));
    
    // Update displayed reviews
    filterAndDisplayReviews();
    e.target.reset();

    // Reset star ratings
    document.querySelectorAll('.rating label').forEach(label => {
        label.style.color = '#ddd';
    });

    // Show success message
    const alert = document.createElement('div');
    alert.className = 'alert alert-success mt-3';
    alert.textContent = 'Thank you for your review!';
    e.target.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}

// Function to create review card with read more functionality
function createReviewCard(review) {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    const reviewElement = document.createElement('div');
    reviewElement.className = 'col-md-6 col-lg-4 new-review';
    
    const isLongText = review.text.length > 150;
    const shortText = isLongText ? review.text.substring(0, 150) + '...' : review.text;
    
    reviewElement.innerHTML = `
        <div class="card review-card shadow-sm" data-review-id="${review.id}">
            <div class="card-body">
                <div class="review-header">
                    <h5 class="card-title">${review.name}</h5>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-stars mb-2">${stars}</div>
                <div class="review-text-container">
                    <p class="review-text">${shortText}</p>
                    ${isLongText ? 
                        `<button class="read-more-btn">Read More</button>
                         <p class="review-text-full" style="display: none;">${review.text}</p>` 
                        : ''}
                </div>
            </div>
        </div>
    `;

    if (isLongText) {
        const readMoreBtn = reviewElement.querySelector('.read-more-btn');
        const card = reviewElement.querySelector('.review-card');
        const shortTextElement = reviewElement.querySelector('.review-text');
        const fullTextElement = reviewElement.querySelector('.review-text-full');

        readMoreBtn.addEventListener('click', () => {
            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
                shortTextElement.style.display = 'block';
                fullTextElement.style.display = 'none';
                readMoreBtn.textContent = 'Read More';
            } else {
                card.classList.add('expanded');
                shortTextElement.style.display = 'none';
                fullTextElement.style.display = 'block';
                readMoreBtn.textContent = 'Read Less';
            }
        });
    }

    return reviewElement;
}

// Function to display reviews
function displayReviews() {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';

    if (displayedReviews.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">No reviews to display yet!</p>
            </div>
        `;
        return;
    }

    displayedReviews.forEach(review => {
        const reviewCard = createReviewCard(review);
        container.appendChild(reviewCard);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    filterAndDisplayReviews();
    document.getElementById('feedbackForm').addEventListener('submit', addReview);
});

// Star rating interactivity
document.querySelectorAll('.rating input').forEach(input => {
    input.addEventListener('change', (e) => {
        const rating = e.target.value;
        document.querySelectorAll('.rating label').forEach(label => {
            label.style.color = '#ddd';
        });
        for (let i = rating; i > 0; i--) {
            document.querySelector(`label[for="star${i}"]`).style.color = '#ffd700';
        }
    });
});