var prettyPrintOne,
  prettyPrint,
  IN_GLOBAL_SCOPE = !0;
(window.PR_SHOULD_USE_CONTINUATION = !0),
  (function() {
    var A = window,
      e = ["break,continue,do,else,for,if,return,while"],
      t = [
        [
          e,
          "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"
        ],
        "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
      ],
      n = [
        t,
        "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"
      ],
      r = [
        t,
        "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"
      ],
      a = [
        r,
        "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"
      ],
      s = [t, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
      i =
        "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
      l = [
        e,
        "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"
      ],
      o = [
        e,
        "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"
      ],
      u = [
        e,
        "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"
      ],
      c = [e, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
      p = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
      d = "str",
      f = "com",
      h = "typ",
      g = "lit",
      m = "pun",
      _ = "pln",
      P = "src",
      v = "atv";
    function E(e, t, n, r) {
      if (t) {
        var a = { sourceCode: t, basePos: e };
        n(a), r.push.apply(r, a.decorations);
      }
    }
    var y = /\S/;
    function R(e) {
      for (var t = void 0, n = e.firstChild; n; n = n.nextSibling) {
        var r = n.nodeType;
        t = 1 === r ? (t ? e : n) : 3 === r && y.test(n.nodeValue) ? e : t;
      }
      return t === e ? void 0 : t;
    }
    function b(c, x) {
      var w,
        S = {};
      !(function() {
        for (var e = c.concat(x), t = [], n = {}, r = 0, a = e.length; r < a; ++r) {
          var s = e[r],
            i = s[3];
          if (i) for (var l = i.length; 0 <= --l; ) S[i.charAt(l)] = s;
          var o = s[1],
            u = "" + o;
          n.hasOwnProperty(u) || (t.push(o), (n[u] = null));
        }
        t.push(/[\0-\uffff]/),
          (w = (function(e) {
            for (var u = 0, c = !1, t = !1, n = 0, r = e.length; n < r; ++n)
              if ((l = e[n]).ignoreCase) t = !0;
              else if (/[a-z]/i.test(l.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
                t = !(c = !0);
                break;
              }
            var a = { b: 8, t: 9, n: 10, v: 11, f: 12, r: 13 };
            function f(e) {
              var t = e.charCodeAt(0);
              if (92 !== t) return t;
              var n = e.charAt(1);
              return (
                (t = a[n]) ||
                ("0" <= n && n <= "7"
                  ? parseInt(e.substring(1), 8)
                  : "u" === n || "x" === n
                  ? parseInt(e.substring(2), 16)
                  : e.charCodeAt(1))
              );
            }
            function h(e) {
              if (e < 32) return (e < 16 ? "\\x0" : "\\x") + e.toString(16);
              var t = String.fromCharCode(e);
              return "\\" === t || "-" === t || "]" === t || "^" === t ? "\\" + t : t;
            }
            function p(e) {
              var t = e
                  .substring(1, e.length - 1)
                  .match(
                    new RegExp(
                      "\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]",
                      "g"
                    )
                  ),
                n = [],
                r = "^" === t[0],
                a = ["["];
              r && a.push("^");
              for (var s = r ? 1 : 0, i = t.length; s < i; ++s) {
                var l = t[s];
                if (/\\[bdsw]/i.test(l)) a.push(l);
                else {
                  var o,
                    u = f(l);
                  s + 2 < i && "-" === t[s + 1] ? ((o = f(t[s + 2])), (s += 2)) : (o = u),
                    n.push([u, o]),
                    o < 65 ||
                      122 < u ||
                      (o < 65 || 90 < u || n.push([32 | Math.max(65, u), 32 | Math.min(o, 90)]),
                      o < 97 || 122 < u || n.push([-33 & Math.max(97, u), -33 & Math.min(o, 122)]));
                }
              }
              n.sort(function(e, t) {
                return e[0] - t[0] || t[1] - e[1];
              });
              var c = [],
                p = [];
              for (s = 0; s < n.length; ++s)
                (d = n[s])[0] <= p[1] + 1 ? (p[1] = Math.max(p[1], d[1])) : c.push((p = d));
              for (s = 0; s < c.length; ++s) {
                var d = c[s];
                a.push(h(d[0])), d[1] > d[0] && (d[1] + 1 > d[0] && a.push("-"), a.push(h(d[1])));
              }
              return a.push("]"), a.join("");
            }
            function s(e) {
              for (
                var t = e.source.match(
                    new RegExp(
                      "(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)",
                      "g"
                    )
                  ),
                  n = t.length,
                  r = [],
                  a = 0,
                  s = 0;
                a < n;
                ++a
              )
                "(" === (l = t[a])
                  ? ++s
                  : "\\" === l.charAt(0) && (i = +l.substring(1)) && (i <= s ? (r[i] = -1) : (t[a] = h(i)));
              for (a = 1; a < r.length; ++a) -1 === r[a] && (r[a] = ++u);
              for (s = a = 0; a < n; ++a)
                if ("(" === (l = t[a])) r[++s] || (t[a] = "(?:");
                else if ("\\" === l.charAt(0)) {
                  var i;
                  (i = +l.substring(1)) && i <= s && (t[a] = "\\" + r[i]);
                }
              for (a = 0; a < n; ++a) "^" === t[a] && "^" !== t[a + 1] && (t[a] = "");
              if (e.ignoreCase && c)
                for (a = 0; a < n; ++a) {
                  var l,
                    o = (l = t[a]).charAt(0);
                  2 <= l.length && "[" === o
                    ? (t[a] = p(l))
                    : "\\" !== o &&
                      (t[a] = l.replace(/[a-zA-Z]/g, function(e) {
                        var t = e.charCodeAt(0);
                        return "[" + String.fromCharCode(-33 & t, 32 | t) + "]";
                      }));
                }
              return t.join("");
            }
            var i = [];
            for (n = 0, r = e.length; n < r; ++n) {
              var l;
              if ((l = e[n]).global || l.multiline) throw new Error("" + l);
              i.push("(?:" + s(l) + ")");
            }
            return new RegExp(i.join("|"), t ? "gi" : "g");
          })(t));
      })();
      var C = x.length,
        N = function(e) {
          for (
            var t = e.sourceCode, n = e.basePos, r = [n, _], a = 0, s = t.match(w) || [], i = {}, l = 0, o = s.length;
            l < o;
            ++l
          ) {
            var u,
              c = s[l],
              p = i[c],
              d = void 0;
            if ("string" == typeof p) u = !1;
            else {
              var f = S[c.charAt(0)];
              if (f) (d = c.match(f[1])), (p = f[0]);
              else {
                for (var h = 0; h < C; ++h)
                  if (((f = x[h]), (d = c.match(f[1])))) {
                    p = f[0];
                    break;
                  }
                d || (p = _);
              }
              !(u = 5 <= p.length && "lang-" === p.substring(0, 5)) ||
                (d && "string" == typeof d[1]) ||
                ((u = !1), (p = P)),
                u || (i[c] = p);
            }
            var g = a;
            if (((a += c.length), u)) {
              var m = d[1],
                v = c.indexOf(m),
                y = v + m.length;
              d[2] && (v = (y = c.length - d[2].length) - m.length);
              var b = p.substring(5);
              E(n + g, c.substring(0, v), N, r), E(n + g + v, m, L(b, m), r), E(n + g + y, c.substring(y), N, r);
            } else r.push(n + g, p);
          }
          e.decorations = r;
        };
      return N;
    }
    function x(e) {
      var t = [],
        n = [];
      e.tripleQuotedStrings
        ? t.push([
            d,
            /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
            null,
            "'\""
          ])
        : e.multiLineStrings
        ? t.push([
            d,
            /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
            null,
            "'\"`"
          ])
        : t.push([d, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'"]),
        e.verbatimStrings && n.push([d, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
      var r = e.hashComments;
      r &&
        (e.cStyleComments
          ? (1 < r
              ? t.push([f, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#"])
              : t.push([
                  f,
                  /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
                  null,
                  "#"
                ]),
            n.push([d, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null]))
          : t.push([f, /^#[^\r\n]*/, null, "#"])),
        e.cStyleComments && (n.push([f, /^\/\/[^\r\n]*/, null]), n.push([f, /^\/\*[\s\S]*?(?:\*\/|$)/, null]));
      var a = e.regexLiterals;
      if (a) {
        var s = 1 < a ? "" : "\n\r",
          i = s ? "." : "[\\S\\s]",
          l =
            "/(?=[^/*" +
            s +
            "])(?:[^/\\x5B\\x5C" +
            s +
            "]|\\x5C" +
            i +
            "|\\x5B(?:[^\\x5C\\x5D" +
            s +
            "]|\\x5C" +
            i +
            ")*(?:\\x5D|$))+/";
        n.push([
          "lang-regex",
          RegExp(
            "^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" +
              l +
              ")"
          )
        ]);
      }
      var o = e.types;
      o && n.push([h, o]);
      var u = ("" + e.keywords).replace(/^ | $/g, "");
      u.length && n.push(["kwd", new RegExp("^(?:" + u.replace(/[\s,]+/g, "|") + ")\\b"), null]),
        t.push([_, /^\s+/, null, " \r\n\t "]);
      var c = "^.[^\\s\\w.$@'\"`/\\\\]*";
      return (
        e.regexLiterals && (c += "(?!s*/)"),
        n.push(
          [g, /^@[a-z_$][a-z_$@0-9]*/i, null],
          [h, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
          [_, /^[a-z_$][a-z_$@0-9]*/i, null],
          [
            g,
            new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*", "i"),
            null,
            "0123456789"
          ],
          [_, /^\\[\s\S]?/, null],
          [m, new RegExp(c), null]
        ),
        b(t, n)
      );
    }
    var w = x({
      keywords: [n, a, s, i, l, o, c],
      hashComments: !0,
      cStyleComments: !0,
      multiLineStrings: !0,
      regexLiterals: !0
    });
    function T(e, t, l) {
      for (
        var o = /(?:^|\s)nocode(?:\s|$)/, u = /\r\n?|\n/, c = e.ownerDocument, n = c.createElement("li");
        e.firstChild;

      )
        n.appendChild(e.firstChild);
      var r = [n];
      function p(e) {
        var t = e.nodeType;
        if (1 != t || o.test(e.className)) {
          if ((3 == t || 4 == t) && l) {
            var n = e.nodeValue,
              r = n.match(u);
            if (r) {
              var a = n.substring(0, r.index);
              e.nodeValue = a;
              var s = n.substring(r.index + r[0].length);
              if (s) e.parentNode.insertBefore(c.createTextNode(s), e.nextSibling);
              d(e), a || e.parentNode.removeChild(e);
            }
          }
        } else if ("br" === e.nodeName) d(e), e.parentNode && e.parentNode.removeChild(e);
        else for (var i = e.firstChild; i; i = i.nextSibling) p(i);
      }
      function d(e) {
        for (; !e.nextSibling; ) if (!(e = e.parentNode)) return;
        for (
          var t,
            n = (function e(t, n) {
              var r = n ? t.cloneNode(!1) : t,
                a = t.parentNode;
              if (a) {
                var s = e(a, 1),
                  i = t.nextSibling;
                s.appendChild(r);
                for (var l = i; l; l = i) (i = l.nextSibling), s.appendChild(l);
              }
              return r;
            })(e.nextSibling, 0);
          (t = n.parentNode) && 1 === t.nodeType;

        )
          n = t;
        r.push(n);
      }
      for (var a = 0; a < r.length; ++a) p(r[a]);
      t === (0 | t) && r[0].setAttribute("value", t);
      var s = c.createElement("ol");
      s.className = "linenums";
      for (var i = Math.max(0, (t - 1) | 0) || 0, f = ((a = 0), r.length); a < f; ++a)
        ((n = r[a]).className = "L" + ((a + i) % 10)),
          n.firstChild || n.appendChild(c.createTextNode(" ")),
          s.appendChild(n);
      e.appendChild(s);
    }
    var S = {};
    function C(e, t) {
      for (var n = t.length; 0 <= --n; ) {
        var r = t[n];
        S.hasOwnProperty(r) ? A.console && console.warn("cannot override language handler %s", r) : (S[r] = e);
      }
    }
    function L(e, t) {
      return (e && S.hasOwnProperty(e)) || (e = /^\s*</.test(t) ? "default-markup" : "default-code"), S[e];
    }
    function $(e) {
      var t = e.langExtension;
      try {
        var n = (function(e, i) {
            var l = /(?:^|\s)nocode(?:\s|$)/,
              o = [],
              u = 0,
              c = [],
              p = 0;
            return (
              (function e(t) {
                var n = t.nodeType;
                if (1 == n) {
                  if (l.test(t.className)) return;
                  for (var r = t.firstChild; r; r = r.nextSibling) e(r);
                  var a = t.nodeName.toLowerCase();
                  ("br" !== a && "li" !== a) || ((o[p] = "\n"), (c[p << 1] = u++), (c[(p++ << 1) | 1] = t));
                } else if (3 == n || 4 == n) {
                  var s = t.nodeValue;
                  s.length &&
                    ((s = i ? s.replace(/\r\n?/g, "\n") : s.replace(/[ \t\r\n]+/g, " ")),
                    (o[p] = s),
                    (c[p << 1] = u),
                    (u += s.length),
                    (c[(p++ << 1) | 1] = t));
                }
              })(e),
              { sourceCode: o.join("").replace(/\n$/, ""), spans: c }
            );
          })(e.sourceNode, e.pre),
          r = n.sourceCode;
        (e.sourceCode = r),
          (e.spans = n.spans),
          (e.basePos = 0),
          L(t, r)(e),
          (function(e) {
            var t = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
            t = t && +t[1] <= 8;
            var n,
              r,
              a = /\n/g,
              s = e.sourceCode,
              i = s.length,
              l = 0,
              o = e.spans,
              u = o.length,
              c = 0,
              p = e.decorations,
              d = p.length,
              f = 0;
            for (p[d] = i, r = n = 0; r < d; ) p[r] !== p[r + 2] ? ((p[n++] = p[r++]), (p[n++] = p[r++])) : (r += 2);
            for (d = n, r = n = 0; r < d; ) {
              for (var h = p[r], g = p[r + 1], m = r + 2; m + 2 <= d && p[m + 1] === g; ) m += 2;
              (p[n++] = h), (p[n++] = g), (r = m);
            }
            d = p.length = n;
            var v,
              y = e.sourceNode;
            y && ((v = y.style.display), (y.style.display = "none"));
            try {
              for (; c < u; ) {
                o[c];
                var b,
                  x = o[c + 2] || i,
                  w = p[f + 2] || i,
                  S = ((m = Math.min(x, w)), o[c + 1]);
                if (1 !== S.nodeType && (b = s.substring(l, m))) {
                  t && (b = b.replace(a, "\r")), (S.nodeValue = b);
                  var C = S.ownerDocument,
                    N = C.createElement("span");
                  N.className = p[f + 1];
                  var _ = S.parentNode;
                  _.replaceChild(N, S),
                    N.appendChild(S),
                    l < x && ((o[c + 1] = S = C.createTextNode(s.substring(m, x))), _.insertBefore(S, N.nextSibling));
                }
                x <= (l = m) && (c += 2), w <= l && (f += 2);
              }
            } finally {
              y && (y.style.display = v);
            }
          })(e);
      } catch (e) {
        A.console && console.log((e && e.stack) || e);
      }
    }
    function N(e, t, n) {
      var r = document.createElement("div");
      return (
        (r.innerHTML = "<pre>" + e + "</pre>"),
        (r = r.firstChild),
        n && T(r, n, !0),
        $({ langExtension: t, numberLines: n, sourceNode: r, pre: 1 }),
        r.innerHTML
      );
    }
    function k(y, e) {
      var t = e || document.body,
        b = t.ownerDocument || document;
      function n(e) {
        return t.getElementsByTagName(e);
      }
      for (var r = [n("pre"), n("code"), n("xmp")], x = [], a = 0; a < r.length; ++a)
        for (var s = 0, i = r[a].length; s < i; ++s) x.push(r[a][s]);
      r = null;
      var w = Date;
      w.now ||
        (w = {
          now: function() {
            return +new Date();
          }
        });
      var S = 0,
        C = /\blang(?:uage)?-([\w.]+)(?!\S)/,
        N = /\bprettyprint\b/,
        _ = /\bprettyprinted\b/,
        P = /pre|xmp/i,
        E = /^code$/i,
        L = /^(?:pre|code|xmp)$/i,
        k = {};
      !(function e() {
        for (var t = A.PR_SHOULD_USE_CONTINUATION ? w.now() + 250 : 1 / 0; S < x.length && w.now() < t; S++) {
          for (var n = x[S], r = k, a = n; (a = a.previousSibling); ) {
            var s = a.nodeType,
              i = (7 === s || 8 === s) && a.nodeValue;
            if (i ? !/^\??prettify\b/.test(i) : 3 !== s || /\S/.test(a.nodeValue)) break;
            if (i) {
              (r = {}),
                i.replace(/\b(\w+)=([\w:.%+-]+)/g, function(e, t, n) {
                  r[t] = n;
                });
              break;
            }
          }
          var l = n.className;
          if ((r !== k || N.test(l)) && !_.test(l)) {
            for (var o = !1, u = n.parentNode; u; u = u.parentNode) {
              var c = u.tagName;
              if (L.test(c) && u.className && N.test(u.className)) {
                o = !0;
                break;
              }
            }
            if (!o) {
              n.className += " prettyprinted";
              var p,
                d,
                f = r.lang;
              if (
                (f ||
                  (!(f = l.match(C)) && (p = R(n)) && E.test(p.tagName) && (f = p.className.match(C)), f && (f = f[1])),
                P.test(n.tagName))
              )
                d = 1;
              else {
                var h = n.currentStyle,
                  g = b.defaultView,
                  m = h
                    ? h.whiteSpace
                    : g && g.getComputedStyle
                    ? g.getComputedStyle(n, null).getPropertyValue("white-space")
                    : 0;
                d = m && "pre" === m.substring(0, 3);
              }
              var v = r.linenums;
              (v = "true" === v || +v) ||
                (v = !!(v = l.match(/\blinenums\b(?::(\d+))?/)) && (!v[1] || !v[1].length || +v[1])),
                v && T(n, v, d),
                $({ langExtension: f, sourceNode: n, numberLines: v, pre: d });
            }
          }
        }
        S < x.length ? setTimeout(e, 250) : "function" == typeof y && y();
      })();
    }
    C(w, ["default-code"]),
      C(
        b(
          [],
          [
            [_, /^[^<?]+/],
            ["dec", /^<!\w[^>]*(?:>|$)/],
            [f, /^<\!--[\s\S]*?(?:-\->|$)/],
            ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/],
            ["lang-", /^<%([\s\S]+?)(?:%>|$)/],
            [m, /^(?:<[%?]|[%?]>)/],
            ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
            ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
            ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
            ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
          ]
        ),
        ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]
      ),
      C(
        b(
          [[_, /^[\s]+/, null, " \t\r\n"], [v, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"]],
          [
            ["tag", /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
            ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
            ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
            [m, /^[=<>\/]+/],
            ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i],
            ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i],
            ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i],
            ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i],
            ["lang-css", /^style\s*=\s*\'([^\']+)\'/i],
            ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]
          ]
        ),
        ["in.tag"]
      ),
      C(b([], [[v, /^[\s\S]+/]]), ["uq.val"]),
      C(x({ keywords: n, hashComments: !0, cStyleComments: !0, types: p }), ["c", "cc", "cpp", "cxx", "cyc", "m"]),
      C(x({ keywords: "null,true,false" }), ["json"]),
      C(x({ keywords: a, hashComments: !0, cStyleComments: !0, verbatimStrings: !0, types: p }), ["cs"]),
      C(x({ keywords: r, cStyleComments: !0 }), ["java"]),
      C(x({ keywords: c, hashComments: !0, multiLineStrings: !0 }), ["bash", "bsh", "csh", "sh"]),
      C(x({ keywords: l, hashComments: !0, multiLineStrings: !0, tripleQuotedStrings: !0 }), ["cv", "py", "python"]),
      C(x({ keywords: i, hashComments: !0, multiLineStrings: !0, regexLiterals: 2 }), ["perl", "pl", "pm"]),
      C(x({ keywords: o, hashComments: !0, multiLineStrings: !0, regexLiterals: !0 }), ["rb", "ruby"]),
      C(x({ keywords: s, cStyleComments: !0, regexLiterals: !0 }), ["javascript", "js"]),
      C(
        x({
          keywords:
            "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
          hashComments: 3,
          cStyleComments: !0,
          multilineStrings: !0,
          tripleQuotedStrings: !0,
          regexLiterals: !0
        }),
        ["coffee"]
      ),
      C(x({ keywords: u, cStyleComments: !0, multilineStrings: !0 }), ["rc", "rs", "rust"]),
      C(b([], [[d, /^[\s\S]+/]]), ["regex"]);
    var O = (A.PR = {
      createSimpleLexer: b,
      registerLangHandler: C,
      sourceDecorator: x,
      PR_ATTRIB_NAME: "atn",
      PR_ATTRIB_VALUE: v,
      PR_COMMENT: f,
      PR_DECLARATION: "dec",
      PR_KEYWORD: "kwd",
      PR_LITERAL: g,
      PR_NOCODE: "nocode",
      PR_PLAIN: _,
      PR_PUNCTUATION: m,
      PR_SOURCE: P,
      PR_STRING: d,
      PR_TAG: "tag",
      PR_TYPE: h,
      prettyPrintOne: IN_GLOBAL_SCOPE ? (A.prettyPrintOne = N) : (prettyPrintOne = N),
      prettyPrint: (prettyPrint = IN_GLOBAL_SCOPE ? (A.prettyPrint = k) : (prettyPrint = k))
    });
    "function" == typeof define &&
      define.amd &&
      define("google-code-prettify", [], function() {
        return O;
      });
  })();
