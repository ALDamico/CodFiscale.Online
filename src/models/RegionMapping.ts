import {ProvinceMapping} from "@/models/ProvinceMapping";

export class RegionMapping {
    private name: string;
    private provinces: Array<ProvinceMapping>;

    constructor(name: string) {
        this.name = name;
        this.provinces = new Array<ProvinceMapping>();
    }

    public get Name() {
        return this.name;
    }

    public set Name(name: string) {
        this.name = name;
    }

    public addProvince(provinceMapping: ProvinceMapping) {
        this.provinces.push(provinceMapping);
    }

    public removeProvince(provinceMapping: ProvinceMapping): boolean {
        const index = this.provinces.indexOf(provinceMapping);

        if (index > -1) {
            this.provinces.splice(index, 1);
            return true;
        }

        return false;
    }

    public clearProvinces() {
        this.provinces = new Array<ProvinceMapping>();
    }
}