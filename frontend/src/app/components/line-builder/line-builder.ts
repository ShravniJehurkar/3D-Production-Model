import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { Machine } from '../../models/machine';
import { isPlatformBrowser } from '@angular/common';
import { createPalletizer, createFiller, createCapper, createCheckWeigher, createQualityStation, createTorqueStation, createDepalletizer, createRoBoArm, createStack, createLabeler } from '../machinestructure';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { createFactoryBase } from '../machinestructure/common/floor';
import { createFence } from '../machinestructure/common/fence';
import { createRectangleMarking, createPalletZone } from '../machinestructure/common/markings';
import { FactoryLayoutManager } from '../../services/layout.service';
import { MachineRenderService } from '../../services/machine-render.service';
import { disposeObject } from '../machinestructure/common/three-utils';
import { ConveyorService } from '../../services/conveyor.service';
import { ProductionService, ProductionState } from '../../services/production.service';
import { createFactoryFloorLayout } from '../machinestructure/common/factory-floor-layout';
import { provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { Walkway } from '../../models/walkways';
import { MACHINE_CONFIG } from '../../config/machine-config';

export interface ConveyorProduct {
  mesh: THREE.Group;
  segmentIndex: number;
  t: number;
  speed: number;
  finished?: boolean;
}
interface LineDesign {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  machines: Machine[];
}
@Component({
  selector: 'app-line-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatDividerModule,
    MatMenuModule
  ],
  templateUrl: './line-builder.html',
  styleUrls: ['./line-builder.css'],
})
export class LineBuilderComponent implements AfterViewInit, OnDestroy {
  // UI STATE 
  sidebarOpen = true;
  // showForm = true;
  showGrid = true;
  private blink = false;
  activeDesignName = '';
  //  CONVEYOR
  productionState = ProductionState.Closure;
  private conveyorSpeed = 0.12;
  private START_X = -40;
  private END_X = 40;
  private grid!: THREE.GridHelper;
  private floor!: THREE.Mesh;
  private lastRemoved: Machine | null = null;
  private isProductActive = false;
  private alarmFocusId: string | null = null;
  private alarmTimeout: any = null;
  ProductionState = ProductionState;
  currentProcess = ProductionState.Closure;
  selectedAlarmMachineId: string = '';
  alarmDuration = 0;
  //GRID SNAP 
  snap = 2;
  snapToGrid(v: number) {
    return Math.round(v / this.snap) * this.snap;
  }
  undo() {
    if (!this.undoStack.length) return;
    this.redoStack.push(JSON.parse(JSON.stringify(this.machines)));
    this.machines = this.undoStack.pop() ?? [];
    this.machineGroup.clear();
    this.machineMeshes.clear();
    this.drawMachines();
    this.saveMachines();
    if (this.lastRemoved) {
      this.api.deleteMachine(this.activeDesignId!, this.lastRemoved.id).subscribe();
      this.machine = {
        id: '',
        name: '',
        type: '',
        sequence: 0,
        length: 2,
        width: 2,
        height: 2,
        x: undefined,
        z: undefined,
        rotation: 0,
        status: 'RUNNING'
      };
    }
  }
  redo() {
    if (!this.redoStack.length) return;
    this.undoStack.push(JSON.parse(JSON.stringify(this.machines)));
    this.machines = this.redoStack.pop() ?? [];
    this.machineGroup.clear();
    this.machineMeshes.clear();
    this.drawMachines();
    this.saveMachines();
  }

  toggleGrid() {
    this.showGrid = !this.showGrid;
    this.grid.visible = this.showGrid;
  }
  showWalkways(): void {
    this.walkwayGroup.visible = true;
  }

