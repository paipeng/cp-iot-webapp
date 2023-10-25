import { CPIoTBase } from "./cpiotbase";


export class CPIoTMessageBoard extends CPIoTBase {
    public message: string;

    constructor() {
        super();
        this.message = '';
    }
}