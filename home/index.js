// Function to initialize click handler:
window.onload = () => {
  const submitButton = document.getElementById('send');
  submitButton.addEventListener('click', () => {
    handleClick();
  });
};

// Function to handle form submission:
const handleClick = async () => {
  // Get clean form data:
  const cleanData = getCleanData();
  // If it's input data's clean break out of function.
  if (!cleanData) return;
  // POST form data -> backend -> mongodb
  const data = await fetch('http://localhost:8080/registration', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name: cleanData.name, email: cleanData.email,
      phone: cleanData.phone, password: cleanData.password}),
  });
  const response = await data.json();
  // If server response indicated successful signup:
  if (response.message == 'Registered!') {
    alert('Thank you for signing up!');
    // Redirect to their logged in screen:
    window.location.assign('../login/index.html');
  } else {
    // Otherwise the email is already used:
    alert('This email has already been used? If you have forgotten '+
    'your email please click "forgot password"');
  }
};

// Function to validate form data:
const getCleanData = () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  // Check that the name field does not have bad characters and isn't blank:
  if (/[<>?!\[0-9\]]/.test(name) || !/.+/.test(name)) {
    document.getElementById('name').style.borderColor = 'red';
    alert('Plese check the name field, "' +name+'" is not valid!');
    return false;
  }
  // Check that the email field contains the @ character:
  if (!/[@]+/.test(email)) {
    document.getElementById('email').style.borderColor = 'red';
    alert('Plese enter a valid email.');
    return false;
  }
  // Check if the phone number input contains letters:
  if (/[a-zA-Z]/.test(phone)) {
    document.getElementById('phone').style.borderColor = 'red';
    alert('Plese enter a valid phone number.');
    return false;
  }
  // Check that password is at least one character:
  if (!/.+/.test(password)) {
    document.getElementById('phone').style.borderColor = 'red';
    alert('Plese enter a password so that you can log back in');
    return false;
  }
  return {name: name, email: email, phone: phone, password: password};
};
