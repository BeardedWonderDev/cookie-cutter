var exports = (module.exports = function (doc) {
  if (!doc) doc = {};
  if (typeof doc === "string") doc = { cookie: doc };
  if (doc.cookie === undefined) doc.cookie = "";

  var self = {};
  self.get = function (key) {
    var splat = doc.cookie.split(/;\s*/);
    for (var i = 0; i < splat.length; i++) {
      var ps = splat[i].split("=");
      var k = unescape(ps[0]);
      if (k === key) return unescape(ps[1]);
    }
    return undefined;
  };

  self.set = function (key, value, opts) {
    if (!opts) opts = {};
    var s = escape(key) + "=" + escape(value);
    if (opts.expires) s += "; expires=" + opts.expires;
    if (opts.path) s += "; path=" + escape(opts.path);
    if (opts.domain) s += "; domain=" + escape(opts.domain);
    if (opts.MaxAge !== undefined) s += "; Max-Age=" + escape(opts.MaxAge);
    if (opts.SameSite) s += "; SameSite=" + escape(opts.SameSite);
    if (opts.secure) s += "; secure";
    if (opts.HttpOnly) s += "; HttpOnly";
    doc.cookie = s;
    return s;
  };

  self.clear = function (key, opts) {
    var options = {};
    if (opts) {
      for (var prop in opts) {
        if (opts.hasOwnProperty(prop)) options[prop] = opts[prop];
      }
    }
    options.expires = new Date(0);
    options.MaxAge = 0;
    return self.set(key, "", options);
  };
  return self;
});

if (typeof document !== "undefined") {
  var cookie = exports(document);
  exports.get = cookie.get;
  exports.set = cookie.set;
  exports.clear = cookie.clear;
}
