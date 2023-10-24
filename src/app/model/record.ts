import { BaseModel } from "./base";

export enum RECORD_TYPE {
    NONE = 0,
    TEMPERATURE,
    PHOTOSENSITIVE,
    MESSAGE,
    VOICE,
    DEVICE_STATE,
    PING
  }


export class Record extends BaseModel {
    public recordType: RECORD_TYPE;
    public state: number;
    public message: string;
    public value: number;
    public deviceName: string;

    constructor() {
        super();
        this.recordType = RECORD_TYPE.NONE;
        this.state = 0;
        this.message = '';
        this.value = 0;
        this.deviceName = '';
    }
}