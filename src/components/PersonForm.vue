<template>
    <b-form class="container align-content-center">
        <div class="card">
            <div class="card-header">Informazioni personali</div>
            <div class="card-body">
                <!--<div class="form-group">-->
                <div class="row p-3">
                    <div class="col-3">
                        <label for="personNameInput">Nome</label>
                    </div>
                    <div class="col-9">
                        <b-input class="mx-2 form-control" type="text" v-model="currentPerson.Name" id="personNameInput"
                                 placeholder="Nome"></b-input>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-3">
                        <label for="personSurnameInput">Cognome</label>
                    </div>
                    <div class="col-9">
                        <b-input class="mx-2" type="text" v-model="currentPerson.Surname" placeholder="Cognome"
                                 id="personSurnameInput"></b-input>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-3">
                        <label for="personBirthDateInput">Data di nascita</label>
                    </div>
                    <div class="col-9">
                        <b-form-datepicker class="mx-2" v-model="currentPerson.BirthDate"
                                           placeholder="Data di nascita" id="personBirthDateInput"></b-form-datepicker>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-3">
                        <label for="personGenderInput">Sesso</label>
                    </div>
                    <div class="col-9">
                        <b-form-select :options="allowedGenderValues" v-model="selectedGender" class="custom-select"
                                       @change="changeGender" id="personGenderInput"></b-form-select>
                    </div>
                </div>
                <div class="row p-3">
                    <div class="col-3">
                        <label for="personBirthPlaceInput">Luogo di nascita</label>
                    </div>
                    <div class="col-9">
                        <b-dropdown variant="outline-primary" :text="placeHeader" id="personBirthPlaceInput">
                            <b-input class="m-0 p-0" placeholder="Cerca" type="text"></b-input>
                            <b-dropdown-divider/>
                            <b-dropdown-item v-bind:key="place.Id" v-for="place in retrievedPlaces"
                                             @click="changePlace(place)">
                                {{place.name + " (" + place.provinceAbbreviation + ")"}}
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                </div>
                <div class="row p-3 float-right">
                    <b-btn variant="success" class="mx-5 button-rotate">
                        <font-awesome-icon icon="check-circle" class="button-animated-icon-check"></font-awesome-icon>
                        Calcola
                    </b-btn>
                    <b-btn variant="danger" class="mx-5">
                        <font-awesome-icon class="button-animated-icon-undo" icon="undo"></font-awesome-icon>
                        Reimposta
                    </b-btn>
                </div>


            </div>
        </div>
        <!--</div>-->
    </b-form>
</template>

<script>
    import {Person} from "@/models/Person";

    export default {
        name: "PersonForm",
        data: function () {
            return {
                currentPerson: new Person(),
                allowedGenderValues: ['Maschile', 'Femminile'],
                selectedGender: null,
                retrievedPlaces: [
                    {
                        name: 'Bronte',
                        province: 'Catania',
                        provinceAbbreviation: 'CT',
                        code: 'B202',
                        region: 'Sicilia'
                    },
                    {
                        name: 'Randazzo',
                        province: 'Catania',
                        provinceAbbreviation: 'CT',
                        code: 'H175',
                        region: 'Sicilia'
                    }
                ],
                selectedPlace: null
            }
        },
        methods: {
            changeGender: function (selectedValue) {
                this.selectedGender = selectedValue;
                this.currentPerson.Gender = selectedValue;
            },
            changePlace: function (selectedPlace) {
                this.currentPerson.BirthPlace = selectedPlace;
                this.retrievedPlaces.push(selectedPlace);
                this.selectedPlace = selectedPlace;
                console.log(selectedPlace);
            }
        },
        computed: {
            placeHeader: function () {
                return this.selectedPlace === null ? 'Luogo di nascita' : this.selectedPlace.name
            }
        }
    }
</script>

<style scoped>

</style>
