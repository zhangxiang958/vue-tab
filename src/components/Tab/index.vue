<script>
    const INIT = 0;
    const SCROLL = 1;
    const SWIPE = 2;
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
                activeHash: '',
                touchPoint: {
                    startLeft: 0,
                    startTop: 0,
                    startTime: 0
                },
                distance: {
                    left: 0,
                    top: 0
                },
                currentPage: 0,
                translateX: 0,
                startTranslateX: 0,
                swipeType: INIT
            }
        },
        methods: {
            selectTab(hash){

                this.tabs.forEach((tab) => {
                    tab.isActive = (tab.tabHash === hash);
                });
                this.activeHash = hash;
            },
            next() {
                let currentpage = this.currentPage;
                (currentpage < this.tabs.length - 1) && currentpage++;
                console.log('next, currentpage: ' + currentpage);
                this.setPage(currentpage);
            },
            prev() {
                let currentpage = this.currentPage;
                (currentpage > 0) && currentpage--;
                console.log('prev, currentpage: ' + currentpage);
                this.setPage(currentpage);
            },
            reset() {
                this.setPage(this.currentPage);
            },
            setPage(page) {
                console.log('set');
                const prevPage = this.currentPage;
                this.currentPage = page;

                this.translateX = -this.tabs.reduce(function(total, item, i){

                    return i > page - 1 ? total : total + item.$el['clientWidth'];
                }, 0);
                this.selectTab(this.tabs[page].tabHash);
            },
            onTouchStart(event) {
                const touchPoint = event.changedTouches[0] || event.touches[0];

                const startLeft = touchPoint.pageX;
                console.log('left:' + startLeft);
                this.touchPoint.startLeft = startLeft;

                const startTop = touchPoint.pageY;
                console.log('top:' + startTop);
                this.touchPoint.startTop = startTop;

                const startTranslateX = this.translateX;
                this.startTranslateX = startTranslateX;

                const touchTime = new Date().getTime();
                console.log('time:' + touchTime);
                this.touchPoint.startTime = touchTime;
            },
            onTouchMove(event) {
                const touchPoint = event.changedTouches[0] || event.touches[0];
                const distanceLeft = touchPoint.pageX - this.touchPoint.startLeft;
                // console.log('distance:' + distanceLeft);
                this.distance.left = distanceLeft;
                const distanceTop = Math.abs(touchPoint.pageY - this.touchPoint.startTop);
                // console.log('distanceTop:' + distanceTop);
                this.distance.top = distanceTop;

                switch(this.swipeType) {
                    case INIT:
                        if(Math.abs(distanceLeft) / distanceTop > 1.5) {
                            event.preventDefault();
                            event.stopPropagation();
                            this.swipeType = SWIPE;
                        } else {
                            this.swipeType = SCROLL;
                        }
                        break;
                    case SCROLL:
                        break;
                    case SWIPE:
                        this.translateX = this.startTranslateX + distanceLeft;
                        break;
                }
            },
            onTouchEnd(event) {

                if(this.distance.left < -100) {
                    this.next();
                } else if(this.distance.left > 100) {
                    this.prev();
                } else {
                    this.reset();
                }
                this.swipeType = INIT;
            }
        }
    }
</script>

<template>
    <div class="tabs-container">
        <ul class="tabs-list" role="tablist">
            <li v-for="(tab,index) in tabs" class="tabs-title" :style="{width: (100 / tabs.length) + '%', fontSize: tab.fontSize, height: tab.tabHeight}">
                <a
                    :class="activeHash === tab.tabHash ? 'active' : ''"
                    class="tabs-titleLink"
                    @click="setPage(index)">
                    {{ tab.tabHeader }}
                </a>
            </li>
        </ul>

        <div class="tabContent-wrap"
            @touchstart="onTouchStart($event)"
            @touchmove="onTouchMove($event)"
            @touchend="onTouchEnd($event)"
            >
            <div class="tabs-panel"
            :style="{ 'transform': `translate3d(${translateX}px, 0, 0)` }"
            >
                <slot />
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    @import "~commonscss";

    .tabs-container {
        width: 100%;
        .tabs-panel {
            width: 100%;
            height: 100%;
            font-size: 0;
            white-space: nowrap;
            transition: all 0.2s ease;
            .tabs-panel-content {
                display: inline-block;
                width: 100%;
                font-size: rem(12);
                vertical-align: top;
            }
        }
        .tabContent-wrap {
            width: 100%;
            overflow: hidden;
        }
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
</style>
