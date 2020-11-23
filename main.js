let app = new Vue({
    el: '#app',
    data: {
        maze: null,
        stage_id: 1,
        status: 'stage',
    },
    methods: {
        apply: function(maze) {
            this.maze = maze;
        },
        setstage: function(id) {
            this.status = 'stage';
            this.stage_id = id;
        },
        setlevel: function(id) {
            LoadLevel(id).then((res) => {
                this.status = 'level';

                let maze = new Maze({
                    size: res.size,
                    vertical: res.vertical,
                    horizontal: res.horizontal,
                },
                blockings,
                res.triggers);

                this.apply(maze);
            });
        },
    },
});