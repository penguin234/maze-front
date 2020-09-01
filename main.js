let app = new Vue({
    el: '#app',
    data: {
        maze: null,
        stage_id: 0,
        instage: true,
    },
    methods: {
        apply: function(maze) {
            this.maze = maze;
        },
        setstage: function(id) {
            this.stage_id = id;
        },
        setlevel: function(id) {
            LoadLevel(id).then((res) => {
                this.instage = false;

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