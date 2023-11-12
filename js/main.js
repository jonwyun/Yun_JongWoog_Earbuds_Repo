(() => {

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    const canvas = document.querySelector("#earpod-vid");
    const context = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;
    const frameCount = 727; 
    // const framesToShowBeforeFade = 5;
    const images = []; 

    const buds = {
        frame: 0
    }

    for(let i = 0; i < frameCount; i++) { 
        const img = new Image();
        img.src = `images/metalpod_${(i + 1).toString().padStart(5, '0')}.jpg`; 
        images.push(img);
    }

    gsap.to(buds, {
        frame: 726,
        snap: "frame", 
        scrollTrigger: {
            trigger: "#earpod-vid",
            pin: ".content",
            scrub: 1, 
            markers: true,
            start: "top top",
            end: "bottom top"
        },
        onUpdate: render
    })

    images[0].addEventListener("onload", render);

    function render() {
        console.log(images[buds.frame]);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[buds.frame], 0, 0);
    }

    // gsap.to("#brand-name", {
    //   opacity: 0,
    //   duration: 0.5,
    //   delay: 0,  
    //   scrollTrigger: {
    //       trigger: "#earpod-vid",
    //       start: "top top",  
    //       end: () => `bottom -=${framesToShowBeforeFade * (frameCount - 1)}`, 
    //       scrub: 1,
    //       onUpdate: (self) => {
    //         const frameIndex = Math.floor((self.progress * (frameCount - 1)) + 0.5);
    //         if (frameIndex >= framesToShowBeforeFade) {
    //               console.log("brand name disappeared");
    //           }
    //       },
    //   },
    // });
    

    // 3D Model-viewer
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
  
        selected.appendChild(title);
        selected.appendChild(text);
        selected.appendChild(image);
  
      })
    }
  
    loadInfo();
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
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
  
  