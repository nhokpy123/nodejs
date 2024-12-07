const API_BASE_URL = "http://localhost:5000";
let authToken = "";

// Login functionality
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            authToken = data.token; // Lưu token
            document.getElementById("login-status").textContent = "Login successful!";
            document.getElementById("login-section").classList.add("hidden");
            document.getElementById("dashboard-section").classList.remove("hidden");
            loadServices(); // Tải dịch vụ
            loadReservations(); // Tải đặt chỗ
        } else {
            // Hiển thị lỗi từ API
            document.getElementById("login-status").textContent = data.error || "Invalid credentials!";
        }
    } catch (error) {
        console.error("Error during login:", error);
        document.getElementById("login-status").textContent = "Unable to connect to server!";
    }
    
});

// Load services
async function loadServices() {
    try {
        const response = await fetch(`${API_BASE_URL}/services`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        const services = await response.json();
        const serviceList = document.getElementById("service-list");
        serviceList.innerHTML = "";

        services.forEach((service) => {
            const li = document.createElement("li");
            li.textContent = `${service.name} - ${service.description}`;
            serviceList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading services:", error);
    }
}

// Add service
document.getElementById("add-service-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("service-name").value.trim();
    const description = document.getElementById("service-description").value.trim();

    if (!name || !description) {
        alert("Name and description are required!");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/services`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`, // Token phải chính xác
            },
            body: JSON.stringify({ name, description }),
        });

        if (response.ok) {
            // Xóa nội dung nhập và làm mới danh sách dịch vụ
            document.getElementById("service-name").value = "";
            document.getElementById("service-description").value = "";
            loadServices();
        } else {
            const errorData = await response.json();
            alert(`Failed to add service: ${errorData.error}`);
        }
    } catch (error) {
        console.error("Error adding service:", error);
        alert("An error occurred while adding the service.");
    }
});


// Load reservations
async function loadReservations() {
    try {
        const response = await fetch(`${API_BASE_URL}/reservations`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        const reservations = await response.json();
        const reservationList = document.getElementById("reservation-list");
        reservationList.innerHTML = "";

        reservations.forEach((reservation) => {
            const li = document.createElement("li");
            li.textContent = `Service: ${reservation.service.name}, Date: ${reservation.date}, Time: ${reservation.time}, People: ${reservation.people}`;
            reservationList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading reservations:", error);
    }
}
