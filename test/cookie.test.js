var test = require("tape");
var cookie = require("../index");

test("sets and retrieves cookies", function (t) {
  t.plan(2);
  var doc = { cookie: "" };
  var api = cookie(doc);

  var result = api.set("user", "abc", { path: "/" });
  t.equal(result, "user=abc; path=%2F", "applies path option");
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
