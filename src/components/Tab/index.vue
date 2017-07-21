<script>
    export default {
        props: {
            indexTab: {
                type: String
            }
        },
        created() {
            this.tabs = this.$children;
        },
        mounted(){

            if(this.tabs.length) {
                this.indexTab ? this.selectTab(this.indexTab) : this.selectTab(this.tabs[0].tabHash);
            }
        },
        watch: {
            'indexTab'() {
                if(this.tabs.length) {
                    this.indexTab ? this.selectTab(this.indexTab) : this.selectTab(this.tabs[0].tabHash);
                }
            }
        },
        data() {
            return {
                tabs: [],
                activeHash: ''
            }
        },
        methods: {
            selectTab(hash){

                this.tabs.forEach((tab) => {
                    tab.isActive = (tab.tabHash === hash);
                });
                this.activeHash = hash;
            }
        }
    }
</script>

<template>
    <div class="tabs-container">
        <ul class="tabs-list" role="tablist">
            <li v-for="tab in tabs" class="tabs-title" :style="{width: (100 / tabs.length) + '%', fontSize: tab.fontSize, height: tab.tabHeight}">
                <a
                    :class="activeHash === tab.tabHash ? 'active' : ''"
                    class="tabs-titleLink"
                    @click="selectTab(tab.tabHash)">
                    {{ tab.tabHeader }}
                </a>
            </li>
        </ul>

        <div class="tabs-panel">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "~commonscss";

    .tabs-container {
        .tabs-list {
            position: relative;
            overflow: hidden;
        }
        .tabs-title {
            position: relative;
            float: left;
            width: 50%;
            height: rem(90);
            line-height: rem(90);
            text-align: center;
            font-size: rem(36);
            &:after {
                content: '';
                display: block;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                width: rem(3);
                height: rem(36);
                background: #e6e6e6;
            }
            &:last-child:after {
                display: none;
            }
            .tabs-titleLink {
                display: block;
                width: 100%;
                position: relative;
                color: #999;
                &:hover {
                    text-decoration: none;
                    color: #000;
                }
                &:focus {
                    outline: none;
                }
                &.active {
                    color: #000;
                }
                &:after {
                    content: '';
                    display: none;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: rem(128);
                    height: rem(8);
                    background: #fdde02;
                }
                &.active:after {
                    display: block;
                }
            }
        }
    }
    .tabs-panel {
        display: flex;
        flex-direction: row;
    }
</style>
