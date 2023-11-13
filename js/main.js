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
    };

    for(let i = 0; i < frameCount; i++) { 
        const img = new Image();
        img.src = `images/metalpod_${(i + 1).toString().padStart(5, '0')}.jpg`; 
        images.push(img);
    };

    gsap.to(buds, {
        frame: 726,
        snap: "frame", 
        scrollTrigger: {
            trigger: ".vid-con",
            pin: true,
            scrub: 1, 
            markers: false,
            start: "top top",
            end: "bottom top"
        },
        onUpdate: render
    });

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

    gsap.utils.toArray(".product-bx").forEach((productBx, i) => {
      ScrollTrigger.create({
        trigger: productBx,
        start: "top top",
        pin: true,
        pinSpacing: false,
        markers: false,
        anticipatePin: 1
      });
    });

    ScrollTrigger.create({
      trigger: "#sub-title-3",
      start: "top top",
      pin: true,
      markers: false,
      pinSpacing: false,
    });

    // X-Ray

    //Mobile-tablet version
    const tl = gsap.timeline();
    tl.from("#xray-2", {xPercent: -100, opacity: 0.5})
  
    ScrollTrigger.create({
      animation: tl,
      trigger: "#mobile-tablet-view",
      start: "top top",
      end: "bottom bottom-=50%",
      scrub: true,
      pin: true,
      pinSpacing: false,
      markers: false,
      anticipatePin: 1
    });

    //Desktop version
  
    (function(){
      "use strict";
  
    var imageCon = document.querySelector('#imageCon'),
        drag = document.querySelector('.image-drag'),
        left = document.querySelector('.image-left'),
        dragging = false,
        min = 0,
        max = imageCon.offsetWidth;
        //The HTMLElement.offsetWidth read-only property returns the layout width of an element. 
    
    function onDown() {
      dragging = true;
    }
    
    function onUp() {
      dragging = false;
    }
    
    function onMove(event) {
      if(dragging===true) {
        var x = event.clientX - imageCon.getBoundingClientRect().left;
        //The MouseEvent.clientX read-only property provides the horizontal coordinate within the application's client area at which the event occurred
        //The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
        //X-coordinate, relative to the viewport origin, of the left of the rectangle box. Read only
        console.log(event.clientX);
        console.log(imageCon.getBoundingClientRect().left);
      //need logic to keep slider in box
        if(x < min) { //if x less than 0
          x = min;    //set x = 0
        }
      else if(x > max) { //otherwise if x is greater than 900
          x = max-4; //set x to equal the max width minus 2 (width of slider)
        }
        drag.style.left = x + 'px';
        left.style.width = x + 'px';
      }
    }
    
    drag.addEventListener('mousedown', onDown, false); 
    //add listener to actual drag div, if user clicks on it
    //drag.addEventListener('touchstart', onDown);
    document.body.addEventListener('mouseup', onUp, false);
    //document.body.addEventListener('mo', onUp);
    document.body.addEventListener('mousemove', onMove, false);
    //document.body.addEventListener('touchmove', onMove);
    
    })();

    // Without drag-bar version In-complete
    // const trackerElement = document.getElementById("imageCon");
    // const topImage  =  document.getElementById("image-left");

    // function trackMousePosition(theEvent) {
    //   const trackerDOMRect = trackerElement.getBoundingClientRect();
    //   console.log(trackerDOMRect.left);

    //   let mousePointerPos;
    //   mousePointerPos = theEvent.clientX - trackerDOMRect.left;
    //   console.log(mousePointerPos);
    //   let imageWrapperWidth =  mousePointerPos/10;
    //   console.log(imageWrapperWidth + '%');
    //   topImage.style.width = imageWrapperWidth + '%';
    // };
    // trackerElement.addEventListener('mousemove', trackMousePosition);

    // 3D Model-viewer
    const model = document.querySelector("#model");
    const hotspots = document.querySelectorAll(".Hotspot");
  
    const infoBoxes = [
      {
        title: "Noise-cancelling",
        text: "Experience a new level of audio clarity with our cutting-edge noise cancelling earbuds.",
        image: "../images/noise_cancel.png"
      },  

      {
        title: "Max 72hr Battery",
        text: "Enjoy uninterrupted audio bliss with our earbuds boasting an impressive maximum battery life of 72 hours.",
        image: "../images/battery.png"
      },  

      {
        title: "2X Faster Chip",
        text: "Our earphones have a cutting-edge 2X faster processor for lightning-fast performance.",
        image: "../images/2x_faster_chip.png"
      },
      
      {
        title: "Quick Charger",
        text: "With our quick charger, you'll spend less time waiting and more time enjoying your favorite music.",
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
  
  