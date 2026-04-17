// js/main.js
document.addEventListener("DOMContentLoaded", function() {
    // Tải Header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
        });

    // Tải Footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        });

    const amenitiesBtn = document.getElementById('amenitiesBtn');
    const amenitiesContent = document.getElementById('amenitiesContent');

    if (amenitiesBtn && amenitiesContent) {
        // Bấm vào nút thì bật/tắt (toggle) class 'show'
        amenitiesBtn.addEventListener('click', function(event) {
            amenitiesContent.classList.toggle('show');
            event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
        });

        // Bấm ra ngoài khoảng trống thì tự động đóng Dropdown
        document.addEventListener('click', function(event) {
            if (!amenitiesBtn.contains(event.target) && !amenitiesContent.contains(event.target)) {
                amenitiesContent.classList.remove('show');
            }
        });
    }
});