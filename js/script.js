Vue.use(VueInputAutowidth)
// CURRENCY FORMAT (usage: formatterCur.format(target); )
  const formatterCur = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  });
  
var data = {
    introText: 'Vul uw gegevens in, sla de waarden op en kijk vervolgens wat de impact is als de conversie of de gemiddelde order-waarde verandert.',
    endText: `Hoe verhoog je conversie?
              Hoe verhoog je GOW?
              Neem contact met ons op`,
    bezoekers: 500000,
    conversie: 10,
    orderwaarde: 200,
    orderwaardeFormat: "",
    huidigeOmzet: 0,
    berekendeOmzet: 0,
    berekendeOmzetFormat: "",
    targetName: "",
    verschilOmzet: 0,
    verschilPercentage: 0,
    savedCheck: false,
    interval: false,
}

var vm;
$(function() {
  var vm = new Vue({
    el: '#app',
    data: data,
    methods: {
        save: function() {
          this.savedCheck = true;
          this.berekendeOmzet = this.huidigeOmzet;
          this.berekendeOmzetFormat = formatterCur.format(this.huidigeOmzet);
        },
        mouseDownDecrement: function(target, step) {
          if(!this.interval){
          	this.interval = setInterval(() =>
              this[target] -= step, 50);
          };
        },
        mouseDownIncrement: function(target, step) {
          if(!this.interval){
            this.interval = setInterval(() =>
            this[target] += step, 50);
          };
        },
        mouseUp: function() {
          clearInterval(this.interval)
          this.interval = false
        },
      },

    computed: {
        percentageToRGB: function(procent) {
          procent = procent + 200;
          return 'rgb(0,' + procent + ', 0)';
        },
        omzet: function() {
          this.huidigeOmzet = (this.bezoekers * (this.conversie/100) * this.orderwaarde);
          return formatterCur.format(this.huidigeOmzet);
        },
        verschil: function() {
          if (this.savedCheck) {
            this.verschilOmzet = parseInt(this.huidigeOmzet - this.berekendeOmzet);
            this.verschilPercentage = parseInt(((this.huidigeOmzet / this.berekendeOmzet) * 100)- 100);
            return formatterCur.format(this.verschilOmzet) + ' (' + this.verschilPercentage + ' %)';
          };
        },
      },

    watch: {
        bezoekers: function(val) {
          $("#bezoekersSlider").slider("value", val);
        },
        conversie: function(val) {
          $("#conversieSlider").slider("value", val);
        },
        orderwaarde: function(val) {
          $("#orderwaardeSlider").slider("value", val);
        },
      },
  });

$( "#bezoekersSlider" ).slider({
    min: 0, // MINIMUM VALUE
    range: "min", // START SLIDER FROM MIN
    max: 1000000, // MAXIMUM VALUE
    value: vm.$data.bezoekers, // STARTING POINT
    animate:"fast", // ANIMATION SPEED
    step: 100, // STEP
    orientation: "horizontal", // ORIENTATION
    slide: function( event, bezoekers ) { // WHEN SLIDER IS SLIDED
      parseInt(vm.$data.bezoekers = bezoekers.value);
    } // END SLIDING
    }); // END SLIDER

$( "#conversieSlider" ).slider({
    min: 0, // MINIMUM VALUE
    range: "min", // START SLIDER FROM MIN
    max: 50, // MAXIMUM VALUE
    value: vm.$data.conversie, // STARTING POINT
    animate:"fast", // ANIMATION SPEED
    step: 0.1, // STEP
    orientation: "horizontal", // ORIENTATION
    slide: function( event, conversie){ // WHEN SLIDER IS SLIDED
      parseInt(vm.$data.conversie = conversie.value);
    } // END SLIDING
  }); // END SLIDER

$( "#orderwaardeSlider" ).slider({
    min: 0, // MINIMUM VALUE
    range: "min", // START SLIDER FROM MIN
    max: 500, // MAXIMUM VALUE
    value: vm.$data.orderwaarde, // STARTING POINT
    animate:"fast", // ANIMATION SPEED
    step: 1, // STEP
    orientation: "horizontal", // ORIENTATION
    slide: function( event, orderwaarde) {
        parseInt(vm.$data.orderwaarde = orderwaarde.value);
    }// WHEN SLIDER IS SLIDED
  }); // END SLIDER
}); // END MAIN FUNCTION

Vue.component('minsvg', {
  template: `<svg>
      <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
   </svg>`
 });

 Vue.component('plussvg', {
   template: `<svg>
     <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>`
});
