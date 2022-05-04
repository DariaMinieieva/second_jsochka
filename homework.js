/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Bolognese extends Dish {
    ingridients = ['spaghetti', 'meat', 'tomato'];

    constructor() {
        super(10);
    }

    cookTime() {
        return this.cookingTime
    }
}

class MashedPotatoes extends Dish {
    ingridients = ['potato']

    constructor() {
        super(8);
    }

    cookTime() {
        return this.cookingTime
    }
}

class Steak extends Dish {
    ingridients = ['meat'];

    constructor() {
        super(7);
    }

    cookTime() {
        return this.cookingTime
    }
}

class SteakAndFries extends Dish {
    ingridients = ['meat', 'potato']

    constructor() {
        super(15);
    }

    cookTime() {
        return this.cookingTime
    }
}

class Kitchen {
    insides = [];
    orders = [];

    addToFridge(ingridient) {
        this.insides = ingridient.slice();
    }

    order(dish) {
        let available;
        for (let i in dish.ingridients) {
            available = false;
            for (let j in this.insides) {
                if (dish.ingridients[i] === this.insides[j].name) {
                    if (this.insides[j].checkIngridientAvailable()) {
                        available = true;
                        break;
                    } else {
                        throw new Error("Not enough ingridients in a fridge");
                    }
                }
            }

            if (available === false) {
                throw new Error("Not enough ingridients in a fridge");
            }
        }

        this.removeIngridients(dish.ingridients);

        this.orders.push(dish);
    }

    removeIngridients(list) {
        for (let i in list) {
            for (let j in this.insides) {
                if (list[i] === this.insides[j].name) {
                    this.insides[j].takeIngridient();
                    break;
                }
            }
        }

    }

    async cookFastestOrder() {
        let min_time = this.orders[0].cookTime();
        let ind = 0;

        for (let i = 1; i < this.orders.length; i++) {
            if (this.orders[i].cookTime() < min_time) {
                min_time = this.orders[i].cookTime();
                ind = i;
            }
        }

        return await this.orders.splice(ind, 1)[0]
    }

    async cookAllOrders() {
        let temp = [];

        for (let i in this.orders) {
            temp.push(await this.orders[i].cook());
        }
        this.orders = [];

        return temp
    }
}

class Ingridient {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    takeIngridient() {
        if (this.quantity != 0) {
            this.quantity -= 1;
        } else {
            throw new Error("Not enough ingridients");
        }

    }

    checkIngridientAvailable() {
        if (this.quantity === 0) {
            return false
        } else {
            return true
        }
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    console.log(await kitchen.cookFastestOrder()); // Returns fastest dish to make
    console.log(await kitchen.cookAllOrders()); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
