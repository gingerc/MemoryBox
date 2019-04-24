 
//  // Detects webgl
//  if ( WEBGL.isWebGLAvailable() === false ) {
//     document.body.appendChild( WEBGL.getWebGLErrorMessage() );
//     document.getElementById( 'container' ).innerHTML = "";
// }
 
 
 //usual 3D variables
 let scene;
 let camera3D;
 let renderer;

 let things = [];   // poly objects
 var keyword;

 //like draw
 var animate = function () {
     //recursively call this function is a way that the renderer does it in a smart way
     requestAnimationFrame(animate);
     keyword = document.getElementById("userInput").value;
     //animate the poly objects in the things array
     for (var i = 0; i < things.length; i++) {
         things[i].position.z -= 1;
         if (things[i].position.z < -400) {
             things[i].position.z = 400;
         }
 };
}

 function setup() {
     //same as init but some p5 stuff needs to be called from setup
     console.log("setup");
     
     //searchPoly(keyword);
     
 }

 //like setup
 function init() {
     //console.log("initializing three.js")
     basic3DStuff()

     //loadModel('/osc_body/obj/female02/female02.obj', -90,0,0);
     //loadModel('/osc_body/obj/male02/male02.obj', 90, 0, 0);
 }

 init();  //like setup but you have to call it yourself
 animate();  //like draw you have to kick start and then it calls itself

 function GoSearch(){  
     //console.log(document.getElementById("userInput").value);
     searchPoly(keyword);
 }


//set up three.js loading utility
function loadModel(fileName, x, y, z) {
    let manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };

    var myLoader = new THREE.OBJLoader(manager);
    myLoader.load(fileName, function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                // selectableMeshes.push(child);
                // child.material.map = texture;

                //don't worry about textures for now
            }
        });
        var grouper = new THREE.Group();
        grouper.add(object);
        grouper.position.x = x;
        grouper.position.y = y;
        grouper.position.z = z;
        scene.add(grouper);

        console.log("added object" + location);

    }, onProgress, onError);

}





//this asks poly for a model based on a key and then loads it
        function searchPoly(keywords) {
            //API KEY
            const API_KEY = 'AIzaSyAvCB6h2VzNeIIXvuZ2SvbR2wJ5DxDbpDU';
            var url = `https://poly.googleapis.com/v1/assets?keywords=${keywords}&format=OBJ&key=${API_KEY}`;
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.addEventListener('load', function (event) {
                //this is the anonymous function for the callback of the first search round of interacting with poly API 
                //now you load the model
                var data = JSON.parse(event.target.response);
                var assets = data.assets;
                if (assets) {
                    var asset = assets[0];  //you could pick among many that come back but we take the first one
                    //  createObject(asset);
                    var format = asset.formats.find(format => { return format.formatType === 'OBJ'; });
                    if (format !== undefined) {
                        var obj = format.root;
                        var mtl = format.resources.find(resource => { return resource.url.endsWith('mtl') });
                        var path = obj.url.slice(0, obj.url.indexOf(obj.relativePath));
                        var loader = new THREE.MTLLoader();
                        loader.setCrossOrigin(true);
                        loader.setMaterialOptions({ ignoreZeroRGBs: true });
                        loader.setPath(path);
                        loader.load(mtl.url, function (materials) {
                            //this is a callback from the loader that brings back the materials
                            var loader = new THREE.OBJLoader();
                            loader.setMaterials(materials);
                            loader.load(obj.url, function (object) {
                                var box = new THREE.Box3();
                                box.setFromObject(object);
                                // re-center
                                var vec = new THREE.Vector3(0, 0, 0);
                                box.getCenter(vec);
                                //vec.y = box.min.y + 50;
                                object.position.sub(vec);
                                // scale
                                var scaler = new THREE.Group();
                                scaler.add(object);
                                scaler.scale.setScalar(30 / box.getSize(vec).length());
                                scaler.position.y = -20;
                                scaler.position.z = 300;
                                scene.add(scaler);
                                things.push(scaler);
                                // polyContainer.add(scaler);
                                console.log(data);
                            });

                        });

                    }
                } else {
                    console.log("no result");
                   // results.innerHTML = '<center>NO RESULTS</center>';
                }
            });
            request.send(null);
        }



        function basic3DStuff() {
            console.log("adding 3D stuff")
            //all three.js programs have a scene, a camera and a renderer
            scene = new THREE.Scene();
            camera3D = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera3D.position.z = 350;

            // document.body.appendChild(renderer.domElement);
            //this puts the three.js stuff in a particular div
            document.getElementById('container').appendChild(renderer.domElement);

            //add some lights if you want
            var ambient = new THREE.HemisphereLight(0xbbbbff, 0x886666, 0.75);
            ambient.position.set(-0.5, 0.75, -1);
            scene.add(ambient);

            var light = new THREE.DirectionalLight(0xffffff, 0.75);
            light.position.set(1, 0.75, 0.5);
            scene.add(light);

        }

    