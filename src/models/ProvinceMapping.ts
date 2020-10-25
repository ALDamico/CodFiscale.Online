export class ProvinceMapping {
    constructor(abbreviation: string, name: string) {
        this.abbreviation = abbreviation;
        this.name = name;
    }

    private abbreviation: string;
    private name: string;
    // TODO Add region

    public get Abbreviation() {
        return this.abbreviation;
    }
    public set Abbreviation(abbreviation: string) {
        this.abbreviation = abbreviation;
    }

    public get Name() {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }
}