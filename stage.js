function LoadStage(id) {
    return fetch(origin+'stage/'+id.toString()+'/').
        then((res) => {
            return res.json();
        });
}

Vue.component('stage', {
    template: '#stage-template',
    data: function() {
        return {
            title: '',
            levels: [],
        }
    },
    props: [
        'stage_id',
    ],
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