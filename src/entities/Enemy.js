import Phaser from 'phaser';
export class Enemy {

    constructor (scene, x, y, pathfinder) {
        this.health = 10;
        this.speed = 100;

        this.detectionRange = 200; //px
        this.attackRange = 30;
        this.time2bite = 500; //ms
        
        this.target = null;
        this.repathInterval = 300; //ms
        this.path = []
        //
        this.nextRepath = 0;

        this.scene = scene;
        this.pathfinder = pathfinder;
        //sprite del enemigo
        this.sprite = scene.physics.add.sprite(x, y, 'enemy');
        this.sprite.setDisplaySize(32, 32);
        //se hace más pequeño para evitar atascarse
        this.sprite.body.setSize(this.sprite.width * 0.8, this.sprite.height * 0.8);
        this.sprite.setImmovable(false);
        this.sprite.setCollideWorldBounds(true);
        
        this.sprite.setData('enemy', this);
        this.isAlive = true;
    }

    update(time, players, delta) {
        if(this.isAlive){
            this.chooseTarget(players, time);

            if (!this.target) {
                this.path = [];
                this.sprite.setVelocity(0, 0);
                return;
            }

            // Recalcular el camino cada cierto tiempo, no cada frame
            if (time >= this.nextRepath) {
                // se calcula añade una pequeña variación al intervalo de calculo de path para evitar que todos se muevan a la vez
                this.nextRepath = time + this.repathInterval + Phaser.Math.Between(-50, 50);
                this.path = this.pathfinder.findPath(
                    this.sprite.x, this.sprite.y,
                    this.target.sprite.x, this.target.sprite.y
                );
            }

            this.move(delta);
        } else {
            //por si se quiere implementar algo para cuando este muerto
        }
    }

    // Elige al jugador vivo más cercano dentro del rango.
    chooseTarget(players, time) {
        if (this.target && this.target.lifeState === 'Alive') {
            const d = this.distanceTo(this.target);
            if (d <= this.detectionRange) return;
        }

        const previous = this.target;
        this.target = null;
        let bestDist = this.detectionRange;

        for (const player of players) {
            if (player.lifeState !== 'Alive') continue;
            const distance = this.distanceTo(player);
            if (distance <= bestDist) {
                bestDist = distance;
                this.target = player;
            }
        }

        //volver a elegir objetivo tras un retraso aleatorio corto, no en este mismo frame
        if (this.target && this.target !== previous) {
            this.nextRepath = time + Phaser.Math.Between(0, this.repathInterval);
        }
    }

    //Calcula la distancia a un jugador
    distanceTo(player) {
        return Phaser.Math.Distance.Between(
            this.sprite.x, this.sprite.y, player.sprite.x, player.sprite.y
        );
    }

    move(delta) {
        // En rango de ataque: parar y atacar
        if (this.distanceTo(this.target) <= this.attackRange) {
            this.sprite.setVelocity(0, 0);
            if(this.time2bite <= 0){
                this.attack(this.target);
            } else{
                this.time2bite -= delta;
            }
            return;

        }

        // Descartar waypoints ya alcanzados
        while (this.path.length > 0 &&
               Phaser.Math.Distance.Between(
                   this.sprite.x, this.sprite.y, this.path[0].x, this.path[0].y) < 4) {
            this.path.shift();
        }

        //parar si ya ha llegado al destino o si el camino es muy largo
        if (this.path.length === 0) {
            this.sprite.setVelocity(0, 0);
            return;
        }

        const next = this.path[0];
        const angle = Math.atan2(next.y - this.sprite.y, next.x - this.sprite.x);
        this.sprite.setVelocity(
            Math.cos(angle) * this.speed,
            Math.sin(angle) * this.speed
        );
        this.sprite.rotation = angle;
    }

    attack(player) {
        player.takeDamage(5);
        this.time2bite = 500;
    }

    takeDamage(dmg, dir) {
        let damageTaken = dmg - this.health;
        this.health = this.health - dmg;
        if(this.health < 0){
            this.health = 0;
            this.die();
        }
        return damageTaken;
        //console.log('enemy_ouch: ' + this.health);
    }

    die() {
        this.isAlive = false;
        this.sprite.body.enable = false;
        this.sprite.setActive(false);
        //this.sprite.destroy();
        this.scene.enemies.pop();
    }
}