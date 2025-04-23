$(document).ready(function () {
  function predict(gcs, pupillaryReflex, peep, triggeringVentilator, vis) {
    if (vis > 5) {
      var visBinarized = 1;
    } else {
      var visBinarized = 0;
    }

    let deathOdds = Math.exp(
      2.12 -
        0.323 * gcs +
        0.181 * peep +
        2.445 * visBinarized -
        0.8 * pupillaryReflex -
        0.874 * triggeringVentilator
    );

    let deathProbability = deathOdds / (1 + deathOdds);

    if (deathProbability > 0.5) {
      var prediction = "Death";
    } else {
      var prediction = "Not Death";
    }

    let predictionTexts = [
      `Predicted Outcome: ${prediction}`,
      `Predicted Probability of Death: ${(deathProbability * 100).toFixed(1)}%`,
    ];

    return predictionTexts;
  }

  // Form submission handler
  $("#prediction-form").on("submit", function (event) {
    event.preventDefault();

    // Get input values
    let gcs = $("#GCS").val();
    let vis = $("#VIS").val();
    let pupillaryReflex = $("#pupillary-reflex").is(":checked");
    console.log(pupillaryReflex * 0.8);
    let peep = $("#PEEP").is(":checked");
    let triggeringVentilator = $("#triggering-ventilator").is(":checked");

    // Run the prediction model
    let prediction = predict(
      gcs,
      pupillaryReflex,
      peep,
      triggeringVentilator,
      vis
    );

    // Display the result
    $("#death-prediction").text(prediction[0]);
    $("#death-probability").text(prediction[1]);
  });
});
