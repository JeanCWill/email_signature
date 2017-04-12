var config = {
  apiKey: "AIzaSyAOEIuRDyJkmjM-b3mso_ezLvr-N0swDR0",
  authDomain: "email-signature-52eac.firebaseapp.com",
  databaseURL: "https://email-signature-52eac.firebaseio.com",
  projectId: "email-signature-52eac",
  storageBucket: "email-signature-52eac.appspot.com",
  messagingSenderId: "663635393168"
};
firebase.initializeApp(config);

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
  image.crossOrigin = "anonymous";

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

  image.src = 'https://raw.githubusercontent.com/softfocusbr/email_signature/master/image/model.png';
}

function showLoginFirebase() {
  $("#login").show();
}

function hideLoginFirebase() {
  $("#login").hide();
}

function loginFirebase() {
  firebase.auth().signInWithEmailAndPassword($("#emailFirebase").val(), $("#passwordFirebase").val()).then(function(user) {
    hideLoginFirebase();
    sendImageToFirebase();
  }).catch(function(error) {
    console.log(error);
    $("#error").html("<strong>Erro!</strong> Falha ao autenticar usuário.");
    $("#error").show();
  });
}

function sendImageToFirebase() {
  var canvas = document.querySelector('canvas');
  var fileName = window.email;

  console.log(fileName);

  var storageRef = firebase.storage().ref();
  var mountainsRef = storageRef.child(fileName + '.jpg');
  var mountainImagesRef = storageRef.child('images/' + fileName + '.jpg');

  $("#loading").show();

  if (canvas.toBlob) {
    canvas.toBlob(
      function(blob) {
        var uploadTask = storageRef.child('images/' + fileName).put(blob);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Publicação a ' + progress + '% done');

            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                console.log('Publicação pausada.');
                break;
              case firebase.storage.TaskState.RUNNING:
                console.log('Publicando!!!');
                break;
            }
          }, function(error) {
            console.log(error);
            alert("Erro ao publicar imagem.")
          }, function() {
            var downloadURL = uploadTask.snapshot.downloadURL;
            createTextAreaUrl(downloadURL);
            $("#loading").hide();
            $("#success").html("<strong>Sucesso!</strong> Imagem enviada para o Firebase.");
            $("#success").show();
          });
      },
      'image/jpeg'
    );
  }
}

function hideAlert() {
  $("#success").hide();
  $("#error").hide();
}

function createTextAreaUrl(url) {
  var textArea = document.createElement("textarea");
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '0.1em';
  textArea.style.height = '0.1em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = url;

  document.body.appendChild(textArea);
}

function copyUrlToClipboard() {
  var textArea = document.querySelector("textarea");
  textArea.select();

  try {
    var successful = document.execCommand('copy');

    if (successful) {
      $("#success").html("<strong>Sucesso!</strong> Endereço da imagem copiado.");
      $("#success").show();
    } else {
      $("#error").html("<strong>Erro!</strong> Falha ao copiar a imagem.");
      $("#error").show();
    }
  } catch (err) {
    console.log(err);
    $("#error").html("<strong>Erro!</strong> Falha ao copiar a imagem.");
    $("#error").show();
  }
  document.body.removeChild(textArea);
}

window.name = "";
window.office = "";
window.email = "";
window.phone = "";

loadModel();

$(document).ready(function() {
  $('#phone').mask('(00) 00000-0000');
});
