(function($) {
  // TODO: make the node ID configurable
  var treeNode = $("#jsdoc-toc-nav");

  // initialize the tree
  treeNode.tree({
    autoEscape: false,
    closedIcon: "&#x21e2;",
    data: [
      { label: '<a href="global.html">Globals</a>', id: "global", children: [] },
      { label: '<a href="module-config.html">config</a>', id: "module:config", children: [] },
      { label: '<a href="module-conversion.html">conversion</a>', id: "module:conversion", children: [] },
      { label: '<a href="module-middlewares.html">middlewares</a>', id: "module:middlewares", children: [] },
      { label: '<a href="module-utils.html">utils</a>', id: "module:utils", children: [] }
    ],
    openedIcon: " &#x21e3;",
    saveState: true,
    useContextMenu: false
  });

  // add event handlers
  // TODO
})(jQuery);
