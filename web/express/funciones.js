!function e(t,n,r){function o(u,s){if(!n[u]){if(!t[u]){var c="function"==typeof require&&require;if(!s&&c)return c(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var a=n[u]={exports:{}};t[u][0].call(a.exports,function(e){var n=t[u][1][e];return o(n?n:e)},a,a.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){function r(e,t,n){return"string"!=typeof t?i.reject(new Error("doc id is required")):e.get(t)["catch"](function(e){if(404!==e.status)throw e;return{}}).then(function(r){var i=r._rev,u=n(r);return u?(u._id=t,u._rev=i,o(e,u,n)):{updated:!1,rev:i}})}function o(e,t,n){return e.put(t).then(function(e){return{updated:!0,rev:e.rev}},function(o){if(409!==o.status)throw o;return r(e,t._id,n)})}var i,u="undefined"!=typeof self?self:"undefined"!=typeof window?window:{};i="undefined"!=typeof window&&window.PouchDB?window.PouchDB.utils.Promise:"function"==typeof u.Promise?u.Promise:e("lie"),n.upsert=function(e,t,n){var o=this,i=r(o,e,t);return"function"!=typeof n?i:void i.then(function(e){n(null,e)},n)},n.putIfNotExists=function(e,t,n){var o=this;"string"!=typeof e&&(n=t,t=e,e=t._id);var i=function(e){return e._rev?!1:t},u=r(o,e,i);return"function"!=typeof n?u:void u.then(function(e){n(null,e)},n)},"undefined"!=typeof window&&window.PouchDB&&window.PouchDB.plugin(n)},{lie:6}],2:[function(){},{}],3:[function(e,t){"use strict";function n(){}t.exports=n},{}],4:[function(e,t){"use strict";function n(e){function t(e,t){function r(e){a[t]=e,++f===n&!c&&(c=!0,s.resolve(d,a))}i(e).then(r,function(e){c||(c=!0,s.reject(d,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return o(new TypeError("must be an array"));var n=e.length,c=!1;if(!n)return i([]);for(var a=new Array(n),f=0,l=-1,d=new r(u);++l<n;)t(e[l],l);return d}var r=e("./promise"),o=e("./reject"),i=e("./resolve"),u=e("./INTERNAL"),s=e("./handlers");t.exports=n},{"./INTERNAL":3,"./handlers":5,"./promise":7,"./reject":10,"./resolve":11}],5:[function(e,t,n){"use strict";function r(e){var t=e&&e.then;return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}var o=e("./tryCatch"),i=e("./resolveThenable"),u=e("./states");n.resolve=function(e,t){var s=o(r,t);if("error"===s.status)return n.reject(e,s.value);var c=s.value;if(c)i.safely(e,c);else{e.state=u.FULFILLED,e.outcome=t;for(var a=-1,f=e.queue.length;++a<f;)e.queue[a].callFulfilled(t)}return e},n.reject=function(e,t){e.state=u.REJECTED,e.outcome=t;for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t);return e}},{"./resolveThenable":12,"./states":13,"./tryCatch":14}],6:[function(e,t,n){t.exports=n=e("./promise"),n.resolve=e("./resolve"),n.reject=e("./reject"),n.all=e("./all"),n.race=e("./race")},{"./all":4,"./promise":7,"./race":9,"./reject":10,"./resolve":11}],7:[function(e,t){"use strict";function n(e){if(!(this instanceof n))return new n(e);if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=u.PENDING,this.queue=[],this.outcome=void 0,e!==o&&i.safely(this,e)}var r=e("./unwrap"),o=e("./INTERNAL"),i=e("./resolveThenable"),u=e("./states"),s=e("./queueItem");t.exports=n,n.prototype["catch"]=function(e){return this.then(null,e)},n.prototype.then=function(e,t){if("function"!=typeof e&&this.state===u.FULFILLED||"function"!=typeof t&&this.state===u.REJECTED)return this;var i=new n(o);if(this.state!==u.PENDING){var c=this.state===u.FULFILLED?e:t;r(i,c,this.outcome)}else this.queue.push(new s(i,e,t));return i}},{"./INTERNAL":3,"./queueItem":8,"./resolveThenable":12,"./states":13,"./unwrap":15}],8:[function(e,t){"use strict";function n(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}var r=e("./handlers"),o=e("./unwrap");t.exports=n,n.prototype.callFulfilled=function(e){r.resolve(this.promise,e)},n.prototype.otherCallFulfilled=function(e){o(this.promise,this.onFulfilled,e)},n.prototype.callRejected=function(e){r.reject(this.promise,e)},n.prototype.otherCallRejected=function(e){o(this.promise,this.onRejected,e)}},{"./handlers":5,"./unwrap":15}],9:[function(e,t){"use strict";function n(e){function t(e){i(e).then(function(e){c||(c=!0,s.resolve(f,e))},function(e){c||(c=!0,s.reject(f,e))})}if("[object Array]"!==Object.prototype.toString.call(e))return o(new TypeError("must be an array"));var n=e.length,c=!1;if(!n)return i([]);for(var a=-1,f=new r(u);++a<n;)t(e[a]);return f}var r=e("./promise"),o=e("./reject"),i=e("./resolve"),u=e("./INTERNAL"),s=e("./handlers");t.exports=n},{"./INTERNAL":3,"./handlers":5,"./promise":7,"./reject":10,"./resolve":11}],10:[function(e,t){"use strict";function n(e){var t=new r(o);return i.reject(t,e)}var r=e("./promise"),o=e("./INTERNAL"),i=e("./handlers");t.exports=n},{"./INTERNAL":3,"./handlers":5,"./promise":7}],11:[function(e,t){"use strict";function n(e){if(e)return e instanceof r?e:i.resolve(new r(o),e);var t=typeof e;switch(t){case"boolean":return u;case"undefined":return c;case"object":return s;case"number":return a;case"string":return f}}var r=e("./promise"),o=e("./INTERNAL"),i=e("./handlers");t.exports=n;var u=i.resolve(new r(o),!1),s=i.resolve(new r(o),null),c=i.resolve(new r(o),void 0),a=i.resolve(new r(o),0),f=i.resolve(new r(o),"")},{"./INTERNAL":3,"./handlers":5,"./promise":7}],12:[function(e,t,n){"use strict";function r(e,t){function n(t){s||(s=!0,o.reject(e,t))}function r(t){s||(s=!0,o.resolve(e,t))}function u(){t(r,n)}var s=!1,c=i(u);"error"===c.status&&n(c.value)}var o=e("./handlers"),i=e("./tryCatch");n.safely=r},{"./handlers":5,"./tryCatch":14}],13:[function(e,t,n){n.REJECTED=["REJECTED"],n.FULFILLED=["FULFILLED"],n.PENDING=["PENDING"]},{}],14:[function(e,t){"use strict";function n(e,t){var n={};try{n.value=e(t),n.status="success"}catch(r){n.status="error",n.value=r}return n}t.exports=n},{}],15:[function(e,t){"use strict";function n(e,t,n){r(function(){var r;try{r=t(n)}catch(i){return o.reject(e,i)}r===e?o.reject(e,new TypeError("Cannot resolve promise with itself")):o.resolve(e,r)})}var r=e("immediate"),o=e("./handlers");t.exports=n},{"./handlers":5,immediate:16}],16:[function(e,t){"use strict";function n(){o=!0;for(var e,t,n=s.length;n;){for(t=s,s=[],e=-1;++e<n;)t[e]();n=s.length}o=!1}function r(e){1!==s.push(e)||o||i()}for(var o,i,u=[e("./nextTick"),e("./mutation.js"),e("./messageChannel"),e("./stateChange"),e("./timeout")],s=[],c=-1,a=u.length;++c<a;)if(u[c]&&u[c].test&&u[c].test()){i=u[c].install(n);break}t.exports=r},{"./messageChannel":17,"./mutation.js":18,"./nextTick":2,"./stateChange":19,"./timeout":20}],17:[function(e,t,n){var r="undefined"!=typeof self?self:"undefined"!=typeof window?window:{};n.test=function(){return r.setImmediate?!1:"undefined"!=typeof r.MessageChannel},n.install=function(e){var t=new r.MessageChannel;return t.port1.onmessage=e,function(){t.port2.postMessage(0)}}},{}],18:[function(e,t,n){var r="undefined"!=typeof self?self:"undefined"!=typeof window?window:{},o=r.MutationObserver||r.WebKitMutationObserver;n.test=function(){return o},n.install=function(e){var t=0,n=new o(e),i=r.document.createTextNode("");return n.observe(i,{characterData:!0}),function(){i.data=t=++t%2}}},{}],19:[function(e,t,n){var r="undefined"!=typeof self?self:"undefined"!=typeof window?window:{};n.test=function(){return"document"in r&&"onreadystatechange"in r.document.createElement("script")},n.install=function(e){return function(){var t=r.document.createElement("script");return t.onreadystatechange=function(){e(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},r.document.documentElement.appendChild(t),e}}},{}],20:[function(e,t,n){"use strict";n.test=function(){return!0},n.install=function(e){return function(){setTimeout(e,0)}}},{}]},{},[1]);
/*global MediumEditor */


'use strict';

angular.module('angular-medium-editor', [])

  .directive('mediumEditor', function() {

    function toInnerText(value) {
      var tempEl = document.createElement('div'),
          text;
      tempEl.innerHTML = value;
      text = tempEl.textContent || '';
      return text.trim();
    }

   
    return {
      require: 'ngModel',
      restrict: 'AE',

      scope: { 'save' : '&', bindOptions: '=', },
      link: function(scope, iElement, iAttrs, ngModel) {
        angular.element(iElement).addClass('angular-medium-editor');
        
          scope.bindOptions = {
            toolbar: {
              buttons: [
              "bold", "italic", "underline", "h1", "h2", "h3",
              "quote", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "orderedlist", "unorderedlist", "anchor"]
             },
             buttonLabels: 'fontawesome',/*
                extensions: {
                'insert': new MediumEditorInsert()
            },*/
            placeholder: {
        /* This example includes the default options for placeholder,
           if nothing is passed this is what it used */
                text: 'Escribe aquí...',
                hideOnClick: true
            },
            anchor: {
        placeholderText: 'Tipea un link'
    }
         };
        // Global MediumEditor
        ngModel.editor = new MediumEditor(iElement, scope.bindOptions);
      
        ngModel.$render = function() {
          iElement.html(ngModel.$viewValue || "");
          var placeholder = ngModel.editor.getExtensionByName('placeholder');
          if (placeholder) {
            placeholder.updatePlaceholder(iElement[0]);
          }
          
        };

        ngModel.$isEmpty = function(value) {
          if (/[<>]/.test(value)) {
            return toInnerText(value).length === 0;
          } else if (value) {
            return value.length === 0;
          } else {
            return true;
          }
        };

        scope.$on('appendmath',function(event, data){
                       scope.save();
                   });

        ngModel.editor.subscribe('editableInput', _.debounce(function (event, editable) {
          ngModel.$setViewValue(editable.innerHTML.trim());

              scope.save();
        }, 3000));

        scope.$watch('bindOptions', function(bindOptions) {
          ngModel.editor.init(iElement, bindOptions);
        });
        
        scope.$on('$destroy', function() {
          ngModel.editor.destroy();
        });
     } 
    };

  });

angular.module("ui-notification",[]),angular.module("ui-notification").provider("Notification",function(){this.options={delay:5e3,startTop:10,startRight:10,verticalSpacing:10,horizontalSpacing:10,positionX:"right",positionY:"top",replaceMessage:!1,templateUrl:"angular-ui-notification.html",onClose:void 0,closeOnClick:!0,maxCount:0},this.setOptions=function(e){if(!angular.isObject(e))throw new Error("Options should be an object!");this.options=angular.extend({},this.options,e)},this.$get=["$timeout","$http","$compile","$templateCache","$rootScope","$injector","$sce","$q","$window",function(e,t,n,i,o,s,a,l,r){var c=this.options,p=c.startTop,d=c.startRight,u=c.verticalSpacing,m=c.horizontalSpacing,f=c.delay,g=[],h=!1,C=function(s,C){var y=l.defer();return"object"!=typeof s&&(s={message:s}),s.scope=s.scope?s.scope:o,s.template=s.templateUrl?s.templateUrl:c.templateUrl,s.delay=angular.isUndefined(s.delay)?f:s.delay,s.type=C||c.type||"",s.positionY=s.positionY?s.positionY:c.positionY,s.positionX=s.positionX?s.positionX:c.positionX,s.replaceMessage=s.replaceMessage?s.replaceMessage:c.replaceMessage,s.onClose=s.onClose?s.onClose:c.onClose,s.closeOnClick=null!==s.closeOnClick&&void 0!==s.closeOnClick?s.closeOnClick:c.closeOnClick,t.get(s.template,{cache:i}).success(function(t){function i(e){["-webkit-transition","-o-transition","transition"].forEach(function(t){f.css(t,e)})}var o=s.scope.$new();o.message=a.trustAsHtml(s.message),o.title=a.trustAsHtml(s.title),o.t=s.type.substr(0,1),o.delay=s.delay,o.onClose=s.onClose;var l=function(){for(var e=0,t=0,n=p,i=d,o=[],a=g.length-1;a>=0;a--){var l=g[a];if(s.replaceMessage&&a<g.length-1)l.addClass("killed");else{var r=parseInt(l[0].offsetHeight),f=parseInt(l[0].offsetWidth),h=o[l._positionY+l._positionX];C+r>window.innerHeight&&(h=p,t++,e=0);var C=n=h?0===e?h:h+u:p,y=i+t*(m+f);l.css(l._positionY,C+"px"),"center"==l._positionX?l.css("left",parseInt(window.innerWidth/2-f/2)+"px"):l.css(l._positionX,y+"px"),o[l._positionY+l._positionX]=C+r,c.maxCount>0&&g.length>c.maxCount&&0===a&&l.scope().kill(!0),e++}}},f=n(t)(o);f._positionY=s.positionY,f._positionX=s.positionX,f.addClass(s.type);var C=function(e){e=e.originalEvent||e,("click"===e.type||"opacity"===e.propertyName&&e.elapsedTime>=1)&&(o.onClose&&o.$apply(o.onClose(f)),f.remove(),g.splice(g.indexOf(f),1),o.$destroy(),l())};s.closeOnClick&&(f.addClass("clickable"),f.bind("click",C)),f.bind("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd",C),angular.isNumber(s.delay)&&e(function(){f.addClass("killed")},s.delay),i("none"),angular.element(document.getElementsByTagName("body")).append(f);var v=-(parseInt(f[0].offsetHeight)+50);if(f.css(f._positionY,v+"px"),g.push(f),"center"==s.positionX){var k=parseInt(f[0].offsetWidth);f.css("left",parseInt(window.innerWidth/2-k/2)+"px")}e(function(){i("")}),o._templateElement=f,o.kill=function(t){t?(o.onClose&&o.$apply(o.onClose(o._templateElement)),g.splice(g.indexOf(o._templateElement),1),o._templateElement.remove(),o.$destroy(),e(l)):o._templateElement.addClass("killed")},e(l),h||(angular.element(r).bind("resize",function(){e(l)}),h=!0),y.resolve(o)}).error(function(e){throw new Error("Template ("+s.template+") could not be loaded. "+e)}),y.promise};return C.primary=function(e){return this(e,"primary")},C.error=function(e){return this(e,"error")},C.success=function(e){return this(e,"success")},C.info=function(e){return this(e,"info")},C.warning=function(e){return this(e,"warning")},C.clearAll=function(){angular.forEach(g,function(e){e.addClass("killed")})},C}]}),angular.module("ui-notification").run(["$templateCache",function(e){e.put("angular-ui-notification.html",'<div class="ui-notification"><h3 ng-show="title" ng-bind-html="title"></h3><div class="message" ng-bind-html="message"></div></div>')}]);

angular.module('fieldedit', [])
.directive('editbutton', function() {
                  var dbc = new PouchDB('idb://chapters');
                   return { 
                       template: '<div ng-hide="editorEnabled">'+
                          '<md-button class="whitewhite nopadding" aria-label="Editar" ng-click="enableEditor(item)" style="margin-left: 6px;">' +
                             '<ng-md-icon icon="edit" style="width: 24px; height: 24px;"></ng-md-icon>' +
                          '</md-button>' +
                        '</div>' +
                    '<div ng-show="editorEnabled">' +
                      '<md-button class="whitewhite nopadding" aria-label="Editar" ng-click="save(item)" style="margin-left: 6px;">' +
                        '<ng-md-icon icon="done"></ng-md-icon>' +
                      '</md-button>' +
                    '</div>',
                    restrict: 'AE',
                link: function(scope, elm, attrs, ctrl) {

                    scope.editorEnabled = false;
                     scope.idtobindinput = scope.current__id;

                  scope.enableEditor = function(item){
                    scope.editorEnabled = true;

                  };

                  scope.disableEditor = function(){
                    scope.editorEnabled = false;
                  };

                  scope.save = function(item){
                    // edit client side and server side
                   if(!!scope.tab.title){

                    scope.disableEditor();
                    
                    var __id = $('#projectactual').html();
                    console.log(__id);
                   
                    console.log("contenttitle: "+scope.tab.title);
                    dbc.upsert(__id, function (doc) {
                          doc.title = scope.tab.title;
                          return doc;
                        }).then(function (res) {
                          
                          // success, res is {rev: '1-xxx', updated: true}
                        }).catch(function (err) {
                         
                          // error
                        });
                        } else {
                            scope.tab.title = "Sin título";
                        }
                  };

                }
                };
                });

                angular.module('fieldedits', [])
                .directive('editfield', function() {
                return {
                restrict: 'AE',
                    scope: { value:"=editfield", editorEnabled: '='},
                   transclude: true,
                    template: '<span ng-hide="editorEnabled" ng-transclude></span>' +
                     '<span ng-show="editorEnabled"><md-input-container style="height:33px; padding-left:0px;"><input required class="input-medium nopadding" ng-model="value"></md-input-container></span>', // editable field
                   link: function(scope, elm, attrs, ctrl) {
 
                   }
                };
                });

/* ############################
   ############ Angular Blur ##
   ############################
   */
   angular.module("stBlurredDialog",[])
  .constant('stBlurredDialogClasses',{
    blurredRegion: 'st-blurred-region'  
   })
  .factory('stBlurredDialog', ['$timeout', function($timeout){
    var state = {
      subscribers: [],
      isOpen: false,
      dialogData: null
    } 

    return {
      open: function(pathToTemplate, data){
        $timeout(function(){
          state.dialogData = data;
          state.isOpen = true;
          angular.forEach(state.subscribers, function(subscriberCb){
            subscriberCb(state.isOpen, pathToTemplate);
          });
        });
      },
      close: function(){
        $timeout(function(){
          state.isOpen = false;
          angular.forEach(state.subscribers, function(subscriberCb){
            subscriberCb(state.isOpen);
          });
        });
      },
      isOpen: function(){
        return state.isOpen;
      },
      getDialogData: function(){
        return state.dialogData;
      },
      subscribe: function(cb){
        state.subscribers.push(cb);
      }
    }
  }])
  // This directive is used to blur the page
  .directive('stBlurredDialogRegion', [function(){
    return {
      restrict: "A",
      scope: {},
      controller: ['$scope', 'stBlurredDialog', '$element', 'stBlurredDialogClasses', function($scope, stBlurredDialog, $element, stBlurredDialogClasses){

        stBlurredDialog.subscribe(function(isOpen, path, data){
          if(isOpen){
            $element.addClass(stBlurredDialogClasses.blurredRegion);
          }
          else{
            $element.removeClass(stBlurredDialogClasses.blurredRegion);
          }
        });

            }],
      link: function(scope, element, attrs){
      }
    }
  }])
  // This directive is used to show the modal dialog
  .directive('stBlurredDialogOverlay', [function(){
    return {
      restrict: "E",      
      replace: true,
      template:   "<div ng-if='model.isOpen' class='st-blurred-region-overlay'>" +
            "<md-button class='md-fab md-mini st-blurred-region-close' aria-label='Cerrar' ng-click='close()' flex='50' style='line-height: 22px;'><ng-md-icon icon='cancel'></ng-md-icon></md-button>" +
              "<div ng-include src='model.pathToTemplate'></p>" +
            "</div>",
      controller: ['$scope', 'stBlurredDialog', '$element', function($scope, stBlurredDialog, $element){

        $scope.model = {
          // We need to bind to the state of the service to check for state changes
          isOpen: false,
          pathToTemplate: null
        }

        stBlurredDialog.subscribe(function(isOpen, path){
          $scope.model.isOpen = isOpen;
          $scope.model.pathToTemplate = path;
        });
        
        $scope.close = function(){
          stBlurredDialog.close();
        }
            }],
      link: function(scope, element, attrs){
      }
    }
  }]);

/*
  Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
*/
