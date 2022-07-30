window.onload = async () => {
  const email = sessionStorage.getItem('email');
  const data = await fetch('http://localhost:8080/sellerData', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({Useremail: email}),
  });
  // Backend response --> client:
  const response = await data.json();
  console.log(response);
  // If server response indicated successful signup:
  if (response.message == 'TRUE') {
    const Properties = response.output.Properties;
    console.log(Properties);
    for (let i =0; i<Properties.length; i++) {
      const div = document.createElement('div');
      const heading = document.createElement('h1');
      heading.innerHTML = Properties[i].name;
      const img = document.createElement('img');
      const rand = Math.floor(Math.random() * 3) + 1;
      img.src = './../images/card'+rand+'.webp';
      const location = document.createElement('p');
      location.innerHTML = 'Location :' +Properties[i].location;
      const Price = document.createElement('p');
      Price.innerHTML = 'Price :' +Properties[i].price;
      const floorPlan = document.createElement('p');
      floorPlan.innerHTML = 'Floor Plan :' +Properties[i].floorplan;
      div.appendChild(heading);
      div.appendChild(img);
      div.appendChild(location);
      div.appendChild(Price);
      div.appendChild(floorPlan);
      document.getElementById('cardContainer').appendChild(div);
    }
  } else {
    // Otherwise the email is already used:
    alert('Your email or password is incorrect!');
  }
};


// eslint-disable-next-line no-unused-vars
const handleClick = () => {
  const form = document.getElementById('Inputform');
  form.innerHTML = `
    <h3>Add New Property</h3>
    <label>Name</label>
        <Input id="name"/><br>
        <label>Price</label>
            <Input type="number" id="price" /><br>
            <label>Location</label>
            <Input type="text" id="location" /><br>
            <label>Floor Plan</label>
            <Input type="text" id="floorPlan" /><br>
        <Input type="submit" id="save" onclick="submit()"/>`;
};

// eslint-disable-next-line no-unused-vars
const submit = async () => {
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const location = document.getElementById('location').value;
  const floorplan = document.getElementById('floorPlan').value;
  console.log(name);
  if (name && price && location && floorplan) {
    const data = await fetch('http://localhost:8080/AddNewProperty', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name,
        Useremail: sessionStorage.getItem('email'),
        price: price, location: location, floorplan: floorplan}),
    });
    const response = await data.json();
    // If server response indicated successful:
    if (response.message == 'Registered!') {
      alert('Property is Up for Sale');
      window.location.reload(true);
    } else {
      alert('There was some error.Please try again');
    }
  } else {
    alert('Please enter all the details to add the property');
  }
};
