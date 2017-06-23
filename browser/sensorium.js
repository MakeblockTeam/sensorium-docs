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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @fileOverview 工具类函数
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  /**
   * limit value
   * @param  {Number} value
   * @param  {Array} range  (optional) limit value range, such as [-255, 255], [0, 3000], default is [-255, 255]
   * @return {Number} newSpeed the result value in limit.
   */
  limitValue: function (value, range) {
    var newValue = value;
    range = range || [-255, 255];
    if (value < range[0]) {
      newValue = range[0];
    }

    if (value > range[1]) {
      newValue = range[1];
    }
    return newValue;
  },

  /**
   * Convert array of int to ArrayBuffer.
   * @param  {[int]} data array of int
   * @return {ArrayBuffer}      result array buffer
   * @private
   */
  arrayBufferFromArray: function (data) {
    var buffer = new ArrayBuffer(data.length);
    var result = new Int8Array(buffer);
    for (var i = 0; i < data.length; i++) {
      result[i] = data[i];
    }
    return buffer;
  },

  /**
   * Convert ArrayBuffer from array of int
   * @param  {ArrayBuffer} buffer the source arraybuffer
   * @return {[int]}        int array as the result;
   * @private
   */
  arrayFromArrayBuffer: function (buffer) {
    var dataView = new Uint8Array(buffer);
    var result = [];
    for (var i = 0; i < dataView.length; i++) {
      result.push(dataView[i]);
    }
    return result;
  },

  /**
   * [buffer2string converts array buffer to string format]
   * @param  {ArrayBuffer} buf [the input array buffer]
   * @return {String}     [the output string]
   */
  buffer2string: function (buf) {
    var buffer = new Uint8Array(buf);
    return Array.prototype.join.call(buffer, " ");
  },

  /**
   * [string2buffer converts string to array buffer format]
   * @param  {String} str [the input string]
   * @return {Uint8Array}     [the output uint8 array buffer]
   */
  string2buffer: function (str) {
    var buffer = new Uint8Array(str.split(" "));
    return buffer;
  },

  /**
   * 将十进制字符串数组转为16进制
   * @param  {Array}  data        to be transformed data, such as: ["01", "55", "12"]
   * @param  {Boolean} isUpperCase whether need output upperCase string.
   * @return {String} 16 进制字符串
   */
  intStrToHexStr: function (data, isUpperCase) {
    var temp = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i] != null) {
        var item = parseInt(data[i]).toString(16);
        if (isUpperCase) {
          item = parseInt(data[i]).toString(16).toUpperCase();
        }
        if (item.length == 1) {
          item = "0" + item;
        }
        temp.push(item);
      }
    }
    return temp.join(" ");
  },

  // 十六进制字符串转成十进制
  hexStr2IntArray: function (str) {
    var a = str.split(" ");
    var arr = [];
    for (var i in a) {
      var num = parseInt(a[i], 16);
      arr.push(num);
    }
    arr.reverse();
    console.log(arr);
    return arr;
  },

  /**
   * Float to bytes.
   * 现将float转成整形，再将整形转成字节表示
   * @param  {float} float number
   * @return {bytes}
   */
  float32ToBytes: function (value) {
    // TOFIX: hack
    if (value == 0) {
      return [0, 0, 0, 0];
    }
    var bytesInt = 0;
    switch (value) {
      case Number.POSITIVE_INFINITY:
        bytesInt = 0x7F800000;
        break;
      case Number.NEGATIVE_INFINITY:
        bytesInt = 0xFF800000;
        break;
      case +0.0:
        bytesInt = 0x40000000;
        break;
      case -0.0:
        bytesInt = 0xC0000000;
        break;
      default:
        // if (Number.isNaN(value)) { bytesInt = 0x7FC00000; break; }

        if (value <= -0.0) {
          bytesInt = 0x80000000;
          value = -value;
        }

        var exponent = Math.floor(Math.log(value) / Math.log(2));
        var significand = value / Math.pow(2, exponent) * 0x00800000 | 0;

        exponent += 127;
        if (exponent >= 0xFF) {
          exponent = 0xFF;
          significand = 0;
        } else if (exponent < 0) exponent = 0;

        bytesInt = bytesInt | exponent << 23;
        bytesInt = bytesInt | significand & ~(-1 << 23);
        break;
    }
    var bytesArray = this.bigIntToBytes(bytesInt);
    return bytesArray;
  },

  /**
   * 整形转换成字节数组
   * @param  {number} value 整形
   * @return {array}  array数组
   */
  bigIntToBytes: function (value) {
    var bytesArray = [];
    var b1 = value & 0xff;
    var b2 = value >> 8 & 0xff;
    var b3 = value >> 16 & 0xff;
    var b4 = value >> 24 & 0xff;
    bytesArray.push(b1);
    bytesArray.push(b2);
    bytesArray.push(b3);
    bytesArray.push(b4);
    return bytesArray;
  },

  /**
   * 32位整数转成字节，js最多只支持32位有符号整数，不支持64位，因此最多只能转成4byte
   * @param  {Number} float number
   * @return {Array} bytes array
   */
  longToBytes: function (value) {
    var bytes = [];
    var i = 4;
    do {
      bytes[--i] = value & 255;
      value = value >> 8;
    } while (i);
    return bytes;
  },

  /**
   * 将单词的第一个字母转成大写
   * @param  {string} str string.
   * @return {string}     target string.
   */
  upperCaseFirstLetter: function (str) {
    var reg = /\b(\w)|\s(\w)/g;
    // str = str.toLowerCase();
    return str.replace(reg, function (m) {
      return m.toUpperCase();
    });
  },

  /**
   * transform matrix array to bytes
   * @param  {Array} matrixArray 8*16 led matrix array, such as:
   *
   * [
   *    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   *    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   *    0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
   *    0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
   *    0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
   *    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
   *    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
   *    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
   * ]
   * @return {Array} result 16 length bytes array, such as
   *
   * [0, 0, 0, 0, 28, 56, 28, 56, 28, 56, 3, 192, 3, 192, 0, 0]
   */
  emotionArrayToBytes: function (matrixArray) {
    var result = [];
    for (var i = 0; i < matrixArray.length; i++) {
      if ((i + 1) % 8 == 0) {
        var byteString = matrixArray.slice(i - 7, i + 1).join('');
        var byte = parseInt(byteString, 2);
        result.push(byte);
      }
    }
    return result;
  },

  /**
   * n个byte转成int值
   * @param  {Array} bytes 传入的bytes数组
   * @return {Number}          返回的int数值
   */
  bytesToInt: function (bytes) {
    var val = 0;
    for (var i = bytes.length - 1; i >= 0; i--) {
      val += bytes[bytes.length - i - 1] << i * 8;
    }
    return val;
  },

  /**
   * transform int to ascii
   * @param  {Array} bytes int array
   * @return {String} str string
   */
  bytesToString: function (bytes) {
    var str = "";
    for (var i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return str;
  },

  getSecurityValue(val1, val2, type) {
    return typeof val1 === type ? val1 : val2;
  },

  /**
   * 函数式编程
   * @param  {!Function} func 方法
   * @param  {Array} args 方法的参数数组
   * @return {*}      返回结果由方法决定
   */
  composer(func, args) {
    if (!args) {
      args = [];
    }
    return func(...args);
  }

});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transport__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__requestControl__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_parse__ = __webpack_require__(19);
/**
 * @fileOverview 调度类
 * 负责协议收发调度
 */
//es6 module




// 开启超时重发
const OPEN_RESNET_MODE = false;
// 超时重发的次数
const RESENT_COUNT = 1;
// 读值指令超时的设定
const COMMAND_SEND_TIMEOUT = 1000;

class Command {
  constructor() {
    //上次写记录
    this.lastWrite = {
      time: 0,
      buf: null
    };
  }
  /**
   * execute buffer
   * @param  {Array} buf [description]
   * @return {[type]}     [description]
   */
  exec(buf) {
    // console.log(buf);
    __WEBPACK_IMPORTED_MODULE_0__transport__["a" /* default */].send(buf); //借助通信管道发送
  }

  /**
   * an api to execute write
   * @param  {[type]}   buf      [description]
   * @return {[type]}            [description]
   */
  execWrite(buf) {
    let time = new Date().getTime();
    let bufStr = buf.join('_');
    if (this.lastWrite.buf != bufStr || time - this.lastWrite.time > 40) {
      this.lastWrite.buf = bufStr;
      this.lastWrite.time = time;
      this.exec(buf);
    }
    //TODO: 谨慎执行超时重发
  }

