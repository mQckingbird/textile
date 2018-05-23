(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MediumEditorInsert"] = factory();
	else
		root["MediumEditorInsert"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Core = __webpack_require__(2);

	var _Core2 = _interopRequireDefault(_Core);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MediumEditorInsert = MediumEditor.Extension.extend({
	    name: 'insert',

	    addons: {
	        images: true,
	        embeds: false
	    },

	    _initializedAddons: {},

	    init: function init() {
	        MediumEditor.Extension.prototype.init.apply(this, arguments);

	        this.core = new _Core2.default(this);
	    },

	    destroy: function destroy() {
	        this.core.removeButtons();
	    },

	    getCore: function getCore() {
	        return this.core;
	    },

	    getAddons: function getAddons() {
	        return this._initializedAddons;
	    },

	    getAddon: function getAddon(name) {
	        return this._initializedAddons[name];
	    }
	});

	exports.default = MediumEditorInsert;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var utils = {
	    ucfirst: function ucfirst(str) {
	        return str.charAt(0).toUpperCase() + str.slice(1);
	    },

	    generateRandomString: function generateRandomString() {
	        var length = arguments.length <= 0 || arguments[0] === undefined ? 15 : arguments[0];

	        return Math.random().toString(36).substr(2, length);
	    },

	    getClosestWithClassName: function getClosestWithClassName(el, className) {
	        return MediumEditor.util.traverseUp(el, function (element) {
	            return element.classList.contains(className);
	        });
	    },

	    isChildOf: function isChildOf(el, parent) {
	        return MediumEditor.util.traverseUp(el, function (element) {
	            return element === parent;
	        }) ? true : false;
	    },

	    getElementsByClassName: function getElementsByClassName(parents, className) {
	        var results = [];

	        Array.prototype.forEach.call(parents, function (editor) {
	            var elements = editor.getElementsByClassName(className);

	            Array.prototype.forEach.call(elements, function (element) {
	                results.push(element);
	            });
	        });

	        return results;
	    },

	    getElementsByTagName: function getElementsByTagName(parents, tagName) {
	        var results = [];

	        Array.prototype.forEach.call(parents, function (editor) {
	            var elements = editor.getElementsByTagName(tagName);

	            Array.prototype.forEach.call(elements, function (element) {
	                results.push(element);
	            });
	        });

	        return results;
	    }
	};

	exports.default = utils;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _Images = __webpack_require__(4);

	var _Images2 = _interopRequireDefault(_Images);

	var _Embeds = __webpack_require__(3);

	var _Embeds2 = _interopRequireDefault(_Embeds);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Core = function () {
	    function Core(plugin) {
	        _classCallCheck(this, Core);

	        this._plugin = plugin;
	        this._editor = this._plugin.base;

	        this.initAddons();
	        this.addButtons();
	        this.events();
	    }

	    _createClass(Core, [{
	        key: 'events',
	        value: function events() {
	            var _this = this;

	            var addonActions = void 0;

	            // This could be chained when medium-editor 5.15.2 is released
	            // https://github.com/yabwe/medium-editor/pull/1046
	            this._plugin.on(document, 'click', this.toggleButtons.bind(this));
	            this._plugin.on(document, 'keyup', this.toggleButtons.bind(this));
	            this._plugin.on(this.buttons.getElementsByClassName('medium-editor-insert-buttons-show')[0], 'click', this.toggleAddons.bind(this));

	            // This could be written in one statement when medium-editor 5.15.2 is released
	            // https://github.com/yabwe/medium-editor/pull/1046
	            addonActions = this.buttons.getElementsByClassName('medium-editor-insert-action');
	            Array.prototype.forEach.call(addonActions, function (action) {
	                _this._plugin.on(action, 'click', _this.handleAddonClick.bind(_this));
	            });

	            this._plugin.on(window, 'resize', this.positionButtons.bind(this));
	        }
	    }, {
	        key: 'initAddons',
	        value: function initAddons() {
	            var _this2 = this;

	            // Initialize all default addons, we'll delete ones we don't need later
	            this._plugin._initializedAddons = {
	                images: new _Images2.default(this._plugin, this._plugin.addons.images),
	                embeds: new _Embeds2.default(this._plugin, this._plugin.addons.embeds)
	            };

	            Object.keys(this._plugin.addons).forEach(function (name) {
	                var addonOptions = _this2._plugin.addons[name];

	                // If the addon is custom one
	                if (!_this2._plugin._initializedAddons[name]) {
	                    if (typeof addonOptions === 'function') {
	                        _this2._plugin._initializedAddons[name] = new addonOptions(_this2._plugin);
	                    } else {
	                        window.console.error('I don\'t know how to initialize custom "' + name + '" addon!');
	                    }
	                }

	                // Delete disabled addon
	                if (!addonOptions) {
	                    delete _this2._plugin._initializedAddons[name];
	                }
	            });
	        }
	    }, {
	        key: 'addButtons',
	        value: function addButtons() {
	            var addons = this._plugin.getAddons();
	            var html = void 0;

	            this.buttons = document.createElement('div');
	            this.buttons.id = 'medium-editor-insert-' + this._plugin.getEditorId();
	            this.buttons.classList.add('medium-editor-insert-buttons');
	            this.buttons.setAttribute('contentediable', false);

	            html = '<a class="medium-editor-insert-buttons-show">+</a>\n            <ul class="medium-editor-insert-buttons-addons">';

	            Object.keys(addons).forEach(function (name) {
	                var addon = addons[name];

	                html += '<li><a class="medium-editor-insert-action" data-addon="' + name + '">' + addon.label + '</a></li>';
	            });

	            html += '</ul>';

	            this.buttons.innerHTML = html;

	            document.body.appendChild(this.buttons);
	        }
	    }, {
	        key: 'removeButtons',
	        value: function removeButtons() {
	            this.buttons.remove();
	        }
	    }, {
	        key: 'positionButtons',
	        value: function positionButtons() {
	            var el = void 0,
	                elPosition = void 0,
	                addons = void 0,
	                addonButton = void 0,
	                addonsStyle = void 0,
	                addonButtonStyle = void 0,
	                position = void 0;

	            // Don't position buttons if they aren't active
	            if (this.buttons.classList.contains('medium-editor-insert-buttons-active') === false) {
	                return;
	            }

	            el = this._editor.getSelectedParentElement();
	            elPosition = el.getBozundingClientRect();
	            addons = this.buttons.getElementsByClassName('medium-editor-insert-buttons-addons')[0];
	            addonButton = this.buttons.getElementsByClassName('medium-editor-insert-action')[0];
	            addonsStyle = window.getComputedStyle(addons);
	            addonButtonStyle = window.getComputedStyle(addonButton);

	            // Calculate position
	            position = {
	                top: window.scrollY + elPosition.top,
	                left: window.scrollX + elPosition.left - parseInt(addonsStyle.left, 12) - parseInt(addonButtonStyle.marginLeft, 10)
	            };

	            // If left position is lower than 0, the buttons would be out of the viewport.
	            // In that case, align buttons with the editor
	            position.left = position.left < 0 ? elPosition.left : position.left;

	            this.buttons.style.left = position.left + 'px';
	            this.buttons.style.top = position.top + 'px';
	        }
	    }, {
	        key: 'toggleButtons',
	        value: function toggleButtons() {
	            var el = this._editor.getSelectedParentElement();

	            if (this.shouldDisplayButtonsOnElement(el)) {
	                this.selectElement(el);
	                this.showButtons();
	            } else {
	                this.deselectElement();
	                this.hideButtons();
	            }
	        }
	    }, {
	        key: 'shouldDisplayButtonsOnElement',
	        value: function shouldDisplayButtonsOnElement(el) {
	            var addons = this._plugin.getAddons(),
	                addonClassNames = [];
	            var isAddon = false,
	                belongsToEditor = false;

	            // Don't show buttons when the element has text
	            if (el.innerText.trim() !== '') {
	                return false;
	            }

	            // Don't show buttons when the editor doesn't belong to editor
	            this._plugin.getEditorElements().forEach(function (editor) {
	                if (_utils2.default.isChildOf(el, editor)) {
	                    belongsToEditor = true;
	                    return;
	                }
	            });

	            if (!belongsToEditor) {
	                return false;
	            }

	            // Get class names used by addons
	            Object.keys(addons).forEach(function (addonName) {
	                var addon = addons[addonName];
	                if (addon.elementClassName) {
	                    addonClassNames.push(addon.elementClassName);
	                }
	            });

	            // Don't show buttons if the element is an addon element
	            // - when the element has an addon class, or some of its parents have it
	         
	            return !isAddon;
	        }
	    }, {
	        key: 'selectElement',
	        value: function selectElement(el) {
	            this.selectedElement = el;
	        }
	    }, {
	        key: 'deselectElement',
	        value: function deselectElement() {
	            this.selectedElement = null;
	        }
	    }, {
	        key: 'showButtons',
	        value: function showButtons() {
	            this.buttons.classList.add('medium-editor-insert-buttons-active');
	            this.positionButtons();
	        }
	    }, {
	        key: 'hideButtons',
	        value: function hideButtons() {
	            this.buttons.classList.remove('medium-editor-insert-buttons-active');
	            this.buttons.classList.remove('medium-editor-insert-addons-active');
	        }
	    }, {
	        key: 'toggleAddons',
	        value: function toggleAddons() {
	            this.buttons.classList.toggle('medium-editor-insert-addons-active');
	        }
	    }, {
	        key: 'handleAddonClick',
	        value: function handleAddonClick(e) {
	            var name = e.currentTarget.getAttribute('data-addon');

	            e.preventDefault();

	            this._plugin.getAddon(name).handleClick(e);
	        }
	    }]);

	    return Core;
	}();

	exports.default = Core;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Embeds = function () {
		function Embeds(plugin, options) {
			_classCallCheck(this, Embeds);

			this._plugin = plugin;
			this._editor = this._plugin.base;

			this.options = {
				label: '<span class="fa fa-youtube-play"></span>'
			};

			Object.assign(this.options, options);

			this.label = this.options.label;
		}

		_createClass(Embeds, [{
			key: 'handleClick',
			value: function handleClick() {
				window.console.log('embeds clicked');
			}
		}]);

		return Embeds;
	}();

	exports.default = Embeds;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _Toolbar = __webpack_require__(5);

	var _Toolbar2 = _interopRequireDefault(_Toolbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Images = function () {
	    function Images(plugin, options) {
	        _classCallCheck(this, Images);

	        this.options = {
	            label: '<span class="fa fa-camera"></span>',
	            preview: true,
	            deleteMethod: 'DELETE',
	            deleteData: {}
	        };

	        Object.assign(this.options, options);

	        this._plugin = plugin;
	        this._editor = this._plugin.base;
	        this.elementClassName = 'medium-editor-insert-images';
	        this.activeClassName = 'medium-editor-insert-image-active';
	        this.label = this.options.label;

	        this.initToolbar();
	        this.events();
	    }

	    _createClass(Images, [{
	        key: 'events',
	        value: function events() {
	            var _this = this;

	            this._plugin.on(document, 'click', this.unselectImage.bind(this));
	            this._plugin.on(document, 'keydown', this.removeImage.bind(this));

	            this._plugin.getEditorElements().forEach(function (editor) {
	                _this._plugin.on(editor, 'click', _this.selectImage.bind(_this));
	            });
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick() {
	            this._input = document.createElement('input');
	            this._input.type = 'file';
	            this._input.multiple = true;

	            this._plugin.on(this._input, 'change', this.uploadFiles.bind(this));

	            this._input.click();
	        }
	    }, {
	        key: 'initToolbar',
	        value: function initToolbar() {
	            this.toolbar = new _Toolbar2.default({
	                plugin: this._plugin,
	                type: 'images',
	                activeClassName: this.activeClassName,
	                buttons: [{
	                    name: 'align-left',
	                    action: 'left',
	                    label: '<i class="fa fa-align-left"></i>'
	                }, {
	                    name: 'align-center',
	                    action: 'center',
	                    label: '<i class="fa fa-align-center"></i>'
	                }, {
	                    name: 'align-right',
	                    action: 'right',
	                    label: '<i class="fa fa-align-right"></i>'
	                }]
	            });

	            this._editor.extensions.push(this.toolbar);
	        }
	    }, {
	        key: 'uploadFiles',
	        value: function uploadFiles() {
	            var _this2 = this;

	            var paragraph = this._plugin.getCore().selectedElement;

	            // Replace paragraph with div, because figure is a block element
	            // and can't be nested inside paragraphs
	            if (paragraph.nodeName.toLowerCase() === 'p') {
	                var div = document.createElement('div');

	                paragraph.parentNode.insertBefore(div, paragraph);
	                this._plugin.getCore().selectElement(div);
	                paragraph.remove();
	            }

	            Array.prototype.forEach.call(this._input.files, function (file) {
	                // Generate uid for this image, so we can identify it later
	                // and we can replace preview image with uploaded one
	                var uid = _utils2.default.generateRandomString();

	                if (_this2.options.preview) {
	                    _this2.preview(file, uid);
	                }

	            });

	            this._plugin.getCore().hideButtons();
	        }
	    }, {
	        key: 'preview',
	        value: function preview(file, uid) {
	            var _this3 = this;

	            var reader = new FileReader();

	            reader.onload = function (e) {
	                _this3.insertImage(e.target.result, uid);
	            };

	            reader.readAsDataURL(file);
	        }
	    }, {
	        key: 'insertImage',
	        value: function insertImage(url, uid) {
	            var el = this._plugin.getCore().selectedElement,
	                figure = document.createElement('p'),
	                img = document.createElement('img');
	            var domImage = void 0;

	            img.alt = '';

	            if (uid) {
	                img.setAttribute('data-uid', uid);
	            }

	            // If we're dealing with a preview image,
	            // we don't have to preload it before displaying
	            if (url.match(/^data:/)) {
	                img.src = url;
	                figure.appendChild(img);
	                el.appendChild(figure);
	            } else {
	                domImage = new Image();
	                domImage.onload = function () {
	                    img.src = domImage.src;
	                    figure.appendChild(img);
	                    el.appendChild(figure);
	                };
	                domImage.src = url;
	            }

	            el.classList.add(this.elementClassName);
	            // Return domImage so we can test this function easily
	            return domImage;
	        }
	    }, {
	        key: 'replaceImage',
	        value: function replaceImage(image, url) {
	            var domImage = new Image();

	            domImage.onload = function () {
	                image.src = domImage.src;
	                image.removeAttribute('data-uid');
	            };

	            domImage.src = url;

	            // Return domImage so we can test this function easily
	            return domImage;
	        }
	    }, {
	        key: 'selectImage',
	        value: function selectImage(e) {
	            var el = e.target;

	            if (el.nodeName.toLowerCase() === 'img' && _utils2.default.getClosestWithClassName(el, this.elementClassName)) {
	                el.classList.add(this.activeClassName);

	                this._editor.selectElement(el);
	            }
	        }
	    }, {
	        key: 'unselectImage',
	        value: function unselectImage(e) {
	            var _this5 = this;

	            var el = e.target;
	            var clickedImage = void 0,
	                images = void 0;

	            // Unselect all selected images. If an image is clicked, unselect all except this one.
	            if (el.nodeName.toLowerCase() === 'img' && el.classList.contains(this.activeClassName)) {
	                clickedImage = el;
	            }

	            images = _utils2.default.getElementsByClassName(this._plugin.getEditorElements(), this.activeClassName);
	            Array.prototype.forEach.call(images, function (image) {
	                if (image !== clickedImage) {
	                    image.classList.remove(_this5.activeClassName);
	                }
	            });
	        }
	    }, {
	        key: 'removeImage',
	        value: function removeImage(e) {
	            var _this6 = this;

	            if ([MediumEditor.util.keyCode.BACKSPACE, MediumEditor.util.keyCode.DELETE].indexOf(e.which) > -1) {
	                (function () {
	                    var images = _utils2.default.getElementsByClassName(_this6._plugin.getEditorElements(), _this6.activeClassName),
	                        selection = window.getSelection();
	                    var selectedHtml = void 0;

	                    // Remove image even if it's not selected, but backspace/del is pressed in text
	                    if (selection && selection.rangeCount) {
	                        var range = MediumEditor.selection.getSelectionRange(document),
	                            focusedElement = MediumEditor.selection.getSelectedParentElement(range),
	                            caretPosition = MediumEditor.selection.getCaretOffsets(focusedElement).left;
	                        var sibling = void 0;

	                        // Is backspace pressed and caret is at the beginning of a paragraph, get previous element
	                        if (e.which === MediumEditor.util.keyCode.BACKSPACE && caretPosition === 0) {
	                            sibling = focusedElement.previousElementSibling;
	                            // Is del pressed and caret is at the end of a paragraph, get next element
	                        } else if (e.which === MediumEditor.util.keyCode.DELETE && caretPosition === focusedElement.innerText.length) {
	                                sibling = focusedElement.nextElementSibling;
	                            }

	                        if (sibling && sibling.classList.contains('medium-editor-insert-images')) {
	                            var newImages = sibling.getElementsByTagName('img');
	                            Array.prototype.forEach.call(newImages, function (image) {
	                                images.push(image);
	                            });
	                        }

	                        // If text is selected, find images in the selection
	                        selectedHtml = MediumEditor.selection.getSelectionHtml(document);
	                        if (selectedHtml) {
	                            var temp = document.createElement('p');
	                            var wrappers = void 0,
	                                _newImages = void 0;
	                            temp.innerHTML = selectedHtml;

	                            wrappers = temp.getElementsByClassName('medium-editor-insert-images');
	                            _newImages = _utils2.default.getElementsByTagName(wrappers, 'img');

	                            Array.prototype.forEach.call(_newImages, function (image) {
	                                images.push(image);
	                            });
	                        }
	                    }

	                    if (images.length) {
	                        if (!selectedHtml) {
	                            e.preventDefault();
	                        }

	                        images.forEach(function (image) {
	                            var wrapper = _utils2.default.getClosestWithClassName(image, 'medium-editor-insert-images');
	                            _this6.deleteFile(image.src);

	                            image.parentNode.remove();

	                            // If wrapper has no images anymore, remove it
	                            if (wrapper.childElementCount === 0) {
	                                var next = wrapper.nextElementSibling,
	                                    prev = wrapper.previousElementSibling;

	                                wrapper.remove();

	                                // If there is no selection, move cursor at the beginning of next paragraph (if delete is pressed),
	                                // or nove it at the end of previous paragraph (if backspace is pressed)
	                                if (!selectedHtml) {
	                                    if (next || prev) {
	                                        if (next && e.which === MediumEditor.util.keyCode.DELETE || !prev) {
	                                            MediumEditor.selection.moveCursor(document, next, 0);
	                                        } else {
	                                            MediumEditor.selection.moveCursor(document, prev.lastChild, prev.lastChild.textContent.length);
	                                        }
	                                    }
	                                }
	                            }
	                        });
	                    }
	                })();
	            }
	        }
	    }, {
	        key: 'deleteFile',
	        value: function deleteFile(image) {
	            if (this.options.deleteUrl) {
	                var xhr = new XMLHttpRequest(),
	                    data = Object.assign({}, {
	                    file: image
	                }, this.options.deleteData);

	                xhr.open(this.options.deleteMethod, this.options.deleteUrl, true);
	                xhr.send(data);
	            }
	        }
	    }]);

	    return Images;
	}();

	exports.default = Images;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var _utils2 = _interopRequireDefault(_utils);

	var _ToolbarButton = __webpack_require__(15);

	var _ToolbarButton2 = _interopRequireDefault(_ToolbarButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MediumEditorToolbar = MediumEditor.extensions.toolbar;

	var Toolbar = function (_MediumEditorToolbar) {
	    _inherits(Toolbar, _MediumEditorToolbar);

	    function Toolbar(options) {
	        _classCallCheck(this, Toolbar);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toolbar).call(this, options));

	        _this.name = options.type + 'Toolbar';

	        options.buttons.forEach(function (buttonOptions) {
	            var button = new _ToolbarButton2.default(Object.assign({}, {
	                window: _this.plugin.window,
	                document: _this.plugin.document,
	                base: _this.plugin.base
	            }, buttonOptions));

	            button.init();
	            _this.plugin.base.extensions.push(button);
	        });

	        _this.window = options.plugin.window;
	        _this.document = options.plugin.document;
	        _this.base = options.plugin.base;

	        _this.init();
	        return _this;
	    }

	    _createClass(Toolbar, [{
	        key: 'createToolbar',
	        value: function createToolbar() {
	            var toolbar = this.document.createElement('div');

	            toolbar.id = 'medium-editor-insert-' + this.type + '-toolbar-' + this.getEditorId();
	            toolbar.className = 'medium-editor-toolbar';

	            if (this.static) {
	                toolbar.className += ' static-toolbar';
	            } else if (this.relativeContainer) {
	                toolbar.className += ' medium-editor-relative-toolbar';
	            } else {
	                toolbar.className += ' medium-editor-stalker-toolbar';
	            }

	            toolbar.appendChild(this.createToolbarButtons());

	            // Add any forms that extensions may have
	            this.forEachExtension(function (extension) {
	                if (extension.hasForm) {
	                    toolbar.appendChild(extension.getForm());
	                }
	            });

	            this.attachEventHandlers();

	            return toolbar;
	        }
	    }, {
	        key: 'createToolbarButtons',
	        value: function createToolbarButtons() {
	            var _this2 = this;

	            var ul = this.document.createElement('ul');
	            var li = void 0,
	                btn = void 0,
	                buttons = void 0,
	                extension = void 0,
	                buttonName = void 0,
	                buttonOpts = void 0;

	            ul.id = 'medium-editor-insert-' + this.type + '-toolbar-actions' + this.getEditorId();
	            ul.className = 'medium-editor-toolbar-actions';
	            ul.style.display = 'block';

	            this.buttons.forEach(function (button) {
	                if (typeof button === 'string') {
	                    buttonName = button;
	                    buttonOpts = null;
	                } else {
	                    buttonName = button.name;
	                    buttonOpts = button;
	                }

	                // If the button already exists as an extension, it'll be returned
	                // othwerise it'll create the default built-in button
	                extension = _this2.base.addBuiltInExtension(buttonName, buttonOpts);

	                if (extension && typeof extension.getButton === 'function') {
	                    btn = extension.getButton(_this2.base);
	                    li = _this2.document.createElement('li');
	                    if (MediumEditor.util.isElement(btn)) {
	                        li.appendChild(btn);
	                    } else {
	                        li.innerHTML = btn;
	                    }
	                    ul.appendChild(li);
	                }
	            }, this);

	            buttons = ul.querySelectorAll('button');
	            if (buttons.length > 0) {
	                buttons[0].classList.add(this.firstButtonClass);
	                buttons[buttons.length - 1].classList.add(this.lastButtonClass);
	            }

	            return ul;
	        }
	    }, {
	        key: 'checkState',
	        value: function checkState() {
	            var _this3 = this;

	            var activeElements = void 0;

	            if (this.base.preventSelectionUpdates) {
	                return;
	            }

	            // Wait for elements to be selected
	            setTimeout(function () {
	                activeElements = _utils2.default.getElementsByClassName(_this3.getEditorElements(), _this3.activeClassName);

	                // Hide toolbar when no elements are selected
	                if (activeElements.length === 0) {
	                    return _this3.hideToolbar();
	                }

	                // Now we know there's a focused editable with a selection
	                _this3.showAndUpdateToolbar();
	            }, 10);
	        }
	    }, {
	        key: 'setToolbarPosition',
	        value: function setToolbarPosition() {
	            var container = _utils2.default.getElementsByClassName(this.getEditorElements(), this.activeClassName)[0];
	            var anchorPreview = void 0;

	            // If there isn't a valid selection, bail
	            if (!container) {
	                return this;
	            }

	            this.showToolbar();
	            this.positionStaticToolbar(container);

	            anchorPreview = this.base.getExtensionByName('anchor-preview');

	            if (anchorPreview && typeof anchorPreview.hidePreview === 'function') {
	                anchorPreview.hidePreview();
	            }
	        }
	    }]);

	    return Toolbar;
	}(MediumEditorToolbar);

	exports.default = Toolbar;
	module.exports = exports['default'];

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ToolbarButton = MediumEditor.extensions.button.extend({
	    init: function init() {
	        this.button = this.document.createElement('button');
	        this.button.classList.add('medium-editor-action');
	        this.button.innerHTML = '<b>' + this.label + '</b>';

	        this.on(this.button, 'click', this.handleClick.bind(this));
	    },

	    getButton: function getButton() {
	        return this.button;
	    },

	    handleClick: function handleClick() {
	        console.log(this.name + ' clicked!');
	    }
	});

	exports.default = ToolbarButton;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;