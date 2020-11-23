maze_component_template = `
<div tabindex="0"
    v-on:keydown.up="move(0)"
    v-on:keydown.left="move(1)"
    v-on:keydown.down="move(2)"
    v-on:keydown.right="move(3)"
    v-focus>

    <svg :width="400" :height="400" :view-box.camel="viewbox">
        <template v-for="r in (size.rows+1)">
            <rect v-for="c in (size.cols+1)"
                :width="meta.wallshort"
                :height="meta.wallshort"
                :x="(meta.wallshort+meta.tilesize)*(c-1)"
                :y="(meta.wallshort+meta.tilesize)*(r-1)"></rect>
        </template>


        <template v-for="(line, r) in walls.horizontal">
            <rect v-for="(cell, c) in line"
                :class="wallstyle[cell]"
                fill="black"
                :fill-opacity="wallstats[walltypes[cell]]"
                :width="meta.tilesize"
                            :height="meta.wallshort"
                            :x="meta.wallshort+(meta.wallshort+meta.tilesize)*c"
                            :y="(meta.wallshort+meta.tilesize)*(r+1)"></rect>
                    </template>

                    <template v-for="(line, r) in walls.vertical">
                        <rect v-for="(cell, c) in line"
                            :class="wallstyle[cell]"
                            fill="black"
                            :fill-opacity="wallstats[walltypes[cell]]"
                            :width="meta.wallshort"
                            :height="meta.tilesize"
                            :x="(meta.wallshort+meta.tilesize)*(c+1)"
                            :y="meta.wallshort+(meta.wallshort+meta.tilesize)*r"></rect>
                    </template>


                    <rect :width="meta.wallshort"
                        :height="meta.wallshort+(meta.wallshort+meta.tilesize)*size.rows"
                        :x="0"
                        :y="0"></rect>

                    <rect :width="meta.wallshort"
                        :height="meta.wallshort+(meta.wallshort+meta.tilesize)*size.rows"
                        :x="(meta.tilesize+meta.wallshort)*size.cols"
                        :y="0"></rect>

                    <rect :width="meta.wallshort+(meta.wallshort+meta.tilesize)*size.cols"
                        :height="meta.wallshort"
                        :x="0"
                        :y="0"></rect>

                    <rect :width="meta.wallshort+(meta.wallshort+meta.tilesize)*size.cols"
                        :height="meta.wallshort"
                        :x="0"
                        :y="(meta.tilesize+meta.wallshort)*size.rows"></rect>


                    <circle :r="meta.tilesize*0.3"
                        :cx="(meta.wallshort+meta.tilesize)*playerX+meta.wallshort+meta.tilesize*0.5"
                        :cy="(meta.wallshort+meta.tilesize)*playerY+meta.wallshort+meta.tilesize*0.5"></circle>

                    <circle :r="meta.tilesize*0.4"
                        fill="gold"
                        opacity="0.5"
                        :cx="(meta.wallshort+meta.tilesize)*end[0]+meta.wallshort+meta.tilesize*0.5"
                        :cy="(meta.wallshort+meta.tilesize)*end[1]+meta.wallshort+meta.tilesize*0.5"></circle>
                </svg>

                <div>
                    <button v-on:click="move(0)">UP</button>
                    <button v-on:click="move(1)">LEFT</button>
                    <button v-on:click="move(2)">DOWN</button>
                    <button v-on:click="move(3)">RIGHT</button>
                </div>
            </div>
            `