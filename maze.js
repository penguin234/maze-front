const up = 0;
const left = 1;
const down = 2;
const right = 3;


function Maze(blueprint, start, blockings, triggers) {
    this.player = [0, 0]
    this.player[0] = start.x;
    this.player[1] = start.y;

    this.size = blueprint.size;

    this.horizontal = blueprint.horizontal;
    this.vertical = blueprint.vertical;

    this.blockings = blockings;
    this.triggers = triggers;


    this.GetWall = function(position, direction) {
        if (direction === up) {
            if (this.player[1] < 1) {
                return 1;
            }
            return this.horizontal[this.player[1]-1][this.player[0]];
        }
        else if(direction === left) {
            if (this.player[0] < 1) {
                return 1;
            }
            return this.vertical[this.player[1]][this.player[0]-1];
        }
        else if(direction === down) {
            if (this.player[1] > this.size.rows - 2){
                return 1;
            }
            return this.horizontal[this.player[1]][this.player[0]];
        }
        else if(direction === right) {
            if (this.player[0] > this.size.cols - 2){
                return 1;
            }
            return this.vertical[this.player[1]][this.player[0]];
        }
    }

    this.Move = function(direction) {
        let wall = this.GetWall(this.player, direction);

        if (this.blockings[wall]) {
            return false;
        }

        if (direction === up) {
            this.player[1]--;
        }
        else if(direction === left) {
            this.player[0]--;
        }
        else if(direction === down) {
            this.player[1]++;
        }
        else if(direction === right) {
            this.player[0]++;
        }

        if (this.blockings[2]) {
            this.blockings[2] = false;
            this.blockings[3] = true;
        }
        else {
            this.blockings[2] = true;
            this.blockings[3] = false;
        }

        this.render();
    }
}


blockings = [false, true, true, false];


Vue.component('maze', {
    template: '#maze-template',
    data: function() {
        return {
            meta: {
                tilesize: 50,
                wallshort: 20,
            },
            size: {
                rows: 5,
                cols: 5,
            },
            walls: {
                vertical: [[]],
                horizontal: [[]],
            },
    
            blockings: [],
            blockingsOld: [],
            walltypes: [],
    
            wallstyle: ['', '', 'wall-temp', 'wall-temp'],
    
            player: [0, 0],
            playerX: 0,
            playerY: 0,
    
            canInput: true,
            canMove: true,
            anim: null,
            raise: 0,
            fall: 1,
        };
    },
    computed: {
        width: function() {
            let tot = this.size.rows * this.meta.tilesize;
            tot += (this.size.rows + 1) * this.meta.wallshort;
            return tot;
        },
        height: function() {
            let tot = this.size.cols * this.meta.tilesize;
            tot += (this.size.cols + 1) * this.meta.wallshort;
            return tot;
        },
        viewbox: function() {
            return '0 0 ' + this.width + ' ' + this.height;
        },
        wallstats: function() {
            return [0, this.raise, this.fall, 1];
        }
    },
    props: [
        'virtual',
    ],
    watch: {
        player: function(newPosition) {
            this.anim.to(this.$data, { playerX: newPosition[0], duration: 1 });
            this.anim.to(this.$data, { playerY: newPosition[1], duration: 1 }, "<");
        },
        blockings: function(newData) {
            oldData = this.blockingsOld;

            for (let i = 0; i < this.walltypes.length; i++) {
                this.walltypes[i] = (oldData[i] ? 2 : 0) + (newData[i] ? 1 : 0);
                oldData[i] = newData[i];
            }

            this.raise = 0;
            this.fall = 1;

            this.anim.to(this.$data, { raise: 1, duration: 1 }, ">");
            this.anim.to(this.$data, { fall: 0, duration: 1 }, "<");
        },

        virtual: function(val) {
            this.apply(val);
        },
    },
    created: function() {
        if (this.virtual) {
            this.apply(this.virtual);
        }
    },
    methods: {  
        apply: function(val) {
            this.walls.vertical = val.vertical;
            this.walls.horizontal = val.horizontal;

            this.blockings = val.blockings;
            this.blockingsOld = val.blockings.slice();
            this.walltypes = val.blockings.map(x => x ? 3 : 0);

            this.player = val.player;
            this.playerX = this.player[0];
            this.playerY = this.player[1];

            val.render = this.render;

            this.anim = gsap.timeline({ paused: true, onComplete: () => { this.canMove = true; }});
        },

        render: function() {
            this.anim = gsap.timeline({ paused: true, onComplete: () => { this.canMove = true; }});

            this.player.splice(0,0);
            this.blockings.splice(0,0);

            this.anim.resume();

            this.canMove = false
        },

        move: function(direction) {
            if (this.canInput && this.canMove) {
                this.canInput = false;
                this.virtual.Move(direction);
                this.canInput = true;
            }
        },
    }
});