// Get Color Attribute
// Set the background book color
$("li.book-item").each(function() {
  var $this = $(this);

  $this.find(".bk-front > div").css('background-color', $(this).data("color"));
  $this.find(".bk-left").css('background-color', $(this).data("color"));
  $this.find(".back-color").css('background-color', $(this).data("color"));

  $this.find(".item-details a.button").on('click', function() {
    displayBookDetails($this);
  });
});

function displayBookDetails(el) {
  var $this = $(el);
  $('.main-container').addClass('prevent-scroll');
  $('.main-overlay').fadeIn();

  $this.find('.overlay-details').clone().prependTo('.main-overlay');

  $('a.close-overlay-btn').on('click', function(e) {
    e.preventDefault();
    $('.main-container').removeClass('prevent-scroll');
    $('.main-overlay').fadeOut();
    $('.main-overlay').find('.overlay-details').remove();
  });

  $('.main-overlay a.preview').on('click', function() {
    $('.main-overlay .overlay-desc').toggleClass('activated');
    $('.main-overlay .overlay-preview').toggleClass('activated');
  });

  $('.main-overlay a.back-preview-btn').on('click', function() {
    $('.main-overlay .overlay-desc').toggleClass('activated');
    $('.main-overlay .overlay-preview').toggleClass('activated');
  });
}



/*
 *  Shuffle.js for Search, Catagory filter and Sort
 */

// Initiate Shuffle.js
var Shuffle = window.shuffle;

var bookList = function(element) {
  this.element = element;

  this.shuffle = new Shuffle(element, {
    itemSelector: '.book-item',
  });

  this._activeFilters = [];
  this.addFilterButtons();
  this.addSorting();
  this.addSearchFilter();
  this.mode = 'exclusive';
};

bookList.prototype.toArray = function(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
};

// Catagory Filter Functions
// Toggle mode for the Catagory filters
bookList.prototype.toggleMode = function() {
  if (this.mode === 'additive') {
    this.mode = 'exclusive';
  } else {
    this.mode = 'additive';
  }
};

// Filter buttons eventlisteners
bookList.prototype.addFilterButtons = function() {
  var options = document.querySelector('.filter-options');
  if (!options) {
    return;
  }
  var filterButtons = this.toArray(options.children);

  filterButtons.forEach(function(button) {
    button.addEventListener('click', this._handleFilterClick.bind(this), false);
  }, this);
};

// Function for the Catagory Filter
bookList.prototype._handleFilterClick = function(evt) {
  var btn = evt.currentTarget;
  var isActive = btn.classList.contains('active');
  var btnGroup = btn.getAttribute('data-group');

  if (this.mode === 'additive') {
    if (isActive) {
      this._activeFilters.splice(this._activeFilters.indexOf(btnGroup));
    } else {
      this._activeFilters.push(btnGroup);
    }

    btn.classList.toggle('active');
    this.shuffle.filter(this._activeFilters);

  } else {
    this._removeActiveClassFromChildren(btn.parentNode);

    var filterGroup;
    if (isActive) {
      btn.classList.remove('active');
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add('active');
      filterGroup = btnGroup;
    }

    this.shuffle.filter(filterGroup);
  }
};

// Remove classes for active states
bookList.prototype._removeActiveClassFromChildren = function(parent) {
  var children = parent.children;
  for (var i = children.length - 1; i >= 0; i--) {
    children[i].classList.remove('active');
  }


};

// Sort By
// Watching for the select box to change to run
bookList.prototype.addSorting = function() {
  var menu = document.querySelector('.sort-options');
  if (!menu) {
    return;
  }
  menu.addEventListener('change', this._handleSortChange.bind(this));
};

// Sort By function Handler runs on change
bookList.prototype._handleSortChange = function(evt) {
  var value = evt.target.value;
  var options = {};

  function sortByDate(element) {
    return element.getAttribute('data-created');
  }

  function sortByTitle(element) {
    return element.getAttribute('data-title').toLowerCase();
  }

  if (value === 'date-created') {
    options = {
      reverse: true,
      by: sortByDate,
    };
  } else if (value === 'title') {
    options = {
      by: sortByTitle,
    };
  }

  this.shuffle.sort(options);
};