  /**
   * an api to execute read
   * @param  {[type]}   buf      [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  execRead(buf, callback) {
    __WEBPACK_IMPORTED_MODULE_1__requestControl__["a" /* default */].addRequest(this.exec.bind(this), buf, callback);
    //TODO: 谨慎执行超时重发
  }

  /**
   * parse the buffer and callback
   * @param  {Array} buff buffer responsed from transportion
   * @return {Undefined}
   */
  pipe(buff) {
    let buffer = __WEBPACK_IMPORTED_MODULE_2__core_parse__["a" /* default */].doParse(buff);
    if (!buffer) {//一次失败的解析
      //do nothing
    } else if (buffer.length == 0) {//write 结果
      //do nothing
    } else {
      //read 结果
      let index = buffer[0];
      let value = __WEBPACK_IMPORTED_MODULE_2__core_parse__["a" /* default */].getResult(buffer);
      this.emitCallback(index, value);
    }
  }

  emitCallback(index, value) {
    __WEBPACK_IMPORTED_MODULE_1__requestControl__["a" /* default */].callbackProxy(...arguments);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new Command());

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defineNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return defineString; });
/* unused harmony export defineArray */
/* unused harmony export defineBoolean */
/* unused harmony export defineObject */
/**
 * 对传入参数进行初始化
 */
function defineType(type) {
    return function (param, defaultValue) {
        if (arguments.length < 2 && typeof param === 'undefined') {
            return;
        }
        if (typeof defaultValue === 'undefinded') {
            switch (type) {
                case 'number':
                    defaultValue = 0;
                    break;
                case 'string':
                    defaultValue = '';
                    break;
                case 'array':
                    defaultValue = [];
                    break;
                case 'boolean':
                    defaultValue = false;
                    break;
                case 'object':
                    defaultValue = {};
                    break;
                default:
                    defaultValue = 0;
                    break;
            }
        }
        let value = defaultValue;
        let condition = type === 'boolean' ? typeof param === type : typeof param === type || param === 1 || param === 0;
        if (condition) {
            value = param;
        } else {
            console.warn(`param '${param}' is not a ${type}!`);
        }
        return value;
    };
};

let defineNumber = defineType('number'),
    defineString = defineType('string'),
    defineArray = defineType('array'),
    defineBoolean = defineType('boolean'),
    defineObject = defineType('object');



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utils__ = __webpack_require__(0);
/**
 * @fileOverview  Api api list
 */


/**
 * buf 协议组装器
 * @param  {Object} obj  对象
 * @param  {Number} obj.index  由上位机赋值
 * @param  {Number} obj.mode  查询、执行
 * @param  {Number} obj.id  指令ID
 * @param  {Arguments} args 其他参数
 * @return {Array}      返回数组
 */
function bufAssembler(obj, ...args) {
  const modes = [0x01, 0x02, 0x04];
  const bufHead = [0xff, 0x55];
  let bufLength = 0;
  let bufAttr;
  //todo：完善抛错提示
  if (obj.mode == 0x04) {
    bufAttr = new Array(obj.index || 0, obj.mode);
  } else {
    if (modes.indexOf(obj.mode) === -1) {
      throw new Error(`mode should be one of ${modes}`);
    } else if (typeof obj.id === 'undefined') {
      throw new Error(`id should not be empty`);
    }
    bufAttr = new Array(obj.index || 0, obj.mode, obj.id);
  }
  //to fix:
  bufLength = bufAttr.length + args.length;
  return bufHead.concat([bufLength], bufAttr, args);
}

