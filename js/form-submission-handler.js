
function validEmail(email) { // see:
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
// get all data in form and return object
function getFormData() {
  var elements = document.getElementById("gform").elements; // all form elements
  var fields = Object.keys(elements).map(function(k) {
    if(elements[k].name !== undefined) {
      return elements[k].name;
    }
  }).filter(function(item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k){
    data[k] = elements[k].value;
    if(elements[k].type === "checkbox"){
      data[k] = elements[k].checked;
    }
  });
  console.log(data);
  return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  event.preventDefault();           // we are submitting via xhr below
  var data = getFormData();         // get the values submitted in the form
  console.log("passei aqui")
  if( !data.email && !data.phone) {   // if email is not valid show error
    console.log("To no primeiro log")
    // document.getElementById('email-invalid').style.display = 'block';
    document.getElementById('email-phone-none').style.display = 'block';
    document.getElementById('email-invalid').style.display = 'none';
    return false;
  }
  else if(data.email && !validEmail(data.email)){
    console.log("To no segundo log")
    // document.getElementById('email-invalid').style.display = 'block';
    document.getElementById('email-phone-none').style.display = 'none';
    document.getElementById('email-invalid').style.display = 'block';
    return false;
  }
   else {
    console.log("To no terceiro log")
    document.getElementById('gform').style.display = 'none'; // hide form
    document.getElementById('sending').style.display = 'block'; // hide form

    var url = event.target.action;  //
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        console.log( xhr.status, xhr.statusText )
        console.log(xhr.responseText);
        document.getElementById('gform').style.display = 'none'; // hide form
        document.getElementById('sending').style.display = 'none'; // hide form
        document.getElementById('thankyou_message').style.display = 'block';
        return;
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&')
    xhr.send(encoded);
  }
}
function loaded() {
  console.log('contact form submission handler loaded successfully');
  // bind to the submit event of our form
  var form = document.getElementById('gform');
  form.addEventListener("submit", handleFormSubmit, false);
};
document.addEventListener('DOMContentLoaded', loaded, false);
