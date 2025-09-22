'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

interface ParticleSphereProps {
  className?: string;
}

class Dot {
  mesh: THREE.Mesh;
  pivot: THREE.Group;
  isAvoiding: boolean;
  lerpFactor: number;
  velocityX: number;
  velocityY: number;
  lerpSpeed: number;
  radius: number;
  targetPos: THREE.Vector3;

  constructor(radius: number, pivot: THREE.Group) {
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.0), dotMaterial);
    this.pivot = pivot;
    this.isAvoiding = false;
    this.lerpFactor = 0.0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.lerpSpeed = 0.05;
    this.radius = radius;
    this.targetPos = new THREE.Vector3();
  }

  avoidMouse(mousePos: THREE.Vector3, settings: {
    distanceAffection: number;
    avoidanceFactor: number;
    avoidRelativeToPivot: boolean;
    countZAxisDirection: boolean;
    toggleRotation: boolean;
  }) {
    const dotGlobalPos = new THREE.Vector3();
    const pivotGlobalPos = new THREE.Vector3();
    this.mesh.getWorldPosition(dotGlobalPos);
    this.pivot.getWorldPosition(pivotGlobalPos);

    if (!settings.countZAxisDirection) {
      pivotGlobalPos.setZ(0);
    }

    let distance;
    if (settings.avoidRelativeToPivot) {
      distance = pivotGlobalPos.distanceTo(mousePos);
    } else {
      distance = dotGlobalPos.distanceTo(mousePos);
    }

    if (distance < settings.distanceAffection) {
      let dir = new THREE.Vector3();

      if (settings.avoidRelativeToPivot) {
        dir = new THREE.Vector3(pivotGlobalPos.x - mousePos.x, pivotGlobalPos.y - mousePos.y, pivotGlobalPos.z);
      } else {
        dir = new THREE.Vector3(dotGlobalPos.x - mousePos.x, dotGlobalPos.y - mousePos.y, dotGlobalPos.z);
      }

      dir.normalize();

      this.targetPos.x = dir.x * (settings.avoidanceFactor - this.radius);
      this.targetPos.y = dir.y * (settings.avoidanceFactor - this.radius);

      if (!this.isAvoiding) {
        this.lerpFactor = 0.0;
        this.isAvoiding = true;
      }
    } else {
      if (this.isAvoiding) {
        this.isAvoiding = false;
        this.lerpFactor = 0.0;
      }
      this.targetPos.copy(new THREE.Vector3());
    }
  }

  controlMovement() {
    this.mesh.position.lerp(this.targetPos, this.lerpFactor);

    if (this.lerpFactor < 1.0) {
      this.lerpFactor += this.lerpSpeed;
    }
  }
}

const ParticleSphere: React.FC<ParticleSphereProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const outerSphereDotsRef = useRef<Dot[]>([]);
  const outerSpherePivotsRef = useRef<THREE.Group | null>(null);
  const cursorPosRef = useRef<THREE.Vector3>(new THREE.Vector3());
  const animationIdRef = useRef<number | null>(null);

  const settings = useMemo(() => ({
    distanceAffection: 8.0,
    avoidanceFactor: -15.0,
    avoidRelativeToPivot: true,
    countZAxisDirection: false,
    toggleRotation: true,
  }), []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 35;
    cameraRef.current = camera;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const glowPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,  // strength
      0.4,  // radius
      0.85  // threshold
    );
    composer.addPass(glowPass);
    composerRef.current = composer;

    // Create particle sphere
    const outerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(8, 32, 32),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    
    const outerPositionAttribute = outerSphere.geometry.attributes.position;
    const outerSpherePivots = new THREE.Group();
    outerSpherePivotsRef.current = outerSpherePivots;

    for (let i = 0; i < outerPositionAttribute.count; i++) {
      const vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(outerPositionAttribute, i);
      const globalPos = vertex.clone().applyMatrix4(outerSphere.matrixWorld);

      const pivot = new THREE.Group();
      pivot.position.copy(globalPos);
      
      const dot = new Dot(10, pivot);
      dot.mesh.material = new THREE.MeshBasicMaterial({ color: 0x9CE5E7 });
      outerSphereDotsRef.current.push(dot);

      pivot.add(dot.mesh);
      dot.mesh.position.copy(new THREE.Vector3());
      outerSpherePivots.add(pivot);
    }

    scene.add(outerSpherePivots);

    // Mouse event handlers
    const onDocumentMouseMove = (event: MouseEvent) => {
      event.preventDefault();

      if (!mountRef.current) return;

      const rect = mountRef.current.getBoundingClientRect();
      const cursorPos = new THREE.Vector2();
      cursorPos.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      cursorPos.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const vector = new THREE.Vector3(cursorPos.x, cursorPos.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      cursorPosRef.current = camera.position.clone().add(dir.multiplyScalar(distance));
    };

    const onDocumentTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      if (!mountRef.current) return;

      const rect = mountRef.current.getBoundingClientRect();
      const cursorPos = new THREE.Vector2();
      cursorPos.x = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      cursorPos.y = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;

      const vector = new THREE.Vector3(cursorPos.x, cursorPos.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      cursorPosRef.current = camera.position.clone().add(dir.multiplyScalar(distance));
    };

    const onWindowResize = () => {
      if (!mountRef.current || !camera || !renderer) return;

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      
      if (composer) {
        composer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);

    // Animation loop
    const animate = () => {
      // Add rotation based on toggle setting
      if (settings.toggleRotation && outerSpherePivots) {
        outerSpherePivots.rotation.x += 0.01;
        outerSpherePivots.rotation.y += 0.01;
        outerSpherePivots.rotation.z += 0.01;
      }

      for (let i = 0; i < outerSphereDotsRef.current.length; i++) {
        outerSphereDotsRef.current[i].avoidMouse(cursorPosRef.current, settings);
        outerSphereDotsRef.current[i].controlMovement();
      }

      if (composer) {
        composer.render();
      }

      if (controls) {
        controls.update();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('touchmove', onDocumentTouchMove);
      window.removeEventListener('resize', onWindowResize);

      const currentMount = mountRef.current;
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }

      if (renderer) {
        renderer.dispose();
      }
    };
  }, [settings]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full ${className}`}
      style={{ position: 'relative', zIndex: 10, overflow: 'hidden' }}
    />
  );
};

export default ParticleSphere; 