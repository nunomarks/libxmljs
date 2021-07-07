import * as libxml from "../index";
import { XMLElement } from "../lib/node";

module.exports.basic = function (assert: any) {
    // reading a node is implied during all tests
    var doc = libxml.Document();
    var elem = doc.node("name");
    elem.attr({ to: "wongfoo" });
    assert.equal("wongfoo", elem.attr("to")?.value());
    assert.done();
};

module.exports.null = function (assert: any) {
    var doc = libxml.Document();
    var elem = doc.node("name");
    assert.equal(null, elem.attr("to"));
    assert.done();
};

module.exports.assign_object = function (assert: any) {
    var doc = libxml.Document();
    var elem = doc.node("name");
    elem.attr({ to: "wongfoo" });
    assert.equal("wongfoo", elem.attr("to")?.value());
    assert.done();
};

module.exports.change = function (assert: any) {
    var doc = libxml.Document();
    var elem = doc.node("name");
    elem.attr({ to: "wongfoo" });
    assert.equal("wongfoo", elem.attr("to")?.value());
    elem.attr({ to: "julie newmar" });
    assert.equal("julie newmar", elem.attr("to")?.value());
    assert.done();
};

module.exports.attrs = function (assert: any) {
    var doc = libxml.Document();
    var elem = doc.node("root");

    assert.deepEqual([], elem.attrs());

    elem.attr({ foo: "bar" });
    elem.attr({ bar: "baz" });
    elem.attr({ baz: "foo" });

    var attrs = [elem.attr("foo"), elem.attr("bar"), elem.attr("baz")];
    for (var i = 0; i < 3; ++i) {
        // console.log(attrs[i]);
        // console.log(elem.attrs()[i]);
        assert.ok(attrs[i] == elem.attrs()[i]);
    }
    assert.done();
};

module.exports.siblings = function (assert: any) {
    var doc = libxml.Document();
    var elem = doc.node("root");
    elem.attr({ foo: "bar" });
    elem.attr({ bar: "baz" });
    elem.attr({ baz: "foo" });
    assert.equal(elem.attr("baz"), elem.attr("bar")?.nextSibling());
    assert.equal(elem.attr("foo"), elem.attr("bar")?.prevSibling());
    assert.equal(null, elem.attr("foo")?.prevSibling());
    assert.equal(null, elem.attr("baz")?.nextSibling());
    assert.done();
};

module.exports.getters = function (assert: any) {
    var doc = libxml.Document();
    var elem = doc.node("root");
    elem.attr({ foo: "bar" });

    // get node
    assert.equal(elem, elem.attr("foo")?.parent());
    // get document
    assert.equal(doc, elem.attr("foo")?.doc());

    assert.done();
};
