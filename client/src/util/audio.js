import Howl from 'howler';

const soundModel = {}; // manifest
let soundMap = {};

/**
 * Is Object
 *
 * @param {any} val
 * @returns {Boolean}
 */
function isObject(val) {
  return typeof val === 'object' && !Array.isArray(val) && val !== null;
}

/**
 * Parse entry audio data
 *
 * @param {any} val
 * @returns {any} data
 */
function parseData(val) {
  if (typeof val === 'string' || val instanceof String) {
    return [val];
  } else if (Array.isArray(val)) {
    return val;
  } else if (isObject(val)) {
    if (val.src) {
      return parseData(val.src);
    } else {
      console.error('"soundModel" item missing field "src"', val);
      return [''];
    }
  } else {
    console.error('Unrecognized type for "soundModel" item', val);
    return [''];
  }
}

/**
 * Get a sound sprite
 *
 * @param {any} val
 * @returns {any} Sound sprite
 */
function getSprite(val) {
  let sprite;
  Object.keys(soundMap).forEach(key => {
    if (soundMap[key]._sprite[val]) {
      sprite = soundMap[key];
    }
  });
  return sprite;
}

/**
 * Set map
 *
 * @param {any} model
 */
function setMap(model) {
  Object.keys(model).forEach(item => {
    let data = model[item];
    const defaults = {
      preload: false
    };
    const opts = Object.assign(defaults, isObject(data) ? data : {}, { src: parseData(data) });
    soundMap[item] = new Howl.Howl(opts);
  });
}

/**
 * Audio class with easy method for importing audio and sprites and play them
 *
 * @class AudioStore
 */
class AudioStore {
  constructor() {
    setMap(soundModel);
  }

  play = id => {
    if (Object.keys(soundMap).length === 0) {
      console.error('Can\'t play any sounds as "soundMap" is empty', soundMap);
      return;
    }

    let curr = soundMap[id];
    let isSprite;

    if (!curr) {
      curr = getSprite(id);
      isSprite = true;
    }

    if (curr) {
      curr.state() === 'unloaded' && curr.load();
      isSprite ? curr.play(id) : curr.play();
    } else {
      console.error(`"${id}" doesn't exist in sound map.`, soundMap);
    }
  };

  set extraData(data) {
    setMap(data);
  }

  get sounds() {
    return soundMap;
  }
}

const instance = new AudioStore();
Object.freeze(instance);

export default instance;
