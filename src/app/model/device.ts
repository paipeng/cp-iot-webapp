import { BaseModel } from "./base";

export class Device extends BaseModel {
    public uuid: string;
    public name: string;
    public description: string;
    public expire: number;
    public led: boolean;
    public temperature: boolean;
    public photosensitive: boolean;
    public messageBoard: boolean;
    public voiceControl: boolean;
    public location: string;
    public latitude: number;
    public longitude: number;

    constructor() {
        super();
        this.uuid = '';
        this.name = '';
        this.description = '';
        this.expire = 0;
        this.led = false;
    }
}