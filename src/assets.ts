import { AnimatedSprite, Loader, Texture } from "pixi.js";

const PEOPLE_ASSET_PATH = './assets/sprites/people';

export const createAnimatedSprite = (name: string) => {
  const textures = Array(3).fill(null)
    .map((x, i) => getCharacterId(name, '0' + (i + 1)))
    .map(x => Texture.from(x));

  const animatedSprite = new AnimatedSprite(textures);
  animatedSprite.animationSpeed = 10 / 60;
  animatedSprite.play();

  return animatedSprite;
}

export const getRandomCharacterSprite = () => {
  const id = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  return createAnimatedSprite(id);
}

export const CHARACTER_ASSETS_IDS = {
  'AngstyHank': ['B', 'F', 'L', 'R'],
  'EmptySteve': ['01', '02', '03'],
  'ManlyMan': ['01', '02', '03', 'smile'],
  'ShoppingJanine': ['01', '02', '03'],
  'SkatingSam': ['01', '02', '03'],
  'FranticFrancine': ['01', '02', '03'],
}

export const CHARACTERS = ['EmptySteve', 'ManlyMan', 'ShoppingJanine', 'SkatingSam', 'FranticFrancine'] as const;

export const getCharacterId = (character: string, id: string) => {
  return PEOPLE_ASSET_PATH + '/' + character + '_' + id + '.png';
}

export const getPlayerSprite = () => {
  return {
    R: Loader.shared.resources[getCharacterId('AngstyHank', 'R')],
    L: Loader.shared.resources[getCharacterId('AngstyHank', 'L')],
    F: Loader.shared.resources[getCharacterId('AngstyHank', 'F')],
    B: Loader.shared.resources[getCharacterId('AngstyHank', 'B')],
  }
}
