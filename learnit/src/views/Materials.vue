<template>
    <div  class="materials">
        <div v-for="material in materials" :key="material.id">
            <p>{{material.title}}</p>
            <p>{{material.category}}</p>
            <p>{{material.keyWords}}</p>
            <p>{{material.description}}</p>
            <p>{{material.link}}</p>
            <p>{{material.date}}</p>
            <p>{{material.author}}</p>
            <p>{{material.university}}</p>
            <p>{{material.email}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            materials: [],
        };
    },
    async created() {
        const baseURI = 'https://localhost:44304/learn-it/materialy/wszystko';
        this.$http.get(baseURI)
        .then((result) => {
            this.materials = result.data;
        });
    },
};
</script>

<style scoped>
    .materials {
        display: flex; /*coś tutaj trzeba zmienic z tym */
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 10px;
        color: rgb(167,167,167);
        font-weight: 600;
    }
</style>
