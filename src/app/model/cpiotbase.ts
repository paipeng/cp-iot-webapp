
export abstract class CPIoTBase {
    public udid: string;
    public serverName: string;
    public state: number;

    constructor() {
        this.udid = '';
        this.serverName = '';
        this.state = 0;
    }
}