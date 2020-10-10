<template>
  <b-container class="fcContainer">
    <b-row>

      <h2 id="formTitle"
          class="text-center">Aggiornamento del database</h2>
      <font-awesome-icon class="tooltip-icon float-right align-self-center"
                         icon="question-circle"
                         id="formTooltip"
                         v-b-tooltip.hover.bottom="'Utilizza questo modulo per aggiornare il database delle località.'"

      ></font-awesome-icon>


    </b-row>
    <b-form>
      <div class="form-row">
        <label class="col-form-label col-2"
               for="fileInput">File</label>
        <b-form-file class="col-10"
                     placeholder="Seleziona il file da caricare"
                     browse-text="Scegli"
                     id="fileInput"
                     v-model="file"></b-form-file>
      </div>
      <div class="form-row">
        <label class="col-form-label col-2">Tipo di file</label>
        <b-select class="col-4"
                  :options="allowedFileTypes"
                  v-model="selectedFileType">
        </b-select>
        <label class="col-form-label col-2"
               for="overwriteAllCheckbox">Sovrascrivi</label>
        <b-check-group>

          <b-checkbox class="col-4 form-check-input"
                      id="overwriteAllCheckbox"
                      v-model="overwriteDatabase"></b-checkbox>
        </b-check-group>
      </div>
      <div class="row">
        <div class="col-3 offset-9">
          <div class="form-inline float-right">
            <div class="form-group">
              <b-button :disabled="isLoadButtonDisabled" @click="loadFile()"
                        variant="success">Carica
              </b-button>
            </div>
          </div>
        </div>
      </div>


    </b-form>

  </b-container>
</template>

<script>
export default {
  name: "PlacesUpdateForm",
  data() {
    return {
      file: null,
      allowedFileTypes: ["Istat", "ANPR"],
      selectedFileType: null,
      overwriteDatabase: false,
      errors: [],
      allowedFileExtensions: {
        excelLegacy: "application/vnd.ms-excel",
        commaSeparatedValues: "text/csv",
        excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        json: "application/json" //TODO Support importing JSON files
      }
    }
  },
  computed: {
    isLoadButtonDisabled() {
      if (this.file === null) {
        return true;
      }

      if (this.selectedFileType === null || this.selectedFileType === "") {
        return true;
      }

      return false;
    }
  },
  methods: {
    loadFile() {
      if (this.file.type === "text/csv") {
        console.log("TODO Papaparse");
      }
      else if (this.file.mimeType === "application/vnd.ms-excel") {
        console.log("TODO Excel");
      }
      else if (this.file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        console.log("TODO Excel 2010");
      }
      else {
        this.errors = [];
        this.errors.push("File non riconosciuto");
      }
    }
  }
}
</script>

<style scoped>
.fcContainer {
  margin-top: 2.5em
}

.tooltip-icon {
  color: #acacac;
  margin-left: 0.25em;
}

.col-form-label {
  font-weight: bold;
}

.form-row {
  padding-bottom: 5px;
  padding-top: 5px;
}

</style>