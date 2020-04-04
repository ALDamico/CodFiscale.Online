<template>
    <div>
        <b-alert :variant="this.error.errorSeverity" :show="errorOccurred" dismissible fade>{{error.errorMessage}}
        </b-alert>
        <b-form class="container align-content-center">
            <b-modal variant="danger" id="modalConfirmReset" title="Conferma" @ok="resetForm">
                Sei sicuro di voler reimpostare il modulo?<br>
                Tutti i cambiamenti andranno persi!
            </b-modal>
            <div class="card">
                <div class="card-header">Informazioni personali</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-3">
                            <label for="personNameInput">Nome</label>
                        </div>
                        <div class="col-9">
                            <b-input class="mx-2 form-control" type="text" v-model="currentPerson.Name"
                                     id="personNameInput"
                                     placeholder="Nome"></b-input>
                        </div>
                    </div>
                    <div class="row p-3">
                        <div class="col-3">
                            <label for="personSurnameInput">Cognome</label>
                        </div>
                        <div class="col-9">
                            <b-input class="mx-2" type="text" v-model="currentPerson.Surname"
                                     placeholder="Cognome"
                                     id="personSurnameInput"></b-input>
                        </div>
                    </div>
                    <div class="row p-3">
                        <div class="col-3">
                            <label for="personBirthDateInput">Data di nascita</label>
                        </div>
                        <div class="col-9">
                            <b-form-datepicker class="mx-2" v-model="currentPerson.BirthDate"
                                               placeholder="Data di nascita"
                                               id="personBirthDateInput"></b-form-datepicker>
                        </div>
                    </div>
                    <div class="row p-3">
                        <div class="col-3">
                            <label for="personGenderInput">Sesso</label>
                        </div>
                        <div class="col-9">
                            <b-form-select :options="allowedGenderValues" v-model="selectedGender"
                                           class="custom-select"
                                           @change="changeGender" id="personGenderInput"></b-form-select>
                        </div>
                    </div>
                    <div class="row p-3">
                        <div class="col-3">
                            <label for="personBirthPlaceInput">Luogo di nascita</label>
                            <font-awesome-icon v-show="loading"
                                               icon="spinner"
                                               transform="rotate"
                                               class="fa-spin"/>
                        </div>
                        <div class="col-9">
                            <search-dropdown class="fc-dropdown"
                                    v-model="currentPerson.BirthPlace"
                                      :options="placesList"
                                        optionLabel="name"
                                      :filter="true"
                                      :showClear="true"
                                      @input="searchPlace"
                            ></search-dropdown>
                        </div>

                    </div>
                    <div class="row p-3 float-right">
                        <b-btn variant="success" class="mx-5 button-rotate" @click="calculateFiscalCode"
                               type="button">
                            <font-awesome-icon icon="check-circle"
                                               class="button-animated-icon-check"></font-awesome-icon>
                            Calcola
                        </b-btn>
                        <b-btn variant="danger" class="mx-5" @click="confirmReset" type="button">
                            <font-awesome-icon class="button-animated-icon-undo"
                                               icon="undo"></font-awesome-icon>
                            Reimposta
                        </b-btn>
                    </div>
                </div>
            </div>
        </b-form>
    </div>
</template>

<script>
    import {Person} from "@/models/Person";
    import ax from 'axios';
    import { CodFiscaleError } from "@/models/CodFiscaleError.ts";
    import SearchDropdown from "@/components/SearchDropdown";

    export default {
        name: "PersonForm",
        components: {
            SearchDropdown
        },
        data: function () {
            return {
                currentPerson: new Person(),
                allowedGenderValues: ['Maschile', 'Femminile'],
                selectedGender: null,
                retrievedPlaces: [],
                selectedPlace: null,
                errorOccurred: false,
                loading: false,
                error: new CodFiscaleError(),
                currentFiscalCode: {},
                placesList: []
            }
        },
        methods: {
            changeGender: function (selectedValue) {
                this.selectedGender = selectedValue;
                this.currentPerson.Gender = selectedValue;
            },
            changePlace: function (selectedPlace) {
                this.currentPerson.BirthPlace = selectedPlace;
                this.selectedPlace = selectedPlace;
            },
            searchPlace: async function (partialName) {
                /*const output = this.placesList.map(p =>{
                    if (p.prettyName.toLowerCase().includes(partialName.toLowerCase())) {
                        return {id: p.id, name: p.prettyName};
                    }
                });
                return output;*/

                this.loading = true;
                let targetUrl = "https://localhost:5001/api/places?name=" + partialName;
                if (process.env.NODE_ENV === 'production') {
                    targetUrl = "";
                }
                await ax.get(targetUrl).then(result => {
                    if (result.data === "") {
                        this.retrievedPlaces = [];
                    } else {
                        this.retrievedPlaces = result.data;
                    }
                }).catch(() => {
                    this.errorOccurred = true;
                    this.error = new CodFiscaleError("Si è verificato un errore durante il recupero dei dati dal server remoto.", "danger");
                }).finally(() => this.loading = false)
            },
            confirmReset() {
                this.$bvModal.show("modalConfirmReset");
            },
            resetForm() {
                this.currentPerson = new Person();
                this.selectedGender = null;
            },
            calculateFiscalCode() {
                const formValues = JSON.stringify(this.currentPerson);
                const formData = new FormData();
                formData.set('person', formValues);
                if (typeof (this.currentPerson.BirthPlace.id) !== 'undefined') {
                    formData.set('placeOfBirthId', this.currentPerson.BirthPlace.id.toString());
                } else {
                    formData.set('placeOfBirthId', null);
                }

                ax.post("https://localhost:5001/api/fiscalCode/calculate", formData)
                    .then(response => {
                        this.currentFiscalCode = response.data.fiscalCodeInfo;
                        this.saveFiscalCode();
                        this.$router.push({
                            name: 'fiscalCode',
                            params: { fiscalCode: this.currentFiscalCode}
                        });
                    });
            },
            saveFiscalCode() {
                let localFiscalCodes = JSON.parse( localStorage.getItem('localFiscalCodes'));
                if (!localFiscalCodes) {
                    localFiscalCodes = [];
                }
                localFiscalCodes.push(this.currentFiscalCode);
                localStorage.setItem('localFiscalCodes',  JSON.stringify(localFiscalCodes));
            }
        },
        mounted() {
            const targetUrl = "https://localhost:5001/api/places/all";
            const placesCache = JSON.parse( localStorage.getItem('placesCache'));
            ax.get(targetUrl)
                .then((response) => {
                    this.placesList = response.data.map(p =>
                        ({id: p.id, name: p.prettyName}));
                    const placeListString = this.placesList.map(place => JSON.stringify(place));

                    localStorage.setItem('placesCache',  JSON.stringify(this.placesList));
                })
                .catch(() => {
                    this.error = new CodFiscaleError("Si è verificato un errore durante il recupero dell'elenco dei luoghi dal server.", "danger");
                    if (placesCache != null && placesCache.length != 0) {
                        this.error = new CodFiscaleError("Non è stato possibile connettersi al server per recuperare l'elenco dei luoghi. Verrà usata la copia salvata in cache", "warning")
                        this.placesList = placesCache;
                    }
                    this.errorOccurred = true;
                });
        }
    }
</script>

<style scoped>
    .fc-dropdown {
        width: 100%;
    }

   
</style>
