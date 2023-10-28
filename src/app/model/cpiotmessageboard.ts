import { CPIoTBase } from "./cpiotbase";


export class CPIOTMessageBoard extends CPIoTBase {
    public message: string;

    constructor() {
        super();
        this.message = '';
    }
}