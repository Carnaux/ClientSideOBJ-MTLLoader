let loadedModels = [];

let loadedMaterials = [];

var scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(63,63,63)");

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const renderDiv = document.getElementById("render");
renderDiv.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

const light = new THREE.AmbientLight(0x404040, 2); // soft white light
scene.add(light);

camera.position.z = 5;

var animate = function() {
  requestAnimationFrame(animate);
  controls.update();

  renderer.render(scene, camera);
};

animate();

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
    }
  } else {
    let obj = new THREE.Mesh(geometry.geometry, geometry.material);
    obj.position.copy(pos);

    loadedModels.push(obj);
  }
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