function protocolAssembler() {
  /**
   * Set dc motor speed.
   * @param {number} port  port number, vailable is: 1,2,3,4
   * @param {number} speed speed, the range is -255 ~ 255
   * @example
   *     ff 55 06 00 02 0a 01 ff 00
   */
  this.setDcMotor = function (port, speed) {
    speed = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(speed);
    return bufAssembler({ mode: 0x02, id: 0x0a }, port, speed & 0xff, speed >> 8 & 0xff);
  };

  /**
   * Set encoder motor speed.
   * @param {number} slot  slot number, vailable is: 1,2
   * @param {number} speed speed, the range is -255 ~ 255
   * @example
   *     ff 55 07 00 02 3d 00 01 64 00
   */
  //TO COMFIRM: 缺少一个 angle
  // this.setEncoderMotorOnBoard = function(slot, speed) {
  //   let port = 0x00;
  //   speed = Utils.limitValue(speed);
  //   return bufAssembler({mode: 0x02, id: 0x3d}, port, slot, speed & 0xff, (speed >> 8) & 0xff);
  // };

  /**
   * Set encoder motor speed.
   * @param {number} slot  slot number, vailable is: 1,2
   * @param {number} speed speed, the range is -255 ~ 255
   * @example
   *     ff 55 07 00 02 3d 00 01 64 00
   */
  this.setEncoderMotorOnBoard = function (slot, speed, angle) {
    let port = 0x00; //板载 port 为 0
    return this.setEncoderMotor(port, slot, speed, angle);
  };

  /**
   * set encoder motor.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 1,2,3,4
   * @param  {Number} slot  vailable: 1，2
   * @param  {Number} speed  0 ~ 300, 单位：rpm（每分钟转多少圈）
   * @param  {Float} angle  相对位移, -2147483648 ~ 2147483647
   * @example
   * ff 55 0b 00 02 0c 08 01 96 00 00 00 34 44
   */
  this.setEncoderMotor = function (port, slot, speed, angle) {
    port = port || 0x08; //I2C地址，目前无意义(软件稳定后可能会重新设计)，用来占位
    speed = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(speed, [0, 300]);
    let byte4Array = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].float32ToBytes(angle);
    return bufAssembler({ mode: 0x02, id: 0x0c }, port, slot, speed & 0xff, speed >> 8 & 0xff, ...byte4Array);
  };

  /**
   * Set both left speed and right speed with one command.
   * @param {number} leftSpeed  left speed, the range is -255 ~ 255
   * @param {number} rightSpeed right speed, the range is -255 ~ 255
   * @example
   *     ff 55 07 00 02 05 64 00 64 00
   */
  this.setJoystick = function (leftSpeed, rightSpeed) {
    leftSpeed = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(leftSpeed);
    rightSpeed = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(rightSpeed);
    return bufAssembler({ mode: 0x02, id: 0x05 }, leftSpeed & 0xff, leftSpeed >> 8 & 0xff, rightSpeed & 0xff, rightSpeed >> 8 & 0xff);
  };

  /**
   * Set speed for balance mode, the port is on transport, value is 0.
   * @param {number} turnDegree turn extend, -255 ~ 255
   * @param {number} speed      speed, -255 ~ 255
   * @example
   *     ff 55 08 00 02 34 00 64 00 64 00
   */
  this.setVirtualJoystickForBalance = function (turnExtent, speed) {
    turnExtent = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(turnExtent);
    speed = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(speed);
    port = 0; //板载虚拟摇杆 port = 00
    return bufAssembler({ mode: 0x02, id: 0x34 }, port, turnExtent & 0xff, turnExtent >> 8 & 0xff, speed & 0xff, speed >> 8 & 0xff);
  };

  /**
   * Set stepper motor speed.
   * @param {Number} port     port number, vailable is: 1,2,3,4
   * @param {Number} speed    speed, the range is 0 ~ 3000
   * @param {Long} distance distance, the range is -2147483648 ~ 2147483647
   * @example
   *     ff 55 0a 00 02 28 01 b8 0b e8 03 00 00
   */
  this.setStepperMotor = function (port, speed, distance) {
    speed = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(speed, [0, 3000]);
    var distanceBytes = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].longToBytes(distance);
    return bufAssembler({ mode: 0x02, id: 0x28 }, port, speed & 0xff, speed >> 8 & 0xff, distanceBytes[3], distanceBytes[2], distanceBytes[1], distanceBytes[0]);
  };

  /**
   * Set RgbFourLed electronic module color.
   * @param {number} port     port number, vailable is: 0(on transport), 6,7,8,9,10
   * @param {number} slot     slot number, vailable is: 1,2
   * @param {number} position led position, 0 signify all leds.
   * @param {number} r        red, the range is 0 ~ 255
   * @param {number} g        green, the range is 0 ~ 255
   * @param {number} b        blue, the range is 0 ~ 255
   * @example
   *     ff 55 09 00 02 08 06 02 00 ff 00 00
   */
  this.setLed = function (port, slot, position, r, g, b) {
    r = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(r, [0, 255]);
    g = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(g, [0, 255]);
    b = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(b, [0, 255]);
    return bufAssembler({ mode: 0x02, id: 0x08 }, port, slot, position, r, g, b);
  };

  /**
   * set four leds
   * @param {number} port     port number, vailable is: 0(on transport), 6,7,8,9,10
   * @param {number} position led position, 0 signify all leds.
   * @param {number} r        red, the range is 0 ~ 255
   * @param {number} g        green, the range is 0 ~ 255
   * @param {number} b        blue, the range is 0 ~ 255
   */
  this.setFourLeds = function (port, position, r, g, b) {
    return this.setLed(port, 2, position, r, g, b);
  };

  /**
   * turn off four leds
   * @param {number} port     port number, vailable is: 0(on transport), 6,7,8,9,10
   * @param {number} position led position, 0 signify all leds.
   */
  this.turnOffFourLeds = function (port, position) {
    return this.setLed(port, 2, position, 0, 0, 0);
  };

  /**
   * set led panel on Api transport.
   * @param {number} position led position, 0 signify all leds.
   * @param {number} r        red, the range is 0 ~ 255
   * @param {number} g        green, the range is 0 ~ 255
   * @param {number} b        blue, the range is 0 ~ 255
   */
  this.setLedPanelOnBoard = function (position, r, g, b) {
    return this.setLed(0, 2, position, r, g, b);
  };

  /**
   * turn off led panel on transport
   * @param {number} position led position, 0 signify all leds.
   */
  this.turnOffLedPanelOnBoard = function (position) {
    return this.setLed(0, 2, position, 0, 0, 0);
  };

  /**
   * Set transport mode.
   * @param {number} mode transport mode,
   *     0: bluetooth mode
   *     1: ultrasonic mode
   *     2: balance mode
   *     3: infrared mode
   *     4: linefollow mode
   * @example
   *     ff 55 05 00 02 3c 11 00
   */
  this.setFirmwareMode = function (mode) {
    var sub = 0x11; // 0x11 means Auriga模式
    return bufAssembler({ mode: 0x02, id: 0x3c }, sub, mode);
  };

  /**
   * Set Servo speed.
   * @param {[type]} port   port number, vailable is 6,7,8,9,10
   * @param {[type]} slot   slot number, vailable is 1,2
   * @param {[type]} degree servo degree, the range is 0 ~ 180
   */
  this.setServoMotor = function (port, slot, degree) {
    degree = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(degree, [0, 180]);
    return bufAssembler({ mode: 0x02, id: 0x0b }, port, slot, degree);
  };

  /**
   * Set Seven-segment digital tube number.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {float} number  the number to be displayed, -999 ~ 9999
   * @exmpa
   *     ff 55 08 00 02 09 06 00 00 c8 42
   */
  this.setSevenSegment = function (port, number) {
    number = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(number, [-999, 9999]);
    var byte4Array = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].float32ToBytes(number);
    return bufAssembler({ mode: 0x02, id: 0x09 }, port, ...byte4Array);
    // byte4Array[0],
    // byte4Array[1],
    // byte4Array[2],
    // byte4Array[3]);
  };

  /**
   * Set led matrix char.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {number} xAxis  x position
   * @param {number} yAxis  y position
   * @param {string} char  char, 例如 Hi 转换成ASCII的值 48 69
   * @exmaple
   * ff 55 0a 00 02 29 06 01 00 01 02 48 69
   */
  this.setLedMatrixChar = function (port, xAxis, yAxis, char) {
    var charAsciiArray = [];
    for (var i = 0; i < char.length; i++) {
      charAsciiArray.push(char[i].charCodeAt());
    }

    return bufAssembler({ mode: 0x02, id: 0x29 }, port, 0x01, xAxis, yAxis, char.length, ...charAsciiArray);
  };

  /**
   * Set led matrix emotion.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {number} xAxis      x position
   * @param {number} yAxis      y position
   * @param {Array} emotionData emotion data to be displayed, such as
   *  [00, 00, 40, 48, 44, 42, 02, 02, 02, 02, 42, 44, 48, 40, 00, 00]
   * @example
   * ff 55 17 00 02 29 06 02 00 00 00 00 40 48 44 42 02 02 02 02 42 44 48 40 00 00
   */
  this.setLedMatrixEmotion = function (port, xAxis, yAxis, emotionData) {
    // var a = [
    //   0xff,0x55,
    //   0x17,0,
    //   0x02,
    //   0x29,
    //   port,
    //   0x02,
    //   xAxis,
    //   yAxis
    // ].concat(emotionData);

    return bufAssembler({ mode: 0x02, id: 0x29 }, port, 0x02, xAxis, yAxis, ...emotionData);
  };

  /**
   * Set led matrix time.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {number} separator time separator, 01 signify `:`, 02 signify ` `
   * @param {number} hour      hour number, 0 ~ 23
   * @param {number} minute    minute number, 0 ~ 59
   * @example
   *     ff 55 08 00 02 29 06 03 01 0a 14
   */
  this.setLedMatrixTime = function (port, separator, hour, minute) {
    hour = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(hour, [0, 23]);
    minute = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].limitValue(minute, [0, 59]);
    return bufAssembler({ mode: 0x02, id: 0x29 }, port, 0x03, separator, hour, minute);
  };

  /**
   * Set led matrix number.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {float} number the number to be displayed
   * @exmaple
      ff 55 09 00 02 29 06 04 00 00 00 00
   */
  this.setLedMatrixNumber = function (port, number) {
    var byte4Array = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].float32ToBytes(number);
    return bufAssembler({ mode: 0x02, id: 0x29 }, port, 0x04, ...byte4Array);
    // byte4Array[0],
    // byte4Array[1],
    // byte4Array[2],
    // byte4Array[3]);
  };

  /**
   * Set shutter.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {number} action 0: 按下快门; 1: 松开快门; 2: 聚焦; 3: 停止聚焦
   * @exmaple
      ff 55 05 00 02 14 06 02
   */
  this.setShutter = function (port, action) {
    return bufAssembler({ mode: 0x02, id: 0x14 }, port, action);
  };

  /**
   * reset all sensors and motors on transport.
   * @exmaple
      ff 55 02 00 04
   */
  this.reset = function () {
    return bufAssembler({ mode: 0x04 });
  };

  /**
   * set buzzer.
   * @param {string} tone , "A2" ~ "D8"
   * @param {number} beat , 125: eight; 250: quater; 500: half; 1000: one; 2000: double
   * @example
   * C2，quater beat: ff 55 08 00 02 22 09 41 00 f4 01
   */
  this.setTone = function (tone, beat) {
    var TONE = {
      // 原始数据：D5: 587 "E5": 658,"F5": 698,"G5": 784,"A5": 880,"B5": 988,"C6": 1047
      "A2": 110, "B2": 123, "C2": 65,
      "C3": 131, "D3": 147, "E3": 165, "F3": 175, "G3": 196, "A3": 220,
      "B3": 247, "C4": 262, "D4": 294, "E4": 330, "F4": 349, "G4": 392,
      "A4": 440, "B4": 494, "C5": 523, "D5": 555, "E5": 640, "F5": 698,
      "G5": 784, "A5": 880, "B5": 988, "C6": 1047, "D6": 1175, "E6": 1319,
      "F6": 1397, "G6": 1568, "A6": 1760, "B6": 1976, "C7": 2093, "D7": 2349,
      "E7": 2637, "F7": 2794, "G7": 3136, "A7": 3520, "B7": 3951, "C8": 4186, "D8": 4699
    };
    const BEAT = {
      eight: 125,
      quater: 250,
      half: 500,
      one: 1000,
      double: 2000
    };

    return bufAssembler({ mode: 0x02, id: 0x22 }, 0x09, TONE[tone] & 0xff, TONE[tone] >> 8 & 0xff, BEAT[beat] & 0xff, BEAT[beat] >> 8 & 0xff);
  };

  /**
   * read verion of transport
   * @param  {Number} index index of command
   */
  this.readVersion = function (index) {
    return bufAssembler({ mode: 0x01, id: 0x00 });
  };

  /**
   * mainly used for distance measurement, the measurement range is 0 to 500 cm,
   * the execution of the command will have more than 100 milliseconds latency.
   * So the frequency of the host to send this instruction shoulds not be too high.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 01 03
   */
  this.readUltrasonic = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x01 }, port);
  };

  /**
   * read temperature, Each port can connect two road temperature sensor.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @param  {Number} slot  vailable: slot1(1), slot2(2)
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 02 01 02
   */
  this.readTemperature = function (port, slot) {
    return bufAssembler({ mode: 0x01, id: 0x02 }, port, slot);
  };

  /**
   * The light sensor module or ontransport (lamp) light sensors numerical reading.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10, onbord(0c),onbord(0b)
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 03 07
   */
  this.readLight = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x03 }, port);
  };

  /**
   * read Potentionmeter
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 04 06
   */
  this.readPotentionmeter = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x04 }, port);
  };

  /**
   * read josystic value
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @param  {Number} axis  1: x-axis; 2: y-axis;
   * @example
   * ff 55 05 00 01 05 06 01
   */
  this.readJoystick = function (port, axis) {
    return bufAssembler({ mode: 0x01, id: 0x05 }, port, axis);
  };

  /**
   * read gyro value in different axis.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @param  {Number} axis  vailable: X-axis(01)  Y-axis(02)  Z-axis(03)
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 06 00 01
   */
  this.readGyro = function (port, axis) {
    return bufAssembler({ mode: 0x01, id: 0x06 }, port, axis);
  };

  /**
   * read volume testing MIC module parameters
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10，ontransport(0x0e)
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 07 06
   */
  this.readSound = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x07 }, port);
  };

  /**
   * read temperature on transport
   * @param  {Number} index [description]
   * @example
   * ff 55 04 00 01 1b 0d
   */
  this.readTemperatureOnBoard = function () {
    var port = 0x0d;
    return bufAssembler({ mode: 0x01, id: 0x1b }, port);
  };

  /**
   * read pyroelectric infrared sensor
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 0f 06
   */
  this.readPirmotion = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x0f }, port);
  };

  /**
   * read LineFollower sensor
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @return {Number} number,
   *  00   0
      01   1
      10   2
      11   3
      when 0 said has a black line
    * @example
    * ff 55 04 00 01 11 02
   */
  this.readLineFollower = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x11 }, port);
  };

  /**
   * read limitSwitch
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @param  {Number} slot  vailable: SLOT1(01)   SLOT2(02)
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 15 06 02
   */
  this.readLimitSwitch = function (port, slot) {
    return bufAssembler({ mode: 0x01, id: 0x15 }, port, slot);
  };

  /**
   * read compass.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 1a 06
   */
  this.readCompass = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x1a }, port);
  };

  /**
   * read humiture
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @param  {Number} temperature(01) humidity (00)
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 17 06 00
   */
  this.readHumiture = function (port, type) {
    return bufAssembler({ mode: 0x01, id: 0x17 }, port, type);
  };

  /**
   * read flame
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 18 03
   */
  this.readFlame = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x18 }, port);
  };

  /**
   * Used to get the harmful gas density
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 19 06
   */
  this.readGas = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x19 }, port);
  };

  /**
   * read touch sensor
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 33 06
   */
  this.readTouch = function (port) {
    return bufAssembler({ mode: 0x01, id: 0x33 }, port);
  };

  /**
   * To determine whether the corresponding button is pressed.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @param  {Number} key   vailable:1,2,3,4
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 16 03 01
   */
  this.readFourKeys = function (port, key) {
    // var a = [
    //   0xff,0x55,
    //   0x05, index,
    //   0x01,
    //   0x16,
    //   port,
    //   key
    // ];
    return bufAssembler({ mode: 0x01, id: 0x16 }, port, key);
  };

  /**
   * read encoder motor position or speed on transport.
   * @param  {Number} index [description]
   * @param  {Number} slot vailable:1,2
   * @param  {Number} type  1: position; 2: speed
   * @example
   * ff 55 06 00 01 3d 00 01 02
   */
  this.readEncoderMotorOnBoard = function (slot, type) {
    let port = 0x00; //板载 port
    return bufAssembler({ mode: 0x01, id: 0x3d }, port, slot, type);
  };

  /**
   * read firmware mode or voltage.
   * @param  {Number} index [description]
   * @param  {Number} type  0x70: 电压; 0x71: 模式
   * @example
   * ff 55 04 00 01 3c 70
   */
  this.readFirmwareMode = function (index, type) {
    return bufAssembler({ mode: 0x01, id: 0x3c }, type);
  };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: digit GPOI port
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 1e 09
   */
  this.readDigGPIO = function (port) {
    // var a = [
    //   0xff,0x55,
    //   0x04, index,
    //   0x01,
    //   0x1e,
    //   port,
    // ];
    return bufAssembler({ mode: 0x01, id: 0x1e }, port);
  };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: analog GPIO port
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 1f 02
   */
  this.readAnalogGPIO = function (port) {
    // var a = [
    //   0xff,0x55,
    //   0x04, index,
    //   0x01,
    //   0x1f,
    //   port,
    // ];
    return bufAssembler({ mode: 0x01, id: 0x1f }, port);
  };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: GPIO port
   * @param  {Number} key   vailable: 0,1
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 25 0d 20 4e
   */
  this.readGPIOContinue = function (port, key) {
    // var a = [
    //   0xff,0x55,
    //   0x05, index,
    //   0x01,
    //   0x25,
    //   port,
    //   key,
    // ];
    return bufAssembler({ mode: 0x01, id: 0x25 }, port, key);
  };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: GPIO port
   * @param  {Number} key   vailable: 0,1
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 24 45 40
   */
  this.readDoubleGPIO = function (port1, port2) {
    // var a = [
    //   0xff,0x55,
    //   0x05, index,
    //   0x01,
    //   0x24,
    //   port1,
    //   port2,
    // ];
    return bufAssembler({ mode: 0x01, id: 0x24 }, port1, port2);
  };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: analog GPIO port
   * @param  {Number} key   vailable: 0,1
   * @return {Number}       [description]
   * @example
   * ff 55 03 00 01 32
   */
  this.readRuntime = function () {
    // var a = [
    //   0xff,0x55,
    //   0x03, index,
    //   0x01,
    //   0x32,
    // ];
    return bufAssembler({ mode: 0x01, id: 0x32 });
  };

  // this.readOntransportButton = function(index) {
  //   var a = [
  //     0xff,0x55,
  //     0x03, index,
  //     0x01,
  //     0x32,
  //   ];
  //   return transport.send(a);
  // };
}

