const table = document
  .getElementById("mustalista")
  .getElementsByTagName("tbody")[0];

const form = document.getElementById("user-form");
const emptyTableButton = document.getElementById("empty-table");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("input-username").value;
  const email = document.getElementById("input-email").value;
  const isAdmin = document.getElementById("input-admin").checked;
  const adminText = isAdmin ? "X" : "-";
  const imageFile = document.getElementById("input-image").files[0];

  let userExists = false;
  let existingRow;
  Array.from(table.rows).forEach((row) => {
    if (row.cells[0].innerText === username) {
      userExists = true;
      existingRow = row;
    }
  });

  if (userExists) {
    existingRow.cells[1].innerText = email;
    existingRow.cells[2].innerText = adminText;
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      existingRow.cells[3].innerHTML = `<img src="${imageUrl}" width="64" height="64" alt="User Image">`;
    }
  } else {
    const newRow = table.insertRow();
    const usernameCell = newRow.insertCell(0);
    const emailCell = newRow.insertCell(1);
    const adminCell = newRow.insertCell(2);
    const imageCell = newRow.insertCell(3);

    usernameCell.innerText = username;
    emailCell.innerText = email;
    adminCell.innerText = adminText;

    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      imageCell.innerHTML = `<img src="${imageUrl}" width="64" height="64" alt="User Image">`;
    } else {
      imageCell.innerHTML = "";
    }
  }

  form.reset();
});

emptyTableButton.addEventListener("click", function () {
  table.innerHTML = "";
});
