var scrollEventHandler = function()
{
  window.scroll(0, window.pageYOffset)
}

window.addEventListener("scroll", scrollEventHandler, false);
     window.addEventListener('load', function() {
          var maybePreventPullToRefresh = false;
          var lastTouchY = 0;
          var touchstartHandler = function(e) {
            if (e.touches.length != 1) return;
            lastTouchY = e.touches[0].clientY;
            // Pull-to-refresh will only trigger if the scroll begins when the
            // document's Y offset is zero.
            maybePreventPullToRefresh =
                window.pageYOffset == 0;
          }

          var touchmoveHandler = function(e) {
            var touchY = e.touches[0].clientY;
            var touchYDelta = touchY - lastTouchY;
            lastTouchY = touchY;

            if (maybePreventPullToRefresh) {
              // To suppress pull-to-refresh it is sufficient to preventDefault the
              // first overscrolling touchmove.
              maybePreventPullToRefresh = false;
              if (touchYDelta > 0) {
                e.preventDefault();
                return;
              }
            }
          }

          document.addEventListener('touchstart', touchstartHandler, false);
          document.addEventListener('touchmove', touchmoveHandler, false);      });
     
function opencurse(curso, id) {
  $('body').addClass('modal-active');
    $('.modal').html('<div class="wrappercall"><nav class="sidenav"><div id="cargandovideollamada" style=" width:100%: position: relative; margin-top:30%;"><i class="fa fa-spinner fa-spin"></i><br>Cargando<div id="whichroom">'+curso+'</div></div></nav><section class="contentcall"><div class="headeroom"><div class="Close" id="clear"><span class="top" style="margin-top:0;"></span><span class="bot"></span></div><div class="controls"><label style="position: fixed;right: 25px;top: 190px;"><input type="range" id="width" min="1" max="100" step="1" value="1" class="range blue"></label><label class="js-sidenav" id="buttoncall"><i class="fa fa-video-camera" style="padding-left:5px;"></i></label><label id="buttoncolor"><input type="color" id="color" value="white"></label></div></div><canvas id="c"></canvas></section></div><div id="dd" class="dropdown-chat"><div class="front"><span class="fa fa-comments"></span></div><div class="back"> <div class="chat"> <ul> <li class="other"> <a class="user" href="#"><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/toffeenutdesign/128.jpg"/></a> <div class="date"> 2 minutos atrás </div><div class="message blur"> <div class="hider"> <span>Click to read</span> </div><p> Itaque quod et dolore accusantium. Labore aut similique ab voluptas rerum quia. Reprehenderit voluptas doloribus ut nam tenetur ipsam. </p></div></li><li class="other"> <a class="user" href="#"><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/toffeenutdesign/128.jpg"/></a> <div class="date"> 5 minutos atrás </div><div class="message"> <div class="hider"> <span>Click to read</span> </div><p> Modi ratione aliquid non. Et porro deserunt illum sed velit necessitatibus. Quis fuga et et fugit consequuntur. Et veritatis fugiat veniam pariatur maxime iusto aperiam. </p></div></li><li class="you"> <a class="user" href="#"><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"/></a> <div class="date"> 7 minutos atrás </div><div class="message"> <div class="hider"> <span>Click to read</span> </div><p> Provident impedit atque nemo culpa et modi molestiae. Error non dolorum voluptas non a. Molestiae et nobis nisi sed. </p></div></li><li class="other"> <a class="user" href="#"><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/toffeenutdesign/128.jpg"/></a> <div class="date"> 8 minutos atrás </div><div class="message"> <div class="hider"> <span>Click to read</span> </div><p> Id vel ducimus perferendis fuga excepturi nulla. Dolores dolores amet et laborum facilis. Officia magni ut non autem et qui incidunt. Qui similique fugit vero porro qui cupiditate. </p></div></li><li class="you"> <a class="user" href="#"><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"/></a> <div class="date"> 10 minutos atrás </div><div class="message"> <div class="hider"> <span>Click to read</span> </div><p> Provident impedit atque nemo culpa et modi molestiae. Error non dolorum voluptas non a. Molestiae et nobis nisi sed. </p></div></li><li class="you"> <a class="user" href="#"><img alt="" src="https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"/></a> <div class="date"> 10 minutos atrás </div><div class="message"> <div class="hider"> <span>Click para ver</span> </div><p> Est ut at eum sed perferendis ea hic. Tempora perspiciatis magnam aspernatur explicabo ea. Sint atque quod. </p></div></li></ul> </div></div></div>');
    
  var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = 'assets/main.js';
    s.id = 'pizarron';
    $("body").append(s);
    var roomsocket = document.getElementById('pizarron')

      var buttonId = $('.button').attr('id');
    $('#modal-container').removeAttr('class').addClass(buttonId);

  /*  $.get("https://room.cafe:3000/call/math", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        $('#videollamada').html(data);
    }); */
};

/*$('#modal-container').click(function () {
    $(this).addClass('out');
    $('body').removeClass('modal-active');
});*/

