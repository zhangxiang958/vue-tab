<script>
    import Util from './util.js';

    export default {
        props: {
            MIN_COLUMN: {
                type: Number,
                default: 2,
                validator: function(value){
                    return value >= 2;
                }
            },
            GAP_WIDTH: {
                type: Number,
                default: 5,
                validator: function(value){
                    return value >= 0;
                }
            },
            GAP_HEIGHT: {
                type: Number,
                default: 15,
                validator: function(value){
                    return value >= 0;
                }
            },
            COLWIDTH: {
                type: Number,
                default: 180,
                validator: function(value){
                    return value >= 0;
                }
            },
            DATALIST: {
                type: Array,
                default: function(){
                    return []
                }
            }
        },
        watch: {
            DATALIST: function(newVal){

                this.$nextTick(() => {
                    
                    let cells = this.$el.querySelector('.cellready');
                    // console.log(cells);
                    cells.length ? (cells = Array.prototype.slice.call(cells, 0)) : (cells = [cells]);

                    this.adjustCells(cells);
                });
            }
        },
        data() {
            return {
                columnTop: [],
                col_width: this.COLWIDTH,
                waterfallWrapper: null,
                colContainer: null
            }
        },
        created() {
            console.log('water created');         
        },
        mounted() {
            console.log('water mounted');
            this.init();
            window.addEventListener('resize', () => {
                
                this.$nextTick(() => {
                    this.init();
                });
            });
        },
        methods: {
            init() {
                /** get the container and save */
                this.waterfallWrapper = document.querySelector("#waterfall");
                this.colContainer = document.querySelector('#waterfall-container');
                /** caculate the col amount */
                let colAmount = this.getColAmount();
                /** according to colAmount to setup the array which remember the height of every col */
                this.markColumnTop(colAmount);
                /** adjust the cells */
                this.manageCell();
            },
            getColAmount(){
                let body = document.body;
                let bodyWidth = body.offsetWidth;
                console.log(bodyWidth);
                let GapWidth = this.GAP_WIDTH;
                let colWidth = this.COLWIDTH;

                console.log(Math.max(
                    this.MIN_COLUMN, 
                    Math.floor( (bodyWidth + GapWidth) / (colWidth + GapWidth) )
                    )
                );
                console.log(Math.floor( (bodyWidth + GapWidth) / (colWidth + GapWidth) ));
                return Math.max(
                    this.MIN_COLUMN, 
                    Math.floor( (bodyWidth + GapWidth) / (colWidth + GapWidth) )
                    );
            },
            markColumnTop(colAmount) {
                
                //set a array for every column to mark the top, so we can know which column's height is smallest
                this.columnTop = [];
                for(var i = 0; i < colAmount; i++) {
                    
                    this.columnTop.push(0);
                }

                //init the comtainer width
                let wrapperWidth = document.body.offsetWidth;
                let colContainerWidth = colAmount * (this.COLWIDTH + this.GAP_WIDTH) - this.GAP_WIDTH;
                console.log(colContainerWidth);
                this.waterfallWrapper.style.cssText = `width: ${wrapperWidth}px;`;
                if(wrapperWidth >= colContainerWidth) {

                    this.colContainer.style.cssText = `width: ${colContainerWidth}px;`;
                } else {

                    this.col_width = Math.floor(
                                    ( wrapperWidth - 
                                    (this.GAP_WIDTH * (colAmount - 1) ) 
                                    ) 
                                    / 
                                    colAmount);
                    console.log(this.col_width);
                    let colContainerWidth = colAmount * (this.col_width + this.GAP_WIDTH) - this.GAP_WIDTH;
                    console.log(colContainerWidth);
                    this.colContainer.style.cssText = `width: ${colContainerWidth}px;`;
                }

            },
            manageCell(){

                let minColHeight = Util.getMinVal(this.columnTop);
                console.log(minColHeight);
                let children = Array.prototype.slice.call(this.colContainer.children);
                this.adjustCells(children);
            },
            adjustCells(units){
                let columnTop = this.columnTop;
                let colWidth;
                if(this.col_width === this.COLWIDTH) {

                    colWidth = this.COLWIDTH;
                } else {
                    console.warn('已根据屏幕宽度适配单元格宽度.');
                    colWidth = this.col_width;
                }

                // console.log(units);
                units.forEach((unit, i) => {

                    let colInfo = Util.getMinVal(columnTop),
                        colMinIndex = colInfo.index,
                        colMinHeight = colInfo.minHeight;
                    
                    let height = unit.offsetHeight,
                    left = colMinIndex * (colWidth + this.GAP_WIDTH),
                    top = colMinHeight === 0 ? colMinHeight : colMinHeight + this.GAP_HEIGHT;

                    unit.style.cssText = `width: ${colWidth}px;
                                        left: ${left}px;
                                        top: ${top}px`;
                    
                    unit.className = unit.className.replace(/\bcellready\b/, '');
                    columnTop[colMinIndex] = colMinHeight === 0 ? colMinHeight + unit.offsetHeight : colMinHeight + unit.offsetHeight + this.GAP_HEIGHT;
                    // console.log(columnTop);
                });

                let maxHeightVal = Util.getMaxVal(columnTop).maxHeight;
                this.waterfallWrapper.style.cssText += `height: ${maxHeightVal}px;`;
                this.colContainer.style.cssText += `height: ${maxHeightVal}px;`;
            }
        }
    }
</script>

<template>
    <section id="waterfall">
        <section class="waterfall-container" id="waterfall-container">
            <div class="waterfall-unit cellready" v-for="(item, index) in DATALIST" :key="item" :index="index" >
                <slot :item="item" :index="index" :width="col_width">
                    loading.....
                </slot>
            </div>
        </section>
    </section>
</template>

<style scoped>
    #waterfall {
        width: 100%;
        overflow-x: hidden;
    }
    .waterfall-container {
        position: relative;
        margin: 0 auto;
        overflow: hidden;
        zoom: 1;
    }
    .waterfall-unit {
        position: absolute;
    }
    .cellready {
        display: none;
    }
</style>