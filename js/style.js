
let searchWrapper = document.querySelector('.input-wrapper');
let inputBox = searchWrapper.querySelector('input');
let suggBox = searchWrapper.querySelector('.autocom_box');

$(document).ready(function() {
  /* var contentLastMarginLeft = 0; */
  $(".active").click(function() {
     $(".container_all").toggle();
     document.getElementById("texto").focus();
   /*  box.animate({
      "margin-left": newValue
    }, 2000); */
  });
});
