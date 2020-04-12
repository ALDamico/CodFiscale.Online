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
                            <b-form-datepicker class="mx-2"
                                               value-as-date
                                               v-model="currentPerson.BirthDate"
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
                                             block
                                             variant="light"
                                             v-model="currentPerson.BirthPlace.Name"
                                             :options="placesList"
                                             optionLabel="name"
                                             :filter="true"
                                             :showClear="true"
                                             :valid-on="currentPerson.BirthDate"
                                             @change="currentPerson.BirthPlace = $event"
                                             text="Luogo di nascita"
                            >
                                <template v-slot:search-icon>
                                    <b-input-group-append is-text>
                                        <font-awesome-icon icon="search"></font-awesome-icon>
                                    </b-input-group-append>
                                </template>
                            </search-dropdown>
                        </div>

                    </div>
                    <div class="row p-3 float-right">
                        <b-btn variant="success" class="mx-5 button-rotate" @click="calculateFiscalCode"
                               type="button" :disabled="isCalculateButtonDisabled">
                            <font-awesome-icon icon="check-circle"
                                               class="button-animated-icon-check" :disabled="isCalculateButtonDisabled" ></font-awesome-icon>
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
    import {CodFiscaleError} from "@/models/CodFiscaleError.ts";
    import SearchDropdown from "@/components/SearchDropdown";
    import {Gender} from '@/models/Gender.ts'

    export default {
        name: "PersonForm",
        components: {
            SearchDropdown
        },
        computed: {
            isCalculateButtonDisabled() {
                if (!this.currentPerson.Name ||
                    !this.currentPerson.Surname  ||
                    !this.currentPerson.BirthDate ||
                    this.currentPerson.BirthPlace.name === "" ||
                    this.currentPerson.Gender === Gender.Unspecified

                ) {
                    return true;
                }
                return false;
            }
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

                ax.post("fiscalCode/calculate", formData, {
                    baseURL: "https://api.codfiscale.online"
                })
                    .then(response => {
                        this.currentFiscalCode = response.data.fiscalCodeInfo;
                        this.saveFiscalCode();
                        this.$router.push({
                            name: 'fiscalCode',
                            params: {fiscalCode: this.currentFiscalCode}
                        });
                    })
                    .catch(err => console.log(err));
            },
            saveFiscalCode() {
                let localFiscalCodes = JSON.parse(localStorage.getItem('localFiscalCodes'));
                if (!localFiscalCodes) {
                    localFiscalCodes = [];
                }
                localFiscalCodes.push(this.currentFiscalCode);
                localStorage.setItem('localFiscalCodes', JSON.stringify(localFiscalCodes));
            }
        }
    }
</script>

<style scoped>
    .fc-dropdown {
        width: 100%;
    }


</style>
