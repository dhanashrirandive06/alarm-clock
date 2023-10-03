//Current time for clock face
let current_time = "";
// for current time am and pm value
let am_pm_value = "AM";

// array to store new alarm
const current_set_alarms = [];

//currentDate function gives time every second
const currentDate = () => {
  const current = new Date();

  //get separate value of hours, minutes and seconds from current time
  let current_hours = current.getHours();
  am_pm_value = current_hours >= 12 ? "PM" : "AM";
  current_hours = current_hours >= 10 ? current_hours : "0" + current_hours;
  let current_minutes = current.getMinutes();
  current_minutes =
    current_minutes < 10 ? "0" + current_minutes : current_minutes;
  let current_seconds = current.getSeconds();
  current_seconds =
    current_seconds < 10 ? "0" + current_seconds : current_seconds;

  //Set Current Time
  current_time =
    current_hours +
    ":" +
    current_minutes +
    ":" +
    current_seconds +
    " " +
    am_pm_value;

  // display time in clock face
  document.querySelector("#clock-face_heading").innerHTML =
    current_hours +
    "<span>:</span>" +
    current_minutes +
    "<span>:</span>" +
    current_seconds +
    " " +
    am_pm_value;
};

//call current date function every second
setInterval(currentDate, 1000);

//Show alarms
const showAlarm = () => {
  //clear container before appending child div to show updated data
  document.querySelector(".alarm-list_container").innerHTML = "";

  //check if is there any alarm set in array or not?
  if (current_set_alarms.length > 0) {
    current_set_alarms.forEach((element, index) => {
      //create html element to show set alarm
      let div1 = document.createElement("div");
      div1.className = "alarm_row";
      let div2 = document.createElement("div");
      div2.className = "alarm_row_input";
      div2.innerText = element;
      let button = document.createElement("button");
      button.id = index;
      button.className = "delete-alarm";
      button.innerText = "DELETE";
      button.onclick = () => deleteAlarm(index);

      div1.appendChild(div2);
      div1.appendChild(button);

      //append html element to alarm container
      document.querySelector(".alarm-list_container").appendChild(div1);
    });
  } else {
    //if no alarm set yet show no alarm set
    let h3 = document.createElement("h3");
    h3.className = "alarm-not-set-heading";
    h3.innerText = "No Alarms Set.";
    document.querySelector(".alarm-list_container").appendChild(h3);
  }
};

//Delete Alarm
const deleteAlarm = (index) => {
  current_set_alarms.splice(index, 1);
  //call show alarm function after deleting alarm
  showAlarm();
};

//Set Alarm Function
const set_alarm = () => {
  // get all the values from input
  let hours = document.querySelector("#set_hours").value;
  let minutes = document.querySelector("#set_minutes").value;
  let seconds = document.querySelector("#set_seconds").value;
  let amPm = document.querySelector("#set_am_pm").value;

  //validate input empty or not
  if (hours === "00" && minutes === "00" && seconds === "00") {
    alert("Please fill the input first.");
  } else {
    //if not empty then store in array and show on screen
    let alarm_time = hours + ":" + minutes + ":" + seconds + " " + amPm;
    current_set_alarms.push(alarm_time);
    document.querySelector("#set_hours").value = "00";
    document.querySelector("#set_minutes").value = "00";
    document.querySelector("#set_seconds").value = "00";
    document.querySelector("#set_am_pm").value = "AM";
    showAlarm();
  }
};

// check which alarm is about to expire
setInterval(() => {
  current_set_alarms.forEach((element) => {
    if (element === current_time) {
      let index = current_set_alarms.indexOf(element);
      current_set_alarms.splice(index, 1);
      alert("Alarm done");
      showAlarm();
    }
  });
}, 1000);

showAlarm();
