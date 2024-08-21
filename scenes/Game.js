export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("Fondo", "./public/Fondo.png");
    this.load.image("pala", "./public/PtoYotube.png");
    this.load.image("Marcos", "./public/Marcos.png");
    this.load.image("obstaculo", "./public/Rectanguloso.png");
    this.load.image("Rojo", "./public/red.png");
  }

  create() {
    //Fondo
    this.Fondo = this.add.image(400, 100, "Fondo");

        //Particulas
    /* emmit particles from logo
    const emitter = this.add.particles(0, 0, "Rojo", {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    emitter.startFollow(Marcos);*/
  

    // Tabla
    this.pala = this.physics.add.image(400, 550, "pala").setImmovable().setScale(0.3);
    this.pala.body.allowGravity = false;

    // La BOLA
    this.pelota = this.physics.add.image(400, 300, "Marcos");
    this.pelota.setCollideWorldBounds(true);
    this.pelota.setBounce(1, 1);
    this.pelota.setVelocity(150, 150);

    // Bloques
    this.obstaculo = this.physics.add.image(400, 200, "obstaculo").setScale(2);
    this.obstaculo.setImmovable();
    this.obstaculo.body.allowGravity = false;

    // Colisiones
    this.physics.add.collider(this.pelota, this.pala);
    this.physics.add.collider(this.pelota, this.obstaculo, this.destruirObstaculo, null, this);

    // Mover la palo con el mouse
    this.input.on("pointermove", (pointer) => {
      this.pala.x = pointer.x;

      // límites del mundo
      this.pala.x = Phaser.Math.Clamp(this.pala.x, 52, 748);
    });
  }

  destruirObstaculo(pelota, obstaculo) {
    obstaculo.disableBody(true, true);
  }

  update() {
    
  }
}
