async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // looking for user input to fetch login and post for verification
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // if everything goes well, user is loggin in and returned to dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      let result = await response.json()
      alert(result.message);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);