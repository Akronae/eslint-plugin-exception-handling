function throwingFunction() {
  throw new Error("This is an error");
}

try {
  throwingFunction();
} catch (e) {
  console.error(e);
}

function a() {
  try {
    throwingFunction();
  } catch (e) {
    console.error(e);
  }
}

a();

function b() {
  try {
    throwingFunction();
  } catch (e) {
    console.error(e);
  }
}

b();

export {};
