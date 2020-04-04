<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">CodFiscale.Online</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>


            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                    <b-nav-item to="/">Calcola</b-nav-item>
                    <b-nav-item to="/about">Chi siamo</b-nav-item>
                    <b-nav-item to="/myFiscalCodes">Archivio</b-nav-item>



                <b-nav-item-dropdown right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>Calcola</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    .navbar {
        background-color: forestgreen !important;
    }

    .navbar-brand {
        color: white;
    }
    .navbar-brand:hover {
        color:white;
    }

    .fa-light {
        color: white;
    }

    .fa-light:hover {
        color: black;
    }

    .navbar:hover>.fa-light {
        color:black;
    }
</style>
