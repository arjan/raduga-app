import React from 'react'
import * as THREE from 'three'

import API from './API'
import TrackballControls from './utils/TrackballControls'


export default class extends React.Component {
  render() {
    return (
      <div className="globe--wrapper" ref={div => { this._div = div }} />
    )
  }

  componentDidMount() {
    const { width, height } = this._div.getBoundingClientRect()
    console.log('width', width)
    console.log('height', height)

    // Earth params
    var radius   = 0.5,
	segments = 48,
	rotation = 6;

    THREE.ImageUtils.crossOrigin = 'anonymous';

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, 1, 0.01, 10000);
    camera.position.z = 1.6;

    var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    var r = window.devicePixelRatio;
    renderer.setSize(r*width, r*width);
    renderer.domElement.style.width = width + 'px';
    renderer.domElement.style.height = width + 'px';

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

    var controls = new TrackballControls(camera, this._div);
    controls.noZoom = true;
    controls.noPan = true;

    this._div.appendChild(renderer.domElement);
    render();

    function render() {
      controls.update();
      sphere.rotation.y += 0.0015;
      clouds.rotation.y += 0.0015;
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

    function createSphere(radius, segments) {
      const bumpMap = new THREE.TextureLoader().load('images/elev_bump_4k.jpg')
      const map = new THREE.TextureLoader().load('images/2_no_clouds_4k.jpg')

      return new THREE.Mesh(
	new THREE.SphereGeometry(radius, segments, segments),
	new THREE.MeshPhongMaterial({ map, bumpMap, bumpScale:   0.015 })
      );
    }

    function createClouds(radius, segments) {
      var clouds = new THREE.TextureLoader().load(API.getCloudsURL());
      clouds.minFilter = THREE.NearestFilter;
      return new THREE.Mesh(
	new THREE.SphereGeometry(radius + 0.003, segments, segments),
	new THREE.MeshPhongMaterial({
	  map:         clouds,
	  transparent: true,
          specular: 0xffffff,
          shininess: 5,
          blendDstAlpha: 0.5
	})
      );
    }
  }
}
