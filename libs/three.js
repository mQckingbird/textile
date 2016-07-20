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