/*background*/
(function(window, document) {

  // Removed animation reliance on GSAP, just vanilla JS remains.
  // Perhaps factory this to allow alternative filters too?
  
  const dataAttr = "data-filter";
  const cls = "-clicked";
  const filters = document.querySelectorAll("[" + dataAttr + "]");
  let i = filters.length;
  
  // Dimensions of ripple image displacement map (512px square),
  // Plus a little to overshoot perhaps.
  // A higher value is required to accomodate diagonals.
  const span = 512;

  // Increment dimensions on each animation loop, 
  // consider as animation speed, best: 1 - 8
  const step = 2;

  // Scale from 0 - 30 - not so large that you can tell the map edges
  const maxScale = 30;


  function ripple_filter (feImage, feDisplacementMap, size, x, y) {

    feImage.setAttribute("width", size);
    feImage.setAttribute("height", size);
    feImage.setAttribute("x", x - (size / 2));
    feImage.setAttribute("y", y - (size / 2));
    feDisplacementMap.setAttribute("scale", maxScale - (size / 20));

    if (size < span) {
      requestAnimationFrame(
        function() {
          ripple_filter (feImage, feDisplacementMap, size + step, x, y);
        }
      );
    }

  }

  function removeStyles (filter) {

    // remove visually active filters
    const btnOns = document.querySelectorAll("[style*='#" + filter.id + "']");
    let i = btnOns.length;
    while (i--) {
      
      // removes the visual ripple effect 
      // but doesn't stop the filters values changing
      btnOns[i].removeAttribute("style");
    }

  }
  
  function classAnimation(btn) {
    // A separate CSS animation controlled via class
    btn.classList.add(cls);
    setTimeout(function () {
      requestAnimationFrame(
        function () {
          btn.classList.remove(cls);
        }
      );
    }, 300);
  }

  function displace_this (e) {

    const btn = e.target;
    
    // Defined here to save refactoring in each animation loop
    const filtername = btn.getAttribute(dataAttr);
    const filter = document.getElementById(filtername);

    if (filter) {

      removeStyles(filter);
      
      //console.log(btn.width)
      
      // Use object centre if click-point is out of range (keyboard-friendly)
      const offsetX = e.offsetX >= 0 ? e.offsetX : btn.offsetWidth / 2;
      const offsetY = e.offsetY >= 0 ? e.offsetY : btn.offsetHeight / 2;
      
      const feImage = filter.querySelector("feImage");
      const feDisplacementMap = filter.querySelector("feDisplacementMap");

      if (feImage && feDisplacementMap) {
        btn.style.filter = "url('#" + filter.id + "')";
        ripple_filter(feImage, feDisplacementMap, 0, offsetX, offsetY);
      }
      
      classAnimation(btn);
    }
  }

  while (i--) {
    filters[i].addEventListener("click", displace_this, false);
  }

}(window, document));
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Constants
 */
var TWO_PI = Math.PI * 2;
/**
 * Application Class
 */

var Application = function () {
    /**
     * Application constructor
     */

    function Application() {
        var _this = this;

        _classCallCheck(this, Application);

        this.canvas = document.getElementById("agua");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        this.circleContainers = [];

        //Resize listener for the canvas to fill browser window dynamically
        window.addEventListener('resize', function () {
            return _this.resizeCanvas();
        }, false);
    }

    /**
     * Simple resize function. Reinitializes everything on the canvas while changing the width/height
     */

    Application.prototype.resizeCanvas = function resizeCanvas() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        //Empty the previous container and fill it again with new CircleContainer objects
        this.circleContainers = [];
        this.initializeCircleContainers();
    };

    /**
     * Create a number of CircleContainer objects based on the numberOfContainers variable
     * @return void
     */

    Application.prototype.initializeCircleContainers = function initializeCircleContainers() {
        for (var x = 0; x < this.width + 100; x += 100) {
            for (var y = 0; y < this.height + 100; y += 100) {
                //Initialize a new instance of the CircleContainer class
                var circleContainer = new CircleContainer(this.context, x, y);

                //Let the CircleContainer initialize it's children
                circleContainer.initializeCircles();

                //Add the container to our array of CircleContainer objects
                this.circleContainers.push(circleContainer);
            }
        }
    };

    /**
     * Updates the application and every child of the application
     * @return void
     */

    Application.prototype.update = function update() {
        for (var i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].update();
        }
    };

    /**
     * Renders the application and every child of the application
     * @return void
     */

    Application.prototype.render = function render() {
        //Clear the entire canvas every render
        this.context.clearRect(0, 0, this.width, this.height);

        //Trigger the render function on every child element
        for (var i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].render();
        }
    };

    /**
     * Update and render the application at least 60 times a second
     * @return void
     */

    Application.prototype.loop = function loop() {
        var _this2 = this;

        this.update();
        this.render();

        window.requestAnimationFrame(function () {
            return _this2.loop();
        });
    };

    return Application;
}();

/**
 * CircleContainer Class
 */

var CircleContainer = function () {
    /**
     * CircleContainer constructor
     * @param context - The context from the canvas object of the Application
     * @param x
     * @param y
     */

    function CircleContainer(context, x, y) {
        _classCallCheck(this, CircleContainer);

        this.context = context;
        this.position = { x: x, y: y };

        this.numberOfCircles = 19;
        this.circles = [];

        this.baseRadius = 20;
        this.bounceRadius = 150;
        this.singleSlice = TWO_PI / this.numberOfCircles;
    }

    /**
     * Create a number of Circle objects based on the numberOfCircles variable
     * @return void
     */

    CircleContainer.prototype.initializeCircles = function initializeCircles() {
        for (var i = 0; i < this.numberOfCircles; i++) {
            this.circles.push(new Circle(this.position.x, this.position.y + Math.random(), this.baseRadius, this.bounceRadius, i * this.singleSlice));
        }
    };

    /**
     * Try to update the application at least 60 times a second
     * @return void
     */

    CircleContainer.prototype.update = function update() {
        for (var i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].update(this.context);
        }
    };

    /**
     * Try to render the application at least 60 times a second
     * @return void
     */

    CircleContainer.prototype.render = function render() {
        for (var i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].render(this.context);
        }
    };

    return CircleContainer;
}();

