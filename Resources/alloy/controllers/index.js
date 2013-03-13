function Controller() {
    function doClick(e) {
        alert($.label.text);
    }
    function openSettings(e) {
        var view = settings.getView();
        $.nav.open(view);
    }
    function openStats(e) {
        var view = stats.getView();
        $.nav.open(view);
    }
    function openClass(e) {
        var view = courses.getView();
        $.nav.open(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.addTopLevelView($.__views.index);
    $.__views.profileWin = Ti.UI.createWindow({
        id: "profileWin",
        title: "My Profile"
    });
    $.__views.__alloyId10 = Alloy.createController("studentinfo", {
        id: "__alloyId10"
    });
    $.__views.__alloyId10.setParent($.__views.profileWin);
    $.__views.__alloyId11 = Ti.UI.createTableViewSection({
        headerTitle: "My Courses",
        id: "__alloyId11"
    });
    var __alloyId12 = [];
    __alloyId12.push($.__views.__alloyId11);
    $.__views.__alloyId13 = Ti.UI.createTableViewRow({
        height: "50dp",
        layout: "composite",
        id: "__alloyId13"
    });
    $.__views.__alloyId11.add($.__views.__alloyId13);
    openClass ? $.__views.__alloyId13.addEventListener("click", openClass) : __defers["$.__views.__alloyId13!click!openClass"] = !0;
    $.__views.__alloyId14 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "8dp",
        font: {
            fontSize: "32dp"
        },
        text: "foo",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        right: "8dp",
        font: {
            fontSize: "28dp"
        },
        text: "(4)",
        id: "__alloyId15"
    });
    $.__views.__alloyId13.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createTableViewRow({
        height: "50dp",
        layout: "composite",
        id: "__alloyId16"
    });
    $.__views.__alloyId11.add($.__views.__alloyId16);
    openClass ? $.__views.__alloyId16.addEventListener("click", openClass) : __defers["$.__views.__alloyId16!click!openClass"] = !0;
    $.__views.__alloyId17 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "8dp",
        font: {
            fontSize: "32dp"
        },
        text: "bar",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        right: "8dp",
        font: {
            fontSize: "28dp"
        },
        text: "(7)",
        id: "__alloyId18"
    });
    $.__views.__alloyId16.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createTableViewRow({
        height: "50dp",
        layout: "composite",
        id: "__alloyId19"
    });
    $.__views.__alloyId11.add($.__views.__alloyId19);
    openClass ? $.__views.__alloyId19.addEventListener("click", openClass) : __defers["$.__views.__alloyId19!click!openClass"] = !0;
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        left: "8dp",
        font: {
            fontSize: "32dp"
        },
        text: "boo",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        right: "8dp",
        font: {
            fontSize: "28dp"
        },
        text: "(3)",
        id: "__alloyId21"
    });
    $.__views.__alloyId19.add($.__views.__alloyId21);
    $.__views.course_list = Ti.UI.createTableView({
        top: "30%",
        height: "180dp",
        data: __alloyId12,
        filterAttribute: "title",
        id: "course_list"
    });
    $.__views.profileWin.add($.__views.course_list);
    $.__views.settings = Ti.UI.createTableViewRow({
        height: "50dp",
        layout: "composite",
        id: "settings"
    });
    var __alloyId22 = [];
    __alloyId22.push($.__views.settings);
    openSettings ? $.__views.settings.addEventListener("click", openSettings) : __defers["$.__views.settings!click!openSettings"] = !0;
    $.__views.settings_label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "settings_label",
        text: "Settings"
    });
    $.__views.settings.add($.__views.settings_label);
    $.__views.stats = Ti.UI.createTableViewRow({
        height: "50dp",
        layout: "composite",
        id: "stats"
    });
    __alloyId22.push($.__views.stats);
    openStats ? $.__views.stats.addEventListener("click", openStats) : __defers["$.__views.stats!click!openStats"] = !0;
    $.__views.stats_label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        id: "stats_label",
        text: "My Stats"
    });
    $.__views.stats.add($.__views.stats_label);
    $.__views.menu_items = Ti.UI.createTableView({
        top: "80%",
        data: __alloyId22,
        id: "menu_items"
    });
    $.__views.profileWin.add($.__views.menu_items);
    $.__views.nav = Ti.UI.iPhone.createNavigationGroup({
        window: $.__views.profileWin,
        id: "nav",
        backgroundColor: "white"
    });
    $.__views.index.add($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var settings = Alloy.createController("settings"), stats = Alloy.createController("signup"), courses = Alloy.createController("course");
    $.index.open();
    __defers["$.__views.__alloyId13!click!openClass"] && $.__views.__alloyId13.addEventListener("click", openClass);
    __defers["$.__views.__alloyId16!click!openClass"] && $.__views.__alloyId16.addEventListener("click", openClass);
    __defers["$.__views.__alloyId19!click!openClass"] && $.__views.__alloyId19.addEventListener("click", openClass);
    __defers["$.__views.settings!click!openSettings"] && $.__views.settings.addEventListener("click", openSettings);
    __defers["$.__views.stats!click!openStats"] && $.__views.stats.addEventListener("click", openStats);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;