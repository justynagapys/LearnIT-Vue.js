<template>
    <div class="sidebar">
        <div class="number">
            Liczba materiałów: 50
        </div>
        <div class="menu-items">
            <router-link to="/" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Strona główna
                </div>
            </router-link>
            <router-link to="/materialy" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Materiały
                </div>
            </router-link>
            <router-link to="/dodaj" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    Dodaj materiał
                </div>
            </router-link>
        </div>
        <div class="logo">
            <img alt="LearnIT logo" src="../assets/logo.png">
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
    .number {
        color: white;
        font-size: 24px;
        margin-top: 30px;
    }

    .logo{
        position: absolute;
        bottom: 20px;
        left: 45px;
    }

    .menu-items {
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        margin-left: 6px;
    }

    .menu-items > * {
        margin-top:60px;
    }

    .sidebar ::selection {
        background-color: deepskyblue;
    }

    .side-btn:focus {
        outline: none;
    }

    .side-btn.active {
        position:relative;
        background-color: white;
        color: rgb(18, 55, 82);
        font-weight: 600;
        margin-left:10px;
        border-radius: 30px 0 0 30px;
    }

    .side-btn.active::before{
        position: absolute;
        content: "";
        top: -30px;
        right: 0;
        height: 30px;
        width: 30px;
        background-color: white;
    }

    .side-btn.active::after{
        position: absolute;
        content: "";
        bottom: -30px;
        right: 0;
        height: 30px;
        width: 30px;
        background-color: white;
    }

    .side-btn {
        border: none;
        padding: 16px 0px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        color: white;
        background-color: transparent;
    }

    .side-btn.active .link-container::before {
        position: absolute;
        top: -60px;
        right: 0;
        content:"";
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: rgb(18, 55, 82);
    }

    .side-btn.active .link-container::after {
        position: absolute;
        bottom: -60px;
        right: 0;
        content:"";
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: rgb(18, 55, 82);
        z-index: 99;
    }
</style>
