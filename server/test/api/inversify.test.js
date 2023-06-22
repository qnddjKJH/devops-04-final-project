import { Container, injectable, decorate, inject } from 'inversify';
import 'reflect-metadata';

const TYPES = {
  Ninja: 'Ninja',
  Katana: 'Katana',
  Shuriken: 'Shuriken',
};

class Katana {
  hit() {
    return 'cut!';
  }
}

class Shuriken {
  throw() {
    return 'hit!';
  }
}

class Ninja {
  constructor(katana, shuriken) {
    this._katana = katana;
    this._shuriken = shuriken;
  }
  fight() {
    return this._katana.hit();
  }
  sneak() {
    return this._shuriken.throw();
  }
}

describe('inversify', () => {
  test('run inversify container', async () => {
    // given
    // Declare bindings
    const container = new Container();
    container.bind(TYPES.Ninja).to(Ninja);
    container.bind(TYPES.Katana).to(Katana);
    container.bind(TYPES.Shuriken).to(Shuriken);

    // Declare as injectable and its dependencies
    decorate(injectable(), Katana);
    decorate(injectable(), Shuriken);
    decorate(injectable(), Ninja);
    decorate(inject(TYPES.Katana), Ninja, 0);
    decorate(inject(TYPES.Shuriken), Ninja, 1);

    // when
    // Resolve dependencies
    const ninja = container.get(TYPES.Ninja);

    // then
    expect(ninja.fight()).toBe('cut!');
    expect(ninja.sneak()).toBe('hit!');
  });
});
