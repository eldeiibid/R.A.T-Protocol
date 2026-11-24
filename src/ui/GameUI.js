import { UIElement } from "./UIElement";

export class GameUI {
    constructor(scene){
        this.scene = scene;
        this.player1 = this.scene.player1;
        this.player2 = this.scene.player2;

        this.P1HealthBar = this.scene.add.rectangle(
            20, 10,
            200, 20,
            0x00FF00
        );
        this.P1HealthBar.setOrigin(0, 0.5);
        this.P2HealthBar = this.scene.add.rectangle(
            780, 10,
            200, 20,
            0x00FF00
        );
        this.P2HealthBar.setOrigin(1, 0.5);

        this.P1ArmourBar = this.scene.add.rectangle(
            20, 30,
            200, 10,
            0x8C8C8C
        );
        this.P1ArmourBar.setOrigin(0, 0.5);
        this.P2ArmourBar = this.scene.add.rectangle(
            780, 30,
            200, 10,
            0x8C8C8C
        );
        this.P2ArmourBar.setOrigin(1, 0.5);

        this.P1Inventory = this.scene.add.sprite(
            20, 40,
            'PLACEHOLDERIMG'
        );
        this.P1Inventory.setOrigin(0, 0);
        this.P1Inventory.displayHeight = 40;
        this.P1Inventory.displayWidth = 200;
        this.P1Inventory.setTint(0x8C8C8C);
        this.P1Inventory.items = [null,null,null,null,null];
        for(var i = 0; i < 5; i++){
            this.P1Inventory.items[i] = new UIElement(this.scene, this.P1Inventory.x + 40*i + 4,this.P1Inventory.y + 4, 'PLACEHOLDERIMG');
        }
        this.P2Inventory = this.scene.add.sprite(
            580, 40,
            'PLACEHOLDERIMG'
        );
        this.P2Inventory.setOrigin(0, 0);
        this.P2Inventory.displayHeight = 40;
        this.P2Inventory.displayWidth = 200;
        this.P2Inventory.setTint(0x8C8C8C);
        this.P2Inventory.items = [null,null,null,null,null];
        for(var i = 0; i < 5; i++){
            this.P2Inventory.items[i] = new UIElement(this.scene, this.P2Inventory.x + 40*i,this.P1Inventory.y, 'PLACEHOLDERIMG');
        }
        
        this.P1Ammo = this.scene.add.text(
            220, 10,
            this.player1.ammo
        );

        this.P1Interaction = this.scene.add.rectangle(
            250, 80,
            40, 40,
            0xffffff
        );
        this.P1Interaction.setOrigin(0.5, 0);
        this.P1Interaction.setVisible(false);

        this.P2Interaction = this.scene.add.rectangle(
            550, 80,
            40, 40,
            0xffffff
        );
        this.P2Interaction.setOrigin(0.5, 0);
        this.P2Interaction.setVisible(false);
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
                this.P1Inventory.items[i].element.setTint(0x00FF00);
                this.P1Inventory.items[i].turnOn(true);
            } else if(this.player1.items[i] === 'armourPiece'){
                this.P1Inventory.items[i].setSprite('armor');
                this.P1Inventory.items[i].element.setTint(0x4D4D4D);
                this.P1Inventory.items[i].turnOn(true);
            } else {
                this.P1Inventory.items[i].turnOn(false);
            }
        }
        for(var i = 0; i < this.P2Inventory.items.length; i++){
            if(this.player2.items[i] === 'medPack'){
                this.P2Inventory.items[i].setSprite('medkit');
                this.P2Inventory.items[i].element.setTint(0x00FF00);
                this.P2Inventory.items[i].turnOn(true);
            } else if(this.player2.items[i] === 'armourPiece'){
                this.P2Inventory.items[i].setSprite('armor');
                this.P2Inventory.items[i].element.setTint(0x4D4D4D);
                this.P2Inventory.items[i].turnOn(true);
            } else {
                this.P2Inventory.items[i].turnOn(false);
            }
        }
    }

    updateAmmo(){
        if (this.player1.actionState === 'Reloading'){
            this.P1Ammo.setText('Reloading...');
        }else {
        this.P1Ammo.setText(this.player1.ammo);

        }
    }

    updateInteract(){
        let progress;

        switch(this.player1.actionState){
            case 'Interacting':
                this.P1Interaction.setVisible(true);
                progress = -(this.player1.interactionProgress + 1) / (this.player1.interactingObject.interactionTime+1);
                this.P1Interaction.height = 40 * progress;
                break;
            case 'HealingSelf':
                this.P1Interaction.setVisible(true);
                progress = -((2500) - (this.player1.healSelfProgress) + 1) / (2500+1);
                this.P1Interaction.height = 40 * progress;
                break;
            case 'HealingOther':
                this.P1Interaction.setVisible(true);
                progress = -((1500) - (this.player1.healFriendProgress) + 1) / (1500+1);
                this.P1Interaction.height = 40 * progress;
                break;
            default:
                this.P1Interaction.setVisible(false);
                break;
        };

        switch(this.player2.actionState){
            case 'Interacting':
                this.P2Interaction.setVisible(true);
                progress = -(this.player2.interactionProgress + 1) / (this.player2.interactingObject.interactionTime+1);
                this.P2Interaction.height = 40 * progress;
                break;
            case 'HealingSelf':
                this.P2Interaction.setVisible(true);
                progress = -((2500) - (this.player2.healSelfProgress) + 1) / (2500+1);
                this.P2Interaction.height = 40 * progress;
                break;
            case 'HealingOther':
                this.P2Interaction.setVisible(true);
                progress = -((1500) - (this.player2.healFriendProgress) + 1) / (1500+1);
                this.P2Interaction.height = 40 * progress;
                break;
            default:
                this.P2Interaction.setVisible(false);
                break;
        };
    }
}