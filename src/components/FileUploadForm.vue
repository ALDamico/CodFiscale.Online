<template>
  <div class="container">
    <div class="row">
      <h2>Aggiornamento del database</h2>
      <font-awesome-icon class="align-self-center tooltip-icon"
                         icon="question-circle"
                         v-b-tooltip.right="'Questa pagina consente di aggiornare il database di CodFiscale.Online con nuove informazioni sulle località.'"
      ></font-awesome-icon>
    </div>
    <b-form @submit="submitForm()">
      <div class="row form-group">
        <label class="col-form-label col-2" for="fileInput">File</label>
        <b-form-file id="fileInput" class="col-10" browse-text="Scegli"
                     placeholder="Seleziona un file da caricare" v-model="fileSource"></b-form-file>
      </div>
      <div class="row form-group">
        <label for="allowedSourcesSelector"
               class="col-form-label col-2">Tipo di file</label>

        <b-select :options="allowedSources" id="allowedSourcesSelector" class="col-4" v-model="fileSource"></b-select>
        <font-awesome-icon class="align-self-center tooltip-icon"
                           icon="question-circle"
                           id="allowedSourcesHelpIcon"></font-awesome-icon>
        <b-tooltip target="allowedSourcesHelpIcon">
          <div class="text-left">
            Ti consente di selezionare il tipo di file che stai caricando.
            <ul>
              <li><b>Istat</b>: È il file dei comuni italiani rilasciato dall'Istituto di Statistica.</li>
              <li><b>ANPR</b>: È il file dei comuni italiani rilasciato dal Ministero dell'Interno.</li>
            </ul>
          </div>
        </b-tooltip>

        <label class="col-form-label col-2" for="overwriteDbCheckbox">Sovrascrivi</label>
        <b-checkbox class="align-self-center" id="overwriteDbCheckbox" v-model="overwriteDb"></b-checkbox>
        <font-awesome-icon class="align-self-center tooltip-icon"
                           icon="question-circle"
                           id="overwriteDbHelpIcon"></font-awesome-icon>
        <b-tooltip target="overwriteDbHelpIcon">
          <div class="text-left">
            Se selezioni questa casella, i dati caricati sovrascriveranno quelli già presenti a DB.
          </div>
        </b-tooltip>


      </div>
      <div class="row form-group">
        <div class="col-12">
          <div class="float-right">
            <b-button @click="submitForm()" variant="success">Esegui</b-button>
          </div>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "FileUploadForm",
  data() {
    return {
      allowedSources: ["Istat", "ANPR"],
      file: null,
      fileSource: null,
      overwriteDb: false
    }
  },
  methods: {
    submitForm() {
      return;
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 40px;
}

.tooltip-icon {
  margin-left: 5px;
  color: #ababab
}

label {
  font-weight: bold;
}

</style>