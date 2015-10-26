angular.module('app')
  .directive('globe', function globe(API) {
    return {
      restrict: 'E',
      template: '<div class="globe"></div>',
      replace: true,
      link: function(scope, elem) {

        THREE.ImageUtils.crossOrigin = 'anonymous';

        $(elem).css('height', $(elem).width());
        
        var width = $(elem).width();
        var height = $(elem).height();

	    // Earth params
	    var radius   = 0.5,
		    segments = 32,
		    rotation = 6;  

	    var scene = new THREE.Scene();

	    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10000);
	    camera.position.z = 1.5;

	    var renderer = new THREE.WebGLRenderer({antialias: true});
	    renderer.setSize(width, height);

        window.r = renderer;
        
	    scene.add(new THREE.AmbientLight(0x222222));

        var sphere = createSphere(radius, segments);
	    sphere.rotation.y = rotation; 
	    scene.add(sphere);

	    var light = new THREE.DirectionalLight(0xffffff, 1);
	    light.position.set(-5,2,2);
	    camera.add(light);

        scene.add(camera);

        var clouds = createClouds(radius, segments);
	    clouds.rotation.y = rotation;
	    scene.add(clouds);

	    var controls = new THREE.TrackballControls(camera, elem[0]);
        controls.noZoom = true;
        controls.noPan = true;

	    elem[0].appendChild(renderer.domElement);
	    render();

	    function render() {
	      controls.update();
	      sphere.rotation.y += 0.0015;
	      clouds.rotation.y += 0.0015;		
	      requestAnimationFrame(render);
	      renderer.render(scene, camera);
	    }

	    function createSphere(radius, segments) {
	      return new THREE.Mesh(
		    new THREE.SphereGeometry(radius, segments, segments),
		    new THREE.MeshPhongMaterial({
		      map:         THREE.ImageUtils.loadTexture('images/earth.jpg'),
		      bumpMap:     THREE.ImageUtils.loadTexture('images/bump.jpg'),
		      bumpScale:   0.005
		      //specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
		      //specular:    new THREE.Color('grey')								
		    })
	      );
	    }

	    function createClouds(radius, segments) {
          var clouds = THREE.ImageUtils.loadTexture(API.getCloudsURL());
          clouds.minFilter = THREE.NearestFilter;
	      return new THREE.Mesh(
		    new THREE.SphereGeometry(radius + 0.003, segments, segments),			
		    new THREE.MeshPhongMaterial({
		      map:         clouds,
		      transparent: true,
              specular: 0xffffff,
              shininess: 10
              
		    })
	      );		
	    }

	    function createStars(radius, segments) {
	      return new THREE.Mesh(
		    new THREE.SphereGeometry(radius, segments, segments), 
		    new THREE.MeshBasicMaterial({
              color: 'black',
		      side: THREE.BackSide
		    })
	      );
	    }
      }
    };
  })

;
