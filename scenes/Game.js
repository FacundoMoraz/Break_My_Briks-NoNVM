export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
    this.velocidadInicial = 150; // Velocidad inicial
  }

  preload() {
    this.load.image("Fondo", "./public/Fondo.png");
    this.load.image("pala", "./public/PtoYotube.png");
    this.load.image("Marcos", "./public/Marcos.png");
    this.load.image("obstaculo", "./public/Rectanguloso.png");
    this.load.image("Rojo", "./public/red.png");
  }

  create() {
    // Fondo
    this.Fondo = this.add.image(400, 180, "Fondo");

    // Tabla
    this.pala = this.physics.add.image(400, 550, "pala").setImmovable().setScale(0.3);
    this.pala.body.allowGravity = false;

    // La BOLA
    this.pelota = this.physics.add.image(400, 280, "Marcos");
    this.pelota.setCollideWorldBounds(true);
    this.pelota.setBounce(1, 1);
    this.pelota.setVelocity(this.velocidadInicial, this.velocidadInicial);

    // NUEVO: Crear una matriz de ladrillos rompibles (NxM) manualmente
    this.ladrillos = this.physics.add.staticGroup();
    this.crearLadrillos();

    // Colisiones
    this.physics.add.collider(this.pelota, this.pala);
    this.physics.add.collider(this.pelota, this.ladrillos, this.destruirLadrillo, null, this);

    // NUEVO: Inicializar la puntuación
    this.puntuacion = 0;
    this.puntuacionTexto = this.add.text(16, 16, "Puntos: 0", { fontSize: "32px", fill: "#fff" });

    // Mover la palo con el mouse
    this.input.on("pointermove", (pointer) => {
      this.pala.x = pointer.x;
      this.pala.x = Phaser.Math.Clamp(this.pala.x, 52, 748);
    });
  }

  crearLadrillos() {
    //Fila 1
    this.ladrillos.create(80, 180, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(160, 180, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(240, 180, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(320, 180, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(400, 180, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(480, 180, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(560, 180, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(640, 180, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(720, 180, "obstaculo").setScale(1).refreshBody();

    // Fila 2
    this.ladrillos.create(80, 230, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(160, 230, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(240, 230, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(320, 230, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(400, 230, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(480, 230, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(560, 230, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(640, 230, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(720, 230, "obstaculo").setScale(1).refreshBody();

    //Fila 3
    this.ladrillos.create(80, 280, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(160, 280, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(240, 280, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(320, 280, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(400, 280, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(480, 280, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(560, 280, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(640, 280, "obstaculo").setScale(1).refreshBody();
    this.ladrillos.create(720, 280, "obstaculo").setScale(1).refreshBody();

  }

  destruirLadrillo(pelota, ladrillo) {
    ladrillo.disableBody(true, true);
    this.puntuacion += 10;
    this.puntuacionTexto.setText("Puntos: " + this.puntuacion);

    // Verificar si todos los ladrillos estan rotos
    if (this.ladrillos.countActive() === 0) {
      this.velocidadInicial *= 1.1; // Aumentar la velocidad para la siguiente ronda
      this.scene.restart({ puntuacion: this.puntuacion, velocidadInicial: this.velocidadInicial });
    }
  }

  init(data) {
    if (data.puntuacion !== undefined) {
      this.puntuacion = data.puntuacion;
    }
    if (data.velocidadInicial !== undefined) {
      this.velocidadInicial = data.velocidadInicial;
    }
  }

  update() {
  }
}
