const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const deleteBtn = document.querySelectorAll(".video__comments ul button")

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({text}),
  });
  if (response.status === 201) {
    textarea.value = "";
    const {newCommentId} = await response.json();
    addComment(text, newCommentId);
  }
};

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const div = document.createElement("div");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = newCommentId;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span1 = document.createElement("span");
  span1.innerText = ` ${text}`;
  const button = document.createElement("button");
  button.innerText = "❌";
  div.appendChild(icon);
  div.appendChild(span1);
  newComment.appendChild(div);
  newComment.appendChild(button);
  videoComments.prepend(newComment);
  button.addEventListener("click", deleteComment);
};

const deleteComment = async (event) => {
  const videoId = videoContainer.dataset.id;
  const commentParent = event.target.parentNode;
  const commentId = commentParent.dataset.id;
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      commentId, // 이미  params의 id로 보내고 있기 때문에 굳이 보낼 필요는 없지만, 연습삼아 보냄. 이렇게 object로도 갈 수 있는 게 신기하잖아?
      videoId
    })
  });
  if (response.status === 200) {
    commentParent.remove();
    // window.location.reload();
  }
}

if (form) {
  form.addEventListener("submit", handleSubmit)
};

if (deleteBtn) {
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", deleteComment);
  }
}

{/* < delete comment 다른 버전 (button 밖 코멘트 박스도 인식되어서 아쉬움) > */}
// const comments = document.querySelector(".video__comments");

// const deleteComment = async (event) => {
//   const commentParent = event.target.parentNode;
//   const commentId = commentParent.dataset.id
//   console.log(commentId);
//   if (commentId === "") {
//     return;
//   };
//   const response = await fetch(`/api/comments/${commentId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({commentId})
//   });
//   if (response.status === 200) {
//     commentParent.remove();
//   };
// };

{/* if (comments) {
  comments.addEventListener("click", deleteComment);
}; */}