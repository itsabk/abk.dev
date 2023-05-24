// Trail effect

// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
// of the mouse, set with a mousemove event listener below
var dots = [],
  mouse = {
    x: 0,
    y: 0,
  };

// The Dot object used to scaffold the dots
var Dot = function () {
  this.x = 0;
  this.y = 0;
  this.node = (function () {
    var n = document.createElement("div");
    n.className = "trail";
    document.body.appendChild(n);
    return n;
  })();
};
// The Dot.prototype.draw() method sets the position of
// the object's <div> node
Dot.prototype.draw = function () {
  this.node.style.left = this.x + "px";
  this.node.style.top = this.y + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 12; i++) {
  var d = new Dot();
  dots.push(d);
}

// This is the screen redraw function
function draw() {
  // Make sure the mouse position is set everytime
  // draw() is called.
  var x = mouse.x,
    y = mouse.y;

  // This loop is where all the 90s magic happens
  dots.forEach(function (dot, index, dots) {
    var nextDot = dots[index + 1] || dots[0];

    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * 0.6;
    y += (nextDot.y - dot.y) * 0.6;
  });
}

addEventListener("mousemove", function (event) {
  //event.preventDefault();
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

// animate() calls draw() then recursively calls itself
// everytime the screen repaints via requestAnimationFrame().
function animate() {
  draw();
  requestAnimationFrame(animate);
}

// And get it started by calling animate().
animate();

/*!
 * Start Bootstrap - Resume v6.0.2 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#sideNav",
  });
})(jQuery); // End of use strict

// --------------------------------------------------
$(".slider").each(function () {
  var $this = $(this);
  var $group = $this.find(".slide_group");
  var $slides = $this.find(".slide");
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;

  function move(newIndex) {
    var animateLeft, slideLeft;

    advance();

    if ($group.is(":animated") || currentIndex === newIndex) {
      return;
    }

    bulletArray[currentIndex].removeClass("active");
    bulletArray[newIndex].addClass("active");

    if (newIndex > currentIndex) {
      slideLeft = "100%";
      animateLeft = "-100%";
    } else {
      slideLeft = "-100%";
      animateLeft = "100%";
    }

    $slides.eq(newIndex).css({
      display: "block",
      left: slideLeft,
    });
    $group.animate(
      {
        left: animateLeft,
      },
      function () {
        $slides.eq(currentIndex).css({
          display: "none",
        });
        $slides.eq(newIndex).css({
          left: 0,
        });
        $group.css({
          left: 0,
        });
        currentIndex = newIndex;
      }
    );
  }

  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (currentIndex < $slides.length - 1) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 4000);
  }

  $(".next_btn").on("click", function () {
    if (currentIndex < $slides.length - 1) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });

  $(".previous_btn").on("click", function () {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(3);
    }
  });

  $.each($slides, function (index) {
    var $button = $('<a class="slide_btn">&bull;</a>');

    if (index === currentIndex) {
      $button.addClass("active");
    }
    $button
      .on("click", function () {
        move(index);
      })
      .appendTo(".slide_buttons");
    bulletArray.push($button);
  });

  advance();
});

// --------------------------------------------------
//  Greeting animation
// --------------------------------------------------
var greetings = [
  "Hi!",
  "مرحباً!",
  "¡Hola!",
  "Привет!",
  "你好!",
  "Hey!",
  "Bonjour!",
  "Hello!",
  "Ciao!",
  "こんにちは!",
  "안녕하세요!",
];
var introHeading = document.querySelector(".intro-heading");
var currentIndex = 0;
var currentGreeting = "";

function type() {
  if (currentIndex < currentGreeting.length) {
    introHeading.textContent += currentGreeting.charAt(currentIndex);
    currentIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (currentIndex > 0) {
    introHeading.textContent = currentGreeting.substring(0, currentIndex - 1);
    currentIndex--;
    setTimeout(erase, 50);
  } else {
    currentGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setTimeout(type, 500);
  }
}

setTimeout(type, 500);

// --------------------------------------------------
