stage_component_template = `
<div>
    <h1> {{ title }} </h1>
    <button v-for="level in levels" v-on:click="select(level.id)">
        {{ level.levelno }}
    </button>
</div>`