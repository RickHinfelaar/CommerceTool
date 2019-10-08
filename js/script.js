$(function() {
  $('body').on('keypress', function(e) { // ALS ERGENS EEN KEYPRESS
    $(".outputBox:focus").on("input", function() { // ALS TIJDENS KEYPRESS INPUT VAN outpuBox:focus VERANDERD
      var outputValue = $('.outputBox:focus').val(); // GET VALUE OF ouptuBox:focus
      var outputReg = /[a-zA-Z!@#$%^&*€_(){};:'"<>|/]+/g.test(outputValue); // ALS INPUT DEZE TEKENS BEVAT = TRUE
        if (outputReg === false) { // ALS GEEN TEKENS DUS ALLEEN NUMMER
          $('.outputBox:focus').addClass('succes'); // ADD SUCCES CLASS
          $('.outputBox:focus').removeClass('outputBox'); // REMOVE BASE CLASS
          setTimeout(function(){ //WACHT 400ms
              $('.succes').addClass('outputBox'); // RE-ADD BASE CLASS
              $('.succes').removeClass('succes'); // REMOVE SUCCES CLASS
          }, 300); // 300ms
        } else if (outputReg === true){ //ALS WEL TEKENS OF LETTERS
          $('.outputBox:focus').addClass('failure'); // ADD FAIL CLASS
          $('.outputBox:focus').removeClass('outputBox'); // REMOVE BASE CLASS
          setTimeout(function(){ // WACHT 600ms
              $('.failure').addClass('outputBox'); // RE-ADD BASE CLASS
              $('.failure').removeClass('failure'); // REMOVE FAIL CLASS
          }, 300); // 300ms
       } // END ELSE TEKENS
     }); // END outputBox INPUT CHANGE
   }); // END GLOBAL KEYPRESS

  // CURRENCY FORMAT (usage: formatterCur.format(target); )
  const formatterCur = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR'
  });
  // DECIMAL FORMAT (usage: formatterDecimal.format(target); )
  const formatterDecimal = new Intl.NumberFormat('nl-NL', {
    style: 'decimal',
    currency: 'EUR'
  });

// SLIDERS //
  var interval; // GLOBAL INTERVAL
  // BEZOEKERS SLIDER
  $( "#bezoekersSlider" ).slider({
    min: 0, // MINIMUM VALUE
    range: "min", // START SLIDER FROM MIN
    max: 1000000, // MAXIMUM VALUE
    value: 500000, // STARTING POINT
    animate:"fast", // ANIMATION SPEED
    step: 100, // STEP
    orientation: "horizontal", // ORIENTATION
    slide: function( event, bezoekers ) { // WHEN SLIDER IS SLIDED
      $("#bezoekersAantal").val(bezoekers.value.toLocaleString("nl")); // VERANDER VALUE VAN INPUT FIELD
        calculate(); // VOER CALCULATE FUNCTIE UIT
    } // END SLIDING
  }); // END SLIDER

  //MIN BUTTON
  $("#decreaseBezoekers").on('touchstart mousedown',function(e) { //ALS MIN BUTTON PRESSED
    interval = setInterval(function() { //HOLD BUTTON = INTERVAL 80ms
    var sliderBezoekers = $("#bezoekersSlider").slider("value"); //var = VALUE VAN SLIDER
    sliderBezoekers = sliderBezoekers - 100; //BEZOEKERS - 10000
    if (sliderBezoekers < 1000100 && sliderBezoekers > -100) {  //ALS NIET HOGER DAN .. EN LAGER DAN ..
      $("#bezoekersSlider").slider("value", sliderBezoekers);  //VERANDER SLIDER VALUE
      $("#bezoekersAantal").val(sliderBezoekers.toLocaleString("nl")); //VERANDER INPUT VALUE
      calculate();
    }},80); // 80ms
  }); // END MOUSEDOWN
  $("#decreaseBezoekers").on('touchend mouseup',function(e) { //ALS NIET MEER INGEDRUKT
    clearInterval(interval)}); //STOP
  $("#decreaseBezoekers").on('mouseout',function(e) { //ALS NIET MEER HOVERT
    clearInterval(interval)}); //STOP

  //PLUS BUTTON
  $("#increaseBezoekers").on('touchstart mousedown',function(e) { //ALS PLUS BUTTON PRESSED
    interval = setInterval(function() { //HOLD BUTTON = INTERVAL 80ms
      var sliderBezoekers = $("#bezoekersSlider").slider("value"); //var = VALUE VAN SLIDER
      sliderBezoekers = sliderBezoekers + 100; //BEZOEKERS + 100
      if (sliderBezoekers < 1000100 && sliderBezoekers > -100) { //ALS NIET HOGER DAN .. EN LAGER DAN ..
        $("#bezoekersSlider").slider("value", sliderBezoekers); //VERANDER SLIDER VALUE
        $("#bezoekersAantal").val(sliderBezoekers.toLocaleString("nl")); //VERANDER INPUT VALUE
        calculate();
    }},80); // 80ms
  }); // END MOUSEDOWN
  $("#increaseBezoekers").on('touchend mouseup',function(e) { //ALS NIET MEER INGEDRUKT
    clearInterval(interval)}); // STOP
  $("#increaseBezoekers").on('mouseout',function(e) { //ALS NIET MEER HOVERT
    clearInterval(interval)}); // STOP


  // BEGIN VALUES
  $("#bezoekersAantal").val($("#bezoekersSlider").slider("value").toLocaleString("nl")); //VERANDER INPUT VALUE AT BEGIN
  $("#bezoekersAantal").on("input", function() { // ALS INPUT VERANDERD
    var bezoekersValue = this.value.substring(0); // GET BEZOEKERSVALUE
    $("#bezoekersSlider").slider("value", parseInt(bezoekersValue.replace(/\./g,''))); //VARANDER SLIDER VALUE NAAR DE INPUT VALUE
    calculate();
  });

  //CONVERSIE SLIDER
  $( "#conversieSlider" ).slider({
    min: 0,
    range: "min",
    max: 50,
    value: 10,
    animate:"fast",
    step: 0.1,
    orientation: "horizontal",
    slide: function( event, conversie ) {
        $("#conversieAantal").val(conversie.value);
        calculate();
    }
  });

  //MIN BUTTON
  $("#decreaseConversie").on('touchstart mousedown',function(e) {
    interval = setInterval(function() {
      var sliderConversie = $("#conversieSlider").slider("value");
      sliderConversie = sliderConversie - 0.1;
      if (sliderConversie < 50.1 && sliderConversie > -0.1) {
        $("#conversieSlider").slider("value", sliderConversie);
        var sliderConversieRounded = Math.round( sliderConversie * 10 ) / 10;
        $("#conversieAantal").val(sliderConversieRounded);
        calculate();
      }},80);
    });
  $("#decreaseConversie").on('touchend mouseup',function(e) {
    clearInterval(interval)});
  $("#decreaseConversie").on('mouseout',function(e) {
    clearInterval(interval)});

  //PLUS BUTTON
  $("#increaseConversie").on('touchstart mousedown',function(e) {
    interval = setInterval(function() {
    var sliderConversie = $("#conversieSlider").slider("value");
    sliderConversie = sliderConversie + 0.1;
    if (sliderConversie < 50.1 && sliderConversie > -0.1) {
      $("#conversieSlider").slider("value", sliderConversie);
      var sliderConversieRounded = Math.round( sliderConversie * 10 ) / 10;
      $("#conversieAantal").val((sliderConversieRounded));
      calculate();
    }},80);
  });
  $("#increaseConversie").on('touchend mouseup',function(e) {
    clearInterval(interval)});
  $("#increaseConversie").on('mouseout',function(e) {
    clearInterval(interval)});

  // BEGIN VALUES
  $( "#conversieAantal" ).val($( "#conversieSlider" ).slider("value"));
    $("#conversieAantal").on("input", function() {
    var conversieValue = this.value.substring(0);
    $("#conversieSlider").slider("value", parseFloat(conversieValue.replace(/\,/g, '.')));
    calculate();
  });


  //GOW SLIDER
  $( "#orderwaardeSlider" ).slider({
    min: 0,
    range: "min",
    max: 500,
    value: 200,
    animate:"fast",
    step: 5,
    orientation: "horizontal",
    slide: function( event, orderwaarde ) {
        $("#orderwaardeAantal").val(orderwaarde.value);
        calculate();
    }
  });

  //MIN BUTTON
  $("#decreaseOrderwaarde").on('touchstart mousedown',function(e) {
      interval = setInterval(function() {
      var sliderOrderwaarde = $("#orderwaardeSlider").slider("value");
      sliderOrderwaarde = sliderOrderwaarde - 5;
      if (sliderOrderwaarde < 505 && sliderOrderwaarde > -5) {
        $("#orderwaardeSlider").slider("value", sliderOrderwaarde);
        $("#orderwaardeAantal").val(sliderOrderwaarde);
        calculate();
      }},80);
  });
  $("#decreaseOrderwaarde").on('touchend mouseup',function(e) {
      clearInterval(interval)});
  $("#decreaseOrderwaarde").on('mouseout',function(e) {
      clearInterval(interval)});

  //PLUS BUTTON
  $("#increaseOrderwaarde").on('touchstart mousedown',function(e) {
      interval = setInterval(function() {
      var sliderOrderwaarde = $("#orderwaardeSlider").slider("value");
      sliderOrderwaarde = sliderOrderwaarde + 5;
      if (sliderOrderwaarde < 505 && sliderOrderwaarde > -5) {
        $("#orderwaardeSlider").slider("value", sliderOrderwaarde);
        $("#orderwaardeAantal").val(sliderOrderwaarde);
        calculate();
      }},80);
  });
  $("#increaseOrderwaarde").on('touchend mouseup',function(e) {
      clearInterval(interval)});
  $("#increaseOrderwaarde").on('mouseout',function(e) {
      clearInterval(interval)});


  //BEGIN VALUES
  $( "#orderwaardeAantal" ).val($( "#orderwaardeSlider" ).slider("value"));
  $( "#orderwaardeAantal" ).on("input", function() { // ALS INPUT VERANDERD
    var orderwaardeValue = this.value.substring(0);
    $("#orderwaardeSlider").slider("value", parseFloat(orderwaardeValue.replace(/\,/g, '.')));
    calculate();
  });


  calculate();
  //CALCULATE OMZET
  function calculate() {
    var bezoekersValueLocale = $('#bezoekersAantal').val(); //bezoekers aantal
    var bezoekersValue =  bezoekersValueLocale.replace(/\./g,'')//REPLACE . WITH ''

    var conversieValueProcent = $('#conversieAantal').val(); //conversie procent
    var conversieValue = conversieValueProcent; //.replace(/\%/g, ''); //REMOVES PROCENT (disabled)
    var conversieValueComma = conversieValue.replace(/\,/g, '.'); //REPLACE , WITH .
    var conversieValuePercentage = (conversieValueComma/100); //procent naar getal

    var orderwaardeValueEuro = $('#orderwaardeAantal').val(); //orderwaarde getal
    var orderwaardeValueComma = orderwaardeValueEuro; //.replace(/\€/g, ''); //REMOVES EURO SIGN (disabled)
    var orderwaardeValue = orderwaardeValueComma.replace(/\,/g, '.'); //COMMA NAAR PUNT

    var omzet = (bezoekersValue * conversieValuePercentage * orderwaardeValue); //omzet calulatie

    if (hasValue("#savedOmzet")) { //check of savedOmzet al is ingevuld
      omzetNieuw = omzet; //zo ja, omzetniew
      var omzetOudeuro = $('#savedOmzet').val();
      var omzetOudPunt = omzetOudeuro.substring(2, omzetOudeuro.length);
      var omzetOud =  omzetOudPunt.replace(/\./g,'')
      var omzetVerschil = (omzetNieuw - omzetOud);

      var percentage = (omzetNieuw/ omzetOud) * 100 - 100; //bereken percentage - 100
      percentageFormatted = Math.round(percentage);

      $('#verschilPercentage').removeAttr('hidden');
      $('#verschilPercentage').val(percentageFormatted + " %");

      //COLOR CHANGE ON PERCENT
      if ((percentageFormatted > 0) && (percentageFormatted < 100)) {
      $("#verschilOmzet").css('color', percentageToRGB(percentageFormatted));
    }
    else if (percentageFormatted >= 100){
      $("#verschilOmzet").css('color', 'rgb(0, 250, 0)');
    } else if (percentageFormatted <= 0){
      $("#verschilOmzet").css('color', '#ffc6c6');
    }

      var omzetVerschilFormatted = formatterCur.format(omzetVerschil);
      var omzetVerschilFormattedArr = omzetVerschilFormatted.split(',');
      //$('#verschilOmzet').val(omzetVerschilFormattedArr[0]);

      $('#verschilOmzet').val(omzetVerschilFormattedArr[0] + "  (" + percentageFormatted + "%)");

  } else { // savedOmzet niet ingevuld?
      omzetOud = omzet; //zo nee, omzetoudW
    }
    var omzetFormatted = formatterCur.format(omzet);
    var omzetFormattedArr = omzetFormatted.split(',');
    $('#omzetInput').val(omzetFormattedArr[0]);
  }; // END FUNCTION CALCULATE
}); // END MAIN FUNCTION

