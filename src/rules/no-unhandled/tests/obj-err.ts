function a() {}

function b() {
  throw new Error("error");
}

const obj = {
  deep: {
    1: {
      a,
      b,
    },
  },
};
const c = obj.deep;

const d = {
  b() {
    console.log("ok");
  },
};

obj.deep[1].a();
obj.deep[1].b();
c[1].a();
c[1].b();
d.b();

export {};
