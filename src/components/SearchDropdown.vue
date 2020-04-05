<template>
    <b-dropdown :text="selectedTextOrDefault"
                :variant="variant"
                :dropup="dropup"
                :dropleft="dropleft"
                :dropright="dropright"
                :id="id"
                :disabled="disabled"
                :right="right"
                :offset="offset"
                :no-flip="noFlip"
                :popper-opts="popperOpts"
                :boundary="boundary"
                :html="html"
                :size="size"
                :block="block"
                :menu-class="menuClass"
                :toggle-tag="toggleTag"
                :toggle-text="toggleText"
                :toggle-class="toggleClass"
                :no-caret="noCaret"
                :split="split"
                :split-href="splitHref"
                :split-to="splitTo"
                :split-variant="splitVariant"
                :split-class="splitClass"
                :split-button-type="splitButtonType"
                :lazy="lazy"
                :role="role"
    >
        <b-dropdown-form>
            <b-input-group>
                <b-form-input @input="filter()" v-model="filterText">

                </b-form-input>
                <slot name="search-icon">
                </slot>

            </b-input-group>
        </b-dropdown-form>
        <b-dropdown-divider/>
        <div class="scrollable-dropdown">

            <b-dropdown-item :key="element.id"
                             v-for="element in this.filteredArray"
                             @click="changeSelection(element)"
            >{{element.name}}
            </b-dropdown-item>
        </div>
    </b-dropdown>
</template>

<script>

    export default {
        name: "search-dropdown",
        props: {
            id: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            dropup: {
                type: Boolean,
                default: false
            },
            dropright: {
                type: Boolean,
                default: false
            },
            dropleft: {
                type: Boolean,
                default: false
            },
            right: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array
            },
            minimumSearchLength: {
                default: 3,
                type: Number
            },
            optionsLabel: {
                type: String,
                default: "name"
            },
            variant: {
                type: String,
                default: "primary"
            },
            noFlip: {
                type: Boolean,
                default: false
            },
            popperOpts: {
                default: null
            },
            boundary: {
                type: [String, HTMLElement],
                default: ""
            },
            text: {
                type: String,
                default: ''
            },
            html: {
                type: String
            },
            size: {
                type: String,
                default: "md"
            },
            block: {
                type: Boolean,
                default: false
            },
            menuClass: {
                type: [String, Array, Object]
            },
            toggleTag: {
                type: String,
                default: "button"
            },
            toggleText: {
                type: String,
                default: "Toggle dropdown"
            },
            toggleClass: {
                type: [String, Array, Object]
            },
            noCaret: {
                type: Boolean,
                default: false
            },
            split: {
                type: Boolean,
                default: false
            },
            splitHref: {
                type: String
            },
            splitTo: {
                type: [String, Object]
            },
            splitVariant: {
                type: String
            },
            splitClass: {
                type: [String, Array, Object]
            },
            splitButtonType: {
                type: String,
                default: "button"
            },
            lazy: {
                type: Boolean,
                default: false
            },
            role: {
                type: String,
                default: "menu"
            }
        },
        data() {
            return {
                filterText: "",
                filteredArray: [],
                selectedItemText: ""
            }
        },
        methods: {
            async filter() {
                if (!this.filterText || this.filterText.length < 3) {
                    return;
                }
                const prom = new Promise(this.tryFilter);
                await prom;
            },
            changeSelection(selectedElement) {
                this.selectedItemText = selectedElement[this.optionsLabel];
                this.$emit('change', selectedElement[this.optionsLabel]);
            },
            tryFilter() {
                this.filteredArray = this.options.filter(x => x.name.toLowerCase().includes(this.filterText.toLowerCase()));
            }
        },

        computed: {
            selectedTextOrDefault() {
                if (this.selectedItemText) {
                    return this.selectedItemText;
                }
                return this.text;
            }
        }
    }
</script>

<style scoped>
    .scrollable-dropdown {
        overflow-y: auto;
        max-height: 200px;
    }
</style>
