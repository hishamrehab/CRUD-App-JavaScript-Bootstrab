var form = `<div>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Enter Your Name">
  </div>
  <div class="form-group mt-3">
    <label for="email">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Enter Your Email">
  </div>
  

  <button type="submit" class="btn btn-primary mt-4" onclick="save()">Submit</button>
</div>`;

function table() {
  let table = `<table class="table">
  <thead>
    <tr>
      <th class="col-1">NO</th>
      <th class="col-2">Name</th>
      <th class="col-3">Email</th>
      <th class="col-4">Edit</th>
      <th class="col-5">Delete</th>
    </tr>
  </thead>
  <tbody>`;
  document.getElementById("form").innerHTML = form;

  for (let i = 0; i < details.length; i++) {
    table =
      table +
      ` <tr>
      <th class="col-1">${i + 1}</th>
      <td class="col-2">${details[i].name}</td>
      <td class="col-3">${details[i].email}</td>
      <td class="col-4">
       <button type="button" class="btn btn-warning mt-3" onclick="edit(${i})" >Edit</button>
      </td>
      <td class="col-5">
       <button type="button" class="btn btn-danger mt-3" onclick="deleteData(${i})">Delete</button>
      </td>
    </tr>`;
  }

  table =
    table +
    ` </tbody>
</table>
`;
  document.getElementById("table").innerHTML = table;
}
document.getElementById("form").innerHTML = form;
details = [];
getData();
table();

function getData() {
  let Data = localStorage.getItem("details");
  if (Data) {
    details = JSON.parse(Data);
  } else {
    setData();
  }
}

function setData() {
  localStorage.setItem("details", JSON.stringify(details));
}

const save = () => {
  let name = document.getElementById("name");
  let email = document.getElementById("email");

  if (name.value == "") {
    alert("name is empty");
    return;
  }

  let data = {
    name: name.value,
    email: email.value,
  };
  details.push(data);

  console.log(details);

  setData();
  table();
  name.value = "";
  email.value = "";
};

function deleteData(index) {
  details.splice(index, 1);

  setData();
  table();
  console.log(index);
}

function edit(index) {
  var editForm = `<div>
  <div class="form-group">
    <label for="name">Update Name</label>
    <input   value="${details[index].name}" type="text" class="form-control" id="newName" placeholder="Enter Your Updated Name">
  </div>
  <div class="form-group mt-3">
    <label for="email">Email</label>
    <input  value="${details[index].email}"  type="email" class="form-control" id="newEmail" placeholder="Enter Your Updated Email">
  </div>

  <button type="submit" class="btn btn-primary mt-4" onclick="update(${index})">Update</button>
</div>`;

  document.getElementById("form").innerHTML = editForm;
}

function update(index) {
  let newName = document.getElementById("newName");
  let newEmail = document.getElementById("newEmail");

  details[index] = {
    name: newName.value,
    email: newEmail.value,
  };
  setData();
  table();

  document.getElementById("form").innerHTML = form;

  console.log(details);
}
