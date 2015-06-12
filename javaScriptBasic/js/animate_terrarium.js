(function() {
  "use strict";

  var active = null;

  function Animated(terrarium) {
    this.terrarium = terrarium;
    var outer = document.body,
        doc = outer.ownerDocument,
        node = outer.appendChild(doc.createElement("div"));

    // set style for node
    node.style.cssText = "position: relative; width: intrinsic;";

    // create tag pre
    this.pre = node.appendChild(doc.createElement("pre"));
    this.pre.appendChild(doc.createTextNode(terrarium.toString()));

    // create button
    this.button = node.appendChild(doc.createElement("div"));
    this.button.style.cssText = "position: absolute; bottom: 8px; right: -4.5em; color: white; font-family: tahoma, arial; " +
      "background: blue; cursor: pointer; border-radius: 10px; font-size: 90%; width: 4em; text-align: center;";
    this.button.innerHTML = "Stop";

    // event click button
    var self = this;
    this.button.addEventListener("click", function() {
      self.clicked();
    });
    this.disabled = false;


    if (active) active.disable();
    active = this;
    this.interval = setInterval(function() {
      self.tick();
    }, 333);
  }

  Animated.prototype.clicked = function() {
    if (this.disabled) return;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.button.innerHTML = "Start";
    } else {
      var self = this;
      this.interval = setInterval(function() {
        self.tick();
      }, 333);
      this.button.innerHTML = "Stop";
    }
  };

  Animated.prototype.tick = function() {
    this.terrarium.turn();
    this.pre.removeChild(this.pre.firstChild);
    this.pre.appendChild(this.pre.ownerDocument.createTextNode(this.terrarium.toString()));
  };

  Animated.prototype.disable = function() {
    this.disabled = true;
    clearInterval(this.interval);
    this.button.innerHTML = "Disabled";
    this.button.style.color = "red";
  };

  window.animateTerrarium = function(terrarium) {
    new Animated(terrarium);
  };
})();