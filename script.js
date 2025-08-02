
    let donors = [ { name: "Anjali Sharma", bloodGroup: "A+", contact: "9876543210" },
  { name: "Rahul Mehra", bloodGroup: "B+", contact: "9988776655" },
  { name: "Priya Desai", bloodGroup: "O+", contact: "9765432109" },
  { name: "Aman Verma", bloodGroup: "AB-", contact: "9871234567" },
  { name: "Sneha Nair", bloodGroup: "A-", contact: "9123456780" },
  { name: "Rohit Patil", bloodGroup: "O-", contact: "9988001122" }];
  let bloodInventory = {
    "A+": 5, "A-": 3,
    "B+": 4, "B-": 2,
    "AB+": 6, "AB-": 1,
    "o+": 8, "o-": 9
  };

    let currentRole = "";
      const users = [
      { id: "supervisor", password: "dr123", role: "supervisor" },
      { id: "staff", password: "staff123", role: "staff" }
    ];

    const hospitals = [
       {
        name: "Jeevan Adhar Hospital",
        contact: "+91-9876543210",
        address: "Narsinha Bharosa Heights,Opp to ayurvadic college,Doctor Ln Rd, Nanded",
        mapLink: "https://maps.app.goo.gl/bthenr2vwL7biEkg6"
      },
      {
        name: "Shree Ganga Hospital",
        contact: "+91-096474 71001",
        address: " Gokul Niwas, Nanded, Maharashtra 431602",
        mapLink: "https://maps.app.goo.gl/N5rBeb68c78vph9v8"
      },
      {
        name: "Dhonde Hospital",
        contact: "+91- 09689482500",
        address: "Lalbadi, Shrawasti Nagar, Nanded, Nanded-Waghala, Maharashtra 431602 ",
        mapLink: " https://maps.app.goo.gl/RuKH47VQoLmoFNvF9"
      }
    ];

    function login() {
      const id = document.getElementById('loginId').value;
      const pass = document.getElementById('loginPassword').value;
      const user = users.find(u => u.id === id && u.password === pass);

      if (user) {
        currentRole = user.role;
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('system-section').classList.remove('hidden');
        loadTable();
        loadHospitals();
      } else {
        alert("Invalid credentials!");
      }
    }

    function addDonor() {
      const name = document.getElementById('name').value.trim();
      const bloodGroup = document.getElementById('bloodGroup').value;
      const contact = document.getElementById('contact').value.trim();

      if (!name || !contact) {
        alert("Please fill all fields");
        return;
      }

      donors.push({ name, bloodGroup, contact });
      document.getElementById('name').value = "";
      document.getElementById('contact').value = "";
      loadTable();
    }

    function loadTable() {
      const tbody = document.getElementById('donorTableBody');
      tbody.innerHTML = "";
      donors.forEach((d, i) => {
        tbody.innerHTML += `
          <tr>
            <td>${d.name}</td>
            <td>${d.bloodGroup}</td>
            <td>${d.contact}</td>
            <td><button onclick="deleteDonor(${i})">Delete</button></td>
          </tr>
        `;
      });
    }

    function deleteDonor(index) {
      if (currentRole !== "admin") {
        alert("Only admin can delete donors.");
        return;
      }
      donors.splice(index, 1);
      loadTable();
    }

    function searchDonor() {
      const group = document.getElementById('searchGroup').value.trim().toUpperCase();
      if (!group) {
        alert("Please enter a blood group.");
        return;
      }

      const tbody = document.getElementById('donorTableBody');
      tbody.innerHTML = "";

      donors.filter(d => d.bloodGroup.toUpperCase() === group)
        .forEach((d, i) => {
          tbody.innerHTML += `
            <tr>
              <td>${d.name}</td>
              <td>${d.bloodGroup}</td>
              <td>${d.contact}</td>
              <td><button onclick="deleteDonor(${i})">Delete</button></td>
            </tr>
          `;
        });
    }

    function loadHospitals() {
      const list = document.getElementById("hospitalList");
      list.innerHTML = "";

      hospitals.forEach(h => {
        const card = document.createElement("div");
        card.className = "hospital-card";
        card.innerHTML = `
          <p><strong>Name:</strong> ${h.name}</p>
          <p><strong>Contact:</strong> ${h.contact}</p>
          <p><strong>Address:</strong> ${h.address}</p>
          <a href="${h.mapLink}" target="_blank">
            <button>View on Map</button>
          </a>
        `;
        list.appendChild(card);
      });
    }
