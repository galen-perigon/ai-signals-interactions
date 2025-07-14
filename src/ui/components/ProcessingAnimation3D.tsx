import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import SplitType from 'split-type';

interface ProcessingAnimation3DProps {
  className?: string;
  onComplete?: () => void;
}

// Terminal-style text animator for streaming effects
class TextAnimator {
  private textElement: HTMLElement;
  private splitter: SplitType | null = null;
  private originalChars: string[] = [];
  private lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ',', '0', '1'];

  constructor(textElement: HTMLElement) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error('Invalid text element provided.');
    }
    this.textElement = textElement;
    this.splitText();
  }

  private splitText() {
    try {
      this.splitter = new SplitType(this.textElement, {
        types: 'words,chars'
      });
      this.originalChars = this.splitter.chars?.map(char => char.innerHTML) || [];
    } catch (error) {
      console.warn('TextAnimator: Could not split text, falling back to simple animation');
    }
  }

  animate() {
    this.reset();

    if (!this.splitter?.chars) {
      // Fallback: simple fade in if splitting failed
      gsap.fromTo(this.textElement, {
        opacity: 0,
        y: 10
      }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
      return;
    }

    const chars = this.splitter.chars;

    chars.forEach((char, position) => {
      const initialHTML = char.innerHTML;
      
      gsap.fromTo(char, {
        opacity: 0
      }, {
        duration: 0.02,
        onComplete: () => {
          gsap.set(char, { innerHTML: initialHTML, delay: 0.02 });
        },
        repeat: 2,
        repeatRefresh: true,
        repeatDelay: 0.02,
        delay: (position + 1) * 0.03,
        innerHTML: () => this.lettersAndSymbols[Math.floor(Math.random() * this.lettersAndSymbols.length)],
        opacity: 1
      });
    });
  }

  reset() {
    if (!this.splitter?.chars) return;
    
    const chars = this.splitter.chars;
    chars.forEach((char, index) => {
      gsap.killTweensOf(char);
      if (this.originalChars[index]) {
        char.innerHTML = this.originalChars[index];
      }
    });
  }

  destroy() {
    this.reset();
    if (this.splitter) {
      this.splitter.revert();
    }
  }
}

// Animated text component with terminal streaming effect
const AnimatedText: React.FC<{ 
  text: string; 
  className?: string; 
  trigger: number;
  delay?: number;
}> = ({ text, className = '', trigger, delay = 0 }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const animatorRef = useRef<TextAnimator | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Clean up previous animator
    if (animatorRef.current) {
      animatorRef.current.destroy();
    }

    // Update text content immediately
    textRef.current.textContent = text;

    // Create new animator with delay
    setTimeout(() => {
      if (textRef.current) {
        try {
          animatorRef.current = new TextAnimator(textRef.current);
          animatorRef.current.animate();
        } catch (error) {
          console.warn('TextAnimator failed, falling back to simple animation:', error);
          // Fallback animation
          gsap.fromTo(textRef.current, {
            opacity: 0,
            y: 5
          }, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        }
      }
    }, delay);

    return () => {
      if (animatorRef.current) {
        animatorRef.current.destroy();
      }
    };
  }, [trigger, text, delay]);

  return (
    <span 
      ref={textRef} 
      className={`tracking-wider ${className}`}
    >
      {text}
    </span>
  );
};

