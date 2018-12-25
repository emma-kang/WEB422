export class Position {
    _id : string;
    PositionName : string;
    PositionDescription : string;
    PositionBaseSalary : number;
    __v : number;

    constructor(){
        this._id = "";
        this.PositionName = "";
        this.PositionDescription = "";
        this.PositionBaseSalary = 0;
        this.__v = 0;
    }
}