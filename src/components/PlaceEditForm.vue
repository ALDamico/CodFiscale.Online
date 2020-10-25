<template>
  <div class="container">
    <b-form>
      <div class="form-row form-group">
        <label class="col-form-label col-2" for="placeNameInput">Nome</label>
        <b-input id="placeNameInput" class="col-10" v-model="place.Name"></b-input>
      </div>
      <div class="form-row form-group">
        <label class="col-form-label col-2" for="regionNameInput">Regione</label>
        <b-input id="regionNameInput" class="col-10" v-model="place.Region"></b-input>
      </div>

    </b-form>
  </div>
</template>

<script>
import {Place} from "@/models/Place";

export default {
  name: "PlaceEditForm",
  data() {
    return {
      place: new Place(),
      provinceCache: [],
      regionCache: []
    }
  }
}
</script>

<style scoped>

</style>