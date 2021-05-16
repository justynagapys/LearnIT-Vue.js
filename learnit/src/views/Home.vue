<template>
    <div class="home">
        <p>Strona główna</p>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
    .home{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 40px;
        color: rgb(167,167,167);
        font-weight: 600;
    }

    .home ::selection {
        background-color:deepskyblue;
    }
</style>
