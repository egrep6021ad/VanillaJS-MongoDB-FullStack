// Init click handler:
window.onload = () => {
  const k = document.getElementById('send');
  k.addEventListener('click', () => {
    handleClick();
  });
};


// Handle form submission:
const handleClick = async () => {
  // Get form data:
  const name = await document.getElementById('name').value;
  const email = await document.getElementById('email').value;
  const phone = await document.getElementById('phone').value;
  const password = await document.getElementById('password').value;
  // POST form data -> backend -> mongodb
  const data = await fetch('http://localhost:8080/registration', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: name, email: email,
      phone: phone, password: password}),
  });
  const response = await data.json();
  // If server response indicated successful signup:
  if (response.message == 'Registered!') {
    alert('Thank you for signing up!');
    // Redirect to their logged in screen:
    window.location.assign('../login/index.html');
  } else {
    // Otherwise the email is already used:
    alert('This email has already been used? If you have forgotten!'+
    'your email please click "forgot password"');
  }
};
