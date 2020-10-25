<template>
  <div class="container grid">
    <div class="row">
      <b-form class="col-12">
        <b-modal variant="primary" id="modalEditPlace" title="Modifica" @ok="savePlace">
          <PlaceEditComponent :place="this.selectedPlace"></PlaceEditComponent>
        </b-modal>
        <div class="input-group row">
          <b-input class="col-12" type="text" placeholder="Ricerca..." @input="filterRows"></b-input>

        </div>
        <div class="row col-12">
          <b-table :items="rows" :fields="columns" selectable select-mode="single" hover @row-selected="handleTableSelectionChanged">

          </b-table>
        </div>
        <div class="row">
          <div class="col-12 float-right">
            <b-button variant="success">Conferma</b-button>
          </div>
        </div>
      </b-form>
    </div>


  </div>
</template>
<script>
import {Place} from "@/models/Place";
import PlaceEditComponent from "@/components/PlaceEditComponent";

export default {
  name: "PlacesGridComponent",
  data() {
    return {
      columns: [
        {
          key: 'name',
          label: 'Nome',
          sortable: true
        }, {
          key: 'provinceName',
          label: 'Provincia',
          sortable: true,
        }, {
          key: 'provinceAbbreviation',
          label: 'Sigla',
          sortable: true
        }, {
          key: 'regionName',
          label: 'Regione',
          sortable: true
        }, {
          key: 'code',
          label: 'Codice',
          sortable: true
        }
      ],
      rows: [
        {
          name: 'ABANO',
          provinceName: 'Pordenone',
          provinceAbbreviation: 'PD',
          regionName: 'Friuli-Venezia Giulia',
          code: 'A001'
        },
        {
          name: 'BRONTE',
          provinceName: 'Catania',
          provinceAbbreviation: 'CT',
          regionName: 'Sicilia',
          code: 'B202'
        },
        {
          name: 'ABANO',
          provinceName: 'Pordenone',
          provinceAbbreviation: 'PD',
          regionName: 'Friuli-Venezia Giulia',
          code: 'A001'
        },
      ],
      allData: [
        {
          name: 'ABANO',
          provinceName: 'Pordenone',
          provinceAbbreviation: 'PD',
          regionName: 'Friuli-Venezia Giulia',
          code: 'A001'
        },
        {
          name: 'BRONTE',
          provinceName: 'Catania',
          provinceAbbreviation: 'CT',
          regionName: 'Sicilia',
          code: 'B202'
        },
        {
          name: 'ABANO',
          provinceName: 'Pordenone',
          provinceAbbreviation: 'PD',
          regionName: 'Friuli-Venezia Giulia',
          code: 'A001'
        },
      ],
      handleShortcut: null,
      selectedPlace: null
    }
  },
  components: {PlaceEditComponent},
  mounted() {
    this.handleShortcut = function(e) {

      if (e.ctrlKey) {
        e.preventDefault();
        if (e.key.toLowerCase() === 'e') {
          this.$bvModal.show('modalEditPlace');
        }
      }

    }

    document.addEventListener('keydown', this.handleShortcut.bind(this));
  },
  methods: {
    handleTableSelectionChanged(e) {
      this.selectedPlace = e[0];
    },
    savePlace(place) {
      console.log(place);
    },
    filterRows(e) {
      this.rows = [];
      this.allData.forEach(row => {
        const code = row.code.toLowerCase();
        const name = row.name.toLowerCase();
        const provinceName = row.provinceName.toLowerCase();
        const provinceAbbreviation = row.provinceAbbreviation.toLowerCase();
        const regionName = row.regionName.toLowerCase();

        e = e.toLowerCase();


        if (
            code.includes(e) ||
            name.includes(e) ||
            provinceName.includes(e) ||
            provinceAbbreviation.includes(e) ||
            regionName.includes(e)
        ) {
          this.rows.push(row);
        }
      })
    }
  }
};
</script>
<style scoped>
.grid {
  margin-top: 80px;
}
</style>