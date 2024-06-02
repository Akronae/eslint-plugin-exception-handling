function throwingFunction() {
  throw new Error("This is an error");
}

try {
  throwingFunction();
} catch (e) {
  console.error(e);
}

function a() {
  throwingFunction();
}

try {
  a();
} catch (e) {
  console.error(e);
}

function b() {
  try {
    throwingFunction();
  } catch (e) {
    console.error(e);
  }
}

b();

export {};
