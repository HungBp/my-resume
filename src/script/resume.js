// click on resume's avatar image
document.querySelector(".section__img-cover").addEventListener("click",
() => {document.querySelector(".pop-up").style.visibility = "visible";});

// close pop-up
document.querySelector(".pop-up__view__control-btn--close").addEventListener("click",
() => {document.querySelector(".pop-up").style.visibility = "hidden";});

// change image in popup
{
  const imgSelect = document.querySelectorAll(".pop-up__selection__img-cover__img");
  let imgs = ["assets/gallery-1.jpeg", "assets/gallery-2.jpg", "assets/gallery-3.jpeg", "assets/gallery-4.jpg", "assets/gallery-5.jpg", "assets/074680.jpg"];
  let mainAvatar = document.querySelector(".section__img-cover__img");
  let mainPopupImg = document.querySelector(".pop-up__view__img");
  // :with button
  document.querySelector(".pop-up__view__control-btn--prev").addEventListener("click", navigator);
  document.querySelector(".pop-up__view__control-btn--forw").addEventListener("click", navigator);
  function navigator() {
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
  document.querySelector(".pop-up__selection").addEventListener("click",
  () => {
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
