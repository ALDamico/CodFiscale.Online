export class Place {
    private name: string;
    private province: string;
    private provinceAbbreviation: string;
    private region: string;
    private code: string;
    private id?: number;

    public get Id() {
        const id = this.id;
        if (id == undefined) {
            return 0;
        }
        return id;
    }

    public set Id(value: number) {
        this.id = value;
    }

    public set Code(value) {
        if (value != null && value.length != 4) {
            throw new Error("The code must be 4 characters long.");
        }
        this.code = value;
    }

    public get Code() {
        return this.code;
    }

    public get Region() {
        return this.region;
    }

    public set Region(value) {
        this.region = value;
    }

    public get ProvinceAbbreviation() {
        return this.provinceAbbreviation;
    }

    public set ProvinceAbbreviation(value) {
        if (value != null && value.length !== 2) {
            throw new Error("Province abbreviation can either be null or a two-character-long string.");
        }
        this.provinceAbbreviation = value;
    }
    public get Province() {
        return this.province;
    }

    public set Province(value) {
        this.province = value;
    }
    public get Name() {
        return this.name;
    }
    public set Name(value) {
        this.name = value;
    }
    constructor() {
        this.name = "";
        this.province = "";
        this.provinceAbbreviation = "";
        this.region = "";
        this.code = "";
    }

    public getPrettyName() {
        return this.name + " (" + this.provinceAbbreviation + ")";
    }


}
