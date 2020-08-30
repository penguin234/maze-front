function LoadBlueprint(blueprint_id) {
    return fetch(origin+'blueprint/'+blueprint_id.toString()+'/').
        then((res) => {
            return res.json();
        });
}

function LoadLevel(id) {
    return fetch(origin+'level/'+id.toString()+'/').
        then((res) => {
            return res.json();
        });
}


app.setstage(1);