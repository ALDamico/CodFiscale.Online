<template>
    <div>
        <b-button>Ciao!</b-button>
        <FiscalCodeComponent :fiscal-code="this.$route.params.fullFiscalCode"></FiscalCodeComponent>
    </div>
</template>

<script>
    import FiscalCodeComponent from "@/components/FiscalCodeComponent";

    export default {
        name: "FiscalCode",
        components: {FiscalCodeComponent},
        props: ['fiscalCode']
    }
</script>

<style scoped>
    fiscalCodeComponent {
        position:absolute;
        top: 50%;
        left: 50%;
    }
</style>
