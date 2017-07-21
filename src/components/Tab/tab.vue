<script>
    export default {
        props: {
            name: {
                required: true
            },
            hash: {
                required: true
            },
            fontsize: {
                type: String
            },
            tabheight: {
                type: String
            },
            frontIcon: {
                type: String,
                default: ''
            },
            postIcon: {
                type: String,
                default: ''
            },
            RedDot: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isActive: false,
            }
        },
        computed: {
            tabHeader() {
                return this.frontIcon + this.name + this.postIcon + this.RedDot;
            },
            tabHash() {
                return `#${this.hash.toLowerCase()}`;
            },
            fontSize() {
                return (parseInt(this.fontsize) / 75) + 'rem';
            },
            tabHeight() {
                return (parseInt(this.tabheight) / 75) + 'rem';
            }
        },
        methods: {
            onTouchStart(event) {

            },
            onTouchmove(event) {
                // console.log(event);
                const touch = event.touches[0];
                console.log(touch);
                let content = document.querySelector('.tabs-panel');
                // touch.target.nextElementSibling.style.cssText = `transform: translate3d(${touch.pageX}px, 0, 0);`;
            },
            onTouchEnd(event) {


            }
        }
    }
</script>

<template>
    <div class="tabs-panel-content" v-on:touchmove="onTouchmove($event)">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .tabs-panel-content {
        flex-shrink: 0;
        width: 100%;
        overflow-x: hidden;
    }
</style>
