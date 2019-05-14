/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/compile/index.js":
/*!***********************************!*\
  !*** ./src/core/compile/index.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Compile; });\nclass Compile {\r\n    constructor (el, vm) {\r\n        vm.$el = document.querySelector(el)\r\n        this.replace(vm.$el, vm)\r\n    }\r\n    replace (frag, vm) {\r\n        Array.from(frag.childNodes).forEach(node => {\r\n            let txt = node.textContent\r\n            //正则匹配{{}}\r\n            let reg = /\\{\\{(.*?)\\}\\}/g\r\n            // 如果是文本节点，且包含{{}}\r\n            if (node.nodeType === 3 && reg.test(txt)) {\r\n                debugger\r\n                let arr = RegExp.$1.split('.')\r\n                let val = vm\r\n                arr.forEach(key => {\r\n                    val = val[key]\r\n                });\r\n                node.textContent = txt.replace(reg, val).trim()\r\n                vm.$watch(RegExp.$1, function (newVal) {\r\n                    node.textContent = txt.replace(reg, newVal).trim()\r\n                })\r\n            }\r\n\r\n            // 如果是元素节点\r\n            if (node.nodeType === 1) {\r\n                let nodeAttr = node.attributes\r\n                Array.from(nodeAttr).forEach(attr => {\r\n                    let name = attr.name\r\n                    let exp = attr.value\r\n                    // 如果是通过 v- 指令绑定的元素，则设置节点的value为绑定的相应的值\r\n                    if (name.includes('v-')){\r\n                        node.value = vm[exp]\r\n                    }\r\n                    // 监听变化\r\n                    vm.$watch(exp, function(newVal) {\r\n                        node.value = newVal\r\n                    });\r\n\r\n                    node.addEventListener('input', e => {\r\n                        let newVal = e.target.value\r\n                        let arr = exp.split('.')\r\n                        let val = vm\r\n                        // 考虑到 v-model=\"deep.a\" 这种情况\r\n                        arr.forEach((key, i)=> {\r\n                            if (i === arr.length - 1) {\r\n                                val[key] = newVal\r\n                                return\r\n                            }\r\n                            val = val[key]\r\n                        });\r\n                    });\r\n                });\r\n            }\r\n\r\n            // 如果还有子节点，继续递归replace\r\n            if (node.childNodes && node.childNodes.length) {\r\n                this.replace(node, vm)\r\n            }\r\n        })\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/core/compile/index.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Wue; });\n/* harmony import */ var _instance_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instance/proxy */ \"./src/core/instance/proxy.js\");\n/* harmony import */ var _instance_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instance/init */ \"./src/core/instance/init.js\");\n/* harmony import */ var _compile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compile */ \"./src/core/compile/index.js\");\n/* harmony import */ var _observer_Watcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./observer/Watcher */ \"./src/core/observer/Watcher.js\");\n\r\n\r\n\r\n\r\n\r\nclass Wue {\r\n    constructor (options) {\r\n        let vm = this\r\n        vm.$options = options\r\n        vm.$watch = function (key, cb) {\r\n            new _observer_Watcher__WEBPACK_IMPORTED_MODULE_3__[\"default\"](vm, key, cb)\r\n        }\r\n        Object(_instance_init__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(vm)\r\n        for (let key in vm._data) {\r\n            Object(_instance_proxy__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(vm, '_data', key)\r\n        }\r\n        new _compile__WEBPACK_IMPORTED_MODULE_2__[\"default\"](vm.$options.el, vm)\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/core/index.js?");

/***/ }),

/***/ "./src/core/instance/init.js":
/*!***********************************!*\
  !*** ./src/core/instance/init.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initOptions; });\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../observer */ \"./src/core/observer/index.js\");\n\r\n\r\nconst LIFECYCLE_HOOKS = [\r\n    'created',\r\n    'mounted'\r\n]\r\n\r\nfunction initOptions (vm) {\r\n    let data = vm._data = vm.$options.data\r\n    Object(_observer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(vm._data)\r\n    LIFECYCLE_HOOKS.forEach((hook => {\r\n        vm.$options[hook] = vm.$options[hook] || function () {}\r\n    }))\r\n}\n\n//# sourceURL=webpack:///./src/core/instance/init.js?");

/***/ }),

/***/ "./src/core/instance/proxy.js":
/*!************************************!*\
  !*** ./src/core/instance/proxy.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return proxy; });\n/**\r\n * 访问属性通过this._data.xxx不优雅，所以我们设置一层代理，从新进行一次数据访问拦截，这样就可以直接访问this.xxx了\r\n * @param target\r\n * @param sourceKey\r\n * @param key\r\n */\r\nfunction proxy (target, sourceKey, key) {\r\n    Object.defineProperty(target, key, {\r\n        configurable: true,\r\n        get: function proxyGetter () {\r\n            return target[sourceKey][key]\r\n        },\r\n        set: function proxySetter (newVal) {\r\n            target[sourceKey][key] = newVal\r\n        }\r\n    })\r\n}\n\n//# sourceURL=webpack:///./src/core/instance/proxy.js?");

/***/ }),

