function Weapon(type,power,duration,cooldur,color) {
    this.type = type;
    this.power = power;
    this.duration = duration;
    this.left = duration;
    this.firing = false;
    this.color = color;
    // randomize color
    //this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    this.cooldown = false;
    this.cooldur = cooldur;
    this.target = null;
    this.canShoot = function() {
		return (this.left > 0 && !this.cooldown);
    };

    this.update = function() {
		if (this.cooldown) {
		    this.left ++;
		    if (this.left >= this.duration*this.cooldur) {
			this.left = this.duration;
			this.cooldown = false;
		    }
		}
	
		if (this.firing) {
		    this.left -= 1;
		    if (this.left <= 0) {
			this.left = 0;
			this.cooldown = true;
			this.firing = false;
		    }
		}
    };
}
