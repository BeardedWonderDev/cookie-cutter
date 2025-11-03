var test = require("tape");
var cookie = require("../index");

test("sets and retrieves cookies", function (t) {
  t.plan(2);
  var doc = { cookie: "" };
  var api = cookie(doc);

  var result = api.set("user", "abc", { path: "/" });
  t.equal(result, "user=abc; path=/", "applies path option");
  t.equal(api.get("user"), "abc", "reads stored cookie");
});

test("clears cookies with matching options", function (t) {
  t.plan(2);
  var doc = { cookie: "" };
  var api = cookie(doc);

  api.set("session", "xyz", { path: "/" });
  var cleared = api.clear("session", { path: "/" });

  t.ok(/expires=/.test(cleared), "includes expires attribute");
  t.ok(/Max-Age=0/.test(cleared), "forces Max-Age=0 for deletion");
});

test("accepts plain cookie strings", function (t) {
  t.plan(1);
  var api = cookie("token=abc");

  t.equal(api.get("token"), "abc", "reads cookie from string source");
});

test("adds Partitioned attribute", function (t) {
  t.plan(1);
  var doc = { cookie: "" };
  var api = cookie(doc);

  var result = api.set("chip", "state", {
    secure: true,
    SameSite: "None",
    partitioned: true,
  });

  t.ok(/; Partitioned/.test(result), "serializes Partitioned attr");
});

test("warns when SameSite=None lacks secure", function (t) {
  t.plan(2);
  var originalWarn = console.warn;
  var warnings = [];
  console.warn = function () {
    warnings.push(arguments);
  };

  try {
    var doc = { cookie: "" };
    var api = cookie(doc);

    api.set("sid", "1", { SameSite: "None" });
    t.equal(warnings.length, 1, "emits warning for insecure SameSite=None");

    cookie.configure({ suppressInsecureSameSiteNoneWarning: true });
    api.set("sid", "2", { SameSite: "None" });
    t.equal(warnings.length, 1, "suppress warning when configured");
  } finally {
    console.warn = originalWarn;
  }
});
