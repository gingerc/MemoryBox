 // THREE.JS VIEWER

 const WIDTH = viewer.offsetWidth;
 const HEIGHT = viewer.offsetHeight;
 var ASPECT = WIDTH / HEIGHT;
 var NEAR = 10;
 var FAR = 500;

 var camera, scene, renderer, container,light;
 var cameraControls;

 var randomNumber;

 init();
 animate();
 
            
 function init(){
   
    //renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );
    viewer.appendChild( renderer.domElement );
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x222222 );
   
    //scene.add( new THREE.GridHelper( 10, 10 ) );
   
    //light
    var ambient = new THREE.HemisphereLight( 0xbbbbff, 0x886666, 0.75 );
    ambient.position.set( -0.5, 0.75, -1 );
    scene.add( ambient );
   
    light = new THREE.DirectionalLight( 0xffffff, 0.75 );
    light.position.set( 1, 0.75, 0.5 );
    scene.add( light );
   
    container = new THREE.Group();
	scene.add( container );
   
    //camera
    camera = new THREE.PerspectiveCamera( 45, ASPECT, NEAR, FAR );
    camera.position.set( -6, 18, 190 );  //0, 75, 160
    //camera.lookAt( 0, 1.5, 0 );

    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set(0, 0, 0);
    cameraControls.maxDistance = 400;
    cameraControls.minDistance = 150;
    cameraControls.update();
   
    // walls
    var planeGeo = new THREE.PlaneBufferGeometry( 120.1, 100.1 );

    var planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xbbbbff } ) );
    planeTop.position.y = 100;
    planeTop.rotateX( Math.PI / 2 );
    scene.add( planeTop );
   
    var planeBottom = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xbbbbff } ) );
    planeBottom.rotateX( - Math.PI / 2 );
    planeBottom.position.y = 0;
    scene.add( planeBottom );
   
    var planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xbbbbff } ) );
    planeFront.position.z = 50;
    planeFront.position.y = 50;
    planeFront.rotateY( Math.PI );
    scene.add( planeFront );
   
    var planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xbbbbff } ) );
    planeBack.position.z = -50;
    planeBack.position.y = 50;
    planeBack.rotateY( Math.PI * 4 );
    scene.add( planeBack );
   
    var planeRight = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xbbbbff } ) );
    planeRight.position.x = 60;
    planeRight.position.y = 50;
    planeRight.rotateY( - Math.PI / 2 );
    scene.add( planeRight );
   
    var planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xbbbbff } ) );
    planeLeft.position.x = - 60;
    planeLeft.position.y = 50;
    planeLeft.rotateY( Math.PI / 2 );
    scene.add( planeLeft );
   

 }

 

 
 
 function animate() {

     var time = performance.now() / 1000;

     if (container.children.length > 0){
         for (i = 0; i < container.children.length; i ++){
            container.children[i].position.x = Math.sin( time ) * i;
            container.children[i].position.y = Math.sin( time ) * i;
         }
        // container.children[0].position.x = Math.sin( time ) * 5;
        // container.children[0].position.y = Math.sin( time ) * 3;
         container.position.z = Math.cos( time ) * 5;
     }
    
     camera.lookAt( 0, 50, 0 );

     renderer.render( scene, camera );
     requestAnimationFrame( animate );

 }

 requestAnimationFrame( animate );
 

 


 // POLY REST API

 const API_KEY = 'AIzaSyAvCB6h2VzNeIIXvuZ2SvbR2wJ5DxDbpDU';

 function searchPoly( keywords, onLoad) {

     var url = `https://poly.googleapis.com/v1/assets?keywords=${keywords}&format=OBJ&key=${API_KEY}`;

     var request = new XMLHttpRequest();
     request.open( 'GET', url, true );
     request.addEventListener( 'load', function ( event ) {

         onLoad( JSON.parse( event.target.response ) );

     } );
     request.send( null );

 }

 function onResults( data ) {

    // while ( results.childNodes.length ) {

    //     results.removeChild( results.firstChild );

    // }

    var assets = data.assets;
    
    if ( assets ) {
        var index = Math.floor((Math.random() * data.assets.length));
        for ( var i = 0; i < assets.length; i ++ ) {

            var asset = assets[index];

        }

        console.log(asset);
        loadModel( asset );
    } else {
        //results.innerHTML = '<center>NO RESULTS</center>';
        alert("there is no model related to your search");
    }


}


 search.addEventListener( 'submit', function ( event ) {

    event.preventDefault()

    searchPoly( query.value, onResults);
    //randomNumber = Math.random(5);
    
} );


// button.click();



//  //usual 3D variables
//  let scene;
//  let camera3D;
//  let renderer;

//  let things = [];   // poly objects
//  var keyword;

//  //like draw
//  var animate = function () {
//      //recursively call this function is a way that the renderer does it in a smart way
//      requestAnimationFrame(animate);
//      keyword = document.getElementById("userInput").value;
//      //animate the poly objects in the things array
//      for (var i = 0; i < things.length; i++) {
//          things[i].position.z -= 1;
//          if (things[i].position.z < -400) {
//              things[i].position.z = 400;
//          }
//  };
// }

//  function setup() {
//      //same as init but some p5 stuff needs to be called from setup
//      console.log("setup");
     
//      //searchPoly(keyword);
     
//  }

//  //like setup
//  function init() {
//      //console.log("initializing three.js")
//      basic3DStuff()