/* harmony default export */ __webpack_exports__["a"] = (new protocolAssembler());

/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Electronic {
  /**
   * Electron类，电子模块基类
   * @param {number} port - 电子模块port口 
   * @param {number} slot - 电子模块slot口
   */
  constructor(port, slot) {
    // port = defineNumber(port);
    // slot = defineNumber(slot);
    // let id = this.constructor.name + '_' + port + '_' + slot;
    // let api = new Api(Transport.get());
    // if(id in POOL) {
    //   return POOL[id];
    // } else {
    //   this.port = port;
    //   this.slot = slot;
    //   this.api = api;
    //   POOL[id] = this;
    //   return this;
    // }
  }
}

module.exports = Electronic;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Settings = {
    // 数据发送与接收相关
    // 回复数据的index位置
    READ_BYTES_INDEX: 2,
    // 数据发送默认的驱动driver: makeblockhd, cordova
    DEFAULT_CONF: {},
    SUPPORTLIST: ['Mcore', 'Auriga', 'MegaPi', 'Orion', 'Arduino', 'Neuron']
};

/* harmony default export */ __webpack_exports__["a"] = (Settings);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__communicate_transport__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__communicate_command__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__protocol_settings__ = __webpack_require__(5);
/**
 * @fileOverview board 用做通信基类，连接收和发送接口.
 * @author Hyman
 */
//es6 module




const createModuleId = function (eModule, args) {
  args = [...args]; //转数组
  let name = eModule.name;
  let argsStamp = eModule.argsStamp();
  let argsLength = args.length;
  if (argsLength < argsStamp) {
    //参数不足
    console.warn(`there's lack of ${argsStamp - argsLength} argument(s), and ${eModule.name} may not work as a result`);
  } else if (argsLength > argsStamp) {
    //参数多余
    args.splice(argsStamp);
  }
  return [name].concat(...args).join('_').toLowerCase();
};

// 超类： 具备发送、接收方法
class Board {
  constructor(conf) {
    this._config = null;
    //连接
    this.connecting = {};
    this.init(conf);
  }

  init(conf) {
    this._config = Object.assign(__WEBPACK_IMPORTED_MODULE_2__protocol_settings__["a" /* default */].DEFAULT_CONF, conf || {});
    this.setTransport(this._config.transport || {});

    // 启动数据监听
    // this.onReceived();
  }

  /**
   * 电子模块实例工厂
   * @param  {Function} eModule 电子模块类
   * @param  {Array-Like} args    [port, slot, id...]
   * @return {Object}         电子模块实例
   */
  eModuleFactory(eModule, args) {
    let id = createModuleId(eModule, args);
    if (this.connecting[id]) {
      return this.connecting[id];
    } else {
      let emodule = new eModule(...args);
      // 保存模块
      this.connecting[id] = emodule;
      return emodule;
    }
  }

  /**
   * 存储通信的通道
   * @param {Object} transport json object.
   * @example
   * {
   *    send: function(buf) {
   *      console.log(buf);
   *    },
   *
   *    onReceive: function(parse) {
   *      serialPort.on('data', function(buff) {
   *        parse.doParse(buff);
   *      });
   *    }
   *  }
   */
  //防止重复 setTransport 导致事件监听绑定多次
  setTransport(transport) {
    if (transport && typeof transport.send == 'function' && typeof transport.addListener == 'function') {
      __WEBPACK_IMPORTED_MODULE_0__communicate_transport__["a" /* default */].send = transport.send;
      transport.addListener(__WEBPACK_IMPORTED_MODULE_1__communicate_command__["a" /* default */]);
    } else {
      // console.warn('')
    }
  }
}

// module.exports = Board;
/* harmony default export */ __webpack_exports__["a"] = (Board);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);




class LedMatrixBase extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  /**
   * LedMatrix 类，led模块
   */
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LedMatrixBase);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






let bufComposer = function (obj) {
  let args = [obj.port, obj.slot, obj.ledPosition, ...obj.rgb];
  return __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setLed, args);
};

