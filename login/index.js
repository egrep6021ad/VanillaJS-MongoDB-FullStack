// Init click handler:
// window.onload = () => {
//   const k = document.getElementById('send');
//   k.addEventListener('click', () => {
//     handleClick();
//   });
// };

// Handle form submission:
const handleClick = async () => {
  // Get form data:
  const email = await document.getElementById('email').value;
  const password = await document.getElementById('password').value;
  // Form data -> backend
  const data = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: email, password: password}),
  });
  // Backend response --> client:
  const response = await data.json();
  console.log(response);
  // If server response indicated successful signup:
  if (response.message == 'TRUE') {
    window.location.href = "./../sellerDashboard/index.html";
    sessionStorage.setItem("email", email);
    
  } else {
    // Otherwise the email is already used:
    alert('Your email or password is incorrect!');
  }
};
