window.onload = async () => {
    const email = sessionStorage.getItem('email');
    const myObjectString2 = localStorage.getItem('Details');
    const Properties = JSON.parse(myObjectString2);
    const div = document.createElement("div");
    const heading = document.createElement("h1");
    heading.innerHTML = Properties.name;
    const img = document.createElement("img");
    const rand = Math.floor(Math.random() * 3) + 1;
    img.src = './../images/card'+rand+'.webp';
    const location = document.createElement("p");
    location.innerHTML = "Location :" +Properties.location;
    const Price = document.createElement("p");
    Price.innerHTML = "Price :" +Properties.price;
    const floorPlan = document.createElement("p");
    floorPlan.innerHTML = "Floor Plan :" +Properties.floorplan;
    div.appendChild(heading);
    div.appendChild(img);
    div.appendChild(location);
    div.appendChild(Price);
    div.appendChild(floorPlan);
    document.getElementById("PropertyDetails").appendChild(div);
  };

  const handleClick = () => {
    const form = document.getElementById('Inputform');
    const myObjectString2 = localStorage.getItem('Details');
    const Properties = JSON.parse(myObjectString2);
    form.innerHTML = `
      <h3>Edit Property details</h3>
      <label>Name</label>
        <Input id="name" value=`+Properties.name+` /><br>
          <label>Price</label>
              <Input type="number" id="price" value=`+Properties.price+` /><br>
              <label>Location</label>
              <Input type="text" id="location" value=`+Properties.location+` /><br>
              <label>Floor Plan</label>
              <Input type="text" id="floorPlan" value=`+Properties.floorplan+` /><br>
          <Input type="submit" id="save" onclick="submit()"/>`;
  };
  
  // eslint-disable-next-line no-unused-vars
  const submit = async () => {
    const myObjectString2 = localStorage.getItem('Details');
    const Properties = JSON.parse(myObjectString2);
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const floorplan = document.getElementById('floorPlan').value;
    if (name && price && location && floorplan) {
      const data = await fetch('http://localhost:8080/EditProperty', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name,
          Useremail: sessionStorage.getItem('email'),
          price: price, location: location, floorplan: floorplan,Properties}),
      });
      const response = await data.json();
      // If server response indicated successful:
      if (response.message == 'Registered!') {
        alert('Property details updated');
        window.location.href = "./index.html";
      } else {
        alert('There was some error.Please try again');
      }
    } else {
      alert('Please enter all the details to add the property');
    }
}

const back = async () =>{
    window.location.href = "./index.html";
}

const Logout =()=>{
    window.location.href = "./../Home/index.html";
    sessionStorage.removeItem("email");
}