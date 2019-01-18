# Client Side OBJ loader

I just merged two snippets from this two links:

https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers

and


https://codepen.io/shahrin14/pen/VzvPdB?editors=1010




# Download the demo and test it!!!


***

### Create an input

          <input type="file" onchange="onChooseFile(event, onFileLoad.bind(this))"/>
          
### To add the 3d Model in the scene

    function onFileLoad(event) {
        let modelData = event.target.result;

        let objLoader = new THREE.OBJLoader();

        let geometry = objLoader.parse(modelData);
        geometry.position.set(0, 0, 0);
        scene.add(geometry);
    }

    function onChooseFile(event, onLoadFileHandler) {
        if (typeof window.FileReader !== "function"){
            throw "The file API isn't supported on this browser.";
        }
        let input = event.target;
        if (!input){
            throw "The browser does not properly implement the event object";
        }
        if (!input.files){
            throw "This browser does not support the `files` property of the file input.";
        }
        if (!input.files[0]){ 
            return undefined;
        }
        let file = input.files[0];
        let fr = new FileReader();
        fr.onload = onLoadFileHandler;
        fr.readAsText(file);
    }

