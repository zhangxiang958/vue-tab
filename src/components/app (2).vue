<script>
    // import VueRouter  from 'vendor/vue-router';
    import Banner     from './Banner/index.vue';
    import Tabs       from './Tab/index.vue';
    import Tab        from './Tab/tab.vue';

    export default {
        created(){

        },
        mounted(){

        },
        data(){
            return {
                edition: window.edition
            }
        },
        components: {
          Banner, Tabs, Tab
        }
    }
</script>

<template>
    <div class="app">
        <Banner />
        <Tabs>
            <Tab name="好友榜" hash="friend" fontsize="36" tabheight="90">
                <div class="first"></div>
            </Tab>
            <Tab name="全省榜" hash="convince" fontsize="36" tabheight="90">
                <div class="second"></div>
            </Tab>
            <Tab name="全国榜" hash="country" fontsize="36" tabheight="90">
                <div class="three"></div>
            </Tab>
        </Tabs>
    </div>
</template>

<style lang="scss">
    @import "~commonscss";
    @import "~css/main.scss";

    .first {
        height: 500px;
        background: yellow;
    }
    .second {
        height: 500px;
        background: red;
    }
    .three {
        height: 500px;
        background: blue;
    }

    .app-message {
        padding-top: rem(60);
        padding-bottom: rem(180);
        text-align: center;
        color: #888;
        background: #f5f5f5;
    }
    [data-dpr="3"] div.legoToast{
        transform: scale(3) translate(-20%,-50%);
    }
    [data-dpr="2"] div.legoToast{
        transform: scale(2) translate(-25%,-50%);
    }
    div.shenquvideo-dimensions{
        height: 100%;
    }
    body{

    }
</style>
