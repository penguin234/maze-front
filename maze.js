const up = 0;
const left = 1;
const down = 2;
const right = 3;


function Maze(blueprint, blockings, triggers) {
    this.player = [0, 0]
    this.player[0] = triggers.start[0];
    this.player[1] = triggers.start[1];

    this.size = blueprint.size;

    this.horizontal = blueprint.horizontal;
    this.vertical = blueprint.vertical;

    this.blockings = blockings;
    this.triggers = triggers;


    this.GetWall = function(position, direction) {
        if (direction === up) {
            if (position[1] < 1) {
                return 1;
            }
            return this.horizontal[position[1]-1][position[0]];
        }
        else if(direction === left) {
            if (position[0] < 1) {
                return 1;
            }
            return this.vertical[position[1]][position[0]-1];
        }
        else if(direction === down) {
            if (position[1] > this.size.rows - 2){
                return 1;
            }
            return this.horizontal[position[1]][position[0]];
        }
        else if(direction === right) {
            if (position[0] > this.size.cols - 2){
                return 1;
            }
            return this.vertical[position[1]][position[0]];
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