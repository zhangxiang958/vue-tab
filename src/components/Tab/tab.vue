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
    }
</script>

<template>
    <div class="tabs-panel-content">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .tabs-panel-content {
        width: 100%;
    }
</style>
