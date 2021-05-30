<template>
     <div class="materials">
        <md-table-toolbar>
            <h1 class="md-title">Materiały</h1>
            <input type="text" class="form-control searchInput" aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Wyszukaj materiał po nazwie" v-model="searchText">
        </md-table-toolbar>
        <md-table v-model="filteredMaterials" :md-sort.sync="currentSort" :md-sort-order.sync="currentSortOrder" :md-sort-fn="customSort" md-card @md-selected="onSelect" class="mdTable">
            <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                <md-table-cell md-label="NAZWA" md-sort-by="title" class="tableCell">{{ item.title }}</md-table-cell>
                <md-table-cell md-label="KATEGORIA" md-sort-by="category" class="tableCell">{{ item.category }}</md-table-cell>
                <md-table-cell md-label="SŁOWA KLUCZE" md-sort-by="keyWords" class="tableCell">{{ item.keyWords }}</md-table-cell>
                <md-table-cell md-label="AUTOR" md-sort-by="author" class="tableCell">{{ item.author }}</md-table-cell>
                <md-table-cell md-label="DATA DODANIA / MODYFIKACJI" md-sort-by="date" class="tableCell">{{ item.date  | formatDate }}</md-table-cell>
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
                <p><button class="btn btn-primary" @click="openLink(selected.link)">ODNOŚNIK</button></p>
                <p class="pHeader">AUTOR: </p>
                <p>{{ selected.author }}</p>
                <p class="pHeader">EMAIL: </p>
                <p>{{ selected.email }}</p>
                <p class="pHeader">UNIWERSYTET: </p>
                <p>{{ selected.university }}</p>
                <b-container>
                <b-row>
                    <b-col id="col"><button @click="isShow1 =!isShow1"><img alt="edit" src="../assets/edit.svg" class="rowIcon"></button></b-col>
                    <b-col id="col"><button @click="isShow = !isShow"><img alt="trash" src="../assets/trash.svg" class="rowIcon"></button></b-col>
                    </b-row>
                </b-container>
            </md-card-content>
      </md-ripple>
    </md-card>
    <simple-modal v-model="isShow1">
    <template slot="body">
        <h2>Edycja materiału</h2>
        <div>
            <ValidationObserver v-slot="{ invalid }" >
            <form v-on:submit.prevent="editMaterial">
                <ValidationProvider name="title" rules="required|max:50" :custom-messages="errorMessages.titleErrors" v-slot="{ errors }">
                <div class="form-group">
                    <span>Tytuł</span>
                    <input v-if="selected" class="form-control" id="title" v-model="editedMaterial.title" type="text"
                     pattern="^[A-ZĘÓĄŚŁŻŹĆŃa-zęóąśłżźćńA-ZĘÓĄŚŁŻŹĆŃ , ' \- &quot;]*$" name="title" width="50%"/>
                    <span class="error-span">{{ errors [0]}}</span>
                </div>
                </ValidationProvider>
                <ValidationProvider name="category" :rules="{ required: true }"
                 :custom-messages="errorMessages.categoryErrors" v-slot="{ errors }">
                <div class="form-group">
                    <label for="category">Kategoria</label>
                    <select v-if="selected" v-model="editedMaterial.category" class="form-select" aria-label="Default select example">
                        <option id="analysis" name="analysis" value="Analiza danych">Analiza danych</option>
                        <option id="programming" name="programming" value="Programowanie">Programowanie</option>
                        <option id="network" name="network" value="Sieci">Sieci</option>
                        <option id="testing" name="testing" value="Testowanie">Testowanie</option>
                        <option id="operating_systems" name="operating_systems" value="Systemy operacyjne">Systemy operacyjne</option>
                        <option id="other" name="other" value="Inne">Inne</option>
                    </select>
                    <span class="error-span">{{ errors [0]}}</span>
                </div>
                </ValidationProvider>
                <ValidationProvider name="keywords" :rules="{ required: true, max: 100, regex: '^[A-ZĘÓĄŚŁŻŹĆŃa-zęóąśłżźćńA-ZĘÓĄŚŁŻŹĆŃ # , . \-]*$'}"
                 :custom-messages="errorMessages.keyWordsErrors" v-slot="{ errors }">
                <div class="form-group">
                    <label for="keywords">Słowa klucze</label>
                    <textarea v-if="selected" class="form-control" id="keywords" v-model="editedMaterial.keyWords" name="keywords" rows="2" cols="30"></textarea>
                    <span class="error-span">{{ errors [0]}}</span>
                </div>
                </ValidationProvider>
                <ValidationProvider name="description" rules="required" :custom-messages="errorMessages.descriptionErrors" v-slot="{ errors }">
                <div class="form-group">
                    <label for="description">Opis</label>
                    <textarea v-if="selected" class="form-control" id="description" v-model="editedMaterial.description" name="description" rows="4" cols="50"></textarea>
                    <span class="error-span">{{ errors [0]}}</span>
                </div>
                </ValidationProvider>
                <ValidationProvider name="link" :rules="{ required: true, max: 2000, regex: '^http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+$' }"
                 :custom-messages="errorMessages.linkErrors" v-slot="{ errors }">
                <div class="form-group">
                    <label for="link">Link do materiału</label>
                    <input v-if="selected" class="form-control" id="link" v-model="editedMaterial.link" type="text" name="link"/>
                    <span class="error-span">{{ errors [0]}}</span>
                </div>
                </ValidationProvider>
                <ValidationProvider name="author"
                 :rules="{required: true, max: 100, regex: '^[A-ZĘÓĄŚŁŻŹĆŃ]{1}[a-zęóąśłżźćń ]+[A-ZĘÓĄŚŁŻŹĆŃ]+[a-zęóąśłżźćń \-]+[A-ZĘÓĄŚŁŻŹĆŃ]*[a-zęóąśłżźćńA-ZĘÓĄŚŁŻŹĆŃ]*$'}"
                 :custom-messages="errorMessages.authorErrors" v-slot="{ errors }">
                <div class="form-group">
                    <label for="author">Autor/-ka (imię i nazwisko)</label>
                    <input v-if="selected" class="form-control" id="author" v-model="editedMaterial.author" type="text" name="author"/>
                    <span class="error-span">{{ errors [0]}}</span>
                </div>
                </ValidationProvider>
                <ValidationProvider name="university"
                 :rules="{required: true, max: 100, regex: '^[A-ZĘÓĄŚŁŻŹĆŃ]+[a-zęóąśłżźćńA-ZĘÓĄŚŁŻŹĆŃ \- . ,]*$'}"
                 :custom-messages="errorMessages.universityErrors" v-slot="{ errors }">
                <div class="form-group">
                    <label for="university">Uniwersytet</label>
                    <input v-if="selected" class="form-control" id="university" v-model="editedMaterial.university" type="text" name="university"/>
                    <span class="error-span">{{ errors [0]}}</span>
                </div>
                </ValidationProvider>
                <ValidationProvider name="email" :rules="{required: true, max: 320, email: true}" :custom-messages="errorMessages.emailErrors" v-slot="{ errors }">
                <div class="form-group">
                    <label for="email">Adres email</label>
                    <input v-if="selected" class="form-control" id="email" v-model="editedMaterial.email" type="email" name="email"/>
                    <span class="error-span">{{ errors [0]}}</span>
                </div>
                </ValidationProvider>
                <div class="form-group">
                    <button :disabled="invalid" style="padding-bottom: 7px" id="edit" @click="isShow1 = !isShow1" class="btn btn-primary" name="edit">Edytuj</button>
                </div>
            </form>
            </ValidationObserver>
        </div>
    </template>
    </simple-modal>
    <simple-modal v-model="isShow2" title="Edytowano materiał">
            <template slot="body">
                <h2>Sukces!</h2>
                <p>Pomyślnie edytowano materiał o tytule: {{this.editedMaterial.title}}!</p>
                <button class="btn btn-primary" @click="reloadPage()">Powrót</button>
            </template>
        </simple-modal>
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
        <h2>Pomyślnie usunięto materiał!</h2>
        <b-col class="col"><button class="btn btn-primary" @click="reloadPage()">Powrót</button></b-col>
    </template>
    </simple-modal>
  </div>
</template>

<script>
import SimpleModal from 'simple-modal-vue';

export default {
    name: 'app',
    components: { SimpleModal },
    data() {
        return {
            editedMaterial: {
                title: '',
                category: '',
                keyWords: '',
                description: '',
                link: '',
                date: this.getDate(),
                author: '',
                university: '',
                email: '',
            },
            selected: null,
            materials: [],
            searchText: '',
            currentSort: 'id',
            currentSortOrder: 'asc',
            isDeleted: false,
            isShow: false,
            isShow1: false,
            isShow2: false,
            errorMessages: {
                titleErrors: {
                    required: 'To pole jest wymagane',
                    max: 'Maksymalna ilość znaków: 50',
                    regex: 'Dozwolone są tylko litery oraz znaki: -,"',
                },
                categoryErrors: {
                    required: 'To pole jest wymagane',
                },
                keyWordsErrors: {
                    required: 'To pole jest wymagane',
                    max: 'Maksymalna ilość znaków: 100',
                    regex: 'Dozwolone są tylko litery oraz znaki: -,.#',
                },
                descriptionErrors: {
                    required: 'To pole jest wymagane',
                },
                linkErrors: {
                    required: 'To pole jest wymagane',
                    max: 'Maksymalna ilość znaków: 2000',
                    regex: 'Niepoprawny format odnośnika - musi rozpoczynać się od http(s)://',
                },
                authorErrors: {
                    required: 'To pole jest wymagane',
                    max: 'Maksymalna ilość znaków: 100',
                    regex: 'Autor musi rozpoczynać się z wielkiej litery oraz może zawierać tylko litery i opcjonalnie myślnik',
                },
                universityErrors: {
                    required: 'To pole jest wymagane',
                    max: 'Maksymalna ilość znaków: 100',
                    regex: 'Uniwersytet musi rozpoczynać się z wielkiej litery oraz może zawierać tylko litery i znaki: -,.',
                },
                emailErrors: {
                    required: 'To pole jest wymagane',
                    email: 'Zły format adresu email',
                    max: 'Maksymalna ilość znaków: 320',
                },
            },
        };
    },
    async created() {
        const baseURI = 'https://localhost:44304/learn-it/materials/all';
        this.$http.get(baseURI)
        .then((result) => {
            this.materials = result.data;
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        customSort(value) {
        return value.sort((a, b) => {
          const sortBy = this.currentSort;
          if (this.currentSortOrder === 'desc') {
            return a[sortBy].localeCompare(b[sortBy]);
          }
          return b[sortBy].localeCompare(a[sortBy]);
        });
        },
        onSelect(item) {
            this.selected = item;
            this.editedMaterial.title = this.selected.title;
            this.editedMaterial.category = this.selected.category;
            this.editedMaterial.keyWords = this.selected.keyWords;
            this.editedMaterial.description = this.selected.description;
            this.editedMaterial.link = this.selected.link;
            this.editedMaterial.author = this.selected.author;
            this.editedMaterial.university = this.selected.university;
            this.editedMaterial.email = this.selected.email;
        },
        async deleteMaterial(id) {
            this.$http.delete(`https://localhost:44304/learn-it/materials/delete-material/${id}`)
            .then((response) => {
                this.isShow = !this.isShow;
                this.isDeleted = !this.isDeleted;
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
        },
        async editMaterial() {
            this.$http.put(`https://localhost:44304/learn-it/materials/edit-material/${this.selected.id}`, this.editedMaterial)
            .then((response) => {
                this.isShow2 = !this.isShow2;
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
        },
        async reloadPage() {
            this.$router.go();
        },
        getTimestamp() {
            return new Date().toLocaleDateString();
        },
        getDate() {
            const datet = new Date(Date.now());
            const dateISO = datet.toISOString();
            return dateISO;
        },
    },
    computed: {
        filteredMaterials() {
            return this.materials.filter((item) => item.title.toLowerCase().includes(this.searchText.toLowerCase()));
        },
    },
};
</script>

<style scoped>
    .error-span {
        font-size: 15px;
        color: red;
    }
    .l-col {
        padding-left: 50%;
    }
    .r-col {
        padding-right: 50%;
    }
    .form-group {
        align-content: center;
        align-items: center;
        padding: 10px;
        padding-left: 20%;
        padding-right: 20%;
    }
    .materials {
        padding: 20px;
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
    .searchInput{
        margin: 10px;
    }
    #col {
        padding: 20px;
    }
</style>
