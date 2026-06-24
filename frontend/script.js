console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        console.log("FORM SUBMITTED");

        const data = {
            fullname: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            age: document.getElementById("age").value,
            city: document.getElementById("city").value,
            gender: document.getElementById("gender").value
        };
        const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
);

if(existingUser.rows.length > 0){
    return res.json({
        message: "Email already registered"
    });
}

        console.log("Sending Data:", data);

        try {

            const response = await fetch(
                "http://localhost:3000/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );

            const result = await response.json();

            console.log(result);

            document.getElementById("message").innerText =
                result.message;

        } catch (error) {

            console.error(error);

            document.getElementById("message").innerText =
                "Error connecting to server";
        }

    });

});