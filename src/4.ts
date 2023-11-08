class Key {
  private signature = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  private tenants: Person[] = [];
  protected door: boolean = false;

  constructor(protected key: Key) {}

  comeIn(person: Person): void {
    if (!this.door) {
      console.log("Door is close");
      return;
    }

    this.tenants.push(person);

    console.log("Person inside");
  }

  abstract openDoor(key: Key): boolean;
}

class MyHouse extends House {
  openDoor(key: Key): boolean {
    if (key.getSignature() !== this.key.getSignature()) {
      throw new Error("Key to another door");
    }

    return (this.door = true);
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