// Searching the Data-attribute Title
// Advanced filtering
// Waiting for input into the search field
bookList.prototype.addSearchFilter = function() {
  var searchInput = document.querySelector('.shuffle-search');
  if (!searchInput) {
    return;
  }
  searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
};

// Search function Handler to search list
bookList.prototype._handleSearchKeyup = function(evt) {
  var searchInput = document.querySelector('.shuffle-search');
  var searchText = evt.target.value.toLowerCase();

  // Check if Search input has value to toggle class
  if (searchInput && searchInput.value) {
    $('.catalog-search').addClass('input--filled');
  } else {
    $('.catalog-search').removeClass('input--filled');
  }

  this.shuffle.filter(function(element, shuffle) {

    // If there is a current filter applied, ignore elements that don't match it.
    if (shuffle.group !== Shuffle.ALL_ITEMS) {
      // Get the item's groups.
      var groups = JSON.parse(element.getAttribute('data-groups'));
      var isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;

      // Only search elements in the current group
      if (!isElementInCurrentGroup) {
        return false;
      }
    }

    var titleElement = element.querySelector('.book-item_title');
    var titleText = titleElement.textContent.toLowerCase().trim();

    return titleText.indexOf(searchText) !== -1;
  });
};

// Wait till dom load to start the Shuffle js funtionality

$(function(){

  
  $('.iniciarsesion').on('click', function(e){
    e.preventDefault();
    
    if($(this).attr('id') == 'searchtoggl') {
      if(!$searchbar.is(":visible")) { 
        // if invisible we switch the icon to appear collapsable
        $searchlink.removeClass('fa-search').addClass('fa-search-minus');
      } else {
        // if visible we switch the icon to appear as a toggle
        $searchlink.removeClass('fa-search-minus').addClass('fa-search');
      }
      
      $searchbar.slideToggle(300, function(){
        // callback after search bar animation
      });
    }
  });
  
  $('#searchform').submit(function(e){
    e.preventDefault(); // stop form submission
  });
});


function toast(text)
{
    var container = $(document.createElement("div"));
    container.addClass("toast");
    
    var message = $(document.createElement("div"));
    message.addClass("message");
    message.text(text);
    message.appendTo(container);
    
    container.appendTo(document.body);
    console.log(text);
    container.delay(10).fadeIn("slow", function()
    {
        $(this).delay(2500).fadeOut("slow", function() { $(this).remove(); });
    });
}
  var $searchlink = $('.iniciarsesion');
  var $searchbar  = $('#searchbar');

