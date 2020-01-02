const state_init = function (init) {
  return ({
    get: function () {
      return init;
    },
    set: function (next) {
      return (init=next);
    }
  });
};

const actions_init = function (obj) {
  const acts = (obj) ? obj : {};
  return ({
    sub: function (act) {
      return function (fn) {
        acts[act] = fn;
        return act;
      };
    },
    pub: function (act) {
      return acts[act];
    }
  });
};

const pipe = function (...fns) {
  return function (x) {
    return fns.reduce(function (a,c) { return c(a); },x);
  };
};
