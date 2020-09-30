export class USBPrinter {
  constructor(filters) {
    this.filters = filters || [
      {
        vendorId: 0x0a5f /* zebra */
      }
    ];
  }

  async setup() {
    var selectedDevice = await navigator.usb.requestDevice({
      filters: this.filters
    });

    this.device = selectedDevice;
    console.log(this.device);

    await this.device.open();
    if (!this.device.configuration) {
      await this.device.selectConfiguration(1);
    }
    await this.device.claimInterface(0);
    if (!this.device.configuration.interfaces[0].alternate) {
      await this.device.selectAlternateInterface(0, 0);
    }
  }

  async read() {
    const {
      endpointNumber
    } = this.device.configuration.interfaces[0].alternate.endpoints[0];

    var result = await this.device.transferIn(endpointNumber, 64);
    var textDecoder = new TextDecoder();

    return textDecoder.decode(result.data);
  }

  async print(content) {
    var encoder = new TextEncoder();
    var data = encoder.encode(content);

    const {
      endpointNumber
    } = this.device.configuration.interfaces[0].alternate.endpoints[1];
    await this.device.transferOut(endpointNumber, data);
  }

  async connectAndPrint(content) {
    try {
      if (!this.device) {
        await this.setup();
        await this.print(content);
      } else {
        await this.print(content);
      }
    } catch (e) {
      console.log(e);
      delete this.device;

      throw e;
    }
  }
}
