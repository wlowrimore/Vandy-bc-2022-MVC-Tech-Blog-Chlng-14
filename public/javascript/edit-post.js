async function editFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_text = document.querySelector('textarea[name="post-text"]').value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id,
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // if everything goes well, return to dashboard
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);