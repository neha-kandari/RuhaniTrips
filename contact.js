document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            try {
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();

                // Validate inputs
                if (!name || !email || !phone || !subject || !message) {
                    alert('Please fill in all fields');
                    return;
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }

                // Validate phone number (basic validation)
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(phone)) {
                    alert('Please enter a valid 10-digit phone number');
                    return;
                }

                // Format the message for WhatsApp with better spacing and formatting
                const whatsappMessage = 
`*New Inquiry from RuhaniTrips Website*%0a%0a
*Customer Details*%0a
👤 *Name:* ${name}%0a
📧 *Email:* ${email}%0a
📱 *Phone:* ${phone}%0a
📋 *Subject:* ${subject}%0a%0a
*Message:*%0a${message}`;

                // WhatsApp business number (without + symbol)
                const businessPhone = '919996650521';

                // Create WhatsApp URL with the formatted message
                const whatsappURL = `https://wa.me/${businessPhone}?text=${whatsappMessage}`;

                // Open WhatsApp in a new tab
                window.location.href = whatsappURL;

                // Reset form after a short delay
                setTimeout(() => {
                    contactForm.reset();
                }, 1000);

            } catch (error) {
                console.error('Error sending message:', error);
                alert('There was an error sending your message. Please try again.');
            }
        });
    }
});