class RgbLedBase extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  /**
   * RgbLed类，led模块
   * @param {number} port - led port口
   * @param {number} position - led灯的位置
   */
  constructor(port, slot) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      slot: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(slot),
      ledPosition: 0,
      rgb: [0, 0, 0]
    };
  }

  /**
   * set led position
   * @param {number} position 
   */
  position(position) {
    this.args.ledPosition = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(position, this.args.ledPosition);
    return this;
  }

  /**
   * set led red value
   * @param {number} value 0 ~ 255 
   */
  r(value) {
    this.args.rgb[0] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(value, this.args.rgb[0]);
    return this;
  }

  /**
   * set led green value
   * @param {number} value 0 ~ 255 
   */
  g(value) {
    this.args.rgb[1] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(value, this.args.rgb[1]);
    return this;
  }

  /**
   * set blue red value
   * @param {number} value 0 ~ 255 
   */
  b(value) {
    this.args.rgb[2] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(value, this.args.rgb[2]);
    return this;
  }

  /**
   * turn on led
   * @param {number} position
   */
  turnOn(position) {
    this.args.position(position);
    //组装协议
    let buf = bufComposer(this.args);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  /**
   * turn off led
   * @param {number} position
   */
  turnOff(position) {
    this.args.position(position);
    this.args.rgb = [0, 0, 0];
    //组装协议
    let buf = bufComposer(this.args);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  /**
   * turn on all the leds
   */
  turnOnAll() {
    return this.turnOn(0);
  }

  /**
   * turn off all the leds
   */
  turnOnAll() {
    return this.turnOff(0);
  }

  /**
   * LED亮红色灯光
   */
  red() {
    this.args.rgb = [255, 0, 0];
    //组装协议
    let buf = bufComposer(this.args);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  /**
   * LED亮绿色灯光
   */
  green() {
    this.args.rgb = [0, 255, 0];
    //组装协议
    let buf = bufComposer(this.args);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  /**
   * LED亮蓝色灯光
   */
  blue() {
    this.args.rgb = [0, 0, 255];
    //组装协议
    let buf = bufComposer(this.args);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RgbLedBase);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dc_motor__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stepper_motor__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__encoder_motor__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__encoder_motor_on_board__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__servo_motor__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__four_led__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rgb_led__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__led_panel_on_board__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__rgb_led_on_board__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__led_matrix_char__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__led_matrix_time__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__led_matrix_emotion__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__led_matrix_number__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__buzzer__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__seven_segment__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shutter__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__reset__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__version__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ultrasonic__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__temperature__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__light__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__potentionmeter__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__joystick__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__gyro__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__sound__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__temperature_on_board__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pirmotion__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__line_follower__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__limit_switch__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__compass__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__humiture__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__flame__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__gas__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__touch__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__four_keys__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__dig_GPIO__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__analog_GPIO__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__GPIO_continue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__double_GPIO__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__runtime__ = __webpack_require__(60);



 //包含读值和写的接口






































/* harmony default export */ __webpack_exports__["a"] = ({
  DcMotor: __WEBPACK_IMPORTED_MODULE_0__dc_motor__["a" /* default */],
  StepperMotor: __WEBPACK_IMPORTED_MODULE_1__stepper_motor__["a" /* default */],
  EncoderMotor: __WEBPACK_IMPORTED_MODULE_2__encoder_motor__["a" /* default */],
  EncoderMotorOnBoard: __WEBPACK_IMPORTED_MODULE_3__encoder_motor_on_board__["a" /* default */],
  ServoMotor: __WEBPACK_IMPORTED_MODULE_4__servo_motor__["a" /* default */],
  FourLed: __WEBPACK_IMPORTED_MODULE_5__four_led__["a" /* default */],
  RgbLed: __WEBPACK_IMPORTED_MODULE_6__rgb_led__["a" /* default */],
  LedPanelOnBoard: __WEBPACK_IMPORTED_MODULE_7__led_panel_on_board__["a" /* default */],
  RgbLedOnBoard: __WEBPACK_IMPORTED_MODULE_8__rgb_led_on_board__["a" /* default */],
  LedMatrixChar: __WEBPACK_IMPORTED_MODULE_9__led_matrix_char__["a" /* default */],
  LedMatrixTime: __WEBPACK_IMPORTED_MODULE_10__led_matrix_time__["a" /* default */],
  LedMatrixEmotion: __WEBPACK_IMPORTED_MODULE_11__led_matrix_emotion__["a" /* default */],
  LedMatrixNumber: __WEBPACK_IMPORTED_MODULE_12__led_matrix_number__["a" /* default */],
  Buzzer: __WEBPACK_IMPORTED_MODULE_13__buzzer__["a" /* default */],
  SevenSegment: __WEBPACK_IMPORTED_MODULE_14__seven_segment__["a" /* default */],
  Shutter: __WEBPACK_IMPORTED_MODULE_15__shutter__["a" /* default */],

  Reset: __WEBPACK_IMPORTED_MODULE_16__reset__["a" /* default */], //实现待验证
  Version: __WEBPACK_IMPORTED_MODULE_17__version__["a" /* default */], //实现待验证
  Ultrasonic: __WEBPACK_IMPORTED_MODULE_18__ultrasonic__["a" /* default */],
  Temperature: __WEBPACK_IMPORTED_MODULE_19__temperature__["a" /* default */],
  Light: __WEBPACK_IMPORTED_MODULE_20__light__["a" /* default */],
  Potentionmeter: __WEBPACK_IMPORTED_MODULE_21__potentionmeter__["a" /* default */],
  Joystick: __WEBPACK_IMPORTED_MODULE_22__joystick__["a" /* default */],
  Gyro: __WEBPACK_IMPORTED_MODULE_23__gyro__["a" /* default */],
  Sound: __WEBPACK_IMPORTED_MODULE_24__sound__["a" /* default */],
  TemperatureOnBoard: __WEBPACK_IMPORTED_MODULE_25__temperature_on_board__["a" /* default */],
  Pirmotion: __WEBPACK_IMPORTED_MODULE_26__pirmotion__["a" /* default */],
  LineFollower: __WEBPACK_IMPORTED_MODULE_27__line_follower__["a" /* default */],
  LimitSwitch: __WEBPACK_IMPORTED_MODULE_28__limit_switch__["a" /* default */],
  Compass: __WEBPACK_IMPORTED_MODULE_29__compass__["a" /* default */],
  Humiture: __WEBPACK_IMPORTED_MODULE_30__humiture__["a" /* default */],
  Flame: __WEBPACK_IMPORTED_MODULE_31__flame__["a" /* default */],
  Gas: __WEBPACK_IMPORTED_MODULE_32__gas__["a" /* default */],
  Touch: __WEBPACK_IMPORTED_MODULE_33__touch__["a" /* default */],
  FourKeys: __WEBPACK_IMPORTED_MODULE_34__four_keys__["a" /* default */],
  DigGPIO: __WEBPACK_IMPORTED_MODULE_35__dig_GPIO__["a" /* default */],
  AnalogGPIO: __WEBPACK_IMPORTED_MODULE_36__analog_GPIO__["a" /* default */],
  GPIOContinue: __WEBPACK_IMPORTED_MODULE_37__GPIO_continue__["a" /* default */],
  DoubleGPIO: __WEBPACK_IMPORTED_MODULE_38__double_GPIO__["a" /* default */],
  Runtime: __WEBPACK_IMPORTED_MODULE_39__runtime__["a" /* default */]
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__electronic__);



class MotorBase extends __WEBPACK_IMPORTED_MODULE_1__electronic___default.a {

  /**
   * Motor base class
   * @constructor
   * @param {number} port
   * @param {number} slot
   */
  constructor(port, slot) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      slot: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(slot),
      speed: 0
    };
  }

  /**
   * speed
   * @param  {Number} speed
   * @return {Object} the instance
   */
  speed(speed) {
    this.args.speed = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(speed, 0);
    return this;
  }

  /**
   * this interface does nothing
   */
  run() {
    return this;
  }

  /**
   * stop motor
   */
  stop() {
    this.speed(0);
    this.run();
    return this;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MotorBase);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @fileOverview 存储指令的传输通道：蓝牙，串口，2.4G等，一个单例。
 */
//输出单例
let Transport = {
  send: function (buf) {
    console.log(buf);
    // serialPort.send(buf);
  },

  //old name is onReceive
  addListener: function (pipe) {
    // serialPort.on('data', function(buff) {
    //   console.log(buff);
    //   pipe(buff);
    // });
    // ble.startListenReceivedData(function(buff){
    //   pipe(buff);
    // }, function(){
    //   console.log('failure');
    // });
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Transport);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MotorBase__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class EncoderMotorBase extends __WEBPACK_IMPORTED_MODULE_2__MotorBase__["a" /* default */] {
  /**
   * EncoderMotorBase
   * @constructor
   * @param {number} port
   */
  constructor(port, slot) {
    super(port, slot);
    Object.assign(this.args, {
      angle: 0
    });
  }

  /**
   * set angle offset to last angle position
   * @param  {[type]} angle [description]
   * @return {[type]}       [description]
   */
  offsetAngle(angle) {
    this.args.angle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(angle, 0);
    return this;
  }

  /**
   * dcMoter run
   * @return {Object} the instance
   */
  run() {
    //组装buf
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setEncoderMotor, [this.args.port, this.args.speed, this.args.angle]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  /**
   * dcMoter run reversely
   * @return {Object} the instance
   */
  runReverse() {
    this.offsetAngle(-1 * this.args.angle);
    return this.run();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (EncoderMotorBase);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__electronic_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(5);



//支持位置
const SUPPORT_INDEX = __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* default */].SUPPORTLIST.indexOf('Auriga');

//实现一个板子就注册一个板子名称
class Auriga extends __WEBPACK_IMPORTED_MODULE_0__core_Board__["a" /* default */] {
  constructor(conf) {
    //继承 Board
    super(conf);
    let this_ = this;
    // 置空已连接块
    this.connecting = {};
    // 挂载电子模块
    for (let name in __WEBPACK_IMPORTED_MODULE_1__electronic_index__["a" /* default */]) {
      let eModule = __WEBPACK_IMPORTED_MODULE_1__electronic_index__["a" /* default */][name];
      if (eModule.supportStamp().charAt(SUPPORT_INDEX) === '1') {
        // when use mcore.rgbLed(port, slot)
        this[name] = function () {
          return this_.eModuleFactory(eModule, arguments);
        };
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Auriga);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__electronic_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(5);



//支持位置
const SUPPORT_INDEX = __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* default */].SUPPORTLIST.indexOf('Mcore');

//实现一个板子就注册一个板子名称
class Mcore extends __WEBPACK_IMPORTED_MODULE_0__core_Board__["a" /* default */] {
  constructor(conf) {
    //继承 Board
    super(conf);
    let this_ = this;
    // 置空已连接块
    this.connecting = {};
    // 挂载电子模块
    for (let name in __WEBPACK_IMPORTED_MODULE_1__electronic_index__["a" /* default */]) {
      let eModule = __WEBPACK_IMPORTED_MODULE_1__electronic_index__["a" /* default */][name];
      if (eModule.supportStamp().charAt(SUPPORT_INDEX) === '1') {
        // when use mcore.rgbLed(port, slot)
        this[name] = function () {
          return this_.eModuleFactory(eModule, arguments);
        };
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Mcore);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__electronic_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(5);



//支持位置
const SUPPORT_INDEX = __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* default */].SUPPORTLIST.indexOf('MegaPi');

//实现一个板子就注册一个板子名称
class MegaPi extends __WEBPACK_IMPORTED_MODULE_0__core_Board__["a" /* default */] {
  constructor(conf) {
    //继承 Board
    super(conf);
    let this_ = this;
    // 置空已连接块
    this.connecting = {};
    // 挂载电子模块
    for (let name in __WEBPACK_IMPORTED_MODULE_1__electronic_index__["a" /* default */]) {
      let eModule = __WEBPACK_IMPORTED_MODULE_1__electronic_index__["a" /* default */][name];
      if (eModule.supportStamp().charAt(SUPPORT_INDEX) === '1') {
        // when use mcore.rgbLed(port, slot)
        this[name] = function () {
          return this_.eModuleFactory(eModule, arguments);
        };
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MegaPi);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// var Neuron = require('mneurons');
// var Neuron = require('../../neurons-engine/lib/engine/logic');

const Neuron = {};

/* harmony default export */ __webpack_exports__["a"] = (Neuron);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Board__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__electronic_index__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(5);



//支持位置
const SUPPORT_INDEX = __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* default */].SUPPORTLIST.indexOf('Orion');

//实现一个板子就注册一个板子名称
class Orion extends __WEBPACK_IMPORTED_MODULE_0__core_Board__["a" /* default */] {
  constructor(conf) {
    //继承 Board
    super(conf);
    let this_ = this;
    // 置空已连接块
    this.connecting = {};
    // 挂载电子模块
    for (let name in __WEBPACK_IMPORTED_MODULE_1__electronic_index__["a" /* default */]) {
      let eModule = __WEBPACK_IMPORTED_MODULE_1__electronic_index__["a" /* default */][name];
      if (eModule.supportStamp().charAt(SUPPORT_INDEX) === '1') {
        // when use mcore.rgbLed(port, slot)
        this[name] = function () {
          return this_.eModuleFactory(eModule, arguments);
        };
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Orion);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// dispatcher
//当前问题：发送请求超过 255 个时，进行了暴力覆盖。但是根据协议 index 大小，又只能识别 255 条请求

// 控制方案一(待整理):
//目前的问题：超过 255 个传感器时，进行了暴力覆盖
//首先其 exec 将被控制执行，需完成以下动作后才执行：
//1、加入监听列队（第二队）时，先做监听列队分析————对一队列剔除哪些位于中间的、占位较多的监听器到垃圾箱
//2、一旦有数据返回，触发对应监听器，同时做关联分析，砍掉一批。同时清空垃圾箱
//3、执行这个 exec
//4、直到第二队也到达 255.
//5、选出列队一空缺的位置（指针拨到1，表明1需要彻底清理）

// 控制方案二:
//1、允许快速产生 255 条请求（或采用一定的节流方案）
//2、将请求保存在一个队列中（保存请求发起时间）
//3、再新增请求时，检查是否满队列，若满执行第6条。必须满足队列中有空位让出——也求是请求有返回值回来——才能进入队列中
//4、新增请求占领空位（需计算空位index），并执行发送
//5、后续请求依次遵循这个规则
//6、满队列的情况下，新增请求时清空那些超时（2s?）的请求，再进入

// import ValueWrapper from '../core/value_wrapper';
/**
 * @fileOverview PromiveList is sensor data's transfer station.
 * 用于处理传感器数据分发
 */
const MAX_RECORD = 255;
const OVERTIME = 2000;

const RequestControl = {
  readRecord: {},
  index: 0,
  /**
   * create a safty index between 0~254
   * @return {Number|Null} return index
   */
  createSafeIndex: function () {
    if (this.index >= MAX_RECORD) {
      let i = null;
      for (i of MAX_RECORD) {
        if (!this.readRecord[i]) {
          return i;
        }
      }
      //没有索引
      return i;
    };
    return this.index++;
  },

  /**
   * @return {Boolean}
   */
  isOverflow: function () {
    let keys = Object.keys(this.readRecord);
    return keys.length == MAX_RECORD;
  },

  /**
   * add a record of time and callback
   * @param  {Number}   index    
   * @param  {Function} callback [description]
   */
  addRecord: function (index, callback) {
    this.readRecord[index] = {
      time: new Date().getTime(),
      callback: callback
    };
  },
  /**
   * remove a record with index
   * @param  {Number} index record index
   */
  removeRecord: function (index) {
    delete this.readRecord[index];
  },

  /**
   * this function is drived by 
   * @param {Function}   execFunc  addRequest execute as proxy
   * @param {Array}   buf      rj25 buffer
   * @param {Function} callback [description]
   */
  addRequest: function (execFunc, buf, callback) {
    let isFull = this.isOverflow();
    if (!isFull) {
      //创建索引号
      let index = this.createSafeIndex();
      //记录
      this.addRecord(index, callback);
      //执行发送
      this.execSend(execFunc, index, buf);
    } else {
      //清除超时
      let result = this.removeOvertimeRequest();
      if (result) {
        this.addRequest(...arguments);
      } else {
        //TODO: 挂起请求，稍后再发
        console.warn('this request was ignored');
      };
    }
  },
  /**
   * 移除已执行回调的和超时未回调的
   * @return {[type]} [description]
   */
  removeOvertimeRequest: function () {
    let time = new Date().getTime();
    let count = 0;
    for (let index in this.readRecord) {
      if (time - this.readRecord[index].time > OVERTIME) {
        count++;
        this.removeRecord(index);
      }
    }
    return count;
  },

  /**
   * 执行发送
   * @param  {Function} execFunc  
   * @param  {Number} index    [description]
   * @param  {[type]} buf      [description]
   * @return {[type]}          [description]
   */
  execSend: function (execFunc, index, buf) {
    //amand the index of the buf due to the rj25 protocol
    buf.splice(3, 1, index);
    execFunc(buf);
  },

  /**
   * execute the callback of the request
   * @param  {Number} index request index
   * @param  {Number} value request result
   */
  callbackProxy: function (index, value) {
    this.readRecord[index].callback(value);
    this.removeRecord(index);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (RequestControl);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utils__ = __webpack_require__(0);
/**
 * @fileOverview 解析器负责数据解析
 * 对外输出解析方法
 */
// import PromiseList from "../core/promise";


// 获取到的最大指令长度
const REC_BUF_MAX_LENGTH = 40;
const BUF_START_FLAG = [0xff, 0x55];
const BUF_END_FLAG = [0x0d, 0x0a];

function checkStart(flag1, flag2) {
  return flag1 === BUF_START_FLAG[0] && flag2 === BUF_START_FLAG[1];
}
function checkEnd(flag1, flag2) {
  return flag1 === BUF_END_FLAG[0] && flag2 === BUF_END_FLAG[1];
}

// 目前所有的执行命令，如果是正常接收，都是统一回复  ff 55 0d 0a
function Parse() {
  this.cacheBuffer = [];

  // 解析从硬件传递过来的数据
  // data : 当前处理的数据
  // this.cacheBuffer: 历史缓存数据
  // 记录数据和历史数据分开记录

  /**
   * parse buffer
   * @param  {Array} buffData buffer that from the response
   * @return {Array}          the parsed result
   */
  this.doParse = function (buffData) {
    let recvLength = 0;
    //是否允许接受
    let isAllowRecv = false;
    let tempBuf = [];

    let data = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].arrayFromArrayBuffer(buffData);
    data = this.cacheBuffer.concat(data);
    // parse buffer data
    for (let i = 0; i < data.length; i++) {
      let data1 = parseInt(data[i - 1]),
          data2 = parseInt(data[i]);
      // start data
      if (checkStart(data1, data2)) {
        recvLength = 0;
        isAllowRecv = true;
        tempBuf = [];
      }
      // end data
      else if (checkStart(data1, data2)) {
          isAllowRecv = false;
          let resultBuf = tempBuf.slice(0, recvLength - 1);
          // 解析正确的数据后，清空 buffer
          this.cacheBuffer = [];
          // 此轮解析结束
          return resultBuf;
        }
        // the data we really want
        else {
            if (isAllowRecv) {
              if (recvLength >= REC_BUF_MAX_LENGTH) {
                console.warn("receive buffer overflow!");
              }
              tempBuf[recvLength++] = data2;
            }
          }
    }
  };

  /**
   * Get result from buffer data.
   * @param  {Array} buf array data.
   * @return {Float}         value of sensor's callback
   * 回复数据数值解析, 从左到右第四位数据：
   *     1: 单字符(1 byte)
   *     2： float(4 byte)
   *     3： short(2 byte)，16个长度
   *     4： 字符串
   *     5： double(4 byte)
   *     6: long(4 byte)
   *  @example
   *  ff 55 02 02 7c 1a 81 41 0d 0a
   */
  this.getResult = function (buf, type) {
    // 获取返回的数据类型
    let dataType = buf[1];
    let result = null;
    switch (dataType) {
      case "1":
      case 1:
        // 1byte
        result = buf[2];
        break;
      case "3":
      case 3:
        // 2byte
        result = this.calculateResponseValue([parseInt(buf[3]), parseInt(buf[2])]);
        break;
      case "4":
      case 4:
        // 字符串
        var bytes = buf.splice(3, buf[2]);
        result = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].bytesToString(bytes);
        break;
      case "2":
      case "5":
      case "6":
      case 2:
      case 5:
      case 6:
        // long型或者float型的4byte处理
        result = this.calculateResponseValue([parseInt(buf[5]), parseInt(buf[4]), parseInt(buf[3]), parseInt(buf[2])]);
        break;
      default:
        break;
    }

    // TOFIX: should not be placed here.
    //  if (type == this.PromiseType.ENCODER_MOTER.index) {
    //   result = Math.abs(result);
    // }

    return result;
  };

  /**
   * calculate value from data received: bytes -> int -> float
   * @param  {Array} intArray decimal array
   * @return {Number}  result.
   */
  this.calculateResponseValue = function (intArray) {
    var result = null;

    // FIXME: int字节转浮点型
    var intBitsToFloat = function (num) {
      /* s 为符号（sign）；e 为指数（exponent）；m 为有效位数（mantissa）*/
      var s = num >> 31 == 0 ? 1 : -1,
          e = num >> 23 & 0xff,
          m = e == 0 ? (num & 0x7fffff) << 1 : num & 0x7fffff | 0x800000;
      return s * m * Math.pow(2, e - 150);
    };
    var intValue = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].bytesToInt(intArray);
    // TOFIX
    if (intValue < 100000 && intValue > 0) {
      result = intValue;
    } else {
      result = parseFloat(intBitsToFloat(intValue).toFixed(2));
    }
    return result;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (new Parse());

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);





class Buzzer extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  /**
   * Buzzer类，声音模块
   * @constructor
   */
  constructor() {
    super();
    this.args = {
      tone: null,
      beat: null
    };
  }

  /**
   * @param {string} tone - 声音音调
   */
  tone(tone) {
    this.args.tone = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["b" /* defineString */])(tone.toUpperCase());
    return this;
  }
  /**
   * @param {string} beat - 声音音节
   */
  beat(beat) {
    this.args.beat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(beat);
    return this;
  }
  /**
   * 播放声音
   */
  play() {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setTone, [this.args.port, this.args.action]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 0;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Buzzer);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Compass extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readCompass, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    // Command.getSensorValue('ultrasonic', buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  //orion 不支持
  static supportStamp() {
    return '1110';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Compass);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_MotorBase__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class DcMotor extends __WEBPACK_IMPORTED_MODULE_2__base_MotorBase__["a" /* default */] {

  /**
   * DC Motor
   * @constructor
   * @param {number} port
   */
  constructor(port) {
    super(port);
  }

  /**
   * dcMoter run
   * @return {Object} the instance
   */
  run() {
    //组装buf
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setDcMotor, [this.args.port, this.args.speed]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  /**
   * dcMoter run reversely
   * @return {Object} the instance
   */
  runReverse() {
    this.speed(-1 * this.args.speed);
    return this.run();
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DcMotor);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_EncoderMotorBase__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class EncoderMotor extends __WEBPACK_IMPORTED_MODULE_2__base_EncoderMotorBase__["a" /* default */] {

  /**
   * DC Motor
   * @constructor
   * @param {number} port
   */
  constructor(port, slot) {
    super(port, slot);
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '0101';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (EncoderMotor);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_EncoderMotorBase__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






const bufComposer = function (args) {
  return __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readEncoderMotorOnBoard, [args.slot, args.type]);
};

class EncoderMotorOnBoard extends __WEBPACK_IMPORTED_MODULE_2__base_EncoderMotorBase__["a" /* default */] {
  /**
   * EncoderMotorOnBoard
   * @constructor
   * @param {number} port
   */
  constructor(slot) {
    super(slot);
    Object.assign(this.args, {
      type: null
    });
  }

  /**
   * get speed to the start position
   * @param  {Function} callback 
   */
  readSpeed(callback) {
    this.args.type = 0x02;
    //组装buf
    let buf = bufComposer(this.args);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  /**
   * get angle offset to the start position
   * @param  {Function} callback 
   */
  readAngle(callback) {
    this.args.type = 0x01;
    //组装buf
    let buf = bufComposer(this.args);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  //auriga megapi 支持
  static supportStamp() {
    return '0110';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (EncoderMotorOnBoard);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Flame extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readFlame, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Flame);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class FourKeys extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port, key) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      key: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["b" /* defineString */])(key)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readFourKeys, [this.args.port, this.args.key]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  //orion 不支持
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (FourKeys);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_RgbLedBase__ = __webpack_require__(8);


class FourLed extends __WEBPACK_IMPORTED_MODULE_0__base_RgbLedBase__["a" /* default */] {
  constructor(port) {
    super(port, 2);
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (FourLed);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Gas extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readGas, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Gas);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Gyro extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port, axis) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      axis: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["b" /* defineString */])(axis)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readGyro, [this.args.port, this.args.axis]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  //orion 不支持
  static supportStamp() {
    return '1110';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Gyro);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Humiture extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port, type) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      type: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(type)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readHumiture, [this.args.port, this.args.type]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  //orion 不支持
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Humiture);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Joystick extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port, axis) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      axis: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["b" /* defineString */])(axis)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readJoystick, [this.args.port, this.args.axis]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Joystick);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_LedMatrixBase__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class LedMatrixChar extends __WEBPACK_IMPORTED_MODULE_2__base_LedMatrixBase__["a" /* default */] {
  /**
   * @constructor
   */
  constructor(port) {
    super(port);
    //扩充参数
    Object.assign(this.args, {
      x: null,
      y: null,
      char: null
    });
  }

  x(xAxis) {
    this.args.x = xAxis;
    return this;
  }

  y(yAxis) {
    this.args.y = yAxis;
    return this;
  }

  showChar(str) {
    this.args.char = str;
    //组装buf
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setLedMatrixChar, [this.args.port, this.args.x, this.args.y, this.args.char]);
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  //orion 不支持
  static supportStamp() {
    return '1110';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LedMatrixChar);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_LedMatrixBase__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__communicate_command__ = __webpack_require__(1);
// import { defineNumber } from '../core/type';





class LedMatrixEmotion extends __WEBPACK_IMPORTED_MODULE_1__base_LedMatrixBase__["a" /* default */] {
  /**
   * @constructor
   */
  constructor(port) {
    super(port);
    //参数
    Object.assign(this.args, {
      x: null,
      y: null,
      emotion: null
    });
  }

  x(xAxis) {
    this.args.x = xAxis;
    return this;
  }

  y(yAxis) {
    this.args.y = yAxis;
    return this;
  }

  showEmotion(emotion) {
    this.args.emotion = emotion;
    //组装buf
    let buf = __WEBPACK_IMPORTED_MODULE_0__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_2__protocol_cmd__["a" /* default */].setLedMatrixEmotion, [this.args.port, this.args.x, this.args.y, this.args.emotion]);
    //执行
    __WEBPACK_IMPORTED_MODULE_3__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  //orion 不支持
  static supportStamp() {
    return '1110';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LedMatrixEmotion);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_LedMatrixBase__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class LedMatrixNumber extends __WEBPACK_IMPORTED_MODULE_2__base_LedMatrixBase__["a" /* default */] {
  /**
   * @constructor
   */
  constructor(port) {
    super(port);
    Object.assign(this.args, {
      number: null
    });
  }

  showNumber(number) {
    this.args.number = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(number);
    //组装buf
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setLedMatrixNumber, [this.args.port, this.args.number]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }
  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  //orion 不支持
  static supportStamp() {
    return '1110';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LedMatrixNumber);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_LedMatrixBase__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class LedMatrixTime extends __WEBPACK_IMPORTED_MODULE_2__base_LedMatrixBase__["a" /* default */] {
  /**
   * @constructor
   */
  constructor(port) {
    super(port);
    Object.assign(this.args, {
      separator: null,
      hour: null,
      minute: null
    });
  }

  separator(separator) {
    this.args.separator = separator;
    return this;
  }

  hour(h) {
    this.args.hour = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(h);
    return this;
  }

  minute(m) {
    this.args.minute = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(m);
    return this;
  }

  showTime() {
    //组装buf
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setLedMatrixTime, [this.args.port, this.args.separator, this.args.hour, this.args.minute]);
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  //orion 不支持
  static supportStamp() {
    return '1110';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LedMatrixTime);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_RgbLedBase__ = __webpack_require__(8);


class LedPanelOnBoard extends __WEBPACK_IMPORTED_MODULE_0__base_RgbLedBase__["a" /* default */] {
  constructor() {
    super(0, 2);
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 0;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LedPanelOnBoard);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Light extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readLight, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  // argsLength
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  // supportMainboards
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Light);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class LimitSwitch extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port, slot) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      slot: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(slot)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readLimitSwitch, [this.args.port, this.args.slot]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    // Command.getSensorValue('ultrasonic', buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (LimitSwitch);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class LineFollower extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readLineFollower, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    // Command.getSensorValue('ultrasonic', buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (LineFollower);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Pirmotion extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readPirmotion, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    // Command.getSensorValue('ultrasonic', buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Pirmotion);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Potentionmeter extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readPotentionmeter, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Potentionmeter);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Reset extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(callback) {
    super();
    this.reset(callback);
  }

  reset(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].reset);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述 port slot id 需传参的个数
  static argsStamp() {
    return 0;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Reset);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_RgbLedBase__ = __webpack_require__(8);


class RgbLed extends __WEBPACK_IMPORTED_MODULE_0__base_RgbLedBase__["a" /* default */] {
  constructor(port, slot) {
    super(port, slot);
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RgbLed);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_RgbLedBase__ = __webpack_require__(8);
// import { defineNumber } from '../core/type';


class RgbLedOnBoard extends __WEBPACK_IMPORTED_MODULE_0__base_RgbLedBase__["a" /* default */] {
  constructor() {
    super(0, 2);
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 0;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '0100';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RgbLedOnBoard);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class ServoMotor extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {

  /**
   * ServoMotor
   * @constructor
   * @param {number} port
   */
  constructor(port, slot) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      slot: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(slot),
      angle: 0
    };
  }

  /**
   * set angle of degree
   * @param  {Number} degree
   * @return {Object} the instance
   */
  angle(degree) {
    this.args.angle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(degree, 0);
    return this;
  }

  /**
   * go to the start
   * @return {[type]} [description]
   */
  toStart() {
    this.angle(180);
    return this.go();
  }

  /**
   * go to the end
   * @return {[type]} [description]
   */
  toEnd() {
    this.angle(0);
    return this.go();
  }

  go() {
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setServoMotor, [this.args.port, this.args.slot, this.args.angle]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ServoMotor);

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






// 作为闭包内容不开放
class SevenSegment extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  /**
   * Buzzer类，声音模块
   * @constructor
   */
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      number: null
    };
  }
  /**
   * @param {string} beat - 声音音节
   */
  showNumber(number) {
    this.args.number = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(number);
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setSevenSegment, [this.args.port, this.args.number]);
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SevenSegment);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






// 作为闭包内容不开放
class Shutter extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  /**
   * Buzzer类，声音模块
   * @constructor
   */
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      action: null
    };
  }

  /**
   * @param {string} actionId - 动作id  0: 按下快门; 1: 松开快门; 2: 聚焦; 3: 停止聚焦
   */
  action(actionId) {
    this.args.action = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["b" /* defineString */])(actionId);
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setShutter, [this.args.port, this.args.action]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Shutter);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Sound extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readSound, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Sound);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_MotorBase__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class StepperMotor extends __WEBPACK_IMPORTED_MODULE_2__base_MotorBase__["a" /* default */] {

  /**
   * DC Motor
   * @constructor
   * @param {number} port
   */
  constructor(port) {
    super(port);
    Object.assign(this.args, {
      distance: 0
    });
  }

  /**
   * set distance
   * @param  {Number} speed
   * @return {Object} the instance
   */
  distance(distance) {
    this.args.distance = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(distance, 0);
    return this;
  }

  /**
   * dcMoter run
   * @return {Object} the instance
   */
  run() {
    //组装buf
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].setDcMotor, [this.args.port, this.args.speed, this.args.distance]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execWrite(buf);
    return this;
  }

  /**
   * dcMoter run reversely
   * @return {Object} the instance
   */
  runReverse() {
    this.speed(-1 * this.args.distance);
    return this.run();
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '0111';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (StepperMotor);

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Temperature extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port, slot) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      slot: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(slot)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readTemperature, [this.args.port, this.args.slot]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    // Command.getSensorValue('ultrasonic', buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Temperature);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class TemperatureOnBoard extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor() {
    super();
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readTemperatureOnBoard);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 0;
  }

  //主控支持戳：描述各主控的支持情况
  //只有 auriga 支持 
  static supportStamp() {
    return '0100';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (TemperatureOnBoard);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Touch extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readTouch, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Touch);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Ultrasonic extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readUltrasonic, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    // Command.getSensorValue('ultrasonic', buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Ultrasonic);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Version extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(callback) {
    super();
    this.version(callback);
  }

  version(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readVersion);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 0;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '1111';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Version);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mcore__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__orion__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auriga__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__megaPi__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__neuron__ = __webpack_require__(16);






const boards = {
  "Mcore": __WEBPACK_IMPORTED_MODULE_0__mcore__["a" /* default */],
  "Orion": __WEBPACK_IMPORTED_MODULE_1__orion__["a" /* default */],
  "Auriga": __WEBPACK_IMPORTED_MODULE_2__auriga__["a" /* default */],
  "MegaPi": __WEBPACK_IMPORTED_MODULE_3__megaPi__["a" /* default */],
  "Neuron": __WEBPACK_IMPORTED_MODULE_4__neuron__["a" /* default */]
};

function Sensorium(boardName, opts) {
  //匹配对应的板子
  let board = boards[boardName];
  if (typeof board == 'undefined') {
    throw new Error('sorry, the board could not be supported!');
  }
  //TO IMPROVE: 需释放上一次板子实例
  return new board(opts);
}

if (typeof window != "undefined") {
  window.Sensorium = Sensorium;
}
// cmd
/* harmony default export */ __webpack_exports__["default"] = (Sensorium);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class GPIOContinue extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port, key) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port),
      key: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(key)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readGPIOContinue, [this.args.port, this.args.key]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '00001';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (GPIOContinue);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class AnalogGPIO extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readAnalogGPIO, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '00001';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (AnalogGPIO);

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class DigGPIO extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port) {
    super();
    this.args = {
      port: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readDigGPIO, [this.args.port]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 1;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '00001';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DigGPIO);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class DoubleGPIO extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor(port1, port2) {
    super();
    this.args = {
      port1: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port1),
      port2: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_type__["a" /* defineNumber */])(port2)
    };
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readDoubleGPIO, [this.args.port1, this.args.port2]);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 2;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '00001';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DoubleGPIO);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_type__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__electronic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__electronic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__protocol_cmd__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__communicate_command__ = __webpack_require__(1);






class Runtime extends __WEBPACK_IMPORTED_MODULE_2__electronic___default.a {
  constructor() {
    super();
  }

  getData(callback) {
    // 拿到协议组装器，组装协议
    let buf = __WEBPACK_IMPORTED_MODULE_1__core_utils__["a" /* default */].composer(__WEBPACK_IMPORTED_MODULE_3__protocol_cmd__["a" /* default */].readRuntime);
    //执行
    __WEBPACK_IMPORTED_MODULE_4__communicate_command__["a" /* default */].execRead(buf, callback);
    return this;
  }

  //参数戳：描述port slot id 需传参的个数
  static argsStamp() {
    return 0;
  }

  //主控支持戳：描述各主控的支持情况
  static supportStamp() {
    return '00001';
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Runtime);

/***/ })
/******/ ]);
//# sourceMappingURL=sensorium.js.map