var quantum = new PouchDB('https://quay.stream:6984/_users', {skipSetup: true});
$('#cerrarsesion').click(function(){
    quantum.logout(function (err, response) {
  if (err) {
    // network error
    toast('Ocurrió un problema');
  } else {
    toast('Saliendo...');
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
              toast('Comprobando DNI');
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
                toast('DNI reconocido');
              } else {
                console.log("error auth!");
                form_id = 'nombre';
                $('.grop-from').attr('id', form_id);
                $('.icon-action').addClass('back');
                toast('DNI disponible. Unete.');
              }
            }).fail(function (data) {
                toast('Error. Intenta más tarde.');
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
                    toast('Clave incorrecta');
                    console.log(err);
                  } else {
                    toast('Sesión ya iniciada.');
                  }
                } else {
                 

                  quantum.getSession(function (err, response) {
            
                    if (err) {
                        console.log(err);
                      console.log("error")
                      // network error
                    } else if (!response.userCtx.name) {
                      // nobody's logged in
                      
                      
                    } else {
                      // 
                      
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
                       
               $('.close').delay(3000).click();
                            toast('Bienvenido (:');
                            console.log(response);  // response is the user object
                             $('.form-action').fadeOut('slow').remove;
                             $('.form-head').html('Bienvenido, '+response.nombre);
                             $('.initbutton').fadeOut('slow');
                             $('.page-header-container').prepend('  <div class="menu"><div class="title" onclick="f()">'+response.nombre+' <span class="fa fa-bars"></span><div class="arrow"></div></div><div class="dropdown"><p>Libros <span class="fa fa-inbox"></span></p><p>Opciones <span class="fa fa-gear"></span></p><p>Cerrar sesión <span class="fa fa-sign-out"></span></p></div></div>');
                             $searchbar.slideToggle(300, function(){
        // callback after search bar animation
      });
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
                        toast('Ocurrió un problema');
                    } else {
                      form_id = 'success';
                      $('.grop-from').attr('id', form_id);
                      $('.icon-action').addClass('back');
                                  quantum.login($('#control-dni').val(), $('#control-password').val(), function (err, response) {
                if (err) {
                  if (err.name === 'unauthorized') {
                    toast('Clave incorrecta');
                    console.log(err);
                  } else {
                    toast('Sesión iniciada.');
                  }
                } else {
                 

                  quantum.getSession(function (err, response) {

                    if (err) {
                        console.log(err);
                      console.log("error")
                      // network error
                    } else if (!response.userCtx.name) {
                      // nobody's logged in
                      
                      
                    } else {
                      
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

                            $('.close').delay(3000).click();
                            toast('Bienvenido (:');
                            console.log(response);  // response is the user object
                             $('.form-action').fadeOut('slow').remove;
                             $('.form-head').html('Bienvenido, '+response.nombre);
                             $('.initbutton').fadeOut('slow');
                             $('.page-header-container').prepend('  <div class="menu"><div class="title" onclick="f()">'+response.nombre+' <span class="fa fa-bars"></span><div class="arrow"></div></div><div class="dropdown"><p>Libros <span class="fa fa-inbox"></span></p><p>Opciones <span class="fa fa-gear"></span></p><p>Cerrar sesión <span class="fa fa-sign-out"></span></p></div></div>');
                             $searchbar.slideToggle(300, function(){
        // callback after search bar animation
      });
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
                toast('Las claves no coinciden');
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
function f() {
  document.getElementsByClassName('dropdown')[0].classList.toggle('down');
  document.getElementsByClassName('arrow')[0].classList.toggle('gone');
  if (document.getElementsByClassName('dropdown')[0].classList.contains('down')) {
    setTimeout(function() {
      document.getElementsByClassName('dropdown')[0].style.overflow = 'visible'
    }, 500)
  } else {
    document.getElementsByClassName('dropdown')[0].style.overflow = 'hidden'
  }
}




document.addEventListener('DOMContentLoaded', function() {

                            $("#page").fadeOut('slow');
  window.book_list = new bookList(document.getElementById('grid'));
  quantum.getSession(function (err, response) {
   if (!response.userCtx.name) {
                      // nobody's logged in
                      
                      
                    } else {
                      // 
                      
                      quantum.getUser(response.userCtx.name, function (err, response) {
                          if (err) {
                            console.log(err);
                            if (err.name === 'not_found') {
                              console.log("// typo, or you don't have the privileges to see this user");

                            } else {
                            }
                          } else {
                            form_id = 'success';
                      $('.grop-from').attr('id', form_id);
                       
                            toast('Bienvenido (:');
                            console.log(response);  // response is the user object
                             $('.form-action').fadeOut('slow').remove;
                             $('.form-head').html('Bienvenido, '+response.nombre);
                             $('.initbutton').fadeOut('slow');
                             $('.page-header-container').prepend('  <div class="menu"><div class="title" onclick="f()">'+response.nombre+' <span class="fa fa-bars"></span><div class="arrow"></div></div><div class="dropdown"><p>Libros <span class="fa fa-inbox"></span></p><p>Opciones <span class="fa fa-gear"></span></p><p>Cerrar sesión <span class="fa fa-sign-out"></span></p></div></div>');
        $('.searchbar').fadeOut('slow');
     
                    } }); }  
}); });