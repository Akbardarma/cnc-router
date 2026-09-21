/**
 * 3D CAD WebGL Viewer Engine for Autodesk Inventor CNC Router Assembly
 * Built with Three.js & OrbitControls
 * Model: Authentic Autodesk Inventor Assembly from C:\gptcodex\ebo\Last\Assembly CNC Router Desktop.iam
 * Designer: Akbar Darma Saputra (Mechatronics Engineering PENS)
 */

class CNCViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.modelRoot = null;
    this.occurrenceList = [];
    this.raycastMeshes = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredMesh = null;
    this.selectedOccurrence = null;
    this.currentDisplayMode = 'pbr';
    this.explosionFactor = 0;
    this.isExplodeAnimating = false;
    this.animDirection = 1;
    this.isAutoRotating = false;

    // Camera preset targets (Normalized scale ~1.5m)
    this.cameraPresets = {
      isometric: { pos: new THREE.Vector3(1.7, 1.3, 1.7), target: new THREE.Vector3(0, 0, 0) },
      front: { pos: new THREE.Vector3(0, 0.2, 2.2), target: new THREE.Vector3(0, 0, 0) },
      top: { pos: new THREE.Vector3(0, 2.5, 0.01), target: new THREE.Vector3(0, 0, 0) },
      side: { pos: new THREE.Vector3(2.3, 0.2, 0), target: new THREE.Vector3(0, 0, 0) },
      spindle: { pos: new THREE.Vector3(0.05, 0.2, 0.75), target: new THREE.Vector3(0, 0.1, 0.1) }
    };

    this.cameraLerp = null;

    this.init();
  }

  init() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf1f5f9);

    // Subtle technical CAD grid (Light Studio)
    const grid = new THREE.GridHelper(3.5, 35, 0x94a3b8, 0xdbe2ea);
    grid.position.y = -0.65;
    this.scene.add(grid);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.05, 50);
    this.camera.position.set(1.7, 1.3, 1.7);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxDistance = 8;
    this.controls.minDistance = 0.15;
    this.controls.target.set(0, 0, 0);

    // 5. Lighting Setup (Bright Studio CAD Lighting)
    this.setupLights();

    // 6. Event Listeners
    window.addEventListener('resize', () => this.onWindowResize());
    this.renderer.domElement.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.renderer.domElement.addEventListener('click', (e) => this.onCanvasClick(e));

    // 7. Load Akbar's Actual Inventor Assembly GLB
    this.loadModel('models/cnc_router.glb');

    // 8. Render Loop
    this.animate();
  }

  setupLights() {
    // Ambient / Hemisphere Light (Bright Daylight Studio)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcfd8dc, 1.05);
    this.scene.add(hemiLight);

    // Key Light (Main Sun)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    this.scene.add(keyLight);

    // Fill Light (Soft Neutral Fill)
    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.2);
    fillLight.position.set(-4, 3, -3);
    this.scene.add(fillLight);

    // Rim Light (Subtle Cool Edge Accent)
    const rimLight = new THREE.DirectionalLight(0x0284c7, 0.7);
    rimLight.position.set(0, -3, -4);
    this.scene.add(rimLight);

    // Top Fill
    const topLight = new THREE.DirectionalLight(0xffffff, 1.1);
    topLight.position.set(0, 6, 0);
    this.scene.add(topLight);
  }

  loadModel(url) {
    const loader = new THREE.GLTFLoader();
    const loadingEl = document.getElementById('model-loading-indicator');
    const progressEl = document.getElementById('loading-progress-bar');
    const loadingTextEl = document.getElementById('loading-progress-text');

    loader.load(
      url,
      (gltf) => {
        this.modelRoot = gltf.scene;

        // Auto-scale model if units are in cm/mm (Inventor standard export is in cm)
        const box = new THREE.Box3().setFromObject(this.modelRoot);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        // Target display size ~1.5 meters
        let scaleFactor = 1.0;
        if (maxDim > 20) {
          scaleFactor = 1.5 / maxDim;
          this.modelRoot.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }

        // Center model to (0, 0, 0)
        const updatedBox = new THREE.Box3().setFromObject(this.modelRoot);
        const center = updatedBox.getCenter(new THREE.Vector3());
        this.modelRoot.position.sub(center);

        // Process Inventor occurrences, materials, and explosion vectors
        this.processOccurrences(this.modelRoot, scaleFactor);

        this.scene.add(this.modelRoot);

        if (loadingEl) {
          loadingEl.style.opacity = '0';
          setTimeout(() => { loadingEl.style.display = 'none'; }, 400);
        }

        // Set initial view
        this.setCameraPreset('isometric');

        // Update stats badge
        const partCountEl = document.getElementById('loaded-parts-count');
        if (partCountEl) partCountEl.textContent = `${this.occurrenceList.length} Inventor Parts`;
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          if (progressEl) progressEl.style.width = `${pct}%`;
          if (loadingTextEl) loadingTextEl.textContent = `Memuat Assembly Inventor Asli: ${pct}%`;
        }
      },
      (error) => {
        console.error('Error loading CAD model:', error);
        if (loadingTextEl) {
          loadingTextEl.textContent = 'Gagal memuat model. Periksa file GLB.';
          loadingTextEl.classList.add('text-red-400');
        }
      }
    );
  }

  processOccurrences(root, scaleFactor) {
    this.occurrenceList = [];
    this.raycastMeshes = [];

    // Traverse direct children of root or occurrence groups
    root.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        this.raycastMeshes.push(child);

        // Find the top occurrence parent
        let occurrence = child;
        let curr = child.parent;
        while (curr && curr !== root) {
          if (curr.name && (curr.name.includes(':') || curr.name.length > 2)) {
            occurrence = curr;
          }
          curr = curr.parent;
        }

        child.userData.occurrence = occurrence;

        // Enhance material properties for realistic WebGL rendering
        if (child.material) {
          child.userData.originalMaterial = child.material.clone();
          child.material.metalness = Math.min(1.0, (child.material.metalness || 0.6) * 1.15);
          child.material.roughness = Math.max(0.12, (child.material.roughness || 0.4) * 0.85);
          child.material.envMapIntensity = 1.2;
        }
      }
    });

    // Configure unique occurrences for Exploded View
    const processedNodes = new Set();

    this.raycastMeshes.forEach((mesh) => {
      const occ = mesh.userData.occurrence || mesh;
      if (!processedNodes.has(occ)) {
        processedNodes.add(occ);

        // Store initial position
        occ.userData.initialPos = occ.position.clone();

        const rawName = occ.name || mesh.name || 'Component';
        const baseName = rawName.split(':')[0].trim();
        occ.userData.partName = baseName;
        occ.userData.fullName = rawName;

        // Classify subsystem and compute exploded vector based on Akbar's actual parts
        // Calibrated: 100% on the slider matches the ideal separation (scaled by 0.01)
        const explodeMultiplier = scaleFactor * 0.01;
        const lower = baseName.toLowerCase();
        let subsystem = 'Rangka & Struktur';
        let explodeVec = new THREE.Vector3(0, 0, 0);

        if (lower.includes('kaki')) {
          subsystem = 'Kaki Penyangga & Leveling Feet';
          explodeVec.set(0, -35 * explodeMultiplier, 0);
        } else if (lower.includes('4080') || lower.includes('2040') || lower.includes('plat sambung')) {
          subsystem = 'Rangka Ekstrusi 4080 & Bed Slats 2040';
          explodeVec.set(0, -10 * explodeMultiplier, 0);
        } else if (lower.includes('gantry 1')) {
          subsystem = 'Pelat Gantry Kanan (Gantry 1)';
          explodeVec.set(30 * explodeMultiplier, 25 * explodeMultiplier, 0);
        } else if (lower.includes('gantry 2')) {
          subsystem = 'Pelat Gantry Kiri (Gantry 2)';
          explodeVec.set(-30 * explodeMultiplier, 25 * explodeMultiplier, 0);
        } else if (lower.includes('base z') || lower.includes('bracket motor z') || lower.includes('bracket limit z')) {
          subsystem = 'Carriage Sumbu Z & Penggerak Vertikal';
          explodeVec.set(0, 55 * explodeMultiplier, 45 * explodeMultiplier);
        } else if (lower.includes('spindle')) {
          subsystem = 'Spindle Base & Clamping Bracket';
          explodeVec.set(0, 80 * explodeMultiplier, 70 * explodeMultiplier);
        } else if (lower.includes('23hs') || lower.includes('motor support') || lower.includes('stepper bracket')) {
          subsystem = 'Motor Stepper NEMA 23 (3A 1.9Nm)';
          explodeVec.set(15 * explodeMultiplier, 35 * explodeMultiplier, 20 * explodeMultiplier);
        } else if (lower.includes('sfu1605') || lower.includes('dsg16h') || lower.includes('bk12') || lower.includes('bf12') || lower.includes('coupling')) {
          subsystem = 'Transmisi Ball Screw SFU1605 & Support';
          explodeVec.set(0, 20 * explodeMultiplier, 15 * explodeMultiplier);
        } else if (lower.includes('sbr12')) {
          subsystem = 'Rel Linier SBR12 & Bearing SBR12UU';
          explodeVec.set(0, 15 * explodeMultiplier, 10 * explodeMultiplier);
        } else if (lower.includes('cable') || lower.includes('esteira')) {
          subsystem = 'Cable Drag Chain & Bracket';
          explodeVec.set(0, 25 * explodeMultiplier, -25 * explodeMultiplier);
        } else {
          subsystem = 'Hardware, Baut & Limit Switch';
          explodeVec.set(0, 12 * explodeMultiplier, 12 * explodeMultiplier);
        }

        occ.userData.subsystem = subsystem;
        occ.userData.explodeVector = explodeVec;

        this.occurrenceList.push(occ);
      }
    });
  }

  setDisplayMode(mode) {
    this.currentDisplayMode = mode;

    this.raycastMeshes.forEach((mesh) => {
      const orig = mesh.userData.originalMaterial;
      if (!orig) return;

      if (mode === 'pbr') {
        mesh.material = orig;
      } else if (mode === 'wireframe') {
        mesh.material = new THREE.MeshBasicMaterial({
          color: 0x0284c7,
          wireframe: true
        });
      } else if (mode === 'xray') {
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: orig.color,
          transparent: true,
          opacity: 0.28,
          roughness: 0.15,
          metalness: 0.85,
          transmission: 0.65,
          ior: 1.3
        });
      }
    });
  }

  setExplosionFactor(factor) {
    this.explosionFactor = Math.max(0, Math.min(1, factor));

    this.occurrenceList.forEach((occ) => {
      const initPos = occ.userData.initialPos;
      const vec = occ.userData.explodeVector;
      if (initPos && vec) {
        occ.position.x = initPos.x + vec.x * this.explosionFactor;
        occ.position.y = initPos.y + vec.y * this.explosionFactor;
        occ.position.z = initPos.z + vec.z * this.explosionFactor;
      }
    });

    const readout = document.getElementById('explode-value-readout');
    if (readout) readout.textContent = `${Math.round(this.explosionFactor * 100)}%`;
  }

  toggleExplodeAnimation() {
    this.isExplodeAnimating = !this.isExplodeAnimating;
    const btn = document.getElementById('btn-play-explode');
    if (btn) {
      btn.innerHTML = this.isExplodeAnimating
        ? '<svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> <span>Pause</span>'
        : '<svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> <span>Animate</span>';
    }
  }

  setCameraPreset(presetName) {
    const preset = this.cameraPresets[presetName];
    if (!preset) return;

    this.cameraLerp = {
      startPos: this.camera.position.clone(),
      endPos: preset.pos.clone(),
      startTarget: this.controls.target.clone(),
      endTarget: preset.target.clone(),
      progress: 0
    };
  }

  resetView() {
    this.setCameraPreset('isometric');
    this.setExplosionFactor(0);
    const slider = document.getElementById('explode-slider');
    if (slider) slider.value = 0;
  }

  toggleAutoRotate() {
    this.isAutoRotating = !this.isAutoRotating;
    this.controls.autoRotate = this.isAutoRotating;
    this.controls.autoRotateSpeed = 1.5;

    const btn = document.getElementById('btn-autorotate');
    if (btn) {
      btn.classList.toggle('text-cyan-400', this.isAutoRotating);
      btn.classList.toggle('border-cyan-500', this.isAutoRotating);
    }
  }

  onPointerMove(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.raycastMeshes, false);

    if (intersects.length > 0) {
      const topMesh = intersects[0].object;
      if (this.hoveredMesh !== topMesh) {
        this.clearHover();
        this.hoveredMesh = topMesh;
        if (topMesh !== this.selectedMesh && topMesh.material.emissive) {
          topMesh.material.emissive.setHex(0x0369a1);
        }
        this.renderer.domElement.style.cursor = 'pointer';
      }
    } else {
      this.clearHover();
      this.renderer.domElement.style.cursor = 'default';
    }
  }

  clearHover() {
    if (this.hoveredMesh && this.hoveredMesh !== this.selectedMesh) {
      if (this.hoveredMesh.material.emissive) {
        this.hoveredMesh.material.emissive.setHex(0x000000);
      }
    }
    this.hoveredMesh = null;
  }

  onCanvasClick(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.raycastMeshes, false);

    if (intersects.length > 0) {
      this.selectMesh(intersects[0].object);
    } else {
      this.deselectMesh();
    }
  }

  selectMesh(mesh) {
    this.deselectMesh();
    this.selectedMesh = mesh;

    if (mesh.material.emissive) {
      mesh.material.emissive.setHex(0x0284c7);
    }

    const occ = mesh.userData.occurrence || mesh;
    this.selectedOccurrence = occ;
    this.updateHUD(occ, mesh);
  }

  deselectMesh() {
    if (this.selectedMesh) {
      if (this.selectedMesh.material.emissive) {
        this.selectedMesh.material.emissive.setHex(0x000000);
      }
      this.selectedMesh = null;
      this.selectedOccurrence = null;
    }
    const hud = document.getElementById('part-inspector-hud');
    if (hud) hud.classList.add('hidden');
  }

  locateComponent(searchTerm) {
    const term = searchTerm.toLowerCase();
    let found = null;

    for (let occ of this.occurrenceList) {
      const name = (occ.userData.partName || '').toLowerCase();
      const sub = (occ.userData.subsystem || '').toLowerCase();
      if (name.includes(term) || sub.includes(term)) {
        found = occ;
        break;
      }
    }

    if (found) {
      // Find first mesh of this occurrence
      let foundMesh = null;
      found.traverse((c) => {
        if (c.isMesh && !foundMesh) foundMesh = c;
      });

      if (foundMesh) {
        this.selectMesh(foundMesh);
      }

      // Smooth camera focus
      const box = new THREE.Box3().setFromObject(found);
      const center = box.getCenter(new THREE.Vector3());

      this.cameraLerp = {
        startPos: this.camera.position.clone(),
        endPos: center.clone().add(new THREE.Vector3(0.35, 0.25, 0.35)),
        startTarget: this.controls.target.clone(),
        endTarget: center,
        progress: 0
      };
    }
  }

  updateHUD(occ, mesh) {
    const hud = document.getElementById('part-inspector-hud');
    if (!hud) return;

    hud.classList.remove('hidden');

    const nameEl = document.getElementById('hud-part-name');
    const subEl = document.getElementById('hud-subsystem');
    const matEl = document.getElementById('hud-material');
    const funcEl = document.getElementById('hud-function');

    const partName = occ.userData.partName || 'Komponen CAD';
    const fullName = occ.userData.fullName || partName;
    const subsystem = occ.userData.subsystem || 'Assembly CNC Router';
    const matName = mesh.material?.name || 'Aluminium / Steel Alloy';

    if (nameEl) nameEl.textContent = fullName;
    if (subEl) subEl.textContent = subsystem;
    if (matEl) matEl.textContent = matName;
    if (funcEl) {
      funcEl.textContent = `Komponen perakitan asli dari C:\\gptcodex\\ebo\\Last\\${partName}.ipt. Terintegrasi langsung dalam subsistem ${subsystem}.`;
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Explode Animation loop
    if (this.isExplodeAnimating) {
      this.explosionFactor += 0.008 * this.animDirection;
      if (this.explosionFactor >= 1) {
        this.explosionFactor = 1;
        this.animDirection = -1;
      } else if (this.explosionFactor <= 0) {
        this.explosionFactor = 0;
        this.animDirection = 1;
      }
      this.setExplosionFactor(this.explosionFactor);
      const slider = document.getElementById('explode-slider');
      if (slider) slider.value = this.explosionFactor * 100;
    }

    // Camera Lerp transition
    if (this.cameraLerp) {
      this.cameraLerp.progress += 0.04;
      const t = Math.min(1, this.cameraLerp.progress);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      this.camera.position.lerpVectors(this.cameraLerp.startPos, this.cameraLerp.endPos, ease);
      this.controls.target.lerpVectors(this.cameraLerp.startTarget, this.cameraLerp.endTarget, ease);

      if (t >= 1) {
        this.cameraLerp = null;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.CNCViewer = CNCViewer;
