<template>
    <div class="card col-6">
        <div class="card-header">Codice Fiscale</div>
        <div class="card-body">
            <b-input-group>
                <b-input v-model="currentFiscalCode" disabled/>
                <b-input-group-append>
                    <b-button variant="success" @click="copyToClipboard">
                        <font-awesome-icon icon="copy" id="btnCopy"></font-awesome-icon>
                    </b-button>
                </b-input-group-append>
            </b-input-group>


            <b-tooltip target="btnCopy">Clicca per copiare negli appunti</b-tooltip>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FiscalCodeComponent",
        props: ['fiscalCode'],
        data: function(){
            return {
                currentFiscalCode: ""
            }
        },
        methods: {
            copyToClipboard() {
                navigator.clipboard.writeText(this.currentFiscalCode).
                    then(() =>alert("Copiato!"));
            }
        },
        mounted() {
            this.currentFiscalCode = this.$route.params.fiscalCode.fiscalCode;
        }
    }
</script>

<style scoped>

</style>
