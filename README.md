# Client Side OBJ-MTL loader

To load the OBJ model i just merged two snippets from this two links:

https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers

and

https://codepen.io/shahrin14/pen/VzvPdB?editors=1010

The MTL i wrote the code.

# Download the demo and test it!!!

---

### Create two globals

          let loadedModels = [];

          let loadedMaterials = [];

### Create two inputs and one button

          <input type="file" onchange="onChooseFile(event, onModelLoad.bind(this))"/>

          <input type="file" onchange="onChooseFile(event, onMaterialLoad.bind(this))"/>

          <button id="loadBT" onclick="loadOBJMTL()">Load</button>


### To add the 3d Model in the scene

          function onModelLoad(event) {
            let modelData = event.target.result;

            let objLoader = new THREE.OBJLoader();

            let geometry = objLoader.parse(modelData);
            let pos = new THREE.Vector3(0, 0, 0);

            if (geometry.children.length > 0) {
              for (let i = 0; i < geometry.children.length; i++) {
                let obj = new THREE.Mesh(
                  geometry.children[i].geometry,
                  geometry.children[i].material
                );
                obj.position.copy(pos);
                loadedModels.push(obj);
                objects.push(obj);
              }
            } else {
              let obj = new THREE.Mesh(geometry.geometry, geometry.material);
              obj.position.copy(pos);

              loadedModels.push(obj);
              objects.push(obj);
            }
            
            this.value = "";
          }

          function onMaterialLoad(event) {
            let materialData = event.target.result;
            let mtlLoader = new THREE.MTLLoader();
            let material = mtlLoader.parse(materialData);
            let info = material.materialsInfo;
            let tempMat = [];
            let newMatArr;

            for (let name in info) {
                let newM = material.createMaterial_(name);
                tempMat.push(newM);
            }

            if(tempMat.length > 1){
                newMatArr = material.getAsArray();
                loadedMaterials.push(newMatArr);
            }else if(tempMat.length == 1){
                loadedMaterials.push(tempMat[0]);
            }
            if (loadedMaterials.length > 0) {
              console.log("materials loaded");
            } else {
              console.log("no materials loaded");
            }
          }

          function onChooseFile(event, onLoadFileHandler) {
            if (typeof window.FileReader !== "function")
              throw "The file API isn't supported on this browser.";
            let input = event.target;
            if (!input) throw "The browser does not properly implement the event object";
            if (!input.files)
              throw "This browser does not support the `files` property of the file input.";
            if (!input.files[0]) return undefined;
            let file = input.files[0];
            let fr = new FileReader();
            fr.onload = onLoadFileHandler;
            fr.readAsText(file);
          }

          function loadOBJMTL() {
            if (loadedMaterials.length > 0) {
              for (let i = 0; i < loadedModels.length; i++) {
                loadedModels[i].material = loadedMaterials[i];
                loadedModels[i].needsUpdate = true;
                scene.add(loadedModels[i]);
              }
            } else {
              for (let i = 0; i < loadedModels.length; i++) {
                scene.add(loadedModels[i]);
              }
            }
          }
