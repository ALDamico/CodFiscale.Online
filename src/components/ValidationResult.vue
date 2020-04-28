<template>
    <div class="row">
        <div class="col-3">
            <label class="col-form-label">Atteso</label>
        </div>
        <div class="col-9">{{validationResult.expectedFiscalCode}}</div>
    </div>
</template>

<script>
    export default {
        name: "ValidationResult",
        props: {
            validationResult: {
                type: Object,
                default: () => ({
                    expectedFiscalCode: "",
                    providedFiscalCode: "",
                    person: {

                    },
                    validationResult: []
                })
            }
        }
    }
</script>

<style scoped>

</style>