function saveOmzet() {
  $('#verschilOmzet').val(null);
  var savedOmzet = $('#omzetInput').val();
  $('#savedOmzet').val(savedOmzet);

  var bezoekersValueLocale = $('#bezoekersAantal').val(); //bezoekers aantal
  var bezoekersValue = bezoekersValueLocale.toLocaleString("en-US");

  var conversieValueProcent = $('#conversieAantal').val(); //conversie procent
  var conversieValue = conversieValueProcent; //.replace(/\%/g, ''); //REMOVES PROCENT SIGN
  var conversieValueComma = conversieValue.replace(/\,/g, '.');
  var conversieValuePercentage = (conversieValueComma/100); //procent naar getal

  var orderwaardeValueEuro = $('#orderwaardeAantal').val(); //orderwaarde getal
  var orderwaardeValueComma = orderwaardeValueEuro; //.replace(/\€/g, ''); //REMOVES EURO SIGN
  var orderwaardeValue = orderwaardeValueComma.replace(/\,/g, '.'); //COMMA NAAR PUNT

  var omzet = (bezoekersValue * conversieValuePercentage * orderwaardeValue); //omzet calulatie
  omzetOud = omzet;
  $('#verschilPercentage').val(null);
  $('#verschilOmzet').val(null);
  $("#resultBoxPercent").css('background', 'black');
}; // END FUNCTION SAVEOMZET


function percentageToRGB(procent) {
  procent = procent + 160;
  return 'rgb(0,' + procent + ', 0)';
}

function Expand(obj){
  if (!obj.savesize) obj.savesize=obj.size;
  obj.size=Math.max(obj.savesize,obj.value.length + 3);
}

// FUNCTION TO CHECK IF INPUT HAS VALUE
function hasValue(elem) {
  return $(elem).filter(function() { return $(this).val(); }).length > 0;
}
