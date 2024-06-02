function a() {
  a();
}

function b() {
  c();
}

function c() {
  b();
}

a();
b();

export {};
