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
  
        let pos = new THREE.Vector3(0,0,5);
        
        //scene.add(geometry);
        console.log(geometry);
  
        if (geometry.children.length > 0) {
            for (let i = 0; i < geometry.children.length; i++) {
               let obj = new THREE.Mesh(
                  geometry.children[i].geometry,
                  geometry.children[i].material
                );
                obj.position.copy(pos);
                scene.add(obj);

                objects.push(obj);
            }
       } else {
           let obj = new THREE.Mesh(geometry.geometry, geometry.material);
           obj.position.copy(pos);
           scene.add(obj);

          objects.push(obj);
      }
    }

    function onChooseFile(event, onLoadFileHandler) {
           if (typeof window.FileReader !== "function")
            throw "The file API isn't supported on this browser.";
          
           let input = event.target;
          
           if (!input) throw 
            "The browser does not properly implement the event object";
           
           if (!input.files)
            throw "This browser does not support the `files` property of the file input.";
           
           if (!input.files[0]) 
            return undefined;
           
           let file = input.files[0];
           let fr = new FileReader();
           fr.onload = onLoadFileHandler;
           fr.readAsText(file);
      }

