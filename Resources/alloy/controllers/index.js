function Controller() {
    function doClick(e) {
        alert($.label.text);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.profileWin = Ti.UI.createWindow({
        id: "profileWin",
        title: "My Profile"
    });
    $.__views.__alloyId1 = Alloy.createController("studentinfo", {
        id: "__alloyId1"
    });
    $.__views.__alloyId1.setParent($.__views.profileWin);
    $.__views.profile = Ti.UI.createTab({
        window: $.__views.profileWin,
        id: "profile",
        title: "My Profile"
    });
    $.__views.index.addTab($.__views.profile);
    $.__views.courseWin = Ti.UI.createWindow({
        id: "courseWin",
        title: "My Courses"
    });
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        text: "Classes go here",
        id: "label"
    });
    $.__views.courseWin.add($.__views.label);
    doClick ? $.__views.label.addEventListener("click", doClick) : __defers["$.__views.label!click!doClick"] = !0;
    $.__views.course = Ti.UI.createTab({
        window: $.__views.courseWin,
        id: "course",
        title: "My Classes"
    });
    $.__views.index.addTab($.__views.course);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.label!click!doClick"] && $.__views.label.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;