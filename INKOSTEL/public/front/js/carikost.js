  // navBar
  const navBar = document.querySelector("nav"),
  menuBtn = document.querySelectorAll(".menu-icon"),
  overlay = document.querySelector(".overlay");
  console.log(navBar, menuBtn, overlay);

  menuBtn.forEach(menuBtn => {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
  });

  overlay.addEventListener("click", () => {
  navBar.classList.remove("open");
  });

  // Data card
      let cardData = [];

      // Event listener for search input
      document.getElementById('searchInput').addEventListener('keyup', (e) => {
      const searchData = e.target.value.toLowerCase();
      const filteredData = cardData.filter((item) => {
        return (
          item.title.toLowerCase().includes(searchData)
        );
      });
      displayItems(filteredData);
    });
    
    // Function to display filtered items
    function displayItems(data) {
      const cardContainer = document.querySelector("#conmain .row");
      cardContainer.innerHTML = ""; // Clear the existing items
    
      data.forEach((item) => {
        createCard(item);
      });
    }

    // Ambil semua tombol filter
    const filterButtons = document.querySelectorAll('.filter-button .btn');

  // Tambahkan event listener pada setiap tombol filter
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterType = button.getAttribute('data-filter'); 

      // Lakukan pemfilteran berdasarkan jenis filter
      const filteredData = cardData.filter(item => {
        if (filterType === 'semua') {
          return true; 
        } else if (filterType === 'putra') {
          return item.title.includes('Putra'); 
        } else if (filterType === 'putri') {
          return item.title.includes('Putri'); 
        } else if (filterType === 'termurah') {
          return parseInt(item.cardText1) <= 10; 
        }else if (filterType === 'terdekat') {
          return parseInt(item.cardText2) < 1000; 
        }
      });
      // Tampilkan data yang telah difilter
      displayItems(filteredData);
    });
  });


    // Fungsi untuk membuat dan menambahkan kartu ke dalam elemen kontainer
    function createCard(data) {
      const cardContainer = document.querySelector("#conmain .row");
      const cardCol = document.createElement("div");
      cardCol.classList.add("col-md-3", "mb-4");

      const card = document.createElement("div");
      card.classList.add("card");

      const carousel = document.createElement("div");
      carousel.classList.add("border-image");
      carousel.id = data.carouselId;

      const carouselInner = document.createElement("div");
      carouselInner.classList.add("carousel", "inner");

      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item", "active");

      const img = document.createElement("img");
      img.src = data.imageSrc;
      img.classList.add("d-block", "w-100");
      img.alt = "";

      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
      carousel.appendChild(carouselInner);

      // agar ketika click gambar langsung berpindah
      img.addEventListener("click", () => {
          window.location.href = 'detailKos.html' ; 
      });

      card.appendChild(carousel);

      // untuk membuat element 
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = data.title;

      const cardText1 = document.createElement("p");
      cardText1.classList.add("card-text1");
      cardText1.textContent = data.cardText1;

      const cardText2 = document.createElement("p");
      cardText2.classList.add("card-text2");
      const cardText2Value = parseInt(data.cardText2);
    
      // untuk mengetahui terdekat
      if (cardText2Value >= 1000) {
        cardText2.textContent = (cardText2Value / 1000) + " KM";
      } else {
        cardText2.textContent = cardText2Value + " Meter";
      }

      // untuk icon bookmark 
      const bookmarkIcon = document.createElement("i");
      bookmarkIcon.classList.add("bi", "bi-bookmark");
      bookmarkIcon.style.position = "relative";
      bookmarkIcon.style.fontSize = "30px";
      bookmarkIcon.style.color = "#41EBC6"; 
      bookmarkIcon.style.marginLeft = "180px";
      bookmarkIcon.style.top = "-100px";
      
      
      // agar berganti ketika icon bookmark diclick
      bookmarkIcon.addEventListener("click", () => {
          if (bookmarkIcon.classList.contains("bi-bookmark")) {
              bookmarkIcon.classList.remove("bi-bookmark");
              bookmarkIcon.classList.add("bi-bookmark-fill");
          } else {
              bookmarkIcon.classList.remove("bi-bookmark-fill");
              bookmarkIcon.classList.add("bi-bookmark");
          }
      });
      
      // untuk menambahkan ke dalam cardBody
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText1);
      cardBody.appendChild(cardText2);
      cardBody.appendChild(bookmarkIcon);

      // untuk menggabungkan semua ke card
      card.appendChild(cardBody);

      // untuk mengelompokan card ke kolom
      cardCol.appendChild(card);
      cardContainer.appendChild(cardCol);
    }

    // untuk menjalankan fungsi
    cardData.forEach(createCard);

    // Fetch data dari endpoint Laravel
    fetch('/getKosData')
    .then(response => response.json())
    .then(data => {
      cardData = data; // Isi cardData dengan data dari server
      displayItems(cardData); // Tampilkan data pertama kali
    })
    .catch(error => console.error('Error fetching data:', error));




  

