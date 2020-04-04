<template>
    <b-table :items="fiscalCodeList">

    </b-table>
</template>

<script>
    export default {
        name: "FiscalCodeListComponent",
        data: function() {
            return {
                fiscalCodeList: []
            }
        },
        mounted() {
            this.fiscalCodeList = localStorage.getItem('fiscalCodes');
        }
    }
</script>

<style scoped>
b-table {
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>
