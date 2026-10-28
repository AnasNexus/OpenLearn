const token = localStorage.getItem("token") || null;

if (token) {
    window.location.href = "/";
    return;
};
