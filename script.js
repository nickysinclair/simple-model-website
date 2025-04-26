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
    let deathProbabilityPercent = (deathProbability * 100).toFixed(1);

    // console.log(`GCS: ${gcs}`);
    // console.log(`VIS: ${vis}`);
    // console.log(`VIS Binarized: ${visBinarized}`);
    // console.log(`PEEP: ${peep}`);
    // console.log(`Pupillary Reflex Present: ${pupillaryReflex}`);
    // console.log(`Spontaneous Respiration: ${triggeringVentilator}`);
    // console.log(`Predicted Odds: ${deathOdds}`);
    // console.log(`Predicted Prob: ${deathProbability}`);
    // console.log(`Predicted Prob(%): ${deathProbabilityPercent}%`);

    return deathProbabilityPercent;
  }

  // Form submission handler
  $("#prediction-form").on("submit", function (event) {
    event.preventDefault();

    // Get input values
    let gcs = $("#GCS").val();
    let vis = $("#VIS").val();
    let peep = $("#PEEP").val();
    let pupillaryReflex = $("#pupillary-yes").prop("checked");
    let triggeringVentilator = $("#ventilator-yes").prop("checked");

    // Run the prediction model
    let prediction = predict(
      gcs,
      pupillaryReflex,
      peep,
      triggeringVentilator,
      vis
    );

    // Display the result
    $("#death-percentage").text(`${prediction}%`);
    $("#result-container").fadeIn();
  });
});
