document.addEventListener('DOMContentLoaded', function() {
  const galleryContainer = document.querySelector(".gallery");
  let galleryItems = galleryContainer.querySelectorAll(".gallery-item");
  const indicator = document.querySelector(".indicator");

  const defaultItemFlex = "0 1 3px";
  const hoverItemFlex = "1 1 400px";

  function updateGalleryItems() {
      galleryItems.forEach((item) => {
          let flex = defaultItemFlex;

          if (item.isHovered) {
              flex = hoverItemFlex;
          }

          item.style.flex = flex;
      });
  }

  function resetGalleryHoverStates() {
      galleryItems.forEach((item) => {
          item.isHovered = false;
      });
  }

  galleryItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
          resetGalleryHoverStates();
          item.isHovered = true;
          updateGalleryItems();
      });
  });

  galleryContainer.addEventListener("mousemove", (e) => {
      indicator.style.left = `${e.clientX - galleryContainer.getBoundingClientRect().left}px`;

      let hoveredItem = [...galleryItems].find(item =>
          e.clientX > item.getBoundingClientRect().left &&
          e.clientX < item.getBoundingClientRect().right
      );

      if (hoveredItem) {
          indicator.textContent = hoveredItem.getAttribute('data-description');
      } else {
          indicator.textContent = '';
      }
  });

  const imageUploadInput = document.getElementById('imageUpload');

  imageUploadInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
              const imgDataUrl = reader.result;
              document.getElementById('inputModal').style.display = 'block';
              window.imgDataUrl = imgDataUrl; // Temporarily store the data URL to use it later
          }
      }
  });

  window.addImageToGallery = function() {
      const city = document.getElementById('city').value;
      const country = document.getElementById('country').value;
      const description = city + ', ' + country;

      const newItem = document.createElement('div');
      newItem.classList.add('gallery-item');
      newItem.innerHTML = `
          <img src="${window.imgDataUrl}" alt="${description}">
        
      `;
      newItem.setAttribute('data-description', description);
      galleryContainer.appendChild(newItem);

      // Reset input fields and hide the modal
      document.getElementById('city').value = '';
      document.getElementById('country').value = '';
      document.getElementById('inputModal').style.display = 'none';

      // Update the gallery items NodeList and reset hover states
      galleryItems = galleryContainer.querySelectorAll(".gallery-item");
      resetGalleryHoverStates();
      updateGalleryItems();

      // Add mouseenter event to new gallery item
      newItem.addEventListener("mouseenter", () => {
          resetGalleryHoverStates();
          newItem.isHovered = true;
          updateGalleryItems();
      });
  }
});


document.addEventListener('mousemove', function(e) {
  const cursor = document.getElementById('custom-cursor');
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});