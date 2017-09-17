import { warnNotSupport } from '../core/validate';
import Utils from '../core/utils';
import Electronic from './electronic';
import PIDForDistance from './encoder_motor_on_board_pid_for_distance';
import PIDForSpeed from './encoder_motor_on_board_pid_for_speed';
import PIDForPwm from './encoder_motor_on_board_pid_for_pwm';
import PIDForDoubleMotor from './encoder_motor_on_board_pid_for_doubleMotor';

import protocolAssembler from '../protocol/cmd';
import Control from '../communicate/control';
import { SUPPORTLIST } from '../settings';

let auriga = SUPPORTLIST[1].toLowerCase();
let megapipro = SUPPORTLIST[5].toLowerCase();

class EncoderMotorOnBoardPID extends Electronic {
  constructor() {
    super();
    let host = warnNotSupport(arguments[arguments.length-1]) || megapipro;
    //宿主
    this.hostname = host.toLowerCase();
    //位置模式
    this.distanceMode = function(){
      return new PIDForDistance();
    }
    //速度模式
    this.speedMode = function(){
      return new PIDForSpeed();
    }
    //auriga 会多出两个 API
    if(this.hostname === auriga){
      //pwm 模式
      this.pwmMode = function(){
        return new PIDForPwm();
      }
      //双电机模式
      this.doubleMotorMode = function(){
        return new PIDForDoubleMotor();
      }
    }

    this.reset = false;
  }

  /**
   * 获取协议
   */
  get protocol() {
    let subCmd = [];
    if (this.reset) {
      this.reset = false;
      if (this.hostname == auriga){
        subCmd = [0x04];
      } else if (this.hostname == megapipro){
        subCmd = [0x03];
      }
    }
    return Utils.composer(protocolAssembler.setEncoderMotorPIDZeroPoint, subCmd);
  }

  /**
   * 设置零点
   * @example
   * let pid = new EncoderMotorOnBoardPID()
   * pid.setZeroPoint()
   */
  setZeroPoint() {
    this.reset = true;
    return this;
  }

  run () {
    Control.write(this.protocol);
    return this;
  }

  static get supportStamp(){
    return '010001';
  }
}

export default EncoderMotorOnBoardPID;