/***/ "./src/core/observer/Watcher.js":
/*!**************************************!*\
  !*** ./src/core/observer/Watcher.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Watcher; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/core/observer/dep.js\");\n/**\r\n * 订阅者（即找房子的人），用来接收消息\r\n */\r\n\r\n\r\nclass Watcher {\r\n    constructor (vm, expression, cb) {\r\n        this.vm = vm\r\n        this.cb = cb\r\n        this.expression = expression // 传入的属性名\r\n        this.value = this.getVal()\r\n    }\r\n    getVal () {\r\n        Object(_dep__WEBPACK_IMPORTED_MODULE_0__[\"pushTarget\"])(this) // 建立联系\r\n\r\n        //这里取值，会触发value的get方法，所以接下来我们需要在get方法里面将联系人的联系方式给中介\r\n        let val = this.vm\r\n        this.expression.split('.').forEach((key) => {\r\n            val = val[key]\r\n        })\r\n\r\n        Object(_dep__WEBPACK_IMPORTED_MODULE_0__[\"popTarget\"])() // 释放关联\r\n        return val\r\n    }\r\n\r\n    /**\r\n     * 联系人把自己的联系方式给中介\r\n     * @param dep\r\n     */\r\n    addDep (dep) {\r\n        dep.addSub(this)\r\n    }\r\n\r\n    /**\r\n     * 收到消息后，开始准备活动\r\n     */\r\n    update () {\r\n        let val = this.vm\r\n        this.expression.split('.').forEach((key) => {\r\n            val = val[key]\r\n        })\r\n        this.cb.call(this.vm, val, this.value)\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/core/observer/Watcher.js?");

/***/ }),

/***/ "./src/core/observer/dep.js":
/*!**********************************!*\
  !*** ./src/core/observer/dep.js ***!
  \**********************************/
/*! exports provided: default, pushTarget, popTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dep; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pushTarget\", function() { return pushTarget; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"popTarget\", function() { return popTarget; });\n/**\r\n * 实现Dep订阅器（房产中介）\r\n */\r\nclass Dep {\r\n    constructor () {\r\n        // 消息盒子，联系人列表\r\n        this.sub = []\r\n    }\r\n    addDepend () {\r\n        Dep.target.addDep(this)\r\n    }\r\n    addSub (sub) {\r\n        this.sub.push(sub)\r\n    }\r\n    //通知\r\n    notify () {\r\n        for (let sub of this.sub) {\r\n            sub.update()\r\n        }\r\n    }\r\n}\r\n\r\nDep.target = null\r\nconst targetStack = []\r\n\r\nfunction pushTarget (_target) {\r\n    if (Dep.target) {\r\n        targetStack.push(Dep.target)\r\n    }\r\n    Dep.target = _target\r\n}\r\n\r\nfunction popTarget() {\r\n    Dep.target = targetStack.pop()\r\n}\r\n\n\n//# sourceURL=webpack:///./src/core/observer/dep.js?");

/***/ }),

/***/ "./src/core/observer/index.js":
/*!************************************!*\
  !*** ./src/core/observer/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return observer; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/core/observer/dep.js\");\n\r\n/***\r\n * 实现observer数据劫持\r\n */\r\nclass Observer{\r\n    // 这里暂时考虑转入的value是不同的对象\r\n    constructor (value) {\r\n        this.walk(value)\r\n    }\r\n\r\n    /**\r\n     * 深度遍历对象\r\n     * @param obj\r\n     */\r\n    walk (obj) {\r\n        Object.keys(obj).forEach((key) => {\r\n            // 如果是对象， 则递归调用walk,保证每个属性都可以被defineReactive\r\n            if (typeof obj[key] === 'object') {\r\n                this.walk(obj[key])\r\n            }\r\n            defineReactive(obj, key, obj[key])\r\n        })\r\n    }\r\n}\r\n\r\n/**\r\n * 给每个属性调用defineProperty\r\n * @param obj\r\n * @param key\r\n * @param value\r\n */\r\nlet defineReactive = (obj, key, value) => {\r\n    let dep = new _dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"]() // 创建订阅器（找到房产中介）\r\n    Object.defineProperty(obj, key, {\r\n        set(newVal) {\r\n            if (newVal === value) {\r\n                return\r\n            }\r\n            value = newVal\r\n            // 当设置的属性是个对象，也要继续observe\r\n            //observe(newVal)\r\n            dep.notify() // 订阅器通知给订阅者（当房产更新时，房产中介通知买房子的人）\r\n        },\r\n        get() {\r\n            // 如果建立了关联，那么开始添加联系方式\r\n            if (_dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target) {\r\n                dep.addDepend()\r\n            }\r\n           return value\r\n        }\r\n    })\r\n}\r\n\r\nfunction observer(value) {\r\n    if (!value || typeof value !== 'object') {\r\n        return\r\n    }\r\n    return new Observer(value)\r\n}\r\n\r\n/*\r\nlet data = {\r\n    msg: 'hello wue',\r\n    deep: {\r\n        a: 1,\r\n        b: 2\r\n    }\r\n}\r\nobserve(data)*/\r\n\n\n//# sourceURL=webpack:///./src/core/observer/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/index */ \"./src/core/index.js\");\n\r\n\r\nwindow.Wue = _core_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n/*\r\nconsole.log('ljm2233')*/\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });