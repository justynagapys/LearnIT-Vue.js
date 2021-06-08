<template>
    <div class="addContent">
        <md-table-toolbar>
            <h1 class="md-title">DODAJ MATERIAŁ</h1>
        </md-table-toolbar>
        <div>
            <ValidationObserver v-slot="{ invalid }" >
                <form v-on:submit.prevent="addContent" class="md-card">
                    <ValidationProvider name="title" rules="required|max:50" :custom-messages="errorMessages.titleErrors" v-slot="{ errors }">
                        <div class="form-group" >
                            <label for="title">Tytuł</label>
                            <input class="form-control" id="title" v-model="material.title" type="text" name="title" width="50%"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                    </ValidationProvider>
                    <ValidationProvider name="category" :rules="{ required: true }"
                     :custom-messages="errorMessages.categoryErrors" v-slot="{ errors }">
                    <div class="form-group">
                        <label for="category">Kategoria</label>
                        <select v-model="material.category" class="form-select" aria-label="Default select example">
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
                    <ValidationProvider name="keywords" :rules="{required: true, max: 100, regex: '^[A-ZĘÓĄŚŁŻŹĆŃa-zęóąśłżźćńA-ZĘÓĄŚŁŻŹĆŃ # , . + \-]*$'}"
                     :custom-messages="errorMessages.keyWordsErrors" v-slot="{ errors }">
                    <div class="form-group">
                        <label for="keywords">Słowa klucze</label>
                        <textarea class="form-control" id="keywords" v-model="material.keyWords" name="keywords" rows="2" cols="30"></textarea>
                        <span class="error-span">{{ errors [0]}}</span>
                    </div>
                    </ValidationProvider>
                    <ValidationProvider name="description" rules="required" :custom-messages="errorMessages.descriptionErrors" v-slot="{ errors }">
                    <div class="form-group">
                        <label for="description">Opis</label>
                        <textarea class="form-control" id="description" v-model="material.description" name="description" rows="4" cols="50"></textarea>
                        <span class="error-span">{{ errors [0]}}</span>
                    </div>
                    </ValidationProvider>
                    <div class="row">
                        <ValidationProvider class="col" name="link" :rules="{required: true, max: 2000, regex: '^http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+$'}"
                         :custom-messages="errorMessages.linkErrors"  v-slot="{ errors }">
                        <div class="col l-col">
                            <label for="link">Link do materiału</label>
                            <input class="form-control" id="link" v-model="material.link" type="text" name="link"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                        </ValidationProvider>
                        <ValidationProvider class="col"
                         :rules="{required: true, max: 100, regex: '^[A-ZĘÓĄŚŁŻŹĆŃ]{1}[a-zęóąśłżźćń ]+[A-ZĘÓĄŚŁŻŹĆŃ]+[a-zęóąśłżźćń \-]+[A-ZĘÓĄŚŁŻŹĆŃ]*[a-zęóąśłżźćńA-ZĘÓĄŚŁŻŹĆŃ]*$'}"
                         :custom-messages="errorMessages.authorErrors" v-slot="{ errors }">
                        <div class="col r-col">
                            <label for="author">Autor/ka (imię i nazwisko)</label>
                            <input class="form-control" id="author" v-model="material.author" type="text" name="author"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                        </ValidationProvider>
                    </div>
                    <br>
                    <div class="row">
                        <ValidationProvider class="col" name="university"
                         :rules="{required: true, max: 100, regex: '^[A-ZĘÓĄŚŁŻŹĆŃ]+[a-zęóąśłżźćńA-ZĘÓĄŚŁŻŹĆŃ \- . ,]*$'}"
                         :custom-messages="errorMessages.universityErrors" v-slot="{ errors }">
                        <div class="col l-col">
                            <label for="university">Uniwersytet</label>
                            <input class="form-control" id="university" v-model="material.university" type="text" name="university"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                        </ValidationProvider>
                        <ValidationProvider class="col" name="email" :rules="{required: true, max: 320, email: true}" :custom-messages="errorMessages.emailErrors" v-slot="{ errors }">
                        <div class="col r-col">
                            <label for="email">Adres email</label>
                            <input class="form-control" id="email" v-model="material.email" type="email" name="email"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                        </ValidationProvider>
                    </div>
                    <br>
                    <div>
                        <p style="padding-bottom:20px">Data dodania: {{ timestamp }}</p>
                    </div>
                    <div>
                        <button :disabled="invalid" style="padding-bottom: 7px" @click="isShow = !isShow" id="add" class="btn btn-primary" type="submit" name="add">Dodaj</button>
                    </div>
                    <br>
                </form>
            </ValidationObserver>
        </div>
        <transition>
            <simple-modal class="animate__animated animate__fadeIn" v-model="show.isShow" v-show="show.isShow" title="Dodano materiał">
                <template slot="body">
                    <h2>Sukces!</h2>
                    <p>Pomyślnie dodano materiał o tytule: {{material.title}}</p>
                    <button class="btn btn-primary" @click="reloadPage()">OK</button>
                </template>
            </simple-modal>
        </transition>
        <transition>
            <simple-modal class="animate__animated animate__fadeIn" v-model="show.isError" v-show="show.isError" title="Błąd">
                <template slot="body">
                    <h2>Błąd!</h2>
                    <p>Materiał o podanym tytule/odnośniku już istnieje!</p>
                    <button class="btn btn-primary" @click="show.isError = !show.isError">Powrót</button>
                </template>
            </simple-modal>
        </transition>
    </div>
</template>

<script>
import SimpleModal from 'simple-modal-vue';
import $ from 'jquery';

export default {
    name: 'PostContent',
    components: { SimpleModal },
    data() {
        return {
            material: {
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
            errorMessages: {
                titleErrors: {
                    required: 'To pole jest wymagane',
                    max: 'Maksymalna ilość znaków: 50',
                },
                categoryErrors: {
                    required: 'To pole jest wymagane',
                },
                keyWordsErrors: {
                    required: 'To pole jest wymagane',
                    max: 'Maksymalna ilość znaków: 100',
                    regex: 'Dozwolone są tylko litery oraz znaki: -,.#+',
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
            show: {
                isShow: false,
                isError: false,
            },
        };
    },
    computed: {
        timestamp() {
            return new Date().toLocaleDateString();
        },
    },
    methods: {
        addContent() {
            $.ajax({
                url: 'https://localhost:44304/learn-it/materials/add-material',
                method: 'post',
                data: this.material,
            })
            .done((result) => {
                this.show.isShow = true;
                console.log(result);
            })
            .fail((err) => {
                this.show.isError = true;
                console.log(err);
            });
        },
        async reloadPage() {
            this.$router.go();
        },
        getDate() {
            const datet = new Date(Date.now());
            const dateISO = datet.toISOString();
            return dateISO;
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
        padding-left: 30%;
        padding-right: 30%;
    }
    .md-title {
        text-transform: uppercase;
        font-weight: 600;
        padding-top: 30px;
    }
    .addContent {
        text-align: center;
        justify-content: center;
        align-items: center;
        min-height: 99vh;
        width: 100%;
        font-size: 20px;
        font-weight: 600;
    }

    .addContent ::selection {
        background-color:deepskyblue;
    }
    #add {
        width:200px;
    }
    .md-card {
        margin: 20px;
    }
</style>
