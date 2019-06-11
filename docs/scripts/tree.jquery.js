(function() {
  function o(e, t) {
    for (var n in t) E.call(t, n) && (e[n] = t[n]);
    function r() {
      this.constructor = e;
    }
    return (r.prototype = t.prototype), (e.prototype = new r()), (e.__super__ = t.prototype), e;
  }
  var p,
    n,
    r,
    i,
    s,
    c,
    l,
    t,
    e,
    d,
    a,
    u,
    h,
    _,
    f,
    g,
    m,
    v,
    y,
    N,
    S,
    w,
    C,
    F,
    D = [].slice,
    E = {}.hasOwnProperty;
  (p = this.jQuery),
    (v = (function() {
      function u(e, t) {
        (this.$el = p(e)), (this.options = p.extend({}, this.defaults, t));
      }
      return (
        (u.prototype.defaults = {}),
        (u.prototype.destroy = function() {
          return this._deinit();
        }),
        (u.prototype._init = function() {
          return null;
        }),
        (u.prototype._deinit = function() {
          return null;
        }),
        (u.register = function(l, e) {
          var r, o, i, a, d;
          return (
            (a = function() {
              return "simple_widget_" + e;
            }),
            (d = function(e, t) {
              var n;
              return (n = p.data(e, t)) && n instanceof u ? n : null;
            }),
            (o = function(e, t) {
              var n, r, o, i, s;
              for (n = a(), i = 0, s = e.length; i < s; i++)
                (r = e[i]), d(r, n) || ((o = new l(r, t)), p.data(r, n) || p.data(r, n, o), o._init());
              return e;
            }),
            (i = function(e) {
              var t, n, r, o, i, s;
              for (t = a(), s = [], o = 0, i = e.length; o < i; o++)
                (n = e[o]), (r = d(n, t)) && r.destroy(), s.push(p.removeData(n, t));
              return s;
            }),
            (r = function(e, t, n) {
              var r, o, i, s, l, d;
              for (o = null, l = 0, d = e.length; l < d; l++)
                (r = e[l]),
                  (i = p.data(r, a())) && i instanceof u && (s = i[t]) && "function" == typeof s && (o = s.apply(i, n));
              return o;
            }),
            (p.fn[e] = function() {
              var e, t, n;
              return (
                (t = arguments[0]),
                (e = 2 <= arguments.length ? D.call(arguments, 1) : []),
                this,
                void 0 === t || "object" == typeof t
                  ? o(this, t)
                  : "string" == typeof t && "_" !== t[0]
                  ? "destroy" === (n = t)
                    ? i(this)
                    : r(this, n, e)
                  : void 0
              );
            })
          );
        }),
        u
      );
    })()),
    (this.SimpleWidget = v),
    (a = (function(e) {
      function n() {
        return n.__super__.constructor.apply(this, arguments);
      }
      return (
        o(n, v),
        (n.is_mouse_handled = !1),
        (n.prototype._init = function() {
          return (
            this.$el.bind("mousedown.mousewidget", p.proxy(this._mouseDown, this)),
            this.$el.bind("touchstart.mousewidget", p.proxy(this._touchStart, this)),
            (this.is_mouse_started = !1),
            (this.mouse_delay = 0),
            (this._mouse_delay_timer = null),
            (this._is_mouse_delay_met = !0),
            (this.mouse_down_info = null)
          );
        }),
        (n.prototype._deinit = function() {
          var e;
          return (
            this.$el.unbind("mousedown.mousewidget"),
            this.$el.unbind("touchstart.mousewidget"),
            (e = p(document)).unbind("mousemove.mousewidget"),
            e.unbind("mouseup.mousewidget")
          );
        }),
        (n.prototype._mouseDown = function(e) {
          var t;
          if (1 === e.which) return (t = this._handleMouseDown(e, this._getPositionInfo(e))) && e.preventDefault(), t;
        }),
        (n.prototype._handleMouseDown = function(e, t) {
          if (
            !n.is_mouse_handled &&
            (this.is_mouse_started && this._handleMouseUp(t), (this.mouse_down_info = t), this._mouseCapture(t))
          )
            return this._handleStartMouse(), (this.is_mouse_handled = !0);
        }),
        (n.prototype._handleStartMouse = function() {
          var e;
          if (
            ((e = p(document)).bind("mousemove.mousewidget", p.proxy(this._mouseMove, this)),
            e.bind("touchmove.mousewidget", p.proxy(this._touchMove, this)),
            e.bind("mouseup.mousewidget", p.proxy(this._mouseUp, this)),
            e.bind("touchend.mousewidget", p.proxy(this._touchEnd, this)),
            this.mouse_delay)
          )
            return this._startMouseDelayTimer();
        }),
        (n.prototype._startMouseDelayTimer = function() {
          var e;
          return (
            this._mouse_delay_timer && clearTimeout(this._mouse_delay_timer),
            (this._mouse_delay_timer = setTimeout(
              ((e = this),
              function() {
                return (e._is_mouse_delay_met = !0);
              }),
              this.mouse_delay
            )),
            (this._is_mouse_delay_met = !1)
          );
        }),
        (n.prototype._mouseMove = function(e) {
          return this._handleMouseMove(e, this._getPositionInfo(e));
        }),
        (n.prototype._handleMouseMove = function(e, t) {
          return this.is_mouse_started
            ? (this._mouseDrag(t), e.preventDefault())
            : !(!this.mouse_delay || this._is_mouse_delay_met) ||
                ((this.is_mouse_started = !1 !== this._mouseStart(this.mouse_down_info)),
                this.is_mouse_started ? this._mouseDrag(t) : this._handleMouseUp(t),
                !this.is_mouse_started);
        }),
        (n.prototype._getPositionInfo = function(e) {
          return { page_x: e.pageX, page_y: e.pageY, target: e.target, original_event: e };
        }),
        (n.prototype._mouseUp = function(e) {
          return this._handleMouseUp(this._getPositionInfo(e));
        }),
        (n.prototype._handleMouseUp = function(e) {
          var t;
          (t = p(document)).unbind("mousemove.mousewidget"),
            t.unbind("touchmove.mousewidget"),
            t.unbind("mouseup.mousewidget"),
            t.unbind("touchend.mousewidget"),
            this.is_mouse_started && ((this.is_mouse_started = !1), this._mouseStop(e));
        }),
        (n.prototype._mouseCapture = function(e) {
          return !0;
        }),
        (n.prototype._mouseStart = function(e) {
          return null;
        }),
        (n.prototype._mouseDrag = function(e) {
          return null;
        }),
        (n.prototype._mouseStop = function(e) {
          return null;
        }),
        (n.prototype.setMouseDelay = function(e) {
          return (this.mouse_delay = e);
        }),
        (n.prototype._touchStart = function(e) {
          var t;
          if (!(1 < e.originalEvent.touches.length))
            return (t = e.originalEvent.changedTouches[0]), this._handleMouseDown(e, this._getPositionInfo(t));
        }),
        (n.prototype._touchMove = function(e) {
          var t;
          if (!(1 < e.originalEvent.touches.length))
            return (t = e.originalEvent.changedTouches[0]), this._handleMouseMove(e, this._getPositionInfo(t));
        }),
        (n.prototype._touchEnd = function(e) {
          var t;
          if (!(1 < e.originalEvent.touches.length))
            return (t = e.originalEvent.changedTouches[0]), this._handleMouseUp(this._getPositionInfo(t));
        }),
        n
      );
    })()),
    (this.Tree = {}),
    (p = this.jQuery),
    (_ = {
      getName: function(e) {
        return _.strings[e - 1];
      },
      nameToIndex: function(e) {
        var t, n, r;
        for (t = n = 1, r = _.strings.length; 1 <= r ? n <= r : r <= n; t = 1 <= r ? ++n : --n)
          if (_.strings[t - 1] === e) return t;
        return 0;
      },
      BEFORE: 1,
      AFTER: 2,
      INSIDE: 3,
      NONE: 4,
      strings: ["before", "after", "inside", "none"]
    }),
    (this.Tree.Position = _),
    (u = (function() {
      function r(e, t, n) {
        null == t && (t = !1),
          null == n && (n = r),
          this.setData(e),
          (this.children = []),
          (this.parent = null),
          t && ((this.id_mapping = {}), ((this.tree = this).node_class = n));
      }
      return (
        (r.prototype.setData = function(e) {
          var t, n, r;
          if ("object" != typeof e) return (this.name = e);
          for (t in ((r = []), e)) (n = e[t]), "label" === t ? r.push((this.name = n)) : r.push((this[t] = n));
          return r;
        }),
        (r.prototype.initFromData = function(e) {
          var t, n, r, i;
          return (
            (n = function(e) {
              if ((r.setData(e), e.children)) return t(e.children);
            }),
            (i = r = this),
            (t = function(e) {
              var t, n, r, o;
              for (r = 0, o = e.length; r < o; r++)
                (t = e[r]), (n = new i.tree.node_class("")).initFromData(t), i.addChild(n);
              return null;
            }),
            n(e),
            null
          );
        }),
        (r.prototype.loadFromData = function(e) {
          var t, n, r, o;
          for (this.removeChildren(), r = 0, o = e.length; r < o; r++)
            (n = e[r]),
              (t = new this.tree.node_class(n)),
              this.addChild(t),
              "object" == typeof n && n.children && t.loadFromData(n.children);
          return null;
        }),
        (r.prototype.addChild = function(e) {
          return this.children.push(e), e._setParent(this);
        }),
        (r.prototype.addChildAtPosition = function(e, t) {
          return this.children.splice(t, 0, e), e._setParent(this);
        }),
        (r.prototype._setParent = function(e) {
          return (this.parent = e), (this.tree = e.tree), this.tree.addNodeToIndex(this);
        }),
        (r.prototype.removeChild = function(e) {
          return e.removeChildren(), this._removeChild(e);
        }),
        (r.prototype._removeChild = function(e) {
          return this.children.splice(this.getChildIndex(e), 1), this.tree.removeNodeFromIndex(e);
        }),
        (r.prototype.getChildIndex = function(e) {
          return p.inArray(e, this.children);
        }),
        (r.prototype.hasChildren = function() {
          return 0 !== this.children.length;
        }),
        (r.prototype.isFolder = function() {
          return this.hasChildren() || this.load_on_demand;
        }),
        (r.prototype.iterate = function(l) {
          var d, a;
          return (
            (d = function(e, t) {
              var n, r, o, i, s;
              if (e.children) {
                for (o = 0, i = (s = e.children).length; o < i; o++)
                  (n = s[o]), (r = l(n, t)), a.hasChildren() && r && d(n, t + 1);
                return null;
              }
            })((a = this), 0),
            null
          );
        }),
        (r.prototype.moveNode = function(e, t, n) {
          if (!e.isParentOf(t))
            return (
              e.parent._removeChild(e),
              n === _.AFTER
                ? t.parent.addChildAtPosition(e, t.parent.getChildIndex(t) + 1)
                : n === _.BEFORE
                ? t.parent.addChildAtPosition(e, t.parent.getChildIndex(t))
                : n === _.INSIDE
                ? t.addChildAtPosition(e, 0)
                : void 0
            );
        }),
        (r.prototype.getData = function() {
          var d;
          return (d = function(e) {
            var t, n, r, o, i, s, l;
            for (t = [], s = 0, l = e.length; s < l; s++) {
              for (n in ((o = {}), (r = e[s])))
                (i = r[n]),
                  "parent" !== n &&
                    "children" !== n &&
                    "element" !== n &&
                    "tree" !== n &&
                    Object.prototype.hasOwnProperty.call(r, n) &&
                    (o[n] = i);
              r.hasChildren() && (o.children = d(r.children)), t.push(o);
            }
            return t;
          })(this.children);
        }),
        (r.prototype.getNodeByName = function(t) {
          var n;
          return (
            (n = null),
            this.iterate(function(e) {
              return e.name !== t || ((n = e), !1);
            }),
            n
          );
        }),
        (r.prototype.addAfter = function(e) {
          var t, n;
          return this.parent
            ? ((n = new this.tree.node_class(e)),
              (t = this.parent.getChildIndex(this)),
              this.parent.addChildAtPosition(n, t + 1),
              n)
            : null;
        }),
        (r.prototype.addBefore = function(e) {
          var t, n;
          return this.parent
            ? ((n = new this.tree.node_class(e)),
              (t = this.parent.getChildIndex(this)),
              this.parent.addChildAtPosition(n, t),
              n)
            : null;
        }),
        (r.prototype.addParent = function(e) {
          var t, n, r, o, i, s;
          if (this.parent) {
            for (
              (n = new this.tree.node_class(e))._setParent(this.tree),
                o = 0,
                i = (s = (r = this.parent).children).length;
              o < i;
              o++
            )
              (t = s[o]), n.addChild(t);
            return (r.children = []), r.addChild(n), n;
          }
          return null;
        }),
        (r.prototype.remove = function() {
          if (this.parent) return this.parent.removeChild(this), (this.parent = null);
        }),
        (r.prototype.append = function(e) {
          var t;
          return (t = new this.tree.node_class(e)), this.addChild(t), t;
        }),
        (r.prototype.prepend = function(e) {
          var t;
          return (t = new this.tree.node_class(e)), this.addChildAtPosition(t, 0), t;
        }),
        (r.prototype.isParentOf = function(e) {
          var t;
          for (t = e.parent; t; ) {
            if (t === this) return !0;
            t = t.parent;
          }
          return !1;
        }),
        (r.prototype.getLevel = function() {
          var e, t;
          for (e = 0, t = this; t.parent; ) (e += 1), (t = t.parent);
          return e;
        }),
        (r.prototype.getNodeById = function(e) {
          return this.id_mapping[e];
        }),
        (r.prototype.addNodeToIndex = function(e) {
          if (null != e.id) return (this.id_mapping[e.id] = e);
        }),
        (r.prototype.removeNodeFromIndex = function(e) {
          if (null != e.id) return delete this.id_mapping[e.id];
        }),
        (r.prototype.removeChildren = function() {
          var t;
          return (
            this.iterate(
              ((t = this),
              function(e) {
                return t.tree.removeNodeFromIndex(e), !0;
              })
            ),
            (this.children = [])
          );
        }),
        (r.prototype.getPreviousSibling = function() {
          var e;
          return this.parent && 0 <= (e = this.parent.getChildIndex(this) - 1) ? this.parent.children[e] : null;
        }),
        (r.prototype.getNextSibling = function() {
          var e;
          return this.parent && (e = this.parent.getChildIndex(this) + 1) < this.parent.children.length
            ? this.parent.children[e]
            : null;
        }),
        (r.prototype.getNodesByProperty = function(t, n) {
          return this.filter(function(e) {
            return e[t] === n;
          });
        }),
        (r.prototype.filter = function(t) {
          var n;
          return (
            (n = []),
            this.iterate(function(e) {
              return t(e) && n.push(e), !0;
            }),
            n
          );
        }),
        r
      );
    })()),
    (this.Tree.Node = u),
    (s = (function() {
      function e(e) {
        (this.tree_widget = e),
          (this.opened_icon_element = this.createButtonElement(e.options.openedIcon)),
          (this.closed_icon_element = this.createButtonElement(e.options.closedIcon));
      }
      return (
        (e.prototype.render = function(e) {
          return e && e.parent ? this.renderFromNode(e) : this.renderFromRoot();
        }),
        (e.prototype.renderNode = function(e) {
          var t, n, r;
          if (
            (p(e.element).remove(),
            (n = new h(e.parent, this.tree_widget)),
            (t = this.createLi(e)),
            this.attachNodeData(e, t),
            (r = e.getPreviousSibling()) ? p(r.element).after(t) : n.getUl().prepend(t),
            e.children)
          )
            return this.renderFromNode(e);
        }),
        (e.prototype.renderFromRoot = function() {
          var e;
          return (
            (e = this.tree_widget.element).empty(), this.createDomElements(e[0], this.tree_widget.tree.children, !0, !0)
          );
        }),
        (e.prototype.renderFromNode = function(e) {
          var t;
          return (
            (t = this.tree_widget._getNodeElementForNode(e)).getUl().remove(),
            this.createDomElements(t.$element[0], e.children, !1, !1)
          );
        }),
        (e.prototype.createDomElements = function(e, t, n, r) {
          var o, i, s, l, d;
          for (s = this.createUl(n), e.appendChild(s), l = 0, d = t.length; l < d; l++)
            (o = t[l]),
              (i = this.createLi(o)),
              s.appendChild(i),
              this.attachNodeData(o, i),
              o.hasChildren() && this.createDomElements(i, o.children, !1, o.is_open);
          return null;
        }),
        (e.prototype.attachNodeData = function(e, t) {
          return (e.element = t), p(t).data("node", e);
        }),
        (e.prototype.createUl = function(e) {
          var t, n;
          return (t = e ? "jqtree-tree" : ""), ((n = document.createElement("ul")).className = "jqtree_common " + t), n;
        }),
        (e.prototype.createLi = function(e) {
          var t;
          return (
            (t = e.isFolder() ? this.createFolderLi(e) : this.createNodeLi(e)),
            this.tree_widget.options.onCreateLi && this.tree_widget.options.onCreateLi(e, p(t)),
            t
          );
        }),
        (e.prototype.createFolderLi = function(e) {
          var t, n, r, o, i, s, l, d;
          return (
            (t = this.getButtonClasses(e)),
            (i = this.getFolderClasses(e)),
            (o = this.escapeIfNecessary(e.name)),
            (s = e.is_open ? this.opened_icon_element : this.closed_icon_element),
            ((l = document.createElement("li")).className = "jqtree_common " + i),
            ((r = document.createElement("div")).className = "jqtree-element jqtree_common"),
            l.appendChild(r),
            ((n = document.createElement("a")).className = "jqtree_common " + t),
            n.appendChild(s.cloneNode()),
            r.appendChild(n),
            ((d = document.createElement("span")).className = "jqtree_common jqtree-title jqtree-title-folder"),
            r.appendChild(d),
            (d.innerHTML = o),
            l
          );
        }),
        (e.prototype.createNodeLi = function(e) {
          var t, n, r, o, i, s;
          return (
            (i = ["jqtree_common"]),
            this.tree_widget.select_node_handler &&
              this.tree_widget.select_node_handler.isNodeSelected(e) &&
              i.push("jqtree-selected"),
            (t = i.join(" ")),
            (r = this.escapeIfNecessary(e.name)),
            ((o = document.createElement("li")).className = t),
            ((n = document.createElement("div")).className = "jqtree-element jqtree_common"),
            o.appendChild(n),
            ((s = document.createElement("span")).className = "jqtree-title jqtree_common"),
            (s.innerHTML = r),
            n.appendChild(s),
            o
          );
        }),
        (e.prototype.getButtonClasses = function(e) {
          var t;
          return (t = ["jqtree-toggler"]), e.is_open || t.push("jqtree-closed"), t.join(" ");
        }),
        (e.prototype.getFolderClasses = function(e) {
          var t;
          return (
            (t = ["jqtree-folder"]),
            e.is_open || t.push("jqtree-closed"),
            this.tree_widget.select_node_handler &&
              this.tree_widget.select_node_handler.isNodeSelected(e) &&
              t.push("jqtree-selected"),
            t.join(" ")
          );
        }),
        (e.prototype.escapeIfNecessary = function(e) {
          return this.tree_widget.options.autoEscape ? S(e) : e;
        }),
        (e.prototype.createButtonElement = function(e) {
          var t;
          return "string" == typeof e
            ? (((t = document.createElement("div")).innerHTML = e), document.createTextNode(t.innerHTML))
            : p(e)[0];
        }),
        e
      );
    })()),
    (e = (function(e) {
      function t() {
        return t.__super__.constructor.apply(this, arguments);
      }
      return (
        o(t, a),
        (t.prototype.defaults = {
          autoOpen: !1,
          saveState: !1,
          dragAndDrop: !1,
          selectable: !0,
          useContextMenu: !0,
          onCanSelectNode: null,
          onSetStateFromStorage: null,
          onGetStateFromStorage: null,
          onCreateLi: null,
          onIsMoveHandle: null,
          onCanMove: null,
          onCanMoveTo: null,
          onLoadFailed: null,
          autoEscape: !0,
          dataUrl: null,
          closedIcon: "&#x25ba;",
          openedIcon: "&#x25bc;",
          slide: !0,
          nodeClass: u,
          dataFilter: null,
          keyboardSupport: !0,
          openFolderDelay: 500
        }),
        (t.prototype.toggle = function(e, t) {
          return null == t && (t = !0), e.is_open ? this.closeNode(e, t) : this.openNode(e, t);
        }),
        (t.prototype.getTree = function() {
          return this.tree;
        }),
        (t.prototype.selectNode = function(e) {
          return this._selectNode(e, !1);
        }),
        (t.prototype._selectNode = function(t, e) {
          var n, r, o, i;
          if ((null == e && (e = !1), this.select_node_handler)) {
            var s, l, d;
            if (
              ((n = function() {
                return s.options.onCanSelectNode
                  ? s.options.selectable && s.options.onCanSelectNode(t)
                  : s.options.selectable;
              }),
              (o = function() {
                var e;
                if ((e = t.parent) && e.parent && !e.is_open) return l.openNode(e, !1);
              }),
              (d = l = s = this),
              (i = function() {
                if (d.options.saveState) return d.save_state_handler.saveState();
              }),
              !t)
            )
              return this._deselectCurrentNode(), void i();
            if (n())
              return (
                this.select_node_handler.isNodeSelected(t)
                  ? e &&
                    (this._deselectCurrentNode(), this._triggerEvent("tree.select", { node: null, previous_node: t }))
                  : ((r = this.getSelectedNode()),
                    this._deselectCurrentNode(),
                    this.addToSelection(t),
                    this._triggerEvent("tree.select", { node: t, deselected_node: r }),
                    o()),
                i()
              );
          }
        }),
        (t.prototype.getSelectedNode = function() {
          return this.select_node_handler.getSelectedNode();
        }),
        (t.prototype.toJson = function() {
          return JSON.stringify(this.tree.getData());
        }),
        (t.prototype.loadData = function(e, t) {
          return this._loadData(e, t);
        }),
        (t.prototype.loadDataFromUrl = function(e, t, n) {
          return "string" !== p.type(e) && ((n = t), (t = e), (e = null)), this._loadDataFromUrl(e, t, n);
        }),
        (t.prototype.reload = function() {
          return this.loadDataFromUrl();
        }),
        (t.prototype._loadDataFromUrl = function(e, t, n) {
          var r, o, i, s, l, d, a, u, h;
          if (
            ((r = null),
            (o = function() {
              return (r = t ? new c(t, a).getLi() : a.element).addClass("jqtree-loading");
            }),
            (d = function() {
              if (r) return r.removeClass("jqtree-loading");
            }),
            (l = function() {
              if (("string" === p.type(e) && (e = { url: e }), !e.method)) return (e.method = "get");
            }),
            (i = function(e) {
              if ((d(), u._loadData(e, t), n && p.isFunction(n))) return n();
            }),
            (h = u = a = this),
            (s = function() {
              return (
                l(),
                p.ajax({
                  url: e.url,
                  data: e.data,
                  type: e.method.toUpperCase(),
                  cache: !1,
                  dataType: "json",
                  success: function(e) {
                    var t;
                    return (
                      (t = p.isArray(e) || "object" == typeof e ? e : p.parseJSON(e)),
                      h.options.dataFilter && (t = h.options.dataFilter(t)),
                      i(t)
                    );
                  },
                  error: function(e) {
                    if ((d(), h.options.onLoadFailed)) return h.options.onLoadFailed(e);
                  }
                })
              );
            }),
            e || (e = this._getDataUrlInfo(t)),
            o(),
            !1 === e || null === e)
          )
            d();
          else {
            if (!p.isArray(e)) return s();
            i(e);
          }
        }),
        (t.prototype._loadData = function(e, t) {
          var n, r, o, i;
          if (e) {
            if ((this._triggerEvent("tree.load_data", { tree_data: e }), t)) {
              for (o = 0, i = (r = this.select_node_handler.getSelectedNodesUnder(t)).length; o < i; o++)
                (n = r[o]), this.select_node_handler.removeFromSelection(n);
              t.loadFromData(e), (t.load_on_demand = !1), this._refreshElements(t.parent);
            } else this._initTree(e);
            return this.isDragging() ? this.dnd_handler.refresh() : void 0;
          }
        }),
        (t.prototype.getNodeById = function(e) {
          return this.tree.getNodeById(e);
        }),
        (t.prototype.getNodeByName = function(e) {
          return this.tree.getNodeByName(e);
        }),
        (t.prototype.openNode = function(e, t) {
          return null == t && (t = !0), this._openNode(e, t);
        }),
        (t.prototype._openNode = function(e, t, n) {
          var r, o, i;
          if (
            (null == t && (t = !0),
            (i = this),
            (r = function(e, t, n) {
              return new c(e, i).open(n, t);
            }),
            e.isFolder())
          ) {
            if (e.load_on_demand) return this._loadFolderOnDemand(e, t, n);
            for (o = e.parent; o && !o.is_open; ) o.parent && r(o, !1, null), (o = o.parent);
            return r(e, t, n), this._saveState();
          }
        }),
        (t.prototype._loadFolderOnDemand = function(e, t, n) {
          return (
            null == t && (t = !0),
            this._loadDataFromUrl(
              null,
              e,
              ((r = this),
              function() {
                return r._openNode(e, t, n);
              })
            )
          );
          var r;
        }),
        (t.prototype.closeNode = function(e, t) {
          if ((null == t && (t = !0), e.isFolder())) return new c(e, this).close(t), this._saveState();
        }),
        (t.prototype.isDragging = function() {
          return !!this.dnd_handler && this.dnd_handler.is_dragging;
        }),
        (t.prototype.refreshHitAreas = function() {
          return this.dnd_handler.refresh();
        }),
        (t.prototype.addNodeAfter = function(e, t) {
          var n;
          return (n = t.addAfter(e)), this._refreshElements(t.parent), n;
        }),
        (t.prototype.addNodeBefore = function(e, t) {
          var n;
          return (n = t.addBefore(e)), this._refreshElements(t.parent), n;
        }),
        (t.prototype.addParentNode = function(e, t) {
          var n;
          return (n = t.addParent(e)), this._refreshElements(n.parent), n;
        }),
        (t.prototype.removeNode = function(e) {
          var t;
          if ((t = e.parent))
            return this.select_node_handler.removeFromSelection(e, !0), e.remove(), this._refreshElements(t.parent);
        }),
        (t.prototype.appendNode = function(e, t) {
          var n, r;
          return (
            t || (t = this.tree),
            (n = t.isFolder()),
            (r = t.append(e)),
            n ? this._refreshElements(t) : this._refreshElements(t.parent),
            r
          );
        }),
        (t.prototype.prependNode = function(e, t) {
          var n;
          return t || (t = this.tree), (n = t.prepend(e)), this._refreshElements(t), n;
        }),
        (t.prototype.updateNode = function(e, t) {
          var n;
          return (
            (n = t.id && t.id !== e.id) && this.tree.removeNodeFromIndex(e),
            e.setData(t),
            n && this.tree.addNodeToIndex(e),
            this.renderer.renderNode(e),
            this._selectCurrentNode()
          );
        }),
        (t.prototype.moveNode = function(e, t, n) {
          var r;
          return (r = _.nameToIndex(n)), this.tree.moveNode(e, t, r), this._refreshElements();
        }),
        (t.prototype.getStateFromStorage = function() {
          return this.save_state_handler.getStateFromStorage();
        }),
        (t.prototype.addToSelection = function(e) {
          if (e)
            return (
              this.select_node_handler.addToSelection(e), this._getNodeElementForNode(e).select(), this._saveState()
            );
        }),
        (t.prototype.getSelectedNodes = function() {
          return this.select_node_handler.getSelectedNodes();
        }),
        (t.prototype.isNodeSelected = function(e) {
          return this.select_node_handler.isNodeSelected(e);
        }),
        (t.prototype.removeFromSelection = function(e) {
          return (
            this.select_node_handler.removeFromSelection(e),
            this._getNodeElementForNode(e).deselect(),
            this._saveState()
          );
        }),
        (t.prototype.scrollToNode = function(e) {
          var t;
          return (t = p(e.element).offset().top - this.$el.offset().top), this.scroll_handler.scrollTo(t);
        }),
        (t.prototype.getState = function() {
          return this.save_state_handler.getState();
        }),
        (t.prototype.setState = function(e) {
          return this.save_state_handler.setState(e), this._refreshElements();
        }),
        (t.prototype.setOption = function(e, t) {
          return (this.options[e] = t);
        }),
        (t.prototype._init = function() {
          if (
            (t.__super__._init.call(this),
            (this.element = this.$el),
            (this.mouse_delay = 300),
            (this.is_initialized = !1),
            (this.renderer = new s(this)),
            null != f ? (this.save_state_handler = new f(this)) : (this.options.saveState = !1),
            null != m && (this.select_node_handler = new m(this)),
            null != r ? (this.dnd_handler = new r(this)) : (this.options.dragAndDrop = !1),
            null != g && (this.scroll_handler = new g(this)),
            null != d && null != m && (this.key_handler = new d(this)),
            this._initData(),
            this.element.click(p.proxy(this._click, this)),
            this.element.dblclick(p.proxy(this._dblclick, this)),
            this.options.useContextMenu)
          )
            return this.element.bind("contextmenu", p.proxy(this._contextmenu, this));
        }),
        (t.prototype._deinit = function() {
          return (
            this.element.empty(),
            this.element.unbind(),
            this.key_handler.deinit(),
            (this.tree = null),
            t.__super__._deinit.call(this)
          );
        }),
        (t.prototype._initData = function() {
          return this.options.data ? this._loadData(this.options.data) : this._loadDataFromUrl(this._getDataUrlInfo());
        }),
        (t.prototype._getDataUrlInfo = function(r) {
          var o, e, i;
          return (
            (o = this.options.dataUrl || this.element.data("url")),
            (i = this),
            (e = function() {
              var e, t, n;
              return (
                (n = { url: o }),
                r && r.id
                  ? ((e = { node: r.id }), (n.data = e))
                  : (t = i._getNodeIdToBeSelected()) && ((e = { selected_node: t }), (n.data = e)),
                n
              );
            }),
            p.isFunction(o) ? o(r) : "string" === p.type(o) ? e() : o
          );
        }),
        (t.prototype._getNodeIdToBeSelected = function() {
          return this.options.saveState ? this.save_state_handler.getNodeIdToBeSelected() : null;
        }),
        (t.prototype._initTree = function(e) {
          if (
            ((this.tree = new this.options.nodeClass(null, !0, this.options.nodeClass)),
            this.select_node_handler && this.select_node_handler.clear(),
            this.tree.loadFromData(e),
            this._openNodes(),
            this._refreshElements(),
            !this.is_initialized)
          )
            return (this.is_initialized = !0), this._triggerEvent("tree.init");
        }),
        (t.prototype._openNodes = function() {
          var n;
          if (!((this.options.saveState && this.save_state_handler.restoreState()) || !1 === this.options.autoOpen))
            return (
              (n = !0 === this.options.autoOpen ? -1 : parseInt(this.options.autoOpen)),
              this.tree.iterate(function(e, t) {
                return e.hasChildren() && (e.is_open = !0), t !== n;
              })
            );
        }),
        (t.prototype._refreshElements = function(e) {
          return null == e && (e = null), this.renderer.render(e), this._triggerEvent("tree.refresh");
        }),
        (t.prototype._click = function(e) {
          var t, n;
          if ((t = this._getClickTarget(e.target))) {
            if ("button" === t.type)
              return this.toggle(t.node, this.options.slide), e.preventDefault(), e.stopPropagation();
            if (
              "label" === t.type &&
              ((n = t.node), !this._triggerEvent("tree.click", { node: n, click_event: e }).isDefaultPrevented())
            )
              return this._selectNode(n, !0);
          }
        }),
        (t.prototype._dblclick = function(e) {
          var t;
          if ((t = this._getClickTarget(e.target)) && "label" === t.type)
            return this._triggerEvent("tree.dblclick", { node: t.node, click_event: e });
        }),
        (t.prototype._getClickTarget = function(e) {
          var t, n, r, o;
          if ((t = (r = p(e)).closest(".jqtree-toggler")).length) {
            if ((o = this._getNode(t))) return { type: "button", node: o };
          } else if ((n = r.closest(".jqtree-element")).length && (o = this._getNode(n)))
            return { type: "label", node: o };
          return null;
        }),
        (t.prototype._getNode = function(e) {
          var t;
          return 0 === (t = e.closest("li.jqtree_common")).length ? null : t.data("node");
        }),
        (t.prototype._getNodeElementForNode = function(e) {
          return e.isFolder() ? new c(e, this) : new h(e, this);
        }),
        (t.prototype._getNodeElement = function(e) {
          var t;
          return (t = this._getNode(e)) ? this._getNodeElementForNode(t) : null;
        }),
        (t.prototype._contextmenu = function(e) {
          var t, n;
          if ((t = p(e.target).closest("ul.jqtree-tree .jqtree-element")).length && (n = this._getNode(t)))
            return (
              e.preventDefault(),
              e.stopPropagation(),
              this._triggerEvent("tree.contextmenu", { node: n, click_event: e }),
              !1
            );
        }),
        (t.prototype._saveState = function() {
          if (this.options.saveState) return this.save_state_handler.saveState();
        }),
        (t.prototype._mouseCapture = function(e) {
          return !!this.options.dragAndDrop && this.dnd_handler.mouseCapture(e);
        }),
        (t.prototype._mouseStart = function(e) {
          return !!this.options.dragAndDrop && this.dnd_handler.mouseStart(e);
        }),
        (t.prototype._mouseDrag = function(e) {
          var t;
          return (
            !!this.options.dragAndDrop &&
            ((t = this.dnd_handler.mouseDrag(e)), this.scroll_handler && this.scroll_handler.checkScrolling(), t)
          );
        }),
        (t.prototype._mouseStop = function(e) {
          return !!this.options.dragAndDrop && this.dnd_handler.mouseStop(e);
        }),
        (t.prototype._triggerEvent = function(e, t) {
          var n;
          return (n = p.Event(e)), p.extend(n, t), this.element.trigger(n), n;
        }),
        (t.prototype.testGenerateHitAreas = function(e) {
          return (
            (this.dnd_handler.current_item = this._getNodeElementForNode(e)),
            this.dnd_handler.generateHitAreas(),
            this.dnd_handler.hit_areas
          );
        }),
        (t.prototype._selectCurrentNode = function() {
          var e, t;
          if ((e = this.getSelectedNode()) && (t = this._getNodeElementForNode(e))) return t.select();
        }),
        (t.prototype._deselectCurrentNode = function() {
          var e;
          if ((e = this.getSelectedNode())) return this.removeFromSelection(e);
        }),
        t
      );
    })()),
    v.register(e, "tree"),
    (h = (function() {
      function e(e, t) {
        this.init(e, t);
      }
      return (
        (e.prototype.init = function(e, t) {
          return (
            (this.node = e),
            (this.tree_widget = t),
            e.element || (e.element = this.tree_widget.element),
            (this.$element = p(e.element))
          );
        }),
        (e.prototype.getUl = function() {
          return this.$element.children("ul:first");
        }),
        (e.prototype.getSpan = function() {
          return this.$element.children(".jqtree-element").find("span.jqtree-title");
        }),
        (e.prototype.getLi = function() {
          return this.$element;
        }),
        (e.prototype.addDropHint = function(e) {
          return e === _.INSIDE ? new n(this.$element) : new l(this.node, this.$element, e);
        }),
        (e.prototype.select = function() {
          return this.getLi().addClass("jqtree-selected");
        }),
        (e.prototype.deselect = function() {
          return this.getLi().removeClass("jqtree-selected");
        }),
        e
      );
    })()),
    (c = (function(e) {
      function t() {
        return t.__super__.constructor.apply(this, arguments);
      }
      return (
        o(t, h),
        (t.prototype.open = function(e, t) {
          var n, r, o;
          if ((null == t && (t = !0), !this.node.is_open))
            return (
              (this.node.is_open = !0),
              (n = this.getButton()).removeClass("jqtree-closed"),
              n.html(""),
              n.append(this.tree_widget.renderer.opened_icon_element.cloneNode()),
              (o = this),
              (r = function() {
                return (
                  o.getLi().removeClass("jqtree-closed"),
                  e && e(),
                  o.tree_widget._triggerEvent("tree.open", { node: o.node })
                );
              }),
              t ? this.getUl().slideDown("fast", r) : (this.getUl().show(), r())
            );
        }),
        (t.prototype.close = function(e) {
          var t, n, r;
          if ((null == e && (e = !0), this.node.is_open))
            return (
              (this.node.is_open = !1),
              (t = this.getButton()).addClass("jqtree-closed"),
              t.html(""),
              t.append(this.tree_widget.renderer.closed_icon_element.cloneNode()),
              (r = this),
              (n = function() {
                return r.getLi().addClass("jqtree-closed"), r.tree_widget._triggerEvent("tree.close", { node: r.node });
              }),
              e ? this.getUl().slideUp("fast", n) : (this.getUl().hide(), n())
            );
        }),
        (t.prototype.getButton = function() {
          return this.$element.children(".jqtree-element").find("a.jqtree-toggler");
        }),
        (t.prototype.addDropHint = function(e) {
          return this.node.is_open || e !== _.INSIDE ? new l(this.node, this.$element, e) : new n(this.$element);
        }),
        t
      );
    })()),
    (S = function(e) {
      return ("" + e)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
    }),
    (F = function(e, t) {
      var n, r, o;
      for (n = r = 0, o = e.length; r < o; n = ++r) if (e[n] === t) return n;
      return -1;
    }),
    (w = function(e, t) {
      return e.indexOf ? e.indexOf(t) : F(e, t);
    }),
    (this.Tree.indexOf = w),
    (this.Tree._indexOf = F),
    (C = function(e) {
      return "number" == typeof e && e % 1 == 0;
    }),
    (N = function() {
      var t, n, a, u;
      return (
        (t = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g),
        (n = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }),
        (a = function(e) {
          return (
            (t.lastIndex = 0),
            t.test(e)
              ? '"' +
                e.replace(t, function(e) {
                  var t;
                  return "string" == typeof (t = n[e]) ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
              : '"' + e + '"'
          );
        }),
        (u = function(e, t) {
          var n, r, o, i, s, l, d;
          switch (typeof (s = t[e])) {
            case "string":
              return a(s);
            case "number":
              return isFinite(s) ? String(s) : "null";
            case "boolean":
            case "null":
              return String(s);
            case "object":
              if (!s) return "null";
              if (((o = []), "[object Array]" === Object.prototype.toString.apply(s))) {
                for (n = l = 0, d = s.length; l < d; n = ++l) (i = s[n]), (o[n] = u(n, s) || "null");
                return 0 === o.length ? "[]" : "[" + o.join(",") + "]";
              }
              for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (i = u(r, s)) && o.push(a(r) + ":" + i);
              return 0 === o.length ? "{}" : "{" + o.join(",") + "}";
          }
        }),
        function(e) {
          return u("", { "": e });
        }
      );
    }),
    (this.Tree.get_json_stringify_function = N),
    (null != this.JSON && null != this.JSON.stringify && "function" == typeof this.JSON.stringify) ||
      (null == this.JSON && (this.JSON = {}), (this.JSON.stringify = N())),
    (f = (function() {
      function e(e) {
        this.tree_widget = e;
      }
      return (
        (e.prototype.saveState = function() {
          var e;
          return (
            (e = JSON.stringify(this.getState())),
            this.tree_widget.options.onSetStateFromStorage
              ? this.tree_widget.options.onSetStateFromStorage(e)
              : this.supportsLocalStorage()
              ? localStorage.setItem(this.getCookieName(), e)
              : p.cookie
              ? ((p.cookie.raw = !0), p.cookie(this.getCookieName(), e, { path: "/" }))
              : void 0
          );
        }),
        (e.prototype.restoreState = function() {
          var e;
          return !!(e = this.getStateFromStorage()) && (this.setState(p.parseJSON(e)), !0);
        }),
        (e.prototype.getStateFromStorage = function() {
          return this.tree_widget.options.onGetStateFromStorage
            ? this.tree_widget.options.onGetStateFromStorage()
            : this.supportsLocalStorage()
            ? localStorage.getItem(this.getCookieName())
            : p.cookie
            ? ((p.cookie.raw = !0), p.cookie(this.getCookieName()))
            : null;
        }),
        (e.prototype.getState = function() {
          var e, n, t;
          return (
            (t = n = this),
            (e = function() {
              var o;
              return function() {
                var e, t, n, r;
                for (r = [], e = 0, t = (n = this.tree_widget.getSelectedNodes()).length; e < t; e++)
                  (o = n[e]), r.push(o.id);
                return r;
              }.call(t);
            }),
            {
              open_nodes: (function() {
                var t;
                return (
                  (t = []),
                  n.tree_widget.tree.iterate(function(e) {
                    return e.is_open && e.id && e.hasChildren() && t.push(e.id), !0;
                  }),
                  t
                );
              })(),
              selected_node: e()
            }
          );
        }),
        (e.prototype.setState = function(e) {
          var t, n, r, o, i, s, l;
          if (
            e &&
            ((n = e.open_nodes),
            (o = e.selected_node),
            C(o) && (o = [o]),
            this.tree_widget.tree.iterate(function(e) {
              return (e.is_open = e.id && e.hasChildren() && 0 <= w(n, e.id)), !0;
            }),
            o && this.tree_widget.select_node_handler)
          ) {
            for (this.tree_widget.select_node_handler.clear(), l = [], i = 0, s = o.length; i < s; i++)
              (t = o[i]),
                (r = this.tree_widget.getNodeById(t))
                  ? l.push(this.tree_widget.select_node_handler.addToSelection(r))
                  : l.push(void 0);
            return l;
          }
        }),
        (e.prototype.getCookieName = function() {
          return "string" == typeof this.tree_widget.options.saveState ? this.tree_widget.options.saveState : "tree";
        }),
        (e.prototype.supportsLocalStorage = function() {
          var e;
          return (
            (e = function() {
              var e;
              if ("undefined" == typeof localStorage || null === localStorage) return !1;
              try {
                (e = "_storage_test"), sessionStorage.setItem(e, !0), sessionStorage.removeItem(e);
              } catch (e) {
                return e, !1;
              }
              return !0;
            }),
            null == this._supportsLocalStorage && (this._supportsLocalStorage = e()),
            this._supportsLocalStorage
          );
        }),
        (e.prototype.getNodeIdToBeSelected = function() {
          var e;
          return (e = this.getStateFromStorage()) ? p.parseJSON(e).selected_node : null;
        }),
        e
      );
    })()),
    (m = (function() {
      function e(e) {
        (this.tree_widget = e), this.clear();
      }
      return (
        (e.prototype.getSelectedNode = function() {
          var e;
          return !!(e = this.getSelectedNodes()).length && e[0];
        }),
        (e.prototype.getSelectedNodes = function() {
          var e, t, n;
          if (this.selected_single_node) return [this.selected_single_node];
          for (e in ((n = []), this.selected_nodes)) (t = this.tree_widget.getNodeById(e)) && n.push(t);
          return n;
        }),
        (e.prototype.getSelectedNodesUnder = function(e) {
          var t, n, r;
          if (this.selected_single_node)
            return e.isParentOf(this.selected_single_node) ? [this.selected_single_node] : [];
          for (t in ((r = []), this.selected_nodes))
            (n = this.tree_widget.getNodeById(t)) && e.isParentOf(n) && r.push(n);
          return r;
        }),
        (e.prototype.isNodeSelected = function(e) {
          return e.id
            ? this.selected_nodes[e.id]
            : !!this.selected_single_node && this.selected_single_node.element === e.element;
        }),
        (e.prototype.clear = function() {
          return (this.selected_nodes = {}), (this.selected_single_node = null);
        }),
        (e.prototype.removeFromSelection = function(t, e) {
          if ((null == e && (e = !1), t.id)) {
            if ((delete this.selected_nodes[t.id], e))
              return t.iterate(
                ((n = this),
                function(e) {
                  return delete n.selected_nodes[t.id], !0;
                })
              );
          } else if (this.selected_single_node && t.element === this.selected_single_node.element)
            return (this.selected_single_node = null);
          var n;
        }),
        (e.prototype.addToSelection = function(e) {
          return e.id ? (this.selected_nodes[e.id] = !0) : (this.selected_single_node = e);
        }),
        e
      );
    })()),
    (r = (function() {
      function e(e) {
        (this.tree_widget = e),
          (this.hovered_area = null),
          (this.$ghost = null),
          (this.hit_areas = []),
          (this.is_dragging = !1),
          (this.current_item = null);
      }
      return (
        (e.prototype.mouseCapture = function(e) {
          var t, n;
          return (
            (t = p(e.target)),
            this.mustCaptureElement(t)
              ? this.tree_widget.options.onIsMoveHandle && !this.tree_widget.options.onIsMoveHandle(t)
                ? null
                : ((n = this.tree_widget._getNodeElement(t)) &&
                    this.tree_widget.options.onCanMove &&
                    (this.tree_widget.options.onCanMove(n.node) || (n = null)),
                  (this.current_item = n),
                  null !== this.current_item)
              : null
          );
        }),
        (e.prototype.mouseStart = function(e) {
          var t;
          return (
            this.refresh(),
            (t = p(e.target).offset()),
            (this.drag_element = new i(
              this.current_item.node,
              e.page_x - t.left,
              e.page_y - t.top,
              this.tree_widget.element
            )),
            (this.is_dragging = !0),
            this.current_item.$element.addClass("jqtree-moving"),
            !0
          );
        }),
        (e.prototype.mouseDrag = function(e) {
          var t;
          return (
            this.drag_element.move(e.page_x, e.page_y),
            (t = this.findHoveredArea(e.page_x, e.page_y)),
            this.canMoveToArea(t) && t
              ? this.hovered_area !== t &&
                ((this.hovered_area = t),
                this.mustOpenFolderTimer(t) && this.startOpenFolderTimer(t.node),
                this.updateDropHint())
              : (this.removeHover(), this.removeDropHint(), this.stopOpenFolderTimer()),
            !0
          );
        }),
        (e.prototype.mustCaptureElement = function(e) {
          return !e.is("input,select");
        }),
        (e.prototype.canMoveToArea = function(e) {
          var t;
          return (
            !!e &&
            (!this.tree_widget.options.onCanMoveTo ||
              ((t = _.getName(e.position)), this.tree_widget.options.onCanMoveTo(this.current_item.node, e.node, t)))
          );
        }),
        (e.prototype.mouseStop = function(e) {
          return (
            this.moveItem(e),
            this.clear(),
            this.removeHover(),
            this.removeDropHint(),
            this.removeHitAreas(),
            this.current_item && (this.current_item.$element.removeClass("jqtree-moving"), (this.current_item = null)),
            (this.is_dragging = !1)
          );
        }),
        (e.prototype.refresh = function() {
          if (
            (this.removeHitAreas(),
            this.generateHitAreas(),
            this.current_item &&
              ((this.current_item = this.tree_widget._getNodeElementForNode(this.current_item.node)), this.is_dragging))
          )
            return this.current_item.$element.addClass("jqtree-moving");
        }),
        (e.prototype.removeHitAreas = function() {
          return (this.hit_areas = []);
        }),
        (e.prototype.clear = function() {
          return this.drag_element.remove(), (this.drag_element = null);
        }),
        (e.prototype.removeDropHint = function() {
          if (this.previous_ghost) return this.previous_ghost.remove();
        }),
        (e.prototype.removeHover = function() {
          return (this.hovered_area = null);
        }),
        (e.prototype.generateHitAreas = function() {
          var e;
          return (
            (e = new t(this.tree_widget.tree, this.current_item.node, this.getTreeDimensions().bottom)),
            (this.hit_areas = e.generate())
          );
        }),
        (e.prototype.findHoveredArea = function(e, t) {
          var n, r, o, i, s;
          if (e < (r = this.getTreeDimensions()).left || t < r.top || e > r.right || t > r.bottom) return null;
          for (i = 0, o = this.hit_areas.length; i < o; )
            if (((s = (i + o) >> 1), t < (n = this.hit_areas[s]).top)) o = s;
            else {
              if (!(t > n.bottom)) return n;
              i = 1 + s;
            }
          return null;
        }),
        (e.prototype.mustOpenFolderTimer = function(e) {
          var t;
          return (t = e.node).isFolder() && !t.is_open && e.position === _.INSIDE;
        }),
        (e.prototype.updateDropHint = function() {
          var e;
          if (this.hovered_area)
            return (
              this.removeDropHint(),
              (e = this.tree_widget._getNodeElementForNode(this.hovered_area.node)),
              (this.previous_ghost = e.addDropHint(this.hovered_area.position))
            );
        }),
        (e.prototype.startOpenFolderTimer = function(e) {
          var t, n;
          return (
            (t = function() {
              return n.tree_widget._openNode(e, n.tree_widget.options.slide, function() {
                return n.refresh(), n.updateDropHint();
              });
            }),
            (n = this).stopOpenFolderTimer(),
            (this.open_folder_timer = setTimeout(t, this.tree_widget.options.openFolderDelay))
          );
        }),
        (e.prototype.stopOpenFolderTimer = function() {
          if (this.open_folder_timer) return clearTimeout(this.open_folder_timer), (this.open_folder_timer = null);
        }),
        (e.prototype.moveItem = function(e) {
          var t, n, r, o, i, s;
          if (
            this.hovered_area &&
            this.hovered_area.position !== _.NONE &&
            this.canMoveToArea(this.hovered_area) &&
            ((n = this.current_item.node),
            (i = this.hovered_area.node),
            (r = this.hovered_area.position),
            (o = n.parent),
            r === _.INSIDE && (this.hovered_area.node.is_open = !0),
            (t = function() {
              return (
                s.tree_widget.tree.moveNode(n, i, r), s.tree_widget.element.empty(), s.tree_widget._refreshElements()
              );
            }),
            !(s = this).tree_widget
              ._triggerEvent("tree.move", {
                move_info: {
                  moved_node: n,
                  target_node: i,
                  position: _.getName(r),
                  previous_parent: o,
                  do_move: t,
                  original_event: e.original_event
                }
              })
              .isDefaultPrevented())
          )
            return t();
        }),
        (e.prototype.getTreeDimensions = function() {
          var e;
          return {
            left: (e = this.tree_widget.element.offset()).left,
            top: e.top,
            right: e.left + this.tree_widget.element.width(),
            bottom: e.top + this.tree_widget.element.height() + 16
          };
        }),
        e
      );
    })()),
    (y = (function() {
      function e(e) {
        this.tree = e;
      }
      return (
        (e.prototype.iterate = function() {
          var a, u, h;
          return (
            (a = !0),
            (u = function(e, t) {
              var n, r, o, i, s, l, d;
              if (((i = (e.is_open || !e.element) && e.hasChildren()), e.element)) {
                if (!(n = p(e.element)).is(":visible")) return;
                a && (h.handleFirstNode(e, n), (a = !1)),
                  e.hasChildren()
                    ? e.is_open
                      ? h.handleOpenFolder(e, n) || (i = !1)
                      : h.handleClosedFolder(e, t, n)
                    : h.handleNode(e, t, n);
              }
              if (i) {
                for (r = e.children.length, o = s = 0, l = (d = e.children).length; s < l; o = ++s)
                  d[o], u(e.children[o], o === r - 1 ? null : e.children[o + 1]);
                if (e.is_open) return h.handleAfterOpenFolder(e, t, n);
              }
            })((h = this).tree, null)
          );
        }),
        (e.prototype.handleNode = function(e, t, n) {}),
        (e.prototype.handleOpenFolder = function(e, t) {}),
        (e.prototype.handleClosedFolder = function(e, t, n) {}),
        (e.prototype.handleAfterOpenFolder = function(e, t, n) {}),
        (e.prototype.handleFirstNode = function(e, t) {}),
        e
      );
    })()),
    (t = (function(e) {
      function r(e, t, n) {
        r.__super__.constructor.call(this, e), (this.current_node = t), (this.tree_bottom = n);
      }
      return (
        o(r, y),
        (r.prototype.generate = function() {
          return (this.positions = []), (this.last_top = 0), this.iterate(), this.generateHitAreas(this.positions);
        }),
        (r.prototype.getTop = function(e) {
          return e.offset().top;
        }),
        (r.prototype.addPosition = function(e, t, n) {
          var r;
          return (r = { top: n, node: e, position: t }), this.positions.push(r), (this.last_top = n);
        }),
        (r.prototype.handleNode = function(e, t, n) {
          var r;
          return (
            (r = this.getTop(n)),
            e === this.current_node ? this.addPosition(e, _.NONE, r) : this.addPosition(e, _.INSIDE, r),
            t === this.current_node || e === this.current_node
              ? this.addPosition(e, _.NONE, r)
              : this.addPosition(e, _.AFTER, r)
          );
        }),
        (r.prototype.handleOpenFolder = function(e, t) {
          return (
            e !== this.current_node &&
            (e.children[0] !== this.current_node && this.addPosition(e, _.INSIDE, this.getTop(t)), !0)
          );
        }),
        (r.prototype.handleClosedFolder = function(e, t, n) {
          var r;
          return (
            (r = this.getTop(n)),
            e === this.current_node
              ? this.addPosition(e, _.NONE, r)
              : (this.addPosition(e, _.INSIDE, r), t !== this.current_node ? this.addPosition(e, _.AFTER, r) : void 0)
          );
        }),
        (r.prototype.handleFirstNode = function(e, t) {
          if (e !== this.current_node) return this.addPosition(e, _.BEFORE, this.getTop(p(e.element)));
        }),
        (r.prototype.handleAfterOpenFolder = function(e, t, n) {
          return e === this.current_node.node || t === this.current_node.node
            ? this.addPosition(e, _.NONE, this.last_top)
            : this.addPosition(e, _.AFTER, this.last_top);
        }),
        (r.prototype.generateHitAreas = function(e) {
          var t, n, r, o, i, s;
          for (o = -1, t = [], n = [], i = 0, s = e.length; i < s; i++)
            (r = e[i]).top !== o &&
              t.length &&
              (t.length && this.generateHitAreasForGroup(n, t, o, r.top), (o = r.top), (t = [])),
              t.push(r);
          return this.generateHitAreasForGroup(n, t, o, this.tree_bottom), n;
        }),
        (r.prototype.generateHitAreasForGroup = function(e, t, n, r) {
          var o, i, s, l, d;
          for (d = Math.min(t.length, 4), o = Math.round((r - n) / d), i = n, s = 0; s < d; )
            (l = t[s]), e.push({ top: i, bottom: i + o, node: l.node, position: l.position }), (i += o), (s += 1);
          return null;
        }),
        r
      );
    })()),
    (i = (function() {
      function e(e, t, n, r) {
        (this.offset_x = t),
          (this.offset_y = n),
          (this.$element = p('<span class="jqtree-title jqtree-dragging">' + e.name + "</span>")),
          this.$element.css("position", "absolute"),
          r.append(this.$element);
      }
      return (
        (e.prototype.move = function(e, t) {
          return this.$element.offset({ left: e - this.offset_x, top: t - this.offset_y });
        }),
        (e.prototype.remove = function() {
          return this.$element.remove();
        }),
        e
      );
    })()),
    (l = (function() {
      function e(e, t, n) {
        (this.$element = t),
          (this.node = e),
          (this.$ghost = p(
            '<li class="jqtree_common jqtree-ghost"><span class="jqtree_common jqtree-circle"></span><span class="jqtree_common jqtree-line"></span></li>'
          )),
          n === _.AFTER
            ? this.moveAfter()
            : n === _.BEFORE
            ? this.moveBefore()
            : n === _.INSIDE && (e.isFolder() && e.is_open ? this.moveInsideOpenFolder() : this.moveInside());
      }
      return (
        (e.prototype.remove = function() {
          return this.$ghost.remove();
        }),
        (e.prototype.moveAfter = function() {
          return this.$element.after(this.$ghost);
        }),
        (e.prototype.moveBefore = function() {
          return this.$element.before(this.$ghost);
        }),
        (e.prototype.moveInsideOpenFolder = function() {
          return p(this.node.children[0].element).before(this.$ghost);
        }),
        (e.prototype.moveInside = function() {
          return this.$element.after(this.$ghost), this.$ghost.addClass("jqtree-inside");
        }),
        e
      );
    })()),
    (n = (function() {
      function e(e) {
        var t, n;
        (t = e.children(".jqtree-element")),
          (n = e.width() - 4),
          (this.$hint = p('<span class="jqtree-border"></span>')),
          t.append(this.$hint),
          this.$hint.css({ width: n, height: t.height() - 4 });
      }
      return (
        (e.prototype.remove = function() {
          return this.$hint.remove();
        }),
        e
      );
    })()),
    (g = (function() {
      function e(e) {
        (this.tree_widget = e), (this.previous_top = -1), this._initScrollParent();
      }
      return (
        (e.prototype._initScrollParent = function() {
          var e, t, n, s, r;
          return (
            (t = function() {
              var i, e, t, n, r, o;
              if (
                ((i = ["overflow", "overflow-y"]),
                (t = function(e) {
                  var t, n, r, o;
                  for (n = 0, r = i.length; n < r; n++)
                    if (((t = i[n]), "auto" === (o = p.css(e, t)) || "scroll" === o)) return !0;
                  return !1;
                })(s.tree_widget.$el[0]))
              )
                return s.tree_widget.$el;
              for (n = 0, r = (o = s.tree_widget.$el.parents()).length; n < r; n++) if (t((e = o[n]))) return p(e);
              return null;
            }),
            (n = function() {
              return (r.scroll_parent_top = 0), (r.$scroll_parent = null);
            }),
            "fixed" === (r = s = this).tree_widget.$el.css("position") && n(),
            (e = t()) && e.length && "HTML" !== e[0].tagName
              ? ((this.$scroll_parent = e), (this.scroll_parent_top = this.$scroll_parent.offset().top))
              : n()
          );
        }),
        (e.prototype.checkScrolling = function() {
          var e;
          if ((e = this.tree_widget.dnd_handler.hovered_area) && e.top !== this.previous_top)
            return (
              (this.previous_top = e.top),
              this.$scroll_parent ? this._handleScrollingWithScrollParent(e) : this._handleScrollingWithDocument(e)
            );
        }),
        (e.prototype._handleScrollingWithScrollParent = function(e) {
          return this.scroll_parent_top + this.$scroll_parent[0].offsetHeight - e.bottom < 20
            ? ((this.$scroll_parent[0].scrollTop += 20), this.tree_widget.refreshHitAreas(), (this.previous_top = -1))
            : e.top - this.scroll_parent_top < 20
            ? ((this.$scroll_parent[0].scrollTop -= 20), this.tree_widget.refreshHitAreas(), (this.previous_top = -1))
            : void 0;
        }),
        (e.prototype._handleScrollingWithDocument = function(e) {
          return e.top - p(document).scrollTop() < 20
            ? p(document).scrollTop(p(document).scrollTop() - 20)
            : p(window).height() - (e.bottom - p(document).scrollTop()) < 20
            ? p(document).scrollTop(p(document).scrollTop() + 20)
            : void 0;
        }),
        (e.prototype.scrollTo = function(e) {
          var t;
          return this.$scroll_parent
            ? (this.$scroll_parent[0].scrollTop = e)
            : ((t = this.tree_widget.$el.offset().top), p(document).scrollTop(e + t));
        }),
        (e.prototype.isScrolledIntoView = function(e) {
          var t, n, r, o;
          return (
            (t = p(e)),
            (this.$scroll_parent
              ? ((o = 0),
                (r = this.$scroll_parent.height()),
                (n = t.offset().top - this.scroll_parent_top) + t.height())
              : ((r = (o = p(window).scrollTop()) + p(window).height()), (n = t.offset().top) + t.height())) <= r &&
              o <= n
          );
        }),
        e
      );
    })()),
    (d = (function() {
      function e(e) {
        (this.tree_widget = e).options.keyboardSupport &&
          p(document).bind("keydown.jqtree", p.proxy(this.handleKeyDown, this));
      }
      return (
        37,
        38,
        39,
        40,
        (e.prototype.deinit = function() {
          return p(document).unbind("keydown.jqtree");
        }),
        (e.prototype.handleKeyDown = function(e) {
          var t, n, r, o, i, s;
          if (this.tree_widget.options.keyboardSupport) {
            if (p(document.activeElement).is("textarea,input,select")) return !0;
            var l, d, a, u, h;
            if (
              ((t = this.tree_widget.getSelectedNode()),
              (s = function(e) {
                return (
                  !e ||
                  (l.tree_widget.selectNode(e),
                  l.tree_widget.scroll_handler &&
                    !l.tree_widget.scroll_handler.isScrolledIntoView(p(e.element).find(".jqtree-element")) &&
                    l.tree_widget.scrollToNode(e),
                  !1)
                );
              }),
              (n = function() {
                return s(d.getNextNode(t));
              }),
              (i = function() {
                return s(a.getPreviousNode(t));
              }),
              (o = function() {
                return !(t.isFolder() && !t.is_open && (u.tree_widget.openNode(t), 1));
              }),
              (h = u = a = d = l = this),
              (r = function() {
                return !t.isFolder() || !t.is_open || (h.tree_widget.closeNode(t), !1);
              }),
              !t)
            )
              return !0;
            switch (e.which) {
              case 40:
                return n();
              case 38:
                return i();
              case 39:
                return o();
              case 37:
                return r();
            }
          }
        }),
        (e.prototype.getNextNode = function(e, t) {
          return (
            null == t && (t = !0),
            t && e.hasChildren() && e.is_open
              ? e.children[0]
              : e.parent
              ? e.getNextSibling() || this.getNextNode(e.parent, !1)
              : null
          );
        }),
        (e.prototype.getPreviousNode = function(e) {
          var t;
          return e.parent
            ? (t = e.getPreviousSibling())
              ? t.hasChildren() && t.is_open
                ? this.getLastChild(t)
                : t
              : e.parent.parent
              ? e.parent
              : null
            : null;
        }),
        (e.prototype.getLastChild = function(e) {
          var t;
          return e.hasChildren()
            ? (t = e.children[e.children.length - 1]).hasChildren() && t.is_open
              ? this.getLastChild(t)
              : t
            : null;
        }),
        e
      );
    })());
}.call(this));
