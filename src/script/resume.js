// click on resume's avatar
{
  const container = document.querySelector(".resume .pop-up");
  const popup = document.querySelector(".resume .pop-up__frame");
  let closePopupRef;
  let dotTimer;

  document.querySelector(".section__img-cover").addEventListener("click", () => {
    clearInterval(dotTimer);
    sessionStorage.setItem("dot", "dotTimer");
    document.querySelector(".section__img-cover__dot").style.opacity = "";
    popupVisibleAnimation(container, popup);
  });

  document.querySelector(".resume .pop-up__view__control-btn--close").addEventListener("click", () => {
    popupHiddenAnimation(container, popup);
  });
  
  // dot effect
  if (!sessionStorage.getItem("dot")) {
    dotTimer = setInterval(() => {
      document.querySelector(".section__img-cover__dot").style.opacity =
      (document.querySelector(".section__img-cover__dot").style.opacity == 0.3) ? 1 : 0.3;
    }, 1000);
  }
}

// change avatar in popup
{
  const imgSelect = document.querySelectorAll(".pop-up__selection__img-cover__img");
  let imgs = ["assets/gallery-1.jpeg", "assets/gallery-2.jpg", "assets/gallery-3.jpeg", "assets/gallery-4.jpg", "assets/gallery-5.jpg", "assets/074680.jpg"];
  let mainAvatar = document.querySelector(".section__img-cover__img");
  let mainPopupImg = document.querySelector(".pop-up__view__img");
  // :with button
  document.querySelector(".resume .pop-up__view__control-btn--prev").addEventListener("click", (event) => {navigator(event)});
  document.querySelector(".resume .pop-up__view__control-btn--forw").addEventListener("click", (event) => {navigator(event)});
  function navigator(event) {
    let temp = [];
    // check if click event is fire on previous or forward button
    if (event.target.classList.contains("pop-up__view__control-btn--prev")) {
      temp = imgs.shift();
      imgs.push(temp);
    } else {
      temp = imgs.pop();
      imgs.unshift(temp);
    }
  imgDisplay();
  }
  // :with selection
  document.querySelector(".pop-up__selection").addEventListener("click", (event) => {
    // look for postion of image that click on
    for (let imgPos in imgSelect) {
      if (imgSelect[imgPos] == event.target) {
        const temp = imgs[imgs.length - 1];
        imgs[imgs.length - 1] = imgs[imgPos];
        imgs[imgPos] = temp;
      }
    }
    imgDisplay();
  });

  // display image function
  function imgDisplay() {
    for (let i = 0; i < imgSelect.length; i++) {
      imgSelect[i].src = imgs[i];
    }
    mainAvatar.src = mainPopupImg.src = imgs[imgs.length - 1];
  }
}

// interest function
{
  const icons = document.querySelectorAll(".interest__icon");
  const container = document.querySelector(".interest .pop-up");
  const popups = document.querySelectorAll(".interest .pop-up__frame");
  const closeBtns = document.querySelectorAll(".interest .pop-up__view__control-btn--close");
  const urlForYtb = "https://youtube.googleapis.com/youtube/v3/videos?part=player&chart=mostPopular&maxResults=5&regionCode=VN&videoCategoryId=10&key=AIzaSyCS-qoQOIhTHrK9mv3k3NiGcXmGNpOnlQU";
  let ytbVideosEmbed = [];
  let noVideo = 0;
  // first element is empty string use to empty video source
  ytbVideosEmbed[noVideo] = [""];

  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", () => {
      popupVisibleAnimation(container, popups[i])
      if (i == (icons.length -1)) {
        noVideo = scrVideo(++noVideo);
      }
    });
    closeBtns[i].addEventListener("click", () => {
      popupHiddenAnimation(container, popups[i])
      if (i == (icons.length -1)) {
        noVideo = 0;
        noVideo = scrVideo(noVideo);
      }
    });
  }
  
  document.querySelector(".interest .pop-up__view__control-btn--forw").addEventListener("click", () => {
    noVideo = scrVideo(++noVideo);
  });

  document.querySelector(".interest .pop-up__view__control-btn--prev").addEventListener("click", () => {
    noVideo = scrVideo(--noVideo);
  });

  // fetch most popular music video on youtube
  fetch(urlForYtb)
    .then(response => response.json())
    .then(data => {
      for (let item of data.items) {
        let embedHtml = item.player.embedHtml;
        embedHtml = embedHtml.slice(embedHtml.search(`src=\"`) + `src=\"`.length);
        embedHtml = embedHtml.slice(0,embedHtml.search(`" `));
        ytbVideosEmbed = [...ytbVideosEmbed, embedHtml];
      }
    });

  function scrVideo(no) {
    if (no < 1) {
      no = ytbVideosEmbed.length - 1;
    } else if (no > (ytbVideosEmbed.length - 1)) {
      no = 1;
    }
    document.querySelector(".interest3__ytb__videos__frame").setAttribute("src", ytbVideosEmbed[no]);
    document.querySelector(".interest3__ytb__videos__no span").textContent = no;
    return no;
  };
}


