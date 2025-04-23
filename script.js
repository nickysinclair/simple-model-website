$(document).ready(function () {
  function predict(GCS, pupillaryReflex, PEEP, triggeringVentilator, VIS) {
    if (VIS > 5) {
      var VIS_binarized = 1;
    } else {
      var VIS_binarized = 0;
    }

    let deathOdds = Math.exp(
      2.12 -
        0.323 * GCS +
        0.181 * PEEP +
        2.445 * VIS_binarized -
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
    let GCS = $("#GCS").val();
    let VIS = $("#VIS").val();
    let pupillaryReflex = $("#pupillary-reflex").is(":checked");
    let PEEP = $("#PEEP").is(":checked");
    let triggeringVentilator = $("#triggering-ventilator").is(":checked");

    // Run the prediction model
    let prediction = predict(
      GCS,
      pupillaryReflex,
      PEEP,
      triggeringVentilator,
      VIS
    );

    // Display the result
    $("#death-prediction").text(prediction[0]);
    $("#death-probability").text(prediction[1]);
  });
});
