!(function(e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof exports
    ? e(require("jquery"))
    : e(jQuery);
})(function(m) {
  var i = /\+/g;
  function v(e) {
    return k.raw ? e : encodeURIComponent(e);
  }
  function x(e, n) {
    var o = k.raw
      ? e
      : (function(e) {
          0 === e.indexOf('"') &&
            (e = e
              .slice(1, -1)
              .replace(/\\"/g, '"')
              .replace(/\\\\/g, "\\"));
          try {
            return (e = decodeURIComponent(e.replace(i, " "))), k.json ? JSON.parse(e) : e;
          } catch (e) {}
        })(e);
    return m.isFunction(n) ? n(o) : o;
  }
  var k = (m.cookie = function(e, n, o) {
    if (void 0 !== n && !m.isFunction(n)) {
      if ("number" == typeof (o = m.extend({}, k.defaults, o)).expires) {
        var i = o.expires,
          r = (o.expires = new Date());
        r.setTime(+r + 864e5 * i);
      }
      return (document.cookie = [
        v(e),
        "=",
        (function(e) {
          return v(k.json ? JSON.stringify(e) : String(e));
        })(n),
        o.expires ? "; expires=" + o.expires.toUTCString() : "",
        o.path ? "; path=" + o.path : "",
        o.domain ? "; domain=" + o.domain : "",
        o.secure ? "; secure" : ""
      ].join(""));
    }
    for (
      var t, c = e ? void 0 : {}, u = document.cookie ? document.cookie.split("; ") : [], a = 0, d = u.length;
      a < d;
      a++
    ) {
      var f = u[a].split("="),
        p = ((t = f.shift()), k.raw ? t : decodeURIComponent(t)),
        s = f.join("=");
      if (e && e === p) {
        c = x(s, n);
        break;
      }
      e || void 0 === (s = x(s)) || (c[p] = s);
    }
    return c;
  });
  (k.defaults = {}),
    (m.removeCookie = function(e, n) {
      return void 0 !== m.cookie(e) && (m.cookie(e, "", m.extend({}, n, { expires: -1 })), !m.cookie(e));
    });
});