// scroll effect
{
  let oldScroll = 0;
  let isScrolling = false;
  window.addEventListener("scroll", scrollEffect);
  window.addEventListener("hashchange", scrollByAnchor);
  window.addEventListener("load", scrollEffect);
  
  // scroll by physical device like mouse, kbd...
  function scrollEffect() {
    const newScroll = window.scrollY;
    const pages = document.querySelectorAll(".pages");
    const zHeight = 0.4;
    const navs = document.querySelectorAll(".navigator__menu__text");
    const anchorNavs = document.querySelectorAll(".navigator__menu__text--anchor");
    
    for (let page = 0; page < pages.length; page++) {
      // y = (1-x)/(1-z) | x = ratio (0 to 1) between current scroll position and height of element | z = ratio (0 to 1) between scroll position that starting to be blurry and height of element
      pages[page].style.opacity = (1 - (1.0 * (newScroll - pages[page].offsetTop) / pages[page].offsetHeight)) / (1 - zHeight);

      // spy scroll on navigator
      if ((window.scrollY >= (pages[page].offsetTop -  pages[page].offsetHeight / 2)) && (window.scrollY < (pages[page].offsetTop + pages[page].offsetHeight / 2))) {
        navs[page].classList.add("navigator__menu__text--active");
        anchorNavs[page].classList.add("navigator__menu__text--active");
      } else {
        navs[page].classList.remove("navigator__menu__text--active");
        anchorNavs[page].classList.remove("navigator__menu__text--active");
      }
    }
    
    if (isScrolling == false) {
      for (let page = 0; page < pages.length; page++) {
        if ((newScroll - oldScroll) > 0) {
          if (newScroll > (pages[page].offsetTop + (zHeight * pages[page].offsetHeight))) {
            if (newScroll <= (pages[page].offsetTop + pages[page].offsetHeight)) {
              scrollPositioning(pages[page + 1]);
            }
          }
        } else {
          if (newScroll < (pages[page].offsetTop - (zHeight * pages[page].offsetHeight))) {
            if (newScroll > pages[page - 1].offsetTop) {
              scrollPositioning(pages[page - 1]);
            }
          }
        }
      }
    }
    
    oldScroll = newScroll;
  }
  
  // scroll by clicking on anchor tag
  function scrollByAnchor() {
    // ref: https://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-r
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    scrollPositioning(null);
  }

  function scrollPositioning(element) {
    isScrolling = true;
    setTimeout(() => {
      if (element != null) {element.scrollIntoView();}
      isScrolling = false;
    }, 500);
  }
}

// navigator
{
  const navIcon = document.querySelector(".navigator__icon");
  const navMenu = document.querySelector(".navigator__menu");
  let statusNav = false;

  navIcon.addEventListener("click", () => {
    statusNav = !statusNav;
    navIcon.style.transform = statusNav == true ? "rotate(0.25turn)" : "rotate(0turn)";
    navMenu.style.maxHeight = statusNav == true ? "200px" : "0px";
  });
}


// popup animation
function popupVisibleAnimation(container, popup) {
  container.style.visibility = "visible";
  popup.style.left = "50%";
  popup.style.opacity = "1";
  document.querySelector("body").style.overflow = "hidden";
  setTimeout(() => {
    window.addEventListener("click", closePopupRef = event => closePopup(event, container, popup));
  }, 100);
}
function popupHiddenAnimation(container, popup) {
  popup.style.left = "-100%";
  popup.style.opacity = "0";
  window.removeEventListener("click", closePopupRef);
  // delay for disappear pop-up animation before hiding container
  setTimeout(() => {
    container.style.visibility = "hidden";
    document.querySelector("body").style.overflow = "auto";
  }, 500);
}
// click outside to close popup
function closePopup(event, container, popup) {
  (popup.style.opacity == 1) && !popup.contains(event.target) && popupHiddenAnimation(container, popup);
}