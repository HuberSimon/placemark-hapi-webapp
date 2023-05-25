export let edit = false;

export function editDeatils () {
    if(edit === false) {
        edit = true;
    }
    else{
        edit = false;
    }
    console.log("hallo")
    return edit;
  };

