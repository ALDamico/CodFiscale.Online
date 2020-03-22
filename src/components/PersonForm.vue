<template>
    <div>
        <b-alert variant="danger" :show="errorOccurred" dismissible fade>{{errorMessage}}
        </b-alert>
        <b-form class="container align-content-center">
            <b-modal variant="danger" id="modalConfirmReset" title="Conferma" @ok="resetForm">
                Sei sicuro di voler reimpostare il modulo?<br>
                Tutti i cambiamenti andranno persi!
            </b-modal>
            <div class="card">
                <div class="card-header">Informazioni personali</div>
                <div class="card-body">
                    <div class="row p-3">
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
                            <font-awesome-icon v-show="loading" icon="spinner" transform="rotate"
                                               class="fa-spin"></font-awesome-icon>
                        </div>
                        <div class="col-9">
                            <Dropdown class="col-12"
                                      :options="retrievedPlaces"
                                      v-on:filter="searchPlace"
                                      v-on:selected="changePlace"
                                      placeholder="Luogo di nascita"
                            ></Dropdown>
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
    import Dropdown from 'vue-simple-search-dropdown';

    export default {
        name: "PersonForm",
        components: {
            Dropdown
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
                errorMessage: "",
                fiscalCode: null
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
                    this.errorMessage = "Si è verificato un errore durante il recupero dei dati dal server remoto."
                }).finally(() => this.loading = false)
            },
            confirmReset() {
                this.$bvModal.show("modalConfirmReset");
            },
            resetForm() {

                this.currentPerson = new Person();
            },
            calculateFiscalCode() {
                const formValues = JSON.stringify(this.currentPerson);
                const formData = new FormData();
                formData.set('person', formValues);
                console.log(this.currentPerson.BirthPlace.id);
                if (typeof (this.currentPerson.BirthPlace.id) !== 'undefined') {
                    formData.set('placeOfBirthId', this.currentPerson.BirthPlace.id.toString());
                } else {
                    formData.set('placeOfBirthId', null);
                }

                ax.post("https://localhost:5001/api/fiscalCode/calculate", formData)
                    .then(response => {
                        document.getElementById('front').style.transform = 'rotateY(180deg)';
                        this.fiscalCode = response.data;
                        console.log(response);
                        //this.fiscalCode = response.data;
                    })
                    .catch(e => {
                        if (!e.response) {
                            this.errorOccurred = true;
                            this.errorMessage = "Il server non ha inviato alcuna risposta. Riprova più tardi."
                        }
                    });
            }
        }
    }
</script>

<style scoped>

</style>
