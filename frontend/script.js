const API = "http://localhost:5000/api";
const token = localStorage.getItem("token");

async function loadPosts() {
  const res = await fetch(`${API}/posts`);
  const posts = await res.json();

  document.getElementById("feed").innerHTML = posts.map(p => `
    <div class="post">
      <b>${p.user.username}</b>
      <p>${p.content}</p>
      <button onclick="likePost('${p._id}')">❤️ ${p.likes.length}</button>
    </div>
  `).join("");
}

async function createPost() {
  await fetch(`${API}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ content: document.getElementById("post").value })
  });
  loadPosts();
}

async function likePost(id) {
  await fetch(`${API}/posts/${id}/like`, {
    method: "POST",
    headers: { "Authorization": token }
  });
  loadPosts();
}

loadPosts();
