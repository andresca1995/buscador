
let searchWrapper = document.querySelector('.input-wrapper');
let inputBox = searchWrapper.querySelector('input');
let suggBox = searchWrapper.querySelector('.autocom_box');

$(document).ready(function() {
  $(".searcher").click(function() {
     $(".container_all").toggle();
     document.getElementById("texto").focus();
  });
});
