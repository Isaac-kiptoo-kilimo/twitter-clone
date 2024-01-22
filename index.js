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
                option.textContent = user.username; // Displaying usernames
                userSelect.appendChild(option);
            });

            userSelect.addEventListener('change', (e) => {
                const selectedUserId = e.target.value;
                fetchPosts(selectedUserId);
            });

            // Fetch posts for the default user (ID 1)
            fetchPosts(1);

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

            // Fetch comments for the first post (if available)
            if (posts.length > 0) {
                fetchComments(posts[0].id);
            }

        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    }

    async function fetchComments(postId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const comments = await response.json();
            displayComments(comments);

        } catch (error) {
            console.error('Error fetching comments:', error.message);
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

            commentIcon.addEventListener('click', () => {
                fetchComments(post.id); // Fetch and display comments for the clicked post
            });

            postContainer.appendChild(postTitle);
            postContainer.appendChild(postContent);
            postContainer.appendChild(contentBottom);

            postsContent.appendChild(postContainer);
        });
    }

    function displayComments(comments) {
        let commentsContent = document.querySelector('.comments-content');

        // Check if the commentsContent element exists
        if (!commentsContent) {
            // Create commentsContent if it doesn't exist
            commentsContent = document.createElement('div');
            commentsContent.className = 'comments-content';
            document.querySelector('.content-main').appendChild(commentsContent);
        }

        // Clear existing comments
        commentsContent.innerHTML = '';

        // Append new comments
        comments.forEach((comment) => {
            const commentContainer = document.createElement('div');
            commentContainer.className = 'comment-description';

            const commentTitle = document.createElement('div');
            commentTitle.className = 'comment-title';

            const commentUserIcon = document.createElement('img');
            commentUserIcon.src = "./images/christopher-campbell.jpg";
            commentUserIcon.width = 20;
            commentUserIcon.alt = "user Icon";

            const commentAuthor = document.createElement('h4');
            commentAuthor.textContent = comment.name;

            const certificateIcon = document.createElement('img');
            certificateIcon.src = "./images/certificate-solid.svg";
            certificateIcon.width = 20;
            certificateIcon.alt = "Certificate Icon";

            const twitterIcon = document.createElement('img');
            twitterIcon.src = "./images/twitter.svg";
            twitterIcon.width = 20;
            twitterIcon.alt = "Twitter Icon";

            commentTitle.appendChild(commentUserIcon);
            commentTitle.appendChild(commentAuthor);
            commentTitle.appendChild(certificateIcon);
            commentTitle.appendChild(twitterIcon);

            const commentContent = document.createElement('p');
            commentContent.textContent = comment.body;

            const commentBottom = document.createElement('div');
            commentBottom.className = 'comment-bottom';

            const commentIcon = createIconElement("./images/comment-solid.svg", 20);
            const retweetIcon = createIconElement("./images/retweet.png", 20);
            const heartIcon = createIconElement("./images/heart-solid.svg", 20);

            const commentCount = document.createElement('p');
            commentCount.textContent = '200'; // Set the actual comment count

            const retweetCount = document.createElement('p');
            retweetCount.textContent = '200'; // Set the actual retweet count

            const likeCount = document.createElement('p');
            likeCount.textContent = '200'; // Set the actual like count

            commentBottom.appendChild(commentIcon);
            commentBottom.appendChild(commentCount);
            commentBottom.appendChild(retweetIcon);
            commentBottom.appendChild(retweetCount);
            commentBottom.appendChild(heartIcon);
            commentBottom.appendChild(likeCount);

            commentContainer.appendChild(commentTitle);
            commentContainer.appendChild(commentContent);
            commentContainer.appendChild(commentBottom);

            commentsContent.appendChild(commentContainer);
        });
    }

    // Helper function to create icon elements
    function createIconElement(src, width) {
        const icon = document.createElement('img');
        icon.src = src;
        icon.width = width;
        return icon;
    }

    fetchUsers();

});
