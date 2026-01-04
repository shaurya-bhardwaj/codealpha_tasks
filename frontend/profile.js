const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

// Get userId from URL like: profile.html?user=USER_ID
const params = new URLSearchParams(window.location.search);
const userId = params.get("user");

async function loadProfile() {
  // Get all posts
  const res = await fetch(`${API}/posts`);
  const posts = await res.json();

  // Filter posts by this user
  const userPosts = posts.filter(p => p.user._id === userId);

  if (userPosts.length === 0) {
    document.getElementById("username").innerText = "No posts yet";
    return;
  }

  document.getElementById("username").innerText =
    userPosts[0].user.username;

  document.getElementById("posts").innerHTML = userPosts.map(p => `
    <div class="post">
      <p>${p.content}</p>
      <small>❤️ ${p.likes.length}</small>
    </div>
  `).join("");
}

async function followUser() {
  await fetch(`${API}/users/${userId}/follow`, {
    method: "POST",
    headers: {
      "Authorization": token
    }
  });

  alert("Followed user");
}

loadProfile();
