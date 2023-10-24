export class BaseModel {
    public id: number;
    public createTime: number;
    public updateTime: number;

    constructor() {
        this.id = 0;
        this.createTime = 0;
        this.updateTime = 0;
    }
}