//      //loadModel('/osc_body/obj/female02/female02.obj', -90,0,0);
//      //loadModel('/osc_body/obj/male02/male02.obj', 90, 0, 0);
//  }

//  init();  //like setup but you have to call it yourself
//  animate();  //like draw you have to kick start and then it calls itself

//  function GoSearch(){  
//      //console.log(document.getElementById("userInput").value);
//      searchPoly(keyword);
//  }


//set up three.js loading utility
function loadModel(asset) {

    var format = asset.formats.find( format => { return format.formatType === 'OBJ'; } );

    // while ( container.children.length ) {

    //     container.remove( container.children[ 0 ] );

    // }

    var obj = format.root;
	var mtl = format.resources.find( resource => { return resource.url.endsWith( 'mtl' ) } );

    var path = obj.url.slice( 0, obj.url.indexOf( obj.relativePath ) );

    var loader = new THREE.MTLLoader();
	loader.setCrossOrigin( true );
	loader.setMaterialOptions( { ignoreZeroRGBs: true } );
    loader.setTexturePath( path );

    loader.load( mtl.url, function ( materials ) {

        var loader = new THREE.OBJLoader();
        loader.setMaterials( materials );
        loader.load( obj.url, function ( object ) {

            var box = new THREE.Box3();
            
            box.setFromObject( object );
    
            // re-center

            var center = box.getCenter();
            center.y = box.min.y - getRandomFloat(0.2,0.7);
            center.x = getRandomFloat(-1.5,1.5);
            center.z = getRandomFloat(-1.5,1.5);
            object.position.sub( center);
           // object.position.x = getRandomFloat(-3,3);

            // scale

            var scaler = new THREE.Group();
            scaler.add( object );
            var rand = getRandomFloat(40,55);
            scaler.scale.setScalar( rand / box.getSize().length() );
            //console.log(box.getSize().length());
            container.add( scaler );

        } );

    } );
    

}


function getRandomFloat(min, max) {
    console.log(Math.random() * (max - min) + min);
    return Math.random() * (max - min) + min;
  }





  
// //this asks poly for a model based on a key and then loads it
//         function searchPoly(keywords) {
//             //API KEY
//             const API_KEY = 'AIzaSyC9g4_i4T1zDMweDqG3ssqIKGagb6ng6gY';
//             var url = `https://poly.googleapis.com/v1/assets?keywords=${keywords}&format=OBJ&key=${API_KEY}`;
//             var request = new XMLHttpRequest();
//             request.open('GET', url, true);
//             request.onload = function (event) {
//                 //this is the anonymous function for the callback of the first search round of interacting with poly API 
//                 //now you load the model
//                 var data = JSON.parse(event.target.response);
//                 var assets = data.assets;
//                 if (assets) {
//                     var asset = assets[0];  //you could pick among many that come back but we take the first one
//                     //  createObject(asset);
//                     var format = asset.formats.find(format => { return format.formatType === 'OBJ'; });
//                     if (format !== undefined) {
//                         var obj = format.root;
//                         var mtl = format.resources.find(resource => { return resource.url.endsWith('mtl') });
//                         var path = obj.url.slice(0, obj.url.indexOf(obj.relativePath));
//                         var loader = new THREE.MTLLoader();
//                         loader.setCrossOrigin(true);
//                         loader.setMaterialOptions({ ignoreZeroRGBs: true });
//                         loader.setPath(path);
//                         loader.load(mtl.url, function (materials) {
//                             //this is a callback from the loader that brings back the materials
//                             var loader = new THREE.OBJLoader();
//                             loader.setMaterials(materials);
//                             loader.load(obj.url, function (object) {
//                                 var box = new THREE.Box3();
//                                 box.setFromObject(object);
//                                 // re-center
//                                 var vec = new THREE.Vector3(0, 0, 0);
//                                 box.getCenter(vec);
//                                 //vec.y = box.min.y + 50;
//                                 object.position.sub(vec);
//                                 // scale
//                                 var scaler = new THREE.Group();
//                                 scaler.add(object);
//                                 scaler.scale.setScalar(30 / box.getSize(vec).length());
//                                 scaler.position.y = -20;
//                                 scaler.position.z = 300;
//                                 scene.add(scaler);
//                                 things.push(scaler);
//                                 // polyContainer.add(scaler);
//                                 console.log(data);
//                             });

//                         });

//                     }
//                 } else {
//                     console.log("no result");
//                    // results.innerHTML = '<center>NO RESULTS</center>';
//                 }
//             });
//             request.send(null);
//         }



//         function basic3DStuff() {
//             console.log("adding 3D stuff")
//             //all three.js programs have a scene, a camera and a renderer
//             scene = new THREE.Scene();
//             camera3D = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
//             renderer = new THREE.WebGLRenderer();
//             renderer.setSize(window.innerWidth, window.innerHeight);
//             camera3D.position.z = 350;

//             // document.body.appendChild(renderer.domElement);
//             //this puts the three.js stuff in a particular div
//             document.getElementById('container').appendChild(renderer.domElement);

//             //add some lights if you want
//             var ambient = new THREE.HemisphereLight(0xbbbbff, 0x886666, 0.75);
//             ambient.position.set(-0.5, 0.75, -1);
//             scene.add(ambient);

//             var light = new THREE.DirectionalLight(0xffffff, 0.75);
//             light.position.set(1, 0.75, 0.5);
//             scene.add(light);

//         }

          
         