export const ProcessingAnimation3D: React.FC<ProcessingAnimation3DProps> = ({ className, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cleanup: () => void;
  } | null>(null);

  // Stage management for dynamic text with animation triggers
  const [currentStage, setCurrentStage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const stageInfo = [
    {
      title: "Scanning Sources",
      subtitle: "DETECTING DATA PATTERNS"
    },
    {
      title: "Analyzing Content", 
      subtitle: "PROCESSING INFORMATION"
    },
    {
      title: "Organizing Data",
      subtitle: "STRUCTURING INSIGHTS"
    },
    {
      title: "Distilling Results",
      subtitle: "REFINING OUTPUTS"
    },
    {
      title: "Delivering Signal",
      subtitle: "BUILDING PREVIEW"
    }
  ];

  useEffect(() => {
    // Add a small delay to ensure the container has proper dimensions
    const timeoutId = setTimeout(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 400); // Minimum width
      const height = Math.max(rect.height, 300); // Minimum height
      
      console.log('Initializing 3D animation with dimensions:', width, 'x', height);

    // Scene setup
    const scene = new THREE.Scene();
    // No background color for transparency
    // scene.background = new THREE.Color(0xffffff);
    // Remove fog for cleaner look
    // scene.fog = new THREE.Fog(0xf8f9fa, 10, 40);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Remove tone mapping to preserve pure colors
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    // Style the canvas to maintain proper aspect ratio
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.objectFit = 'contain';
    
    container.appendChild(renderer.domElement);

    // Brighter lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Clean, minimal materials inspired by modern design
    const materials = {
      primary: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.0,
        roughness: 0.3
      }),
      secondary: new THREE.MeshStandardMaterial({
        color: 0xf5f5f7,
        metalness: 0.0,
        roughness: 0.4
      }),
      accent: new THREE.MeshStandardMaterial({
        color: 0xe5e5e7,
        metalness: 0.0,
        roughness: 0.3
      }),
      dark: new THREE.MeshStandardMaterial({
        color: 0x1d1d1f,
        metalness: 0.0,
        roughness: 0.2
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.0,
        roughness: 0.0,
        transparent: true,
        opacity: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0
      }),
      green: new THREE.MeshStandardMaterial({
        color: 0x56d273,
        metalness: 0.0,
        roughness: 0.3
      }),
      greenGlow: new THREE.MeshStandardMaterial({
        color: 0x56d273,
        emissive: 0x56d273,
        emissiveIntensity: 0.3
      }),
      brandBlue: new THREE.MeshStandardMaterial({
        color: 0x227C9D,
        metalness: 0.0,
        roughness: 0.3
      }),
      brandBlueGlow: new THREE.MeshStandardMaterial({
        color: 0x227C9D,
        emissive: 0x227C9D,
        emissiveIntensity: 0.3
      }),
      gold: new THREE.MeshStandardMaterial({
        color: 0xF9C035,
        metalness: 0.0,
        roughness: 0.3
      }),
      goldGlow: new THREE.MeshStandardMaterial({
        color: 0xF9C035,
        emissive: 0xF9C035,
        emissiveIntensity: 0.8
      }),
      cloud: new THREE.MeshStandardMaterial({
        color: 0x2D2D2D,
        metalness: 0.0,
        roughness: 0.9
      }),
      lightWood: new THREE.MeshStandardMaterial({
        color: 0xD4A574, // Light wood/oak color
        metalness: 0.0,
        roughness: 0.7
      }),
      pureWhite: new THREE.MeshStandardMaterial({
        color: 0xffffff, // Pure white for tape machine
        emissive: 0xffffff, // Add slight self-illumination
        emissiveIntensity: 0.1, // Very subtle glow to ensure it appears white
        metalness: 0.0,
        roughness: 0.1  // Slightly glossier for clean look
      }),
      lightGold: new THREE.MeshStandardMaterial({
        color: 0xfffaeb, // Very light gold for satellite dish
        metalness: 0.0,
        roughness: 0.3
      })
    };

    // Remove ground plane for cleaner look
    // const ground = new THREE.Mesh(
    //   new THREE.PlaneGeometry(50, 50),
    //   new THREE.MeshStandardMaterial({
    //     color: 0xd0d0d0,
    //     metalness: 0.1,
    //     roughness: 0.9
    //   })
    // );
    // ground.rotation.x = -Math.PI / 2;
    // ground.position.y = -3;
    // ground.receiveShadow = true;
    // scene.add(ground);

    // 1. SCANNING: Modern satellite dish
    function createRadar() {
      const group = new THREE.Group();
      
      // Clean base platform
      const basePlatform = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.8, 0.6, 16),
        materials.secondary
      );
      basePlatform.position.y = -1.2;
      basePlatform.castShadow = true;
      group.add(basePlatform);
      
      // Azimuth rotation assembly
      const azimuthMount = new THREE.Group();
      
      // Central support post
      const supportPost = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.4, 1.5, 16),
        materials.accent
      );
      supportPost.position.y = -0.3;
      supportPost.castShadow = true;
      azimuthMount.add(supportPost);
      
      // Elevation mount - simplified
      const elevationMount = new THREE.Group();
      
      // Side supports (simplified)
      for (let i = 0; i < 2; i++) {
        const side = i === 0 ? -1 : 1;
        const support = new THREE.Mesh(
          new THREE.BoxGeometry(0.3, 1.8, 0.2),
          materials.accent
        );
        support.position.set(side * 1.0, 0.3, 0);
        support.castShadow = true;
        elevationMount.add(support);
      }
      
      // Dish assembly
      const dishAssembly = new THREE.Group();
      
      // Main parabolic dish - slightly smaller for cleaner look
      const dishPoints = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24;
        const r = 2.4 * t;
        const y = -0.7 * r * r / 2.4; // Parabolic curve
        dishPoints.push(new THREE.Vector2(r, y));
      }
      
      const mainDish = new THREE.Mesh(
        new THREE.LatheGeometry(dishPoints, 32),
        materials.lightGold
      );
      mainDish.rotation.x = -Math.PI / 2;
      mainDish.castShadow = true;
      mainDish.receiveShadow = true;
      dishAssembly.add(mainDish);
      
      // Simple feed assembly
      const feedAssembly = new THREE.Group();
      
      // Primary feed horn - cleaner design
      const feedHorn = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 1.0, 12),
        materials.primary
      );
      feedHorn.position.z = 1.8;
      feedHorn.rotation.x = Math.PI / 2;
      feedHorn.castShadow = true;
      feedAssembly.add(feedHorn);
      
      // LNB housing - simplified
      const lnb = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.2, 0.4),
        materials.dark
      );
      lnb.position.z = 1.0;
      feedAssembly.add(lnb);
      
      // Support arms - reduced to 3 for cleaner look
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2;
        const strut = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 2.2, 8),
          materials.accent
        );
        strut.position.x = Math.cos(angle) * 0.9;
        strut.position.y = Math.sin(angle) * 0.9;
        strut.position.z = 1.1;
        strut.rotation.x = Math.PI / 2 - 0.4;
        strut.rotation.z = angle;
        strut.castShadow = true;
        feedAssembly.add(strut);
      }
      
      dishAssembly.add(feedAssembly);
      
      // Mount dish with clean positioning
      dishAssembly.position.z = 1.2;
      elevationMount.add(dishAssembly);
      
      // Set elevation angle
      elevationMount.rotation.x = -Math.PI / 6;
      elevationMount.position.y = 0;
      azimuthMount.add(elevationMount);
      
      group.add(azimuthMount);
      
      group.userData = { 
        azimuthMount, 
        elevationMount, 
        dishAssembly,
        feedAssembly 
      };
      return group;
    }

    // 2. ANALYZING: Reel-to-reel tape machine
    function createTapeMachine() {
      console.log('Creating WHITE tape machine - Fixed tone mapping and added emissive glow');
      const group = new THREE.Group();
      
      // Main chassis - recognizable tape recorder body
      const chassis = new THREE.Mesh(
        new THREE.BoxGeometry(5, 3, 2.5),
        materials.pureWhite
      );
      chassis.castShadow = true;
      chassis.receiveShadow = true;
      group.add(chassis);
      
      // Front control panel
      const frontPanel = new THREE.Mesh(
        new THREE.BoxGeometry(4.8, 2.8, 0.1),
        materials.pureWhite
      );
      frontPanel.position.z = 1.3;
      group.add(frontPanel);
      
      const reels: THREE.Group[] = [];
      const reelPositions: [number, number, number][] = [[-1.6, 0.6, 1.4], [1.6, 0.6, 1.4]];
      
      // Classic tape reels
      reelPositions.forEach((pos, i) => {
        const reelGroup = new THREE.Group();
        
        // Reel hub
        const hub = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16),
          materials.dark
        );
        hub.rotation.x = Math.PI / 2;
        
        // Tape on reel (more tape on left, less on right initially)
        const tapeRadius = i === 0 ? 0.8 : 0.4;
        const tape = new THREE.Mesh(
          new THREE.CylinderGeometry(tapeRadius, tapeRadius, 0.15, 32),
          materials.pureWhite
        );
        tape.rotation.x = Math.PI / 2;
        
        // Reel spokes
        for (let j = 0; j < 6; j++) {
          const spokeAngle = (j / 6) * Math.PI * 2;
          const spoke = new THREE.Mesh(
            new THREE.BoxGeometry(0.03, 0.03, 1.4),
            materials.dark
          );
          spoke.position.x = Math.cos(spokeAngle) * 0.7;
          spoke.position.y = Math.sin(spokeAngle) * 0.7;
          spoke.rotation.z = spokeAngle;
          reelGroup.add(spoke);
        }
        
        reelGroup.add(hub, tape);
        reelGroup.position.set(...pos);
        reels.push(reelGroup);
        group.add(reelGroup);
      });
      
      // Tape heads between reels
      const tapeHead = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.8, 0.2),
        materials.dark
      );
      tapeHead.position.set(0, 0.2, 1.4);
      group.add(tapeHead);
      
      // Control buttons
      const buttonNames = ['◄◄', '◄', '■', '►', '►►'];
      for (let i = 0; i < 5; i++) {
        const button = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16),
          i === 2 ? materials.greenGlow : materials.pureWhite
        );
        button.position.set(-1.5 + i * 0.75, -0.8, 1.4);
        button.rotation.x = Math.PI / 2;
        group.add(button);
      }
      
      // VU meters
      for (let i = 0; i < 2; i++) {
        const meter = new THREE.Mesh(
          new THREE.CylinderGeometry(0.4, 0.4, 0.05, 32),
          materials.dark
        );
        meter.position.set(-0.6 + i * 1.2, 0.8, 1.41);
        meter.rotation.x = Math.PI / 2;
        group.add(meter);
        
        // Meter needle
        const needle = new THREE.Mesh(
          new THREE.BoxGeometry(0.02, 0.6, 0.01),
          materials.greenGlow
        );
        needle.position.set(-0.6 + i * 1.2, 0.8, 1.42);
        needle.rotation.z = (Math.random() - 0.5) * 0.8;
        group.add(needle);
      }
      
      group.userData = { reels };
      return group;
    }

    // 3. ORGANIZING: Office filing cabinet
    function createFileCabinet() {
      const group = new THREE.Group();
      
      // Main cabinet body
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 3.5, 2),
        materials.lightWood
      );
      body.position.y = 0.25;
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);
      
      // Cabinet legs
      const legPositions: [number, number, number][] = [
        [-1, -1.8, -0.8],
        [1, -1.8, -0.8],
        [-1, -1.8, 0.8],
        [1, -1.8, 0.8]
      ];
      
      legPositions.forEach(pos => {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.12, 0.8, 12),
          materials.accent
        );
        leg.position.set(pos[0], pos[1], pos[2]);
        leg.castShadow = true;
        group.add(leg);
      });
      
      const drawers = [];
      for (let i = 0; i < 3; i++) {
        const drawer = new THREE.Group();
        
        // Drawer front face
        const front = new THREE.Mesh(
          new THREE.BoxGeometry(2.3, 1, 0.1),
          materials.lightWood
        );
        front.position.z = 1;
        
        // Drawer body
        const drawerBody = new THREE.Mesh(
          new THREE.BoxGeometry(2.2, 0.9, 1.8),
          materials.accent
        );
        drawerBody.position.z = 0;
        
        // Handle
        const handle = new THREE.Mesh(
          new THREE.BoxGeometry(0.8, 0.1, 0.15),
          materials.dark
        );
        handle.position.z = 1.1;
        
        // Label holder
        const labelHolder = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 0.3, 0.05),
          materials.accent
        );
        labelHolder.position.set(0, 0.2, 1.05);
        
        // File tabs (simulated)
        for (let j = 0; j < 8; j++) {
          const tab = new THREE.Mesh(
            new THREE.BoxGeometry(0.25, 0.6, 0.02),
            materials.green
          );
          tab.position.set(-0.9 + j * 0.25, 0, 0.9);
          drawer.add(tab);
        }
        
        drawer.add(front, drawerBody, handle, labelHolder);
        drawer.position.y = 1.5 - i * 1.1;
        drawer.userData = { 
          index: i,
          closed: true,
          targetZ: 0
        };
        
        drawers.push(drawer);
        group.add(drawer);
      }
      
      group.userData = { drawers };
      return group;
    }

    // 4. DISTILLING: Classic hourglass timer
    function createHourglass() {
      const group = new THREE.Group();
      
      // Traditional hourglass frame
      const frameTop = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 0.4, 32),
        materials.accent
      );
      frameTop.position.y = 2.8;
      frameTop.castShadow = true;
      group.add(frameTop);
      
      const frameBottom = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 0.4, 32),
        materials.accent
      );
      frameBottom.position.y = -2.8;
      frameBottom.castShadow = true;
      group.add(frameBottom);
      
      // Corner posts
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 5.6, 12),
          materials.secondary
        );
        post.position.x = Math.cos(angle) * 1.3;
        post.position.z = Math.sin(angle) * 1.3;
        post.castShadow = true;
        group.add(post);
      }
      
      // Glass hourglass shape
      const glassGroup = new THREE.Group();
      
      // Create proper hourglass geometry
      const hourglassPoints = [];
      
      // Top bulb
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        const y = 2.5 - t * 1.2;
        const r = 1.3 * Math.sin(t * Math.PI * 0.5);
        hourglassPoints.push(new THREE.Vector2(r, y));
      }
      
      // Neck constriction
      for (let i = 0; i <= 6; i++) {
        const t = i / 6;
        const y = 1.3 - t * 0.8;
        const r = 1.3 * Math.sin((1-t) * Math.PI * 0.5) * 0.3 + 0.1;
        hourglassPoints.push(new THREE.Vector2(r, y));
      }
      
      // Center point
      hourglassPoints.push(new THREE.Vector2(0.1, 0));
      
      // Bottom neck
      for (let i = 0; i <= 6; i++) {
        const t = i / 6;
        const y = -0.5 - t * 0.8;
        const r = 1.3 * Math.sin(t * Math.PI * 0.5) * 0.3 + 0.1;
        hourglassPoints.push(new THREE.Vector2(r, y));
      }
      
      // Bottom bulb
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        const y = -1.3 - t * 1.2;
        const r = 1.3 * Math.sin((1-t) * Math.PI * 0.5);
        hourglassPoints.push(new THREE.Vector2(r, y));
      }
      
      const hourglass = new THREE.Mesh(
        new THREE.LatheGeometry(hourglassPoints, 32),
        materials.glass
      );
      glassGroup.add(hourglass);
      
      group.add(glassGroup);
      
      // Sand inside hourglass
      const sandGroup = new THREE.Group();
      
      // Realistic sand material
      const sandMaterial = new THREE.MeshStandardMaterial({
        color: 0x227C9D,
        metalness: 0.0,
        roughness: 0.9
      });
      
      // Top sand pile with irregular surface
      const topSand = new THREE.Mesh(
        new THREE.SphereGeometry(1, 16, 16),
        sandMaterial
      );
      topSand.position.y = 1.6;
      topSand.scale.y = 0.6;
      topSand.castShadow = true;
      sandGroup.add(topSand);
      
      // Individual sand particles falling
      for (let i = 0; i < 8; i++) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.01, 8, 8),
          sandMaterial
        );
        particle.position.set(
          (Math.random() - 0.5) * 0.1,
          Math.random() * 1.5 - 0.75,
          (Math.random() - 0.5) * 0.1
        );
        sandGroup.add(particle);
      }
      
      // Falling sand stream - thinner and more realistic
      const sandStream = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.025, 2, 8),
        sandMaterial
      );
      sandStream.position.y = 0;
      sandGroup.add(sandStream);
      
      // Bottom sand pile with natural cone shape
      const bottomSand = new THREE.Mesh(
        new THREE.ConeGeometry(0.6, 0.8, 12),
        sandMaterial
      );
      bottomSand.position.y = -2.2;
      bottomSand.rotation.x = Math.PI;
      bottomSand.castShadow = true;
      sandGroup.add(bottomSand);
      
      group.add(sandGroup);
      
      group.userData = { 
        glassGroup, 
        topSand, 
        bottomSand,
        sandStream,
        sandGroup 
      };
      return group;
    }

    // 5. DELIVERING: Storm cloud with lightning
    function createLightning() {
      const group = new THREE.Group();
      
      // Realistic storm cloud
      const cloudGroup = new THREE.Group();
      
      const cloudPositions = [
        [0, 0, 0, 1.8],
        [-1.5, 0.4, 0, 1.5],
        [1.5, 0.2, 0, 1.4],
        [0, 0, -1.2, 1.2],
        [0, 0, 1.2, 1.3],
        [-0.8, 0.6, -0.8, 1.1],
        [0.8, 0.5, 0.8, 1.2]
      ];
      
      cloudPositions.forEach(([x, y, z, scale]) => {
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(scale, 32, 32),
          materials.cloud
        );
        sphere.position.set(x * 1.2, y + 3.2, z);
        cloudGroup.add(sphere);
      });
      
      group.add(cloudGroup);
      
      // Realistic jagged lightning bolt
      const boltGroup = new THREE.Group();
      
      const boltSegments = [
        [0, 3.2, 0],
        [-0.8, 2.2, 0],
        [0.5, 1.0, 0],
        [-0.4, -0.2, 0],
        [0.3, -1.8, 0],
        [0, -3.2, 0]
      ];
      
      for (let i = 0; i < boltSegments.length - 1; i++) {
        const start = new THREE.Vector3(...boltSegments[i]);
        const end = new THREE.Vector3(...boltSegments[i + 1]);
        const direction = end.clone().sub(start);
        const length = direction.length();
        
        // Make lightning bolt thicker - start at 0.25 instead of 0.15
        const segment = new THREE.Mesh(
          new THREE.CylinderGeometry(0.25 - i * 0.025, 0.25 - (i + 1) * 0.025, length, 12),
          materials.goldGlow
        );
        
        segment.position.copy(start.clone().add(end).multiplyScalar(0.5));
        segment.lookAt(end);
        segment.rotateX(Math.PI / 2);
        
        boltGroup.add(segment);
      }
      
      // Subtle data flash glow
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0xF9C035,
          transparent: true,
          opacity: 0
        })
      );
      boltGroup.add(glow);
      
      boltGroup.visible = false;
      group.add(boltGroup);
      
      // Strike target
      const strikePoint = new THREE.Mesh(
        new THREE.RingGeometry(0.2, 2.0, 32),
        materials.goldGlow
      );
      strikePoint.rotation.x = -Math.PI / 2;
      strikePoint.position.y = -3.5;
      strikePoint.visible = false;
      group.add(strikePoint);
      
      group.userData = { 
        cloudGroup, 
        boltGroup, 
        glow,
        strikePoint
      };
      return group;
    }

    // Create all structures
    const structures = [
      createRadar(),
      createTapeMachine(),
      createFileCabinet(),
      createHourglass(),
      createLightning()
    ];

    structures.forEach(structure => {
      structure.visible = false;
      structure.scale.set(0, 0, 0);
      // Scale down all objects to 1/4 their original size for smaller appearance
      structure.userData.originalScale = 0.25;
      scene.add(structure);
    });

    const stageNames = ['SCANNING', 'ANALYZING', 'ORGANIZING', 'DISTILLING', 'DELIVERING'];

    // Main timeline - no repeat, single 5-second cycle
    const tl = gsap.timeline({ 
      repeat: 0,
      onComplete: () => {
        // Notify parent component when animation completes
        if (onComplete) onComplete();
      }
    });

    // Show each structure for 3 seconds (5 stages total = 15 seconds)
    structures.forEach((structure, index) => {
      const stageDuration = 3;
      const startTime = index * stageDuration;
      
      tl.call(() => {
        structure.visible = true;
        // Update stage with transition effect and trigger text animation
        console.log(`Transitioning to stage ${index}: ${stageInfo[index]?.title}`);
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentStage(index);
          console.log(`Stage updated to ${index}: ${stageInfo[index]?.title}`);
          setTimeout(() => {
            setAnimationTrigger(prev => prev + 1); // Trigger text animation
            setIsTransitioning(false);
          }, 50); // Small delay to ensure state update
        }, 150);
      }, [], startTime);
      
      tl.to(structure.scale, {
        x: structure.userData.originalScale, 
        y: structure.userData.originalScale, 
        z: structure.userData.originalScale,
        duration: 0.5,
        ease: "power2.out"
      }, startTime);
      
      tl.to(structure.rotation, {
        y: Math.PI * 2,
        duration: stageDuration - 1.0,
        ease: "power1.inOut"
      }, startTime + 0.25);
      
      if (index < structures.length - 1) {
        tl.to(structure.scale, {
          x: 0, y: 0, z: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            structure.visible = false;
          }
        }, startTime + stageDuration - 0.5);
      } else {
        tl.to(structure.scale, {
          x: 0, y: 0, z: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            structure.visible = false;
          }
        }, startTime + stageDuration - 0.5);
      }
    });

    // Animation loop
    const clock = new THREE.Clock();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      
      // Satellite dish animations
      if (structures[0].visible) {
        const radar = structures[0];
        // Continuous slow azimuth rotation for tracking
        radar.userData.azimuthMount.rotation.y += 0.015;
        // Realistic satellite tracking movement with subtle elevation adjustments
        radar.userData.elevationMount.rotation.x = -Math.PI / 6 + Math.sin(time * 0.6) * 0.05;
        // Gentle feed horn orientation adjustments
        if (radar.userData.feedAssembly) {
          radar.userData.feedAssembly.rotation.y = Math.sin(time * 0.4) * 0.02;
        }
      }
      
      // Tape machine animations
      if (structures[1].visible) {
        const tapeMachine = structures[1];
        tapeMachine.userData.reels.forEach((reel: any, i: number) => {
          reel.rotation.z += (i === 0 ? 0.03 : -0.03);
        });
      }
      
      // File cabinet animations
      if (structures[2].visible) {
        const fileCabinet = structures[2];
        fileCabinet.userData.drawers.forEach((drawer: any, i: number) => {
          const targetZ = Math.sin(time * 0.8 + i * 0.5) * 0.5 + 0.5;
          drawer.position.z = targetZ * 0.8;
        });
      }
      
      // Hourglass animations
      if (structures[3].visible) {
        const hourglass = structures[3];
        const hourglassData = hourglass.userData;
        
        hourglassData.sandStream.visible = true;
        
        const sandProgress = (Math.sin(time * 0.3) + 1) / 2;
        
        // Animate top sand diminishing
        hourglassData.topSand.scale.y = 0.6 - sandProgress * 0.5;
        hourglassData.topSand.position.y = 1.6 - sandProgress * 0.3;
        
        // Animate bottom sand pile growing
        hourglassData.bottomSand.scale.set(
          0.6 + sandProgress * 0.4,
          0.8 + sandProgress * 0.6,
          0.6 + sandProgress * 0.4
        );
        hourglassData.bottomSand.position.y = -2.2 + sandProgress * 0.2;
      }
      
      // Lightning animations
      if (structures[4].visible) {
        const lightning = structures[4];
        const lightningData = lightning.userData;
        
        lightningData.cloudGroup.position.y = Math.sin(time * 0.7) * 0.2;
        lightningData.cloudGroup.rotation.y = Math.sin(time * 0.3) * 0.1;
        
        // Lightning strikes for the 3-second lightning stage
        const strikeTime = time % 1.2; // Strike every 1.2 seconds
        const isStriking = strikeTime < 0.8; // Visible for 0.8 seconds
        
        if (isStriking) {
          lightningData.boltGroup.visible = true;
          lightningData.strikePoint.visible = true;
          
          // Subtle intelligent data flash
          const glowIntensity = Math.sin(strikeTime * 6) * 0.15 + 0.25;
          lightningData.glow.material.opacity = 0.12 * glowIntensity;
          
          lightningData.strikePoint.scale.setScalar(1 + glowIntensity * 0.2);
          
          // Gentle flickering for data transmission effect
          lightningData.boltGroup.children.forEach((segment: any, i: number) => {
            if (segment.material && segment.material.emissiveIntensity !== undefined) {
              segment.material.emissiveIntensity = 0.6 + Math.sin(time * 20 + i) * 0.2;
            }
          });
        } else {
          lightningData.boltGroup.visible = false;
          lightningData.strikePoint.visible = false;
          lightningData.glow.material.opacity = 0;
        }
      }
      
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }

    animate();

    // Cleanup function
    const cleanup = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      tl.kill();
      
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          }
        }
      });
      
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };

    // Handle resize
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      
      // Maintain proper aspect ratio
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.objectFit = 'contain';
    };

    window.addEventListener('resize', handleResize);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      cleanup: () => {
        cleanup();
        window.removeEventListener('resize', handleResize);
      }
    };

      return () => {
        sceneRef.current?.cleanup();
      };
    }, 50); // 50ms delay

    return () => {
      clearTimeout(timeoutId);
      sceneRef.current?.cleanup();
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div 
          className={`text-sm font-medium text-gray-600 mb-1 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
          }`}
        >
          <AnimatedText 
            text={stageInfo[currentStage]?.title || "Processing Data"}
            trigger={animationTrigger}
            delay={0}
            className="text-gray-600 font-body text-sm font-medium"
          />
        </div>
        <div 
          className={`text-xs text-gray-400 uppercase transition-all duration-300 ${
            isTransitioning ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
          }`}
        >
          <AnimatedText 
            text={stageInfo[currentStage]?.subtitle || "BUILDING SIGNAL PREVIEW"}
            trigger={animationTrigger}
            delay={200}
            className="text-gray-400 text-xs uppercase font-monospace-body"
          />
        </div>
      </div>
    </div>
  );
}; 