function textChangeListener(evt) {
  var id = evt.target.id;
  var text = evt.target.value;

  if (id == "name") {
    window.name = text;
  } else if (id == "office") {
    window.office = text;
  } else if (id == "phone") {
    window.phone = text;
  } else {
    window.email = text + "@softfocus.com.br";
  }

  loadModel(window.name, window.office, window.phone, window.email);
}

function redrawSignature(name, office, phone, email) {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");

  ctx.drawImage('model.png', 0, 0, canvas.width, canvas.height);
}

function loadModel(name, office, phone, email) {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");

  var image = new Image();

  image.onload = function() {
    ctx.drawImage(image, 0, 0);

    ctx.font = '16px Montserrat';
    ctx.fillStyle = '#0091D2';
    ctx.lineWidth = '3';

    if (name != null) {
      ctx.fillText(name, 200, 30);
    }

    ctx.fillStyle = '#666666';
    ctx.font = '13px Montserrat';
    if (office != null) {
      ctx.fillText(office, 200, 45);
    }
    if (phone != null) {
      ctx.fillText(phone, 200, 85);
    }
    if (email != null) {
      ctx.fillText(email, 200, 100);
    }
  }

  image.src = 'image/model.png';
}

window.name = "";
window.office = "";
window.email = "";
window.phone = "";

loadModel();

$(document).ready(function() {
  $('#phone').mask('(00) 00000-0000');
});
