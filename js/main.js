(() => {
    //console.log("IIFE Fired");
    //variables
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
  
    const infoBoxes = [
      {
        title: "Noise-cancelling",
        text: "Experience a new level of audio clarity with our cutting-edge noise cancelling earbuds. Designed to immerse you in your music, podcasts, and calls, our earbuds utilize advanced noise cancellation technology to block out ambient sounds, allowing you to focus on what matters most.",
        image: "../images/noise_cancel.png"
      },  

      {
        title: "Max 72hr Battery",
        text: "Enjoy uninterrupted audio bliss with our earbuds boasting an impressive maximum battery life of 72 hours. Whether you're on a long-haul flight, a weekend getaway, or a marathon work session, these earbuds will keep pace. ",
        image: "../images/battery.png"
      },  

      {
        title: "2X Faster Chip",
        text: "Our earphones have a cutting-edge 2X faster processor for lightning-fast performance. The flawless audio playback and quick response times provided by this potent processor result in a more immersive and comfortable listening experience.",
        image: "../images/2x_faster_chip.png"
      },
      
      {
        title: "Quick Charger",
        text: "With our quick charger, you'll spend less time waiting and more time enjoying your favorite music. Designed for efficiency, this charger delivers swift and reliable power replenishment, ensuring your earbuds are always ready for action.",
        image: "../images/quick_charger.png"
      }
    ]

    // Handles loading the events for <model-viewer>'s slotted progress bar
    const onProgress = (event) => {
        const progressBar = event.target.querySelector('.progress-bar');
        const updatingBar = event.target.querySelector('.update-bar');
        updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
        if (event.detail.totalProgress === 1) {
        progressBar.classList.add('hide');
        event.target.removeEventListener('progress', onProgress);
        } else {
        progressBar.classList.remove('hide');
        }
    };
    document.querySelector('model-viewer').addEventListener('progress', onProgress);
  
    //functions
    function modelLoaded() {
      //console.log(hotspots);
      hotspots.forEach(hotspot => {
        hotspot.style.display = "block";
      });
    }
  
    function loadInfo() {
      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index+1}`); //index start from 0
        console.log(selected);
  
        let title = document.createElement("h2");
        title.textContent = infoBox.title;
  
        let text = document.createElement("p");
        text.textContent = infoBox.text;
  
        let image = document.createElement("img");
        image.src = infoBox.image;
  
        // console.log(infoBox.title);
        // console.log(infoBox.text);
  
        selected.appendChild(title);
        selected.appendChild(text);
        selected.appendChild(image);
  
      })
    }
  
    loadInfo();
  
    function showInfo() {
      //console.log(this.slot);
      //console.log(`#${this.slot}`);
      //since the slot value matches the id value I can use the slot value as a selector to get to the div I want.
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      //console.log(this.slot);
      //console.log(`#${this.slot}`);
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    //Event Listener
    model.addEventListener("load", modelLoaded);
  
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseover", showInfo);
      hotspot.addEventListener("mouseout", hideInfo);
    });
  })();
  
  // In this version, the event listeners use regular functions instead of arrow functions, so the "this" keyword inside the event listeners will refer to the DOM element that triggered the event.