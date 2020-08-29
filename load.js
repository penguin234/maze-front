let origin = 'http://127.0.0.1:8000/'

function LoadBlueprint(blueprint_id) {
    return fetch(origin+'blueprint/'+blueprint_id.toString()+'/').
        then((res) => {
            return res.json();
        });
}


LoadBlueprint(1).
    then((res) => {
        alert(res.title);

        maze.build({
            size: res.size,
            vertical: res.vertical,
            horizontal: res.horizontal,
        });
    });