  hideWalkways(): void {
    this.walkwayGroup.visible = false;
  }
  showFence(): void {
    this.fenceGroup.visible = true;
  }
  hideFence(): void {
    this.fenceGroup.visible = false;
  }
  clearMachineGroup() {
    this.machineGroup.traverse(obj => {
      disposeObject(obj);
    });
    this.machineGroup.clear();
    this.machineMeshes.clear();
  }
  //THREE CACHE
  machineMeshes = new Map<string, THREE.Object3D>();
  @ViewChild('rendererContainer')
  rendererContainer!: ElementRef<HTMLDivElement>;
  // THREE CORE 
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  designs: LineDesign[] = [];
  activeDesignId: string | null = null;
  factoryGroup = new THREE.Group();

  groundGroup = new THREE.Group();

  walkwayGroup = new THREE.Group();

  safetyGroup = new THREE.Group();

  utilityGroup = new THREE.Group();
  structureGroup = new THREE.Group();
  fenceGroup = new THREE.Group();

  machineGroup = new THREE.Group();
  conveyorGroup = new THREE.Group();
  lightingGroup = new THREE.Group();
  productGroup = new THREE.Group();
  markingGroup = new THREE.Group();
  layoutManager!: FactoryLayoutManager;
  private floorLayout!: THREE.Group;
  private conveyorPoints: THREE.Vector3[] = [];
  conveyorItems: ConveyorProduct[] = [];
  selectedMachineId: string | null = null;
  isDarkTheme = false;
  // DATA 
  machines: Machine[] = [];
  undoStack: Machine[][] = [];
  redoStack: Machine[][] = [];
  walkways: Walkway[] = [];
  machine: Machine = {
    id: '',
    name: '',
    type: '',
    sequence: 0,
    length: 2,
    width: 2,
    height: 2,
    x: undefined,
    z: undefined,
    rotation: 0,
    status: 'RUNNING'
  };
  // CLEANUP FLAGS 
  private animationId: number | null = null;
  private isFillingRunning = false;
  private bottleSpeed = 0.08;
  private simInterval: number | null = null;
  constructor(
    private api: ApiService,
    private machineRenderService: MachineRenderService,
    private conveyorService: ConveyorService,
    private productionService: ProductionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  private pushState() {
    this.undoStack.push(JSON.parse(JSON.stringify(this.machines)));
    this.redoStack = [];
  }
  private resizeTimeout: any;
  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.initThree();

      this.loadAllDesigns();
      this.productionService.setState(ProductionState.Closure);
      document.documentElement.classList.add('light-theme');

      // this.startSimulation();

      window.addEventListener(
        'fullscreenchange',
        () => {
          requestAnimationFrame(() => this.onResize());
        }
      );

      new ResizeObserver(() => {
        clearTimeout(this.resizeTimeout);

        this.resizeTimeout = setTimeout(() => {
          this.onResize();
          this.frameScene();
        }, 100);

      }).observe(this.rendererContainer.nativeElement);

    }

