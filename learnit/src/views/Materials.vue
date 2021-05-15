<template>
     <div class="materials">
        <md-table v-model="materials" md-sort="name" md-sort-order="asc" md-card @md-selected="onSelect">
         <md-table-toolbar>
            <h1 class="md-title">Materiały</h1>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
            <md-table-cell md-label="Nazwa" md-sort-by="title" class="tableRow">{{ item.title }}</md-table-cell>
            <md-table-cell md-label="Kategoria" md-sort-by="category" class="tableRow">{{ item.category }}</md-table-cell>
            <md-table-cell md-label="Słowa klucze" md-sort-by="keyWords" class="tableRow">{{ item.keyWords }}</md-table-cell>
            <md-table-cell md-label="Autor" md-sort-by="author" class="tableRow">{{ item.author | formatDate }}</md-table-cell>
            <md-table-cell md-label="Data" md-sort-by="date" class="tableRow">{{ item.date }}</md-table-cell>
      </md-table-row>
    </md-table>
    <div>
        {{ selected }}
    </div>
  </div>
</template>
<!-- <p>{{material.description}}</p> -->
<!-- <p>{{material.link}}</p> -->
<!-- <p>{{material.university}}</p>
<p>{{material.email}}</p> -->

<script>
export default {
    name: 'app',
    data() {
        return {
            selected: {},
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
     methods: {
      getClass: ({ id }) => ({
        'md-primary': id === 2,
        'md-accent': id === 3,
      }),
      onSelect(item) {
        this.selected = item;
      },
    },
};
</script>

<style lang="scss" scoped>
    .materials {
        padding: 5px;
    }
    .md-title{
        text-transform: uppercase;
        font-weight: 600;
    }
    .tableRow{
        text-align: left;
    }
</style>
