function myFunction(x) {
  if (x.matches) {
    // If media query matches
    document.querySelector(".card-box").classList.remove("m-auto");
    document.querySelector(".content-container").classList.remove("container");
    document.querySelector(".fill-form").classList.add("flex-wrap");
    document.querySelector(".why-choose-box").classList.remove("w-50");
    document.querySelector(".form-box").classList.add("text-center");
    document.querySelector(".form-box").classList.remove("w-50");
  } else {
    document.querySelector(".card-box").classList.add("m-auto");
    document.querySelector(".content-container").classList.add("container");
    document.querySelector(".why-choose-box").classList.add("w-50");
    document.querySelector(".fill-form").classList.remove("flex-wrap");
    document.querySelector(".form-box").classList.remove("text-center");
    document.querySelector(".form-box").classList.add("w-50");
  }
}

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 900px)");

// Call listener function at run time
myFunction(x);

// Attach listener function on state changes
x.addEventListener("change", function () {
  myFunction(x);
});

const re = new RegExp("ab+c");
const send_button = document.querySelector(".btn");
const msg_box = document.querySelector(".sent-msg");
const person_name = document.querySelector("#name");
const email = document.querySelector("#email");
const comapany_name = document.querySelector("#comapany-name");

send_button.addEventListener("click", () => {
  if (
    person_name.value !== "" &&
    email.value !== "" &&
    comapany_name.value !== ""
  ) {
    if (validateEmail(email.value)) {
      send_data(person_name.value,email.value,comapany_name.value)
      msg_box.style.color = "green";
      msg_box.textContent = "Sent Successfully";
      person_name.value = "";
      comapany_name.value = "";
      email.value = "";
    } else {
      msg_box.style.color = "red";
      msg_box.textContent = "Invalid Email";
    }
  } else {
    msg_box.style.color = "red";
    msg_box.textContent = "All Feilds Required";
  }
});

function validateEmail(email) {
  // Regular expression for validating an email address
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function send_data(person_name,email,comapany_name) {
  console.log("data submission initiated")
  $.ajax({
    type: "POST",
    url: "servlet_1",
    data: { "name": person_name,"email":email,"company_name":comapany_name },
    dataType: "json",
    cache: false,
    success: function (data) {console.log("data submitted "+ data)},
  });
}
