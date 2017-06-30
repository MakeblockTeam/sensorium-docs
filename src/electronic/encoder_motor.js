import { defineNumber } from '../core/type';
import Utils from '../core/utils';
import EncoderMotorBase from './base/EncoderMotorBase';
import protocolAssembler from '../protocol/cmd';
import command from '../communicate/command';

class EncoderMotor extends EncoderMotorBase {
  constructor(port, slot) {
    super(port, slot);
  }

  static supportStamp(){
    return '0101';
  }
}

export default EncoderMotor;