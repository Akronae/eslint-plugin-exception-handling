function c() {
  a();
}
function a() {
  throw new Error("heyyyy!");
}
try {
  c();
} catch (e) {
  console.error(e);
}
c();
c();

function f() {
  try {
    c();
  } catch (e) {
    console.error(e);
    throw e;
  }

  try {
    throw new Error("heyyyy!");
  } catch (e) {
    console.error(e);
  }
}

f();

export {};
