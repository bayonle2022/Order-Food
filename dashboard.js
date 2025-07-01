const walletTable = document.querySelector(".wallet-table");
const orderTable = document.querySelector(".order-table");
const orderBtn = document.querySelector(".order");
const walletBtn = document.querySelector(".wallet");

orderBtn.addEventListener("click", function () {
  orderTable.style.display = "block";
  walletTable.style.display = "none";
  orderBtn.style.color = "#f5f5f5";
  orderBtn.style.backgroundColor = "hsl(14, 80%, 15%)";
  walletBtn.style.backgroundColor = "hsl(14, 25%, 72%)";
  walletBtn.style.color = "hsl(14, 80%, 15%)";
});

walletBtn.addEventListener("click", function () {
  walletTable.style.display = "block";
  orderTable.style.display = "none";
  walletBtn.style.color = "#f5f5f5";
  walletBtn.style.backgroundColor = "hsl(14, 80%, 15%)";
  orderBtn.style.backgroundColor = "hsl(14, 25%, 72%)";
  orderBtn.style.color = "hsl(14, 80%, 15%)";
});

const dropdownButton = document.getElementById("dropdownButton");
const dropdownMenu = document.getElementById("dropdownMenu");

dropdownButton.addEventListener("click", () => {
  if (dropdownMenu.style.display === "block") {
    dropdownMenu.style.display = "none";
  } else {
    dropdownMenu.style.display = "block";
  }
});




  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');

  // Start hidden on small screen
  if (window.innerWidth <= 768) {
    sidebar.style.display = 'none';
  }

  hamburger.addEventListener('click', () => {
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
      sidebar.style.display = 'flex';
    } else {
      sidebar.style.display = 'none';
    }
  });

        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        function closeSidebar() {
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
        }

        dropdownButton.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });

