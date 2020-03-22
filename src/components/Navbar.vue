<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

        <a class="navbar-brand">
            <font-awesome-icon icon="credit-card" class="fa-light"></font-awesome-icon>
            CodFiscale.Online</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link to="/" class="nav-link text-white">Calcola</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link text-white">Chi sono</router-link>
                </li>
            </ul>
        </div>
    </nav>
    <!--
    <nav class="navbar navbar-expand-lg navbar-light m-0">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="mx-4">
                    <router-link to="/" class="navbar-item nav-link">Calcola</router-link>
                </li>
                <li class="mx-4">
                    <router-link to="/about" class="navbar-item">About</router-link>
                </li>
            </ul>
        </div>
    </nav>-->
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
