const path = require('path');

function safeRequire(absPath) {
  try {
    return require(absPath);
  } catch (e) {
    return null;
  }
}

function wrapInstanceWithPromises(instance) {
  if (!instance || typeof instance !== 'object') return instance;
  const wrapped = {};
  for (const key of Object.keys(instance)) {
    if (typeof instance[key] === 'function') {
      wrapped[key] = (...args) => Promise.resolve().then(() => instance[key](...args));
    } else {
      wrapped[key] = instance[key];
    }
  }
  return wrapped;
}

function replaceModuleExports(relPath) {
  const abs = path.resolve(process.cwd(), relPath);
  const resolved = require.resolve(abs);
  const original = safeRequire(abs);
  if (!original) return;

  const wrapped = wrapInstanceWithPromises(original);

  const cached = require.cache[resolved];
  if (cached) {
    cached.exports = wrapped;
  }
}

// Lista de modelos a parchear (rutas relativas a la raíz del proyecto)
const modelos = [
  './modelos/examenes_modelos.js',
  './modelos/paciente_modelos.js',
  './modelos/resultados_modelos.js'
];

for (const m of modelos) {
  try {
    replaceModuleExports(m);
  } catch (e) {
    // no bloquear el arranque si falla el parche
    // se muestra error mínimo en consola
    console.error('wrapModels: no se pudo parchear', m, e && e.message);
  }
}

// no export; este archivo se usa con `node -r ./wrapModels.js` al iniciar
