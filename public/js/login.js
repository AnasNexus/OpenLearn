const token = localStorage.getItem("token") || null;

if (token) {
    window.location.href = "/";
};

const usernameElem = document.getElementById("username");
const passwordElem = document.getElementById("password");
const submit = document.getElementById("submit");
const msg = document.getElementById("msg");
const text = document.getElementById("msg-text");
const closeBtn = document.getElementById("close");

const login = async () => {
    if (!usernameElem || !passwordElem || !submit) {
        return;
    };

    const username = usernameElem.value;
    const password = passwordElem.value;

    if (!username || !password) {
        msg.classList.remove("hidden");
        msg.classList.add("displaied");
        text.innerText = "Please Enter A Valid Data";
        return;
    }

    try {
        const respones = await axios.post("/auth/login", {
            username: username,
            password: password
        });
        const result = await respones.data;

        if (result.success) {
            localStorage.setItem("token", result.token);
            window.location.href = "/";
        }
        else {
            msg.classList.remove("hidden");
            msg.classList.add("displaied");
            text.innerText = result.msg;
        };
    } catch (error) {
        console.error(error);

        msg.classList.remove("hidden");
        msg.classList.add("displaied");

        text.innerText =
            error.response?.data?.msg ||
            "Unable to connect to the server";
    }
};

closeBtn.addEventListener("click", () => {
    msg.classList.remove("displaied");
    msg.classList.add("hidden");
})

submit.addEventListener("click", () => login());
