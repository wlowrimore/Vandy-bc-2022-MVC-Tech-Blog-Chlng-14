async function editFormHandler(event) {
  event.preventDefault();

  // pull the post id
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // now, call the update route
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);