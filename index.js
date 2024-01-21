document.addEventListener('DOMContentLoaded', () => {

    async function fetchUsers() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const users = await response.json();

            const userSelect = document.getElementById('userSelect');

            users.forEach((user) => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });

            userSelect.addEventListener('change', (e) => {
                const selectedUserId = e.target.value;
                fetchPosts(selectedUserId);
            });

        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    }

    async function fetchPosts(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const posts = await response.json();
            displayPosts(posts);
            
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    }

    function displayPosts(posts) {
        const postsContent = document.querySelector('.posts-content');

        // Clear existing posts
        postsContent.innerHTML = '';

        // Append new posts
        posts.forEach((post) => {
            const postContainer = document.createElement('div');
            postContainer.className = 'post-description';

            const postTitle = document.createElement('div');
            postTitle.className = 'post-title';

            const userIcon = document.createElement('img');
            userIcon.src = "./images/christopher-campbell.jpg";
            userIcon.width = 20;
            userIcon.alt = "user Icon";

            const title = document.createElement('h4');
            title.textContent = post.title;

            const certificateIcon = document.createElement('img');
            certificateIcon.src = "./images/certificate-solid.svg";
            certificateIcon.width = 20;
            certificateIcon.alt = "Certificate Icon";

            const twitterIcon = document.createElement('img');
            twitterIcon.src = "./images/twitter.svg";
            twitterIcon.width = 20;
            twitterIcon.alt = "Twitter Icon";

            postTitle.appendChild(userIcon);
            postTitle.appendChild(title);
            postTitle.appendChild(certificateIcon);
            postTitle.appendChild(twitterIcon);

            const postContent = document.createElement('p');
            postContent.textContent = post.body;

            const contentBottom = document.createElement('div');
            contentBottom.className = 'content-bottom';

            const commentIcon = createIconElement("./images/comment-solid.svg", 20);
            const retweetIcon = createIconElement("./images/retweet.png", 20);
            const heartIcon = createIconElement("./images/heart-solid.svg", 20);

            const commentCount = document.createElement('p');
            commentCount.textContent = '200'; // Set the actual comment count

            const retweetCount = document.createElement('p');
            retweetCount.textContent = '200'; // Set the actual retweet count

            const likeCount = document.createElement('p');
            likeCount.textContent = '200'; // Set the actual like count

            contentBottom.appendChild(commentIcon);
            contentBottom.appendChild(commentCount);
            contentBottom.appendChild(retweetIcon);
            contentBottom.appendChild(retweetCount);
            contentBottom.appendChild(heartIcon);
            contentBottom.appendChild(likeCount);

            postContainer.appendChild(postTitle);
            postContainer.appendChild(postContent);
            postContainer.appendChild(contentBottom);

            postsContent.appendChild(postContainer);
            console.log(postContent);
        });
    }

    // Helper function to create icon elements
    function createIconElement(src, width) {
        const icon = document.createElement('img');
        icon.src = src;
        icon.width = width;
        console.log(icon);
        return icon;
    }

    fetchUsers();

});