    this.productionService.state$.subscribe(state => {

      this.productionState = state;

      this.onProductionStateChanged();

    });

  }

  private setGrid(theme: 'light' | 'dark') {

    this.scene.remove(this.grid);

    if (theme === 'dark') {
      this.grid = new THREE.GridHelper(200, 50, 0x555555, 0xaaaaaa);
    } else {
      this.grid = new THREE.GridHelper(200, 50, 0x000000, 0xaaaaaa);
    }

    this.grid.position.y = 0.01;
    this.scene.add(this.grid);
  }
  private setFloor(theme: 'light' | 'dark') {
    if(!this.floor) return;
    const mat = this.floor.material as THREE.MeshStandardMaterial;
    if (theme === 'dark') {
      mat.color.set(0x1a1a1a);
    } else {
      mat.color.set(0x7d7d7d);
    }
    mat.needsUpdate = true;
  }
  private boundClick = this.onClick.bind(this);
  initThree() {
    const container = this.rendererContainer.nativeElement;
    this.scene = new THREE.Scene();

    this.factoryGroup = new THREE.Group();

    this.groundGroup = new THREE.Group();

    this.walkwayGroup = new THREE.Group();

    this.safetyGroup = new THREE.Group();

    this.utilityGroup = new THREE.Group();

    this.fenceGroup = new THREE.Group();

    this.machineGroup = new THREE.Group();

    this.conveyorGroup = new THREE.Group();

    this.productGroup = new THREE.Group();
    // Add sub groups

    this.factoryGroup.add(this.walkwayGroup);
    this.factoryGroup.add(this.safetyGroup);
    this.factoryGroup.add(this.structureGroup);
    this.factoryGroup.add(this.utilityGroup);
    this.factoryGroup.add(this.fenceGroup);
    this.factoryGroup.add(this.markingGroup);
    this.factoryGroup.add(this.machineGroup);
    this.factoryGroup.add(this.conveyorGroup);
    this.factoryGroup.add(this.lightingGroup);
    this.factoryGroup.add(this.productGroup);
    this.scene.add(this.groundGroup);
    this.scene.add(this.factoryGroup);
    this.scene.background = new THREE.Color(0xe8edf2);
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      5000
    );
    this.camera.position.set(50, 60, 50);

    // CREATE RENDERER
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.innerHTML = ''; // prevents duplicate canvas
    container.appendChild(this.renderer.domElement);
    // CONTROLS
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    // GRID (FIXED VISIBILITY)
    this.grid = new THREE.GridHelper(200, 50, 0x000000, 0x999999);
    this.grid.position.y = 0.01;
    this.scene.add(this.grid);
    // ==========================================
    // FACTORY BASE
    // ==========================================

    const base = createFactoryBase();
    this.floor = base.ground.children[0] as THREE.Mesh;
    this.groundGroup.add(base.ground);
    this.factoryGroup.add(base.platform);
    this.floorLayout = createFactoryFloorLayout();

    this.walkwayGroup.add(this.floorLayout);
    this.fenceGroup.add(createFence());

    const pallet = createPalletZone();

    pallet.position.set(

      90,

      0.28,

      35

    );
    this.markingGroup.add(pallet);
    this.layoutManager = new FactoryLayoutManager(

      this.walkwayGroup,

      this.markingGroup,

      this.utilityGroup

    );

    // LIGHTS (IMPORTANT FOR VISIBILITY)
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd9d9d9, 1.8));
    const light = new THREE.DirectionalLight(
      0xffffff,
      2.8
    );


    light.position.set(70, 120, 80);

    light.castShadow = true;

    light.shadow.mapSize.set(4096, 4096);

    light.shadow.camera.left = -150;
    light.shadow.camera.right = 150;
    light.shadow.camera.top = 150;
    light.shadow.camera.bottom = -150;

    this.scene.add(light);
    // START RENDER LOOP
    this.animate();
    this.renderer.domElement.addEventListener(
      'click',
      this.boundClick
    );
  }
toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      this.scene.background = new THREE.Color(0x121212);
      this.setGrid('dark');
      this.setFloor('dark');
      // this.updateMachineColors(0xe5e5e5);
      // this.updateConveyorColor(0xeaeaea);
    } else {
      this.scene.background = new THREE.Color(0xe8edf2);
      this.setGrid('light');
      this.setFloor('light');
      // this.updateMachineColors(0x808080);
      // this.updateConveyorColor(0x222222);
    }
  }
  loadDesigns() {
    const saved = localStorage.getItem('line-designs');
    this.designs = saved ? JSON.parse(saved) : [];
    // auto-select last used design
    const last = localStorage.getItem('active-design-id');
    if (last && this.designs.some(d => d.id === last)) {
      const design = this.designs.find(d => d.id === last)!;
      this.loadDesign(design);
    }
  }
  loadDesign(design: LineDesign) {
    this.activeDesignId = design.id;
    this.activeDesignName = design.name;
    this.machineGroup.clear();
    this.machineMeshes.clear();
    this.api.getMachines(design.id).subscribe({
      next: data => {
        this.machines = data.filter(machine =>
          machine.type &&
          machine.type.trim() !== ''
        );
        this.drawMachines();
            if (this.productionState === ProductionState.Closure) {
        this.updateMachineColors(0xd3d3d3);
    }

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.frameScene();
          });
        });
      }
    });
  }
  deleteSelectedMachine() {
    if (!this.selectedMachineId) return;
    const id = this.selectedMachineId;
    this.machines = this.machines.filter(m => m.id !== id);
    const obj = this.machineMeshes.get(id);
    if (obj) {
      this.machineGroup.remove(obj);
      disposeObject(obj);
      this.machineMeshes.delete(id);
    }
    this.selectedMachineId = null;

    this.drawMachines();
    this.saveMachines();
  }
  newDesign() {
    this.activeDesignId = null;
    this.activeDesignName = '';
    this.machines = [];
    // machines
    this.machineGroup.clear();
    this.machineMeshes.clear();
    // conveyor 
    this.conveyorGroup.traverse(obj => disposeObject(obj));
    this.scene.remove(this.conveyorGroup);
    this.conveyorGroup = new THREE.Group();
    this.scene.add(this.conveyorGroup);
    this.conveyorPoints = [];
    // products
    this.conveyorItems.forEach(p => this.scene.remove(p.mesh));
    this.conveyorItems = [];
    console.log('Empty production line created');
  }
  private productInterval: any;
  renameDesign() {
    const design = this.getActiveDesign();
    if (!design?.id) {
      console.warn("No active design selected");
      return;
    }
    const updatedDesign = {
      ...design,
      name: this.activeDesignName,
      updatedAt: Date.now()
    };
    this.api.saveDesign(updatedDesign).subscribe({
      next: () => {
        this.loadAllDesigns(); // refresh dropdown + UI
      },
      error: err => console.error(err)
    });
  }
  onDesignSelected(designId: string) {
    const design =
      this.designs.find(d => d.id === designId);
    if (!design) return;
    this.loadDesign(design);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    // this.showForm = !this.showForm;
    setTimeout(() => {
      this.onResize();
    }, 0);
  }

  private saveLocalCache() {
    localStorage.setItem('machines', JSON.stringify(this.machines));
    localStorage.setItem('line-designs', JSON.stringify(this.designs));
  }
  saveDesign() {
    if (!this.activeDesignName.trim()) {
      alert('Enter production line name');
      return;
    }
    const design = {
      id: this.activeDesignId ?? crypto.randomUUID(),
      name: this.activeDesignName,
      machines: this.machines
    };
    this.api.saveDesign(design).subscribe({
      next: (res: any) => {
        this.loadAllDesigns();
        this.activeDesignName = design.name;
        this.activeDesignId = res.id ?? design.id;
        localStorage.setItem('active-design-id', this.activeDesignId!);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  loadAllDesigns() {
    this.api.getDesigns().subscribe({
      next: (data: any) => {
        this.designs = data;
        const last = this.activeDesignId;
        if (last) {
          const found = this.designs.find(d => d.id === last);
          if (found) this.loadDesign(found);
        }
      }
    });
  }
  onResize() {
    if (!isPlatformBrowser(this.platformId)) return;
    requestAnimationFrame(() => {
      const container = this.rendererContainer.nativeElement;
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height, true);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    });
  }
  private resizeObserver?: ResizeObserver;
  animate = () => {
    if (!isPlatformBrowser(this.platformId)) return;
    this.animationId = requestAnimationFrame(this.animate);
    if (this.controls) this.controls.update();
    this.blink = Math.floor(Date.now() / 300) % 2 === 0;
    this.machineRenderService.updateMachineStatus(this.machines, this.machineMeshes, this.alarmFocusId, this.blink);
    if (this.renderer && this.scene && this.camera) {
      this.machineGroup.traverse(obj => {

        if (obj instanceof THREE.Sprite) {

          const distance =
            obj.getWorldPosition(new THREE.Vector3())
              .distanceTo(this.camera.position);

          const s = distance * 0.03;

          obj.scale.set(
            s * 4,
            s,
            1
          );

        }

      });
      this.renderer.render(this.scene, this.camera);
    }
    if (this.productionState === ProductionState.Filling) {
      this.updateProducts();

    }
  };
  saveMachines() {
    localStorage.setItem('machines', JSON.stringify(this.machines));
  }
  private boundResize = this.onResize.bind(this);
  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.resizeObserver?.disconnect();
    if (this.simInterval) {
      clearInterval(this.simInterval);
    }

    this.controls?.dispose();
    this.renderer?.dispose();
    this.renderer?.domElement.removeEventListener(
      'click',
      this.boundClick
    );
    if (this.productInterval) {
      clearInterval(this.productInterval);
      this.productInterval = null;
    }
  }
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  onClick(event: MouseEvent) {
    if (!this.renderer || !this.camera) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y =
      -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.machineGroup.children,
      true
    );
    if (intersects.length === 0) return;
    let obj: THREE.Object3D | null =
      intersects[0].object;
    while (obj) {
      const data = obj.userData as { id?: string };
      if (data?.id) {
        this.selectedMachineId = data.id;
        // this.triggerAlarm(data.id);
        const found = this.machines.find(
          m => m.id === data.id
        );
        if (found) {
          this.machine = { ...found };
        }
        return;
      }
      obj = obj.parent;
    }
  }
  startSimulation() {
    this.simInterval = window.setInterval(() => {
      this.machines.forEach(machine => {
        const r = Math.random();
        if (r < 0.5) {
          machine.status = 'ALARM';
        }
        else if (r < 0.7) {
          machine.status = 'STOPPED';
        }
        else {
          machine.status = 'RUNNING';
        }
      });
      this.machineRenderService.updateMachineStatus(this.machines, this.machineMeshes, this.alarmFocusId, this.blink);
    }, 5000);

  }
  updateMachinePosition(m: Machine) {
    const obj = this.machineMeshes.get(m.id);
    if (!obj) return;
    obj.position.set(m.x ?? 0, 2, m.z ?? 0);
    console.log('Machines from backend:', m);
  }
  startInitiation() {
    this.currentProcess = ProductionState.Initiation;
    this.productionService.setState(
      ProductionState.Initiation
    );

  }
  // stopInitiation() {
  //   this.restoreMachineColors();
  //   this.productionService.setState(ProductionState.Idle);
  // }

  startFilling() {
    this.currentProcess = ProductionState.Filling;
    this.productionService.setState(
      ProductionState.Filling
    );

  }

  pauseProduction() {
    this.currentProcess = ProductionState.Paused;
    this.productionService.setState(
      ProductionState.Paused
    );

  }

  startClosure() {
    this.currentProcess = ProductionState.Closure;
    this.productionService.setState(
      ProductionState.Closure
    );

  }
  private onProductionStateChanged(): void {

    switch (this.productionState) {

      case ProductionState.Idle:
        this.machineGroup.traverse(obj => {

          if (!(obj instanceof THREE.Mesh)) return;

          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];

          mats.forEach(mat => {

            if (mat instanceof THREE.MeshStandardMaterial) {

              const original = (mat as any).originalColor;

              if (original) {

                mat.color.copy(original);

              }

            }

          });

        });
        break;

      case ProductionState.Initiation:

        this.restoreMachineColors();

        break;

      case ProductionState.Ready:

        break;

      case ProductionState.Filling:
        if (!this.productInterval) {
          this.productInterval = window.setInterval(() => {

            this.trySpawnProduct();
          }, 700);
        }

        break;

      case ProductionState.Paused: {
        clearInterval(this.productInterval);
        this.productInterval = null;
      }
        break;

      case ProductionState.Closure: {
        clearInterval(this.productInterval);
        this.productInterval = null;
        this.updateMachineColors(0xd3d3d3);
      }
        break;

      case ProductionState.Completed: {
        clearInterval(this.productInterval);
        this.productInterval = null;
      }
        break;

    }

  }
  private createTextSprite(text: string): THREE.Sprite {

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 128;

    const ctx = canvas.getContext('2d')!;

    // -------- Glass background --------
    ctx.fillStyle = 'rgba(25,45,75,0.45)';
    ctx.strokeStyle = 'rgba(255,255,255,0.20)';
    ctx.lineWidth = 2;

    const radius = 18;
    const w = canvas.width - 4;
    const h = canvas.height - 4;

    ctx.beginPath();
    ctx.moveTo(radius, 2);
    ctx.lineTo(w - radius, 2);
    ctx.quadraticCurveTo(w, 2, w, radius);
    ctx.lineTo(w, h - radius);
    ctx.quadraticCurveTo(w, h, w - radius, h);
    ctx.lineTo(radius, h);
    ctx.quadraticCurveTo(2, h, 2, h - radius);
    ctx.lineTo(2, radius);
    ctx.quadraticCurveTo(2, 2, radius, 2);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    // -------- Text --------
    ctx.font = 'bold 60px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';

    ctx.fillText(
      text.toUpperCase(),
      canvas.width / 2,
      canvas.height / 2
    );

    const texture = new THREE.CanvasTexture(canvas);

    texture.minFilter = THREE.LinearFilter;

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false
    });

    const sprite = new THREE.Sprite(material);

    sprite.scale.set(14, 3.5, 1);

    return sprite;
  }
  drawMachines() {

    const existing = new Set(this.machineMeshes.keys());
    this.markingGroup.clear();
    for (const m of this.machines) {
      let obj = this.machineMeshes.get(m.id);
      if (!obj) {
        obj = this.machineRenderService.createMachineShape(m);
        obj.userData = { id: m.id, isMachine: true };
        const label = this.createTextSprite(m.type);
        label.position.set(0, 28, 0);
        obj.add(label);
        this.machineGroup.add(obj);
        this.machineMeshes.set(m.id, obj);
      }
      obj.traverse(child => {

        if (!(child instanceof THREE.Mesh)) return;

        const mat = child.material;

        if (!mat || Array.isArray(mat)) return;

        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;

        if (!(mesh.userData as any).originalColor) {
          (mesh.userData as any).originalColor = material.color.clone();
        }

      });
      if (m.id === this.selectedMachineId) {
        obj.scale.set(1.1, 1.1, 1.1);
      } else {
        obj.scale.set(1, 1, 1);
      }
      // UPDATE POSITION
      obj.position.set(m.x ?? 0, 2, m.z ?? 0);
      const cfg = MACHINE_CONFIG[m.type];
      const boundary = createRectangleMarking(cfg.bodyWidth, cfg.bodyLength);
      obj.rotation.y = THREE.MathUtils.degToRad(
        m.rotation ?? 0
      );
      boundary.position.set(
        m.x ?? 0,
        0.28,
        m.z ?? 0
      );

      this.markingGroup.add(boundary);
      existing.delete(m.id);
    }
    this.machines = this.machines.filter(m =>
      m.type &&
      m.type.trim() !== ''
    );
    // REMOVE DELETED MACHINES
    for (const id of existing) {
      const obj = this.machineMeshes.get(id);
      if (obj) {
        this.machineGroup.remove(obj);
        disposeObject(obj);
        this.machineMeshes.delete(id);
      }
    }
    this.layoutManager.generateLayout(this.machines);
    this.machineRenderService.updateMachineStatus(this.machines, this.machineMeshes, this.alarmFocusId, this.blink);
    this.conveyorPoints = this.conveyorService.drawConveyors(this.machines, this.conveyorGroup);
  }

  private maxProducts = 10;
  private spawnSpacing = 4;
  private trySpawnProduct() {
    if (this.conveyorPoints.length < 2) return;

    if (this.conveyorItems.length >= this.maxProducts) return;

    // check spacing from last product
    const first = this.conveyorItems[this.conveyorItems.length - 1];

    if (first) {
      const start = this.conveyorPoints[0];

      const dist = first.mesh.position.distanceTo(start);

      if (dist < this.spawnSpacing) return;
    }

    this.createProduct();
  }
  private frameScene() {
    if (!this.scene || !this.camera || !this.controls) return;

    const box = new THREE.Box3().setFromObject(this.machineGroup);

    if (!box.isEmpty()) {
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      this.controls.target.copy(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const dist = Math.max(maxDim * 1.5, 20);

      this.camera.position.set(
        center.x + dist,
        dist,
        center.z + dist
      );

      this.camera.lookAt(center);
      this.controls.update();
    }
  }
  updateMachine() {
    const index = this.machines.findIndex(
      m => m.id === this.machine.id
    );
    if (index === -1) return;
    if (!this.machine.type) {
      alert('Machine type missing');
      return;
    }
    this.pushState();
    this.machines[index] = {
      ...this.machine
    };
    this.drawMachines();
    this.saveMachines();
  }
  onDrawerChanged() {
    if (!isPlatformBrowser(this.platformId)) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.onResize();
      });
    });
  }

  private updateConveyorColor(color: number) {

    this.conveyorGroup.traverse((obj: any) => {

      if (!obj.isMesh) return;

      const mats = Array.isArray(obj.material)
        ? obj.material
        : [obj.material];

      mats.forEach((mat: any) => {
        if (mat && mat.color) {
          mat.color.setHex(color);
          mat.needsUpdate = true;
        }
      });

    });

  }
  triggerAlarm(machineId: string, duration: number) {

    this.alarmFocusId = machineId;

    if (this.alarmTimeout) {
      clearTimeout(this.alarmTimeout);
    }

    this.alarmTimeout = setTimeout(() => {
      this.alarmFocusId = null;
    }, duration * 1000);
    this.triggerAlarm(this.selectedAlarmMachineId, this.alarmDuration!);
  }
  startAlarm() {

    if (!this.selectedAlarmMachineId) {
      alert('Please select a machine.');
      return;
    }
    if (this.alarmDuration <= 0) {
      alert('Please enter a valid alarm duration.');
      return;
    }

    this.alarmFocusId = this.selectedAlarmMachineId;

    if (this.alarmTimeout) {
      clearTimeout(this.alarmTimeout);
    }

    this.alarmTimeout = setTimeout(() => {
      this.alarmFocusId = null;
    }, this.alarmDuration * 1000);

  }
  private createProduct() {

    const product = new THREE.Group();

    // =========================
    // Materials
    // =========================

    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8f5ff,
      transparent: true,
      transmission: 0.9,
      roughness: 0.08,
      thickness: 0.4
    });

    const capMat = new THREE.MeshStandardMaterial({
      color: 0xff3b30,
      roughness: 0.45
    });


    // =========================
    // Bottle Body
    // =========================

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.55, 2.2, 32),
      bottleMat
    );

    body.position.y = 3.1;

    product.add(body);

    // =========================
    // Shoulder
    // =========================

    const shoulder = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.48, 0.45, 32),
      bottleMat
    );

    shoulder.position.y = 4.42;

    product.add(shoulder);

    // =========================
    // Neck
    // =========================

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, 0.45, 24),
      bottleMat
    );

    neck.position.y = 4.82;

    product.add(neck);

    // =========================
    // Cap
    // =========================

    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.22, 24),
      capMat
    );

    cap.position.y = 5.15;

    product.add(cap);
    // =========================
    // Bottom Ring
    // =========================

    const bottom = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.03, 10, 30),
      bottleMat
    );

    bottom.rotation.x = Math.PI / 2;
    bottom.position.y = 2.03;

    product.add(bottom);

    // =========================
    // Position
    // =========================
    product.position.copy(this.conveyorPoints[0]);
    product.position.y = 0;

    const world = new THREE.Vector3();
    product.getWorldPosition(world);

    const convWorld = new THREE.Vector3();
    this.conveyorGroup.getWorldPosition(convWorld);

    const prodWorld = new THREE.Vector3();
    this.productGroup.getWorldPosition(prodWorld);
    this.productGroup.add(product);

    this.conveyorItems.push({
      mesh: product,
      segmentIndex: 0,
      t: 0,
      speed: 0.03
    });

  }

  private updateMachineColors(color: number) {
    this.machineGroup.traverse((obj: any) => {

      if (!obj.isMesh) return;

      const apply = (mat: any) => {
        if (mat && mat.color) {
          if (!(mat as any).originalColor) {
            (mat as any).originalColor = mat.color.clone();
          }

          mat.color.setHex(color);
          mat.needsUpdate = true;
        }
      };

      if (Array.isArray(obj.material)) {
        obj.material.forEach(apply);
      } else {
        apply(obj.material);
      }

    });
  }
  private restoreMachineColors() {

    this.machineGroup.traverse(obj => {

      if (!(obj instanceof THREE.Mesh)) return;

      const mats = Array.isArray(obj.material)
        ? obj.material
        : [obj.material];

      mats.forEach(mat => {

        const original = (mat as any).originalColor;

        if (original) {

          mat.color.copy(original);

        }

      });

    });

  }
  private updateProducts() {
    if (!this.conveyorPoints.length) return;
    for (const item of this.conveyorItems) {

      const i = item.segmentIndex;
      const next = i + 1;

      if (next >= this.conveyorPoints.length) {
        item.finished = true;
        this.productGroup.remove(item.mesh);
        continue;
      }

      const start = this.conveyorPoints[i];
      const end = this.conveyorPoints[next];

      item.t += item.speed;

      if (item.t >= 1) {

        item.t = 0;
        item.segmentIndex++;

        continue;
      }
      const newStart = this.conveyorPoints[item.segmentIndex];
      const newEnd = this.conveyorPoints[item.segmentIndex + 1];
      item.mesh.position.lerpVectors(newStart, newEnd, item.t);
      const dir = new THREE.Vector3()
        .subVectors(end, start)
        .normalize();

      // item.mesh.quaternion.setFromUnitVectors(
      //   new THREE.Vector3(0, 1, 0),
      //   dir
      // );
    }
    this.conveyorItems = this.conveyorItems.filter(
      p => !p.finished
    );
  }
  getActiveDesign(): LineDesign | null {
    return this.designs.find(d => d.id === this.activeDesignId) || null;
  }
  deleteDesign() {
    if (!this.activeDesignId) {
      alert('No production line selected');
      return;
    }
    if (!confirm('Delete this production line?')) {
      return;
    }
    this.api.deleteDesign(this.activeDesignId)
      .subscribe({
        next: () => {
          this.activeDesignId = null;
          this.activeDesignName = '';
          this.machines = [];
          this.machineGroup.clear();
          this.machineMeshes.clear();
          this.loadAllDesigns();
        },
        error: err => {
          console.error(err);
        }
      });
  }
  saveMachine() {
    console.log('Adding machine:', this.machine);
    this.pushState();
    const machineCopy: Machine = {
      ...this.machine
    };
    this.machines.push(machineCopy);
    this.drawMachines();
    this.machine = {
      id: '',
      name: '',
      type: '',
      sequence: 0,
      length: 2,
      width: 2,
      height: 2,
      x: null,
      z: null,
      rotation: 0,
      status: 'RUNNING'
    };
  }
}