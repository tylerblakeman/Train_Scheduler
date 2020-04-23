var firebaseConfig = {
  apiKey: "AIzaSyC6SQNHBATC0j3sjPBeHQaOiWYnNfI9gFU",
  authDomain: "trainscheduler-3934e.firebaseapp.com",
  databaseURL: "https://trainscheduler-3934e.firebaseio.com",
  projectId: "trainscheduler-3934e",
  storageBucket: "trainscheduler-3934e.appspot.com",
  messagingSenderId: "178213500719",
  appId: "1:178213500719:web:843e91fdc55482630ad3da",
  measurementId: "G-MWQ0G32T0B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();

//submit will pull all of the info from the form
$("#submit").click(function(){
  event.preventDefault();

  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();

//using hours and minutes 
  var trainHours = $("#train-hours").val().trim();
  var trainMins = $("#train-minutes").val().trim();
  var frequency = $("#frequency").val().trim();
  
  //temporary variable to hold the train info
  var newTrain = {
    name: trainName,
    destination: destination,
    trainHours: trainHours,
    trainMins: trainMins, 
    frequency: frequency,
  };

  //adding the new train to the firebase database
  database.ref().push(newTrain);

  //clear the text boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-hours").val("");
  $("#train-minutes").val("");
  $("#frequency").val("");
 
})

// retrieving the lines from the firebase storage and console logging it 
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainNameI = childSnapshot.val().name;
  var destinationI = childSnapshot.val().destination;
  var trainHoursI = childSnapshot.val().trainHours;
  var trainMinsI = childSnapshot.val().trainMins;
  var frequencyI = childSnapshot.val().frequency;

  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  console.log(hours);
  console.log(minutes);
  
  //how do I get the times to work right???? 
  trainMinsI = (+trainMinsI+(+trainHoursI*60))-288;
  console.error("The time possibly?"+trainMinsI)
  time_convert(trainMinsI);
  
  
  
  function time_convert(num)
 { 
  var hours = Math.floor(num / 60);  
  var minutes = num % 60;
  return console.log(hours + ":" + minutes);         
}

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainNameI),
      $("<td>").text(destinationI),
      $("<td>").text(frequencyI),
      $("<td>").text("next arrival"),
      $("<td>").text("minutes away")
    );
  //Adding the new row to the table
  $("#train-table > tbody").append(newRow);

    });