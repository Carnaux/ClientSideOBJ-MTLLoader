# Client Side OBJ-MTL loader

To load the OBJ model i just merged two snippets from this two links:

https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers

and

https://codepen.io/shahrin14/pen/VzvPdB?editors=1010

The MTL i wrote the code.

# Download the demo and test it!!!

---

### Add the OBJLoader, MTLLoader and the modelLoader

        <script src="OBJLoader.js"></script>
        <script src="MTLLoader.js"></script>
        <script src="modelLoader.js"></script>


### Initialize the class
    
        var loader = new ModelLoader(scene);

### Create two inputs and one button

        <input type="file" onchange="onChooseFile(event, 'model')"/>

        <input type="file" onchange="onChooseFile(event, 'material')"/>

        <button id="loadBT" onclick="loadOBJMTL()">Load</button>


### To add the 3d Model in the scene create these two functions
        function onChooseFile(e, type){
            loader.fileChoosen(e, type);
        }

        function loadOBJMTL(){
            loader.load();
        }
