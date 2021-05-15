<template>
     <div class="materials">
         <md-table-toolbar>
            <h1 class="md-title">Materiały</h1>
        </md-table-toolbar>
        <md-table v-model="materials" md-sort="id" md-sort-order="asc" md-card @md-selected="onSelect" class="mdTable">
        <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
            <md-table-cell md-label="NAZWA" md-sort-by="title" class="tableCell">{{ item.title }}</md-table-cell>
            <md-table-cell md-label="KATEGORIA" md-sort-by="category" class="tableCell">{{ item.category }}</md-table-cell>
            <md-table-cell md-label="SŁOWA KLUCZE" md-sort-by="keyWords" class="tableCell">{{ item.keyWords }}</md-table-cell>
            <md-table-cell md-label="AUTOR" md-sort-by="author" class="tableCell">{{ item.author }}</md-table-cell>
            <md-table-cell md-label="DATA" md-sort-by="date" class="tableCell">{{ item.date  | formatDate }}</md-table-cell>
            <md-table-cell><img alt="edit" src="../assets/edit.svg" class="rowIcon"></md-table-cell>
            <md-table-cell><img alt="trash" src="../assets/trash.svg" class="rowIcon"></md-table-cell>
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
            selected: null,
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

<style scoped>
    .materials {
        padding: 5px;
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
        height: 25px;
        width: 25px;
    }
    .materials ::selection {
        background-color:deepskyblue;
    }
</style>
