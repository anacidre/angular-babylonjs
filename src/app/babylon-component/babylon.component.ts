import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Color3,
  StandardMaterial,
  Texture,
  Mesh,
  ParticleSystem,
  Color4 } from '@babylonjs/core';

@Component({
  selector: 'ba-babylon',
  templateUrl: './babylon.component.html',
  styleUrls: ['./babylon.component.css']
})

export class BabylonComponent implements OnInit, AfterViewInit {
  @ViewChild('renderingCanvas') renderingCanvas;

  scene: Scene;
  engine: Engine;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(this.renderingCanvas);
    this.scene = this.createScene(this.renderingCanvas.nativeElement);

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  createScene(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    // Create scene
    const scene = new Scene(this.engine);

    // Create camera
    const camera = new ArcRotateCamera('camera', 0.3, Math.PI / 2, 30.0, new Vector3(), scene);
    camera.attachControl(canvas, true);

    // Create light
  const light = new HemisphericLight('hemiLight', new Vector3(1, 1, 0), scene);
    light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 1, 1);
  light.groundColor = new Color3(0, 0, 0);

    // Create ground
    const groundMaterial = new StandardMaterial('ground', scene);
    groundMaterial.diffuseTexture = new Texture('https://raw.githubusercontent.com/anacidre/angular-babylonjs/master/src/assets/textures/distortion.png', scene);

    const ground = Mesh.CreateGroundFromHeightMap('ground', 'https://raw.githubusercontent.com/anacidre/angular-babylonjs/master/src/assets/textures/distortion.png', 40, 40, 100, -2, -6, scene, false);
    ground.material = groundMaterial;

    // Create giftwrap
    const wrapping = new StandardMaterial('wrapping', scene);
    wrapping.diffuseTexture = new Texture('https://static.vecteezy.com/system/resources/thumbnails/000/139/454/small/red-christmas-fabric-vector-pattern.jpg', scene);

  // Diffuse texture
  const gift = MeshBuilder.CreateBox('gift', {}, scene);
  gift.position.x = 0;
    gift.position.y = -4.8;
    gift.position.z = 0;
  gift.material = wrapping;

    // Create a particle system
    const snowParticleSystem = new ParticleSystem('particles', 5000, scene);

    // Texture of each particle
    snowParticleSystem.particleTexture = new Texture('https://raw.githubusercontent.com/anacidre/angular-babylonjs/master/src/assets/textures/flare.png', scene);

    // Where the particles come from
    snowParticleSystem.emitter = new Vector3(0, 5, 0); // the starting object, the emitter
    snowParticleSystem.minEmitBox = new Vector3(-50, -10, -50); // Starting all from
    snowParticleSystem.maxEmitBox = new Vector3(50, 20, 50); // To...

    // Size of each particle (random between...)
    snowParticleSystem.minSize = 0.1;
    snowParticleSystem.maxSize = 0.5;

    // Color of each particle
    snowParticleSystem.color1 = new Color4(0.38, 0.55, 1, 0.26);
    snowParticleSystem.colorDead = new Color4(0, 0, 0, 0);

    // Particles emitted per second
    snowParticleSystem.emitRate = 1000;

   // Set the gravity of all particles
    snowParticleSystem.gravity = new Vector3(0, -10, 0);

    // Start the particle system
    snowParticleSystem.start();

    return scene;
  }
}
