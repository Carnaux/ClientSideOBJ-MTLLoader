var scene = new THREE.Scene();
scene.background = new THREE.Color(40, 40, 40);
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

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

var animate = function() {
  requestAnimationFrame(animate);
  controls.update();
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();

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
  if (!input) throw "The browser does not properly implement the event object";
  if (!input.files)
    throw "This browser does not support the `files` property of the file input.";
  if (!input.files[0]) return undefined;
  let file = input.files[0];
  let fr = new FileReader();
  fr.onload = onLoadFileHandler;
  fr.readAsText(file);
}
