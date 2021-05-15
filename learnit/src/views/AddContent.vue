<template>
    <div class="addContent">
        <p>DODAJ MATERIAŁ</p>
        <p>Data dodania:{{ getTimestamp() }}</p>
        <div>
            <form v-on:submit.prevent="addContent">
                <div class="form-group">
                    <label for="title">Tytuł</label>
                    <input class="form-control" id="title" v-model="material.title" type="text" name="title"/>
                </div>
                <div class="form-group">
                    <h5>Kategoria</h5>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" v-model="material.category" id="programming" name="programming" value="Programowanie">
                        <label for="programming">Programowanie</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" v-model="material.category" id="analysis" name="analysis" value="Analiza danych">
                        <label for="analysis">Analiza danych</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" v-model="material.category" id="network" name="network" value="Sieci">
                        <label for="network">Sieci</label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="keywords">Słowa klucze</label>
                    <textarea class="form-control" id="keywords" v-model="material.keyWords" name="keywords" rows="2" cols="50"></textarea>
                </div>
                <div class="form-group">
                    <label for="description">Opis</label>
                    <textarea class="form-control" id="description" v-model="material.description" name="description" rows="4" cols="50"></textarea>
                </div>
                <div class="form-group">
                    <label for="link">Link do materiału</label>
                    <input class="form-control" id="link" v-model="material.link" type="text" name="link"/>
                </div>
                <div class="form-group">
                    <label for="author">Autor(ka)</label>
                    <input class="form-control" id="author" v-model="material.author" type="text" name="author"/>
                </div>
                <div class="form-group">
                    <label for="university">Uniwersytet</label>
                    <input class="form-control" id="university" v-model="material.university" type="text" name="university"/>
                </div>
                <div class="form-group">
                    <label for="email">Adres email</label>
                    <input class="form-control" id="email" v-model="material.email" type="email" name="email"/>
                </div>
                <div class="form-group">
                    <button @click="isShow = !isShow" id="add" class="btn btn-primary" type="submit" name="add">Dodaj</button>
                </div>
            </form>
        </div>
        <simple-modal v-model="isShow" title="Dodano materiał">
            <template slot="body">
                <h2>Sukces!</h2>
                <p>Pomyślnie dodano materiał!</p>
            </template>
            <template slot="footer">
                <button>OK</button>
            </template>
        </simple-modal>
    </div>
</template>

<script>
import axios from 'axios';
import SimpleModal from 'simple-modal-vue';

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
            isShow: false,
        };
    },
    methods: {
        addContent() {
            axios.post('https://localhost:44304/learn-it/materialy/dodaj-material', this.material)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
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
    .addContent{
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 20px;
        color: rgb(167,167,167);
        font-weight: 600;
    }
</style>
