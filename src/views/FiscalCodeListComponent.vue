<template>
    <div class="container-fluid">
        <div v-if="fiscalCodeList.length > 0">
            <div class="scroll-horizontally">
                <b-table :items="fiscalCodeList"
                         :fields="tableFields"
                         per-page="10"
                         :current-page="currentPage"

                >

                </b-table>
                <b-pagination v-model="currentPage" :total-rows="fiscalCodeList.length"></b-pagination>
            </div>
            <b-button-group>
                <b-button variant="primary">Salva i dati in CSV</b-button>
                <b-button variant="danger">Cancella tutti i dati locali</b-button>
            </b-button-group>
        </div>
        <div v-else class="center-on-screen">
            <font-awesome-icon></font-awesome-icon>
            <p>Non hai ancora calcolato nessun codice fiscale.</p>
            <p>Vai alla pagina <router-link to="/">Calcola</router-link>.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FiscalCodeListComponent",
        data: function () {
            return {
                fiscalCodeList: [],
                tableFields: [
                    {
                        key: "name",
                        label: "Nome",
                        sortable: true
                    },
                    {
                        key: "surname",
                        label: "Cognome",
                        sortable: true
                    },
                    {
                        key: "fiscalCode",
                        label: "Codice fiscale"
                    },
                    {
                        key: "dateOfBirth",
                        label: "Data di nascita",
                        formatter: (value) => {
                            return new Date(value).toLocaleDateString('it-IT', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })
                        }
                    },
                    {
                        key: "placeOfBirth",
                        label: "Luogo di nascita"
                    }
                ],
                currentPage: 1
            }
        },
        mounted() {
            this.fiscalCodeList = JSON.parse(localStorage.getItem('localFiscalCodes')).filter(x => x != null);
            this.$forceUpdate();
        }
    }
</script>

<style scoped>
    b-table {
        position: absolute;
        top: 50%;
        left: 50%;
    }

    .scroll-horizontally {
        overflow-x: auto;
    }

    .center-on-screen {
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
