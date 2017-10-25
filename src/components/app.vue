<script>
    // import VueRouter  from 'vendor/vue-router';
    // import { Tabs, Tab }  from './Tab';

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
        methods: {
            test(idx){
                console.log(idx);
            }
        },
        components: {
            // Tabs, Tab
        }
    }
</script>

<template>
    <div class="app">
        <Tabs indexTab="convince" @changePage="test">
            <TabPanel label="好友榜" hash="friend" fontsize="36" tabheight="90" color="red">
                <div class="first"></div>
            </TabPanel>
            <TabPanel label="全省榜" hash="convince" fontsize="36" tabheight="90" color="red">
                <div class="second"></div>
            </TabPanel>
            <TabPanel label="全国榜" hash="country" fontsize="36" tabheight="90" color="red">
                <div class="three"></div>
            </TabPanel>
        </Tabs>
    </div>
</template>

<style lang="scss">
    $font_size : 75;

    @function rem($pixels){
        @return $pixels / $font_size + rem;
    }

    .first {
        height: 5800px;
        background: yellow;
    }
    .second {
        height: 9500px;
        background: red;
    }
    .three {
        height: 800px;
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
