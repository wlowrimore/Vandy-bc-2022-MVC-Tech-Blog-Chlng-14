async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();


  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // once comment text is created, comments route is called and the comment is added to that post
  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // if everything goes well, comment is posted to assigned post, page reloads with newly posted comment
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.comments').addEventListener('submit', commentFormHandler);