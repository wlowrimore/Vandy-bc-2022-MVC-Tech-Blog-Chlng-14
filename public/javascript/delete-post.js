async function deleteFormHandler(event) {
  event.preventDefault();

  // assigns id to pull from array
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // waits for fetch of posts at specified id and removes that id
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

  // if everything goes well, user is returned to updated dashboard
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);