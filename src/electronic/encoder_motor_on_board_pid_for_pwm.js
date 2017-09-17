import { validateNumber } from '../core/validate';
import Utils from '../core/utils';
import protocolAssembler from '../protocol/cmd';
import Control from '../communicate/control';

class PIDForPwm {
  constructor() {
    this.args = {
      speed: 0
    };
  }

  /**
   * set speed
   * @param  {Number} angle [description]
   * @return {[type]}       [description]
   */
  speed(speed) {
    this.args.speed = validateNumber(speed, this.args.speed);
    return this;
  }

  /**
   * 获取协议
   */
  get protocol() {
    return Utils.composer(protocolAssembler.setEncoderMotorPIDPwm, [this.args.speed]);
  }

  run() {
    Control.write(this.protocol);
    return this;
  }
}

export default PIDForPwm;