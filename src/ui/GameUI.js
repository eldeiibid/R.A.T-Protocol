import { UIElement } from "./UIElement";

export class GameUI {
    constructor(scene){
        this.scene = scene;
        this.player1 = this.scene.player1;
        this.player2 = this.scene.player2;

        this.LevelText = this.scene.add.text(
            375, 80,
            'LEVEL ' + (this.scene.levelIndex + 1),
            {color: 'yellow'}
        );

        this.P1Weapon = new UIElement(this.scene, 225, 0, 'bluePistol');

        this.P2Weapon = new UIElement(this.scene, 500, 0, 'redBat');

        this.P1Ammo = this.scene.add.text(
            265, 45,
            'P1state'
        );

        this.P1DamageBar = this.scene.add.rectangle(
            20, 15,
            200, 20,
            0xFF0000
        );
        this.P1DamageBar.setOrigin(0, 0.5);

        this.P1HealthBar = this.scene.add.rectangle(
            20, 15,
            200, 20,
            0x00FF00
        );
        this.P1HealthBar.setOrigin(0, 0.5);

        this.P2DamageBar = this.scene.add.rectangle(
            780, 15,
            200, 20,
            0xFF0000
        );
        this.P2DamageBar.setOrigin(1, 0.5);

        this.P2HealthBar = this.scene.add.rectangle(
            780, 15,
            200, 20,
            0x00FF00
        );
        this.P2HealthBar.setOrigin(1, 0.5);

        this.P1ArmourBar = this.scene.add.rectangle(
            20, 35,
            200, 10,
            0x8C8C8C
        );
        this.P1ArmourBar.setOrigin(0, 0.5);

        this.P2ArmourBar = this.scene.add.rectangle(
            780, 35,
            200, 10,
            0x8C8C8C
        );
        this.P2ArmourBar.setOrigin(1, 0.5);

        this.P1Name = this.scene.add.text(
            20, 45,
            'P1',
            {color: 'lightblue'}
        );

        this.P2Name = this.scene.add.text(
            580, 45,
            'P2',
            {color: 'red'}
        );

        this.P1State = this.scene.add.text(
            45, 45,
            this.player1.actionState
        );

        this.P2State = this.scene.add.text(
            605, 45,
            this.player2.actionState
        );

        this.P1Inventory = this.scene.add.sprite(
            20, 60,
            'inventory'
        );
        this.P1Inventory.setOrigin(0, 0);
        this.P1Inventory.items = [null,null,null,null,null];
        for(var i = 0; i < 5; i++){
            this.P1Inventory.items[i] = new UIElement(this.scene, this.P1Inventory.x + 40*i + 4,this.P1Inventory.y + 4);
        }

        this.P2Inventory = this.scene.add.sprite(
            580, 60,
            'inventory'
        );
        this.P2Inventory.setOrigin(0, 0);
        this.P2Inventory.items = [null,null,null,null,null];
        for(var i = 0; i < 5; i++){
            this.P2Inventory.items[i] = new UIElement(this.scene, this.P2Inventory.x + 40*i + 4,this.P1Inventory.y + 4);
        }

        this.P1InteractionBar = this.scene.add.rectangle(
            250, 100,
            40, 40,
            0xffffff
        );
        this.P1InteractionBar.setOrigin(0.5, 0);
        this.P1InteractionBar.setVisible(false);

        this.P2InteractionBar = this.scene.add.rectangle(
            550, 100,
            40, 40,
            0xffffff
        );
        this.P2InteractionBar.setOrigin(0.5, 0);
        this.P2InteractionBar.setVisible(false);
    }

    update(){
        this.updateHealth();
        this.updateAmmo();
        this.updateItems();
        this.updateInteract();
    }

    updateHealth(){
        let Percentage;

        Percentage = this.player1.health / 100;
        //this.P1HealthBar.sprite.setCrop(0, 0.5, Percentage * 200, 20)
        this.P1HealthBar.width = 200 * Percentage;
        Percentage = this.player2.health / 100;
        this.P2HealthBar.width = 200 * Percentage;
        
        Percentage = this.player1.armour / 100;
        this.P1ArmourBar.width = 200 * Percentage;
        Percentage = this.player2.armour / 100;
        this.P2ArmourBar.width = 200 * Percentage;
    }

    updateItems(){

        for(var i = 0; i < this.P1Inventory.items.length; i++){
            if(this.player1.items[i] === 'medPack'){
                this.P1Inventory.items[i].setSprite('medkit');
                this.P1Inventory.items[i].turnOn(true);
            } else if(this.player1.items[i] === 'armourPiece'){
                this.P1Inventory.items[i].setSprite('armor');
                this.P1Inventory.items[i].turnOn(true);
            } else {
                this.P1Inventory.items[i].turnOn(false);
            }
        }
        for(var i = 0; i < this.P2Inventory.items.length; i++){
            if(this.player2.items[i] === 'medPack'){
                this.P2Inventory.items[i].setSprite('medkit');
                this.P2Inventory.items[i].turnOn(true);
            } else if(this.player2.items[i] === 'armourPiece'){
                this.P2Inventory.items[i].setSprite('armor');
                this.P2Inventory.items[i].turnOn(true);
            } else {
                this.P2Inventory.items[i].turnOn(false);
            }
        }
    }

    updateAmmo(){
        this.P1Ammo.setText('x'+this.player1.ammo);
    }

    updateInteract(){
        let progress;

        switch(this.player1.actionState){
            case 'Interacting':
                this.P1InteractionBar.setVisible(true);
                progress = -(this.player1.interactionProgress + 1) / (this.player1.interactingObject.interactionTime+1);
                this.P1InteractionBar.height = 40 * progress;
                this.P1State.setText('Pulling Lever...');
                break;
            case 'HealingSelf':
                this.P1InteractionBar.setVisible(true);
                progress = -((2500) - (this.player1.healSelfProgress) + 1) / (2500+1);
                this.P1InteractionBar.height = 40 * progress;
                this.P1State.setText('Healing Self...');
                break;
            case 'HealingOther':
                this.P1InteractionBar.setVisible(true);
                progress = -((1500) - (this.player1.healFriendProgress) + 1) / (1500+1);
                this.P1InteractionBar.height = 40 * progress;
                this.P1State.setText('Healing Partner...');
                break;
            case 'Reloading':
                this.P1State.setText('Reloading...');
                break;
            default:
                this.P1InteractionBar.setVisible(false);
                this.P1State.setText('');
            break;
            
        };
        

        switch(this.player2.actionState){
            case 'Interacting':
                this.P2InteractionBar.setVisible(true);
                progress = -(this.player2.interactionProgress + 1) / (this.player2.interactingObject.interactionTime+1);
                this.P2InteractionBar.height = 40 * progress;
                this.P2State.setText('Pulling Lever...');
                break;
            case 'HealingSelf':
                this.P2InteractionBar.setVisible(true);
                progress = -((2500) - (this.player2.healSelfProgress) + 1) / (2500+1);
                this.P2InteractionBar.height = 40 * progress;
                this.P2State.setText('Healing Self...');
                break;
            case 'HealingOther':
                this.P2InteractionBar.setVisible(true);
                progress = -((1500) - (this.player2.healFriendProgress) + 1) / (1500+1);
                this.P2InteractionBar.height = 40 * progress;
                this.P2State.setText('Healing Partner...');
                break;
            default:
                this.P2InteractionBar.setVisible(false);
                this.P2State.setText('');
                break;
        };
    }
}