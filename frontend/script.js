console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const data = {
            fullname: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            age: document.getElementById("age").value.trim(),
            city: document.getElementById("city").value.trim(),
            gender: document.getElementById("gender").value
        };

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(data.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Phone Validation
        const phonePattern = /^[6-9][0-9]{9}$/;

        if (!phonePattern.test(data.phone)) {
            alert("Phone number must be a valid 10-digit Indian mobile number.");
            return;
        }

        // Age Validation
        const age = Number(data.age);

        if (isNaN(age) || age < 1 || age > 90) {
            alert("Age must be between 1 and 90.");
            return;
        }

        try {

            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            document.getElementById("message").innerText = result.message;

            if (response.ok) {
                form.reset();
            }

        } catch (error) {

            console.error("Error:", error);

            document.getElementById("message").innerText =
                "Error connecting to server.";

        }

    });

});

