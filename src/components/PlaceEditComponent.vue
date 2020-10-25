<template>
  <div>
    <b-form>
      <div class="form-row">
        <label for="nameInput" class="col-form-label col-3">
          Nome
        </label>
        <b-input id="nameInput" class="col-9" v-model="editedPlace.Name"></b-input>
      </div>
      <div class="form-row">
        <label for="regionSelect" class="col-form-label col-3">Regione</label>
        <b-select id="regionSelect" class="col-9" v-model="editedPlace.Region"></b-select>
      </div>
      <div class="form-row">
        <label for="provinceSelect" class="col-form-label col-3">Provincia</label>
        <b-select id="provinceSelect" class="col-8" @change="onProvinceChanged" v-model="editedPlace.Province"></b-select>
        <label for="provinceSelect" class="col-form-label align-content-center col-1">CT</label>
      </div>
      <div class="form-row">
        <label for="codeInput" class="col-form-label col-3">Codice</label>
        <b-input id="codeInput" class="col-9" v-model="editedPlace.Code"></b-input>
      </div>
    </b-form>
  </div>
</template>

<script>
import {Place} from "@/models/Place";

export default {
  name: "PlaceEditComponent",
  props: ['place'],
  beforeMount() {
    this.editedPlace = new Place();
    this.editedPlace.Name = this.place.name;
    this.editedPlace.Code = this.place.code;
    this.editedPlace.Region = this.place.region;
    this.editedPlace.Province = this.place.province;
    this.editedPlace.ProvinceAbbreviation = this.place.provinceAbbreviation;
  },
  data() {
    return {
      editedPlace: Place
    }
  },
  methods: {
    onProvinceChanged(e) {
      this.editedPlace.Province = e;
      //TODO Set province abbreviation
    }
  }
}
</script>

<style scoped>

</style>