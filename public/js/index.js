const topicsgrid = document.getElementById("topics-grid"); // Fixed to querySelector for class
const resoucesgrid = document.getElementById("resources-grid");
/*

*/
async function LoadPageData() {
    try {
        const topics = await axios.get("/api/categories/");
        const res_Topics = topics.data;

        if (res_Topics.success && res_Topics.data.length > 0) {
            // Clear existing content just in case
            topicsgrid.innerHTML = "";

            // Loop through up to the first 3 categories
            const limit = Math.min(4, res_Topics.count);
            for (let i = 0; i < limit; i++) {
                const data = res_Topics.data[i];

                // Use '+=' to append each card instead of overwriting
                topicsgrid.innerHTML += `
                    <a href="/topics?topic=${data.slug}" class="topic-card">
                        <div style="color: ${data.color};" class="topic-icon icon-green">${data.icon}</div>
                        <h3>${data.name}</h3>
                        <p>${data.description || "Learn and explore topics."}</p>
                        <span class="topic-link">Explore topic →</span>
                    </a>
                `;
            };



        } else {
            console.log("No categories found.");
        }

        const resouces = await axios.get("/api/resources");
        const res_resources = resouces.data;
        resoucesgrid.innerHTML = "";
        if (res_resources.success) {
            const limit = Math.min(3, res_resources.count);
            for (let i = 0; i < limit; i++) {
                const data = res_resources.data[i];
                const category = res_Topics.data.find(
                    topic => topic.id == data.category_id
                );
                resoucesgrid.innerHTML += `
                    <article class="resource-card">
                        <a href=${data.url} targer="_blank">
                            <div class="resource-top">
                                    <span class="resource-type">${data.resource_type}</span>
                                    <span class="resource-symbol symbol-green">${data.short_code}</span>
                            </div>

                            <h3>${data.title}</h3>
                            <p>
                                ${data.description}
                            </p>

                            <div class="resource-tags">
                                <span>${data.short_code}</span>
                                <span>${data.level}</span>
                            </div>

                            <div class="resource-footer">
                                <span class="resource-category">${category.name}</span>
                                <span class="resource-arrow">↗</span>
                            </div>
                        </a>
                        
                    </article>
                `
            }
        }

    } catch (error) {
        console.error("Error loading topics:", error);
    };
};

window.addEventListener("load", () => {
    if (!topicsgrid) {
        return;
    }
    LoadPageData();
});