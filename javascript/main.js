// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
    if (sidebar.classList.contains("active")){
        sidebar.classList.remove("active")
        sidebar.classList.add("close")
        setTimeout(() => {
            sidebar.classList.remove("close")
        }, 400)
    } else {
        sidebar.classList.add("active")
    }
});

// sidebar clickoutside effect
document.addEventListener("click", (event) => {
    if (event.target.closest(".menu-toggle")) return;
    if (!event.target.closest(".sidebar")) {
        sidebar.classList.remove("active");
    }
});

// sidebar items click
const sidebarItems = document.querySelectorAll(".nav-links li");
sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
});


// Form reservation:
const form = document.getElementById("reservation-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                Accept: "application/json",
            },
        });

        if (response.ok) {
            alert(
                "Thank you! Your reservation request has been sent. We will contact you shortly."
            );
            form.reset();
            // Optional: Redirect to thank you page
            // window.location.href = 'thank-you.html';
        } else {
            throw new Error("Form submission failed");
        }
    } catch (error) {
        alert(
            "There was a problem submitting your form. Please try again or call us directly."
        );
        console.error("Error:", error);
    }
});

// Animation on scroll
const animateElements = document.querySelectorAll(".animate");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.1 }
);

animateElements.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(el);
});

// Booking buttons
document.querySelectorAll(".book-now").forEach((button) => {
    button.addEventListener("click", function() {
        // Get the parent element of the clicked button (the .room-card div)
        const roomCard = this.closest(".room-card");

        if (roomCard) {
            // Find the room type element within the room card
            const roomTypeElement = roomCard.querySelector(".room-type");

            if (roomTypeElement) {
                // Get the text content of the room type element
                const roomType = roomTypeElement.textContent;
                let formRoomType = document.getElementById("room-type")
                formRoomType.value = roomType
        
                document.getElementById("reservation-form").scrollIntoView({
                    behavior: "smooth",
                });
            } else {
                console.log("Error: Room type element not found.");
            }
        } else {
            console.log("Error: Room card element not found.");
        }
    });
});
