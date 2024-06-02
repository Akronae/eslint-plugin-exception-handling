function a() {
  a();
  throw new Error("error");
}

function b() {
  c();
  throw new Error("error");
}

function c() {
  b();
}

a();
b();
