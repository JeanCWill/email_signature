function textChangeListener(evt) {
  var id = evt.target.id;
  var text = evt.target.value;

  if (id == "name") {
    window.name = text;
  } else if (id == "phone") {
    window.phone = text;
  } else {
    window.email = text + "@softfocus.com.br";
  }

  loadModel(window.name, window.phone, window.email);
}

function redrawSignature(name, phone, email) {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");

  ctx.drawImage('model.png', 0, 0, canvas.width, canvas.height);


}

function saveFile() {
  window.open(document.querySelector('canvas').toDataURL());
}

function loadModel(name, phone, email) {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext("2d");

  var image = new Image();

  image.onload = function() {
    ctx.drawImage(image, 0, 0);

    ctx.font = '17px Montserrat';
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '3';

    if (name != null) {
      ctx.fillText(name, 200, 40);
    }

    ctx.font = '14px Montserrat';
    if (phone != null) {
      ctx.fillText(phone, 200, 80);
    }
    if (email != null) {
      ctx.fillText(email, 200, 100);
    }
  }

  image.src = 'image/model.png';
}

window.name = "";
window.email = "";
window.phone = "";

var inputName = $('#name');
var inputPhone = $('#phone');
var inputEmail = $('#email');
inputName.oninput = textChangeListener;
inputPhone.oninput = textChangeListener;
inputEmail.oninput = textChangeListener;

//$('#button').addEventListener('click', saveFile, false);
loadModel();

$(document).ready(function() {
  $('#phone').mask('(00) 00000-0000');
});
