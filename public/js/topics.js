
// example

/*

<a href="/topics?topic=programming" class="topic-card">
    <div class="topic-icon icon-green">&lt;/&gt;</div>
    <h3>Programming</h3>
    <p>Learn languages, algorithms, and software development.</p>
    <span class="topic-link">Explore topic →</span>
</a>

*/

const topicsgrid = document.getElementById("topics-grid");

async function LoadTopics() {
    try {
        const respones = await axios.get("/api/categories/");

        const result = await respones.data;
        if (result.success) {
            
        } else {
            window.location.reload();
        }
    } catch (error) {
        console.log(error)
    };
};

window.addEventListener("load", () => {
    if (!topicsgrid) {
        return;
    }
    LoadTopics();
});