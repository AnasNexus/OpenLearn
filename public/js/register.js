
const token = localStorage.getItem("token");

if (token) {
    window.location.href = "/";
} else {
    const usernameElem = document.getElementById("username");
    const passwordElem = document.getElementById("password");
    const emailElem = document.getElementById("email");
    const submit = document.getElementById("submit");
    const msg = document.getElementById("msg");
    const text = document.getElementById("msg-text");
    const closeBtn = document.getElementById("close");

    const showMessage = (message) => {
        if (!msg || !text) return;

        msg.classList.remove("hidden");
        msg.classList.add("displaied");
        text.innerText = message;
    };

    const register = async () => {
        if (!usernameElem || !passwordElem || !emailElem || !submit) {
            return;
        }

        const username = usernameElem.value.trim();
        const password = passwordElem.value;
        const email = emailElem.value.trim();

        if (!username || !password || !email) {
            showMessage("Please enter a valid username, email, and password.");
            return;
        }

        submit.disabled = true;

        try {
            const response = await axios.post("/auth/register", {
                username,
                password,
                email
            });

            const result = response.data;

            if (result.success && result.token) {
                localStorage.setItem("token", result.token);
                window.location.href = "/";
                return;
            }

            showMessage(result.msg || "Registration failed.");
        } catch (error) {
            console.error(error);

            showMessage(
                error.response?.data?.msg ||
                "Unable to connect to the server."
            );
        } finally {
            submit.disabled = false;
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (!msg) return;

            msg.classList.remove("displaied");
            msg.classList.add("hidden");
        });
    }

    if (submit) {
        submit.addEventListener("click", register);
    }
}
