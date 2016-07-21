$(document).ready(function() {
			$('#fullpage').fullpage({
				verticalCentered: true,
				navigation: true,
				afterRender: function(){


					//playing the video
					$('video').get(0).play();
				}
			});
			$("#loading").fadeOut(1000, function() { $(this).remove(); });
		});
  $(".download").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".download").mouseleave(function() {
    $(this).removeClass("hover");
  });
  var canvas = document.getElementById('lastacity');
var ctx = canvas.getContext('2d');
var fps = document.getElementById('fps');

var W = canvas.width = innerWidth;
var H = canvas.height = innerHeight;

var raf = requestAnimationFrame;
var running = false;

'floor|random|round|abs|sqrt|PI|atan2|sin|cos|pow'
  .split('|')
  .forEach(function(p) { this[p] = Math[p]; });

function randint(n) { return floor(n*random()); }

/*---------------------------------------------------------------------------*/

function loop(t) {
  if (running) raf(loop);
  update();
  draw();
}

document.onclick = function() {
  if ((running = !running)) raf(loop);
};

document.onkeydown = function(e) {
  if (e.which !== 27) return;
  running = false;
  setTimeout(reset, 50);
};

/*---------------------------------------------------------------------------*/

function Side(x, y, sign, death, length) {
  this.x = x;
  this.y = y;
  this.sign = sign;
  this.length = length;
  this.age = 0;
  this.death = death;
}

Object.defineProperty(Side.prototype, 'dead', {
  get: function() { return this.age >= this.death; }
});

Side.prototype.update = function() {
  if (this.dead) return;
  this.age++;
};

Side.prototype.draw = function() {
  if (this.dead) return;
  var x = this.x;
  var y = this.y - this.age;
  var len = this.length;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + this.sign*dx*Unit*len, y - dy*Unit*len);
  ctx.closePath();
  ctx.strokeStyle = this.sign > 0 ? 'rgb(123, 123, 123)' : 'rgb(55, 55, 55)';
  ctx.stroke();  
};

function drawTop(a, b) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y-a.age);
  ctx.lineTo(a.x + a.sign*dx*Unit*a.length, a.y-a.age-dy*Unit*a.length);
  ctx.lineTo(b.x + a.sign*dx*Unit*a.length+b.sign*dx*Unit*b.length, a.y-a.age-dy*Unit*(a.length+b.length));
  ctx.lineTo(b.x + b.sign*dx*Unit*b.length, b.y-a.age-dy*Unit*b.length);
  ctx.closePath();
  ctx.fillStyle = 'rgb(198,198,198)';
  ctx.fill();
}

/*---------------------------------------------------------------------------*/

var Unit = 2;
var dx = 8;
var dy = 4;
var S = 2600;
var MaxHeight = 200;
var sides = [];

function reset() {
  ctx.clearRect(0, 0, W, H);
  sides = [];
  for (var i = 0; i < S; i += 2) {
    var x = random()*W;
    var y = random()*(H + 100);
    x -= x%20;
    y -= y%5;
    var death = randint(MaxHeight);
    sides[i] = new Side(x, y, 1, death, 1+randint(3));
    sides[i+1] = new Side(x, y, -1, death, 1+randint(3));
  }
}

function update() {
  for (var i = 0; i < S; i++) sides[i].update();
}

function draw() {
  var alldead = true;
  for (var i = 0; i < S; i += 2) {
    var a = sides[i];
    var b = sides[i+1];
    
    if (!a.dead || !b.dead) alldead = false;
    
    if (!a.dead) drawTop(a, b);
    a.draw();
    b.draw();
  }
  if (alldead) running = false;
}

/*---------------------------------------------------------------------------*/


running = true;
reset();
raf(loop);
/**/
$.fn.commentCards = function(){

  return this.each(function(){

    var $this = $(this),
        $cards = $this.find('.card'),
        $current = $cards.filter('.card--current'),
        $next;

    $cards.on('click',function(){
      if ( !$current.is(this) ) {
        $cards.removeClass('card--current card--out card--next');
        $current.addClass('card--out');
        $current = $(this).addClass('card--current');
        $next = $current.next();
        $next = $next.length ? $next : $cards.first();
        $next.addClass('card--next');
      }
    });

    if ( !$current.length ) {
      $current = $cards.last();
      $cards.first().trigger('click');
    }

    $this.addClass('cards--active');

  })

};

$('.cards').commentCards();
