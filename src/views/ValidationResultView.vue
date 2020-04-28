<template>
    <validation-result></validation-result>
</template>

<script>
    import ValidationResult from "@/components/ValidationResult";
    export default {
        name: "ValidationResultView",
        components: {ValidationResult},
        props: {
            //validationResult
        }
    }
</script>

<style scoped>

</style>
