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

  //getting train time & frequency
  var trainTime = $("#train-time").val().trim();
  var frequency = $("#frequency").val().trim();
  
  //temporary variable to hold the train info
  var newTrain = {
    name: trainName,
    destination: destination,
    trainTime: trainTime, 
    frequency: frequency,
  };

  //adding the new train to the firebase database
  database.ref().push(newTrain);

  //clear the text boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");
 
})

// retrieving the lines from the firebase storage and console logging it 
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainNameI = childSnapshot.val().name;
  var destinationI = childSnapshot.val().destination;
  var trainTimeI = childSnapshot.val().trainTime;
  var frequencyI = childSnapshot.val().frequency;

  
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
  // First Time (pushed back 1 year to make sure it comes before current time)
  var trainTimeIConverted = moment(trainTimeI, "HH:mm").subtract(1, "years");
  console.log(trainTimeIConverted);

  // Difference between the times
  var diffTime = moment().diff(moment(trainTimeIConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequencyI;
  console.log(tRemainder); 

  // Minute Until Train
  var tMinutesTillTrain = frequencyI - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainNameI),
      $("<td>").text(destinationI),
      $("<td>").text(frequencyI),
      $("<td>").text(moment(nextTrain).format("HH:mm")),
      $("<td>").text(tMinutesTillTrain+ " minutes")
    );
  //Adding the new row to the table
  $("#train-table > tbody").append(newRow);

    });