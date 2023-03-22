import "./style.css";
const postForm = document.getElementById("postForm");
import { loadPost, savePost } from "./models/Post";
import { uploadImage, getImageUrl } from "./storage";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

window.addEventListener("DOMContentLoaded", async () => {
  const posts = await loadPost();
  const postsList = document.getElementById("posts");

  posts.forEach((post) => {
    postsList.innerHTML += `
      <li>
        ${post.content}
        <img src="${post.image ? post.image : ""}" style="width: 10rem" />
      </li>
  `;
  });
});

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputFile = document.getElementById("image");

  let post = {
    content: postForm["content"].value,
  };

  if (inputFile.files[0]) {
    const result = await uploadImage(inputFile.files[0]);
    const url = await getImageUrl(result.ref);
    post.image = url;
  }

  savePost(post);
});

const googleLogin = document.getElementById("googleLogin");
googleLogin.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log(result);
});
