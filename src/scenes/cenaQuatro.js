class CenaQuatro extends Phaser.Scene {
  constructor() {
    super({ key: "CenaQuatro" });
  }
  
  preload() {
    this.load.image("selecao", "src/assets/OnBoardd.png")
    this.load.image("closeButton", "src/assets/x.png")
    // Carregamento dos conjuntos de blocos
    this.load.image("tilesOffice", "src/assets/tiled/OfficeInterior.png");
    this.load.image("tilesCity", "src/assets/tiled/JapaneseCityFree.png");

    // Carregamento do mapa
    this.load.tilemapTiledJSON("map", "src/assets/tiled/map.json");

    // Carregamento do plugin do joystick e E da hud
    var url;
    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
    this.load.plugin('rexvirtualjoystickplugin', url, true);
    this.load.image("hudE", "src/assets/botoes/E.png");

    //carregando imagens dos npcs e player
    this.load.spritesheet("player", "src/assets/personagens/spritePlayer.png", { frameWidth: 145, frameHeight: 146 });
    this.load.spritesheet("npc", "src/assets/personagens/npc1.png", { frameWidth: 100, frameHeight: 150 });
    this.load.spritesheet("npcMoreno", "src/assets/personagens/npcMoreno.png", { frameWidth: 145, frameHeight: 146 });
    this.load.spritesheet("npcMulher", "src/assets/personagens/npcMulher.png", { frameWidth: 145, frameHeight: 146 });
    this.load.spritesheet("npcOculos", "src/assets/personagens/npcOculos.png", { frameWidth: 145, frameHeight: 146 });
    this.load.spritesheet("npcAzul", "src/assets/personagens/npcAzul.png", { frameWidth: 145, frameHeight: 146 });

    //carregando imagens dos botões
    this.load.image("elevator2", "src/assets/botoes/elevator.png");
    this.load.image('letraE45','src/assets/botoes/letraE.png');
    this.load.image('letraE46', 'src/assets/botoes/letraE2.png');
    
    //musicas
    this.load.audio('steps', ['src/assets/effects/walking-sounds.mp3']);
    this.load.audio('backgroundSong', ['src/assets/songs/backgroundScenes.mp3']);
    this.load.audio('elevator', ['src/assets/effects/elevator-click.mp3']);
    this.load.audio('congratulations', ['src/assets/effects/congratulations-sound.mp3'])


    //carregando imagem da insígnias
    this.load.image("Insignia_Tata", "src/assets/insignia/InsigniaTata.png");
    this.load.image("Insignia_Olga", "src/assets/insignia/InsigniaOlga.png");
    this.load.image("Insignia_Cayman", "src/assets/insignia/InsigniaCayman.png");
  }
  
  create() {
    // Criação do mapa
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    
    // Carregamento das imagens do mapa
    const officeInterior = map.addTilesetImage("officeInterior", "tilesOffice");
    const cityFree = map.addTilesetImage("japaneseCityFree", "tilesCity");
        
    //carregando imagem player
    this.player = this.physics.add.sprite(1100, 460, "player").setScale(0.2);
    this.player.setDepth(1);

    //carregando imagem npc
    this.npc = this.physics.add.sprite(494, 412, 'npc').setScale(0.23);
    this.npc.setDepth(1);

    this.npcMoreno = this.physics.add.sprite(1100, 615, 'npcMoreno').setScale(0.21);
    this.npcMoreno.setDepth(1);

    this.npcMulher = this.physics.add.sprite(368, 292, 'npcMulher').setScale(0.21);
    this.npcMulher.setDepth(1);

    this.npcOculos = this.physics.add.sprite(940, 145, 'npcOculos').setScale(0.17);
    this.npcOculos.setDepth(1);

    this.npcAzul = this.physics.add.sprite(250, 640, 'npcAzul').setScale(0.21);
    this.npcAzul.setDepth(1);
    
    // Criação das camadas do mapa do tiled
    this.chao = map.createLayer("chao", officeInterior, 0, 0);
    this.paredes = map.createLayer("paredes", officeInterior, 0, 0);
    this.paredesDois = map.createLayer("paredesDois", officeInterior, 0, 0);
    this.paredesTres = map.createLayer("paredesTres", officeInterior, 0, 0);
    this.objetos = map.createLayer("objetos", officeInterior, 0, 0);
    this.objetosCityFree = map.createLayer("objetosCityFree", cityFree, 0, 0);
    this.objetosDois = map.createLayer("objetosDois", officeInterior, 0, 0);
    this.objetosTres = map.createLayer("objetosTres", officeInterior, 0, 0);
    
    //Definindo a colisão com as paredes e objetos
    this.paredes.setCollisionByProperty({ collider: true });
    this.paredesDois.setCollisionByProperty({ collider: true });
    this.paredesTres.setCollisionByProperty({ collider: true });
    this.objetos.setCollisionByProperty({ collider: true });
    this.objetosCityFree.setCollisionByProperty({ collider: true });
    this.objetosDois.setCollisionByProperty({ collider: true });
    this.objetosTres.setCollisionByProperty({ collider: true });
    
    // Colisão com o player e as camadas
    this.physics.add.collider(this.player, this.paredes);
    this.physics.add.collider(this.player, this.paredesDois);
    this.physics.add.collider(this.player, this.paredesTres);
    this.physics.add.collider(this.player, this.objetos);
    this.physics.add.collider(this.player, this.objetosCityFree);
    this.physics.add.collider(this.player, this.objetosDois);
    this.physics.add.collider(this.player, this.objetosTres);

    this.physics.add.collider(this.player, this.npc);
    this.physics.add.collider(this.player, this.npcMoreno);
    this.physics.add.collider(this.player, this.npcMulher);
    this.physics.add.collider(this.player, this.npcOculos);
    this.physics.add.collider(this.player, this.npcAzul);

    // Colisão com o npc e as camadas
    this.physics.add.collider(this.npc, this.paredes);
    this.physics.add.collider(this.npc, this.paredesDois);
    this.physics.add.collider(this.npc, this.paredesTres);
    this.physics.add.collider(this.npc, this.objetos);
    this.physics.add.collider(this.npc, this.objetosCityFree);
    this.physics.add.collider(this.npc, this.objetosDois);
    this.physics.add.collider(this.npc, this.objetosTres);

    this.physics.add.collider(this.npcMoreno, this.paredes);
    this.physics.add.collider(this.npcMoreno, this.paredesDois);
    this.physics.add.collider(this.npcMoreno, this.paredesTres);
    this.physics.add.collider(this.npcMoreno, this.objetos);
    this.physics.add.collider(this.npcMoreno, this.objetosCityFree);
    this.physics.add.collider(this.npcMoreno, this.objetosDois);
    this.physics.add.collider(this.npcMoreno, this.objetosTres);

    this.physics.add.collider(this.npcMulher, this.paredes);
    this.physics.add.collider(this.npcMulher, this.paredesDois);
    this.physics.add.collider(this.npcMulher, this.paredesTres);
    this.physics.add.collider(this.npcMulher, this.objetos);
    this.physics.add.collider(this.npcMulher, this.objetosCityFree);
    this.physics.add.collider(this.npcMulher, this.objetosDois);
    this.physics.add.collider(this.npcMulher, this.objetosTres);

    this.physics.add.collider(this.npcOculos, this.paredes);
    this.physics.add.collider(this.npcOculos, this.paredesDois);
    this.physics.add.collider(this.npcOculos, this.paredesTres);
    this.physics.add.collider(this.npcOculos, this.objetos);
    this.physics.add.collider(this.npcOculos, this.objetosCityFree);
    this.physics.add.collider(this.npcOculos, this.objetosDois);
    this.physics.add.collider(this.npcOculos, this.objetosTres);

    this.physics.add.collider(this.npcAzul, this.paredes);
    this.physics.add.collider(this.npcAzul, this.paredesDois);
    this.physics.add.collider(this.npcAzul, this.paredesTres);
    this.physics.add.collider(this.npcAzul, this.objetos);
    this.physics.add.collider(this.npcAzul, this.objetosCityFree);
    this.physics.add.collider(this.npcAzul, this.objetosDois);
    this.physics.add.collider(this.npcAzul, this.objetosTres);
    
    //teclas de movimentação
    this.cursors = this.input.keyboard.createCursorKeys();

    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: this.cameras.main.width /2.8 ,
      y: this.cameras.main.height /1.8 ,
      radius: 30,
      base: this.add.circle(0, 0, 32, 0x5704a6),
      thumb: this.add.circle(0, 0, 16, 0x3b0073),
      // dir: '8dir',    'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
       forceMin: 16,
       enable: true
    });

    this.joyStick.base.setDepth(2);
    this.joyStick.thumb.setDepth(2);

    this.hudE = this.add.image(this.cameras.main.width /1.5 , this.cameras.main.height /1.8 , "hudE").setScale(0.25);
    this.hudE.setDepth(2);
    this.hudE.setScrollFactor(0);
    this.hudE.setInteractive();

    this.input.keyboard.on('keydown-UP', () => {
      this.hudE.setVisible(false);
      this.joyStick.base.setVisible(false);
      this.joyStick.thumb.setVisible(false);
    });
  
    this.input.keyboard.on('keydown-DOWN', () => {
      this.hudE.setVisible(false);
      this.joyStick.base.setVisible(false);
      this.joyStick.thumb.setVisible(false);
    });
  
    this.input.keyboard.on('keydown-LEFT', () => {
      this.hudE.setVisible(false);
      this.joyStick.base.setVisible(false);
      this.joyStick.thumb.setVisible(false);
    });
  
    this.input.keyboard.on('keydown-RIGHT', () => {
      this.hudE.setVisible(false);
      this.joyStick.base.setVisible(false);
      this.joyStick.thumb.setVisible(false);
    });
    
     //animação do player
     this.anims.create({
      key: 'player_left',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'player_right',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'player_down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'player_up',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'player_stop',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 7,
      repeat: -1
    });

    //animação do npc padrão
    this.anims.create({
      key: 'npc_left',
      frames: this.anims.generateFrameNumbers('npc', { start: 8, end: 11 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'npc_right',
      frames: this.anims.generateFrameNumbers('npc', { start: 12, end: 15 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'npc_down',
      frames: this.anims.generateFrameNumbers('npc', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'npc_up',
      frames: this.anims.generateFrameNumbers('npc', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1
    });


    //animação do npc mulher
    this.anims.create({
      key: 'mulher_left',
      frames: this.anims.generateFrameNumbers('npcMulher', { start: 12, end: 15 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'mulher_right',
      frames: this.anims.generateFrameNumbers('npcMulher', { start: 4, end: 7 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'mulher_down',
      frames: this.anims.generateFrameNumbers('npcMulher', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.create({
      key: 'mulher_up',
      frames: this.anims.generateFrameNumbers('npcMulher', { start: 8, end: 11 }),
      frameRate: 4,
      repeat: -1
    });


    //animação do npc de óculos
    this.anims.create({
      key: 'oculos_left',
      frames: this.anims.generateFrameNumbers('npcOculos', { start: 12, end: 15 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'oculos_right',
      frames: this.anims.generateFrameNumbers('npcOculos', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'oculos_down',
      frames: this.anims.generateFrameNumbers('npcOculos', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'oculos_up',
      frames: this.anims.generateFrameNumbers('npcOculos', { start: 8, end: 11 }),
      frameRate: 6,
      repeat: -1
    });

    //animação do npc azul
    this.anims.create({
      key: 'azul_right',
      frames: this.anims.generateFrameNumbers('npcAzul', { start: 12, end: 15 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'azul_left',
      frames: this.anims.generateFrameNumbers('npcAzul', { start: 8, end: 11 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'azul_down',
      frames: this.anims.generateFrameNumbers('npcAzul', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'azul_up',
      frames: this.anims.generateFrameNumbers('npcAzul', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1
    });

    //animação do npc moreno
    this.anims.create({
      key: 'moreno_left',
      frames: this.anims.generateFrameNumbers('npcMoreno', { start: 12, end: 15 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'moreno_right',
      frames: this.anims.generateFrameNumbers('npcMoreno', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'moreno_down',
      frames: this.anims.generateFrameNumbers('npcMoreno', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'moreno_up',
      frames: this.anims.generateFrameNumbers('npcMoreno', { start: 8, end: 11 }),
      frameRate: 6,
      repeat: -1
    });
        
    // Definir o tamanho da câmera para o tamanho do mapa
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    // Fazer a câmera seguir o jogador
    this.cameras.main.startFollow(this.player);
    
    // Dar zoom na câmera
    this.cameras.main.setZoom(2.5);
    this.letraE45 = this.add.image(1110, 430, 'letraE45').setScale(0.2);
    this.letraE46 = this.add.image(1110, 430, 'letraE46').setScale(0.2);

    // Criar um contêiner para elementos fixos
    this.fixedElementsContainer = this.add.container();

    //adicionando insígnia
    this.insigniaTata = this.add.image(gameState.larguraJogo / 3.2, gameState.alturaJogo / 3.1, "Insignia_Tata").setScale(0.2)
    this.insigniaOlga = this.add.image(gameState.larguraJogo / 2.88, gameState.alturaJogo / 3.1, "Insignia_Olga").setScale(0.2)
    this.insigniaCayman = this.add.image(gameState.larguraJogo / 2.63, gameState.alturaJogo / 3.1, "Insignia_Cayman").setScale(0.2)

    //mantendo insígnia fixa na tela
    this.fixedElementsContainer.add(this.insigniaTata);
    this.fixedElementsContainer.add(this.insigniaOlga);
    this.fixedElementsContainer.add(this.insigniaCayman);
    this.fixedElementsContainer.setScrollFactor(0);  
    this.fixedElementsContainer.setDepth(5);
    
    //Colocando a letra E para piscar
    this.letraE45Interval45 = setInterval(() => {
    this.letraE46.visible = !this.letraE46.visible;
    }, 500);
    
    this.physics.add.overlap(this.player, this.letraE45, () => {
    this.playerOverlappingLetraE45 = true;
    }, null, this);
    
    
    this.input.keyboard.on('keydown-E', () => {
      // Verifica se o botão está habilitado para ser acionado
      if (this.playerOverlappingLetraE45 ) {
        this.elevator.play();
        // Se o botão estiver habilitado pode ser apertado
        this.scene.start("CenaFinal1");
      }
    });

    this.steps = this.sound.add('steps');
    this.steps.play();

    this.backgroundSong = this.sound.add('backgroundSong');

    this.elevator = this.sound.add('elevator');

    this.congratulations = this.sound.add('congratulations');
    this.congratulations.play();

    //INTERAÇÕES PARA O BOTÃO E
    this.hudE.on('pointerdown', () => {
      // Verifica se o botão está habilitado para ser acionado
      if (this.playerOverlappingLetraE45 ) {
        // Se o botão estiver habilitado pode ser apertado
        this.scene.start("CenaFinal1");
      }
    });

    //variáveis para movimentação dos npcs
    this.movNPC = 0;
    this.movNPCmulher = 0;
    this.movNPCoculos = 0;
    this.movNPCazul = 0;
    this.movNPCmoreno = 0;
    this.blackScreen = this.add.image(990, 450, 'selecao').setScale(0.4);
    this.blackScreen.setDepth(3);
    // Inicia o fade in
    this.fadeIn(this.blackScreen, 900); // Argumentos: (objeto, duração em milissegundos)
  
    // Adicionando um botão para fechar a imagem
    this.closeButton = this.add.image(1130, 430, 'closeButton').setScale(0.15).setInteractive(); // Adapte as coordenadas e a imagem do botão conforme necessário
    this.closeButton.setDepth(3);
     // Inicia o fade in
     this.fadeIn(this.closeButton, 900); // Argumentos: (objeto, duração em milissegundos)

    this.closeButton.on('pointerdown', () => {
      this.backgroundSong.play();
    // Inicia o fade out
    this.fadeOut(this.blackScreen, 900); // Argumentos: (objeto, duração em milissegundos)

    // Oculta o botão de fechar
    this.closeButton.setVisible(false);
    });
   }

    // Função para fazer o fade in
    fadeIn(object, duration) {
      object.setAlpha(0); // Define a transparência para completamente transparente
      this.tweens.add({
        targets: object,
        alpha: 1, // Define a transparência para completamente opaco
        duration: duration, // Duração da animação em milissegundos
        ease: 'Linear' // Tipo de easing (interpolação)
      });
    }
  
    // Função para fazer o fade out
    fadeOut(object, duration) {
      object.setAlpha(1); // Define a transparência para completamente opaco
      this.tweens.add({
        targets: object,
        alpha: 0, // Define a transparência para completamente transparente
        duration: duration, // Duração da animação em milissegundos
        ease: 'Linear' // Tipo de easing (interpolação)
      });

      // Inicia o fade in
      this.fadeIn(this.blackScreen, 5000); // Argumentos: (objeto, duração em milissegundos)
  
      // Adicionando um botão para fechar a imagem
      this.closeButton = this.add.image(910, 480, 'closeButton').setScale(0.10).setInteractive(); // Adapte as coordenadas e a imagem do botão conforme necessário
      this.closeButton.on('pointerdown', () => {
        // Inicia o fade out
        this.fadeOut(this.blackScreen, 4000); // Argumentos: (objeto, duração em milissegundos)
  
        // Oculta o botão de fechar
        this.closeButton.setVisible(false);
      });
    }

    // Função para fazer o fade in
    fadeIn(object, duration) {
      object.setAlpha(0); // Define a transparência para completamente transparente
      this.tweens.add({
        targets: object,
        alpha: 1, // Define a transparência para completamente opaco
        duration: duration, // Duração da animação em milissegundos
        ease: 'Linear' // Tipo de easing (interpolação)
      });
    }
  
    // Função para fazer o fade out
    fadeOut(object, duration) {
      object.setAlpha(1); // Define a transparência para completamente opaco
      this.tweens.add({
        targets: object,
        alpha: 0, // Define a transparência para completamente transparente
        duration: duration, // Duração da animação em milissegundos
        ease: 'Linear' // Tipo de easing (interpolação)
    });
    this.blackScreen.setVisible(false)
  }
      
  update() {
    // Definindo o estado inicial do player
    this.player.body.setVelocity(0);

    //Fazendo a movimentação do player com o joystick
    if (this.joyStick.right) {
      this.player.body.setVelocityX(150);

      if (!this.steps.isPlaying) {
        this.steps.play();
      }

      if (this.joyStick.down) {
        this.player.anims.play("player_down", true);
      } else if (this.joyStick.up) {
        this.player.anims.play("player_up", true);
      } else {
        this.player.anims.play("player_right", true);
      }
    }

    if (this.joyStick.left) {
      this.player.body.setVelocityX(-150);

      if (!this.steps.isPlaying) {
        this.steps.play();
      }

      if (this.joyStick.down) {
        this.player.anims.play("player_down", true);
      } else if (this.joyStick.up) {
        this.player.anims.play("player_up", true);
      } else {
        this.player.anims.play("player_left", true);
      }
    }

    if (this.joyStick.up) {
      this.player.body.setVelocityY(-150);

      if (!this.steps.isPlaying) {
        this.steps.play();
      }

      this.player.anims.play("player_up", true);
    }

    if (this.joyStick.down) {
      this.player.body.setVelocityY(150);

      if (!this.steps.isPlaying) {
        this.steps.play();
      }

      this.player.anims.play("player_down", true);
    }

    if (!this.joyStick.right && !this.joyStick.left && !this.joyStick.up && !this.joyStick.down && !this.cursors.left.isDown && this.cursors.right.isDown && this.cursors.up.isDown && this.cursors.down.isDown) {

      if (this.steps.isPlaying) {
        this.steps.stop();
      }

      this.player.anims.play("player_stop", true);
    }

  // Fazendo a movimentação do player com as setas
  if (this.cursors.left.isDown  && !this.blackScreen.visible) {
    this.player.body.setVelocityX(-150);

      if (!this.steps.isPlaying) {
        this.steps.play();
      }

      if (this.cursors.down.isDown) {
        this.player.anims.play("player_down", true);
      } else if (this.cursors.up.isDown) {
        this.player.anims.play("player_up", true);
      } else {
        this.player.anims.play("player_left", true);
      }
    } 
  
  if (this.cursors.right.isDown  && !this.blackScreen.visible) {
    this.player.body.setVelocityX(150);

      if (!this.steps.isPlaying) {
        this.steps.play();
      }

      if (this.cursors.down.isDown) {
        this.player.anims.play("player_down", true);
      } else if (this.cursors.up.isDown) {
        this.player.anims.play("player_up", true);
      } else {
        this.player.anims.play("player_right", true);
      }
    }
  
  if (this.cursors.up.isDown  && !this.blackScreen.visible) {
    this.player.body.setVelocityY(-150);

      if (!this.steps.isPlaying) {
        this.steps.play();
      }

    this.player.anims.play("player_up", true);
  } else if (this.cursors.down.isDown  && !this.blackScreen.visible) {
    this.player.body.setVelocityY(150);

      if (!this.steps.isPlaying) {
        this.steps.play();
      }

    this.player.anims.play("player_down", true);

    }
  
    if (!this.cursors.up.isDown && !this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown && !this.joyStick.right && !this.joyStick.left && !this.joyStick.up && !this.joyStick.down) {

      if (this.steps.isPlaying) {
        this.steps.stop();
      }

      this.player.anims.play("player_stop", true);
    }

    // Lógica para mover o NPC padrão
    if (this.npc.x < 593 && this.npc.y < 415 && this.movNPC === 0) { //caso o npc esteja na posição inicial
      this.npc.setVelocityX(25); //movimenta o npc para a direita
      this.npc.setVelocityY(0); 
      this.npc.anims.play('npc_right', true); //animação do npc para a direita 
    }

    if (this.npc.x > 592 && this.movNPC === 0) { //quando o npc chegar na posição x 592
      this.movNPC++; //incrementa a variável de controle de movimento
    }

    if (this.movNPC === 1 && this.npc.y < 455) { //caso o npc esteja na posição x < 455 e a variável de controle seja 1
      this.npc.setVelocityY(25); //movimenta o npc para baixo
      this.npc.anims.play('npc_down', true); //animação do npc para baixo
    }

    if (this.npc.y > 454 && this.movNPC === 1) { //quando o npc chegar na posição y 454
      this.movNPC++; //incrementa a variável de controle de movimento
    }

    if (this.movNPC === 2) { //caso a variável de controle seja 2
      this.npc.setVelocityY(0); //para a movimentação do npc no eixo y
      
      this.npc.setVelocityX(-25); //movimenta o npc para a esquerda
      this.npc.anims.play('npc_left', true); //animação do npc para a esquerda
    }

    if (this.npc.x < 495 && this.movNPC === 2) {   //quando o npc chegar na posição x 495
      this.movNPC++; //incrementa a variável de controle de movimento
    }

    if (this.movNPC === 3) { //caso a variável de controle seja 3
      this.npc.setVelocityX(0); //para a movimentação do npc no eixo x

      this.npc.setVelocityY(-25); //movimenta o npc para cima
      this.npc.anims.play('npc_up', true); //e da play na animação do npc para cima
    }

    if (this.npc.x > 492 && this.movNPC === 3) { //quando o npc chegar na posição x 492
      this.movNPC++; //incrementa a variável de controle de movimento
    }

    if (this.movNPC === 4) { //caso a variável de controle seja 4
      this.movNPC = 0; //reseta a variável de controle e o loop se reinicia, fazendo um quadrado
    }

    //mesma lógica para NPC Mulher
    if (this.npcMulher.y < 295 && this.npcMulher.x < 370 && this.movNPCmulher === 0) {
      this.npcMulher.setVelocityX(0);
      this.npcMulher.setVelocityY(-40);
      this.npcMulher.anims.play('mulher_up', true);
    }

    if (this.npcMulher.y < 135 && this.movNPCmulher === 0) {
      this.movNPCmulher++;
    }

    if (this.movNPCmulher === 1 && this.npcMulher.x < 380) {
      this.npcMulher.setVelocityX(40);
      this.npcMulher.setVelocityY(0);
      this.npcMulher.anims.play('mulher_right', true);
    }

    if (this.npcMulher.x > 645 && this.movNPCmulher === 1) {
      this.movNPCmulher++;
    }

    if (this.movNPCmulher === 2) {
      this.npcMulher.setVelocityX(0);
      
      this.npcMulher.setVelocityY(40);
      this.npcMulher.anims.play('mulher_down', true);
    }

    if (this.npcMulher.y > 275 && this.movNPCmulher === 2) {  
      this.movNPCmulher++;
    }

    if (this.movNPCmulher === 3) {
      this.npcMulher.setVelocityY(0);

      this.npcMulher.setVelocityX(-40);
      this.npcMulher.anims.play('mulher_left', true); 
    }

    if (this.npcMulher.x > 285 && this.movNPCmulher === 3) {
      this.movNPCmulher++;
    }

    if (this.movNPCmulher === 4) {
      this.movNPCmulher = 0;
    }

    if (this.npcMulher.y < 295 && this.npcMulher.x < 370 && this.movNPCmulher === 0) {
      this.npcMulher.setVelocityX(0);
      this.npcMulher.setVelocityY(-40);
      this.npcMulher.anims.play('mulher_up', true);
    }

    if (this.npcMulher.y < 135 && this.movNPCmulher === 0) {
      this.movNPCmulher++;
    }

    if (this.movNPCmulher === 1 && this.npcMulher.x < 380) {
      this.npcMulher.setVelocityX(40);
      this.npcMulher.setVelocityY(0);
      this.npcMulher.anims.play('mulher_right', true);
    }

    if (this.npcMulher.x > 645 && this.movNPCmulher === 1) {
      this.movNPCmulher++;
    }

    //mesma lógica para NPC de óculos
    if (this.npcOculos.x < 1067 && this.movNPCoculos === 0) {
      this.npcOculos.setVelocityX(-20);
      this.npcOculos.anims.play('oculos_left', true); 
    }

    if (this.npcOculos.x < 940 && this.movNPCoculos === 0) {
      this.movNPCoculos++;
    }

    if (this.movNPCoculos === 1 && this.npcOculos.x < 945) {
      this.npcOculos.setVelocityX(20);
      this.npcOculos.anims.play('oculos_left', false); 
      this.npcOculos.anims.play('oculos_right', true);
    }

    if (this.npcOculos.x > 1060 && this.movNPCoculos === 1) {
      this.movNPCoculos++;
    }

    if (this.movNPCoculos === 2) {
      this.movNPCoculos = 0;
    }

    //mesma lógica para NPC cabelo azul
    if (this.npcAzul.x < 255 && this.movNPCazul === 0) {
      this.npcAzul.setVelocityX(20);
      this.npcAzul.anims.play('azul_right', true);
    }

    if (this.npcAzul.x > 340 && this.movNPCazul === 0) {
      this.movNPCazul++;
    }

    if (this.movNPCazul === 1 && this.npcAzul.x < 345) {
      this.npcAzul.setVelocityX(0);
      this.npcAzul.setVelocityY(-20);

      this.npcAzul.anims.play('azul_up', true);
    }

    if (this.npcAzul.y < 510 && this.movNPCazul === 1) {
      this.movNPCazul++;
    }

    if (this.movNPCazul === 2 && this.npcAzul.y > 320) {
      this.npcAzul.setVelocityY(0);
      this.npcAzul.setVelocityX(-20);

      this.npcAzul.anims.play('azul_left', true);
    }

    if (this.npcAzul.x < 272 && this.movNPCazul === 2) {
      this.movNPCazul++;
    }

    if (this.movNPCazul === 3 && this.npcAzul.x < 272) {
      this.npcAzul.setVelocityX(0);
      this.npcAzul.setVelocityY(-20);

      this.npcAzul.anims.play('azul_up', true);
    }

    if (this.npcAzul.y < 425 && this.movNPCazul === 3) {
      this.movNPCazul++;
    }

    if (this.movNPCazul === 4 && this.npcAzul.y < 425) {
      this.npcAzul.setVelocityY(20);
      this.npcAzul.setVelocityX(0);

      this.npcAzul.anims.play('azul_down', true);
    }

    if (this.npcAzul.y > 505 && this.movNPCazul === 4) {
      this.movNPCazul++;
    }

    if (this.movNPCazul === 5 && this.npcAzul.y > 505) {
      this.npcAzul.setVelocityY(0);
      this.npcAzul.setVelocityX(20);

      this.npcAzul.anims.play('azul_right', true);
    }

    if (this.npcAzul.x > 345 && this.movNPCazul === 5) {
      this.movNPCazul++;
    }

    if (this.movNPCazul === 6 && this.npcAzul.x > 345) {
      this.npcAzul.setVelocityX(0);
      this.npcAzul.setVelocityY(20);

      this.npcAzul.anims.play('azul_down', true);
    }

    if (this.npcAzul.y > 640 && this.movNPCazul === 6) {
      this.movNPCazul++;
    }

    if (this.movNPCazul === 7 && this.npcAzul.y > 640) {
      this.npcAzul.setVelocityY(0);
      this.npcAzul.setVelocityX(-20);

      this.npcAzul.anims.play('azul_left', true);
    }

    if (this.npcAzul.x < 245 && this.movNPCazul === 7) {
      this.movNPCazul++;
    }

    if (this.movNPCazul === 8 && this.npcAzul.x < 245) {
      this.movNPCazul = 0;
    }

    //mesma lógica para NPC moreno
    if (this.npcMoreno.x < 1110 && this.npcMoreno.y < 645 && this.movNPCmoreno === 0) {
      this.npcMoreno.setVelocityX(-35);
      this.npcMoreno.setVelocityY(0);
 
      this.npcMoreno.anims.play('moreno_right', true);
      this.npcMoreno.flipX = true;  
    }

    if (this.npcMoreno.x < 995 && this.movNPCmoreno === 0) {
      this.movNPCmoreno++;
    }

    if (this.movNPCmoreno === 1 && this.npcMoreno.y > 600) {
      this.npcMoreno.setVelocityX(0);
      this.npcMoreno.setVelocityY(-35);

      this.npcMoreno.anims.play('moreno_up', true);
    }

    if (this.npcMoreno.y < 485 && this.movNPCmoreno === 1) {
      this.movNPCmoreno++;
    }

    if (this.movNPCmoreno === 2 && this.npcMoreno.y < 485) {
      this.npcMoreno.setVelocityY(0);
      this.npcMoreno.setVelocityX(35);

      this.npcMoreno.anims.play('moreno_left', true);
    }

    if (this.npcMoreno.x > 1110 && this.movNPCmoreno === 2) {
      this.movNPCmoreno++;
    }

    if (this.movNPCmoreno === 3 && this.npcMoreno.x > 1110) {
      this.npcMoreno.setVelocityX(-35);
 
      this.npcMoreno.anims.play('moreno_right', true);
    }

    if (this.npcMoreno.x < 995 && this.movNPCmoreno === 3) {
      this.movNPCmoreno++;
    }

    if (this.movNPCmoreno === 4 && this.npcMoreno.x < 995) {
      this.npcMoreno.setVelocityX(0);
      this.npcMoreno.setVelocityY(35);

      this.npcMoreno.anims.play('moreno_down', true);
    }

    if (this.npcMoreno.y > 625 && this.movNPCmoreno === 4) {
      this.movNPCmoreno++;
    }

    if (this.movNPCmoreno === 5 && this.npcMoreno.y > 625) {
      this.npcMoreno.setVelocityY(0);
      this.npcMoreno.setVelocityX(35);

      this.npcMoreno.anims.play('moreno_left', true);
    }

    if (this.npcMoreno.x > 1095 && this.movNPCmoreno === 5) {
      this.movNPCmoreno++;
    }

    if (this.movNPCmoreno === 6 && this.npcMoreno.x > 1095) {
      this.movNPCmoreno = 0;
    }
    
    // Verifique se o jogador está se sobrepondo ao dinossauro
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.letraE45.getBounds())) {
      this.playerOverlappingLetraE45 = true;
    } else {
      this.playerOverlappingLetraE45 = false;  
    } 
  }
}
