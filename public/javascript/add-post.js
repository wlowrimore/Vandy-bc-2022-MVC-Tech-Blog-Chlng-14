async function newPostFormHandler(event) {
  event.preventDefault();

  // accesses the appropriate fields in post for input of their respecive values
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post-text"]').value;

  // runs the posts route and posts those values
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // if everything goes well, the post is added, and user is returned to updated dashboard
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);