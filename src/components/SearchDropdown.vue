<template>
    <b-dropdown text="Luoghi" variant="light" dropup>
        <b-dropdown-form>
            <b-input-group>
                <b-form-input @input="filter()" v-model="filterText">

                </b-form-input>
                <b-input-group-append is-text>
                    <font-awesome-icon icon="search"></font-awesome-icon>
                </b-input-group-append>
            </b-input-group>
        </b-dropdown-form>

      <!-- <b-dropdown-divider/>-->
        <b-dropdown-item :key="element.id" v-for="element in this.filteredArray.slice(0, 10)">{{element.name}}</b-dropdown-item>
    </b-dropdown>
</template>

<script>

    export default {
        name: "SearchDropdown",
        props: ['options'],
        data() {
            return {
                index: 0,
                filterText: "",
                filteredArray: []
                //htmlIcon: ``
            }
        },
        mounted() {
            this.items = this.options;
            this.itemsPartial = this.options.slice(0, 10);
            this.filteredArray = this.options;
        },
        methods: {
            filter() {


                console.log(this.filterText);
                if (!this.filterText) {
                    return this.options;
                }
                this.filteredArray = this.options.filter(x => x.name.toLowerCase().includes(this.filterText.toLowerCase()));
                this.$forceUpdate();


            }
        }
    }
</script>

<style scoped>

</style>
