<template>
    <div class="addContent">
        <md-table-toolbar>
            <h1 class="md-title">DODAJ MATERIAŁ</h1>
        </md-table-toolbar>
        <div>
            <ValidationObserver v-slot="{ invalid }" >
                <form v-on:submit.prevent="addContent()" class="md-card">
                    <ValidationProvider name="title" rules="required" :custom-messages="errorMessages" v-slot="{ errors }">
                        <div class="form-group" >
                            <label for="title">Tytuł</label>
                            <input class="form-control" id="title" v-model="material.title" type="text" name="title" width="50%"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                    </ValidationProvider>
                    <ValidationProvider name="category" rules="required" :custom-messages="errorMessages" v-slot="{ errors }">
                    <div class="form-group">
                        <label for="category">Kategoria</label>
                        <select v-model="material.category" class="form-select" aria-label="Default select example">
                            <option id="analysis" name="analysis" value="Analiza danych">Analiza danych</option>
                            <option id="programming" name="programming" value="Programowanie">Programowanie</option>
                            <option id="network" name="network" value="Sieci">Sieci</option>
                            <option id="testing" name="testing" value="Testowanie">Testowanie</option>
                            <option id="other" name="other" value="Inne">Inne</option>
                        </select>
                        <span class="error-span">{{ errors [0]}}</span>
                    </div>
                    </ValidationProvider>
                    <ValidationProvider name="keywords" rules="required" :custom-messages="errorMessages" v-slot="{ errors }">
                    <div class="form-group">
                        <label for="keywords">Słowa klucze</label>
                        <textarea class="form-control" id="keywords" v-model="material.keyWords" name="keywords" rows="2" cols="30"></textarea>
                        <span class="error-span">{{ errors [0]}}</span>
                    </div>
                    </ValidationProvider>
                    <ValidationProvider name="description" rules="required" :custom-messages="errorMessages" v-slot="{ errors }">
                    <div class="form-group">
                        <label for="description">Opis</label>
                        <textarea class="form-control" id="description" v-model="material.description" name="description" rows="4" cols="50"></textarea>
                        <span class="error-span">{{ errors [0]}}</span>
                    </div>
                    </ValidationProvider>
                    <div class="row">
                        <ValidationProvider class="col" name="link" rules="required" :custom-messages="errorMessages" v-slot="{ errors }">
                        <div class="col l-col">
                            <label for="link">Link do materiału</label>
                            <input class="form-control" id="link" v-model="material.link" type="text" name="link"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                        </ValidationProvider>
                        <ValidationProvider class="col" name="author" rules="required|alpha_spaces" :custom-messages="errorMessages" v-slot="{ errors }">
                        <div class="col r-col">
                            <label for="author">Autor(ka)</label>
                            <input class="form-control" id="author" v-model="material.author" type="text" name="author"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                        </ValidationProvider>
                    </div>
                    <br>
                    <div class="row">
                        <ValidationProvider class="col" name="university" rules="required|alpha_spaces" :custom-messages="errorMessages" v-slot="{ errors }">
                        <div class="col l-col">
                            <label for="university">Uniwersytet</label>
                            <input class="form-control" id="university" v-model="material.university" type="text" name="university"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                        </ValidationProvider>
                        <ValidationProvider class="col" name="email" rules="required|email" :custom-messages="errorMessages" v-slot="{ errors }">
                        <div class="col r-col">
                            <label for="email">Adres email</label>
                            <input class="form-control" id="email" v-model="material.email" type="email" name="email"/>
                            <span class="error-span">{{ errors [0]}}</span>
                        </div>
                        </ValidationProvider>
                    </div>
                    <br>
                    <div>
                        <p style="padding-bottom:20px">Data dodania: {{ getTimestamp() }}</p>
                    </div>
                    <div>
                        <button :disabled="invalid" style="padding-bottom: 7px" id="add" class="btn btn-primary" type="submit" name="add">Dodaj</button>
                    </div>
                    <br>
                </form>
            </ValidationObserver>
        </div>
        <simple-modal v-model="show.isShow" v-show="show.isShow" title="Dodano materiał">
            <template slot="body">
                <h2>Sukces!</h2>
                <p>Pomyślnie dodano materiał o nazwie: {{material.title}}</p>
                <button class="btn btn-primary" @click="show.isShow = !show.isShow">Powrót</button>
            </template>
        </simple-modal>
        <simple-modal v-model="show.isError" v-show="show.isError" title="Błąd">
            <template slot="body">
                <h2>Błąd!</h2>
                <p>Materiał o podanym tytule/odnośniku już istnieje!</p>
                <button class="btn btn-primary" @click="show.isError = !show.isError">Powrót</button>
            </template>
        </simple-modal>
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
                required: 'To pole jest wymagane',
                alpha: 'Dozwolone są tylko litery ',
                email: 'Wpisz email w poprawnym formacie',
            },
            show: {
                isShow: false,
                isError: false,
            },
        };
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
        getTimestamp() {
            return new Date().toLocaleDateString();
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
    }
    .addContent{
        text-align: center;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 20px;
        font-weight: 600;
    }

    .addContent ::selection {
        background-color:deepskyblue;
    }
</style>
