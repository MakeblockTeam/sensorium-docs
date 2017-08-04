import { validateNumber } from '../core/validate';
import Utils from '../core/utils';
import Electronic from './electronic';
import protocolAssembler from '../protocol/cmd';
import CommandManager from '../communicate/command-manager';

/**
 * @Class AnalogGPIO
 * @extends Electronic
 */
class AnalogGPIO extends Electronic {
  /**
   * Create a analogGPIO.
   */
  constructor(port) {
    super();
    this.args = {
      port: validateNumber(port)
    };
  }

  /**
   * GetData of AnalogGPIO
   * @return {Promise} 
   */
  async getData() {
    let buf = Utils.composer(protocolAssembler.readAnalogGPIO, [this.args.port]);
    return await CommandManager.read(buf);
  }

  static supportStamp(){
    return '00001';
  }
}

export default AnalogGPIO;