/**
 * Circle Class
 */

var Circle = function () {
    /**
     * Circle constructor
     * @param x - The horizontal position of this circle
     * @param y - The vertical position of this circle
     * @param baseRadius
     * @param bounceRadius
     * @param angleCircle
     */

    function Circle(x, y, baseRadius, bounceRadius, angleCircle) {
        _classCallCheck(this, Circle);

        this.basePosition = { x: x, y: y };
        this.position = { x: x, y: y };
        this.speed = 0.01;
        this.baseSize = 10;
        this.size = 10;
        this.angle = x + y;
        this.baseRadius = baseRadius;
        this.bounceRadius = bounceRadius;
        this.angleCircle = angleCircle;
    }

    /**
     * Update the position of this object
     * @return void
     */

    Circle.prototype.update = function update() {
        this.position.x = this.basePosition.x + Math.cos(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.position.y = this.basePosition.y + Math.sin(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.size = Math.cos(this.angle) * 8 + this.baseSize;

        this.angle += this.speed;
    };

    /**
     * Renders this Circle object on the canvas
     * @param context - The context from the canvas object of the Application
     * @return void
     */

    Circle.prototype.render = function render(context) {
        context.fillStyle = "hsl(195, 90%, " + this.size * 4 + "%)";
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
        context.fill();
    };

    return Circle;
}();

/**
 * Onload function is executed whenever the page is done loading, initializes the application
 */
/*
 window.onload = function () {
    //Create a new instance of the application
    var application = new Application();

    //Initialize the CircleContainer objects
    application.initializeCircleContainers();

    //Start the initial loop function for the first time
    application.loop();
};

*/
document.addEventListener('mousemove', function (e) {
    var w = window.innerWidth;
    var cw = w / 2;
    var h = window.innerHeight;
    var ch = h / 2;
    document.documentElement.style.setProperty('--x-offset', (e.clientX - cw) / w);
    document.documentElement.style.setProperty('--y-offset', (e.clientY - ch) / h);
});
(function() {
  function isSafari() {
    var userAgent = navigator.userAgent;
    return (/Safari/gi).test(userAgent) &&
      !(/Chrome/gi).test(userAgent);
  }
  if(isSafari()) {
    var overlay = document.querySelector('.overlay');
    overlay.classList.add('multiply');
  }
})();
var notification;
var container = document.querySelector('#notification-container');
var visible = false;
var queue = [];

function createNotification() {
    notification = document.createElement('div');
    var btn = document.createElement('button');
    var title = document.createElement('div');
    var msg = document.createElement('div');
    btn.className = 'notification-close';
    title.className = 'notification-title';
    msg.className = 'notification-message';
    btn.addEventListener('click', hideNotification, false);
    notification.addEventListener('animationend', hideNotification, false);
    notification.addEventListener('webkitAnimationEnd', hideNotification, false);
    notification.appendChild(btn);
    notification.appendChild(title);
    notification.appendChild(msg);
}

function updateNotification(type, title, message) {
    notification.className = 'notification notification-' + type;
    notification.querySelector('.notification-title').innerHTML = title;
    notification.querySelector('.notification-message').innerHTML = message;
}

function showNotification(type, title, message) {
    if (visible) {
        queue.push([type, title, message]);
        return;
    }
    if (!notification) {
        createNotification();
    }
    updateNotification(type, title, message);
    container.appendChild(notification);
    visible = true;
}

function hideNotification() {
    if (visible) {
        visible = false;
        container.removeChild(notification);
        if (queue.length) {
            showNotification.apply(null, queue.shift());
        }
    } 
}

$(function () {

    var isopen_usermenu = false;



    /**
     * Open and close usermenu event
     */

    $(".header .user-menu-toggle").on("click", function () {
        if(!isopen_usermenu) {

            // Show menu
            $(".header .user-menu").show();

            //Change arrow
            $(".user-menu-toggle .simple-arrow").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            
            isopen_usermenu = true;
        } else {

            // Close menu
            $(".header .user-menu").hide();


            //Change arrow
            $(".user-menu-toggle .simple-arrow").removeClass("fa-chevron-up").addClass("fa-chevron-down");

            isopen_usermenu = false;
        }
    });



});

 $(".header .user-menu").hide();


var quantum = new PouchDB('https://quay.stream:6984/_users', {skipSetup: true});
$('#cerrarsesion').click(function(){
    quantum.logout(function (err, response) {
  if (err) {
    // network error
    showNotification('error', 'Error', 'Ocurrió un problema. Intenta más tarde.');
  } else {
    showNotification('info', 'Saliendo', 'Te esperamos la próxima (:');
    location.reload();
  }
});
});
$('#signup .form-head , #signup .form-head .form-action').click(function (event) {
    $('.grop-from').attr('id', 'name');
    $('.icon-action').addClass('back');
});

function letsgoin(){ 
  var patr_dni = $('#control-dni').val(),
   patr_email = $('#control-email').val(), patr_phone = $('#control-phone').val(), patr_nombre = $('#control-nombre').val(), patr_password = $('#control-password').val(), patr_password_repeat = $('#control-password-repeat').val();
    var form_id = $('.grop-from').attr('id');
    $('.icon-action').addClass('back');
    if ($('#control-' + form_id).val() != '') {
        switch (form_id) {
        case 'name':
            if ($('#control-dni').val() != '') {

                showNotification('loading', 'Comprobando DNI', 'Espera unos segundos...');
              $.ajax({
                type: 'GET',
                url: 'https://quay.stream:3471/dni/'+patr_dni,
                dataType: 'json'
            }).done(function (response) {
             var exists = response;
              console.log(response);
              if(response != 0){
                $('#control-exists').val('1');
               form_id = 'password';
                $('.grop-from').attr('id', form_id);
                $('.icon-action').addClass('back');
                 showNotification('success', 'Hola!', 'Tu DNI ha sido reconocido.');
              } else {
                console.log("error auth!");
                form_id = 'nombre';
                $('.grop-from').attr('id', form_id);
                $('.icon-action').addClass('back');
                showNotification('info', 'DNI disponible', 'Únete a Room');
              }
            }).fail(function (data) {
                showNotification('error', 'Error', 'Algo pasó. Intenta más tarde.');
            });
          } else {
            $('.grop-from').addClass('error');
                $('.error-text').fadeIn();
               setTimeout(function(){
                $('.grop-from').removeClass('error');
                $('.error-text').fadeOut();
              }, 2000);
          }
            break;
          case 'nombre':
            if ($('#control-nombre').val() != '') {
            form_id = 'email';
            $('.grop-from').attr('id', form_id);
            $('.icon-action').addClass('back');
           } else {
            $('.grop-from').addClass('error');
                $('.error-text').fadeIn();
               setTimeout(function(){
                $('.grop-from').removeClass('error');
                $('.error-text').fadeOut();
              }, 2000);
             }
            break;
        case 'email':
            if ($('#control-email').val() != '') {
            form_id = 'phone';
            $('.grop-from').attr('id', form_id);
            $('.icon-action').addClass('back');
           } else {
            $('.grop-from').addClass('error');
                $('.error-text').fadeIn();
               setTimeout(function(){
                $('.grop-from').removeClass('error');
                $('.error-text').fadeOut();
              }, 2000);
             }
            break;
        case 'phone':
        if ($('#control-phone').val() != '') {
            form_id = 'password';
            $('.grop-from').attr('id', form_id);
                $('.icon-action').addClass('back');
                } else {
            $('.grop-from').addClass('error');
                $('.error-text').fadeIn();
               setTimeout(function(){
                $('.grop-from').removeClass('error');
                $('.error-text').fadeOut();
              }, 2000);
          }
            break;
        case 'password':
        if ($('#control-password').val() != '') {
          
          console.log("aca!");
          console.log($('#control-exists').val())
        if($('#control-exists').val() != 0) {
            quantum.login($('#control-dni').val(), $('#control-password').val(), function (err, response) {
                if (err) {
                  if (err.name === 'unauthorized') {
                    showNotification('error', 'Error', 'Clave incorrecta');
                    console.log(err);
                  } else {
                    showNotification('error', 'Sesión iniciada', 'Recarga la web');
                  }
                } else {
                 

                  quantum.getSession(function (err, response) {
            
            
    $('body').css('backgrund-color','rgba(255,255,255,0.9');
        $('login-patrones').fadeIn('slow');
                    if (err) {
                        console.log(err);
                      console.log("error")
                      // network error
                    } else if (!response.userCtx.name) {
                      $(document).ready(function(){
  //check media query
  var mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, ""),
    //define store some initial variables
    halfWindowH = $(window).height()*0.5,
    halfWindowW = $(window).width()*0.5,
    //define a max rotation value (X and Y axises)
    maxRotationY = 5,
    maxRotationX = 3,
    aspectRatio;

  //detect if hero <img> has been loaded and evaluate its aspect-ratio
  $('.cd-floating-background').find('img').eq(0).load(function() {
    aspectRatio = $(this).width()/$(this).height();
      if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) initBackground();
  }).each(function() {
    //check if image was previously load - if yes, trigger load event
      if(this.complete) $(this).load();
  });
  
  //detect mouse movement
  $('.cd-background-wrapper').on('mousemove', function(event){
    if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
      window.requestAnimationFrame(function(){
        moveBackground(event);
      });
    }
  });

  //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
  $(window).on('resize', function(){
    mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
    if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
      window.requestAnimationFrame(function(){
        halfWindowH = $(window).height()*0.5,
        halfWindowW = $(window).width()*0.5;
        initBackground();
      });
    } else {
      $('.cd-background-wrapper').attr('style', '');
      $('.cd-floating-background').attr('style', '').removeClass('is-absolute');
    }
  });

  function initBackground() {
    var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio), 
      proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
      newImageWidth = Math.ceil(halfWindowW*2*proportions),
      newImageHeight = Math.ceil(newImageWidth/aspectRatio),
      newLeft = halfWindowW - newImageWidth/2,
      newTop = (wrapperHeight - newImageHeight)/2;

    //set an height for the .cd-background-wrapper
    $('.cd-background-wrapper').css({
      'height' : wrapperHeight,
    });
    //set dimentions and position of the .cd-background-wrapper   
    $('.cd-floating-background').addClass('is-absolute').css({
      'left' : newLeft,
      'top' : newTop,
      'width' : newImageWidth,
    });
  }

  function moveBackground(event) {
    var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
      rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

    if( rotateY > maxRotationY) rotateY = maxRotationY;
    if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
    if( rotateX > maxRotationX) rotateX = maxRotationX;
    if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

    $('.cd-floating-background').css({
      '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
    });
  }
});

/*  Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
  https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective(){
  var element = document.createElement('p'),
            html = document.getElementsByTagName('html')[0],
      body = document.getElementsByTagName('body')[0],
      propertys = {
        'webkitTransformStyle':'-webkit-transform-style',
        'MozTransformStyle':'-moz-transform-style',
        'msTransformStyle':'-ms-transform-style',
        'transformStyle':'transform-style'
      };

    body.insertBefore(element, null);

    for (var i in propertys) {
        if (element.style[i] !== undefined) {
            element.style[i] = "preserve-3d";
        }
    }

    var st = window.getComputedStyle(element, null),
        transform = st.getPropertyValue("-webkit-transform-style") ||
                    st.getPropertyValue("-moz-transform-style") ||
                    st.getPropertyValue("-ms-transform-style") ||
                    st.getPropertyValue("transform-style");

    if(transform!=='preserve-3d'){
      html.className += ' no-preserve-3d';
    } else {
      html.className += ' preserve-3d';
    }
    document.body.removeChild(element);

})();


jQuery(document).ready(function($){
  var gallery = $('.cd-gallery'),
    foldingPanel = $('.cd-folding-panel'),
    mainContent = $('.cd-main');
  /* open folding content */
  gallery.on('click', 'a', function(event){
    event.preventDefault();
    openItemInfo($(this).attr('href'));
  });

  /* close folding content */
  foldingPanel.on('click', '.cd-close', function(event){
    event.preventDefault();
    toggleContent('', false);
  });
  gallery.on('click', function(event){
    /* detect click on .cd-gallery::before when the .cd-folding-panel is open */
    if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
  })

  function openItemInfo(url) {
    var mq = viewportSize();
    if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
      /* if content is visible above the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top
      }, 100, function(){ 
              toggleContent(url, true);
          }); 
      } else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
      /* if content is visible below the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
      }, 100, function(){ 
              toggleContent(url, true);
          });
    } else {
      toggleContent(url, true);
    }
  }

  function toggleContent(url, bool) {
    if( bool ) {
      /* load and show new content */
      var foldingContent = foldingPanel.find('.cd-fold-content');
      foldingContent.load(url+' .cd-fold-content > *', function(event){
        setTimeout(function(){
          $('body').addClass('overflow-hidden');
          foldingPanel.addClass('is-open');
          mainContent.addClass('fold-is-open');
        }, 100);
        
      });
    } else {
      /* close the folding panel */
      var mq = viewportSize();
      foldingPanel.removeClass('is-open');
      mainContent.removeClass('fold-is-open');
      
      (mq == 'mobile' || $('.no-csstransitions').length > 0 )  ? $('body').removeClass('overflow-hidden') : mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          $('body').removeClass('overflow-hidden');
          mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
    }
    
  }

  function viewportSize() {
    /* retrieve the content value of .cd-main::before to check the actua mq */
    return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
  }
});
                      
                      
                    } else {
                      // 
                       showNotification('success', 'Bienvenido', 'Abriendo sistema...');
                      quantum.getUser(response.userCtx.name, function (err, response) {
                        
                          if (err) {
                            console.log(err);
                            if (err.name === 'not_found') {
                              console.log("// typo, or you don't have the privileges to see this user");
                            } else {
                              // some other error
                            }
                          } else {
                            form_id = 'success';
                      $('.grop-from').attr('id', form_id);
                            $('.p0').delay(1000).fadeOut('slow');
                            $('.p1').delay(1050).fadeOut('slow');
                            $('.p2').delay(1100).fadeOut('slow');
                            $('.p3').delay(1150).fadeOut('slow');
                            $('.p4').delay(1200).fadeOut('slow');
                            $('.p5').delay(1250).fadeOut('slow');
                            $('.p6').delay(1300).fadeOut('slow');
                            $('.p7').delay(1350).fadeOut('slow');
                            $('.p8').delay(1400).fadeOut('slow');
                            $('.p9').delay(1500).fadeOut('slow');
$(".header .user-menu").hide();
                            $('#loadingwebpatrones').delay(3000).fadeOut('slow');
                            setTimeout(function(){
                              $('#loadingwebpatrones').remove();
                            })
                            console.log(response);  // response is the user object
                             $('.form-action').fadeOut('slow').remove();
                             $('.form-head').html('Bienvenido, '+response.nombre);
                             $('body').delay(1550).css('overflow-y','auto');
                             $('.nombredeusuario').html(response.nombre)
                          }
                        });
                     
                
                    }
                  });
                }
              });
        } else {
          form_id = 'password-repeat';
          $('.grop-from').attr('id', form_id);
                $('.icon-action').addClass('back');
        }
            } else {
            $('.grop-from').addClass('error');
                $('.error-text').fadeIn();
               setTimeout(function(){
                $('.grop-from').removeClass('error');
                $('.error-text').fadeOut();
              }, 2000);
          } 
            break;
            case 'password-repeat':
            if ($('#control-password-repeat').val() != '') {
              if($('#control-password-repeat').val() == $('#control-password').val()){
                 quantum.signup(patr_dni, patr_password_repeat, {
                    metadata : {
                      nombre: patr_nombre,
                      email : patr_email,
                      phone : patr_phone,
                      rango : 'pre-afiliado',
                      email_verificado : '0',
                      usuario_verificado : '0'
                    }

                  }, function (err, response) {
                    if(err){
                        console.log(err);
                      showNotification('error', 'Error', 'Ocurrió un problema en el registro. Intenta más tarde.');
                    } else {
                      form_id = 'success';
                      $('.grop-from').attr('id', form_id);
                      $('.icon-action').addClass('back');
                                  quantum.login($('#control-dni').val(), $('#control-password').val(), function (err, response) {
                if (err) {
                  if (err.name === 'unauthorized') {
                    showNotification('error', 'Error', 'Clave incorrecta');
                    console.log(err);
                  } else {
                    showNotification('error', 'Sesión iniciada', 'Recarga la web');
                  }
                } else {
                 

                  quantum.getSession(function (err, response) {
            
            
    $('body').css('backgrund-color','rgba(255,255,255,0.9');
        $('login-patrones').fadeIn('slow');
                    if (err) {
                        console.log(err);
                      console.log("error")
                      // network error
                    } else if (!response.userCtx.name) {
                      $(document).ready(function(){
  //check media query
  var mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, ""),
    //define store some initial variables
    halfWindowH = $(window).height()*0.5,
    halfWindowW = $(window).width()*0.5,
    //define a max rotation value (X and Y axises)
    maxRotationY = 5,
    maxRotationX = 3,
    aspectRatio;

  //detect if hero <img> has been loaded and evaluate its aspect-ratio
  $('.cd-floating-background').find('img').eq(0).load(function() {
    aspectRatio = $(this).width()/$(this).height();
      if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) initBackground();
  }).each(function() {
    //check if image was previously load - if yes, trigger load event
      if(this.complete) $(this).load();
  });
  
  //detect mouse movement
  $('.cd-background-wrapper').on('mousemove', function(event){
    if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
      window.requestAnimationFrame(function(){
        moveBackground(event);
      });
    }
  });

  //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
  $(window).on('resize', function(){
    mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
    if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
      window.requestAnimationFrame(function(){
        halfWindowH = $(window).height()*0.5,
        halfWindowW = $(window).width()*0.5;
        initBackground();
      });
    } else {
      $('.cd-background-wrapper').attr('style', '');
      $('.cd-floating-background').attr('style', '').removeClass('is-absolute');
    }
  });

  function initBackground() {
    var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio), 
      proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
      newImageWidth = Math.ceil(halfWindowW*2*proportions),
      newImageHeight = Math.ceil(newImageWidth/aspectRatio),
      newLeft = halfWindowW - newImageWidth/2,
      newTop = (wrapperHeight - newImageHeight)/2;

    //set an height for the .cd-background-wrapper
    $('.cd-background-wrapper').css({
      'height' : wrapperHeight,
    });
    //set dimentions and position of the .cd-background-wrapper   
    $('.cd-floating-background').addClass('is-absolute').css({
      'left' : newLeft,
      'top' : newTop,
      'width' : newImageWidth,
    });
  }

  function moveBackground(event) {
    var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
      rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

    if( rotateY > maxRotationY) rotateY = maxRotationY;
    if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
    if( rotateX > maxRotationX) rotateX = maxRotationX;
    if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

    $('.cd-floating-background').css({
      '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
    });
  }
});

/*  Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
  https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective(){
  var element = document.createElement('p'),
            html = document.getElementsByTagName('html')[0],
      body = document.getElementsByTagName('body')[0],
      propertys = {
        'webkitTransformStyle':'-webkit-transform-style',
        'MozTransformStyle':'-moz-transform-style',
        'msTransformStyle':'-ms-transform-style',
        'transformStyle':'transform-style'
      };

    body.insertBefore(element, null);

    for (var i in propertys) {
        if (element.style[i] !== undefined) {
            element.style[i] = "preserve-3d";
        }
    }

    var st = window.getComputedStyle(element, null),
        transform = st.getPropertyValue("-webkit-transform-style") ||
                    st.getPropertyValue("-moz-transform-style") ||
                    st.getPropertyValue("-ms-transform-style") ||
                    st.getPropertyValue("transform-style");

    if(transform!=='preserve-3d'){
      html.className += ' no-preserve-3d';
    } else {
      html.className += ' preserve-3d';
    }
    document.body.removeChild(element);

})();


jQuery(document).ready(function($){
  var gallery = $('.cd-gallery'),
    foldingPanel = $('.cd-folding-panel'),
    mainContent = $('.cd-main');
  /* open folding content */
  gallery.on('click', 'a', function(event){
    event.preventDefault();
    openItemInfo($(this).attr('href'));
  });

  /* close folding content */
  foldingPanel.on('click', '.cd-close', function(event){
    event.preventDefault();
    toggleContent('', false);
  });
  gallery.on('click', function(event){
    /* detect click on .cd-gallery::before when the .cd-folding-panel is open */
    if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
  })

  function openItemInfo(url) {
    var mq = viewportSize();
    if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
      /* if content is visible above the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top
      }, 100, function(){ 
              toggleContent(url, true);
          }); 
      } else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
      /* if content is visible below the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
      }, 100, function(){ 
              toggleContent(url, true);
          });
    } else {
      toggleContent(url, true);
    }
  }

  function toggleContent(url, bool) {
    if( bool ) {
      /* load and show new content */
      var foldingContent = foldingPanel.find('.cd-fold-content');
      foldingContent.load(url+' .cd-fold-content > *', function(event){
        setTimeout(function(){
          $('body').addClass('overflow-hidden');
          foldingPanel.addClass('is-open');
          mainContent.addClass('fold-is-open');
        }, 100);
        
      });
    } else {
      /* close the folding panel */
      var mq = viewportSize();
      foldingPanel.removeClass('is-open');
      mainContent.removeClass('fold-is-open');
      
      (mq == 'mobile' || $('.no-csstransitions').length > 0 )  ? $('body').removeClass('overflow-hidden') : mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          $('body').removeClass('overflow-hidden');
          mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
    }
    
  }

  function viewportSize() {
    /* retrieve the content value of .cd-main::before to check the actua mq */
    return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
  }
});
                      
                      
                    } else {
                      // 
                       showNotification('success', 'Bienvenido', 'Abriendo sistema...');
                      quantum.getUser(response.userCtx.name, function (err, response) {
                        $('#loading-patrones').fadeOut('slow');
                         setTimeout(function(){
                          $('#loading-patrones').remove();
                         }, 1000);
                          if (err) {
                            console.log(err);
                            if (err.name === 'not_found') {
                              console.log("// typo, or you don't have the privileges to see this user");
                            } else {
                              // some other error
                            }
                          } else {
                            form_id = 'success';
                      $('.grop-from').attr('id', form_id);
                            $('.p0').delay(1000).fadeOut('slow');
                            $('.p1').delay(1050).fadeOut('slow');
                            $('.p2').delay(1100).fadeOut('slow');
                            $('.p3').delay(1150).fadeOut('slow');
                            $('.p4').delay(1200).fadeOut('slow');
                            $('.p5').delay(1250).fadeOut('slow');
                            $('.p6').delay(1300).fadeOut('slow');
                            $('.p7').delay(1350).fadeOut('slow');
                            $('.p8').delay(1400).fadeOut('slow');
                            $('.p9').delay(1500).fadeOut('slow');

                            $('#loadingwebpatrones').delay(3000).fadeOut('slow').remove();
                            console.log(response);  // response is the user object
                             $('.form-action').fadeOut('slow').remove();
                             $('.form-head').html('Bienvenido, '+response.nombre);
                             $('body').delay(1550).css('overflow-y','auto');
                             $('.nombredeusuario').html(response.nombre)
                          }
                        });
                     
                
                    }
                  });
                }
              });
                    }
                  });
                console.log("passwords match!");
              } else {
                showNotification('error', 'Claves', 'No coinciden');
              }
            
            } else {
            $('.grop-from').addClass('error');
                $('.error-text').fadeIn();
               setTimeout(function(){
                $('.grop-from').removeClass('error');
                $('.error-text').fadeOut();
              }, 2000);
          }
            break;
        }
        
    } else {
        switch (form_id) {
        case 'name':
            form_id = 'signup';
            $('.icon-action').removeClass('back');
            break;
        case 'phone':
            form_id = 'email';
            break;
        case 'email':
            form_id = 'name';
            break;
        case 'password':
            form_id = 'phone';
            break;
        case 'password-repeat':
            form_id = 'password';
            break;
        }
        $('.icon-action').removeClass('back');
    }
    
};
$('input').keyup(function () {
    $('.grop-from').removeClass('error');
    $('.error-text').fadeOut();
    if ($(this).val() != '') {
        $('.icon-action').removeClass('back');
    } else {
        $('.icon-action').addClass('back');
    }
});
$(document).keypress(function(e) {

    if(e.which == 13) {
        letsgoin();
        return false;  
    }
});

 document.addEventListener("DOMContentLoaded", function(event) {
 $('#loading-patrones').fadeOut('slow');
                         setTimeout(function(){
                          $('#loading-patrones').remove();
                         }, 1000);
  $(".icon").addClass("pre-enter");
setTimeout(function(){
  $(".icon").addClass("on-enter");
}, 1000);
setTimeout(function(){
  $(".icon").removeClass("pre-enter on-enter");
  $(".icon > div").addClass("hover");
}, 3000);
    quantum.getSession(function (err, response) {
            
            
    $('body').css('backgrund-color','rgba(255,255,255,0.9');
        $('login-patrones').fadeIn('slow');
                    if (err) {
                        console.log(err);
                      console.log("error")
                      // network error
                    } else if (!response.userCtx.name) {
                      jQuery(document).ready(function($){
  //check media query
  var mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, ""),
    //define store some initial variables
    halfWindowH = $(window).height()*0.5,
    halfWindowW = $(window).width()*0.5,
    //define a max rotation value (X and Y axises)
    maxRotationY = 5,
    maxRotationX = 3,
    aspectRatio;

  //detect if hero <img> has been loaded and evaluate its aspect-ratio
  $('.cd-floating-background').find('img').eq(0).load(function() {
    aspectRatio = $(this).width()/$(this).height();
      if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) initBackground();
  }).each(function() {
    //check if image was previously load - if yes, trigger load event
      if(this.complete) $(this).load();
  });
  
  //detect mouse movement
  $('.cd-background-wrapper').on('mousemove', function(event){
    if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
      window.requestAnimationFrame(function(){
        moveBackground(event);
      });
    }
  });

  //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
  $(window).on('resize', function(){
    mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
    if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
      window.requestAnimationFrame(function(){
        halfWindowH = $(window).height()*0.5,
        halfWindowW = $(window).width()*0.5;
        initBackground();
      });
    } else {
      $('.cd-background-wrapper').attr('style', '');
      $('.cd-floating-background').attr('style', '').removeClass('is-absolute');
    }
  });

  function initBackground() {
    var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio), 
      proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
      newImageWidth = Math.ceil(halfWindowW*2*proportions),
      newImageHeight = Math.ceil(newImageWidth/aspectRatio),
      newLeft = halfWindowW - newImageWidth/2,
      newTop = (wrapperHeight - newImageHeight)/2;

    //set an height for the .cd-background-wrapper
    $('.cd-background-wrapper').css({
      'height' : wrapperHeight,
    });
    //set dimentions and position of the .cd-background-wrapper   
    $('.cd-floating-background').addClass('is-absolute').css({
      'left' : newLeft,
      'top' : newTop,
      'width' : newImageWidth,
    });
  }

  function moveBackground(event) {
    var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
      rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

    if( rotateY > maxRotationY) rotateY = maxRotationY;
    if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
    if( rotateX > maxRotationX) rotateX = maxRotationX;
    if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

    $('.cd-floating-background').css({
      '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
    });
  }
});

