"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * סצנת Hero תלת־ממדית (Three.js וניל).
 * אובייקט wireframe גאומטרי + שדה חלקיקים, מגיב לעכבר ולגלילה.
 * הצבעים מותאמים לתמה (כהה/בהיר) ומתעדכנים בזמן אמת באירוע "themechange".
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.06);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ── מרכזי: torus-knot wireframe בצהוב חומצה ──────────────────────────────
    const knotGeo = new THREE.TorusKnotGeometry(2.1, 0.62, 180, 28, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0xdfe104,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // הילה לבנה דקה מאחור — נותן עומק
    const ghostGeo = new THREE.IcosahedronGeometry(3.4, 1);
    const ghostMat = new THREE.MeshBasicMaterial({
      color: 0xfafafa,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const ghost = new THREE.Mesh(ghostGeo, ghostMat);
    scene.add(ghost);

    // ── שדה חלקיקים ───────────────────────────────────────────────────────────
    const COUNT = 900;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 6 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfafafa,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── צבעים לפי תמה (כהה/בהיר) ──────────────────────────────────────────────
    const applyColors = () => {
      const light = document.documentElement.classList.contains("light");
      knotMat.color.set(light ? 0x111111 : 0xdfe104);
      ghostMat.color.set(light ? 0x111111 : 0xfafafa);
      ghostMat.opacity = light ? 0.06 : 0.04;
      particleMat.color.set(light ? 0x1a1a1a : 0xfafafa);
      (scene.fog as THREE.FogExp2).color.set(light ? 0xf2f1ea : 0x09090b);
    };
    applyColors();
    window.addEventListener("themechange", applyColors);

    // ── אינטראקציה ───────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouse);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frame = 0;

    const render = () => {
      const t = clock.getElapsedTime();

      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      knot.rotation.x = t * 0.12 + target.y * 0.4;
      knot.rotation.y = t * 0.18 + target.x * 0.6;
      const pulse = 1 + Math.sin(t * 1.2) * 0.03;
      knot.scale.setScalar(pulse);

      ghost.rotation.x = -t * 0.05;
      ghost.rotation.y = t * 0.07;

      particles.rotation.y = t * 0.02;
      particles.rotation.x = target.y * 0.1;

      // עומק עדין לפי גלילה
      camera.position.z = 9 + Math.min(scrollY, 800) * 0.0025;
      camera.position.x += (target.x * 0.8 - camera.position.x) * 0.05;
      camera.position.y += (-target.y * 0.6 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const animate = () => {
      render();
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", applyColors);
      knotGeo.dispose();
      knotMat.dispose();
      ghostGeo.dispose();
      ghostMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
