import Phaser from 'phaser';
export class Enemy {

    constructor (scene, id, x, y, pathfinder) {
        this.health = 100;
        this.speed = 125;
        this.id = id;

        this.detectionRange = 200; //px
        this.attackRange = 30;
        this.time2bite = 500; //ms
        
        this.target = null;
        this.repathInterval = 300; //ms
        this.path = []
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
        if (!this.isAlive) return;

        this.chooseTarget(players, time);

        if (!this.target) {
            // sin objetivo: termina el camino que llevaba (última posición conocida) y se para
            this.followPath();
            return;
        }

        if (time >= this.nextRepath) {
            this.nextRepath = time + this.repathInterval + Phaser.Math.Between(-50, 50);
            const newPath = this.pathfinder.findPath(
                this.sprite.x, this.sprite.y,
                this.target.sprite.x, this.target.sprite.y
            );
            
            if (newPath) this.path = newPath;
        }
        this.move(delta);
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
        const d = this.distanceTo(this.target);

        // En rango de ataque: parar, mirar al objetivo y morder
        if (d <= this.attackRange) {
            this.sprite.setVelocity(0, 0);
            this.sprite.rotation = Phaser.Math.Angle.Between(
                this.sprite.x, this.sprite.y,
                this.target.sprite.x, this.target.sprite.y
            );
            if (this.time2bite <= 0) {
                this.attack(this.target);
            } else {
                this.time2bite -= delta;
            }
            return;
        }

        if (this.followPath()) return;

        // Sin waypoints pero cerca (mismo tile que el jugador): ir directo, es seguro
        if (d < this.pathfinder.tileW * 1.5) {
            this.moveToward(this.target.sprite.x, this.target.sprite.y);
        } else {
            this.sprite.setVelocity(0, 0);
        }
    }

    // Sigue los waypoints. Devuelve false si no queda ninguno.
    followPath() {
        while (this.path.length > 0 &&
            Phaser.Math.Distance.Between(
                this.sprite.x, this.sprite.y, this.path[0].x, this.path[0].y) < 4) {
            this.path.shift();
        }

        if (this.path.length === 0) {
            this.sprite.setVelocity(0, 0);
            return false;
        }

        this.moveToward(this.path[0].x, this.path[0].y);
        return true;
    }

    moveToward(x, y) {
        const angle = Math.atan2(y - this.sprite.y, x - this.sprite.x);
        this.sprite.setVelocity(Math.cos(angle) * this.speed, Math.sin(angle) * this.speed);
        this.sprite.rotation = angle;
    }

    attack(player) {
        player.takeDamage(10);
        this.time2bite = 500;
    }

    takeDamage(dmg) {
        this.health = this.health - dmg;
        this.cooldownTime = 100;

        if(this.health <= 0){
            this.health = 0;
            this.die();
        }
        this.flashDamage();
        console.log('enemy' + this.id + ' hp: ' + this.health);

    }

    //flasheo al recibir daño
    flashDamage(duration = 100) {
        this.sprite.setTint(0xff0000); //rojo

        // Si recibe otro golpe durante el flasheo, reiniciar temporizador
        if (this.flashTimer) this.flashTimer.remove(false);

        this.flashTimer = this.scene.time.delayedCall(duration, () => {
            if (this.sprite && this.sprite.active) this.sprite.clearTint();
            this.flashTimer = null;
        });
    }

    die() {
        this.isAlive = false;
        this.sprite.body.enable = false;
        this.sprite.setActive(false);
        this.sprite.destroy();
    }
}