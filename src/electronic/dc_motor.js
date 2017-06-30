import { defineNumber } from '../core/type';
import Utils from '../core/utils';
import MotorBase from './base/MotorBase';
import protocolAssembler from '../protocol/cmd';
import command from '../communicate/command';

class DcMotor extends MotorBase {

  constructor(port) {
    super(port);
  }

  reverse() {
    this.speed(-1 * this.args.speed);
    return this;
  }

  run() {
    let buf = Utils.composer(protocolAssembler.setDcMotor, [this.args.port, this.args.speed]);
    command.execWrite(buf);
    return this;
  }

  static supportStamp(){
    return '1111';
  }
}

export default DcMotor;