/*  Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
  https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective(){
  var element = document.createElement('p'),
      html = document.getElementsByTagName('html')[0],
      body = document.getElementsByTagName('body')[0],
      propertys = {
        'webkitTransformStyle':'-webkit-transform-style',
        'MozTransformStyle':'-moz-transform-style',
        'msTransformStyle':'-ms-transform-style',
        'transformStyle':'transform-style'
      };

    body.insertBefore(element, null);

    for (var i in propertys) {
        if (element.style[i] !== undefined) {
            element.style[i] = "preserve-3d";
        }
    }

    var st = window.getComputedStyle(element, null),
        transform = st.getPropertyValue("-webkit-transform-style") ||
                    st.getPropertyValue("-moz-transform-style") ||
                    st.getPropertyValue("-ms-transform-style") ||
                    st.getPropertyValue("transform-style");

    if(transform!=='preserve-3d'){
      html.className += ' no-preserve-3d';
    } else {
      html.className += ' preserve-3d';
    }
    document.body.removeChild(element);

})();


jQuery(document).ready(function($){
  var gallery = $('.cd-gallery'),
    foldingPanel = $('.cd-folding-panel'),
    mainContent = $('.cd-main');
  /* open folding content */
  gallery.on('click', 'a', function(event){
    event.preventDefault();
    openItemInfo($(this).attr('href'));
  });

  /* close folding content */
  foldingPanel.on('click', '.cd-close', function(event){
    event.preventDefault();
    toggleContent('', false);
  });
  gallery.on('click', function(event){
    /* detect click on .cd-gallery::before when the .cd-folding-panel is open */
    if($(event.target).is('.cd-gallery') && $('.fold-is-open').length > 0 ) toggleContent('', false);
  })

  function openItemInfo(url) {
    var mq = viewportSize();
    if( gallery.offset().top > $(window).scrollTop() && mq != 'mobile') {
      /* if content is visible above the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top
      }, 100, function(){ 
              toggleContent(url, true);
          }); 
      } else if( gallery.offset().top + gallery.height() < $(window).scrollTop() + $(window).height()  && mq != 'mobile' ) {
      /* if content is visible below the .cd-gallery - scroll before opening the folding panel */
      $('body,html').animate({
        'scrollTop': gallery.offset().top + gallery.height() - $(window).height()
      }, 100, function(){ 
              toggleContent(url, true);
          });
    } else {
      toggleContent(url, true);
    }
  }

  function toggleContent(url, bool) {
    if( bool ) {
      /* load and show new content */
      var foldingContent = foldingPanel.find('.cd-fold-content');
      foldingContent.load(url+' .cd-fold-content > *', function(event){
        setTimeout(function(){
          $('body').addClass('overflow-hidden');
          foldingPanel.addClass('is-open');
          mainContent.addClass('fold-is-open');
        }, 100);
        
      });
    } else {
      /* close the folding panel */
      var mq = viewportSize();
      foldingPanel.removeClass('is-open');
      mainContent.removeClass('fold-is-open');
      
      (mq == 'mobile' || $('.no-csstransitions').length > 0 ) 
        /* according to the mq, immediately remove the .overflow-hidden or wait for the end of the animation */
        ? $('body').removeClass('overflow-hidden')
        
        : mainContent.find('.cd-item').eq(0).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          $('body').removeClass('overflow-hidden');
          mainContent.find('.cd-item').eq(0).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        });
    }
    
  }

  function viewportSize() {
    /* retrieve the content value of .cd-main::before to check the actua mq */
    return window.getComputedStyle(document.querySelector('.cd-main'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
  }
});
                     
                    } else {
                      // 
                      quantum.getUser(response.userCtx.name, function (err, response) {
                        $('#loading-patrones').fadeOut('slow');
                         setTimeout(function(){
                          $('#loading-patrones').remove();
                         }, 1000);
                          if (err) {
                            console.log(err);
                            if (err.name === 'not_found') {
                              console.log("// typo, or you don't have the privileges to see this user");
                            } else {
                              // some other error
                            }
                          } else {
                            $('.p0').delay(1000).fadeOut('slow');
                            $('.p1').delay(1050).fadeOut('slow');
                            $('.p2').delay(1100).fadeOut('slow');
                            $('.p3').delay(1150).fadeOut('slow');
                            $('.p4').delay(1200).fadeOut('slow');
                            $('.p5').delay(1250).fadeOut('slow');
                            $('.p6').delay(1300).fadeOut('slow');
                            $('.p7').delay(1350).fadeOut('slow');
                            $('.p8').delay(1400).fadeOut('slow');
                            $('.p9').delay(1500).fadeOut('slow');
                            $('#loadingwebpatrones').delay(1550).fadeOut('slow').remove();
                            console.log(response);  // response is the user object
                             $('.form-action').fadeOut('slow').remove();
                             $('.form-head').html('Bienvenido, '+response.nombre);

                             $('body').delay(1550).css('overflow-y','auto');
                             $('.nombredeusuario').html(response.nombre);
                          }
                        });
                     
                
                    }
                  });

    

   /* $('#loadingwebpatrones').fadeOut('slow').remove(); */
  });
$('.form-action').click(function () {
letsgoin();
});

