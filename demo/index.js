var scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(120,120,120)");
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild( renderer.domElement );

var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 10, 0 );
light.castShadow = true;            // default false
scene.add( light );

var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );

var controls = new THREE.OrbitControls( camera, renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// cube.castShadow = true;
// cube.receiveShadow = false; 
// scene.add( cube );

var loader = new ModelLoader(scene);


function animate() {
    requestAnimationFrame( animate );
    controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();

function onChooseFile(e, type){
    loader.fileChoosen(e, type);
}

function loadOBJMTL(){
    loader.load();
}