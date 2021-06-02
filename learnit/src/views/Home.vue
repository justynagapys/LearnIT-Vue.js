<template>
    <div class="home">
        <div class="titleText">
            <h4 class="text">Portal LearnIT został stworzony dla celów edukacyjnych. Jest on przeznaczony dla studentów Informatyki.</h4>
        </div>
        <div>
            <transition>
                <img class="animate__animated animate__fadeInDown" width="780" height="200" src="../assets/education.jpg" />
            </transition>
        </div>
        <md-table-toolbar>
            <h5 class="md-title h5Title">Ostatnio dodane materiały:</h5>
        </md-table-toolbar>
        <md-table v-model="materials" md-card @md-selected="onSelect" class="mdTable">
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                <md-table-cell md-label="NAZWA" md-sort-by="title" class="tableCell">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="KATEGORIA" md-sort-by="category" class="tableCell">{{ item.category }}</md-table-cell>
                <md-table-cell md-label="SŁOWA KLUCZE" md-sort-by="keyWords" class="tableCell">{{ item.keyWords }}</md-table-cell>
                <md-table-cell md-label="AUTOR/KA" md-sort-by="author" class="tableCell">{{ item.author }}</md-table-cell>
                <md-table-cell md-label="DATA DODANIA / MODYFIKACJI" md-sort-by="date" class="tableCell">{{ item.date  | formatDate }}</md-table-cell>
            </md-table-row>
        </md-table>
        <transition name="fade">
            <md-card md-with-hover v-if="selected">
                <md-ripple class="selectedMaterial">
                    <md-card-header>
                        <a class="close" href="">&times;</a>
                        <div class="md-title sTitle">{{ selected.title }} </div>
                        <div class="md-subhead">
                            DATA DODANIA: {{ selected.date | formatDate }}
                        </div>
                    </md-card-header>
                    <md-card-content>
                        <p class="pHeader">KATEGORIA:</p>
                        <p>{{ selected.category }}</p>
                        <p class="pHeader">SŁOWA KLUCZE: </p>
                        <p>{{ selected.keyWords }}</p>
                        <p class="pHeader">OPIS: </p>
                        <p>{{ selected.description }}</p>
                        <p><button class="btn btn-primary" @click="openLink(selected.link)">Przejdź do materiału</button></p>
                        <p class="pHeader">AUTOR/KA: </p>
                        <p>{{ selected.author }}</p>
                        <p class="pHeader">EMAIL: </p>
                        <p>{{ selected.email }}</p>
                        <p class="pHeader">UNIWERSYTET: </p>
                        <p>{{ selected.university }}</p>
                    </md-card-content>
                </md-ripple>
            </md-card>
        </transition>
    </div>
</template>

<script>
import $ from 'jquery';
import 'animate.css';

export default {
    data() {
        return {
            selected: null,
            materials: [],
        };
    },
    async created() {
        $.ajax({
            url: 'https://localhost:44304/learn-it/materials/all',
            method: 'get',
        })
        .done((result) => {
            this.materials = result
            .sort((first, second) => (first.weight < second.weight ? 1 : -1))
            .slice(0, 5);
        })
        .fail((err) => {
            console.log(err);
        });
    },
    methods: {
        onSelect(item) {
            this.selected = item;
        },
    },
};
</script>

<style scoped>
    .home {
        padding: 5px;
        min-height: 99vh;
    }
    .md-title {
        text-transform: uppercase;
        font-weight: 600;
    }
    .text {
        font-weight: 600;
    }
    .tableCell {
        text-align: left;
        font-size:12px;
    }
    .pHeader {
      font-size: 15px;
      font-weight: 600;
    }
    .md-title {
        text-transform: uppercase;
        font-weight: 600;
    }
    .home ::selection {
        background-color:deepskyblue;
    }
     .selectedMaterial {
      margin: 60px auto;
      padding: 10px;
      background: #fff;
      border-radius: 5px;
      width: 60%;
      position: fixed;
      top: 45px;
      bottom: 40px;
      left: 280px;
      right: 0;
      height: auto;
      border: rgb(18, 55, 82) solid;
      overflow: auto;
    }
    .selectedMaterial .close {
      position: absolute;
      top: 20px;
      right: 30px;
      transition: all 200ms;
      font-size: 30px;
      font-weight: bold;
      text-decoration: none;
      color: #333;
    }
    .titleText {
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .mdTable{
        margin: 20px;
    }
    .h5Title{
        padding-top: 20px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
