Vue.component('stage', {
    template: stage_component_template,
    data: function() {
        return {
            title: '',
            levels: [],
        }
    },
    props: [
        'stage_id',
    ],
    created: function() {
        if (this.stage_id) {
            LoadStage(this.stage_id).then((res) => {
                this.title = res.title;
                this.levels = res.levels;
            });
        }
    },
    watch: {
        stage_id: function (id) {
            LoadStage(id).then((res) => {
                this.title = res.title;
                this.levels = res.levels;
            });
        },
    },
    methods: {
        select: function (id) {
            this.$emit('level-selected', id);
        },
    }
})