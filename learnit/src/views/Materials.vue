<template>
     <div class="materials">
        <md-table-toolbar>
            <h1 class="md-title">Materiały</h1>
        </md-table-toolbar>
        <md-table v-model="materials" md-sort="id" md-sort-order="asc" md-card @md-selected="onSelect" class="mdTable">
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                <md-table-cell md-label="NAZWA" md-sort-by="title" class="tableCell">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="KATEGORIA" md-sort-by="category" class="tableCell">{{ item.category }}</md-table-cell>
                <md-table-cell md-label="SŁOWA KLUCZE" md-sort-by="keyWords" class="tableCell">{{ item.keyWords }}</md-table-cell>
                <md-table-cell md-label="AUTOR" md-sort-by="author" class="tableCell">{{ item.author }}</md-table-cell>
                <md-table-cell md-label="DATA DODANIA" md-sort-by="date" class="tableCell">{{ item.date  | formatDate }}</md-table-cell>
            </md-table-row>
        </md-table>
    <md-card md-with-hover v-if="selected">
        <md-ripple  class="selectedMaterial">
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
                <p class="pHeader">LINK: </p>
                <p>{{ selected.link }}</p>
                <p class="pHeader">AUTOR: </p>
                <p>{{ selected.author }}</p>
                <p class="pHeader">EMAIL: </p>
                <p>{{ selected.email }}</p>
                <p class="pHeader">UNIWERSYTET: </p>
                <p>{{ selected.university }}</p>
                <b-container>
                <b-row>
                    <b-col id="col"><button><img alt="edit" src="../assets/edit.svg" class="rowIcon"></button></b-col>
                    <b-col id="col"><button @click="isShow = !isShow"><img alt="trash" src="../assets/trash.svg" class="rowIcon"></button></b-col>
                    </b-row>
                </b-container>
            </md-card-content>
      </md-ripple>
    </md-card>
    <div class="card-footer pb-0 pt-3">
      <jw-pagination :pageSize=15 :items="materials" @changePage="onChangePage" :labels="customLabels"></jw-pagination>
    </div>
    <simple-modal v-model="isShow" title="Usunięcie materiału">
    <template slot="body">
        <h2>Czy na pewno chcesz usunąć materiał?</h2>
        <b-container>
            <b-row>
                <b-col id="col"><button class="btn btn-primary" @click="isShow = !isShow">Nie</button></b-col>
                <b-col id="col"><button class="btn btn-primary" @click="deleteMaterial(selected.id)">Tak</button></b-col>
            </b-row>
        </b-container>
    </template>
    </simple-modal>
    <simple-modal v-model="isDeleted" title="Usunięcie materiału">
    <template slot="body">
        <h2>Pomyślnie usunięto materiał</h2>
        <b-col class="col"><button class="btn btn-primary" @click="reloadPage()">Powrót</button></b-col>
    </template>
    </simple-modal>
  </div>
</template>

<script>
import SimpleModal from 'simple-modal-vue';
import $ from 'jquery';

const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>',
};
export default {
    name: 'app',
    components: { SimpleModal },
    data() {
        return {
            selected: null,
            materials: [],
            pageOfItems: [],
            customLabels,
            isShow: false,
            isDeleted: false,
        };
    },
    async created() {
        $.ajax({
            url: 'https://localhost:44304/learn-it/materials/all',
            method: 'get',
        })
        .done((result) => {
            this.materials = result;
        })
        .fail((err) => {
            console.log(err);
        });
    },
    methods: {
        onSelect(item) {
            this.selected = item;
        },
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        },
        async deleteMaterial(id) {
            $.ajax({
                url: `https://localhost:44304/learn-it/materials/delete-material/${id}`,
                method: 'delete',
            })
            .done((result) => {
                this.isShow = !this.isShow;
                this.isDeleted = !this.isDeleted;
                console.log(result);
            })
            .fail((err) => {
                console.log(err);
            });
        },
        async reloadPage() {
            this.$router.go();
        },
    },
};
</script>

<style scoped>
    .materials {
        padding: 5px;
        height: 100%;
    }
    .md-title {
        text-transform: uppercase;
        font-weight: 600;
    }
    .tableCell {
        text-align: left;
        font-size:12px;
    }
    .rowIcon {
        height: 45px;
        width: 45px;
    }
    .materials ::selection, .materials:focus, .tableCell:focus {
        background-color:deepskyblue;
    }
    .selectedMaterial {
      margin: 10px auto;
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
    .pHeader {
      font-size: 15px;
      font-weight: 600;
    }
    .sTitle {
      color: rgb(18, 55, 82);
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
    #col {
        padding: 20px;
    }
</style>
