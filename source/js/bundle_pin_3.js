var a;
(function(b, c) {
    function e(g) {
        return ! b(g).parents().andSelf().filter(function() {
            return b.curCSS(this, "visibility") === "hidden" || b.expr.filters.hidden(this)
        }).length
    }
    b.ui = b.ui || {};
    if (!b.ui.version) {
        b.extend(b.ui, {
            version: "1.8.11",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        b.fn.extend({
            _focus: b.fn.focus,
            focus: function(g, f) {
                return typeof g === "number" ? this.each(function() {
                    var d = this;
                    setTimeout(function() {
                        b(d).focus();
                        f && f.call(d)
                    },
                    g)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function() {
                var g;
                g = b.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(b.curCSS(this, "position", 1)) && /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(b.curCSS(this, "overflow", 1) + b.curCSS(this, "overflow-y", 1) + b.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !g.length ? b(document) : g
            },
            zIndex: function(g) {
                if (g !== c) return this.css("zIndex", g);
                if (this.length) {
                    g = b(this[0]);
                    for (var f; g.length && g[0] !== document;) {
                        f = g.css("position");
                        if (f === "absolute" || f === "relative" || f === "fixed") {
                            f = parseInt(g.css("zIndex"), 10);
                            if (!isNaN(f) && f !== 0) return f
                        }
                        g = g.parent()
                    }
                }
                return 0
            },
            disableSelection: function() {
                return this.bind((b.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
                function(g) {
                    g.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        });
        b.each(["Width", "Height"],
        function(g, f) {
            function d(l, r, u, o) {
                b.each(h,
                function() {
                    r -= parseFloat(b.curCSS(l, "padding" + this, true)) || 0;
                    if (u) r -= parseFloat(b.curCSS(l, "border" + this + "Width", true)) || 0;
                    if (o) r -= parseFloat(b.curCSS(l, "margin" + this, true)) || 0
                });
                return r
            }
            var h = f === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            j = f.toLowerCase(),
            k = {
                innerWidth: b.fn.innerWidth,
                innerHeight: b.fn.innerHeight,
                outerWidth: b.fn.outerWidth,
                outerHeight: b.fn.outerHeight
            };
            b.fn["inner" + f] = function(l) {
                if (l === c) return k["inner" + f].call(this);
                return this.each(function() {
                    b(this).css(j, d(this, l) + "px")
                })
            };
            b.fn["outer" + f] = function(l, r) {
                if (typeof l !== "number") return k["outer" + f].call(this, l);
                return this.each(function() {
                    b(this).css(j, d(this, l, true, r) + "px")
                })
            }
        });
        b.extend(b.expr[":"], {
            data: function(g, f, d) {
                return !! b.data(g, d[3])
            },
            focusable: function(g) {
                var f = g.nodeName.toLowerCase(),
                d = b.attr(g, "tabindex");
                if ("area" === f) {
                    f = g.parentNode;
                    d = f.name;
                    if (!g.href || !d || f.nodeName.toLowerCase() !== "map") return false;
                    g = b("img[usemap=#" + d + "]")[0];
                    return !! g && e(g)
                }
                return (/input|select|textarea|button|object/.test(f) ? !g.disabled: "a" == f ? g.href || !isNaN(d) : !isNaN(d)) && e(g)
            },
            tabbable: function(g) {
                var f = b.attr(g, "tabindex");
                return (isNaN(f) || f >= 0) && b(g).is(":focusable")
            }
        });
        b(function() {
            var g = document.body,
            f = g.appendChild(f = document.createElement("div"));
            b.extend(f.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            b.support.minHeight = f.offsetHeight === 100;
            b.support.selectstart = "onselectstart" in f;
            g.removeChild(f).style.display = "none"
        });
        b.extend(b.ui, {
            plugin: {
                add: function(g, f, d) {
                    g = b.ui[g].prototype;
                    for (var h in d) {
                        g.plugins[h] = g.plugins[h] || [];
                        g.plugins[h].push([f, d[h]])
                    }
                },
                call: function(g, f, d) {
                    if ((f = g.plugins[f]) && g.element[0].parentNode) for (var h = 0; h < f.length; h++) g.options[f[h][0]] && f[h][1].apply(g.element, d)
                }
            },
            contains: function(g, f) {
                return document.compareDocumentPosition ? g.compareDocumentPosition(f) & 16 : g !== f && g.contains(f)
            },
            hasScroll: function(g, f) {
                if (b(g).css("overflow") === "hidden") return false;
                f = f && f === "left" ? "scrollLeft": "scrollTop";
                var d = false;
                if (g[f] > 0) return true;
                g[f] = 1;
                d = g[f] > 0;
                g[f] = 0;
                return d
            },
            isOverAxis: function(g, f, d) {
                return g > f && g < f + d
            },
            isOver: function(g, f, d, h, j, k) {
                return b.ui.isOverAxis(g, d, j) && b.ui.isOverAxis(f, h, k)
            }
        })
    }
})(jQuery);
(function(b, c) {
    if (b.cleanData) {
        var e = b.cleanData;
        b.cleanData = function(f) {
            for (var d = 0, h;
            (h = f[d]) != null; d++) b(h).triggerHandler("remove");
            e(f)
        }
    } else {
        var g = b.fn.remove;
        b.fn.remove = function(f, d) {
            return this.each(function() {
                if (!d) if (!f || b.filter(f, [this]).length) b("*", this).add([this]).each(function() {
                    b(this).triggerHandler("remove")
                });
                return g.call(b(this), f, d)
            })
        }
    }
    b.widget = function(f, d, h) {
        var j = f.split(".")[0],
        k;
        f = f.split(".")[1];
        k = j + "-" + f;
        if (!h) {
            h = d;
            d = b.Widget
        }
        b.expr[":"][k] = function(l) {
            return !! b.data(l, f)
        };
        b[j] = b[j] || {};
        b[j][f] = function(l, r) {
            arguments.length && this._createWidget(l, r)
        };
        d = new d;
        d.options = b.extend(true, {},
        d.options);
        b[j][f].prototype = b.extend(true, d, {
            namespace: j,
            widgetName: f,
            widgetEventPrefix: b[j][f].prototype.widgetEventPrefix || f,
            widgetBaseClass: k
        },
        h);
        b.widget.bridge(f, b[j][f])
    };
    b.widget.bridge = function(f, d) {
        b.fn[f] = function(h) {
            var j = typeof h === "string",
            k = Array.prototype.slice.call(arguments, 1),
            l = this;
            h = !j && k.length ? b.extend.apply(null, [true, h].concat(k)) : h;
            if (j && h.charAt(0) === "_") return l;
            j ? this.each(function() {
                var r = b.data(this, f),
                u = r && b.isFunction(r[h]) ? r[h].apply(r, k) : r;
                if (u !== r && u !== c) {
                    l = u;
                    return false
                }
            }) : this.each(function() {
                var r = b.data(this, f);
                r ? r.option(h || {})._init() : b.data(this, f, new d(h, this))
            });
            return l
        }
    };
    b.Widget = function(f, d) {
        arguments.length && this._createWidget(f, d)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(f, d) {
            b.data(d, this.widgetName, this);
            this.element = b(d);
            this.options = b.extend(true, {},
            this.options, this._getCreateOptions(), f);
            var h = this;
            this.element.bind("remove." + this.widgetName,
            function() {
                h.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function() {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(f, d) {
            var h = f;
            if (arguments.length === 0) return b.extend({},
            this.options);
            if (typeof f === "string") {
                if (d === c) return this.options[f];
                h = {};
                h[f] = d
            }
            this._setOptions(h);
            return this
        },
        _setOptions: function(f) {
            var d = this;
            b.each(f,
            function(h, j) {
                d._setOption(h, j)
            });
            return this
        },
        _setOption: function(f, d) {
            this.options[f] = d;
            if (f === "disabled") this.widget()[d ? "addClass": "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", d);
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _trigger: function(f, d, h) {
            var j = this.options[f];
            d = b.Event(d);
            d.type = (f === this.widgetEventPrefix ? f: this.widgetEventPrefix + f).toLowerCase();
            h = h || {};
            if (d.originalEvent) {
                f = b.event.props.length;
                for (var k; f;) {
                    k = b.event.props[--f];
                    d[k] = d.originalEvent[k]
                }
            }
            this.element.trigger(d, h);
            return ! (b.isFunction(j) && j.call(this.element[0], d, h) === false || d.isDefaultPrevented())
        }
    }
})(jQuery);
(function(b) {
    b.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var c = this;
            this.element.bind("mousedown." + this.widgetName,
            function(e) {
                return c._mouseDown(e)
            }).bind("click." + this.widgetName,
            function(e) {
                if (true === b.data(e.target, c.widgetName + ".preventClickEvent")) {
                    b.removeData(e.target, c.widgetName + ".preventClickEvent");
                    e.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(c) {
            c.originalEvent = c.originalEvent || {};
            if (!c.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(c);
                this._mouseDownEvent = c;
                var e = this,
                g = c.which == 1,
                f = typeof this.options.cancel == "string" ? b(c.target).parents().add(c.target).filter(this.options.cancel).length: false;
                if (!g || f || !this._mouseCapture(c)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = true
                },
                this.options.delay);
                if (this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
                    this._mouseStarted = this._mouseStart(c) !== false;
                    if (!this._mouseStarted) {
                        c.preventDefault();
                        return true
                    }
                }
                true === b.data(c.target, this.widgetName + ".preventClickEvent") && b.removeData(c.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function(d) {
                    return e._mouseMove(d)
                };
                this._mouseUpDelegate = function(d) {
                    return e._mouseUp(d)
                };
                b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                c.preventDefault();
                return c.originalEvent.mouseHandled = true
            }
        },
        _mouseMove: function(c) {
            if (b.browser.msie && !(document.documentMode >= 9) && !c.button) return this._mouseUp(c);
            if (this._mouseStarted) {
                this._mouseDrag(c);
                return c.preventDefault()
            }
            if (this._mouseDistanceMet(c) && this._mouseDelayMet(c))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== false) ? this._mouseDrag(c) : this._mouseUp(c);
            return ! this._mouseStarted
        },
        _mouseUp: function(c) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                c.target == this._mouseDownEvent.target && b.data(c.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(c)
            }
            return false
        },
        _mouseDistanceMet: function(c) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    })
})(jQuery);
(function(b) {
    b.ui = b.ui || {};
    var c = /left|center|right/,
    e = /top|center|bottom/,
    g = b.fn.position,
    f = b.fn.offset;
    b.fn.position = function(d) {
        if (!d || !d.of) return g.apply(this, arguments);
        d = b.extend({},
        d);
        var h = b(d.of),
        j = h[0],
        k = (d.collision || "flip").split(" "),
        l = d.offset ? d.offset.split(" ") : [0, 0],
        r,
        u,
        o;
        if (j.nodeType === 9) {
            r = h.width();
            u = h.height();
            o = {
                top: 0,
                left: 0
            }
        } else if (j.setTimeout) {
            r = h.width();
            u = h.height();
            o = {
                top: h.scrollTop(),
                left: h.scrollLeft()
            }
        } else if (j.preventDefault) {
            d.at = "left top";
            r = u = 0;
            o = {
                top: d.of.pageY,
                left: d.of.pageX
            }
        } else {
            r = h.outerWidth();
            u = h.outerHeight();
            o = h.offset()
        }
        b.each(["my", "at"],
        function() {
            var m = (d[this] || "").split(" ");
            if (m.length === 1) m = c.test(m[0]) ? m.concat(["center"]) : e.test(m[0]) ? ["center"].concat(m) : ["center", "center"];
            m[0] = c.test(m[0]) ? m[0] : "center";
            m[1] = e.test(m[1]) ? m[1] : "center";
            d[this] = m
        });
        if (k.length === 1) k[1] = k[0];
        l[0] = parseInt(l[0], 10) || 0;
        if (l.length === 1) l[1] = l[0];
        l[1] = parseInt(l[1], 10) || 0;
        if (d.at[0] === "right") o.left += r;
        else if (d.at[0] === "center") o.left += r / 2;
        if (d.at[1] === "bottom") o.top += u;
        else if (d.at[1] === "center") o.top += u / 2;
        o.left += l[0];
        o.top += l[1];
        return this.each(function() {
            var m = b(this),
            q = m.outerWidth(),
            v = m.outerHeight(),
            w = parseInt(b.curCSS(this, "marginLeft", true)) || 0,
            B = parseInt(b.curCSS(this, "marginTop", true)) || 0,
            D = q + w + (parseInt(b.curCSS(this, "marginRight", true)) || 0),
            I = v + B + (parseInt(b.curCSS(this, "marginBottom", true)) || 0),
            p = b.extend({},
            o),
            n;
            if (d.my[0] === "right") p.left -= q;
            else if (d.my[0] === "center") p.left -= q / 2;
            if (d.my[1] === "bottom") p.top -= v;
            else if (d.my[1] === "center") p.top -= v / 2;
            p.left = Math.round(p.left);
            p.top = Math.round(p.top);
            n = {
                left: p.left - w,
                top: p.top - B
            };
            b.each(["left", "top"],
            function(z, A) {
                b.ui.position[k[z]] && b.ui.position[k[z]][A](p, {
                    targetWidth: r,
                    targetHeight: u,
                    elemWidth: q,
                    elemHeight: v,
                    collisionPosition: n,
                    collisionWidth: D,
                    collisionHeight: I,
                    offset: l,
                    my: d.my,
                    at: d.at
                })
            });
            b.fn.bgiframe && m.bgiframe();
            m.offset(b.extend(p, {
                using: d.using
            }))
        })
    };
    b.ui.position = {
        fit: {
            left: function(d, h) {
                var j = b(window);
                j = h.collisionPosition.left + h.collisionWidth - j.width() - j.scrollLeft();
                d.left = j > 0 ? d.left - j: Math.max(d.left - h.collisionPosition.left, d.left)
            },
            top: function(d, h) {
                var j = b(window);
                j = h.collisionPosition.top + h.collisionHeight - j.height() - j.scrollTop();
                d.top = j > 0 ? d.top - j: Math.max(d.top - h.collisionPosition.top, d.top)
            }
        },
        flip: {
            left: function(d, h) {
                if (h.at[0] !== "center") {
                    var j = b(window);
                    j = h.collisionPosition.left + h.collisionWidth - j.width() - j.scrollLeft();
                    var k = h.my[0] === "left" ? -h.elemWidth: h.my[0] === "right" ? h.elemWidth: 0,
                    l = h.at[0] === "left" ? h.targetWidth: -h.targetWidth,
                    r = -2 * h.offset[0];
                    d.left += h.collisionPosition.left < 0 ? k + l + r: j > 0 ? k + l + r: 0
                }
            },
            top: function(d, h) {
                if (h.at[1] !== "center") {
                    var j = b(window);
                    j = h.collisionPosition.top + h.collisionHeight - j.height() - j.scrollTop();
                    var k = h.my[1] === "top" ? -h.elemHeight: h.my[1] === "bottom" ? h.elemHeight: 0,
                    l = h.at[1] === "top" ? h.targetHeight: -h.targetHeight,
                    r = -2 * h.offset[1];
                    d.top += h.collisionPosition.top < 0 ? k + l + r: j > 0 ? k + l + r: 0
                }
            }
        }
    };
    if (!b.offset.setOffset) {
        b.offset.setOffset = function(d, h) {
            if (/static/.test(b.curCSS(d, "position"))) d.style.position = "relative";
            var j = b(d),
            k = j.offset(),
            l = parseInt(b.curCSS(d, "top", true), 10) || 0,
            r = parseInt(b.curCSS(d, "left", true), 10) || 0;
            k = {
                top: h.top - k.top + l,
                left: h.left - k.left + r
            };
            "using" in h ? h.using.call(d, k) : j.css(k)
        };
        b.fn.offset = function(d) {
            var h = this[0];
            if (!h || !h.ownerDocument) return null;
            if (d) return this.each(function() {
                b.offset.setOffset(this, d)
            });
            return f.call(this)
        }
    }
})(jQuery);
(function(b) {
    b.widget("ui.draggable", b.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function() {
            if (this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function() {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function(c) {
            var e = this.options;
            if (this.helper || e.disabled || b(c.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(c);
            if (!this.handle) return false;
            return true
        },
        _mouseStart: function(c) {
            var e = this.options;
            this.helper = this._createHelper(c);
            this._cacheHelperProportions();
            if (b.ui.ddmanager) b.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            b.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt);
            e.containment && this._setContainment();
            if (this._trigger("start", c) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            b.ui.ddmanager && !e.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, c);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(c, true);
            return true
        },
        _mouseDrag: function(c, e) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!e) {
                e = this._uiHash();
                if (this._trigger("drag", c, e) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = e.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            b.ui.ddmanager && b.ui.ddmanager.drag(this, c);
            return false
        },
        _mouseStop: function(c) {
            var e = false;
            if (b.ui.ddmanager && !this.options.dropBehaviour) e = b.ui.ddmanager.drop(this, c);
            if (this.dropped) {
                e = this.dropped;
                this.dropped = false
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false;
            if (this.options.revert == "invalid" && !e || this.options.revert == "valid" && e || this.options.revert === true || b.isFunction(this.options.revert) && this.options.revert.call(this.element, e)) {
                var g = this;
                b(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10),
                function() {
                    g._trigger("stop", c) !== false && g._clear()
                })
            } else this._trigger("stop", c) !== false && this._clear();
            return false
        },
        cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function(c) {
            var e = !this.options.handle || !b(this.options.handle, this.element).length ? true: false;
            b(this.options.handle, this.element).find("*").andSelf().each(function() {
                if (this == c.target) e = true
            });
            return e
        },
        _createHelper: function(c) {
            var e = this.options;
            c = b.isFunction(e.helper) ? b(e.helper.apply(this.element[0], [c])) : e.helper == "clone" ? this.element.clone() : this.element;
            c.parents("body").length || c.appendTo(e.appendTo == "parent" ? this.element[0].parentNode: e.appendTo);
            c[0] != this.element[0] && !/(fixed|absolute)/.test(c.css("position")) && c.css("position", "absolute");
            return c
        },
        _adjustOffsetFromHelper: function(c) {
            if (typeof c == "string") c = c.split(" ");
            if (b.isArray(c)) c = {
                left: +c[0],
                top: +c[1] || 0
            };
            if ("left" in c) this.offset.click.left = c.left + this.margins.left;
            if ("right" in c) this.offset.click.left = this.helperProportions.width - c.right + this.margins.left;
            if ("top" in c) this.offset.click.top = c.top + this.margins.top;
            if ("bottom" in c) this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie) c = {
                top: 0,
                left: 0
            };
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var c = this.element.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var c = this.options;
            if (c.containment == "parent") c.containment = this.helper[0].parentNode;
            if (c.containment == "document" || c.containment == "window") this.containment = [(c.containment == "document" ? 0 : b(window).scrollLeft()) - this.offset.relative.left - this.offset.parent.left, (c.containment == "document" ? 0 : b(window).scrollTop()) - this.offset.relative.top - this.offset.parent.top, (c.containment == "document" ? 0 : b(window).scrollLeft()) + b(c.containment == "document" ? document: window).width() - this.helperProportions.width - this.margins.left, (c.containment == "document" ? 0 : b(window).scrollTop()) + (b(c.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(c.containment) && c.containment.constructor != Array) {
                var e = b(c.containment)[0];
                if (e) {
                    c = b(c.containment).offset();
                    var g = b(e).css("overflow") != "hidden";
                    this.containment = [c.left + (parseInt(b(e).css("borderLeftWidth"), 10) || 0) + (parseInt(b(e).css("paddingLeft"), 10) || 0), c.top + (parseInt(b(e).css("borderTopWidth"), 10) || 0) + (parseInt(b(e).css("paddingTop"), 10) || 0), c.left + (g ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(b(e).css("borderLeftWidth"), 10) || 0) - (parseInt(b(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, c.top + (g ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(b(e).css("borderTopWidth"), 10) || 0) - (parseInt(b(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom]
                }
            } else if (c.containment.constructor == Array) this.containment = c.containment
        },
        _convertPositionTo: function(c, e) {
            if (!e) e = this.position;
            c = c == "absolute" ? 1 : -1;
            var g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            f = /(html|body)/i.test(g[0].tagName);
            return {
                top: e.top + this.offset.relative.top * c + this.offset.parent.top * c - (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : g.scrollTop()) * c),
                left: e.left + this.offset.relative.left * c + this.offset.parent.left * c - (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : g.scrollLeft()) * c)
            }
        },
        _generatePosition: function(c) {
            var e = this.options,
            g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            f = /(html|body)/i.test(g[0].tagName),
            d = c.pageX,
            h = c.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (c.pageX - this.offset.click.left < this.containment[0]) d = this.containment[0] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top < this.containment[1]) h = this.containment[1] + this.offset.click.top;
                    if (c.pageX - this.offset.click.left > this.containment[2]) d = this.containment[2] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top > this.containment[3]) h = this.containment[3] + this.offset.click.top
                }
                if (e.grid) {
                    h = this.originalPageY + Math.round((h - this.originalPageY) / e.grid[1]) * e.grid[1];
                    h = this.containment ? !(h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3]) ? h: !(h - this.offset.click.top < this.containment[1]) ? h - e.grid[1] : h + e.grid[1] : h;
                    d = this.originalPageX + Math.round((d - this.originalPageX) / e.grid[0]) * e.grid[0];
                    d = this.containment ? !(d - this.offset.click.left < this.containment[0] || d - this.offset.click.left > this.containment[2]) ? d: !(d - this.offset.click.left < this.containment[0]) ? d - e.grid[0] : d + e.grid[0] : d
                }
            }
            return {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : g.scrollTop()),
                left: d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : g.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function(c, e, g) {
            g = g || this._uiHash();
            b.ui.plugin.call(this, c, [e, g]);
            if (c == "drag") this.positionAbs = this._convertPositionTo("absolute");
            return b.Widget.prototype._trigger.call(this, c, e, g)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    b.extend(b.ui.draggable, {
        version: "1.8.11"
    });
    b.ui.plugin.add("draggable", "connectToSortable", {
        start: function(c, e) {
            var g = b(this).data("draggable"),
            f = g.options,
            d = b.extend({},
            e, {
                item: g.element
            });
            g.sortables = [];
            b(f.connectToSortable).each(function() {
                var h = b.data(this, "sortable");
                if (h && !h.options.disabled) {
                    g.sortables.push({
                        instance: h,
                        shouldRevert: h.options.revert
                    });
                    h.refreshPositions();
                    h._trigger("activate", c, d)
                }
            })
        },
        stop: function(c, e) {
            var g = b(this).data("draggable"),
            f = b.extend({},
            e, {
                item: g.element
            });
            b.each(g.sortables,
            function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    g.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(c);
                    this.instance.options.helper = this.instance.options._helper;
                    g.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", c, f)
                }
            })
        },
        drag: function(c, e) {
            var g = b(this).data("draggable"),
            f = this;
            b.each(g.sortables,
            function() {
                this.instance.positionAbs = g.positionAbs;
                this.instance.helperProportions = g.helperProportions;
                this.instance.offset.click = g.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = b(f).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return e.helper[0]
                        };
                        c.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(c, true);
                        this.instance._mouseStart(c, true, true);
                        this.instance.offset.click.top = g.offset.click.top;
                        this.instance.offset.click.left = g.offset.click.left;
                        this.instance.offset.parent.left -= g.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= g.offset.parent.top - this.instance.offset.parent.top;
                        g._trigger("toSortable", c);
                        g.dropped = this.instance.element;
                        g.currentItem = g.element;
                        this.instance.fromOutside = g
                    }
                    this.instance.currentItem && this.instance._mouseDrag(c)
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", c, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(c, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder && this.instance.placeholder.remove();
                    g._trigger("fromSortable", c);
                    g.dropped = false
                }
            })
        }
    });
    b.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var c = b("body"),
            e = b(this).data("draggable").options;
            if (c.css("cursor")) e._cursor = c.css("cursor");
            c.css("cursor", e.cursor)
        },
        stop: function() {
            var c = b(this).data("draggable").options;
            c._cursor && b("body").css("cursor", c._cursor)
        }
    });
    b.ui.plugin.add("draggable", "iframeFix", {
        start: function() {
            var c = b(this).data("draggable").options;
            b(c.iframeFix === true ? "iframe": c.iframeFix).each(function() {
                b('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(b(this).offset()).appendTo("body")
            })
        },
        stop: function() {
            b("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            })
        }
    });
    b.ui.plugin.add("draggable", "opacity", {
        start: function(c, e) {
            c = b(e.helper);
            e = b(this).data("draggable").options;
            if (c.css("opacity")) e._opacity = c.css("opacity");
            c.css("opacity", e.opacity)
        },
        stop: function(c, e) {
            c = b(this).data("draggable").options;
            c._opacity && b(e.helper).css("opacity", c._opacity)
        }
    });
    b.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var c = b(this).data("draggable");
            if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") c.overflowOffset = c.scrollParent.offset()
        },
        drag: function(c) {
            var e = b(this).data("draggable"),
            g = e.options,
            f = false;
            if (e.scrollParent[0] != document && e.scrollParent[0].tagName != "HTML") {
                if (!g.axis || g.axis != "x") if (e.overflowOffset.top + e.scrollParent[0].offsetHeight - c.pageY < g.scrollSensitivity) e.scrollParent[0].scrollTop = f = e.scrollParent[0].scrollTop + g.scrollSpeed;
                else if (c.pageY - e.overflowOffset.top < g.scrollSensitivity) e.scrollParent[0].scrollTop = f = e.scrollParent[0].scrollTop - g.scrollSpeed;
                if (!g.axis || g.axis != "y") if (e.overflowOffset.left + e.scrollParent[0].offsetWidth - c.pageX < g.scrollSensitivity) e.scrollParent[0].scrollLeft = f = e.scrollParent[0].scrollLeft + g.scrollSpeed;
                else if (c.pageX - e.overflowOffset.left < g.scrollSensitivity) e.scrollParent[0].scrollLeft = f = e.scrollParent[0].scrollLeft - g.scrollSpeed
            } else {
                if (!g.axis || g.axis != "x") if (c.pageY - b(document).scrollTop() < g.scrollSensitivity) f = b(document).scrollTop(b(document).scrollTop() - g.scrollSpeed);
                else if (b(window).height() - (c.pageY - b(document).scrollTop()) < g.scrollSensitivity) f = b(document).scrollTop(b(document).scrollTop() + g.scrollSpeed);
                if (!g.axis || g.axis != "y") if (c.pageX - b(document).scrollLeft() < g.scrollSensitivity) f = b(document).scrollLeft(b(document).scrollLeft() - g.scrollSpeed);
                else if (b(window).width() - (c.pageX - b(document).scrollLeft()) < g.scrollSensitivity) f = b(document).scrollLeft(b(document).scrollLeft() + g.scrollSpeed)
            }
            f !== false && b.ui.ddmanager && !g.dropBehaviour && b.ui.ddmanager.prepareOffsets(e, c)
        }
    });
    b.ui.plugin.add("draggable", "snap", {
        start: function() {
            var c = b(this).data("draggable"),
            e = c.options;
            c.snapElements = [];
            b(e.snap.constructor != String ? e.snap.items || ":data(draggable)": e.snap).each(function() {
                var g = b(this),
                f = g.offset();
                this != c.element[0] && c.snapElements.push({
                    item: this,
                    width: g.outerWidth(),
                    height: g.outerHeight(),
                    top: f.top,
                    left: f.left
                })
            })
        },
        drag: function(c, e) {
            for (var g = b(this).data("draggable"), f = g.options, d = f.snapTolerance, h = e.offset.left, j = h + g.helperProportions.width, k = e.offset.top, l = k + g.helperProportions.height, r = g.snapElements.length - 1; r >= 0; r--) {
                var u = g.snapElements[r].left,
                o = u + g.snapElements[r].width,
                m = g.snapElements[r].top,
                q = m + g.snapElements[r].height;
                if (u - d < h && h < o + d && m - d < k && k < q + d || u - d < h && h < o + d && m - d < l && l < q + d || u - d < j && j < o + d && m - d < k && k < q + d || u - d < j && j < o + d && m - d < l && l < q + d) {
                    if (f.snapMode != "inner") {
                        var v = Math.abs(m - l) <= d,
                        w = Math.abs(q - k) <= d,
                        B = Math.abs(u - j) <= d,
                        D = Math.abs(o - h) <= d;
                        if (v) e.position.top = g._convertPositionTo("relative", {
                            top: m - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top;
                        if (w) e.position.top = g._convertPositionTo("relative", {
                            top: q,
                            left: 0
                        }).top - g.margins.top;
                        if (B) e.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: u - g.helperProportions.width
                        }).left - g.margins.left;
                        if (D) e.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: o
                        }).left - g.margins.left
                    }
                    var I = v || w || B || D;
                    if (f.snapMode != "outer") {
                        v = Math.abs(m - k) <= d;
                        w = Math.abs(q - l) <= d;
                        B = Math.abs(u - h) <= d;
                        D = Math.abs(o - j) <= d;
                        if (v) e.position.top = g._convertPositionTo("relative", {
                            top: m,
                            left: 0
                        }).top - g.margins.top;
                        if (w) e.position.top = g._convertPositionTo("relative", {
                            top: q - g.helperProportions.height,
                            left: 0
                        }).top - g.margins.top;
                        if (B) e.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: u
                        }).left - g.margins.left;
                        if (D) e.position.left = g._convertPositionTo("relative", {
                            top: 0,
                            left: o - g.helperProportions.width
                        }).left - g.margins.left
                    }
                    if (!g.snapElements[r].snapping && (v || w || B || D || I)) g.options.snap.snap && g.options.snap.snap.call(g.element, c, b.extend(g._uiHash(), {
                        snapItem: g.snapElements[r].item
                    }));
                    g.snapElements[r].snapping = v || w || B || D || I
                } else {
                    g.snapElements[r].snapping && g.options.snap.release && g.options.snap.release.call(g.element, c, b.extend(g._uiHash(), {
                        snapItem: g.snapElements[r].item
                    }));
                    g.snapElements[r].snapping = false
                }
            }
        }
    });
    b.ui.plugin.add("draggable", "stack", {
        start: function() {
            var c = b(this).data("draggable").options;
            c = b.makeArray(b(c.stack)).sort(function(g, f) {
                return (parseInt(b(g).css("zIndex"), 10) || 0) - (parseInt(b(f).css("zIndex"), 10) || 0)
            });
            if (c.length) {
                var e = parseInt(c[0].style.zIndex) || 0;
                b(c).each(function(g) {
                    this.style.zIndex = e + g
                });
                this[0].style.zIndex = e + c.length
            }
        }
    });
    b.ui.plugin.add("draggable", "zIndex", {
        start: function(c, e) {
            c = b(e.helper);
            e = b(this).data("draggable").options;
            if (c.css("zIndex")) e._zIndex = c.css("zIndex");
            c.css("zIndex", e.zIndex)
        },
        stop: function(c, e) {
            c = b(this).data("draggable").options;
            c._zIndex && b(e.helper).css("zIndex", c._zIndex)
        }
    })
})(jQuery);
(function(b) {
    b.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function() {
            var c = this.options,
            e = c.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = b.isFunction(e) ? e: function(g) {
                return g.is(e)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            b.ui.ddmanager.droppables[c.scope] = b.ui.ddmanager.droppables[c.scope] || [];
            b.ui.ddmanager.droppables[c.scope].push(this);
            c.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function() {
            for (var c = b.ui.ddmanager.droppables[this.options.scope], e = 0; e < c.length; e++) c[e] == this && c.splice(e, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function(c, e) {
            if (c == "accept") this.accept = b.isFunction(e) ? e: function(g) {
                return g.is(e)
            };
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(c) {
            var e = b.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass);
            e && this._trigger("activate", c, this.ui(e))
        },
        _deactivate: function(c) {
            var e = b.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            e && this._trigger("deactivate", c, this.ui(e))
        },
        _over: function(c) {
            var e = b.ui.ddmanager.current;
            if (! (!e || (e.currentItem || e.element)[0] == this.element[0])) if (this.accept.call(this.element[0], e.currentItem || e.element)) {
                this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                this._trigger("over", c, this.ui(e))
            }
        },
        _out: function(c) {
            var e = b.ui.ddmanager.current;
            if (! (!e || (e.currentItem || e.element)[0] == this.element[0])) if (this.accept.call(this.element[0], e.currentItem || e.element)) {
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("out", c, this.ui(e))
            }
        },
        _drop: function(c, e) {
            var g = e || b.ui.ddmanager.current;
            if (!g || (g.currentItem || g.element)[0] == this.element[0]) return false;
            var f = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
                var d = b.data(this, "droppable");
                if (d.options.greedy && !d.options.disabled && d.options.scope == g.options.scope && d.accept.call(d.element[0], g.currentItem || g.element) && b.ui.intersect(g, b.extend(d, {
                    offset: d.element.offset()
                }), d.options.tolerance)) {
                    f = true;
                    return false
                }
            });
            if (f) return false;
            if (this.accept.call(this.element[0], g.currentItem || g.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("drop", c, this.ui(g));
                return this.element
            }
            return false
        },
        ui: function(c) {
            return {
                draggable: c.currentItem || c.element,
                helper: c.helper,
                position: c.position,
                offset: c.positionAbs
            }
        }
    });
    b.extend(b.ui.droppable, {
        version: "1.8.11"
    });
    b.ui.intersect = function(c, e, g) {
        if (!e.offset) return false;
        var f = (c.positionAbs || c.position.absolute).left,
        d = f + c.helperProportions.width,
        h = (c.positionAbs || c.position.absolute).top,
        j = h + c.helperProportions.height,
        k = e.offset.left,
        l = k + e.proportions.width,
        r = e.offset.top,
        u = r + e.proportions.height;
        switch (g) {
        case "fit":
            return k <= f && d <= l && r <= h && j <= u;
        case "intersect":
            return k < f + c.helperProportions.width / 2 && d - c.helperProportions.width / 2 < l && r < h + c.helperProportions.height / 2 && j - c.helperProportions.height / 2 < u;
        case "pointer":
            return b.ui.isOver((c.positionAbs || c.position.absolute).top + (c.clickOffset || c.offset.click).top, (c.positionAbs || c.position.absolute).left + (c.clickOffset || c.offset.click).left, r, k, e.proportions.height, e.proportions.width);
        case "touch":
            return (h >= r && h <= u || j >= r && j <= u || h < r && j > u) && (f >= k && f <= l || d >= k && d <= l || f < k && d > l);
        default:
            return false
        }
    };
    b.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(c, e) {
            var g = b.ui.ddmanager.droppables[c.options.scope] || [],
            f = e ? e.type: null,
            d = (c.currentItem || c.element).find(":data(droppable)").andSelf(),
            h = 0;
            a: for (; h < g.length; h++) if (! (g[h].options.disabled || c && !g[h].accept.call(g[h].element[0], c.currentItem || c.element))) {
                for (var j = 0; j < d.length; j++) if (d[j] == g[h].element[0]) {
                    g[h].proportions.height = 0;
                    continue a
                }
                g[h].visible = g[h].element.css("display") != "none";
                if (g[h].visible) {
                    f == "mousedown" && g[h]._activate.call(g[h], e);
                    g[h].offset = g[h].element.offset();
                    g[h].proportions = {
                        width: g[h].element[0].offsetWidth,
                        height: g[h].element[0].offsetHeight
                    }
                }
            }
        },
        drop: function(c, e) {
            var g = false;
            b.each(b.ui.ddmanager.droppables[c.options.scope] || [],
            function() {
                if (this.options) {
                    if (!this.options.disabled && this.visible && b.ui.intersect(c, this, this.options.tolerance)) g = g || this._drop.call(this, e);
                    if (!this.options.disabled && this.visible && this.accept.call(this.element[0], c.currentItem || c.element)) {
                        this.isout = 1;
                        this.isover = 0;
                        this._deactivate.call(this, e)
                    }
                }
            });
            return g
        },
        drag: function(c, e) {
            c.options.refreshPositions && b.ui.ddmanager.prepareOffsets(c, e);
            b.each(b.ui.ddmanager.droppables[c.options.scope] || [],
            function() {
                if (! (this.options.disabled || this.greedyChild || !this.visible)) {
                    var g = b.ui.intersect(c, this, this.options.tolerance);
                    if (g = !g && this.isover == 1 ? "isout": g && this.isover == 0 ? "isover": null) {
                        var f;
                        if (this.options.greedy) {
                            var d = this.element.parents(":data(droppable):eq(0)");
                            if (d.length) {
                                f = b.data(d[0], "droppable");
                                f.greedyChild = g == "isover" ? 1 : 0
                            }
                        }
                        if (f && g == "isover") {
                            f.isover = 0;
                            f.isout = 1;
                            f._out.call(f, e)
                        }
                        this[g] = 1;
                        this[g == "isout" ? "isover": "isout"] = 0;
                        this[g == "isover" ? "_over": "_out"].call(this, e);
                        if (f && g == "isout") {
                            f.isout = 0;
                            f.isover = 1;
                            f._over.call(f, e)
                        }
                    }
                }
            })
        }
    }
})(jQuery);
(function(b) {
    b.widget("ui.resizable", b.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1E3
        },
        _create: function() {
            var g = this,
            f = this.options;
            this.element.addClass("ui-resizable");
            b.extend(this, {
                _aspectRatio: !!f.aspectRatio,
                aspectRatio: f.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: f.helper || f.ghost || f.animate ? f.helper || "ui-resizable-helper": null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) { / relative / .test(this.element.css("position")) && b.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(b('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = f.handles || (!b(".ui-resizable-handle", this.element).length ? "e,s,se": {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") this.handles = "n,e,s,w,se,sw,ne,nw";
                var d = this.handles.split(",");
                this.handles = {};
                for (var h = 0; h < d.length; h++) {
                    var j = b.trim(d[h]),
                    k = b('<div class="ui-resizable-handle ' + ("ui-resizable-" + j) + '"></div>');
                    /sw|se|ne|nw/.test(j) && k.css({
                        zIndex: ++f.zIndex
                    });
                    "se" == j && k.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[j] = ".ui-resizable-" + j;
                    this.element.append(k)
                }
            }
            this._renderAxis = function(l) {
                l = l || this.element;
                for (var r in this.handles) {
                    if (this.handles[r].constructor == String) this.handles[r] = b(this.handles[r], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var u = b(this.handles[r], this.element),
                        o = 0;
                        o = /sw|ne|nw|se|n|s/.test(r) ? u.outerHeight() : u.outerWidth();
                        u = ["padding", /ne|nw|n/.test(r) ? "Top": /se|sw|s/.test(r) ? "Bottom": /^e$/.test(r) ? "Right": "Left"].join("");
                        l.css(u, o);
                        this._proportionallyResize()
                    }
                    b(this.handles[r])
                }
            };
            this._renderAxis(this.element);
            this._handles = b(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!g.resizing) {
                    if (this.className) var l = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    g.axis = l && l[1] ? l[1] : "se"
                }
            });
            if (f.autoHide) {
                this._handles.hide();
                b(this.element).addClass("ui-resizable-autohide").hover(function() {
                    b(this).removeClass("ui-resizable-autohide");
                    g._handles.show()
                },
                function() {
                    if (!g.resizing) {
                        b(this).addClass("ui-resizable-autohide");
                        g._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var g = function(d) {
                b(d).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                g(this.element);
                var f = this.element;
                f.after(this.originalElement.css({
                    position: f.css("position"),
                    width: f.outerWidth(),
                    height: f.outerHeight(),
                    top: f.css("top"),
                    left: f.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            g(this.originalElement);
            return this
        },
        _mouseCapture: function(g) {
            var f = false;
            for (var d in this.handles) if (b(this.handles[d])[0] == g.target) f = true;
            return ! this.options.disabled && f
        },
        _mouseStart: function(g) {
            var f = this.options,
            d = this.element.position(),
            h = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: b(document).scrollTop(),
                left: b(document).scrollLeft()
            };
            if (h.is(".ui-draggable") || /absolute/.test(h.css("position"))) h.css({
                position: "absolute",
                top: d.top,
                left: d.left
            });
            b.browser.opera && /relative/.test(h.css("position")) && h.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            d = c(this.helper.css("left"));
            var j = c(this.helper.css("top"));
            if (f.containment) {
                d += b(f.containment).scrollLeft() || 0;
                j += b(f.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: d,
                top: j
            };
            this.size = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            }: {
                width: h.width(),
                height: h.height()
            };
            this.originalSize = this._helper ? {
                width: h.outerWidth(),
                height: h.outerHeight()
            }: {
                width: h.width(),
                height: h.height()
            };
            this.originalPosition = {
                left: d,
                top: j
            };
            this.sizeDiff = {
                width: h.outerWidth() - h.width(),
                height: h.outerHeight() - h.height()
            };
            this.originalMousePosition = {
                left: g.pageX,
                top: g.pageY
            };
            this.aspectRatio = typeof f.aspectRatio == "number" ? f.aspectRatio: this.originalSize.width / this.originalSize.height || 1;
            f = b(".ui-resizable-" + this.axis).css("cursor");
            b("body").css("cursor", f == "auto" ? this.axis + "-resize": f);
            h.addClass("ui-resizable-resizing");
            this._propagate("start", g);
            return true
        },
        _mouseDrag: function(g) {
            var f = this.helper,
            d = this.originalMousePosition,
            h = this._change[this.axis];
            if (!h) return false;
            d = h.apply(this, [g, g.pageX - d.left || 0, g.pageY - d.top || 0]);
            if (this._aspectRatio || g.shiftKey) d = this._updateRatio(d, g);
            d = this._respectSize(d, g);
            this._propagate("resize", g);
            f.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }); ! this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(d);
            this._trigger("resize", g, this.ui());
            return false
        },
        _mouseStop: function(g) {
            this.resizing = false;
            var f = this.options,
            d = this;
            if (this._helper) {
                var h = this._proportionallyResizeElements,
                j = h.length && /textarea/i.test(h[0].nodeName);
                h = j && b.ui.hasScroll(h[0], "left") ? 0 : d.sizeDiff.height;
                j = j ? 0 : d.sizeDiff.width;
                j = {
                    width: d.helper.width() - j,
                    height: d.helper.height() - h
                };
                h = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null;
                var k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
                f.animate || this.element.css(b.extend(j, {
                    top: k,
                    left: h
                }));
                d.helper.height(d.size.height);
                d.helper.width(d.size.width);
                this._helper && !f.animate && this._proportionallyResize()
            }
            b("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", g);
            this._helper && this.helper.remove();
            return false
        },
        _updateCache: function(g) {
            this.offset = this.helper.offset();
            if (e(g.left)) this.position.left = g.left;
            if (e(g.top)) this.position.top = g.top;
            if (e(g.height)) this.size.height = g.height;
            if (e(g.width)) this.size.width = g.width
        },
        _updateRatio: function(g) {
            var f = this.position,
            d = this.size,
            h = this.axis;
            if (g.height) g.width = d.height * this.aspectRatio;
            else if (g.width) g.height = d.width / this.aspectRatio;
            if (h == "sw") {
                g.left = f.left + (d.width - g.width);
                g.top = null
            }
            if (h == "nw") {
                g.top = f.top + (d.height - g.height);
                g.left = f.left + (d.width - g.width)
            }
            return g
        },
        _respectSize: function(g) {
            var f = this.options,
            d = this.axis,
            h = e(g.width) && f.maxWidth && f.maxWidth < g.width,
            j = e(g.height) && f.maxHeight && f.maxHeight < g.height,
            k = e(g.width) && f.minWidth && f.minWidth > g.width,
            l = e(g.height) && f.minHeight && f.minHeight > g.height;
            if (k) g.width = f.minWidth;
            if (l) g.height = f.minHeight;
            if (h) g.width = f.maxWidth;
            if (j) g.height = f.maxHeight;
            var r = this.originalPosition.left + this.originalSize.width,
            u = this.position.top + this.size.height,
            o = /sw|nw|w/.test(d);
            d = /nw|ne|n/.test(d);
            if (k && o) g.left = r - f.minWidth;
            if (h && o) g.left = r - f.maxWidth;
            if (l && d) g.top = u - f.minHeight;
            if (j && d) g.top = u - f.maxHeight;
            if ((f = !g.width && !g.height) && !g.left && g.top) g.top = null;
            else if (f && !g.top && g.left) g.left = null;
            return g
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) for (var g = this.helper || this.element, f = 0; f < this._proportionallyResizeElements.length; f++) {
                var d = this._proportionallyResizeElements[f];
                if (!this.borderDif) {
                    var h = [d.css("borderTopWidth"), d.css("borderRightWidth"), d.css("borderBottomWidth"), d.css("borderLeftWidth")],
                    j = [d.css("paddingTop"), d.css("paddingRight"), d.css("paddingBottom"), d.css("paddingLeft")];
                    this.borderDif = b.map(h,
                    function(k, l) {
                        k = parseInt(k, 10) || 0;
                        l = parseInt(j[l], 10) || 0;
                        return k + l
                    })
                }
                b.browser.msie && (b(g).is(":hidden") || b(g).parents(":hidden").length) || d.css({
                    height: g.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: g.width() - this.borderDif[1] - this.borderDif[3] || 0
                })
            }
        },
        _renderProxy: function() {
            var g = this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || b('<div style="overflow:hidden;"></div>');
                var f = b.browser.msie && b.browser.version < 7,
                d = f ? 1 : 0;
                f = f ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + f,
                    height: this.element.outerHeight() + f,
                    position: "absolute",
                    left: this.elementOffset.left - d + "px",
                    top: this.elementOffset.top - d + "px",
                    zIndex: ++g.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function(g, f) {
                return {
                    width: this.originalSize.width + f
                }
            },
            w: function(g, f) {
                return {
                    left: this.originalPosition.left + f,
                    width: this.originalSize.width - f
                }
            },
            n: function(g, f, d) {
                return {
                    top: this.originalPosition.top + d,
                    height: this.originalSize.height - d
                }
            },
            s: function(g, f, d) {
                return {
                    height: this.originalSize.height + d
                }
            },
            se: function(g, f, d) {
                return b.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [g, f, d]))
            },
            sw: function(g, f, d) {
                return b.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [g, f, d]))
            },
            ne: function(g, f, d) {
                return b.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [g, f, d]))
            },
            nw: function(g, f, d) {
                return b.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [g, f, d]))
            }
        },
        _propagate: function(g, f) {
            b.ui.plugin.call(this, g, [f, this.ui()]);
            g != "resize" && this._trigger(g, f, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    b.extend(b.ui.resizable, {
        version: "1.8.11"
    });
    b.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var g = b(this).data("resizable").options,
            f = function(d) {
                b(d).each(function() {
                    var h = b(this);
                    h.data("resizable-alsoresize", {
                        width: parseInt(h.width(), 10),
                        height: parseInt(h.height(), 10),
                        left: parseInt(h.css("left"), 10),
                        top: parseInt(h.css("top"), 10),
                        position: h.css("position")
                    })
                })
            };
            if (typeof g.alsoResize == "object" && !g.alsoResize.parentNode) if (g.alsoResize.length) {
                g.alsoResize = g.alsoResize[0];
                f(g.alsoResize)
            } else b.each(g.alsoResize,
            function(d) {
                f(d)
            });
            else f(g.alsoResize)
        },
        resize: function(g, f) {
            var d = b(this).data("resizable");
            g = d.options;
            var h = d.originalSize,
            j = d.originalPosition,
            k = {
                height: d.size.height - h.height || 0,
                width: d.size.width - h.width || 0,
                top: d.position.top - j.top || 0,
                left: d.position.left - j.left || 0
            },
            l = function(r, u) {
                b(r).each(function() {
                    var o = b(this),
                    m = b(this).data("resizable-alsoresize"),
                    q = {},
                    v = u && u.length ? u: o.parents(f.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    b.each(v,
                    function(w, B) {
                        if ((w = (m[B] || 0) + (k[B] || 0)) && w >= 0) q[B] = w || null
                    });
                    if (b.browser.opera && /relative/.test(o.css("position"))) {
                        d._revertToRelativePosition = true;
                        o.css({
                            position: "absolute",
                            top: "auto",
                            left: "auto"
                        })
                    }
                    o.css(q)
                })
            };
            typeof g.alsoResize == "object" && !g.alsoResize.nodeType ? b.each(g.alsoResize,
            function(r, u) {
                l(r, u)
            }) : l(g.alsoResize)
        },
        stop: function() {
            var g = b(this).data("resizable"),
            f = g.options,
            d = function(h) {
                b(h).each(function() {
                    var j = b(this);
                    j.css({
                        position: j.data("resizable-alsoresize").position
                    })
                })
            };
            if (g._revertToRelativePosition) {
                g._revertToRelativePosition = false;
                typeof f.alsoResize == "object" && !f.alsoResize.nodeType ? b.each(f.alsoResize,
                function(h) {
                    d(h)
                }) : d(f.alsoResize)
            }
            b(this).removeData("resizable-alsoresize")
        }
    });
    b.ui.plugin.add("resizable", "animate", {
        stop: function(g) {
            var f = b(this).data("resizable"),
            d = f.options,
            h = f._proportionallyResizeElements,
            j = h.length && /textarea/i.test(h[0].nodeName),
            k = j && b.ui.hasScroll(h[0], "left") ? 0 : f.sizeDiff.height;
            j = {
                width: f.size.width - (j ? 0 : f.sizeDiff.width),
                height: f.size.height - k
            };
            k = parseInt(f.element.css("left"), 10) + (f.position.left - f.originalPosition.left) || null;
            var l = parseInt(f.element.css("top"), 10) + (f.position.top - f.originalPosition.top) || null;
            f.element.animate(b.extend(j, l && k ? {
                top: l,
                left: k
            }: {}), {
                duration: d.animateDuration,
                easing: d.animateEasing,
                step: function() {
                    var r = {
                        width: parseInt(f.element.css("width"), 10),
                        height: parseInt(f.element.css("height"), 10),
                        top: parseInt(f.element.css("top"), 10),
                        left: parseInt(f.element.css("left"), 10)
                    };
                    h && h.length && b(h[0]).css({
                        width: r.width,
                        height: r.height
                    });
                    f._updateCache(r);
                    f._propagate("resize", g)
                }
            })
        }
    });
    b.ui.plugin.add("resizable", "containment", {
        start: function() {
            var g = b(this).data("resizable"),
            f = g.element,
            d = g.options.containment;
            if (f = d instanceof b ? d.get(0) : /parent/.test(d) ? f.parent().get(0) : d) {
                g.containerElement = b(f);
                if (/document/.test(d) || d == document) {
                    g.containerOffset = {
                        left: 0,
                        top: 0
                    };
                    g.containerPosition = {
                        left: 0,
                        top: 0
                    };
                    g.parentData = {
                        element: b(document),
                        left: 0,
                        top: 0,
                        width: b(document).width(),
                        height: b(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var h = b(f),
                    j = [];
                    b(["Top", "Right", "Left", "Bottom"]).each(function(r, u) {
                        j[r] = c(h.css("padding" + u))
                    });
                    g.containerOffset = h.offset();
                    g.containerPosition = h.position();
                    g.containerSize = {
                        height: h.innerHeight() - j[3],
                        width: h.innerWidth() - j[1]
                    };
                    d = g.containerOffset;
                    var k = g.containerSize.height,
                    l = g.containerSize.width;
                    l = b.ui.hasScroll(f, "left") ? f.scrollWidth: l;
                    k = b.ui.hasScroll(f) ? f.scrollHeight: k;
                    g.parentData = {
                        element: f,
                        left: d.left,
                        top: d.top,
                        width: l,
                        height: k
                    }
                }
            }
        },
        resize: function(g) {
            var f = b(this).data("resizable"),
            d = f.options,
            h = f.containerOffset,
            j = f.position;
            g = f._aspectRatio || g.shiftKey;
            var k = {
                top: 0,
                left: 0
            },
            l = f.containerElement;
            if (l[0] != document && /static/.test(l.css("position"))) k = h;
            if (j.left < (f._helper ? h.left: 0)) {
                f.size.width += f._helper ? f.position.left - h.left: f.position.left - k.left;
                if (g) f.size.height = f.size.width / d.aspectRatio;
                f.position.left = d.helper ? h.left: 0
            }
            if (j.top < (f._helper ? h.top: 0)) {
                f.size.height += f._helper ? f.position.top - h.top: f.position.top;
                if (g) f.size.width = f.size.height * d.aspectRatio;
                f.position.top = f._helper ? h.top: 0
            }
            f.offset.left = f.parentData.left + f.position.left;
            f.offset.top = f.parentData.top + f.position.top;
            d = Math.abs((f._helper ? f.offset.left - k.left: f.offset.left - k.left) + f.sizeDiff.width);
            h = Math.abs((f._helper ? f.offset.top - k.top: f.offset.top - h.top) + f.sizeDiff.height);
            j = f.containerElement.get(0) == f.element.parent().get(0);
            k = /relative|absolute/.test(f.containerElement.css("position"));
            if (j && k) d -= f.parentData.left;
            if (d + f.size.width >= f.parentData.width) {
                f.size.width = f.parentData.width - d;
                if (g) f.size.height = f.size.width / f.aspectRatio
            }
            if (h + f.size.height >= f.parentData.height) {
                f.size.height = f.parentData.height - h;
                if (g) f.size.width = f.size.height * f.aspectRatio
            }
        },
        stop: function() {
            var g = b(this).data("resizable"),
            f = g.options,
            d = g.containerOffset,
            h = g.containerPosition,
            j = g.containerElement,
            k = b(g.helper),
            l = k.offset(),
            r = k.outerWidth() - g.sizeDiff.width;
            k = k.outerHeight() - g.sizeDiff.height;
            g._helper && !f.animate && /relative/.test(j.css("position")) && b(this).css({
                left: l.left - h.left - d.left,
                width: r,
                height: k
            });
            g._helper && !f.animate && /static/.test(j.css("position")) && b(this).css({
                left: l.left - h.left - d.left,
                width: r,
                height: k
            })
        }
    });
    b.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var g = b(this).data("resizable"),
            f = g.options,
            d = g.size;
            g.ghost = g.originalElement.clone();
            g.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: d.height,
                width: d.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof f.ghost == "string" ? f.ghost: "");
            g.ghost.appendTo(g.helper)
        },
        resize: function() {
            var g = b(this).data("resizable");
            g.ghost && g.ghost.css({
                position: "relative",
                height: g.size.height,
                width: g.size.width
            })
        },
        stop: function() {
            var g = b(this).data("resizable");
            g.ghost && g.helper && g.helper.get(0).removeChild(g.ghost.get(0))
        }
    });
    b.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var g = b(this).data("resizable"),
            f = g.options,
            d = g.size,
            h = g.originalSize,
            j = g.originalPosition,
            k = g.axis;
            f.grid = typeof f.grid == "number" ? [f.grid, f.grid] : f.grid;
            var l = Math.round((d.width - h.width) / (f.grid[0] || 1)) * (f.grid[0] || 1);
            f = Math.round((d.height - h.height) / (f.grid[1] || 1)) * (f.grid[1] || 1);
            if (/^(se|s|e)$/.test(k)) {
                g.size.width = h.width + l;
                g.size.height = h.height + f
            } else if (/^(ne)$/.test(k)) {
                g.size.width = h.width + l;
                g.size.height = h.height + f;
                g.position.top = j.top - f
            } else {
                if (/^(sw)$/.test(k)) {
                    g.size.width = h.width + l;
                    g.size.height = h.height + f
                } else {
                    g.size.width = h.width + l;
                    g.size.height = h.height + f;
                    g.position.top = j.top - f
                }
                g.position.left = j.left - l
            }
        }
    });
    var c = function(g) {
        return parseInt(g, 10) || 0
    },
    e = function(g) {
        return ! isNaN(parseInt(g, 10))
    }
})(jQuery);
(function(b) {
    b.widget("ui.selectable", b.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        },
        _create: function() {
            var c = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var e;
            this.refresh = function() {
                e = b(c.options.filter, c.element[0]);
                e.each(function() {
                    var g = b(this),
                    f = g.offset();
                    b.data(this, "selectable-item", {
                        element: this,
                        $element: g,
                        left: f.left,
                        top: f.top,
                        right: f.left + g.outerWidth(),
                        bottom: f.top + g.outerHeight(),
                        startselected: false,
                        selected: g.hasClass("ui-selected"),
                        selecting: g.hasClass("ui-selecting"),
                        unselecting: g.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = e.addClass("ui-selectee");
            this._mouseInit();
            this.helper = b("<div class='ui-selectable-helper'></div>")
        },
        destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        },
        _mouseStart: function(c) {
            var e = this;
            this.opos = [c.pageX, c.pageY];
            if (!this.options.disabled) {
                var g = this.options;
                this.selectees = b(g.filter, this.element[0]);
                this._trigger("start", c);
                b(g.appendTo).append(this.helper);
                this.helper.css({
                    left: c.clientX,
                    top: c.clientY,
                    width: 0,
                    height: 0
                });
                g.autoRefresh && this.refresh();
                this.selectees.filter(".ui-selected").each(function() {
                    var f = b.data(this, "selectable-item");
                    f.startselected = true;
                    if (!c.metaKey) {
                        f.$element.removeClass("ui-selected");
                        f.selected = false;
                        f.$element.addClass("ui-unselecting");
                        f.unselecting = true;
                        e._trigger("unselecting", c, {
                            unselecting: f.element
                        })
                    }
                });
                b(c.target).parents().andSelf().each(function() {
                    var f = b.data(this, "selectable-item");
                    if (f) {
                        var d = !c.metaKey || !f.$element.hasClass("ui-selected");
                        f.$element.removeClass(d ? "ui-unselecting": "ui-selected").addClass(d ? "ui-selecting": "ui-unselecting");
                        f.unselecting = !d;
                        f.selecting = d;
                        (f.selected = d) ? e._trigger("selecting", c, {
                            selecting: f.element
                        }) : e._trigger("unselecting", c, {
                            unselecting: f.element
                        });
                        return false
                    }
                })
            }
        },
        _mouseDrag: function(c) {
            var e = this;
            this.dragged = true;
            if (!this.options.disabled) {
                var g = this.options,
                f = this.opos[0],
                d = this.opos[1],
                h = c.pageX,
                j = c.pageY;
                if (f > h) {
                    var k = h;
                    h = f;
                    f = k
                }
                if (d > j) {
                    k = j;
                    j = d;
                    d = k
                }
                this.helper.css({
                    left: f,
                    top: d,
                    width: h - f,
                    height: j - d
                });
                this.selectees.each(function() {
                    var l = b.data(this, "selectable-item");
                    if (! (!l || l.element == e.element[0])) {
                        var r = false;
                        if (g.tolerance == "touch") r = !(l.left > h || l.right < f || l.top > j || l.bottom < d);
                        else if (g.tolerance == "fit") r = l.left > f && l.right < h && l.top > d && l.bottom < j;
                        if (r) {
                            if (l.selected) {
                                l.$element.removeClass("ui-selected");
                                l.selected = false
                            }
                            if (l.unselecting) {
                                l.$element.removeClass("ui-unselecting");
                                l.unselecting = false
                            }
                            if (!l.selecting) {
                                l.$element.addClass("ui-selecting");
                                l.selecting = true;
                                e._trigger("selecting", c, {
                                    selecting: l.element
                                })
                            }
                        } else {
                            if (l.selecting) if (c.metaKey && l.startselected) {
                                l.$element.removeClass("ui-selecting");
                                l.selecting = false;
                                l.$element.addClass("ui-selected");
                                l.selected = true
                            } else {
                                l.$element.removeClass("ui-selecting");
                                l.selecting = false;
                                if (l.startselected) {
                                    l.$element.addClass("ui-unselecting");
                                    l.unselecting = true
                                }
                                e._trigger("unselecting", c, {
                                    unselecting: l.element
                                })
                            }
                            if (l.selected) if (!c.metaKey && !l.startselected) {
                                l.$element.removeClass("ui-selected");
                                l.selected = false;
                                l.$element.addClass("ui-unselecting");
                                l.unselecting = true;
                                e._trigger("unselecting", c, {
                                    unselecting: l.element
                                })
                            }
                        }
                    }
                });
                return false
            }
        },
        _mouseStop: function(c) {
            var e = this;
            this.dragged = false;
            b(".ui-unselecting", this.element[0]).each(function() {
                var g = b.data(this, "selectable-item");
                g.$element.removeClass("ui-unselecting");
                g.unselecting = false;
                g.startselected = false;
                e._trigger("unselected", c, {
                    unselected: g.element
                })
            });
            b(".ui-selecting", this.element[0]).each(function() {
                var g = b.data(this, "selectable-item");
                g.$element.removeClass("ui-selecting").addClass("ui-selected");
                g.selecting = false;
                g.selected = true;
                g.startselected = true;
                e._trigger("selected", c, {
                    selected: g.element
                })
            });
            this._trigger("stop", c);
            this.helper.remove();
            return false
        }
    });
    b.extend(b.ui.selectable, {
        version: "1.8.11"
    })
})(jQuery);
(function(b) {
    b.widget("ui.sortable", b.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3
        },
        _create: function() {
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var c = this.items.length - 1; c >= 0; c--) this.items[c].item.removeData("sortable-item");
            return this
        },
        _setOption: function(c, e) {
            if (c === "disabled") {
                this.options[c] = e;
                this.widget()[e ? "addClass": "removeClass"]("ui-sortable-disabled")
            } else b.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(c, e) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(c);
            var g = null,
            f = this;
            b(c.target).parents().each(function() {
                if (b.data(this, "sortable-item") == f) {
                    g = b(this);
                    return false
                }
            });
            if (b.data(c.target, "sortable-item") == f) g = b(c.target);
            if (!g) return false;
            if (this.options.handle && !e) {
                var d = false;
                b(this.options.handle, g).find("*").andSelf().each(function() {
                    if (this == c.target) d = true
                });
                if (!d) return false
            }
            this.currentItem = g;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(c, e, g) {
            e = this.options;
            var f = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(c);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            b.extend(this.offset, {
                click: {
                    left: c.pageX - this.offset.left,
                    top: c.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(c);
            this.originalPageX = c.pageX;
            this.originalPageY = c.pageY;
            e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            e.containment && this._setContainment();
            if (e.cursor) {
                if (b("body").css("cursor")) this._storedCursor = b("body").css("cursor");
                b("body").css("cursor", e.cursor)
            }
            if (e.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", e.opacity)
            }
            if (e.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", e.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", c, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!g) for (g = this.containers.length - 1; g >= 0; g--) this.containers[g]._trigger("activate", c, f._uiHash(this));
            if (b.ui.ddmanager) b.ui.ddmanager.current = this;
            b.ui.ddmanager && !e.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, c);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(c);
            return true
        },
        _mouseDrag: function(c) {
            this.position = this._generatePosition(c);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var e = this.options,
                g = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - c.pageY < e.scrollSensitivity) this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop + e.scrollSpeed;
                    else if (c.pageY - this.overflowOffset.top < e.scrollSensitivity) this.scrollParent[0].scrollTop = g = this.scrollParent[0].scrollTop - e.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - c.pageX < e.scrollSensitivity) this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft + e.scrollSpeed;
                    else if (c.pageX - this.overflowOffset.left < e.scrollSensitivity) this.scrollParent[0].scrollLeft = g = this.scrollParent[0].scrollLeft - e.scrollSpeed
                } else {
                    if (c.pageY - b(document).scrollTop() < e.scrollSensitivity) g = b(document).scrollTop(b(document).scrollTop() - e.scrollSpeed);
                    else if (b(window).height() - (c.pageY - b(document).scrollTop()) < e.scrollSensitivity) g = b(document).scrollTop(b(document).scrollTop() + e.scrollSpeed);
                    if (c.pageX - b(document).scrollLeft() < e.scrollSensitivity) g = b(document).scrollLeft(b(document).scrollLeft() - e.scrollSpeed);
                    else if (b(window).width() - (c.pageX - b(document).scrollLeft()) < e.scrollSensitivity) g = b(document).scrollLeft(b(document).scrollLeft() + e.scrollSpeed)
                }
                g !== false && b.ui.ddmanager && !e.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, c)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (e = this.items.length - 1; e >= 0; e--) {
                g = this.items[e];
                var f = g.item[0],
                d = this._intersectsWithPointer(g);
                if (d) if (f != this.currentItem[0] && this.placeholder[d == 1 ? "next": "prev"]()[0] != f && !b.ui.contains(this.placeholder[0], f) && (this.options.type == "semi-dynamic" ? !b.ui.contains(this.element[0], f) : true)) {
                    this.direction = d == 1 ? "down": "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(g)) this._rearrange(c, g);
                    else break;
                    this._trigger("change", c, this._uiHash());
                    break
                }
            }
            this._contactContainers(c);
            b.ui.ddmanager && b.ui.ddmanager.drag(this, c);
            this._trigger("sort", c, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(c, e) {
            if (c) {
                b.ui.ddmanager && !this.options.dropBehaviour && b.ui.ddmanager.drop(this, c);
                if (this.options.revert) {
                    var g = this;
                    e = g.placeholder.offset();
                    g.reverting = true;
                    b(this.helper).animate({
                        left: e.left - this.offset.parent.left - g.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: e.top - this.offset.parent.top - g.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    },
                    parseInt(this.options.revert, 10) || 500,
                    function() {
                        g._clear(c)
                    })
                } else this._clear(c, e);
                return false
            }
        },
        cancel: function() {
            var c = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--) {
                    this.containers[e]._trigger("deactivate", null, c._uiHash(this));
                    if (this.containers[e].containerCache.over) {
                        this.containers[e]._trigger("out", null, c._uiHash(this));
                        this.containers[e].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                b.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                this.domPosition.prev ? b(this.domPosition.prev).after(this.currentItem) : b(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function(c) {
            var e = this._getItemsAsjQuery(c && c.connected),
            g = [];
            c = c || {};
            b(e).each(function() {
                var f = (b(c.item || this).attr(c.attribute || "id") || "").match(c.expression || /(.+)[-=_](.+)/);
                if (f) g.push((c.key || f[1] + "[]") + "=" + (c.key && c.expression ? f[1] : f[2]))
            }); ! g.length && c.key && g.push(c.key + "=");
            return g.join("&")
        },
        toArray: function(c) {
            var e = this._getItemsAsjQuery(c && c.connected),
            g = [];
            c = c || {};
            e.each(function() {
                g.push(b(c.item || this).attr(c.attribute || "id") || "")
            });
            return g
        },
        _intersectsWith: function(c) {
            var e = this.positionAbs.left,
            g = e + this.helperProportions.width,
            f = this.positionAbs.top,
            d = f + this.helperProportions.height,
            h = c.left,
            j = h + c.width,
            k = c.top,
            l = k + c.height,
            r = this.offset.click.top,
            u = this.offset.click.left;
            r = f + r > k && f + r < l && e + u > h && e + u < j;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width": "height"] > c[this.floating ? "width": "height"] ? r: h < e + this.helperProportions.width / 2 && g - this.helperProportions.width / 2 < j && k < f + this.helperProportions.height / 2 && d - this.helperProportions.height / 2 < l
        },
        _intersectsWithPointer: function(c) {
            var e = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top, c.height);
            c = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left, c.width);
            e = e && c;
            c = this._getDragVerticalDirection();
            var g = this._getDragHorizontalDirection();
            if (!e) return false;
            return this.floating ? g && g == "right" || c == "down" ? 2 : 1 : c && (c == "down" ? 2 : 1)
        },
        _intersectsWithSides: function(c) {
            var e = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, c.top + c.height / 2, c.height);
            c = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, c.left + c.width / 2, c.width);
            var g = this._getDragVerticalDirection(),
            f = this._getDragHorizontalDirection();
            return this.floating && f ? f == "right" && c || f == "left" && !c: g && (g == "down" && e || g == "up" && !e)
        },
        _getDragVerticalDirection: function() {
            var c = this.positionAbs.top - this.lastPositionAbs.top;
            return c != 0 && (c > 0 ? "down": "up")
        },
        _getDragHorizontalDirection: function() {
            var c = this.positionAbs.left - this.lastPositionAbs.left;
            return c != 0 && (c > 0 ? "right": "left")
        },
        refresh: function(c) {
            this._refreshItems(c);
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var c = this.options;
            return c.connectWith.constructor == String ? [c.connectWith] : c.connectWith
        },
        _getItemsAsjQuery: function(c) {
            var e = [],
            g = [],
            f = this._connectWith();
            if (f && c) for (c = f.length - 1; c >= 0; c--) for (var d = b(f[c]), h = d.length - 1; h >= 0; h--) {
                var j = b.data(d[h], "sortable");
                if (j && j != this && !j.options.disabled) g.push([b.isFunction(j.options.items) ? j.options.items.call(j.element) : b(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
            }
            g.push([b.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : b(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (c = g.length - 1; c >= 0; c--) g[c][0].each(function() {
                e.push(this)
            });
            return b(e)
        },
        _removeCurrentsFromItems: function() {
            for (var c = this.currentItem.find(":data(sortable-item)"), e = 0; e < this.items.length; e++) for (var g = 0; g < c.length; g++) c[g] == this.items[e].item[0] && this.items.splice(e, 1)
        },
        _refreshItems: function(c) {
            this.items = [];
            this.containers = [this];
            var e = this.items,
            g = [[b.isFunction(this.options.items) ? this.options.items.call(this.element[0], c, {
                item: this.currentItem
            }) : b(this.options.items, this.element), this]],
            f = this._connectWith();
            if (f) for (var d = f.length - 1; d >= 0; d--) for (var h = b(f[d]), j = h.length - 1; j >= 0; j--) {
                var k = b.data(h[j], "sortable");
                if (k && k != this && !k.options.disabled) {
                    g.push([b.isFunction(k.options.items) ? k.options.items.call(k.element[0], c, {
                        item: this.currentItem
                    }) : b(k.options.items, k.element), k]);
                    this.containers.push(k)
                }
            }
            for (d = g.length - 1; d >= 0; d--) {
                c = g[d][1];
                f = g[d][0];
                j = 0;
                for (h = f.length; j < h; j++) {
                    k = b(f[j]);
                    k.data("sortable-item", c);
                    e.push({
                        item: k,
                        instance: c,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(c) {
            if (this.offsetParent && this.helper) this.offset.parent = this._getParentOffset();
            for (var e = this.items.length - 1; e >= 0; e--) {
                var g = this.items[e],
                f = this.options.toleranceElement ? b(this.options.toleranceElement, g.item) : g.item;
                if (!c) {
                    g.width = f.outerWidth();
                    g.height = f.outerHeight()
                }
                f = f.offset();
                g.left = f.left;
                g.top = f.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (e = this.containers.length - 1; e >= 0; e--) {
                f = this.containers[e].element.offset();
                this.containers[e].containerCache.left = f.left;
                this.containers[e].containerCache.top = f.top;
                this.containers[e].containerCache.width = this.containers[e].element.outerWidth();
                this.containers[e].containerCache.height = this.containers[e].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function(c) {
            var e = c || this,
            g = e.options;
            if (!g.placeholder || g.placeholder.constructor == String) {
                var f = g.placeholder;
                g.placeholder = {
                    element: function() {
                        var d = b(document.createElement(e.currentItem[0].nodeName)).addClass(f || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!f) d.style.visibility = "hidden";
                        return d
                    },
                    update: function(d, h) {
                        if (! (f && !g.forcePlaceholderSize)) {
                            h.height() || h.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10));
                            h.width() || h.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            e.placeholder = b(g.placeholder.element.call(e.element, e.currentItem));
            e.currentItem.after(e.placeholder);
            g.placeholder.update(e, e.placeholder)
        },
        _contactContainers: function(c) {
            for (var e = null, g = null, f = this.containers.length - 1; f >= 0; f--) if (!b.ui.contains(this.currentItem[0], this.containers[f].element[0])) if (this._intersectsWith(this.containers[f].containerCache)) {
                if (! (e && b.ui.contains(this.containers[f].element[0], e.element[0]))) {
                    e = this.containers[f];
                    g = f
                }
            } else if (this.containers[f].containerCache.over) {
                this.containers[f]._trigger("out", c, this._uiHash(this));
                this.containers[f].containerCache.over = 0
            }
            if (e) if (this.containers.length === 1) {
                this.containers[g]._trigger("over", c, this._uiHash(this));
                this.containers[g].containerCache.over = 1
            } else if (this.currentContainer != this.containers[g]) {
                e = 1E4;
                f = null;
                for (var d = this.positionAbs[this.containers[g].floating ? "left": "top"], h = this.items.length - 1; h >= 0; h--) if (b.ui.contains(this.containers[g].element[0], this.items[h].item[0])) {
                    var j = this.items[h][this.containers[g].floating ? "left": "top"];
                    if (Math.abs(j - d) < e) {
                        e = Math.abs(j - d);
                        f = this.items[h]
                    }
                }
                if (f || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[g];
                    f ? this._rearrange(c, f, null, true) : this._rearrange(c, null, this.containers[g].element, true);
                    this._trigger("change", c, this._uiHash());
                    this.containers[g]._trigger("change", c, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[g]._trigger("over", c, this._uiHash(this));
                    this.containers[g].containerCache.over = 1
                }
            }
        },
        _createHelper: function(c) {
            var e = this.options;
            c = b.isFunction(e.helper) ? b(e.helper.apply(this.element[0], [c, this.currentItem])) : e.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            c.parents("body").length || b(e.appendTo != "parent" ? e.appendTo: this.currentItem[0].parentNode)[0].appendChild(c[0]);
            if (c[0] == this.currentItem[0]) this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (c[0].style.width == "" || e.forceHelperSize) c.width(this.currentItem.width());
            if (c[0].style.height == "" || e.forceHelperSize) c.height(this.currentItem.height());
            return c
        },
        _adjustOffsetFromHelper: function(c) {
            if (typeof c == "string") c = c.split(" ");
            if (b.isArray(c)) c = {
                left: +c[0],
                top: +c[1] || 0
            };
            if ("left" in c) this.offset.click.left = c.left + this.margins.left;
            if ("right" in c) this.offset.click.left = this.helperProportions.width - c.right + this.margins.left;
            if ("top" in c) this.offset.click.top = c.top + this.margins.top;
            if ("bottom" in c) this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var c = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                c.left += this.scrollParent.scrollLeft();
                c.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie) c = {
                top: 0,
                left: 0
            };
            return {
                top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var c = this.currentItem.position();
                return {
                    top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var c = this.options;
            if (c.containment == "parent") c.containment = this.helper[0].parentNode;
            if (c.containment == "document" || c.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, b(c.containment == "document" ? document: window).width() - this.helperProportions.width - this.margins.left, (b(c.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(c.containment)) {
                var e = b(c.containment)[0];
                c = b(c.containment).offset();
                var g = b(e).css("overflow") != "hidden";
                this.containment = [c.left + (parseInt(b(e).css("borderLeftWidth"), 10) || 0) + (parseInt(b(e).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(b(e).css("borderTopWidth"), 10) || 0) + (parseInt(b(e).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (g ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(b(e).css("borderLeftWidth"), 10) || 0) - (parseInt(b(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (g ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(b(e).css("borderTopWidth"), 10) || 0) - (parseInt(b(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(c, e) {
            if (!e) e = this.position;
            c = c == "absolute" ? 1 : -1;
            var g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            f = /(html|body)/i.test(g[0].tagName);
            return {
                top: e.top + this.offset.relative.top * c + this.offset.parent.top * c - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : g.scrollTop()) * c),
                left: e.left + this.offset.relative.left * c + this.offset.parent.left * c - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : g.scrollLeft()) * c)
            }
        },
        _generatePosition: function(c) {
            var e = this.options,
            g = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            f = /(html|body)/i.test(g[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var d = c.pageX,
            h = c.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (c.pageX - this.offset.click.left < this.containment[0]) d = this.containment[0] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top < this.containment[1]) h = this.containment[1] + this.offset.click.top;
                    if (c.pageX - this.offset.click.left > this.containment[2]) d = this.containment[2] + this.offset.click.left;
                    if (c.pageY - this.offset.click.top > this.containment[3]) h = this.containment[3] + this.offset.click.top
                }
                if (e.grid) {
                    h = this.originalPageY + Math.round((h - this.originalPageY) / e.grid[1]) * e.grid[1];
                    h = this.containment ? !(h - this.offset.click.top < this.containment[1] || h - this.offset.click.top > this.containment[3]) ? h: !(h - this.offset.click.top < this.containment[1]) ? h - e.grid[1] : h + e.grid[1] : h;
                    d = this.originalPageX + Math.round((d - this.originalPageX) / e.grid[0]) * e.grid[0];
                    d = this.containment ? !(d - this.offset.click.left < this.containment[0] || d - this.offset.click.left > this.containment[2]) ? d: !(d - this.offset.click.left < this.containment[0]) ? d - e.grid[0] : d + e.grid[0] : d
                }
            }
            return {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : g.scrollTop()),
                left: d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : g.scrollLeft())
            }
        },
        _rearrange: function(c, e, g, f) {
            g ? g[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? e.item[0] : e.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter: 1;
            var d = this,
            h = this.counter;
            window.setTimeout(function() {
                h == d.counter && d.refreshPositions(!f)
            },
            0)
        },
        _clear: function(c, e) {
            this.reverting = false;
            var g = []; ! this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var f in this._storedCSS) if (this._storedCSS[f] == "auto" || this._storedCSS[f] == "static") this._storedCSS[f] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !e && g.push(function(d) {
                this._trigger("receive", d, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) g.push(function(d) {
                this._trigger("update", d, this._uiHash())
            });
            if (!b.ui.contains(this.element[0], this.currentItem[0])) {
                e || g.push(function(d) {
                    this._trigger("remove", d, this._uiHash())
                });
                for (f = this.containers.length - 1; f >= 0; f--) if (b.ui.contains(this.containers[f].element[0], this.currentItem[0]) && !e) {
                    g.push(function(d) {
                        return function(h) {
                            d._trigger("receive", h, this._uiHash(this))
                        }
                    }.call(this, this.containers[f]));
                    g.push(function(d) {
                        return function(h) {
                            d._trigger("update", h, this._uiHash(this))
                        }
                    }.call(this, this.containers[f]))
                }
            }
            for (f = this.containers.length - 1; f >= 0; f--) {
                e || g.push(function(d) {
                    return function(h) {
                        d._trigger("deactivate", h, this._uiHash(this))
                    }
                }.call(this, this.containers[f]));
                if (this.containers[f].containerCache.over) {
                    g.push(function(d) {
                        return function(h) {
                            d._trigger("out", h, this._uiHash(this))
                        }
                    }.call(this, this.containers[f]));
                    this.containers[f].containerCache.over = 0
                }
            }
            this._storedCursor && b("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "": this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!e) {
                    this._trigger("beforeStop", c, this._uiHash());
                    for (f = 0; f < g.length; f++) g[f].call(this, c);
                    this._trigger("stop", c, this._uiHash())
                }
                return false
            }
            e || this._trigger("beforeStop", c, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!e) {
                for (f = 0; f < g.length; f++) g[f].call(this, c);
                this._trigger("stop", c, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function() {
            b.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function(c) {
            var e = c || this;
            return {
                helper: e.helper,
                placeholder: e.placeholder || b([]),
                position: e.position,
                originalPosition: e.originalPosition,
                offset: e.positionAbs,
                item: e.currentItem,
                sender: c ? c.element: null
            }
        }
    });
    b.extend(b.ui.sortable, {
        version: "1.8.11"
    })
})(jQuery);
(function(b) {
    b.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {
                header: "ui-icon-triangle-1-e",
                headerSelected: "ui-icon-triangle-1-s"
            },
            navigation: false,
            navigationFilter: function() {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        },
        _create: function() {
            var c = this,
            e = c.options;
            c.running = 0;
            c.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
            c.headers = c.element.find(e.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",
            function() {
                e.disabled || b(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion",
            function() {
                e.disabled || b(this).removeClass("ui-state-hover")
            }).bind("focus.accordion",
            function() {
                e.disabled || b(this).addClass("ui-state-focus")
            }).bind("blur.accordion",
            function() {
                e.disabled || b(this).removeClass("ui-state-focus")
            });
            c.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (e.navigation) {
                var g = c.element.find("a").filter(e.navigationFilter).eq(0);
                if (g.length) {
                    var f = g.closest(".ui-accordion-header");
                    c.active = f.length ? f: g.closest(".ui-accordion-content").prev()
                }
            }
            c.active = c._findActive(c.active || e.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            c.active.next().addClass("ui-accordion-content-active");
            c._createIcons();
            c.resize();
            c.element.attr("role", "tablist");
            c.headers.attr("role", "tab").bind("keydown.accordion",
            function(d) {
                return c._keydown(d)
            }).next().attr("role", "tabpanel");
            c.headers.not(c.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide();
            c.active.length ? c.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : c.headers.eq(0).attr("tabIndex", 0);
            b.browser.safari || c.headers.find("a").attr("tabIndex", -1);
            e.event && c.headers.bind(e.event.split(" ").join(".accordion ") + ".accordion",
            function(d) {
                c._clickHandler.call(c, d, this);
                d.preventDefault()
            })
        },
        _createIcons: function() {
            var c = this.options;
            if (c.icons) {
                b("<span></span>").addClass("ui-icon " + c.icons.header).prependTo(this.headers);
                this.active.children(".ui-icon").toggleClass(c.icons.header).toggleClass(c.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        },
        _destroyIcons: function() {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        },
        destroy: function() {
            var c = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var e = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            if (c.autoHeight || c.fillHeight) e.css("height", "");
            return b.Widget.prototype.destroy.call(this)
        },
        _setOption: function(c, e) {
            b.Widget.prototype._setOption.apply(this, arguments);
            c == "active" && this.activate(e);
            if (c == "icons") {
                this._destroyIcons();
                e && this._createIcons()
            }
            if (c == "disabled") this.headers.add(this.headers.next())[e ? "addClass": "removeClass"]("ui-accordion-disabled ui-state-disabled")
        },
        _keydown: function(c) {
            if (! (this.options.disabled || c.altKey || c.ctrlKey)) {
                var e = b.ui.keyCode,
                g = this.headers.length,
                f = this.headers.index(c.target),
                d = false;
                switch (c.keyCode) {
                case e.RIGHT:
                case e.DOWN:
                    d = this.headers[(f + 1) % g];
                    break;
                case e.LEFT:
                case e.UP:
                    d = this.headers[(f - 1 + g) % g];
                    break;
                case e.SPACE:
                case e.ENTER:
                    this._clickHandler({
                        target:
                        c.target
                    },
                    c.target);
                    c.preventDefault()
                }
                if (d) {
                    b(c.target).attr("tabIndex", -1);
                    b(d).attr("tabIndex", 0);
                    d.focus();
                    return false
                }
                return true
            }
        },
        resize: function() {
            var c = this.options,
            e;
            if (c.fillSpace) {
                if (b.browser.msie) {
                    var g = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                e = this.element.parent().height();
                b.browser.msie && this.element.parent().css("overflow", g);
                this.headers.each(function() {
                    e -= b(this).outerHeight(true)
                });
                this.headers.next().each(function() {
                    b(this).height(Math.max(0, e - b(this).innerHeight() + b(this).height()))
                }).css("overflow", "auto")
            } else if (c.autoHeight) {
                e = 0;
                this.headers.next().each(function() {
                    e = Math.max(e, b(this).height("").height())
                }).height(e)
            }
            return this
        },
        activate: function(c) {
            this.options.active = c;
            c = this._findActive(c)[0];
            this._clickHandler({
                target: c
            },
            c);
            return this
        },
        _findActive: function(c) {
            return c ? typeof c === "number" ? this.headers.filter(":eq(" + c + ")") : this.headers.not(this.headers.not(c)) : c === false ? b([]) : this.headers.filter(":eq(0)")
        },
        _clickHandler: function(c, e) {
            var g = this.options;
            if (!g.disabled) if (c.target) {
                c = b(c.currentTarget || e);
                e = c[0] === this.active[0];
                g.active = g.collapsible && e ? false: this.headers.index(c);
                if (! (this.running || !g.collapsible && e)) {
                    var f = this.active;
                    k = c.next();
                    h = this.active.next();
                    j = {
                        options: g,
                        newHeader: e && g.collapsible ? b([]) : c,
                        oldHeader: this.active,
                        newContent: e && g.collapsible ? b([]) : k,
                        oldContent: h
                    };
                    var d = this.headers.index(this.active[0]) > this.headers.index(c[0]);
                    this.active = e ? b([]) : c;
                    this._toggle(k, h, j, e, d);
                    f.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(g.icons.headerSelected).addClass(g.icons.header);
                    if (!e) {
                        c.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(g.icons.header).addClass(g.icons.headerSelected);
                        c.next().addClass("ui-accordion-content-active")
                    }
                }
            } else if (g.collapsible) {
                this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(g.icons.headerSelected).addClass(g.icons.header);
                this.active.next().addClass("ui-accordion-content-active");
                var h = this.active.next(),
                j = {
                    options: g,
                    newHeader: b([]),
                    oldHeader: g.active,
                    newContent: b([]),
                    oldContent: h
                },
                k = this.active = b([]);
                this._toggle(k, h, j)
            }
        },
        _toggle: function(c, e, g, f, d) {
            var h = this,
            j = h.options;
            h.toShow = c;
            h.toHide = e;
            h.data = g;
            var k = function() {
                if (h) return h._completed.apply(h, arguments)
            };
            h._trigger("changestart", null, h.data);
            h.running = e.size() === 0 ? c.size() : e.size();
            if (j.animated) {
                g = {};
                g = j.collapsible && f ? {
                    toShow: b([]),
                    toHide: e,
                    complete: k,
                    down: d,
                    autoHeight: j.autoHeight || j.fillSpace
                }: {
                    toShow: c,
                    toHide: e,
                    complete: k,
                    down: d,
                    autoHeight: j.autoHeight || j.fillSpace
                };
                if (!j.proxied) j.proxied = j.animated;
                if (!j.proxiedDuration) j.proxiedDuration = j.duration;
                j.animated = b.isFunction(j.proxied) ? j.proxied(g) : j.proxied;
                j.duration = b.isFunction(j.proxiedDuration) ? j.proxiedDuration(g) : j.proxiedDuration;
                f = b.ui.accordion.animations;
                var l = j.duration,
                r = j.animated;
                if (r && !f[r] && !b.easing[r]) r = "slide";
                f[r] || (f[r] = function(u) {
                    this.slide(u, {
                        easing: r,
                        duration: l || 700
                    })
                });
                f[r](g)
            } else {
                if (j.collapsible && f) c.toggle();
                else {
                    e.hide();
                    c.show()
                }
                k(true)
            }
            e.prev().attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).blur();
            c.prev().attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }).focus()
        },
        _completed: function(c) {
            this.running = c ? 0 : --this.running;
            if (!this.running) {
                this.options.clearStyle && this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                });
                this.toHide.removeClass("ui-accordion-content-active");
                if (this.toHide.length) this.toHide.parent()[0].className = this.toHide.parent()[0].className;
                this._trigger("change", null, this.data)
            }
        }
    });
    b.extend(b.ui.accordion, {
        version: "1.8.11",
        animations: {
            slide: function(c, e) {
                c = b.extend({
                    easing: "swing",
                    duration: 300
                },
                c, e);
                if (c.toHide.size()) if (c.toShow.size()) {
                    var g = c.toShow.css("overflow"),
                    f = 0,
                    d = {},
                    h = {},
                    j;
                    e = c.toShow;
                    j = e[0].style.width;
                    e.width(parseInt(e.parent().width(), 10) - parseInt(e.css("paddingLeft"), 10) - parseInt(e.css("paddingRight"), 10) - (parseInt(e.css("borderLeftWidth"), 10) || 0) - (parseInt(e.css("borderRightWidth"), 10) || 0));
                    b.each(["height", "paddingTop", "paddingBottom"],
                    function(k, l) {
                        h[l] = "hide";
                        k = ("" + b.css(c.toShow[0], l)).match(/^([\d+-.]+)(.*)$/);
                        d[l] = {
                            value: k[1],
                            unit: k[2] || "px"
                        }
                    });
                    c.toShow.css({
                        height: 0,
                        overflow: "hidden"
                    }).show();
                    c.toHide.filter(":hidden").each(c.complete).end().filter(":visible").animate(h, {
                        step: function(k, l) {
                            if (l.prop == "height") f = l.end - l.start === 0 ? 0 : (l.now - l.start) / (l.end - l.start);
                            c.toShow[0].style[l.prop] = f * d[l.prop].value + d[l.prop].unit
                        },
                        duration: c.duration,
                        easing: c.easing,
                        complete: function() {
                            c.autoHeight || c.toShow.css("height", "");
                            c.toShow.css({
                                width: j,
                                overflow: g
                            });
                            c.complete()
                        }
                    })
                } else c.toHide.animate({
                    height: "hide",
                    paddingTop: "hide",
                    paddingBottom: "hide"
                },
                c);
                else c.toShow.animate({
                    height: "show",
                    paddingTop: "show",
                    paddingBottom: "show"
                },
                c)
            },
            bounceslide: function(c) {
                this.slide(c, {
                    easing: c.down ? "easeOutBounce": "swing",
                    duration: c.down ? 1E3: 200
                })
            }
        }
    })
})(jQuery);
(function(b) {
    var c = 0;
    b.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function() {
            var e = this,
            g = this.element[0].ownerDocument,
            f;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete",
            function(d) {
                if (! (e.options.disabled || e.element.attr("readonly"))) {
                    f = false;
                    var h = b.ui.keyCode;
                    switch (d.keyCode) {
                    case h.PAGE_UP:
                        e._move("previousPage", d);
                        break;
                    case h.PAGE_DOWN:
                        e._move("nextPage", d);
                        break;
                    case h.UP:
                        e._move("previous", d);
                        d.preventDefault();
                        break;
                    case h.DOWN:
                        e._move("next", d);
                        d.preventDefault();
                        break;
                    case h.ENTER:
                    case h.NUMPAD_ENTER:
                        if (e.menu.active) {
                            f = true;
                            d.preventDefault()
                        }
                    case h.TAB:
                        if (!e.menu.active) return;
                        e.menu.select(d);
                        break;
                    case h.ESCAPE:
                        e.element.val(e.term);
                        e.close(d);
                        break;
                    default:
                        clearTimeout(e.searching);
                        e.searching = setTimeout(function() {
                            if (e.term != e.element.val()) {
                                e.selectedItem = null;
                                e.search(null, d)
                            }
                        },
                        e.options.delay);
                        break
                    }
                }
            }).bind("keypress.autocomplete",
            function(d) {
                if (f) {
                    f = false;
                    d.preventDefault()
                }
            }).bind("focus.autocomplete",
            function() {
                if (!e.options.disabled) {
                    e.selectedItem = null;
                    e.previous = e.element.val()
                }
            }).bind("blur.autocomplete",
            function(d) {
                if (!e.options.disabled) {
                    clearTimeout(e.searching);
                    e.closing = setTimeout(function() {
                        e.close(d);
                        e._change(d)
                    },
                    150)
                }
            });
            this._initSource();
            this.response = function() {
                return e._response.apply(e, arguments)
            };
            this.menu = b("<ul></ul>").addClass("ui-autocomplete").appendTo(b(this.options.appendTo || "body", g)[0]).mousedown(function(d) {
                var h = e.menu.element[0];
                b(d.target).closest(".ui-menu-item").length || setTimeout(function() {
                    b(document).one("mousedown",
                    function(j) {
                        j.target !== e.element[0] && j.target !== h && !b.ui.contains(h, j.target) && e.close()
                    })
                },
                1);
                setTimeout(function() {
                    clearTimeout(e.closing)
                },
                13)
            }).menu({
                focus: function(d, h) {
                    h = h.item.data("item.autocomplete");
                    false !== e._trigger("focus", d, {
                        item: h
                    }) && /^key/.test(d.originalEvent.type) && e.element.val(h.value)
                },
                selected: function(d, h) {
                    var j = h.item.data("item.autocomplete"),
                    k = e.previous;
                    if (e.element[0] !== g.activeElement) {
                        e.element.focus();
                        e.previous = k;
                        setTimeout(function() {
                            e.previous = k;
                            e.selectedItem = j
                        },
                        1)
                    }
                    false !== e._trigger("select", d, {
                        item: j
                    }) && e.element.val(j.value);
                    e.term = e.element.val();
                    e.close(d);
                    e.selectedItem = j
                },
                blur: function() {
                    e.menu.element.is(":visible") && e.element.val() !== e.term && e.element.val(e.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu");
            b.fn.bgiframe && this.menu.element.bgiframe()
        },
        destroy: function() {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            b.Widget.prototype.destroy.call(this)
        },
        _setOption: function(e, g) {
            b.Widget.prototype._setOption.apply(this, arguments);
            e === "source" && this._initSource();
            if (e === "appendTo") this.menu.element.appendTo(b(g || "body", this.element[0].ownerDocument)[0]);
            e === "disabled" && g && this.xhr && this.xhr.abort()
        },
        _initSource: function() {
            var e = this,
            g, f;
            if (b.isArray(this.options.source)) {
                g = this.options.source;
                this.source = function(d, h) {
                    h(b.ui.autocomplete.filter(g, d.term))
                }
            } else if (typeof this.options.source === "string") {
                f = this.options.source;
                this.source = function(d, h) {
                    e.xhr && e.xhr.abort();
                    e.xhr = b.ajax({
                        url: f,
                        data: d,
                        dataType: "json",
                        autocompleteRequest: ++c,
                        success: function(j) {
                            this.autocompleteRequest === c && h(j)
                        },
                        error: function() {
                            this.autocompleteRequest === c && h([])
                        }
                    })
                }
            } else this.source = this.options.source
        },
        search: function(e, g) {
            e = e != null ? e: this.element.val();
            this.term = this.element.val();
            if (e.length < this.options.minLength) return this.close(g);
            clearTimeout(this.closing);
            if (this._trigger("search", g) !== false) return this._search(e)
        },
        _search: function(e) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({
                term: e
            },
            this.response)
        },
        _response: function(e) {
            if (!this.options.disabled && e && e.length) {
                e = this._normalize(e);
                this._suggest(e);
                this._trigger("open")
            } else this.close();
            this.pending--;
            this.pending || this.element.removeClass("ui-autocomplete-loading")
        },
        close: function(e) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", e)
            }
        },
        _change: function(e) {
            this.previous !== this.element.val() && this._trigger("change", e, {
                item: this.selectedItem
            })
        },
        _normalize: function(e) {
            if (e.length && e[0].label && e[0].value) return e;
            return b.map(e,
            function(g) {
                if (typeof g === "string") return {
                    label: g,
                    value: g
                };
                return b.extend({
                    label: g.label || g.value,
                    value: g.value || g.label
                },
                g)
            })
        },
        _suggest: function(e) {
            var g = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(g, e);
            this.menu.deactivate();
            this.menu.refresh();
            g.show();
            this._resizeMenu();
            g.position(b.extend({
                of: this.element
            },
            this.options.position));
            this.options.autoFocus && this.menu.next(new b.Event("mouseover"))
        },
        _resizeMenu: function() {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth(), this.element.outerWidth()))
        },
        _renderMenu: function(e, g) {
            var f = this;
            b.each(g,
            function(d, h) {
                f._renderItem(e, h)
            })
        },
        _renderItem: function(e, g) {
            return b("<li></li>").data("item.autocomplete", g).append(b("<a></a>").text(g.label)).appendTo(e)
        },
        _move: function(e, g) {
            if (this.menu.element.is(":visible")) if (this.menu.first() && /^previous/.test(e) || this.menu.last() && /^next/.test(e)) {
                this.element.val(this.term);
                this.menu.deactivate()
            } else this.menu[e](g);
            else this.search(null, g)
        },
        widget: function() {
            return this.menu.element
        }
    });
    b.extend(b.ui.autocomplete, {
        escapeRegex: function(e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        },
        filter: function(e, g) {
            var f = new RegExp(b.ui.autocomplete.escapeRegex(g), "i");
            return b.grep(e,
            function(d) {
                return f.test(d.label || d.value || d)
            })
        }
    })
})(jQuery);
(function(b) {
    b.widget("ui.menu", {
        _create: function() {
            var c = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function(e) {
                if (b(e.target).closest(".ui-menu-item a").length) {
                    e.preventDefault();
                    c.select(e)
                }
            });
            this.refresh()
        },
        refresh: function() {
            var c = this;
            this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function(e) {
                c.activate(e, b(this).parent())
            }).mouseleave(function() {
                c.deactivate()
            })
        },
        activate: function(c, e) {
            this.deactivate();
            if (this.hasScroll()) {
                var g = e.offset().top - this.element.offset().top,
                f = this.element.attr("scrollTop"),
                d = this.element.height();
                if (g < 0) this.element.attr("scrollTop", f + g);
                else g >= d && this.element.attr("scrollTop", f + g - d + e.height())
            }
            this.active = e.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", c, {
                item: e
            })
        },
        deactivate: function() {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur");
                this.active = null
            }
        },
        next: function(c) {
            this.move("next", ".ui-menu-item:first", c)
        },
        previous: function(c) {
            this.move("prev", ".ui-menu-item:last", c)
        },
        first: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        last: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        move: function(c, e, g) {
            if (this.active) {
                c = this.active[c + "All"](".ui-menu-item").eq(0);
                c.length ? this.activate(g, c) : this.activate(g, this.element.children(e))
            } else this.activate(g, this.element.children(e))
        },
        nextPage: function(c) {
            if (this.hasScroll()) if (!this.active || this.last()) this.activate(c, this.element.children(".ui-menu-item:first"));
            else {
                var e = this.active.offset().top,
                g = this.element.height(),
                f = this.element.children(".ui-menu-item").filter(function() {
                    var d = b(this).offset().top - e - g + b(this).height();
                    return d < 10 && d > -10
                });
                f.length || (f = this.element.children(".ui-menu-item:last"));
                this.activate(c, f)
            } else this.activate(c, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first": ":last"))
        },
        previousPage: function(c) {
            if (this.hasScroll()) if (!this.active || this.first()) this.activate(c, this.element.children(".ui-menu-item:last"));
            else {
                var e = this.active.offset().top,
                g = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function() {
                    var f = b(this).offset().top - e + g - b(this).height();
                    return f < 10 && f > -10
                });
                result.length || (result = this.element.children(".ui-menu-item:first"));
                this.activate(c, result)
            } else this.activate(c, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last": ":first"))
        },
        hasScroll: function() {
            return this.element.height() < this.element.attr("scrollHeight")
        },
        select: function(c) {
            this._trigger("selected", c, {
                item: this.active
            })
        }
    })
})(jQuery);
(function(b) {
    var c, e = function(f) {
        b(":ui-button", f.target.form).each(function() {
            var d = b(this).data("button");
            setTimeout(function() {
                d.refresh()
            },
            1)
        })
    },
    g = function(f) {
        var d = f.name,
        h = f.form,
        j = b([]);
        if (d) j = h ? b(h).find("[name='" + d + "']") : b("[name='" + d + "']", f.ownerDocument).filter(function() {
            return ! this.form
        });
        return j
    };
    b.widget("ui.button", {
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset.button").bind("reset.button", e);
            if (typeof this.options.disabled !== "boolean") this.options.disabled = this.element.attr("disabled");
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var f = this,
            d = this.options,
            h = this.type === "checkbox" || this.type === "radio",
            j = "ui-state-hover" + (!h ? " ui-state-active": "");
            if (d.label === null) d.label = this.buttonElement.html();
            if (this.element.is(":disabled")) d.disabled = true;
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button",
            function() {
                if (!d.disabled) {
                    b(this).addClass("ui-state-hover");
                    this === c && b(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button",
            function() {
                d.disabled || b(this).removeClass(j)
            }).bind("focus.button",
            function() {
                b(this).addClass("ui-state-focus")
            }).bind("blur.button",
            function() {
                b(this).removeClass("ui-state-focus")
            });
            h && this.element.bind("change.button",
            function() {
                f.refresh()
            });
            if (this.type === "checkbox") this.buttonElement.bind("click.button",
            function() {
                if (d.disabled) return false;
                b(this).toggleClass("ui-state-active");
                f.buttonElement.attr("aria-pressed", f.element[0].checked)
            });
            else if (this.type === "radio") this.buttonElement.bind("click.button",
            function() {
                if (d.disabled) return false;
                b(this).addClass("ui-state-active");
                f.buttonElement.attr("aria-pressed", true);
                var k = f.element[0];
                g(k).not(k).map(function() {
                    return b(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", false)
            });
            else {
                this.buttonElement.bind("mousedown.button",
                function() {
                    if (d.disabled) return false;
                    b(this).addClass("ui-state-active");
                    c = this;
                    b(document).one("mouseup",
                    function() {
                        c = null
                    })
                }).bind("mouseup.button",
                function() {
                    if (d.disabled) return false;
                    b(this).removeClass("ui-state-active")
                }).bind("keydown.button",
                function(k) {
                    if (d.disabled) return false;
                    if (k.keyCode == b.ui.keyCode.SPACE || k.keyCode == b.ui.keyCode.ENTER) b(this).addClass("ui-state-active")
                }).bind("keyup.button",
                function() {
                    b(this).removeClass("ui-state-active")
                });
                this.buttonElement.is("a") && this.buttonElement.keyup(function(k) {
                    k.keyCode === b.ui.keyCode.SPACE && b(this).click()
                })
            }
            this._setOption("disabled", d.disabled)
        },
        _determineButtonType: function() {
            this.type = this.element.is(":checkbox") ? "checkbox": this.element.is(":radio") ? "radio": this.element.is("input") ? "input": "button";
            if (this.type === "checkbox" || this.type === "radio") {
                var f = this.element.parents().filter(":last"),
                d = "label[for=" + this.element.attr("id") + "]";
                this.buttonElement = f.find(d);
                if (!this.buttonElement.length) {
                    f = f.length ? f.siblings() : this.element.siblings();
                    this.buttonElement = f.filter(d);
                    if (!this.buttonElement.length) this.buttonElement = f.find(d)
                }
                this.element.addClass("ui-helper-hidden-accessible");
                (f = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
                this.buttonElement.attr("aria-pressed", f)
            } else this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title");
            b.Widget.prototype.destroy.call(this)
        },
        _setOption: function(f, d) {
            b.Widget.prototype._setOption.apply(this, arguments);
            if (f === "disabled") d ? this.element.attr("disabled", true) : this.element.removeAttr("disabled");
            this._resetButton()
        },
        refresh: function() {
            var f = this.element.is(":disabled");
            f !== this.options.disabled && this._setOption("disabled", f);
            if (this.type === "radio") g(this.element[0]).each(function() {
                b(this).is(":checked") ? b(this).button("widget").addClass("ui-state-active").attr("aria-pressed", true) : b(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
            });
            else if (this.type === "checkbox") this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true) : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
        },
        _resetButton: function() {
            if (this.type === "input") this.options.label && this.element.val(this.options.label);
            else {
                var f = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
                d = b("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(f.empty()).text(),
                h = this.options.icons,
                j = h.primary && h.secondary,
                k = [];
                if (h.primary || h.secondary) {
                    if (this.options.text) k.push("ui-button-text-icon" + (j ? "s": h.primary ? "-primary": "-secondary"));
                    h.primary && f.prepend("<span class='ui-button-icon-primary ui-icon " + h.primary + "'></span>");
                    h.secondary && f.append("<span class='ui-button-icon-secondary ui-icon " + h.secondary + "'></span>");
                    if (!this.options.text) {
                        k.push(j ? "ui-button-icons-only": "ui-button-icon-only");
                        this.hasTitle || f.attr("title", d)
                    }
                } else k.push("ui-button-text-only");
                f.addClass(k.join(" "))
            }
        }
    });
    b.widget("ui.buttonset", {
        options: {
            items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(f, d) {
            f === "disabled" && this.buttons.button("option", f, d);
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function() {
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return b(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
        },
        destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return b(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            b.Widget.prototype.destroy.call(this)
        }
    })
})(jQuery);
(function(b, c) {
    var e = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    },
    g = {
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true
    };
    b.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function(f) {
                    var d = b(this).css(f).offset().top;
                    d < 0 && b(this).css("top", f.top - d)
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1E3
        },
        _create: function() {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") this.originalTitle = "";
            this.options.title = this.options.title || this.originalTitle;
            var f = this,
            d = f.options,
            h = d.title || "&#160;",
            j = b.ui.dialog.getTitleId(f.element),
            k = (f.uiDialog = b("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + d.dialogClass).css({
                zIndex: d.zIndex
            }).attr("tabIndex", -1).css("outline", 0).keydown(function(u) {
                if (d.closeOnEscape && u.keyCode && u.keyCode === b.ui.keyCode.ESCAPE) {
                    f.close(u);
                    u.preventDefault()
                }
            }).attr({
                role: "dialog",
                "aria-labelledby": j
            }).mousedown(function(u) {
                f.moveToTop(false, u)
            });
            f.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k);
            var l = (f.uiDialogTitlebar = b("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),
            r = b('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function() {
                r.addClass("ui-state-hover")
            },
            function() {
                r.removeClass("ui-state-hover")
            }).focus(function() {
                r.addClass("ui-state-focus")
            }).blur(function() {
                r.removeClass("ui-state-focus")
            }).click(function(u) {
                f.close(u);
                return false
            }).appendTo(l);
            (f.uiDialogTitlebarCloseText = b("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(r);
            b("<span></span>").addClass("ui-dialog-title").attr("id", j).html(h).prependTo(l);
            if (b.isFunction(d.beforeclose) && !b.isFunction(d.beforeClose)) d.beforeClose = d.beforeclose;
            l.find("*").add(l).disableSelection();
            d.draggable && b.fn.draggable && f._makeDraggable();
            d.resizable && b.fn.resizable && f._makeResizable();
            f._createButtons(d.buttons);
            f._isOpen = false;
            b.fn.bgiframe && k.bgiframe()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        destroy: function() {
            var f = this;
            f.overlay && f.overlay.destroy();
            f.uiDialog.hide();
            f.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            f.uiDialog.remove();
            f.originalTitle && f.element.attr("title", f.originalTitle);
            return f
        },
        widget: function() {
            return this.uiDialog
        },
        close: function(f) {
            var d = this,
            h, j;
            if (false !== d._trigger("beforeClose", f)) {
                d.overlay && d.overlay.destroy();
                d.uiDialog.unbind("keypress.ui-dialog");
                d._isOpen = false;
                if (d.options.hide) d.uiDialog.hide(d.options.hide,
                function() {
                    d._trigger("close", f)
                });
                else {
                    d.uiDialog.hide();
                    d._trigger("close", f)
                }
                b.ui.dialog.overlay.resize();
                if (d.options.modal) {
                    h = 0;
                    b(".ui-dialog").each(function() {
                        if (this !== d.uiDialog[0]) {
                            j = b(this).css("z-index");
                            isNaN(j) || (h = Math.max(h, j))
                        }
                    });
                    b.ui.dialog.maxZ = h
                }
                return d
            }
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function(f, d) {
            var h = this,
            j = h.options;
            if (j.modal && !f || !j.stack && !j.modal) return h._trigger("focus", d);
            if (j.zIndex > b.ui.dialog.maxZ) b.ui.dialog.maxZ = j.zIndex;
            if (h.overlay) {
                b.ui.dialog.maxZ += 1;
                h.overlay.$el.css("z-index", b.ui.dialog.overlay.maxZ = b.ui.dialog.maxZ)
            }
            f = {
                scrollTop: h.element.attr("scrollTop"),
                scrollLeft: h.element.attr("scrollLeft")
            };
            b.ui.dialog.maxZ += 1;
            h.uiDialog.css("z-index", b.ui.dialog.maxZ);
            h.element.attr(f);
            h._trigger("focus", d);
            return h
        },
        open: function() {
            if (!this._isOpen) {
                var f = this,
                d = f.options,
                h = f.uiDialog;
                f.overlay = d.modal ? new b.ui.dialog.overlay(f) : null;
                f._size();
                f._position(d.position);
                h.show(d.show);
                f.moveToTop(true);
                d.modal && h.bind("keypress.ui-dialog",
                function(j) {
                    if (j.keyCode === b.ui.keyCode.TAB) {
                        var k = b(":tabbable", this),
                        l = k.filter(":first");
                        k = k.filter(":last");
                        if (j.target === k[0] && !j.shiftKey) {
                            l.focus(1);
                            return false
                        } else if (j.target === l[0] && j.shiftKey) {
                            k.focus(1);
                            return false
                        }
                    }
                });
                b(f.element.find(":tabbable").get().concat(h.find(".ui-dialog-buttonpane :tabbable").get().concat(h.get()))).eq(0).focus();
                f._isOpen = true;
                f._trigger("open");
                return f
            }
        },
        _createButtons: function(f) {
            var d = this,
            h = false,
            j = b("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
            k = b("<div></div>").addClass("ui-dialog-buttonset").appendTo(j);
            d.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof f === "object" && f !== null && b.each(f,
            function() {
                return ! (h = true)
            });
            if (h) {
                b.each(f,
                function(l, r) {
                    r = b.isFunction(r) ? {
                        click: r,
                        text: l
                    }: r;
                    l = b('<button type="button"></button>').attr(r, true).unbind("click").click(function() {
                        r.click.apply(d.element[0], arguments)
                    }).appendTo(k);
                    b.fn.button && l.button()
                });
                j.appendTo(d.uiDialog)
            }
        },
        _makeDraggable: function() {
            function f(l) {
                return {
                    position: l.position,
                    offset: l.offset
                }
            }
            var d = this,
            h = d.options,
            j = b(document),
            k;
            d.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(l, r) {
                    k = h.height === "auto" ? "auto": b(this).height();
                    b(this).height(b(this).height()).addClass("ui-dialog-dragging");
                    d._trigger("dragStart", l, f(r))
                },
                drag: function(l, r) {
                    d._trigger("drag", l, f(r))
                },
                stop: function(l, r) {
                    h.position = [r.position.left - j.scrollLeft(), r.position.top - j.scrollTop()];
                    b(this).removeClass("ui-dialog-dragging").height(k);
                    d._trigger("dragStop", l, f(r));
                    b.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function(f) {
            function d(l) {
                return {
                    originalPosition: l.originalPosition,
                    originalSize: l.originalSize,
                    position: l.position,
                    size: l.size
                }
            }
            f = f === c ? this.options.resizable: f;
            var h = this,
            j = h.options,
            k = h.uiDialog.css("position");
            f = typeof f === "string" ? f: "n,e,s,w,se,sw,ne,nw";
            h.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: h.element,
                maxWidth: j.maxWidth,
                maxHeight: j.maxHeight,
                minWidth: j.minWidth,
                minHeight: h._minHeight(),
                handles: f,
                start: function(l, r) {
                    b(this).addClass("ui-dialog-resizing");
                    h._trigger("resizeStart", l, d(r))
                },
                resize: function(l, r) {
                    h._trigger("resize", l, d(r))
                },
                stop: function(l, r) {
                    b(this).removeClass("ui-dialog-resizing");
                    j.height = b(this).height();
                    j.width = b(this).width();
                    h._trigger("resizeStop", l, d(r));
                    b.ui.dialog.overlay.resize()
                }
            }).css("position", k).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function() {
            var f = this.options;
            return f.height === "auto" ? f.minHeight: Math.min(f.minHeight, f.height)
        },
        _position: function(f) {
            var d = [],
            h = [0, 0],
            j;
            if (f) {
                if (typeof f === "string" || typeof f === "object" && "0" in f) {
                    d = f.split ? f.split(" ") : [f[0], f[1]];
                    if (d.length === 1) d[1] = d[0];
                    b.each(["left", "top"],
                    function(k, l) {
                        if ( + d[k] === d[k]) {
                            h[k] = d[k];
                            d[k] = l
                        }
                    });
                    f = {
                        my: d.join(" "),
                        at: d.join(" "),
                        offset: h.join(" ")
                    }
                }
                f = b.extend({},
                b.ui.dialog.prototype.options.position, f)
            } else f = b.ui.dialog.prototype.options.position;
            (j = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position(b.extend({
                of: window
            },
            f));
            j || this.uiDialog.hide()
        },
        _setOptions: function(f) {
            var d = this,
            h = {},
            j = false;
            b.each(f,
            function(k, l) {
                d._setOption(k, l);
                if (k in e) j = true;
                if (k in g) h[k] = l
            });
            j && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", h)
        },
        _setOption: function(f, d) {
            var h = this,
            j = h.uiDialog;
            switch (f) {
            case "beforeclose":
                f = "beforeClose";
                break;
            case "buttons":
                h._createButtons(d);
                break;
            case "closeText":
                h.uiDialogTitlebarCloseText.text("" + d);
                break;
            case "dialogClass":
                j.removeClass(h.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + d);
                break;
            case "disabled":
                d ? j.addClass("ui-dialog-disabled") : j.removeClass("ui-dialog-disabled");
                break;
            case "draggable":
                var k = j.is(":data(draggable)");
                k && !d && j.draggable("destroy"); ! k && d && h._makeDraggable();
                break;
            case "position":
                h._position(d);
                break;
            case "resizable":
                (k = j.is(":data(resizable)")) && !d && j.resizable("destroy");
                k && typeof d === "string" && j.resizable("option", "handles", d); ! k && d !== false && h._makeResizable(d);
                break;
            case "title":
                b(".ui-dialog-title", h.uiDialogTitlebar).html("" + (d || "&#160;"));
                break
            }
            b.Widget.prototype._setOption.apply(h, arguments)
        },
        _size: function() {
            var f = this.options,
            d, h, j = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            });
            if (f.minWidth > f.width) f.width = f.minWidth;
            d = this.uiDialog.css({
                height: "auto",
                width: f.width
            }).height();
            h = Math.max(0, f.minHeight - d);
            if (f.height === "auto") if (b.support.minHeight) this.element.css({
                minHeight: h,
                height: "auto"
            });
            else {
                this.uiDialog.show();
                f = this.element.css("height", "auto").height();
                j || this.uiDialog.hide();
                this.element.height(Math.max(f, h))
            } else this.element.height(Math.max(f.height - d, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    });
    b.extend(b.ui.dialog, {
        version: "1.8.11",
        uuid: 0,
        maxZ: 0,
        getTitleId: function(f) {
            f = f.attr("id");
            if (!f) {
                this.uuid += 1;
                f = this.uuid
            }
            return "ui-dialog-title-" + f
        },
        overlay: function(f) {
            this.$el = b.ui.dialog.overlay.create(f)
        }
    });
    b.extend(b.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),
        function(f) {
            return f + ".dialog-overlay"
        }).join(" "),
        create: function(f) {
            if (this.instances.length === 0) {
                setTimeout(function() {
                    b.ui.dialog.overlay.instances.length && b(document).bind(b.ui.dialog.overlay.events,
                    function(h) {
                        if (b(h.target).zIndex() < b.ui.dialog.overlay.maxZ) return false
                    })
                },
                1);
                b(document).bind("keydown.dialog-overlay",
                function(h) {
                    if (f.options.closeOnEscape && h.keyCode && h.keyCode === b.ui.keyCode.ESCAPE) {
                        f.close(h);
                        h.preventDefault()
                    }
                });
                b(window).bind("resize.dialog-overlay", b.ui.dialog.overlay.resize)
            }
            var d = (this.oldInstances.pop() || b("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            b.fn.bgiframe && d.bgiframe();
            this.instances.push(d);
            return d
        },
        destroy: function(f) {
            var d = b.inArray(f, this.instances);
            d != -1 && this.oldInstances.push(this.instances.splice(d, 1)[0]);
            this.instances.length === 0 && b([document, window]).unbind(".dialog-overlay");
            f.remove();
            var h = 0;
            b.each(this.instances,
            function() {
                h = Math.max(h, this.css("z-index"))
            });
            this.maxZ = h
        },
        height: function() {
            var f, d;
            if (b.browser.msie && b.browser.version < 7) {
                f = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                d = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return f < d ? b(window).height() + "px": f + "px"
            } else return b(document).height() + "px"
        },
        width: function() {
            var f, d;
            if (b.browser.msie && b.browser.version < 7) {
                f = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                d = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return f < d ? b(window).width() + "px": f + "px"
            } else return b(document).width() + "px"
        },
        resize: function() {
            var f = b([]);
            b.each(b.ui.dialog.overlay.instances,
            function() {
                f = f.add(this)
            });
            f.css({
                width: 0,
                height: 0
            }).css({
                width: b.ui.dialog.overlay.width(),
                height: b.ui.dialog.overlay.height()
            })
        }
    });
    b.extend(b.ui.dialog.overlay.prototype, {
        destroy: function() {
            b.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
(function(b) {
    b.widget("ui.slider", b.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function() {
            var c = this,
            e = this.options;
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            e.disabled && this.element.addClass("ui-slider-disabled ui-disabled");
            this.range = b([]);
            if (e.range) {
                if (e.range === true) {
                    this.range = b("<div></div>");
                    if (!e.values) e.values = [this._valueMin(), this._valueMin()];
                    if (e.values.length && e.values.length !== 2) e.values = [e.values[0], e.values[0]]
                } else this.range = b("<div></div>");
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (e.range === "min" || e.range === "max") this.range.addClass("ui-slider-range-" + e.range);
                this.range.addClass("ui-widget-header")
            }
            b(".ui-slider-handle", this.element).length === 0 && b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            if (e.values && e.values.length) for (; b(".ui-slider-handle", this.element).length < e.values.length;) b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            this.handles = b(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function(g) {
                g.preventDefault()
            }).hover(function() {
                e.disabled || b(this).addClass("ui-state-hover")
            },
            function() {
                b(this).removeClass("ui-state-hover")
            }).focus(function() {
                if (e.disabled) b(this).blur();
                else {
                    b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    b(this).addClass("ui-state-focus")
                }
            }).blur(function() {
                b(this).removeClass("ui-state-focus")
            });
            this.handles.each(function(g) {
                b(this).data("index.ui-slider-handle", g)
            });
            this.handles.keydown(function(g) {
                var f = true,
                d = b(this).data("index.ui-slider-handle"),
                h,
                j,
                k;
                if (!c.options.disabled) {
                    switch (g.keyCode) {
                    case b.ui.keyCode.HOME:
                    case b.ui.keyCode.END:
                    case b.ui.keyCode.PAGE_UP:
                    case b.ui.keyCode.PAGE_DOWN:
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        f = false;
                        if (!c._keySliding) {
                            c._keySliding = true;
                            b(this).addClass("ui-state-active");
                            h = c._start(g, d);
                            if (h === false) return
                        }
                        break
                    }
                    k = c.options.step;
                    h = c.options.values && c.options.values.length ? (j = c.values(d)) : (j = c.value());
                    switch (g.keyCode) {
                    case b.ui.keyCode.HOME:
                        j = c._valueMin();
                        break;
                    case b.ui.keyCode.END:
                        j = c._valueMax();
                        break;
                    case b.ui.keyCode.PAGE_UP:
                        j = c._trimAlignValue(h + (c._valueMax() - c._valueMin()) / 5);
                        break;
                    case b.ui.keyCode.PAGE_DOWN:
                        j = c._trimAlignValue(h - (c._valueMax() - c._valueMin()) / 5);
                        break;
                    case b.ui.keyCode.UP:
                    case b.ui.keyCode.RIGHT:
                        if (h === c._valueMax()) return;
                        j = c._trimAlignValue(h + k);
                        break;
                    case b.ui.keyCode.DOWN:
                    case b.ui.keyCode.LEFT:
                        if (h === c._valueMin()) return;
                        j = c._trimAlignValue(h - k);
                        break
                    }
                    c._slide(g, d, j);
                    return f
                }
            }).keyup(function(g) {
                var f = b(this).data("index.ui-slider-handle");
                if (c._keySliding) {
                    c._keySliding = false;
                    c._stop(g, f);
                    c._change(g, f);
                    b(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function(c) {
            var e = this.options,
            g, f, d, h, j;
            if (e.disabled) return false;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            g = this._normValueFromMouse({
                x: c.pageX,
                y: c.pageY
            });
            f = this._valueMax() - this._valueMin() + 1;
            h = this;
            this.handles.each(function(k) {
                var l = Math.abs(g - h.values(k));
                if (f > l) {
                    f = l;
                    d = b(this);
                    j = k
                }
            });
            if (e.range === true && this.values(1) === e.min) {
                j += 1;
                d = b(this.handles[j])
            }
            if (this._start(c, j) === false) return false;
            this._mouseSliding = true;
            h._handleIndex = j;
            d.addClass("ui-state-active").focus();
            e = d.offset();
            this._clickOffset = !b(c.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            }: {
                left: c.pageX - e.left - d.width() / 2,
                top: c.pageY - e.top - d.height() / 2 - (parseInt(d.css("borderTopWidth"), 10) || 0) - (parseInt(d.css("borderBottomWidth"), 10) || 0) + (parseInt(d.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(c, j, g);
            return this._animateOff = true
        },
        _mouseStart: function() {
            return true
        },
        _mouseDrag: function(c) {
            var e = this._normValueFromMouse({
                x: c.pageX,
                y: c.pageY
            });
            this._slide(c, this._handleIndex, e);
            return false
        },
        _mouseStop: function(c) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(c, this._handleIndex);
            this._change(c, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function() {
            this.orientation = this.options.orientation === "vertical" ? "vertical": "horizontal"
        },
        _normValueFromMouse: function(c) {
            var e;
            if (this.orientation === "horizontal") {
                e = this.elementSize.width;
                c = c.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left: 0)
            } else {
                e = this.elementSize.height;
                c = c.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top: 0)
            }
            e = c / e;
            if (e > 1) e = 1;
            if (e < 0) e = 0;
            if (this.orientation === "vertical") e = 1 - e;
            c = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + e * c)
        },
        _start: function(c, e) {
            var g = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                g.value = this.values(e);
                g.values = this.values()
            }
            return this._trigger("start", c, g)
        },
        _slide: function(c, e, g) {
            var f;
            if (this.options.values && this.options.values.length) {
                f = this.values(e ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (e === 0 && g > f || e === 1 && g < f)) g = f;
                if (g !== this.values(e)) {
                    f = this.values();
                    f[e] = g;
                    c = this._trigger("slide", c, {
                        handle: this.handles[e],
                        value: g,
                        values: f
                    });
                    this.values(e ? 0 : 1);
                    c !== false && this.values(e, g, true)
                }
            } else if (g !== this.value()) {
                c = this._trigger("slide", c, {
                    handle: this.handles[e],
                    value: g
                });
                c !== false && this.value(g)
            }
        },
        _stop: function(c, e) {
            var g = {
                handle: this.handles[e],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                g.value = this.values(e);
                g.values = this.values()
            }
            this._trigger("stop", c, g)
        },
        _change: function(c, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var g = {
                    handle: this.handles[e],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    g.value = this.values(e);
                    g.values = this.values()
                }
                this._trigger("change", c, g)
            }
        },
        value: function(c) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(c);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function(c, e) {
            var g, f, d;
            if (arguments.length > 1) {
                this.options.values[c] = this._trimAlignValue(e);
                this._refreshValue();
                this._change(null, c)
            }
            if (arguments.length) if (b.isArray(arguments[0])) {
                g = this.options.values;
                f = arguments[0];
                for (d = 0; d < g.length; d += 1) {
                    g[d] = this._trimAlignValue(f[d]);
                    this._change(null, d)
                }
                this._refreshValue()
            } else return this.options.values && this.options.values.length ? this._values(c) : this.value();
            else return this._values()
        },
        _setOption: function(c, e) {
            var g, f = 0;
            if (b.isArray(this.options.values)) f = this.options.values.length;
            b.Widget.prototype._setOption.apply(this, arguments);
            switch (c) {
            case "disabled":
                if (e) {
                    this.handles.filter(".ui-state-focus").blur();
                    this.handles.removeClass("ui-state-hover");
                    this.handles.attr("disabled", "disabled");
                    this.element.addClass("ui-disabled")
                } else {
                    this.handles.removeAttr("disabled");
                    this.element.removeClass("ui-disabled")
                }
                break;
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (g = 0; g < f; g += 1) this._change(null, g);
                this._animateOff = false;
                break
            }
        },
        _value: function() {
            return this._trimAlignValue(this.options.value)
        },
        _values: function(c) {
            var e, g;
            if (arguments.length) {
                e = this.options.values[c];
                return this._trimAlignValue(e)
            } else {
                e = this.options.values.slice();
                for (g = 0; g < e.length; g += 1) e[g] = this._trimAlignValue(e[g]);
                return e
            }
        },
        _trimAlignValue: function(c) {
            if (c <= this._valueMin()) return this._valueMin();
            if (c >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step: 1,
            g = (c - this._valueMin()) % e;
            alignValue = c - g;
            if (Math.abs(g) * 2 >= e) alignValue += g > 0 ? e: -e;
            return parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var c = this.options.range,
            e = this.options,
            g = this,
            f = !this._animateOff ? e.animate: false,
            d,
            h = {},
            j,
            k,
            l,
            r;
            if (this.options.values && this.options.values.length) this.handles.each(function(u) {
                d = (g.values(u) - g._valueMin()) / (g._valueMax() - g._valueMin()) * 100;
                h[g.orientation === "horizontal" ? "left": "bottom"] = d + "%";
                b(this).stop(1, 1)[f ? "animate": "css"](h, e.animate);
                if (g.options.range === true) if (g.orientation === "horizontal") {
                    if (u === 0) g.range.stop(1, 1)[f ? "animate": "css"]({
                        left: d + "%"
                    },
                    e.animate);
                    if (u === 1) g.range[f ? "animate": "css"]({
                        width: d - j + "%"
                    },
                    {
                        queue: false,
                        duration: e.animate
                    })
                } else {
                    if (u === 0) g.range.stop(1, 1)[f ? "animate": "css"]({
                        bottom: d + "%"
                    },
                    e.animate);
                    if (u === 1) g.range[f ? "animate": "css"]({
                        height: d - j + "%"
                    },
                    {
                        queue: false,
                        duration: e.animate
                    })
                }
                j = d
            });
            else {
                k = this.value();
                l = this._valueMin();
                r = this._valueMax();
                d = r !== l ? (k - l) / (r - l) * 100 : 0;
                h[g.orientation === "horizontal" ? "left": "bottom"] = d + "%";
                this.handle.stop(1, 1)[f ? "animate": "css"](h, e.animate);
                if (c === "min" && this.orientation === "horizontal") this.range.stop(1, 1)[f ? "animate": "css"]({
                    width: d + "%"
                },
                e.animate);
                if (c === "max" && this.orientation === "horizontal") this.range[f ? "animate": "css"]({
                    width: 100 - d + "%"
                },
                {
                    queue: false,
                    duration: e.animate
                });
                if (c === "min" && this.orientation === "vertical") this.range.stop(1, 1)[f ? "animate": "css"]({
                    height: d + "%"
                },
                e.animate);
                if (c === "max" && this.orientation === "vertical") this.range[f ? "animate": "css"]({
                    height: 100 - d + "%"
                },
                {
                    queue: false,
                    duration: e.animate
                })
            }
        }
    });
    b.extend(b.ui.slider, {
        version: "1.8.11"
    })
})(jQuery);
(function(b, c) {
    function e() {
        return++f
    }
    function g() {
        return++d
    }
    var f = 0,
    d = 0;
    b.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function() {
            this._tabify(true)
        },
        _setOption: function(h, j) {
            if (h == "selected") this.options.collapsible && j == this.options.selected || this.select(j);
            else {
                this.options[h] = j;
                this._tabify()
            }
        },
        _tabId: function(h) {
            return h.title && h.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + e()
        },
        _sanitizeSelector: function(h) {
            return h.replace(/:/g, "\\:")
        },
        _cookie: function() {
            var h = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + g());
            return b.cookie.apply(null, [h].concat(b.makeArray(arguments)))
        },
        _ui: function(h, j) {
            return {
                tab: h,
                panel: j,
                index: this.anchors.index(h)
            }
        },
        _cleanup: function() {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
                var h = b(this);
                h.html(h.data("label.tabs")).removeData("label.tabs")
            })
        },
        _tabify: function(h) {
            function j(D, I) {
                D.css("display", ""); ! b.support.opacity && I.opacity && D[0].style.removeAttribute("filter")
            }
            var k = this,
            l = this.options,
            r = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = b(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function() {
                return b("a", this)[0]
            });
            this.panels = b([]);
            this.anchors.each(function(D, I) {
                var p = b(I).attr("href"),
                n = p.split("#")[0],
                z;
                if (n && (n === location.toString().split("#")[0] || (z = b("base")[0]) && n === z.href)) {
                    p = I.hash;
                    I.href = p
                }
                if (r.test(p)) k.panels = k.panels.add(k.element.find(k._sanitizeSelector(p)));
                else if (p && p !== "#") {
                    b.data(I, "href.tabs", p);
                    b.data(I, "load.tabs", p.replace(/#.*$/, ""));
                    p = k._tabId(I);
                    I.href = "#" + p;
                    I = k.element.find("#" + p);
                    if (!I.length) {
                        I = b(l.panelTemplate).attr("id", p).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(k.panels[D - 1] || k.list);
                        I.data("destroy.tabs", true)
                    }
                    k.panels = k.panels.add(I)
                } else l.disabled.push(D)
            });
            if (h) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (l.selected === c) {
                    location.hash && this.anchors.each(function(D, I) {
                        if (I.hash == location.hash) {
                            l.selected = D;
                            return false
                        }
                    });
                    if (typeof l.selected !== "number" && l.cookie) l.selected = parseInt(k._cookie(), 10);
                    if (typeof l.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) l.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    l.selected = l.selected || (this.lis.length ? 0 : -1)
                } else if (l.selected === null) l.selected = -1;
                l.selected = l.selected >= 0 && this.anchors[l.selected] || l.selected < 0 ? l.selected: 0;
                l.disabled = b.unique(l.disabled.concat(b.map(this.lis.filter(".ui-state-disabled"),
                function(D) {
                    return k.lis.index(D)
                }))).sort();
                b.inArray(l.selected, l.disabled) != -1 && l.disabled.splice(b.inArray(l.selected, l.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (l.selected >= 0 && this.anchors.length) {
                    k.element.find(k._sanitizeSelector(k.anchors[l.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(l.selected).addClass("ui-tabs-selected ui-state-active");
                    k.element.queue("tabs",
                    function() {
                        k._trigger("show", null, k._ui(k.anchors[l.selected], k.element.find(k._sanitizeSelector(k.anchors[l.selected].hash))[0]))
                    });
                    this.load(l.selected)
                }
                b(window).bind("unload",
                function() {
                    k.lis.add(k.anchors).unbind(".tabs");
                    k.lis = k.anchors = k.panels = null
                })
            } else l.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            this.element[l.collapsible ? "addClass": "removeClass"]("ui-tabs-collapsible");
            l.cookie && this._cookie(l.selected, l.cookie);
            h = 0;
            for (var u; u = this.lis[h]; h++) b(u)[b.inArray(h, l.disabled) != -1 && !b(u).hasClass("ui-tabs-selected") ? "addClass": "removeClass"]("ui-state-disabled");
            l.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (l.event !== "mouseover") {
                var o = function(D, I) {
                    I.is(":not(.ui-state-disabled)") && I.addClass("ui-state-" + D)
                },
                m = function(D, I) {
                    I.removeClass("ui-state-" + D)
                };
                this.lis.bind("mouseover.tabs",
                function() {
                    o("hover", b(this))
                });
                this.lis.bind("mouseout.tabs",
                function() {
                    m("hover", b(this))
                });
                this.anchors.bind("focus.tabs",
                function() {
                    o("focus", b(this).closest("li"))
                });
                this.anchors.bind("blur.tabs",
                function() {
                    m("focus", b(this).closest("li"))
                })
            }
            var q, v;
            if (l.fx) if (b.isArray(l.fx)) {
                q = l.fx[0];
                v = l.fx[1]
            } else q = v = l.fx;
            var w = v ?
            function(D, I) {
                b(D).closest("li").addClass("ui-tabs-selected ui-state-active");
                I.hide().removeClass("ui-tabs-hide").animate(v, v.duration || "normal",
                function() {
                    j(I, v);
                    k._trigger("show", null, k._ui(D, I[0]))
                })
            }: function(D, I) {
                b(D).closest("li").addClass("ui-tabs-selected ui-state-active");
                I.removeClass("ui-tabs-hide");
                k._trigger("show", null, k._ui(D, I[0]))
            },
            B = q ?
            function(D, I) {
                I.animate(q, q.duration || "normal",
                function() {
                    k.lis.removeClass("ui-tabs-selected ui-state-active");
                    I.addClass("ui-tabs-hide");
                    j(I, q);
                    k.element.dequeue("tabs")
                })
            }: function(D, I) {
                k.lis.removeClass("ui-tabs-selected ui-state-active");
                I.addClass("ui-tabs-hide");
                k.element.dequeue("tabs")
            };
            this.anchors.bind(l.event + ".tabs",
            function() {
                var D = this,
                I = b(D).closest("li"),
                p = k.panels.filter(":not(.ui-tabs-hide)"),
                n = k.element.find(k._sanitizeSelector(D.hash));
                if (I.hasClass("ui-tabs-selected") && !l.collapsible || I.hasClass("ui-state-disabled") || I.hasClass("ui-state-processing") || k.panels.filter(":animated").length || k._trigger("select", null, k._ui(this, n[0])) === false) {
                    this.blur();
                    return false
                }
                l.selected = k.anchors.index(this);
                k.abort();
                if (l.collapsible) if (I.hasClass("ui-tabs-selected")) {
                    l.selected = -1;
                    l.cookie && k._cookie(l.selected, l.cookie);
                    k.element.queue("tabs",
                    function() {
                        B(D, p)
                    }).dequeue("tabs");
                    this.blur();
                    return false
                } else if (!p.length) {
                    l.cookie && k._cookie(l.selected, l.cookie);
                    k.element.queue("tabs",
                    function() {
                        w(D, n)
                    });
                    k.load(k.anchors.index(this));
                    this.blur();
                    return false
                }
                l.cookie && k._cookie(l.selected, l.cookie);
                if (n.length) {
                    p.length && k.element.queue("tabs",
                    function() {
                        B(D, p)
                    });
                    k.element.queue("tabs",
                    function() {
                        w(D, n)
                    });
                    k.load(k.anchors.index(this))
                } else throw "jQuery UI Tabs: Mismatching fragment identifier.";
                b.browser.msie && this.blur()
            });
            this.anchors.bind("click.tabs",
            function() {
                return false
            })
        },
        _getIndex: function(h) {
            if (typeof h == "string") h = this.anchors.index(this.anchors.filter("[href$=" + h + "]"));
            return h
        },
        destroy: function() {
            var h = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function() {
                var j = b.data(this, "href.tabs");
                if (j) this.href = j;
                var k = b(this).unbind(".tabs");
                b.each(["href", "load", "cache"],
                function(l, r) {
                    k.removeData(r + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function() {
                b.data(this, "destroy.tabs") ? b(this).remove() : b(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
            });
            h.cookie && this._cookie(null, h.cookie);
            return this
        },
        add: function(h, j, k) {
            if (k === c) k = this.anchors.length;
            var l = this,
            r = this.options;
            j = b(r.tabTemplate.replace(/#\{href\}/g, h).replace(/#\{label\}/g, j));
            h = !h.indexOf("#") ? h.replace("#", "") : this._tabId(b("a", j)[0]);
            j.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var u = l.element.find("#" + h);
            u.length || (u = b(r.panelTemplate).attr("id", h).data("destroy.tabs", true));
            u.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (k >= this.lis.length) {
                j.appendTo(this.list);
                u.appendTo(this.list[0].parentNode)
            } else {
                j.insertBefore(this.lis[k]);
                u.insertBefore(this.panels[k])
            }
            r.disabled = b.map(r.disabled,
            function(o) {
                return o >= k ? ++o: o
            });
            this._tabify();
            if (this.anchors.length == 1) {
                r.selected = 0;
                j.addClass("ui-tabs-selected ui-state-active");
                u.removeClass("ui-tabs-hide");
                this.element.queue("tabs",
                function() {
                    l._trigger("show", null, l._ui(l.anchors[0], l.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[k], this.panels[k]));
            return this
        },
        remove: function(h) {
            h = this._getIndex(h);
            var j = this.options,
            k = this.lis.eq(h).remove(),
            l = this.panels.eq(h).remove();
            if (k.hasClass("ui-tabs-selected") && this.anchors.length > 1) this.select(h + (h + 1 < this.anchors.length ? 1 : -1));
            j.disabled = b.map(b.grep(j.disabled,
            function(r) {
                return r != h
            }),
            function(r) {
                return r >= h ? --r: r
            });
            this._tabify();
            this._trigger("remove", null, this._ui(k.find("a")[0], l[0]));
            return this
        },
        enable: function(h) {
            h = this._getIndex(h);
            var j = this.options;
            if (b.inArray(h, j.disabled) != -1) {
                this.lis.eq(h).removeClass("ui-state-disabled");
                j.disabled = b.grep(j.disabled,
                function(k) {
                    return k != h
                });
                this._trigger("enable", null, this._ui(this.anchors[h], this.panels[h]));
                return this
            }
        },
        disable: function(h) {
            h = this._getIndex(h);
            var j = this.options;
            if (h != j.selected) {
                this.lis.eq(h).addClass("ui-state-disabled");
                j.disabled.push(h);
                j.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[h], this.panels[h]))
            }
            return this
        },
        select: function(h) {
            h = this._getIndex(h);
            if (h == -1) if (this.options.collapsible && this.options.selected != -1) h = this.options.selected;
            else return this;
            this.anchors.eq(h).trigger(this.options.event + ".tabs");
            return this
        },
        load: function(h) {
            h = this._getIndex(h);
            var j = this,
            k = this.options,
            l = this.anchors.eq(h)[0],
            r = b.data(l, "load.tabs");
            this.abort();
            if (!r || this.element.queue("tabs").length !== 0 && b.data(l, "cache.tabs")) this.element.dequeue("tabs");
            else {
                this.lis.eq(h).addClass("ui-state-processing");
                if (k.spinner) {
                    var u = b("span", l);
                    u.data("label.tabs", u.html()).html(k.spinner)
                }
                this.xhr = b.ajax(b.extend({},
                k.ajaxOptions, {
                    url: r,
                    success: function(o, m) {
                        j.element.find(j._sanitizeSelector(l.hash)).html(o);
                        j._cleanup();
                        k.cache && b.data(l, "cache.tabs", true);
                        j._trigger("load", null, j._ui(j.anchors[h], j.panels[h]));
                        try {
                            k.ajaxOptions.success(o, m)
                        } catch(q) {}
                    },
                    error: function(o, m) {
                        j._cleanup();
                        j._trigger("load", null, j._ui(j.anchors[h], j.panels[h]));
                        try {
                            k.ajaxOptions.error(o, m, h, l)
                        } catch(q) {}
                    }
                }));
                j.element.dequeue("tabs");
                return this
            }
        },
        abort: function() {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice( - 2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        },
        url: function(h, j) {
            this.anchors.eq(h).removeData("cache.tabs").data("load.tabs", j);
            return this
        },
        length: function() {
            return this.anchors.length
        }
    });
    b.extend(b.ui.tabs, {
        version: "1.8.11"
    });
    b.extend(b.ui.tabs.prototype, {
        rotation: null,
        rotate: function(h, j) {
            var k = this,
            l = this.options,
            r = k._rotate || (k._rotate = function(u) {
                clearTimeout(k.rotation);
                k.rotation = setTimeout(function() {
                    var o = l.selected;
                    k.select(++o < k.anchors.length ? o: 0)
                },
                h);
                u && u.stopPropagation()
            });
            j = k._unrotate || (k._unrotate = !j ?
            function(u) {
                u.clientX && k.rotate(null)
            }: function() {
                t = l.selected;
                r()
            });
            if (h) {
                this.element.bind("tabsshow", r);
                this.anchors.bind(l.event + ".tabs", j);
                r()
            } else {
                clearTimeout(k.rotation);
                this.element.unbind("tabsshow", r);
                this.anchors.unbind(l.event + ".tabs", j);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);
(function(b, c) {
    function e() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false
        };
        b.extend(this._defaults, this.regional[""]);
        this.dpDiv = b('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
    }
    function g(d, h) {
        b.extend(d, h);
        for (var j in h) if (h[j] == null || h[j] == c) d[j] = h[j];
        return d
    }
    b.extend(b.ui, {
        datepicker: {
            version: "1.8.11"
        }
    });
    var f = (new Date).getTime();
    b.extend(e.prototype, {
        markerClassName: "hasDatepicker",
        log: function() {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(d) {
            g(this._defaults, d || {});
            return this
        },
        _attachDatepicker: function(d, h) {
            var j = null;
            for (var k in this._defaults) {
                var l = d.getAttribute("date:" + k);
                if (l) {
                    j = j || {};
                    try {
                        j[k] = eval(l)
                    } catch(r) {
                        j[k] = l
                    }
                }
            }
            k = d.nodeName.toLowerCase();
            l = k == "div" || k == "span";
            if (!d.id) {
                this.uuid += 1;
                d.id = "dp" + this.uuid
            }
            var u = this._newInst(b(d), l);
            u.settings = b.extend({},
            h || {},
            j || {});
            if (k == "input") this._connectDatepicker(d, u);
            else l && this._inlineDatepicker(d, u)
        },
        _newInst: function(d, h) {
            return {
                id: d[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: d,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: h,
                dpDiv: !h ? this.dpDiv: b('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
            }
        },
        _connectDatepicker: function(d, h) {
            var j = b(d);
            h.append = b([]);
            h.trigger = b([]);
            if (!j.hasClass(this.markerClassName)) {
                this._attachments(j, h);
                j.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",
                function(k, l, r) {
                    h.settings[l] = r
                }).bind("getData.datepicker",
                function(k, l) {
                    return this._get(h, l)
                });
                this._autoSize(h);
                b.data(d, "datepicker", h)
            }
        },
        _attachments: function(d, h) {
            var j = this._get(h, "appendText"),
            k = this._get(h, "isRTL");
            h.append && h.append.remove();
            if (j) {
                h.append = b('<span class="' + this._appendClass + '">' + j + "</span>");
                d[k ? "before": "after"](h.append)
            }
            d.unbind("focus", this._showDatepicker);
            h.trigger && h.trigger.remove();
            j = this._get(h, "showOn");
            if (j == "focus" || j == "both") d.focus(this._showDatepicker);
            if (j == "button" || j == "both") {
                j = this._get(h, "buttonText");
                var l = this._get(h, "buttonImage");
                h.trigger = b(this._get(h, "buttonImageOnly") ? b("<img/>").addClass(this._triggerClass).attr({
                    src: l,
                    alt: j,
                    title: j
                }) : b('<button type="button"></button>').addClass(this._triggerClass).html(l == "" ? j: b("<img/>").attr({
                    src: l,
                    alt: j,
                    title: j
                })));
                d[k ? "before": "after"](h.trigger);
                h.trigger.click(function() {
                    b.datepicker._datepickerShowing && b.datepicker._lastInput == d[0] ? b.datepicker._hideDatepicker() : b.datepicker._showDatepicker(d[0]);
                    return false
                })
            }
        },
        _autoSize: function(d) {
            if (this._get(d, "autoSize") && !d.inline) {
                var h = new Date(2009, 11, 20),
                j = this._get(d, "dateFormat");
                if (j.match(/[DM]/)) {
                    var k = function(l) {
                        for (var r = 0, u = 0, o = 0; o < l.length; o++) if (l[o].length > r) {
                            r = l[o].length;
                            u = o
                        }
                        return u
                    };
                    h.setMonth(k(this._get(d, j.match(/MM/) ? "monthNames": "monthNamesShort")));
                    h.setDate(k(this._get(d, j.match(/DD/) ? "dayNames": "dayNamesShort")) + 20 - h.getDay())
                }
                d.input.attr("size", this._formatDate(d, h).length)
            }
        },
        _inlineDatepicker: function(d, h) {
            var j = b(d);
            if (!j.hasClass(this.markerClassName)) {
                j.addClass(this.markerClassName).append(h.dpDiv).bind("setData.datepicker",
                function(k, l, r) {
                    h.settings[l] = r
                }).bind("getData.datepicker",
                function(k, l) {
                    return this._get(h, l)
                });
                b.data(d, "datepicker", h);
                this._setDate(h, this._getDefaultDate(h), true);
                this._updateDatepicker(h);
                this._updateAlternate(h);
                h.dpDiv.show()
            }
        },
        _dialogDatepicker: function(d, h, j, k, l) {
            d = this._dialogInst;
            if (!d) {
                this.uuid += 1;
                this._dialogInput = b('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                b("body").append(this._dialogInput);
                d = this._dialogInst = this._newInst(this._dialogInput, false);
                d.settings = {};
                b.data(this._dialogInput[0], "datepicker", d)
            }
            g(d.settings, k || {});
            h = h && h.constructor == Date ? this._formatDate(d, h) : h;
            this._dialogInput.val(h);
            this._pos = l ? l.length ? l: [l.pageX, l.pageY] : null;
            if (!this._pos) this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)];
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            d.settings.onSelect = j;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            b.blockUI && b.blockUI(this.dpDiv);
            b.data(this._dialogInput[0], "datepicker", d);
            return this
        },
        _destroyDatepicker: function(d) {
            var h = b(d),
            j = b.data(d, "datepicker");
            if (h.hasClass(this.markerClassName)) {
                var k = d.nodeName.toLowerCase();
                b.removeData(d, "datepicker");
                if (k == "input") {
                    j.append.remove();
                    j.trigger.remove();
                    h.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
                } else if (k == "div" || k == "span") h.removeClass(this.markerClassName).empty()
            }
        },
        _enableDatepicker: function(d) {
            var h = b(d),
            j = b.data(d, "datepicker");
            if (h.hasClass(this.markerClassName)) {
                var k = d.nodeName.toLowerCase();
                if (k == "input") {
                    d.disabled = false;
                    j.trigger.filter("button").each(function() {
                        this.disabled = false
                    }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    })
                } else if (k == "div" || k == "span") h.children("." + this._inlineClass).children().removeClass("ui-state-disabled");
                this._disabledInputs = b.map(this._disabledInputs,
                function(l) {
                    return l == d ? null: l
                })
            }
        },
        _disableDatepicker: function(d) {
            var h = b(d),
            j = b.data(d, "datepicker");
            if (h.hasClass(this.markerClassName)) {
                var k = d.nodeName.toLowerCase();
                if (k == "input") {
                    d.disabled = true;
                    j.trigger.filter("button").each(function() {
                        this.disabled = true
                    }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    })
                } else if (k == "div" || k == "span") h.children("." + this._inlineClass).children().addClass("ui-state-disabled");
                this._disabledInputs = b.map(this._disabledInputs,
                function(l) {
                    return l == d ? null: l
                });
                this._disabledInputs[this._disabledInputs.length] = d
            }
        },
        _isDisabledDatepicker: function(d) {
            if (!d) return false;
            for (var h = 0; h < this._disabledInputs.length; h++) if (this._disabledInputs[h] == d) return true;
            return false
        },
        _getInst: function(d) {
            try {
                return b.data(d, "datepicker")
            } catch(h) {
                throw "Missing instance data for this datepicker";
            }
        },
        _optionDatepicker: function(d, h, j) {
            var k = this._getInst(d);
            if (arguments.length == 2 && typeof h == "string") return h == "defaults" ? b.extend({},
            b.datepicker._defaults) : k ? h == "all" ? b.extend({},
            k.settings) : this._get(k, h) : null;
            var l = h || {};
            if (typeof h == "string") {
                l = {};
                l[h] = j
            }
            if (k) {
                this._curInst == k && this._hideDatepicker();
                var r = this._getDateDatepicker(d, true),
                u = this._getMinMaxDate(k, "min"),
                o = this._getMinMaxDate(k, "max");
                g(k.settings, l);
                if (u !== null && l.dateFormat !== c && l.minDate === c) k.settings.minDate = this._formatDate(k, u);
                if (o !== null && l.dateFormat !== c && l.maxDate === c) k.settings.maxDate = this._formatDate(k, o);
                this._attachments(b(d), k);
                this._autoSize(k);
                this._setDateDatepicker(d, r);
                this._updateDatepicker(k)
            }
        },
        _changeDatepicker: function(d, h, j) {
            this._optionDatepicker(d, h, j)
        },
        _refreshDatepicker: function(d) { (d = this._getInst(d)) && this._updateDatepicker(d)
        },
        _setDateDatepicker: function(d, h) {
            if (d = this._getInst(d)) {
                this._setDate(d, h);
                this._updateDatepicker(d);
                this._updateAlternate(d)
            }
        },
        _getDateDatepicker: function(d, h) { (d = this._getInst(d)) && !d.inline && this._setDateFromField(d, h);
            return d ? this._getDate(d) : null
        },
        _doKeyDown: function(d) {
            var h = b.datepicker._getInst(d.target),
            j = true,
            k = h.dpDiv.is(".ui-datepicker-rtl");
            h._keyEvent = true;
            if (b.datepicker._datepickerShowing) switch (d.keyCode) {
            case 9:
                b.datepicker._hideDatepicker();
                j = false;
                break;
            case 13:
                j = b("td." + b.datepicker._dayOverClass + ":not(." + b.datepicker._currentClass + ")", h.dpDiv);
                j[0] ? b.datepicker._selectDay(d.target, h.selectedMonth, h.selectedYear, j[0]) : b.datepicker._hideDatepicker();
                return false;
            case 27:
                b.datepicker._hideDatepicker();
                break;
            case 33:
                b.datepicker._adjustDate(d.target, d.ctrlKey ? -b.datepicker._get(h, "stepBigMonths") : -b.datepicker._get(h, "stepMonths"), "M");
                break;
            case 34:
                b.datepicker._adjustDate(d.target, d.ctrlKey ? +b.datepicker._get(h, "stepBigMonths") : +b.datepicker._get(h, "stepMonths"), "M");
                break;
            case 35:
                if (d.ctrlKey || d.metaKey) b.datepicker._clearDate(d.target);
                j = d.ctrlKey || d.metaKey;
                break;
            case 36:
                if (d.ctrlKey || d.metaKey) b.datepicker._gotoToday(d.target);
                j = d.ctrlKey || d.metaKey;
                break;
            case 37:
                if (d.ctrlKey || d.metaKey) b.datepicker._adjustDate(d.target, k ? +1 : -1, "D");
                j = d.ctrlKey || d.metaKey;
                if (d.originalEvent.altKey) b.datepicker._adjustDate(d.target, d.ctrlKey ? -b.datepicker._get(h, "stepBigMonths") : -b.datepicker._get(h, "stepMonths"), "M");
                break;
            case 38:
                if (d.ctrlKey || d.metaKey) b.datepicker._adjustDate(d.target, -7, "D");
                j = d.ctrlKey || d.metaKey;
                break;
            case 39:
                if (d.ctrlKey || d.metaKey) b.datepicker._adjustDate(d.target, k ? -1 : +1, "D");
                j = d.ctrlKey || d.metaKey;
                if (d.originalEvent.altKey) b.datepicker._adjustDate(d.target, d.ctrlKey ? +b.datepicker._get(h, "stepBigMonths") : +b.datepicker._get(h, "stepMonths"), "M");
                break;
            case 40:
                if (d.ctrlKey || d.metaKey) b.datepicker._adjustDate(d.target, +7, "D");
                j = d.ctrlKey || d.metaKey;
                break;
            default:
                j = false
            } else if (d.keyCode == 36 && d.ctrlKey) b.datepicker._showDatepicker(this);
            else j = false;
            if (j) {
                d.preventDefault();
                d.stopPropagation()
            }
        },
        _doKeyPress: function(d) {
            var h = b.datepicker._getInst(d.target);
            if (b.datepicker._get(h, "constrainInput")) {
                h = b.datepicker._possibleChars(b.datepicker._get(h, "dateFormat"));
                var j = String.fromCharCode(d.charCode == c ? d.keyCode: d.charCode);
                return d.ctrlKey || d.metaKey || j < " " || !h || h.indexOf(j) > -1
            }
        },
        _doKeyUp: function(d) {
            d = b.datepicker._getInst(d.target);
            if (d.input.val() != d.lastVal) try {
                if (b.datepicker.parseDate(b.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, b.datepicker._getFormatConfig(d))) {
                    b.datepicker._setDateFromField(d);
                    b.datepicker._updateAlternate(d);
                    b.datepicker._updateDatepicker(d)
                }
            } catch(h) {
                b.datepicker.log(h)
            }
            return true
        },
        _showDatepicker: function(d) {
            d = d.target || d;
            if (d.nodeName.toLowerCase() != "input") d = b("input", d.parentNode)[0];
            if (! (b.datepicker._isDisabledDatepicker(d) || b.datepicker._lastInput == d)) {
                var h = b.datepicker._getInst(d);
                b.datepicker._curInst && b.datepicker._curInst != h && b.datepicker._curInst.dpDiv.stop(true, true);
                var j = b.datepicker._get(h, "beforeShow");
                g(h.settings, j ? j.apply(d, [d, h]) : {});
                h.lastVal = null;
                b.datepicker._lastInput = d;
                b.datepicker._setDateFromField(h);
                if (b.datepicker._inDialog) d.value = "";
                if (!b.datepicker._pos) {
                    b.datepicker._pos = b.datepicker._findPos(d);
                    b.datepicker._pos[1] += d.offsetHeight
                }
                var k = false;
                b(d).parents().each(function() {
                    k |= b(this).css("position") == "fixed";
                    return ! k
                });
                if (k && b.browser.opera) {
                    b.datepicker._pos[0] -= document.documentElement.scrollLeft;
                    b.datepicker._pos[1] -= document.documentElement.scrollTop
                }
                j = {
                    left: b.datepicker._pos[0],
                    top: b.datepicker._pos[1]
                };
                b.datepicker._pos = null;
                h.dpDiv.empty();
                h.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                });
                b.datepicker._updateDatepicker(h);
                j = b.datepicker._checkOffset(h, j, k);
                h.dpDiv.css({
                    position: b.datepicker._inDialog && b.blockUI ? "static": k ? "fixed": "absolute",
                    display: "none",
                    left: j.left + "px",
                    top: j.top + "px"
                });
                if (!h.inline) {
                    j = b.datepicker._get(h, "showAnim");
                    var l = b.datepicker._get(h, "duration"),
                    r = function() {
                        b.datepicker._datepickerShowing = true;
                        var u = h.dpDiv.find("iframe.ui-datepicker-cover");
                        if (u.length) {
                            var o = b.datepicker._getBorders(h.dpDiv);
                            u.css({
                                left: -o[0],
                                top: -o[1],
                                width: h.dpDiv.outerWidth(),
                                height: h.dpDiv.outerHeight()
                            })
                        }
                    };
                    h.dpDiv.zIndex(b(d).zIndex() + 1);
                    b.effects && b.effects[j] ? h.dpDiv.show(j, b.datepicker._get(h, "showOptions"), l, r) : h.dpDiv[j || "show"](j ? l: null, r);
                    if (!j || !l) r();
                    h.input.is(":visible") && !h.input.is(":disabled") && h.input.focus();
                    b.datepicker._curInst = h
                }
            }
        },
        _updateDatepicker: function(d) {
            var h = this,
            j = b.datepicker._getBorders(d.dpDiv);
            d.dpDiv.empty().append(this._generateHTML(d));
            var k = d.dpDiv.find("iframe.ui-datepicker-cover");
            k.length && k.css({
                left: -j[0],
                top: -j[1],
                width: d.dpDiv.outerWidth(),
                height: d.dpDiv.outerHeight()
            });
            d.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",
            function() {
                b(this).removeClass("ui-state-hover");
                this.className.indexOf("ui-datepicker-prev") != -1 && b(this).removeClass("ui-datepicker-prev-hover");
                this.className.indexOf("ui-datepicker-next") != -1 && b(this).removeClass("ui-datepicker-next-hover")
            }).bind("mouseover",
            function() {
                if (!h._isDisabledDatepicker(d.inline ? d.dpDiv.parent()[0] : d.input[0])) {
                    b(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    b(this).addClass("ui-state-hover");
                    this.className.indexOf("ui-datepicker-prev") != -1 && b(this).addClass("ui-datepicker-prev-hover");
                    this.className.indexOf("ui-datepicker-next") != -1 && b(this).addClass("ui-datepicker-next-hover")
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            j = this._getNumberOfMonths(d);
            k = j[1];
            k > 1 ? d.dpDiv.addClass("ui-datepicker-multi-" + k).css("width", 17 * k + "em") : d.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            d.dpDiv[(j[0] != 1 || j[1] != 1 ? "add": "remove") + "Class"]("ui-datepicker-multi");
            d.dpDiv[(this._get(d, "isRTL") ? "add": "remove") + "Class"]("ui-datepicker-rtl");
            d == b.datepicker._curInst && b.datepicker._datepickerShowing && d.input && d.input.is(":visible") && !d.input.is(":disabled") && d.input[0] != document.activeElement && d.input.focus();
            if (d.yearshtml) {
                var l = d.yearshtml;
                setTimeout(function() {
                    l === d.yearshtml && d.dpDiv.find("select.ui-datepicker-year:first").replaceWith(d.yearshtml);
                    l = d.yearshtml = null
                },
                0)
            }
        },
        _getBorders: function(d) {
            var h = function(j) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                } [j] || j
            };
            return [parseFloat(h(d.css("border-left-width"))), parseFloat(h(d.css("border-top-width")))]
        },
        _checkOffset: function(d, h, j) {
            var k = d.dpDiv.outerWidth(),
            l = d.dpDiv.outerHeight(),
            r = d.input ? d.input.outerWidth() : 0,
            u = d.input ? d.input.outerHeight() : 0,
            o = document.documentElement.clientWidth + b(document).scrollLeft(),
            m = document.documentElement.clientHeight + b(document).scrollTop();
            h.left -= this._get(d, "isRTL") ? k - r: 0;
            h.left -= j && h.left == d.input.offset().left ? b(document).scrollLeft() : 0;
            h.top -= j && h.top == d.input.offset().top + u ? b(document).scrollTop() : 0;
            h.left -= Math.min(h.left, h.left + k > o && o > k ? Math.abs(h.left + k - o) : 0);
            h.top -= Math.min(h.top, h.top + l > m && m > l ? Math.abs(l + u) : 0);
            return h
        },
        _findPos: function(d) {
            for (var h = this._get(this._getInst(d), "isRTL"); d && (d.type == "hidden" || d.nodeType != 1 || b.expr.filters.hidden(d));) d = d[h ? "previousSibling": "nextSibling"];
            d = b(d).offset();
            return [d.left, d.top]
        },
        _hideDatepicker: function(d) {
            var h = this._curInst;
            if (! (!h || d && h != b.data(d, "datepicker"))) if (this._datepickerShowing) {
                d = this._get(h, "showAnim");
                var j = this._get(h, "duration"),
                k = function() {
                    b.datepicker._tidyDialog(h);
                    this._curInst = null
                };
                b.effects && b.effects[d] ? h.dpDiv.hide(d, b.datepicker._get(h, "showOptions"), j, k) : h.dpDiv[d == "slideDown" ? "slideUp": d == "fadeIn" ? "fadeOut": "hide"](d ? j: null, k);
                d || k();
                if (d = this._get(h, "onClose")) d.apply(h.input ? h.input[0] : null, [h.input ? h.input.val() : "", h]);
                this._datepickerShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (b.blockUI) {
                        b.unblockUI();
                        b("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function(d) {
            d.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(d) {
            if (b.datepicker._curInst) {
                d = b(d.target);
                d[0].id != b.datepicker._mainDivId && d.parents("#" + b.datepicker._mainDivId).length == 0 && !d.hasClass(b.datepicker.markerClassName) && !d.hasClass(b.datepicker._triggerClass) && b.datepicker._datepickerShowing && !(b.datepicker._inDialog && b.blockUI) && b.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(d, h, j) {
            d = b(d);
            var k = this._getInst(d[0]);
            if (!this._isDisabledDatepicker(d[0])) {
                this._adjustInstDate(k, h + (j == "M" ? this._get(k, "showCurrentAtPos") : 0), j);
                this._updateDatepicker(k)
            }
        },
        _gotoToday: function(d) {
            d = b(d);
            var h = this._getInst(d[0]);
            if (this._get(h, "gotoCurrent") && h.currentDay) {
                h.selectedDay = h.currentDay;
                h.drawMonth = h.selectedMonth = h.currentMonth;
                h.drawYear = h.selectedYear = h.currentYear
            } else {
                var j = new Date;
                h.selectedDay = j.getDate();
                h.drawMonth = h.selectedMonth = j.getMonth();
                h.drawYear = h.selectedYear = j.getFullYear()
            }
            this._notifyChange(h);
            this._adjustDate(d)
        },
        _selectMonthYear: function(d, h, j) {
            d = b(d);
            var k = this._getInst(d[0]);
            k._selectingMonthYear = false;
            k["selected" + (j == "M" ? "Month": "Year")] = k["draw" + (j == "M" ? "Month": "Year")] = parseInt(h.options[h.selectedIndex].value, 10);
            this._notifyChange(k);
            this._adjustDate(d)
        },
        _clickMonthYear: function(d) {
            var h = this._getInst(b(d)[0]);
            h.input && h._selectingMonthYear && setTimeout(function() {
                h.input.focus()
            },
            0);
            h._selectingMonthYear = !h._selectingMonthYear
        },
        _selectDay: function(d, h, j, k) {
            var l = b(d);
            if (! (b(k).hasClass(this._unselectableClass) || this._isDisabledDatepicker(l[0]))) {
                l = this._getInst(l[0]);
                l.selectedDay = l.currentDay = b("a", k).html();
                l.selectedMonth = l.currentMonth = h;
                l.selectedYear = l.currentYear = j;
                this._selectDate(d, this._formatDate(l, l.currentDay, l.currentMonth, l.currentYear))
            }
        },
        _clearDate: function(d) {
            d = b(d);
            this._getInst(d[0]);
            this._selectDate(d, "")
        },
        _selectDate: function(d, h) {
            d = this._getInst(b(d)[0]);
            h = h != null ? h: this._formatDate(d);
            d.input && d.input.val(h);
            this._updateAlternate(d);
            var j = this._get(d, "onSelect");
            if (j) j.apply(d.input ? d.input[0] : null, [h, d]);
            else d.input && d.input.trigger("change");
            if (d.inline) this._updateDatepicker(d);
            else {
                this._hideDatepicker();
                this._lastInput = d.input[0];
                typeof d.input[0] != "object" && d.input.focus();
                this._lastInput = null
            }
        },
        _updateAlternate: function(d) {
            var h = this._get(d, "altField");
            if (h) {
                var j = this._get(d, "altFormat") || this._get(d, "dateFormat"),
                k = this._getDate(d),
                l = this.formatDate(j, k, this._getFormatConfig(d));
                b(h).each(function() {
                    b(this).val(l)
                })
            }
        },
        noWeekends: function(d) {
            d = d.getDay();
            return [d > 0 && d < 6, ""]
        },
        iso8601Week: function(d) {
            d = new Date(d.getTime());
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            var h = d.getTime();
            d.setMonth(0);
            d.setDate(1);
            return Math.floor(Math.round((h - d) / 864E5) / 7) + 1
        },
        parseDate: function(d, h, j) {
            if (d == null || h == null) throw "Invalid arguments";
            h = typeof h == "object" ? h.toString() : h + "";
            if (h == "") return null;
            var k = (j ? j.shortYearCutoff: null) || this._defaults.shortYearCutoff;
            k = typeof k != "string" ? k: (new Date).getFullYear() % 100 + parseInt(k, 10);
            for (var l = (j ? j.dayNamesShort: null) || this._defaults.dayNamesShort, r = (j ? j.dayNames: null) || this._defaults.dayNames, u = (j ? j.monthNamesShort: null) || this._defaults.monthNamesShort, o = (j ? j.monthNames: null) || this._defaults.monthNames, m = j = -1, q = -1, v = -1, w = false, B = function(E) { (E = z + 1 < d.length && d.charAt(z + 1) == E) && z++;
                return E
            },
            D = function(E) {
                var F = B(E);
                E = new RegExp("^\\d{1," + (E == "@" ? 14 : E == "!" ? 20 : E == "y" && F ? 4 : E == "o" ? 3 : 2) + "}");
                E = h.substring(n).match(E);
                if (!E) throw "Missing number at position " + n;
                n += E[0].length;
                return parseInt(E[0], 10)
            },
            I = function(E, F, Q) {
                E = B(E) ? Q: F;
                for (F = 0; F < E.length; F++) if (h.substr(n, E[F].length).toLowerCase() == E[F].toLowerCase()) {
                    n += E[F].length;
                    return F + 1
                }
                throw "Unknown name at position " + n;
            },
            p = function() {
                if (h.charAt(n) != d.charAt(z)) throw "Unexpected literal at position " + n;
                n++
            },
            n = 0, z = 0; z < d.length; z++) if (w) if (d.charAt(z) == "'" && !B("'")) w = false;
            else p();
            else switch (d.charAt(z)) {
            case "d":
                q = D("d");
                break;
            case "D":
                I("D", l, r);
                break;
            case "o":
                v = D("o");
                break;
            case "m":
                m = D("m");
                break;
            case "M":
                m = I("M", u, o);
                break;
            case "y":
                j = D("y");
                break;
            case "@":
                var A = new Date(D("@"));
                j = A.getFullYear();
                m = A.getMonth() + 1;
                q = A.getDate();
                break;
            case "!":
                A = new Date((D("!") - this._ticksTo1970) / 1E4);
                j = A.getFullYear();
                m = A.getMonth() + 1;
                q = A.getDate();
                break;
            case "'":
                if (B("'")) p();
                else w = true;
                break;
            default:
                p()
            }
            if (j == -1) j = (new Date).getFullYear();
            else if (j < 100) j += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (j <= k ? 0 : -100);
            if (v > -1) {
                m = 1;
                q = v;
                do {
                    k = this._getDaysInMonth(j, m - 1);
                    if (q <= k) break;
                    m++;
                    q -= k
                } while ( 1 )
            }
            A = this._daylightSavingAdjust(new Date(j, m - 1, q));
            if (A.getFullYear() != j || A.getMonth() + 1 != m || A.getDate() != q) throw "Invalid date";
            return A
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1E7,
        formatDate: function(d, h, j) {
            if (!h) return "";
            var k = (j ? j.dayNamesShort: null) || this._defaults.dayNamesShort,
            l = (j ? j.dayNames: null) || this._defaults.dayNames,
            r = (j ? j.monthNamesShort: null) || this._defaults.monthNamesShort;
            j = (j ? j.monthNames: null) || this._defaults.monthNames;
            var u = function(B) { (B = w + 1 < d.length && d.charAt(w + 1) == B) && w++;
                return B
            },
            o = function(B, D, I) {
                D = "" + D;
                if (u(B)) for (; D.length < I;) D = "0" + D;
                return D
            },
            m = function(B, D, I, p) {
                return u(B) ? p[D] : I[D]
            },
            q = "",
            v = false;
            if (h) for (var w = 0; w < d.length; w++) if (v) if (d.charAt(w) == "'" && !u("'")) v = false;
            else q += d.charAt(w);
            else switch (d.charAt(w)) {
            case "d":
                q += o("d", h.getDate(), 2);
                break;
            case "D":
                q += m("D", h.getDay(), k, l);
                break;
            case "o":
                q += o("o", (h.getTime() - (new Date(h.getFullYear(), 0, 0)).getTime()) / 864E5, 3);
                break;
            case "m":
                q += o("m", h.getMonth() + 1, 2);
                break;
            case "M":
                q += m("M", h.getMonth(), r, j);
                break;
            case "y":
                q += u("y") ? h.getFullYear() : (h.getYear() % 100 < 10 ? "0": "") + h.getYear() % 100;
                break;
            case "@":
                q += h.getTime();
                break;
            case "!":
                q += h.getTime() * 1E4 + this._ticksTo1970;
                break;
            case "'":
                if (u("'")) q += "'";
                else v = true;
                break;
            default:
                q += d.charAt(w)
            }
            return q
        },
        _possibleChars: function(d) {
            for (var h = "", j = false, k = function(r) { (r = l + 1 < d.length && d.charAt(l + 1) == r) && l++;
                return r
            },
            l = 0; l < d.length; l++) if (j) if (d.charAt(l) == "'" && !k("'")) j = false;
            else h += d.charAt(l);
            else switch (d.charAt(l)) {
            case "d":
            case "m":
            case "y":
            case "@":
                h += "0123456789";
                break;
            case "D":
            case "M":
                return null;
            case "'":
                if (k("'")) h += "'";
                else j = true;
                break;
            default:
                h += d.charAt(l)
            }
            return h
        },
        _get: function(d, h) {
            return d.settings[h] !== c ? d.settings[h] : this._defaults[h]
        },
        _setDateFromField: function(d, h) {
            if (d.input.val() != d.lastVal) {
                var j = this._get(d, "dateFormat"),
                k = d.lastVal = d.input ? d.input.val() : null,
                l,
                r;
                l = r = this._getDefaultDate(d);
                var u = this._getFormatConfig(d);
                try {
                    l = this.parseDate(j, k, u) || r
                } catch(o) {
                    this.log(o);
                    k = h ? "": k
                }
                d.selectedDay = l.getDate();
                d.drawMonth = d.selectedMonth = l.getMonth();
                d.drawYear = d.selectedYear = l.getFullYear();
                d.currentDay = k ? l.getDate() : 0;
                d.currentMonth = k ? l.getMonth() : 0;
                d.currentYear = k ? l.getFullYear() : 0;
                this._adjustInstDate(d)
            }
        },
        _getDefaultDate: function(d) {
            return this._restrictMinMax(d, this._determineDate(d, this._get(d, "defaultDate"), new Date))
        },
        _determineDate: function(d, h, j) {
            var k = function(r) {
                var u = new Date;
                u.setDate(u.getDate() + r);
                return u
            },
            l = function(r) {
                try {
                    return b.datepicker.parseDate(b.datepicker._get(d, "dateFormat"), r, b.datepicker._getFormatConfig(d))
                } catch(u) {}
                var o = (r.toLowerCase().match(/^c/) ? b.datepicker._getDate(d) : null) || new Date,
                m = o.getFullYear(),
                q = o.getMonth();
                o = o.getDate();
                for (var v = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, w = v.exec(r); w;) {
                    switch (w[2] || "d") {
                    case "d":
                    case "D":
                        o += parseInt(w[1], 10);
                        break;
                    case "w":
                    case "W":
                        o += parseInt(w[1], 10) * 7;
                        break;
                    case "m":
                    case "M":
                        q += parseInt(w[1], 10);
                        o = Math.min(o, b.datepicker._getDaysInMonth(m, q));
                        break;
                    case "y":
                    case "Y":
                        m += parseInt(w[1], 10);
                        o = Math.min(o, b.datepicker._getDaysInMonth(m, q));
                        break
                    }
                    w = v.exec(r)
                }
                return new Date(m, q, o)
            };
            if (h = (h = h == null || h === "" ? j: typeof h == "string" ? l(h) : typeof h == "number" ? isNaN(h) ? j: k(h) : new Date(h.getTime())) && h.toString() == "Invalid Date" ? j: h) {
                h.setHours(0);
                h.setMinutes(0);
                h.setSeconds(0);
                h.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(h)
        },
        _daylightSavingAdjust: function(d) {
            if (!d) return null;
            d.setHours(d.getHours() > 12 ? d.getHours() + 2 : 0);
            return d
        },
        _setDate: function(d, h, j) {
            var k = !h,
            l = d.selectedMonth,
            r = d.selectedYear;
            h = this._restrictMinMax(d, this._determineDate(d, h, new Date));
            d.selectedDay = d.currentDay = h.getDate();
            d.drawMonth = d.selectedMonth = d.currentMonth = h.getMonth();
            d.drawYear = d.selectedYear = d.currentYear = h.getFullYear();
            if ((l != d.selectedMonth || r != d.selectedYear) && !j) this._notifyChange(d);
            this._adjustInstDate(d);
            if (d.input) d.input.val(k ? "": this._formatDate(d))
        },
        _getDate: function(d) {
            return ! d.currentYear || d.input && d.input.val() == "" ? null: this._daylightSavingAdjust(new Date(d.currentYear, d.currentMonth, d.currentDay))
        },
        _generateHTML: function(d) {
            var h = new Date;
            h = this._daylightSavingAdjust(new Date(h.getFullYear(), h.getMonth(), h.getDate()));
            var j = this._get(d, "isRTL"),
            k = this._get(d, "showButtonPanel"),
            l = this._get(d, "hideIfNoPrevNext"),
            r = this._get(d, "navigationAsDateFormat"),
            u = this._getNumberOfMonths(d),
            o = this._get(d, "showCurrentAtPos"),
            m = this._get(d, "stepMonths"),
            q = u[0] != 1 || u[1] != 1,
            v = this._daylightSavingAdjust(!d.currentDay ? new Date(9999, 9, 9) : new Date(d.currentYear, d.currentMonth, d.currentDay)),
            w = this._getMinMaxDate(d, "min"),
            B = this._getMinMaxDate(d, "max");
            o = d.drawMonth - o;
            var D = d.drawYear;
            if (o < 0) {
                o += 12;
                D--
            }
            if (B) {
                var I = this._daylightSavingAdjust(new Date(B.getFullYear(), B.getMonth() - u[0] * u[1] + 1, B.getDate()));
                for (I = w && I < w ? w: I; this._daylightSavingAdjust(new Date(D, o, 1)) > I;) {
                    o--;
                    if (o < 0) {
                        o = 11;
                        D--
                    }
                }
            }
            d.drawMonth = o;
            d.drawYear = D;
            I = this._get(d, "prevText");
            I = !r ? I: this.formatDate(I, this._daylightSavingAdjust(new Date(D, o - m, 1)), this._getFormatConfig(d));
            I = this._canAdjustMonth(d, -1, D, o) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._adjustDate('#" + d.id + "', -" + m + ", 'M');\" title=\"" + I + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "e": "w") + '">' + I + "</span></a>": l ? "": '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + I + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "e": "w") + '">' + I + "</span></a>";
            var p = this._get(d, "nextText");
            p = !r ? p: this.formatDate(p, this._daylightSavingAdjust(new Date(D, o + m, 1)), this._getFormatConfig(d));
            l = this._canAdjustMonth(d, +1, D, o) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._adjustDate('#" + d.id + "', +" + m + ", 'M');\" title=\"" + p + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "w": "e") + '">' + p + "</span></a>": l ? "": '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + p + '"><span class="ui-icon ui-icon-circle-triangle-' + (j ? "w": "e") + '">' + p + "</span></a>";
            m = this._get(d, "currentText");
            p = this._get(d, "gotoCurrent") && d.currentDay ? v: h;
            m = !r ? m: this.formatDate(m, p, this._getFormatConfig(d));
            r = !d.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + f + '.datepicker._hideDatepicker();">' + this._get(d, "closeText") + "</button>": "";
            k = k ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (j ? r: "") + (this._isInRange(d, p) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._gotoToday('#" + d.id + "');\">" + m + "</button>": "") + (j ? "": r) + "</div>": "";
            r = parseInt(this._get(d, "firstDay"), 10);
            r = isNaN(r) ? 0 : r;
            m = this._get(d, "showWeek");
            p = this._get(d, "dayNames");
            this._get(d, "dayNamesShort");
            var n = this._get(d, "dayNamesMin"),
            z = this._get(d, "monthNames"),
            A = this._get(d, "monthNamesShort"),
            E = this._get(d, "beforeShowDay"),
            F = this._get(d, "showOtherMonths"),
            Q = this._get(d, "selectOtherMonths");
            this._get(d, "calculateWeek");
            for (var H = this._getDefaultDate(d), G = "", K = 0; K < u[0]; K++) {
                for (var N = "", s = 0; s < u[1]; s++) {
                    var x = this._daylightSavingAdjust(new Date(D, o, d.selectedDay)),
                    y = " ui-corner-all",
                    C = "";
                    if (q) {
                        C += '<div class="ui-datepicker-group';
                        if (u[1] > 1) switch (s) {
                        case 0:
                            C += " ui-datepicker-group-first";
                            y = " ui-corner-" + (j ? "right": "left");
                            break;
                        case u[1] - 1 : C += " ui-datepicker-group-last";
                            y = " ui-corner-" + (j ? "left": "right");
                            break;
                        default:
                            C += " ui-datepicker-group-middle";
                            y = "";
                            break
                        }
                        C += '">'
                    }
                    C += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + y + '">' + (/all|left/.test(y) && K == 0 ? j ? l: I: "") + (/all|right/.test(y) && K == 0 ? j ? I: l: "") + this._generateMonthYearHeader(d, o, D, w, B, K > 0 || s > 0, z, A) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var J = m ? '<th class="ui-datepicker-week-col">' + this._get(d, "weekHeader") + "</th>": "";
                    for (y = 0; y < 7; y++) {
                        var L = (y + r) % 7;
                        J += "<th" + ((y + r + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"': "") + '><span title="' + p[L] + '">' + n[L] + "</span></th>"
                    }
                    C += J + "</tr></thead><tbody>";
                    J = this._getDaysInMonth(D, o);
                    if (D == d.selectedYear && o == d.selectedMonth) d.selectedDay = Math.min(d.selectedDay, J);
                    y = (this._getFirstDayOfMonth(D, o) - r + 7) % 7;
                    J = q ? 6 : Math.ceil((y + J) / 7);
                    L = this._daylightSavingAdjust(new Date(D, o, 1 - y));
                    for (var M = 0; M < J; M++) {
                        C += "<tr>";
                        var O = !m ? "": '<td class="ui-datepicker-week-col">' + this._get(d, "calculateWeek")(L) + "</td>";
                        for (y = 0; y < 7; y++) {
                            var S = E ? E.apply(d.input ? d.input[0] : null, [L]) : [true, ""],
                            R = L.getMonth() != o,
                            T = R && !Q || !S[0] || w && L < w || B && L > B;
                            O += '<td class="' + ((y + r + 6) % 7 >= 5 ? " ui-datepicker-week-end": "") + (R ? " ui-datepicker-other-month": "") + (L.getTime() == x.getTime() && o == d.selectedMonth && d._keyEvent || H.getTime() == L.getTime() && H.getTime() == x.getTime() ? " " + this._dayOverClass: "") + (T ? " " + this._unselectableClass + " ui-state-disabled": "") + (R && !F ? "": " " + S[1] + (L.getTime() == v.getTime() ? " " + this._currentClass: "") + (L.getTime() == h.getTime() ? " ui-datepicker-today": "")) + '"' + ((!R || F) && S[2] ? ' title="' + S[2] + '"': "") + (T ? "": ' onclick="DP_jQuery_' + f + ".datepicker._selectDay('#" + d.id + "'," + L.getMonth() + "," + L.getFullYear() + ', this);return false;"') + ">" + (R && !F ? "&#xa0;": T ? '<span class="ui-state-default">' + L.getDate() + "</span>": '<a class="ui-state-default' + (L.getTime() == h.getTime() ? " ui-state-highlight": "") + (L.getTime() == v.getTime() ? " ui-state-active": "") + (R ? " ui-priority-secondary": "") + '" href="#">' + L.getDate() + "</a>") + "</td>";
                            L.setDate(L.getDate() + 1);
                            L = this._daylightSavingAdjust(L)
                        }
                        C += O + "</tr>"
                    }
                    o++;
                    if (o > 11) {
                        o = 0;
                        D++
                    }
                    C += "</tbody></table>" + (q ? "</div>" + (u[0] > 0 && s == u[1] - 1 ? '<div class="ui-datepicker-row-break"></div>': "") : "");
                    N += C
                }
                G += N
            }
            G += k + (b.browser.msie && parseInt(b.browser.version, 10) < 7 && !d.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>': "");
            d._keyEvent = false;
            return G
        },
        _generateMonthYearHeader: function(d, h, j, k, l, r, u, o) {
            var m = this._get(d, "changeMonth"),
            q = this._get(d, "changeYear"),
            v = this._get(d, "showMonthAfterYear"),
            w = '<div class="ui-datepicker-title">',
            B = "";
            if (r || !m) B += '<span class="ui-datepicker-month">' + u[h] + "</span>";
            else {
                u = k && k.getFullYear() == j;
                var D = l && l.getFullYear() == j;
                B += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + f + ".datepicker._selectMonthYear('#" + d.id + "', this, 'M');\" onclick=\"DP_jQuery_" + f + ".datepicker._clickMonthYear('#" + d.id + "');\">";
                for (var I = 0; I < 12; I++) if ((!u || I >= k.getMonth()) && (!D || I <= l.getMonth())) B += '<option value="' + I + '"' + (I == h ? ' selected="selected"': "") + ">" + o[I] + "</option>";
                B += "</select>"
            }
            v || (w += B + (r || !(m && q) ? "&#xa0;": ""));
            d.yearshtml = "";
            if (r || !q) w += '<span class="ui-datepicker-year">' + j + "</span>";
            else {
                o = this._get(d, "yearRange").split(":");
                var p = (new Date).getFullYear();
                u = function(n) {
                    n = n.match(/c[+-].*/) ? j + parseInt(n.substring(1), 10) : n.match(/[+-].*/) ? p + parseInt(n, 10) : parseInt(n, 10);
                    return isNaN(n) ? p: n
                };
                h = u(o[0]);
                o = Math.max(h, u(o[1] || ""));
                h = k ? Math.max(h, k.getFullYear()) : h;
                o = l ? Math.min(o, l.getFullYear()) : o;
                for (d.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + f + ".datepicker._selectMonthYear('#" + d.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + f + ".datepicker._clickMonthYear('#" + d.id + "');\">"; h <= o; h++) d.yearshtml += '<option value="' + h + '"' + (h == j ? ' selected="selected"': "") + ">" + h + "</option>";
                d.yearshtml += "</select>";
                if (b.browser.mozilla) w += '<select class="ui-datepicker-year"><option value="' + j + '" selected="selected">' + j + "</option></select>";
                else {
                    w += d.yearshtml;
                    d.yearshtml = null
                }
            }
            w += this._get(d, "yearSuffix");
            if (v) w += (r || !(m && q) ? "&#xa0;": "") + B;
            w += "</div>";
            return w
        },
        _adjustInstDate: function(d, h, j) {
            var k = d.drawYear + (j == "Y" ? h: 0),
            l = d.drawMonth + (j == "M" ? h: 0);
            h = Math.min(d.selectedDay, this._getDaysInMonth(k, l)) + (j == "D" ? h: 0);
            k = this._restrictMinMax(d, this._daylightSavingAdjust(new Date(k, l, h)));
            d.selectedDay = k.getDate();
            d.drawMonth = d.selectedMonth = k.getMonth();
            d.drawYear = d.selectedYear = k.getFullYear();
            if (j == "M" || j == "Y") this._notifyChange(d)
        },
        _restrictMinMax: function(d, h) {
            var j = this._getMinMaxDate(d, "min");
            d = this._getMinMaxDate(d, "max");
            h = j && h < j ? j: h;
            return d && h > d ? d: h
        },
        _notifyChange: function(d) {
            var h = this._get(d, "onChangeMonthYear");
            if (h) h.apply(d.input ? d.input[0] : null, [d.selectedYear, d.selectedMonth + 1, d])
        },
        _getNumberOfMonths: function(d) {
            d = this._get(d, "numberOfMonths");
            return d == null ? [1, 1] : typeof d == "number" ? [1, d] : d
        },
        _getMinMaxDate: function(d, h) {
            return this._determineDate(d, this._get(d, h + "Date"), null)
        },
        _getDaysInMonth: function(d, h) {
            return 32 - this._daylightSavingAdjust(new Date(d, h, 32)).getDate()
        },
        _getFirstDayOfMonth: function(d, h) {
            return (new Date(d, h, 1)).getDay()
        },
        _canAdjustMonth: function(d, h, j, k) {
            var l = this._getNumberOfMonths(d);
            j = this._daylightSavingAdjust(new Date(j, k + (h < 0 ? h: l[0] * l[1]), 1));
            h < 0 && j.setDate(this._getDaysInMonth(j.getFullYear(), j.getMonth()));
            return this._isInRange(d, j)
        },
        _isInRange: function(d, h) {
            var j = this._getMinMaxDate(d, "min");
            d = this._getMinMaxDate(d, "max");
            return (!j || h.getTime() >= j.getTime()) && (!d || h.getTime() <= d.getTime())
        },
        _getFormatConfig: function(d) {
            var h = this._get(d, "shortYearCutoff");
            h = typeof h != "string" ? h: (new Date).getFullYear() % 100 + parseInt(h, 10);
            return {
                shortYearCutoff: h,
                dayNamesShort: this._get(d, "dayNamesShort"),
                dayNames: this._get(d, "dayNames"),
                monthNamesShort: this._get(d, "monthNamesShort"),
                monthNames: this._get(d, "monthNames")
            }
        },
        _formatDate: function(d, h, j, k) {
            if (!h) {
                d.currentDay = d.selectedDay;
                d.currentMonth = d.selectedMonth;
                d.currentYear = d.selectedYear
            }
            h = h ? typeof h == "object" ? h: this._daylightSavingAdjust(new Date(k, j, h)) : this._daylightSavingAdjust(new Date(d.currentYear, d.currentMonth, d.currentDay));
            return this.formatDate(this._get(d, "dateFormat"), h, this._getFormatConfig(d))
        }
    });
    b.fn.datepicker = function(d) {
        if (!this.length) return this;
        if (!b.datepicker.initialized) {
            b(document).mousedown(b.datepicker._checkExternalClick).find("body").append(b.datepicker.dpDiv);
            b.datepicker.initialized = true
        }
        var h = Array.prototype.slice.call(arguments, 1);
        if (typeof d == "string" && (d == "isDisabled" || d == "getDate" || d == "widget")) return b.datepicker["_" + d + "Datepicker"].apply(b.datepicker, [this[0]].concat(h));
        if (d == "option" && arguments.length == 2 && typeof arguments[1] == "string") return b.datepicker["_" + d + "Datepicker"].apply(b.datepicker, [this[0]].concat(h));
        return this.each(function() {
            typeof d == "string" ? b.datepicker["_" + d + "Datepicker"].apply(b.datepicker, [this].concat(h)) : b.datepicker._attachDatepicker(this, d)
        })
    };
    b.datepicker = new e;
    b.datepicker.initialized = false;
    b.datepicker.uuid = (new Date).getTime();
    b.datepicker.version = "1.8.11";
    window["DP_jQuery_" + f] = b
})(jQuery);
(function(b, c) {
    b.widget("ui.progressbar", {
        options: {
            value: 0,
            max: 100
        },
        min: 0,
        _create: function() {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = b("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        },
        destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            b.Widget.prototype.destroy.apply(this, arguments)
        },
        value: function(e) {
            if (e === c) return this._value();
            this._setOption("value", e);
            return this
        },
        _setOption: function(e, g) {
            if (e === "value") {
                this.options.value = g;
                this._refreshValue();
                this._value() === this.options.max && this._trigger("complete")
            }
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        _value: function() {
            var e = this.options.value;
            if (typeof e !== "number") e = 0;
            return Math.min(this.options.max, Math.max(this.min, e))
        },
        _percentage: function() {
            return 100 * this._value() / this.options.max
        },
        _refreshValue: function() {
            var e = this.value(),
            g = this._percentage();
            if (this.oldValue !== e) {
                this.oldValue = e;
                this._trigger("change")
            }
            this.valueDiv.toggleClass("ui-corner-right", e === this.options.max).width(g.toFixed(0) + "%");
            this.element.attr("aria-valuenow", e)
        }
    });
    b.extend(b.ui.progressbar, {
        version: "1.8.11"
    })
})(jQuery);
jQuery.effects ||
function(b, c) {
    function e(o) {
        var m;
        if (o && o.constructor == Array && o.length == 3) return o;
        if (m = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(o)) return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
        if (m = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(o)) return [parseFloat(m[1]) * 2.55, parseFloat(m[2]) * 2.55, parseFloat(m[3]) * 2.55];
        if (m = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(o)) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
        if (m = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(o)) return [parseInt(m[1] + m[1], 16), parseInt(m[2] + m[2], 16), parseInt(m[3] + m[3], 16)];
        if (/rgba\(0, 0, 0, 0\)/.exec(o)) return l.transparent;
        return l[b.trim(o).toLowerCase()]
    }
    function g(o, m) {
        var q;
        do {
            q = b.curCSS(o, m);
            if (q != "" && q != "transparent" || b.nodeName(o, "body")) break;
            m = "backgroundColor"
        } while ( o = o . parentNode );
        return e(q)
    }
    function f() {
        var o = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
        m = {},
        q,
        v;
        if (o && o.length && o[0] && o[o[0]]) for (var w = o.length; w--;) {
            q = o[w];
            if (typeof o[q] == "string") {
                v = q.replace(/\-(\w)/g,
                function(B, D) {
                    return D.toUpperCase()
                });
                m[v] = o[q]
            }
        } else for (q in o) if (typeof o[q] === "string") m[q] = o[q];
        return m
    }
    function d(o) {
        var m, q;
        for (m in o) {
            q = o[m];
            if (q == null || b.isFunction(q) || m in u || /scrollbar/.test(m) || !/color/i.test(m) && isNaN(parseFloat(q))) delete o[m]
        }
        return o
    }
    function h(o, m) {
        var q = {
            _: 0
        },
        v;
        for (v in m) if (o[v] != m[v]) q[v] = m[v];
        return q
    }
    function j(o, m, q, v) {
        if (typeof o == "object") {
            v = m;
            q = null;
            m = o;
            o = m.effect
        }
        if (b.isFunction(m)) {
            v = m;
            q = null;
            m = {}
        }
        if (typeof m == "number" || b.fx.speeds[m]) {
            v = q;
            q = m;
            m = {}
        }
        if (b.isFunction(q)) {
            v = q;
            q = null
        }
        m = m || {};
        q = q || m.duration;
        q = b.fx.off ? 0 : typeof q == "number" ? q: q in b.fx.speeds ? b.fx.speeds[q] : b.fx.speeds._default;
        v = v || m.complete;
        return [o, m, q, v]
    }
    function k(o) {
        if (!o || typeof o === "number" || b.fx.speeds[o]) return true;
        if (typeof o === "string" && !b.effects[o]) return true;
        return false
    }
    b.effects = {};
    b.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"],
    function(o, m) {
        b.fx.step[m] = function(q) {
            if (!q.colorInit) {
                q.start = g(q.elem, m);
                q.end = e(q.end);
                q.colorInit = true
            }
            q.elem.style[m] = "rgb(" + Math.max(Math.min(parseInt(q.pos * (q.end[0] - q.start[0]) + q.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(q.pos * (q.end[1] - q.start[1]) + q.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(q.pos * (q.end[2] - q.start[2]) + q.start[2], 10), 255), 0) + ")"
        }
    });
    var l = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    },
    r = ["add", "remove", "toggle"],
    u = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    b.effects.animateClass = function(o, m, q, v) {
        if (b.isFunction(q)) {
            v = q;
            q = null
        }
        return this.queue("fx",
        function() {
            var w = b(this),
            B = w.attr("style") || " ",
            D = d(f.call(this)),
            I,
            p = w.attr("className");
            b.each(r,
            function(n, z) {
                o[z] && w[z + "Class"](o[z])
            });
            I = d(f.call(this));
            w.attr("className", p);
            w.animate(h(D, I), m, q,
            function() {
                b.each(r,
                function(n, z) {
                    o[z] && w[z + "Class"](o[z])
                });
                if (typeof w.attr("style") == "object") {
                    w.attr("style").cssText = "";
                    w.attr("style").cssText = B
                } else w.attr("style", B);
                v && v.apply(this, arguments)
            });
            D = b.queue(this);
            I = D.splice(D.length - 1, 1)[0];
            D.splice(1, 0, I);
            b.dequeue(this)
        })
    };
    b.fn.extend({
        _addClass: b.fn.addClass,
        addClass: function(o, m, q, v) {
            return m ? b.effects.animateClass.apply(this, [{
                add: o
            },
            m, q, v]) : this._addClass(o)
        },
        _removeClass: b.fn.removeClass,
        removeClass: function(o, m, q, v) {
            return m ? b.effects.animateClass.apply(this, [{
                remove: o
            },
            m, q, v]) : this._removeClass(o)
        },
        _toggleClass: b.fn.toggleClass,
        toggleClass: function(o, m, q, v, w) {
            return typeof m == "boolean" || m === c ? q ? b.effects.animateClass.apply(this, [m ? {
                add: o
            }: {
                remove: o
            },
            q, v, w]) : this._toggleClass(o, m) : b.effects.animateClass.apply(this, [{
                toggle: o
            },
            m, q, v])
        },
        switchClass: function(o, m, q, v, w) {
            return b.effects.animateClass.apply(this, [{
                add: m,
                remove: o
            },
            q, v, w])
        }
    });
    b.extend(b.effects, {
        version: "1.8.11",
        save: function(o, m) {
            for (var q = 0; q < m.length; q++) m[q] !== null && o.data("ec.storage." + m[q], o[0].style[m[q]])
        },
        restore: function(o, m) {
            for (var q = 0; q < m.length; q++) m[q] !== null && o.css(m[q], o.data("ec.storage." + m[q]))
        },
        setMode: function(o, m) {
            if (m == "toggle") m = o.is(":hidden") ? "show": "hide";
            return m
        },
        getBaseline: function(o, m) {
            var q;
            switch (o[0]) {
            case "top":
                q = 0;
                break;
            case "middle":
                q = 0.5;
                break;
            case "bottom":
                q = 1;
                break;
            default:
                q = o[0] / m.height
            }
            switch (o[1]) {
            case "left":
                o = 0;
                break;
            case "center":
                o = 0.5;
                break;
            case "right":
                o = 1;
                break;
            default:
                o = o[1] / m.width
            }
            return {
                x: o,
                y: q
            }
        },
        createWrapper: function(o) {
            if (o.parent().is(".ui-effects-wrapper")) return o.parent();
            var m = {
                width: o.outerWidth(true),
                height: o.outerHeight(true),
                "float": o.css("float")
            },
            q = b("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            });
            o.wrap(q);
            q = o.parent();
            if (o.css("position") == "static") {
                q.css({
                    position: "relative"
                });
                o.css({
                    position: "relative"
                })
            } else {
                b.extend(m, {
                    position: o.css("position"),
                    zIndex: o.css("z-index")
                });
                b.each(["top", "left", "bottom", "right"],
                function(v, w) {
                    m[w] = o.css(w);
                    if (isNaN(parseInt(m[w], 10))) m[w] = "auto"
                });
                o.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })
            }
            return q.css(m).show()
        },
        removeWrapper: function(o) {
            if (o.parent().is(".ui-effects-wrapper")) return o.parent().replaceWith(o);
            return o
        },
        setTransition: function(o, m, q, v) {
            v = v || {};
            b.each(m,
            function(w, B) {
                unit = o.cssUnit(B);
                if (unit[0] > 0) v[B] = unit[0] * q + unit[1]
            });
            return v
        }
    });
    b.fn.extend({
        effect: function(o) {
            var m = j.apply(this, arguments),
            q = {
                options: m[1],
                duration: m[2],
                callback: m[3]
            };
            m = q.options.mode;
            var v = b.effects[o];
            if (b.fx.off || !v) return m ? this[m](q.duration, q.callback) : this.each(function() {
                q.callback && q.callback.call(this)
            });
            return v.call(this, q)
        },
        _show: b.fn.show,
        show: function(o) {
            if (k(o)) return this._show.apply(this, arguments);
            else {
                var m = j.apply(this, arguments);
                m[1].mode = "show";
                return this.effect.apply(this, m)
            }
        },
        _hide: b.fn.hide,
        hide: function(o) {
            if (k(o)) return this._hide.apply(this, arguments);
            else {
                var m = j.apply(this, arguments);
                m[1].mode = "hide";
                return this.effect.apply(this, m)
            }
        },
        __toggle: b.fn.toggle,
        toggle: function(o) {
            if (k(o) || typeof o === "boolean" || b.isFunction(o)) return this.__toggle.apply(this, arguments);
            else {
                var m = j.apply(this, arguments);
                m[1].mode = "toggle";
                return this.effect.apply(this, m)
            }
        },
        cssUnit: function(o) {
            var m = this.css(o),
            q = [];
            b.each(["em", "px", "%", "pt"],
            function(v, w) {
                if (m.indexOf(w) > 0) q = [parseFloat(m), w]
            });
            return q
        }
    });
    b.easing.jswing = b.easing.swing;
    b.extend(b.easing, {
        def: "easeOutQuad",
        swing: function(o, m, q, v, w) {
            return b.easing[b.easing.def](o, m, q, v, w)
        },
        easeInQuad: function(o, m, q, v, w) {
            return v * (m /= w) * m + q
        },
        easeOutQuad: function(o, m, q, v, w) {
            return - v * (m /= w) * (m - 2) + q
        },
        easeInOutQuad: function(o, m, q, v, w) {
            if ((m /= w / 2) < 1) return v / 2 * m * m + q;
            return - v / 2 * (--m * (m - 2) - 1) + q
        },
        easeInCubic: function(o, m, q, v, w) {
            return v * (m /= w) * m * m + q
        },
        easeOutCubic: function(o, m, q, v, w) {
            return v * ((m = m / w - 1) * m * m + 1) + q
        },
        easeInOutCubic: function(o, m, q, v, w) {
            if ((m /= w / 2) < 1) return v / 2 * m * m * m + q;
            return v / 2 * ((m -= 2) * m * m + 2) + q
        },
        easeInQuart: function(o, m, q, v, w) {
            return v * (m /= w) * m * m * m + q
        },
        easeOutQuart: function(o, m, q, v, w) {
            return - v * ((m = m / w - 1) * m * m * m - 1) + q
        },
        easeInOutQuart: function(o, m, q, v, w) {
            if ((m /= w / 2) < 1) return v / 2 * m * m * m * m + q;
            return - v / 2 * ((m -= 2) * m * m * m - 2) + q
        },
        easeInQuint: function(o, m, q, v, w) {
            return v * (m /= w) * m * m * m * m + q
        },
        easeOutQuint: function(o, m, q, v, w) {
            return v * ((m = m / w - 1) * m * m * m * m + 1) + q
        },
        easeInOutQuint: function(o, m, q, v, w) {
            if ((m /= w / 2) < 1) return v / 2 * m * m * m * m * m + q;
            return v / 2 * ((m -= 2) * m * m * m * m + 2) + q
        },
        easeInSine: function(o, m, q, v, w) {
            return - v * Math.cos(m / w * (Math.PI / 2)) + v + q
        },
        easeOutSine: function(o, m, q, v, w) {
            return v * Math.sin(m / w * (Math.PI / 2)) + q
        },
        easeInOutSine: function(o, m, q, v, w) {
            return - v / 2 * (Math.cos(Math.PI * m / w) - 1) + q
        },
        easeInExpo: function(o, m, q, v, w) {
            return m == 0 ? q: v * Math.pow(2, 10 * (m / w - 1)) + q
        },
        easeOutExpo: function(o, m, q, v, w) {
            return m == w ? q + v: v * ( - Math.pow(2, -10 * m / w) + 1) + q
        },
        easeInOutExpo: function(o, m, q, v, w) {
            if (m == 0) return q;
            if (m == w) return q + v;
            if ((m /= w / 2) < 1) return v / 2 * Math.pow(2, 10 * (m - 1)) + q;
            return v / 2 * ( - Math.pow(2, -10 * --m) + 2) + q
        },
        easeInCirc: function(o, m, q, v, w) {
            return - v * (Math.sqrt(1 - (m /= w) * m) - 1) + q
        },
        easeOutCirc: function(o, m, q, v, w) {
            return v * Math.sqrt(1 - (m = m / w - 1) * m) + q
        },
        easeInOutCirc: function(o, m, q, v, w) {
            if ((m /= w / 2) < 1) return - v / 2 * (Math.sqrt(1 - m * m) - 1) + q;
            return v / 2 * (Math.sqrt(1 - (m -= 2) * m) + 1) + q
        },
        easeInElastic: function(o, m, q, v, w) {
            var B = 0,
            D = v;
            if (m == 0) return q;
            if ((m /= w) == 1) return q + v;
            B || (B = w * 0.3);
            if (D < Math.abs(v)) {
                D = v;
                o = B / 4
            } else o = B / (2 * Math.PI) * Math.asin(v / D);
            return - (D * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * w - o) * 2 * Math.PI / B)) + q
        },
        easeOutElastic: function(o, m, q, v, w) {
            var B = 0,
            D = v;
            if (m == 0) return q;
            if ((m /= w) == 1) return q + v;
            B || (B = w * 0.3);
            if (D < Math.abs(v)) {
                D = v;
                o = B / 4
            } else o = B / (2 * Math.PI) * Math.asin(v / D);
            return D * Math.pow(2, -10 * m) * Math.sin((m * w - o) * 2 * Math.PI / B) + v + q
        },
        easeInOutElastic: function(o, m, q, v, w) {
            var B = 0,
            D = v;
            if (m == 0) return q;
            if ((m /= w / 2) == 2) return q + v;
            B || (B = w * 0.3 * 1.5);
            if (D < Math.abs(v)) {
                D = v;
                o = B / 4
            } else o = B / (2 * Math.PI) * Math.asin(v / D);
            if (m < 1) return - 0.5 * D * Math.pow(2, 10 * (m -= 1)) * Math.sin((m * w - o) * 2 * Math.PI / B) + q;
            return D * Math.pow(2, -10 * (m -= 1)) * Math.sin((m * w - o) * 2 * Math.PI / B) * 0.5 + v + q
        },
        easeInBack: function(o, m, q, v, w, B) {
            if (B == c) B = 1.70158;
            return v * (m /= w) * m * ((B + 1) * m - B) + q
        },
        easeOutBack: function(o, m, q, v, w, B) {
            if (B == c) B = 1.70158;
            return v * ((m = m / w - 1) * m * ((B + 1) * m + B) + 1) + q
        },
        easeInOutBack: function(o, m, q, v, w, B) {
            if (B == c) B = 1.70158;
            if ((m /= w / 2) < 1) return v / 2 * m * m * (((B *= 1.525) + 1) * m - B) + q;
            return v / 2 * ((m -= 2) * m * (((B *= 1.525) + 1) * m + B) + 2) + q
        },
        easeInBounce: function(o, m, q, v, w) {
            return v - b.easing.easeOutBounce(o, w - m, 0, v, w) + q
        },
        easeOutBounce: function(o, m, q, v, w) {
            return (m /= w) < 1 / 2.75 ? v * 7.5625 * m * m + q: m < 2 / 2.75 ? v * (7.5625 * (m -= 1.5 / 2.75) * m + 0.75) + q: m < 2.5 / 2.75 ? v * (7.5625 * (m -= 2.25 / 2.75) * m + 0.9375) + q: v * (7.5625 * (m -= 2.625 / 2.75) * m + 0.984375) + q
        },
        easeInOutBounce: function(o, m, q, v, w) {
            if (m < w / 2) return b.easing.easeInBounce(o, m * 2, 0, v, w) * 0.5 + q;
            return b.easing.easeOutBounce(o, m * 2 - w, 0, v, w) * 0.5 + v * 0.5 + q
        }
    })
} (jQuery);
(function(b) {
    b.effects.blind = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["position", "top", "bottom", "left", "right"],
            f = b.effects.setMode(e, c.options.mode || "hide"),
            d = c.options.direction || "vertical";
            b.effects.save(e, g);
            e.show();
            var h = b.effects.createWrapper(e).css({
                overflow: "hidden"
            }),
            j = d == "vertical" ? "height": "width";
            d = d == "vertical" ? h.height() : h.width();
            f == "show" && h.css(j, 0);
            var k = {};
            k[j] = f == "show" ? d: 0;
            h.animate(k, c.duration, c.options.easing,
            function() {
                f == "hide" && e.hide();
                b.effects.restore(e, g);
                b.effects.removeWrapper(e);
                c.callback && c.callback.apply(e[0], arguments);
                e.dequeue()
            })
        })
    }
})(jQuery);
(function(b) {
    b.effects.bounce = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["position", "top", "bottom", "left", "right"],
            f = b.effects.setMode(e, c.options.mode || "effect"),
            d = c.options.direction || "up",
            h = c.options.distance || 20,
            j = c.options.times || 5,
            k = c.duration || 250;
            /show|hide/.test(f) && g.push("opacity");
            b.effects.save(e, g);
            e.show();
            b.effects.createWrapper(e);
            var l = d == "up" || d == "down" ? "top": "left";
            d = d == "up" || d == "left" ? "pos": "neg";
            h = c.options.distance || (l == "top" ? e.outerHeight({
                margin: true
            }) / 3 : e.outerWidth({
                margin: true
            }) / 3);
            if (f == "show") e.css("opacity", 0).css(l, d == "pos" ? -h: h);
            if (f == "hide") h /= j * 2;
            f != "hide" && j--;
            if (f == "show") {
                var r = {
                    opacity: 1
                };
                r[l] = (d == "pos" ? "+=": "-=") + h;
                e.animate(r, k / 2, c.options.easing);
                h /= 2;
                j--
            }
            for (r = 0; r < j; r++) {
                var u = {},
                o = {};
                u[l] = (d == "pos" ? "-=": "+=") + h;
                o[l] = (d == "pos" ? "+=": "-=") + h;
                e.animate(u, k / 2, c.options.easing).animate(o, k / 2, c.options.easing);
                h = f == "hide" ? h * 2 : h / 2
            }
            if (f == "hide") {
                r = {
                    opacity: 0
                };
                r[l] = (d == "pos" ? "-=": "+=") + h;
                e.animate(r, k / 2, c.options.easing,
                function() {
                    e.hide();
                    b.effects.restore(e, g);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments)
                })
            } else {
                u = {};
                o = {};
                u[l] = (d == "pos" ? "-=": "+=") + h;
                o[l] = (d == "pos" ? "+=": "-=") + h;
                e.animate(u, k / 2, c.options.easing).animate(o, k / 2, c.options.easing,
                function() {
                    b.effects.restore(e, g);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments)
                })
            }
            e.queue("fx",
            function() {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
(function(b) {
    b.effects.clip = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["position", "top", "bottom", "left", "right", "height", "width"],
            f = b.effects.setMode(e, c.options.mode || "hide"),
            d = c.options.direction || "vertical";
            b.effects.save(e, g);
            e.show();
            var h = b.effects.createWrapper(e).css({
                overflow: "hidden"
            });
            h = e[0].tagName == "IMG" ? h: e;
            var j = {
                size: d == "vertical" ? "height": "width",
                position: d == "vertical" ? "top": "left"
            };
            d = d == "vertical" ? h.height() : h.width();
            if (f == "show") {
                h.css(j.size, 0);
                h.css(j.position, d / 2)
            }
            var k = {};
            k[j.size] = f == "show" ? d: 0;
            k[j.position] = f == "show" ? 0 : d / 2;
            h.animate(k, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    f == "hide" && e.hide();
                    b.effects.restore(e, g);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(e[0], arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function(b) {
    b.effects.drop = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["position", "top", "bottom", "left", "right", "opacity"],
            f = b.effects.setMode(e, c.options.mode || "hide"),
            d = c.options.direction || "left";
            b.effects.save(e, g);
            e.show();
            b.effects.createWrapper(e);
            var h = d == "up" || d == "down" ? "top": "left";
            d = d == "up" || d == "left" ? "pos": "neg";
            var j = c.options.distance || (h == "top" ? e.outerHeight({
                margin: true
            }) / 2 : e.outerWidth({
                margin: true
            }) / 2);
            if (f == "show") e.css("opacity", 0).css(h, d == "pos" ? -j: j);
            var k = {
                opacity: f == "show" ? 1 : 0
            };
            k[h] = (f == "show" ? d == "pos" ? "+=": "-=": d == "pos" ? "-=": "+=") + j;
            e.animate(k, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    f == "hide" && e.hide();
                    b.effects.restore(e, g);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function(b) {
    b.effects.explode = function(c) {
        return this.queue(function() {
            var e = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3,
            g = c.options.pieces ? Math.round(Math.sqrt(c.options.pieces)) : 3;
            c.options.mode = c.options.mode == "toggle" ? b(this).is(":visible") ? "hide": "show": c.options.mode;
            var f = b(this).show().css("visibility", "hidden"),
            d = f.offset();
            d.top -= parseInt(f.css("marginTop"), 10) || 0;
            d.left -= parseInt(f.css("marginLeft"), 10) || 0;
            for (var h = f.outerWidth(true), j = f.outerHeight(true), k = 0; k < e; k++) for (var l = 0; l < g; l++) f.clone().appendTo("body").wrap("<div></div>").css({
                position: "absolute",
                visibility: "visible",
                left: -l * (h / g),
                top: -k * (j / e)
            }).parent().addClass("ui-effects-explode").css({
                position: "absolute",
                overflow: "hidden",
                width: h / g,
                height: j / e,
                left: d.left + l * (h / g) + (c.options.mode == "show" ? (l - Math.floor(g / 2)) * (h / g) : 0),
                top: d.top + k * (j / e) + (c.options.mode == "show" ? (k - Math.floor(e / 2)) * (j / e) : 0),
                opacity: c.options.mode == "show" ? 0 : 1
            }).animate({
                left: d.left + l * (h / g) + (c.options.mode == "show" ? 0 : (l - Math.floor(g / 2)) * (h / g)),
                top: d.top + k * (j / e) + (c.options.mode == "show" ? 0 : (k - Math.floor(e / 2)) * (j / e)),
                opacity: c.options.mode == "show" ? 1 : 0
            },
            c.duration || 500);
            setTimeout(function() {
                c.options.mode == "show" ? f.css({
                    visibility: "visible"
                }) : f.css({
                    visibility: "visible"
                }).hide();
                c.callback && c.callback.apply(f[0]);
                f.dequeue();
                b("div.ui-effects-explode").remove()
            },
            c.duration || 500)
        })
    }
})(jQuery);
(function(b) {
    b.effects.fade = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = b.effects.setMode(e, c.options.mode || "hide");
            e.animate({
                opacity: g
            },
            {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function(b) {
    b.effects.fold = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["position", "top", "bottom", "left", "right"],
            f = b.effects.setMode(e, c.options.mode || "hide"),
            d = c.options.size || 15,
            h = !!c.options.horizFirst,
            j = c.duration ? c.duration / 2 : b.fx.speeds._default / 2;
            b.effects.save(e, g);
            e.show();
            var k = b.effects.createWrapper(e).css({
                overflow: "hidden"
            }),
            l = f == "show" != h,
            r = l ? ["width", "height"] : ["height", "width"];
            l = l ? [k.width(), k.height()] : [k.height(), k.width()];
            var u = /([0-9]+)%/.exec(d);
            if (u) d = parseInt(u[1], 10) / 100 * l[f == "hide" ? 0 : 1];
            if (f == "show") k.css(h ? {
                height: 0,
                width: d
            }: {
                height: d,
                width: 0
            });
            h = {};
            u = {};
            h[r[0]] = f == "show" ? l[0] : d;
            u[r[1]] = f == "show" ? l[1] : 0;
            k.animate(h, j, c.options.easing).animate(u, j, c.options.easing,
            function() {
                f == "hide" && e.hide();
                b.effects.restore(e, g);
                b.effects.removeWrapper(e);
                c.callback && c.callback.apply(e[0], arguments);
                e.dequeue()
            })
        })
    }
})(jQuery);
(function(b) {
    b.effects.highlight = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["backgroundImage", "backgroundColor", "opacity"],
            f = b.effects.setMode(e, c.options.mode || "show"),
            d = {
                backgroundColor: e.css("backgroundColor")
            };
            if (f == "hide") d.opacity = 0;
            b.effects.save(e, g);
            e.show().css({
                backgroundImage: "none",
                backgroundColor: c.options.color || "#ffff99"
            }).animate(d, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    f == "hide" && e.hide();
                    b.effects.restore(e, g);
                    f == "show" && !b.support.opacity && this.style.removeAttribute("filter");
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function(b) {
    b.effects.pulsate = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = b.effects.setMode(e, c.options.mode || "show");
            times = (c.options.times || 5) * 2 - 1;
            duration = c.duration ? c.duration / 2 : b.fx.speeds._default / 2;
            isVisible = e.is(":visible");
            animateTo = 0;
            if (!isVisible) {
                e.css("opacity", 0).show();
                animateTo = 1
            }
            if (g == "hide" && isVisible || g == "show" && !isVisible) times--;
            for (g = 0; g < times; g++) {
                e.animate({
                    opacity: animateTo
                },
                duration, c.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            e.animate({
                opacity: animateTo
            },
            duration, c.options.easing,
            function() {
                animateTo == 0 && e.hide();
                c.callback && c.callback.apply(this, arguments)
            });
            e.queue("fx",
            function() {
                e.dequeue()
            }).dequeue()
        })
    }
})(jQuery);
(function(b) {
    b.effects.puff = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = b.effects.setMode(e, c.options.mode || "hide"),
            f = parseInt(c.options.percent, 10) || 150,
            d = f / 100,
            h = {
                height: e.height(),
                width: e.width()
            };
            b.extend(c.options, {
                fade: true,
                mode: g,
                percent: g == "hide" ? f: 100,
                from: g == "hide" ? h: {
                    height: h.height * d,
                    width: h.width * d
                }
            });
            e.effect("scale", c.options, c.duration, c.callback);
            e.dequeue()
        })
    };
    b.effects.scale = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = b.extend(true, {},
            c.options),
            f = b.effects.setMode(e, c.options.mode || "effect"),
            d = parseInt(c.options.percent, 10) || (parseInt(c.options.percent, 10) == 0 ? 0 : f == "hide" ? 0 : 100),
            h = c.options.direction || "both",
            j = c.options.origin;
            if (f != "effect") {
                g.origin = j || ["middle", "center"];
                g.restore = true
            }
            j = {
                height: e.height(),
                width: e.width()
            };
            e.from = c.options.from || (f == "show" ? {
                height: 0,
                width: 0
            }: j);
            d = {
                y: h != "horizontal" ? d / 100 : 1,
                x: h != "vertical" ? d / 100 : 1
            };
            e.to = {
                height: j.height * d.y,
                width: j.width * d.x
            };
            if (c.options.fade) {
                if (f == "show") {
                    e.from.opacity = 0;
                    e.to.opacity = 1
                }
                if (f == "hide") {
                    e.from.opacity = 1;
                    e.to.opacity = 0
                }
            }
            g.from = e.from;
            g.to = e.to;
            g.mode = f;
            e.effect("size", g, c.duration, c.callback);
            e.dequeue()
        })
    };
    b.effects.size = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
            f = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
            d = ["width", "height", "overflow"],
            h = ["fontSize"],
            j = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            k = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            l = b.effects.setMode(e, c.options.mode || "effect"),
            r = c.options.restore || false,
            u = c.options.scale || "both",
            o = c.options.origin,
            m = {
                height: e.height(),
                width: e.width()
            };
            e.from = c.options.from || m;
            e.to = c.options.to || m;
            if (o) {
                o = b.effects.getBaseline(o, m);
                e.from.top = (m.height - e.from.height) * o.y;
                e.from.left = (m.width - e.from.width) * o.x;
                e.to.top = (m.height - e.to.height) * o.y;
                e.to.left = (m.width - e.to.width) * o.x
            }
            var q = {
                from: {
                    y: e.from.height / m.height,
                    x: e.from.width / m.width
                },
                to: {
                    y: e.to.height / m.height,
                    x: e.to.width / m.width
                }
            };
            if (u == "box" || u == "both") {
                if (q.from.y != q.to.y) {
                    g = g.concat(j);
                    e.from = b.effects.setTransition(e, j, q.from.y, e.from);
                    e.to = b.effects.setTransition(e, j, q.to.y, e.to)
                }
                if (q.from.x != q.to.x) {
                    g = g.concat(k);
                    e.from = b.effects.setTransition(e, k, q.from.x, e.from);
                    e.to = b.effects.setTransition(e, k, q.to.x, e.to)
                }
            }
            if (u == "content" || u == "both") if (q.from.y != q.to.y) {
                g = g.concat(h);
                e.from = b.effects.setTransition(e, h, q.from.y, e.from);
                e.to = b.effects.setTransition(e, h, q.to.y, e.to)
            }
            b.effects.save(e, r ? g: f);
            e.show();
            b.effects.createWrapper(e);
            e.css("overflow", "hidden").css(e.from);
            if (u == "content" || u == "both") {
                j = j.concat(["marginTop", "marginBottom"]).concat(h);
                k = k.concat(["marginLeft", "marginRight"]);
                d = g.concat(j).concat(k);
                e.find("*[width]").each(function() {
                    child = b(this);
                    r && b.effects.save(child, d);
                    var v = {
                        height: child.height(),
                        width: child.width()
                    };
                    child.from = {
                        height: v.height * q.from.y,
                        width: v.width * q.from.x
                    };
                    child.to = {
                        height: v.height * q.to.y,
                        width: v.width * q.to.x
                    };
                    if (q.from.y != q.to.y) {
                        child.from = b.effects.setTransition(child, j, q.from.y, child.from);
                        child.to = b.effects.setTransition(child, j, q.to.y, child.to)
                    }
                    if (q.from.x != q.to.x) {
                        child.from = b.effects.setTransition(child, k, q.from.x, child.from);
                        child.to = b.effects.setTransition(child, k, q.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, c.duration, c.options.easing,
                    function() {
                        r && b.effects.restore(child, d)
                    })
                })
            }
            e.animate(e.to, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    e.to.opacity === 0 && e.css("opacity", e.from.opacity);
                    l == "hide" && e.hide();
                    b.effects.restore(e, r ? g: f);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function(b) {
    b.effects.shake = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["position", "top", "bottom", "left", "right"];
            b.effects.setMode(e, c.options.mode || "effect");
            var f = c.options.direction || "left",
            d = c.options.distance || 20,
            h = c.options.times || 3,
            j = c.duration || c.options.duration || 140;
            b.effects.save(e, g);
            e.show();
            b.effects.createWrapper(e);
            var k = f == "up" || f == "down" ? "top": "left",
            l = f == "up" || f == "left" ? "pos": "neg";
            f = {};
            var r = {},
            u = {};
            f[k] = (l == "pos" ? "-=": "+=") + d;
            r[k] = (l == "pos" ? "+=": "-=") + d * 2;
            u[k] = (l == "pos" ? "-=": "+=") + d * 2;
            e.animate(f, j, c.options.easing);
            for (d = 1; d < h; d++) e.animate(r, j, c.options.easing).animate(u, j, c.options.easing);
            e.animate(r, j, c.options.easing).animate(f, j / 2, c.options.easing,
            function() {
                b.effects.restore(e, g);
                b.effects.removeWrapper(e);
                c.callback && c.callback.apply(this, arguments)
            });
            e.queue("fx",
            function() {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
(function(b) {
    b.effects.slide = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = ["position", "top", "bottom", "left", "right"],
            f = b.effects.setMode(e, c.options.mode || "show"),
            d = c.options.direction || "left";
            b.effects.save(e, g);
            e.show();
            b.effects.createWrapper(e).css({
                overflow: "hidden"
            });
            var h = d == "up" || d == "down" ? "top": "left";
            d = d == "up" || d == "left" ? "pos": "neg";
            var j = c.options.distance || (h == "top" ? e.outerHeight({
                margin: true
            }) : e.outerWidth({
                margin: true
            }));
            if (f == "show") e.css(h, d == "pos" ? isNaN(j) ? "-" + j: -j: j);
            var k = {};
            k[h] = (f == "show" ? d == "pos" ? "+=": "-=": d == "pos" ? "-=": "+=") + j;
            e.animate(k, {
                queue: false,
                duration: c.duration,
                easing: c.options.easing,
                complete: function() {
                    f == "hide" && e.hide();
                    b.effects.restore(e, g);
                    b.effects.removeWrapper(e);
                    c.callback && c.callback.apply(this, arguments);
                    e.dequeue()
                }
            })
        })
    }
})(jQuery);
(function(b) {
    b.effects.transfer = function(c) {
        return this.queue(function() {
            var e = b(this),
            g = b(c.options.to),
            f = g.offset();
            g = {
                top: f.top,
                left: f.left,
                height: g.innerHeight(),
                width: g.innerWidth()
            };
            f = e.offset();
            var d = b('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(c.options.className).css({
                top: f.top,
                left: f.left,
                height: e.innerHeight(),
                width: e.innerWidth(),
                position: "absolute"
            }).animate(g, c.duration, c.options.easing,
            function() {
                d.remove();
                c.callback && c.callback.apply(e[0], arguments);
                e.dequeue()
            })
        })
    }
})(jQuery);
(function(b) {
    function c() {
        if (b.fn.ajaxSubmit.debug) {
            var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            if (window.console && window.console.log) window.console.log(e);
            else window.opera && window.opera.postError && window.opera.postError(e)
        }
    }
    b.fn.ajaxSubmit = function(e) {
        function g(m) {
            function q(M) {
                return M.contentWindow ? M.contentWindow.document: M.contentDocument ? M.contentDocument: M.document
            }
            function v() {
                function M() {
                    try {
                        var U = q(E).readyState;
                        c("state = " + U);
                        U.toLowerCase() == "uninitialized" && setTimeout(M, 50)
                    } catch(aa) {
                        c("Server abort: ", aa, " (", aa.name, ")");
                        w(K);
                        H && clearTimeout(H);
                        H = undefined
                    }
                }
                var O = h.attr("target"),
                S = h.attr("action");
                B.setAttribute("target", z);
                f || B.setAttribute("method", "POST");
                S != p.url && B.setAttribute("action", p.url);
                if (!p.skipEncodingOverride && (!f || /post/i.test(f))) h.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                });
                if (p.timeout) H = setTimeout(function() {
                    Q = true;
                    w(G)
                },
                p.timeout);
                var R = [];
                try {
                    if (p.extraData) for (var T in p.extraData) R.push(b('<input type="hidden" name="' + T + '" />').attr("value", p.extraData[T]).appendTo(B)[0]);
                    if (!p.iframeTarget) {
                        A.appendTo("body");
                        E.attachEvent ? E.attachEvent("onload", w) : E.addEventListener("load", w, false)
                    }
                    setTimeout(M, 15);
                    B.submit()
                } finally {
                    B.setAttribute("action", S);
                    O ? B.setAttribute("target", O) : h.removeAttr("target");
                    b(R).remove()
                }
            }
            function w(M) {
                if (! (F.aborted || y)) {
                    try {
                        s = q(E)
                    } catch(O) {
                        c("cannot access response document: ", O);
                        M = K
                    }
                    if (M === G && F) F.abort("timeout");
                    else if (M == K && F) F.abort("server abort");
                    else {
                        if (!s || s.location.href == p.iframeSrc) if (!Q) return;
                        E.detachEvent ? E.detachEvent("onload", w) : E.removeEventListener("load", w, false);
                        M = "success";
                        var S;
                        try {
                            if (Q) throw "timeout";
                            var R = p.dataType == "xml" || s.XMLDocument || b.isXMLDoc(s);
                            c("isXml=" + R);
                            if (!R && window.opera && (s.body == null || s.body.innerHTML == "")) if (--x) {
                                c("requeing onLoad callback, DOM not available");
                                setTimeout(w, 250);
                                return
                            }
                            var T = s.body ? s.body: s.documentElement;
                            F.responseText = T ? T.innerHTML: null;
                            F.responseXML = s.XMLDocument ? s.XMLDocument: s;
                            if (R) p.dataType = "xml";
                            F.getResponseHeader = function(Y) {
                                return {
                                    "content-type": p.dataType
                                } [Y]
                            };
                            if (T) {
                                F.status = Number(T.getAttribute("status")) || F.status;
                                F.statusText = T.getAttribute("statusText") || F.statusText
                            }
                            var U = (p.dataType || "").toLowerCase(),
                            aa = /(json|script|text)/.test(U);
                            if (aa || p.textarea) {
                                var X = s.getElementsByTagName("textarea")[0];
                                if (X) {
                                    F.responseText = X.value;
                                    F.status = Number(X.getAttribute("status")) || F.status;
                                    F.statusText = X.getAttribute("statusText") || F.statusText
                                } else if (aa) {
                                    var W = s.getElementsByTagName("pre")[0],
                                    Z = s.getElementsByTagName("body")[0];
                                    if (W) F.responseText = W.textContent ? W.textContent: W.innerText;
                                    else if (Z) F.responseText = Z.textContent ? Z.textContent: Z.innerText
                                }
                            } else if (U == "xml" && !F.responseXML && F.responseText != null) F.responseXML = C(F.responseText);
                            try {
                                N = L(F, U, p)
                            } catch(da) {
                                M = "parsererror";
                                F.error = S = da || M
                            }
                        } catch(ca) {
                            c("error caught: ", ca);
                            M = "error";
                            F.error = S = ca || M
                        }
                        if (F.aborted) {
                            c("upload aborted");
                            M = null
                        }
                        if (F.status) M = F.status >= 200 && F.status < 300 || F.status === 304 ? "success": "error";
                        if (M === "success") {
                            p.success && p.success.call(p.context, N, "success", F);
                            n && b.event.trigger("ajaxSuccess", [F, p])
                        } else if (M) {
                            if (S == undefined) S = F.statusText;
                            p.error && p.error.call(p.context, F, M, S);
                            n && b.event.trigger("ajaxError", [F, p, S])
                        }
                        n && b.event.trigger("ajaxComplete", [F, p]);
                        n && !--b.active && b.event.trigger("ajaxStop");
                        p.complete && p.complete.call(p.context, F, M);
                        y = true;
                        p.timeout && clearTimeout(H);
                        setTimeout(function() {
                            p.iframeTarget || A.remove();
                            F.responseXML = null
                        },
                        100)
                    }
                }
            }
            var B = h[0],
            D,
            I,
            p,
            n,
            z,
            A,
            E,
            F,
            Q,
            H;
            D = !!b.fn.prop;
            if (m) if (D) for (I = 0; I < m.length; I++) {
                D = b(B[m[I].name]);
                D.prop("disabled", false)
            } else for (I = 0; I < m.length; I++) {
                D = b(B[m[I].name]);
                D.removeAttr("disabled")
            }
            if (b(":input[name=submit],:input[id=submit]", B).length) alert('Error: Form elements must not have name or id of "submit".');
            else {
                p = b.extend(true, {},
                b.ajaxSettings, e);
                p.context = p.context || p;
                z = "jqFormIO" + (new Date).getTime();
                if (p.iframeTarget) {
                    A = b(p.iframeTarget);
                    D = A.attr("name");
                    if (D == null) A.attr("name", z);
                    else z = D
                } else {
                    A = b('<iframe name="' + z + '" src="' + p.iframeSrc + '" />');
                    A.css({
                        position: "absolute",
                        top: "-1000px",
                        left: "-1000px"
                    })
                }
                E = A[0];
                F = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function() {},
                    getResponseHeader: function() {},
                    setRequestHeader: function() {},
                    abort: function(M) {
                        var O = M === "timeout" ? "timeout": "aborted";
                        c("aborting upload... " + O);
                        this.aborted = 1;
                        A.attr("src", p.iframeSrc);
                        F.error = O;
                        p.error && p.error.call(p.context, F, O, M);
                        n && b.event.trigger("ajaxError", [F, p, O]);
                        p.complete && p.complete.call(p.context, F, O)
                    }
                };
                (n = p.global) && !b.active++&&b.event.trigger("ajaxStart");
                n && b.event.trigger("ajaxSend", [F, p]);
                if (p.beforeSend && p.beforeSend.call(p.context, F, p) === false) p.global && b.active--;
                else if (!F.aborted) {
                    if (m = B.clk) if ((D = m.name) && !m.disabled) {
                        p.extraData = p.extraData || {};
                        p.extraData[D] = m.value;
                        if (m.type == "image") {
                            p.extraData[D + ".x"] = B.clk_x;
                            p.extraData[D + ".y"] = B.clk_y
                        }
                    }
                    var G = 1,
                    K = 2;
                    p.forceSync ? v() : setTimeout(v, 10);
                    var N, s, x = 50,
                    y, C = b.parseXML ||
                    function(M, O) {
                        if (window.ActiveXObject) {
                            O = new ActiveXObject("Microsoft.XMLDOM");
                            O.async = "false";
                            O.loadXML(M)
                        } else O = (new DOMParser).parseFromString(M, "text/xml");
                        return O && O.documentElement && O.documentElement.nodeName != "parsererror" ? O: null
                    },
                    J = b.parseJSON ||
                    function(M) {
                        return window.eval("(" + M + ")")
                    },
                    L = function(M, O, S) {
                        var R = M.getResponseHeader("content-type") || "",
                        T = O === "xml" || !O && R.indexOf("xml") >= 0;
                        M = T ? M.responseXML: M.responseText;
                        T && M.documentElement.nodeName === "parsererror" && b.error && b.error("parsererror");
                        if (S && S.dataFilter) M = S.dataFilter(M, O);
                        if (typeof M === "string") if (O === "json" || !O && R.indexOf("json") >= 0) M = J(M);
                        else if (O === "script" || !O && R.indexOf("javascript") >= 0) b.globalEval(M);
                        return M
                    }
                }
            }
        }
        if (!this.length) {
            c("ajaxSubmit: skipping submit process - no element selected");
            return this
        }
        var f, d, h = this;
        if (typeof e == "function") e = {
            success: e
        };
        f = this.attr("method");
        d = this.attr("action");
        if (d = (d = typeof d === "string" ? b.trim(d) : "") || window.location.href || "") d = (d.match(/^([^#]+)/) || [])[1];
        e = b.extend(true, {
            url: d,
            success: b.ajaxSettings.success,
            type: f || "GET",
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false": "about:blank"
        },
        e);
        d = {};
        this.trigger("form-pre-serialize", [this, e, d]);
        if (d.veto) {
            c("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
            return this
        }
        if (e.beforeSerialize && e.beforeSerialize(this, e) === false) {
            c("ajaxSubmit: submit aborted via beforeSerialize callback");
            return this
        }
        var j, k, l = this.formToArray(e.semantic);
        if (e.data) {
            e.extraData = e.data;
            for (j in e.data) if (b.isArray(e.data[j])) for (var r in e.data[j]) l.push({
                name: j,
                value: e.data[j][r]
            });
            else {
                k = e.data[j];
                k = b.isFunction(k) ? k() : k;
                l.push({
                    name: j,
                    value: k
                })
            }
        }
        if (e.beforeSubmit && e.beforeSubmit(l, this, e) === false) {
            c("ajaxSubmit: submit aborted via beforeSubmit callback");
            return this
        }
        this.trigger("form-submit-validate", [l, this, e, d]);
        if (d.veto) {
            c("ajaxSubmit: submit vetoed via form-submit-validate trigger");
            return this
        }
        j = b.param(l);
        if (e.type.toUpperCase() == "GET") {
            e.url += (e.url.indexOf("?") >= 0 ? "&": "?") + j;
            e.data = null
        } else e.data = j;
        var u = [];
        e.resetForm && u.push(function() {
            h.resetForm()
        });
        e.clearForm && u.push(function() {
            h.clearForm()
        });
        if (!e.dataType && e.target) {
            var o = e.success ||
            function() {};
            u.push(function(m) {
                var q = e.replaceTarget ? "replaceWith": "html";
                b(e.target)[q](m).each(o, arguments)
            })
        } else e.success && u.push(e.success);
        e.success = function(m, q, v) {
            for (var w = e.context || e, B = 0, D = u.length; B < D; B++) u[B].apply(w, [m, q, v || h, h])
        };
        j = b("input:file", this).length > 0;
        r = h.attr("enctype") == "multipart/form-data" || h.attr("encoding") == "multipart/form-data";
        if (e.iframe !== false && (j || e.iframe || r)) e.closeKeepAlive ? b.get(e.closeKeepAlive,
        function() {
            g(l)
        }) : g(l);
        else {
            if (b.browser.msie && f == "get" && typeof e.type === "undefined") {
                j = h[0].getAttribute("method");
                if (typeof j === "string") e.type = j
            }
            b.ajax(e)
        }
        this.trigger("form-submit-notify", [this, e]);
        return this
    };
    b.fn.ajaxForm = function(e) {
        if (this.length === 0) {
            var g = {
                s: this.selector,
                c: this.context
            };
            if (!b.isReady && g.s) {
                c("DOM not ready, queuing ajaxForm");
                b(function() {
                    b(g.s, g.c).ajaxForm(e)
                });
                return this
            }
            c("terminating; zero elements found by selector" + (b.isReady ? "": " (DOM not ready)"));
            return this
        }
        return this.ajaxFormUnbind().bind("submit.form-plugin",
        function(f) {
            if (!f.isDefaultPrevented()) {
                f.preventDefault();
                b(this).ajaxSubmit(e)
            }
        }).bind("click.form-plugin",
        function(f) {
            var d = f.target,
            h = b(d);
            if (!h.is(":submit,input:image")) {
                d = h.closest(":submit");
                if (d.length == 0) return;
                d = d[0]
            }
            var j = this;
            j.clk = d;
            if (d.type == "image") if (f.offsetX != undefined) {
                j.clk_x = f.offsetX;
                j.clk_y = f.offsetY
            } else if (typeof b.fn.offset == "function") {
                h = h.offset();
                j.clk_x = f.pageX - h.left;
                j.clk_y = f.pageY - h.top
            } else {
                j.clk_x = f.pageX - d.offsetLeft;
                j.clk_y = f.pageY - d.offsetTop
            }
            setTimeout(function() {
                j.clk = j.clk_x = j.clk_y = null
            },
            100)
        })
    };
    b.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin click.form-plugin")
    };
    b.fn.formToArray = function(e) {
        var g = [];
        if (this.length === 0) return g;
        var f = this[0],
        d = e ? f.getElementsByTagName("*") : f.elements;
        if (!d) return g;
        var h, j, k, l, r, u;
        h = 0;
        for (r = d.length; h < r; h++) {
            j = d[h];
            if (k = j.name) if (e && f.clk && j.type == "image") {
                if (!j.disabled && f.clk == j) {
                    g.push({
                        name: k,
                        value: b(j).val()
                    });
                    g.push({
                        name: k + ".x",
                        value: f.clk_x
                    },
                    {
                        name: k + ".y",
                        value: f.clk_y
                    })
                }
            } else if ((l = b.fieldValue(j, true)) && l.constructor == Array) {
                j = 0;
                for (u = l.length; j < u; j++) g.push({
                    name: k,
                    value: l[j]
                })
            } else l !== null && typeof l != "undefined" && g.push({
                name: k,
                value: l
            })
        }
        if (!e && f.clk) {
            e = b(f.clk);
            d = e[0];
            if ((k = d.name) && !d.disabled && d.type == "image") {
                g.push({
                    name: k,
                    value: e.val()
                });
                g.push({
                    name: k + ".x",
                    value: f.clk_x
                },
                {
                    name: k + ".y",
                    value: f.clk_y
                })
            }
        }
        return g
    };
    b.fn.formSerialize = function(e) {
        return b.param(this.formToArray(e))
    };
    b.fn.fieldSerialize = function(e) {
        var g = [];
        this.each(function() {
            var f = this.name;
            if (f) {
                var d = b.fieldValue(this, e);
                if (d && d.constructor == Array) for (var h = 0, j = d.length; h < j; h++) g.push({
                    name: f,
                    value: d[h]
                });
                else d !== null && typeof d != "undefined" && g.push({
                    name: this.name,
                    value: d
                })
            }
        });
        return b.param(g)
    };
    b.fn.fieldValue = function(e) {
        for (var g = [], f = 0, d = this.length; f < d; f++) {
            var h = b.fieldValue(this[f], e);
            h === null || typeof h == "undefined" || h.constructor == Array && !h.length || (h.constructor == Array ? b.merge(g, h) : g.push(h))
        }
        return g
    };
    b.fieldValue = function(e, g) {
        var f = e.name,
        d = e.type,
        h = e.tagName.toLowerCase();
        if (g === undefined) g = true;
        if (g && (!f || e.disabled || d == "reset" || d == "button" || (d == "checkbox" || d == "radio") && !e.checked || (d == "submit" || d == "image") && e.form && e.form.clk != e || h == "select" && e.selectedIndex == -1)) return null;
        if (h == "select") {
            h = e.selectedIndex;
            if (h < 0) return null;
            g = [];
            e = e.options;
            f = (d = d == "select-one") ? h + 1 : e.length;
            for (h = d ? h: 0; h < f; h++) {
                var j = e[h];
                if (j.selected) {
                    var k = j.value;
                    k || (k = j.attributes && j.attributes.value && !j.attributes.value.specified ? j.text: j.value);
                    if (d) return k;
                    g.push(k)
                }
            }
            return g
        }
        return b(e).val()
    };
    b.fn.clearForm = function() {
        return this.each(function() {
            b("input,select,textarea", this).clearFields()
        })
    };
    b.fn.clearFields = b.fn.clearInputs = function() {
        var e = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function() {
            var g = this.type,
            f = this.tagName.toLowerCase();
            if (e.test(g) || f == "textarea") this.value = "";
            else if (g == "checkbox" || g == "radio") this.checked = false;
            else if (f == "select") this.selectedIndex = -1
        })
    };
    b.fn.resetForm = function() {
        return this.each(function() {
            if (typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) this.reset()
        })
    };
    b.fn.enable = function(e) {
        if (e === undefined) e = true;
        return this.each(function() {
            this.disabled = !e
        })
    };
    b.fn.selected = function(e) {
        if (e === undefined) e = true;
        return this.each(function() {
            var g = this.type;
            if (g == "checkbox" || g == "radio") this.checked = e;
            else if (this.tagName.toLowerCase() == "option") {
                g = b(this).parent("select");
                e && g[0] && g[0].type == "select-one" && g.find("option").selected(false);
                this.selected = e
            }
        })
    };
    b.fn.ajaxSubmit.debug = false
})(window.jQuery || window.Zepto);
eval(function(b, c, e, g, f, d) {
    f = function(h) {
        return (h < c ? "": f(parseInt(h / c))) + ((h %= c) > 35 ? String.fromCharCode(h + 29) : h.toString(36))
    };
    if (!"".replace(/^/, String)) {
        for (; e--;) d[f(e)] = g[e] || f(e);
        g = [function(h) {
            return d[h]
        }];
        f = function() {
            return "\\w+"
        };
        e = 1
    }
    for (; e--;) if (g[e]) b = b.replace(new RegExp("\\b" + f(e) + "\\b", "g"), g[e]);
    return b
} ("(9($){$.1s.A=9(o){z 4.14(9(){2H r(4,o)})};8 q={W:F,23:1,1G:1,u:7,15:3,16:7,1H:'2I',24:'2J',1i:0,B:7,1j:7,1I:7,25:7,26:7,27:7,28:7,29:7,2a:7,2b:7,1J:'<N></N>',1K:'<N></N>',2c:'2d',2e:'2d',1L:7,1M:7};$.A=9(e,o){4.5=$.17({},q,o||{});4.Q=F;4.D=7;4.H=7;4.t=7;4.R=7;4.S=7;4.O=!4.5.W?'1N':'2f';4.E=!4.5.W?'2g':'2h';8 a='',1d=e.J.1d(' ');1k(8 i=0;i<1d.K;i++){6(1d[i].2i('A-2j')!=-1){$(e).1t(1d[i]);8 a=1d[i];1l}}6(e.2k=='2K'||e.2k=='2L'){4.t=$(e);4.D=4.t.18();6(4.D.1m('A-H')){6(!4.D.18().1m('A-D'))4.D=4.D.B('<N></N>');4.D=4.D.18()}X 6(!4.D.1m('A-D'))4.D=4.t.B('<N></N>').18()}X{4.D=$(e);4.t=$(e).2M('>2l,>2m,N>2l,N>2m')}6(a!=''&&4.D.18()[0].J.2i('A-2j')==-1)4.D.B('<N 2N=\" '+a+'\"></N>');4.H=4.t.18();6(!4.H.K||!4.H.1m('A-H'))4.H=4.t.B('<N></N>').18();4.S=$('.A-11',4.D);6(4.S.u()==0&&4.5.1K!=7)4.S=4.H.1u(4.5.1K).11();4.S.V(4.J('A-11'));4.R=$('.A-19',4.D);6(4.R.u()==0&&4.5.1J!=7)4.R=4.H.1u(4.5.1J).11();4.R.V(4.J('A-19'));4.H.V(4.J('A-H'));4.t.V(4.J('A-t'));4.D.V(4.J('A-D'));8 b=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 c=4.t.2O('1v');8 d=4;6(c.u()>0){8 f=0,i=4.5.1G;c.14(9(){d.1P(4,i++);f+=d.T(4,b)});4.t.y(4.O,f+'U');6(!o||o.u===L)4.5.u=c.u()}4.D.y('1w','1x');4.R.y('1w','1x');4.S.y('1w','1x');4.2n=9(){d.19()};4.2o=9(){d.11()};4.1Q=9(){d.2p()};6(4.5.1j!=7)4.5.1j(4,'2q');6($.2r.2s){4.1e(F,F);$(2t).1y('2P',9(){d.1z()})}X 4.1z()};8 r=$.A;r.1s=r.2Q={A:'0.2.3'};r.1s.17=r.17=$.17;r.1s.17({1z:9(){4.C=7;4.G=7;4.Y=7;4.12=7;4.1a=F;4.1f=7;4.P=7;4.Z=F;6(4.Q)z;4.t.y(4.E,4.1A(4.5.1G)+'U');8 p=4.1A(4.5.23);4.Y=4.12=7;4.1p(p,F);$(2t).1R('2u',4.1Q).1y('2u',4.1Q)},2v:9(){4.t.2w();4.t.y(4.E,'2R');4.t.y(4.O,'2S');6(4.5.1j!=7)4.5.1j(4,'2v');4.1z()},2p:9(){6(4.P!=7&&4.Z)4.t.y(4.E,r.I(4.t.y(4.E))+4.P);4.P=7;4.Z=F;6(4.5.1I!=7)4.5.1I(4);6(4.5.16!=7){8 a=4;8 b=1n.1O(4.1o()/4.5.16),O=0,E=0;$('1v',4.t).14(9(i){O+=a.T(4,b);6(i+1<a.C)E=O});4.t.y(4.O,O+'U');4.t.y(4.E,-E+'U')}4.15(4.C,F)},2T:9(){4.Q=1g;4.1e()},2U:9(){4.Q=F;4.1e()},u:9(s){6(s!=L){4.5.u=s;6(!4.Q)4.1e()}z 4.5.u},2V:9(i,a){6(a==L||!a)a=i;6(4.5.u!==7&&a>4.5.u)a=4.5.u;1k(8 j=i;j<=a;j++){8 e=4.M(j);6(!e.K||e.1m('A-1b-1B'))z F}z 1g},M:9(i){z $('.A-1b-'+i,4.t)},2x:9(i,s){8 e=4.M(i),1S=0,2x=0;6(e.K==0){8 c,e=4.1C(i),j=r.I(i);1q(c=4.M(--j)){6(j<=0||c.K){j<=0?4.t.2y(e):c.1T(e);1l}}}X 1S=4.T(e);e.1t(4.J('A-1b-1B'));1U s=='2W'?e.2X(s):e.2w().2Y(s);8 a=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 b=4.T(e,a)-1S;6(i>0&&i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))-b+'U');4.t.y(4.O,r.I(4.t.y(4.O))+b+'U');z e},1V:9(i){8 e=4.M(i);6(!e.K||(i>=4.C&&i<=4.G))z;8 d=4.T(e);6(i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))+d+'U');e.1V();4.t.y(4.O,r.I(4.t.y(4.O))-d+'U')},19:9(){4.1D();6(4.P!=7&&!4.Z)4.1W(F);X 4.15(((4.5.B=='1X'||4.5.B=='G')&&4.5.u!=7&&4.G==4.5.u)?1:4.C+4.5.15)},11:9(){4.1D();6(4.P!=7&&4.Z)4.1W(1g);X 4.15(((4.5.B=='1X'||4.5.B=='C')&&4.5.u!=7&&4.C==1)?4.5.u:4.C-4.5.15)},1W:9(b){6(4.Q||4.1a||!4.P)z;8 a=r.I(4.t.y(4.E));!b?a-=4.P:a+=4.P;4.Z=!b;4.Y=4.C;4.12=4.G;4.1p(a)},15:9(i,a){6(4.Q||4.1a)z;4.1p(4.1A(i),a)},1A:9(i){6(4.Q||4.1a)z;i=r.I(i);6(4.5.B!='1c')i=i<1?1:(4.5.u&&i>4.5.u?4.5.u:i);8 a=4.C>i;8 b=r.I(4.t.y(4.E));8 f=4.5.B!='1c'&&4.C<=1?1:4.C;8 c=a?4.M(f):4.M(4.G);8 j=a?f:f-1;8 e=7,l=0,p=F,d=0;1q(a?--j>=i:++j<i){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c[a?'1u':'1T'](e)}c=e;d=4.T(e);6(p)l+=d;6(4.C!=7&&(4.5.B=='1c'||(j>=1&&(4.5.u==7||j<=4.5.u))))b=a?b+d:b-d}8 g=4.1o();8 h=[];8 k=0,j=i,v=0;8 c=4.M(i-1);1q(++k){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c.K==0?4.t.2y(e):c[a?'1u':'1T'](e)}c=e;8 d=4.T(e);6(d==0){2Z('30: 31 1N/2f 32 1k 33. 34 35 36 37 38 39. 3a...');z 0}6(4.5.B!='1c'&&4.5.u!==7&&j>4.5.u)h.3b(e);X 6(p)l+=d;v+=d;6(v>=g)1l;j++}1k(8 x=0;x<h.K;x++)h[x].1V();6(l>0){4.t.y(4.O,4.T(4.t)+l+'U');6(a){b-=l;4.t.y(4.E,r.I(4.t.y(4.E))-l+'U')}}8 n=i+k-1;6(4.5.B!='1c'&&4.5.u&&n>4.5.u)n=4.5.u;6(j>n){k=0,j=n,v=0;1q(++k){8 e=4.M(j--);6(!e.K)1l;v+=4.T(e);6(v>=g)1l}}8 o=n-k+1;6(4.5.B!='1c'&&o<1)o=1;6(4.Z&&a){b+=4.P;4.Z=F}4.P=7;6(4.5.B!='1c'&&n==4.5.u&&(n-k+1)>=1){8 m=r.10(4.M(n),!4.5.W?'1r':'1Y');6((v-m)>g)4.P=v-g-m}1q(i--\>o)b+=4.T(4.M(i));4.Y=4.C;4.12=4.G;4.C=o;4.G=n;z b},1p:9(p,a){6(4.Q||4.1a)z;4.1a=1g;8 b=4;8 c=9(){b.1a=F;6(p==0)b.t.y(b.E,0);6(b.5.B=='1X'||b.5.B=='G'||b.5.u==7||b.G<b.5.u)b.2z();b.1e();b.1Z('2A')};4.1Z('3c');6(!4.5.1H||a==F){4.t.y(4.E,p+'U');c()}X{8 o=!4.5.W?{'2g':p}:{'2h':p};4.t.1p(o,4.5.1H,4.5.24,c)}},2z:9(s){6(s!=L)4.5.1i=s;6(4.5.1i==0)z 4.1D();6(4.1f!=7)z;8 a=4;4.1f=3d(9(){a.19()},4.5.1i*3e)},1D:9(){6(4.1f==7)z;3f(4.1f);4.1f=7},1e:9(n,p){6(n==L||n==7){8 n=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='C')||4.5.u==7||4.G<4.5.u);6(!4.Q&&(!4.5.B||4.5.B=='C')&&4.5.u!=7&&4.G>=4.5.u)n=4.P!=7&&!4.Z}6(p==L||p==7){8 p=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='G')||4.C>1);6(!4.Q&&(!4.5.B||4.5.B=='G')&&4.5.u!=7&&4.C==1)p=4.P!=7&&4.Z}8 a=4;4.R[n?'1y':'1R'](4.5.2c,4.2n)[n?'1t':'V'](4.J('A-19-1E')).20('1E',n?F:1g);4.S[p?'1y':'1R'](4.5.2e,4.2o)[p?'1t':'V'](4.J('A-11-1E')).20('1E',p?F:1g);6(4.R.K>0&&(4.R[0].1h==L||4.R[0].1h!=n)&&4.5.1L!=7){4.R.14(9(){a.5.1L(a,4,n)});4.R[0].1h=n}6(4.S.K>0&&(4.S[0].1h==L||4.S[0].1h!=p)&&4.5.1M!=7){4.S.14(9(){a.5.1M(a,4,p)});4.S[0].1h=p}},1Z:9(a){8 b=4.Y==7?'2q':(4.Y<4.C?'19':'11');4.13('25',a,b);6(4.Y!==4.C){4.13('26',a,b,4.C);4.13('27',a,b,4.Y)}6(4.12!==4.G){4.13('28',a,b,4.G);4.13('29',a,b,4.12)}4.13('2a',a,b,4.C,4.G,4.Y,4.12);4.13('2b',a,b,4.Y,4.12,4.C,4.G)},13:9(a,b,c,d,e,f,g){6(4.5[a]==L||(1U 4.5[a]!='2B'&&b!='2A'))z;8 h=1U 4.5[a]=='2B'?4.5[a][b]:4.5[a];6(!$.3g(h))z;8 j=4;6(d===L)h(j,c,b);X 6(e===L)4.M(d).14(9(){h(j,4,d,c,b)});X{1k(8 i=d;i<=e;i++)6(i!==7&&!(i>=f&&i<=g))4.M(i).14(9(){h(j,4,i,c,b)})}},1C:9(i){z 4.1P('<1v></1v>',i)},1P:9(e,i){8 a=$(e).V(4.J('A-1b')).V(4.J('A-1b-'+i));a.20('3h',i);z a},J:9(c){z c+' '+c+(!4.5.W?'-3i':'-W')},T:9(e,d){8 a=e.2C!=L?e[0]:e;8 b=!4.5.W?a.1F+r.10(a,'2D')+r.10(a,'1r'):a.2E+r.10(a,'2F')+r.10(a,'1Y');6(d==L||b==d)z b;8 w=!4.5.W?d-r.10(a,'2D')-r.10(a,'1r'):d-r.10(a,'2F')-r.10(a,'1Y');$(a).y(4.O,w+'U');z 4.T(a)},1o:9(){z!4.5.W?4.H[0].1F-r.I(4.H.y('3j'))-r.I(4.H.y('3k')):4.H[0].2E-r.I(4.H.y('3l'))-r.I(4.H.y('3m'))},3n:9(i,s){6(s==L)s=4.5.u;z 1n.3o((((i-1)/s)-1n.3p((i-1)/s))*s)+1}});r.17({3q:9(d){z $.17(q,d||{})},10:9(e,p){6(!e)z 0;8 a=e.2C!=L?e[0]:e;6(p=='1r'&&$.2r.2s){8 b={'1w':'1x','3r':'3s','1N':'1i'},21,22;$.2G(a,b,9(){21=a.1F});b['1r']=0;$.2G(a,b,9(){22=a.1F});z 22-21}z r.I($.y(a,p))},I:9(v){v=3t(v);z 3u(v)?0:v}})})(3v);", 62, 218, "||||this|options|if|null|var|function||||||||||||||||||||list|size||||css|return|jcarousel|wrap|first|container|lt|false|last|clip|intval|className|length|undefined|get|div|wh|tail|locked|buttonNext|buttonPrev|dimension|px|addClass|vertical|else|prevFirst|inTail|margin|prev|prevLast|callback|each|scroll|visible|extend|parent|next|animating|item|circular|split|buttons|timer|true|jcarouselstate|auto|initCallback|for|break|hasClass|Math|clipping|animate|while|marginRight|fn|removeClass|before|li|display|block|bind|setup|pos|placeholder|create|stopAuto|disabled|offsetWidth|offset|animation|reloadCallback|buttonNextHTML|buttonPrevHTML|buttonNextCallback|buttonPrevCallback|width|ceil|format|funcResize|unbind|old|after|typeof|remove|scrollTail|both|marginBottom|notify|attr|oWidth|oWidth2|start|easing|itemLoadCallback|itemFirstInCallback|itemFirstOutCallback|itemLastInCallback|itemLastOutCallback|itemVisibleInCallback|itemVisibleOutCallback|buttonNextEvent|click|buttonPrevEvent|height|left|top|indexOf|skin|nodeName|ul|ol|funcNext|funcPrev|reload|init|browser|safari|window|resize|reset|empty|add|prepend|startAuto|onAfterAnimation|object|jquery|marginLeft|offsetHeight|marginTop|swap|new|normal|swing|UL|OL|find|class|children|load|prototype|0px|10px|lock|unlock|has|string|html|append|alert|jCarousel|No|set|items|This|will|cause|an|infinite|loop|Aborting|push|onBeforeAnimation|setTimeout|1000|clearTimeout|isFunction|jcarouselindex|horizontal|borderLeftWidth|borderRightWidth|borderTopWidth|borderBottomWidth|index|round|floor|defaults|float|none|parseInt|isNaN|jQuery".split("|"), 0, {}));
(function(b) {
    b.alerts = {
        verticalOffset: -75,
        horizontalOffset: 0,
        repositionOnResize: true,
        overlayOpacity: 0.01,
        overlayColor: "#FFF",
        draggable: true,
        okButton: "&nbsp;Delete&nbsp;",
        cancelButton: "&nbsp;Cancel&nbsp;",
        dialogClass: null,
        alert: function(c, e, g) {
            if (e == null) e = "Alert";
            b.alerts._show(e, c, null, "alert",
            function(f) {
                g && g(f)
            })
        },
        confirm: function(c, e, g) {
            if (e == null) e = "Confirm";
            b.alerts._show(e, c, null, "confirm",
            function(f) {
                g && g(f)
            })
        },
        prompt: function(c, e, g, f) {
            if (g == null) g = "Prompt";
            b.alerts._show(g, c, e, "prompt",
            function(d) {
                f && f(d)
            })
        },
        _show: function(c, e, g, f, d) {
            b.alerts._hide();
            b.alerts._overlay("show");
            b("BODY").append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');
            b.alerts.dialogClass && b("#popup_container").addClass(b.alerts.dialogClass);
            var h = b.browser.msie && parseInt(b.browser.version) <= 6 ? "absolute": "fixed";
            b("#popup_container").css({
                position: h,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });
            b("#popup_title").text(c);
            b("#popup_content").addClass(f);
            b("#popup_message").text(e);
            b("#popup_message").html(b("#popup_message").text().replace(/\n/g, "<br />"));
            b("#popup_container").css({
                minWidth: b("#popup_container").outerWidth(),
                maxWidth: b("#popup_container").outerWidth()
            });
            b.alerts._reposition();
            b.alerts._maintainPosition(true);
            switch (f) {
            case "alert":
                b("#popup_message").after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /></div>');
                b("#popup_ok").click(function() {
                    b.alerts._hide();
                    d(true)
                });
                b("#popup_ok").focus().keypress(function(k) {
                    if (k.keyCode == 13 || k.keyCode == 27) b("#popup_ok").trigger("click")
                });
                break;
            case "confirm":
                b("#popup_message").after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>');
                b("#popup_ok").click(function() {
                    b.alerts._hide();
                    d && d(true)
                });
                b("#popup_cancel").click(function() {
                    b.alerts._hide();
                    d && d(false)
                });
                b("#popup_ok").focus();
                b("#popup_ok, #popup_cancel").keypress(function(k) {
                    k.keyCode == 13 && b("#popup_ok").trigger("click");
                    k.keyCode == 27 && b("#popup_cancel").trigger("click")
                });
                break;
            case "prompt":
                b("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>');
                b("#popup_prompt").width(b("#popup_message").width());
                b("#popup_ok").click(function() {
                    var k = b("#popup_prompt").val();
                    b.alerts._hide();
                    d && d(k)
                });
                b("#popup_cancel").click(function() {
                    b.alerts._hide();
                    d && d(null)
                });
                b("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(k) {
                    k.keyCode == 13 && b("#popup_ok").trigger("click");
                    k.keyCode == 27 && b("#popup_cancel").trigger("click")
                });
                g && b("#popup_prompt").val(g);
                b("#popup_prompt").focus().select();
                break
            }
            if (b.alerts.draggable) try {
                b("#popup_container").draggable({
                    handle: b("#popup_title")
                });
                b("#popup_title").css({
                    cursor: "move"
                })
            } catch(j) {}
        },
        _hide: function() {
            b("#popup_container").remove();
            b.alerts._overlay("hide");
            b.alerts._maintainPosition(false)
        },
        _overlay: function(c) {
            switch (c) {
            case "show":
                b.alerts._overlay("hide");
                b("BODY").append('<div id="popup_overlay"></div>');
                b("#popup_overlay").css({
                    position:
                    "absolute",
                    zIndex: 99998,
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: b(document).height(),
                    background: b.alerts.overlayColor,
                    opacity: b.alerts.overlayOpacity
                });
                break;
            case "hide":
                b("#popup_overlay").remove();
                break
            }
        },
        _reposition: function() {
            var c = b(window).height() / 2 - b("#popup_container").outerHeight() / 2 + b.alerts.verticalOffset,
            e = b(window).width() / 2 - b("#popup_container").outerWidth() / 2 + b.alerts.horizontalOffset;
            if (c < 0) c = 0;
            if (e < 0) e = 0;
            if (b.browser.msie && parseInt(b.browser.version) <= 6) c += b(window).scrollTop();
            b("#popup_container").css({
                top: c + "px",
                left: e + "px"
            });
            b("#popup_overlay").height(b(document).height())
        },
        _maintainPosition: function(c) {
            if (b.alerts.repositionOnResize) switch (c) {
            case true:
                b(window).bind("resize", b.alerts._reposition);
                break;
            case false:
                b(window).unbind("resize", b.alerts._reposition);
                break
            }
        }
    };
    jAlert = function(c, e, g) {
        b.alerts.alert(c, e, g)
    };
    jConfirm = function(c, e, g) {
        b.alerts.confirm(c, e, g)
    };
    jPrompt = function(c, e, g, f) {
        b.alerts.prompt(c, e, g, f)
    }
})(jQuery);
(function(b) {
    b.fn.tipsy = function(c) {
        c = b.extend({},
        b.fn.tipsy.defaults, c);
        return this.each(function() {
            var e = b.fn.tipsy.elementOptions(this, c);
            b(this).hover(function() {
                b.data(this, "cancel.tipsy", true);
                var g = b.data(this, "active.tipsy");
                if (!g) {
                    g = b('<div class="tipsy"><div class="tipsy-inner"/></div>');
                    g.css({
                        position: "absolute",
                        zIndex: 1E5
                    });
                    b.data(this, "active.tipsy", g)
                }
                if (b(this).attr("title") || typeof b(this).attr("original-title") != "string") b(this).attr("original-title", b(this).attr("title") || "").removeAttr("title");
                var f;
                if (typeof e.title == "string") f = b(this).attr(e.title == "title" ? "original-title": e.title);
                else if (typeof e.title == "function") f = e.title.call(this);
                g.find(".tipsy-inner")[e.html ? "html": "text"](f || e.fallback);
                f = b.extend({},
                b(this).offset(), {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                });
                g.get(0).className = "tipsy";
                g.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).appendTo(document.body);
                var d = g[0].offsetWidth,
                h = g[0].offsetHeight;
                switch ((typeof e.gravity == "function" ? e.gravity.call(this) : e.gravity).charAt(0)) {
                case "n":
                    g.css({
                        top:
                        f.top + f.height,
                        left: f.left + f.width / 2 - d / 2
                    }).addClass("tipsy-north");
                    break;
                case "s":
                    g.css({
                        top:
                        f.top - h,
                        left: f.left + f.width / 2 - d / 2
                    }).addClass("tipsy-south");
                    break;
                case "e":
                    g.css({
                        top:
                        f.top + f.height / 2 - h / 2,
                        left: f.left - d
                    }).addClass("tipsy-east");
                    break;
                case "w":
                    g.css({
                        top:
                        f.top + f.height / 2 - h / 2,
                        left: f.left + f.width
                    }).addClass("tipsy-west");
                    break
                }
                e.fade ? g.css({
                    opacity: 0,
                    display: "block",
                    visibility: "visible"
                }).animate({
                    opacity: 0.8
                }) : g.css({
                    visibility: "visible"
                })
            },
            function() {
                b.data(this, "cancel.tipsy", false);
                var g = this;
                setTimeout(function() {
                    if (!b.data(this, "cancel.tipsy")) {
                        var f = b.data(g, "active.tipsy");
                        e.fade ? f.stop().fadeOut(function() {
                            b(this).remove()
                        }) : f.remove()
                    }
                },
                100)
            })
        })
    };
    b.fn.tipsy.elementOptions = function(c, e) {
        return b.metadata ? b.extend({},
        e, b(c).metadata()) : e
    };
    b.fn.tipsy.defaults = {
        fade: false,
        fallback: "",
        gravity: "n",
        html: false,
        title: "title"
    };
    b.fn.tipsy.autoNS = function() {
        return b(this).offset().top > b(document).scrollTop() + b(window).height() / 2 ? "s": "n"
    };
    b.fn.tipsy.autoWE = function() {
        return b(this).offset().left > b(document).scrollLeft() + b(window).width() / 2 ? "e": "w"
    }
})(jQuery);
new(function(b) {
    var c = b.separator || "&",
    e = b.spaces === false ? false: true,
    g = (b.prefix === false ? false: true) ? b.hash === true ? "#": "?": "",
    f = b.numbers === false ? false: true;
    jQuery.query = new(function() {
        var d = function(l, r) {
            return l != undefined && l !== null && (r ? l.constructor == r: true)
        },
        h = function(l) {
            for (var r = /\[([^[]*)\]/g, u = /^([^[]+)(\[.*\])?$/.exec(l), o = u[1], m = []; l = r.exec(u[2]);) m.push(l[1]);
            return [o, m]
        },
        j = function(l, r, u) {
            var o = r.shift();
            if (typeof l != "object") l = null;
            if (o === "") {
                l || (l = []);
                if (d(l, Array)) l.push(r.length == 0 ? u: j(null, r.slice(0), u));
                else if (d(l, Object)) {
                    for (o = 0; l[o++] != null;);
                    l[--o] = r.length == 0 ? u: j(l[o], r.slice(0), u)
                } else {
                    l = [];
                    l.push(r.length == 0 ? u: j(null, r.slice(0), u))
                }
            } else if (o && o.match(/^\s*[0-9]+\s*$/)) {
                var m = parseInt(o, 10);
                l || (l = []);
                l[m] = r.length == 0 ? u: j(l[m], r.slice(0), u)
            } else if (o) {
                m = o.replace(/^\s*|\s*$/g, "");
                l || (l = {});
                if (d(l, Array)) {
                    var q = {};
                    for (o = 0; o < l.length; ++o) q[o] = l[o];
                    l = q
                }
                l[m] = r.length == 0 ? u: j(l[m], r.slice(0), u)
            } else return u;
            return l
        },
        k = function(l) {
            var r = this;
            r.keys = {};
            l.queryObject ? jQuery.each(l.get(),
            function(u, o) {
                r.SET(u, o)
            }) : jQuery.each(arguments,
            function() {
                var u = "" + this;
                u = u.replace(/^[?#]/, "");
                u = u.replace(/[;&]$/, "");
                if (e) u = u.replace(/[+]/g, " ");
                jQuery.each(u.split(/[&;]/),
                function() {
                    var o = decodeURIComponent(this.split("=")[0] || ""),
                    m = decodeURIComponent(this.split("=")[1] || "");
                    if (o) {
                        if (f) if (/^[+-]?[0-9]+\.[0-9]*$/.test(m)) m = parseFloat(m);
                        else if (/^[+-]?[0-9]+$/.test(m)) m = parseInt(m, 10);
                        m = !m && m !== 0 ? true: m;
                        if (m !== false && m !== true && typeof m != "number") m = m;
                        r.SET(o, m)
                    }
                })
            });
            return r
        };
        k.prototype = {
            queryObject: true,
            has: function(l, r) {
                l = this.get(l);
                return d(l, r)
            },
            GET: function(l) {
                if (!d(l)) return this.keys;
                var r = h(l);
                l = r[1];
                for (r = this.keys[r[0]]; r != null && l.length != 0;) r = r[l.shift()];
                return typeof r == "number" ? r: r || ""
            },
            get: function(l) {
                l = this.GET(l);
                if (d(l, Object)) return jQuery.extend(true, {},
                l);
                else if (d(l, Array)) return l.slice(0);
                return l
            },
            SET: function(l, r) {
                r = !d(r) ? null: r;
                l = h(l);
                var u = l[0];
                this.keys[u] = j(this.keys[u], l[1].slice(0), r);
                return this
            },
            set: function(l, r) {
                return this.copy().SET(l, r)
            },
            REMOVE: function(l) {
                return this.SET(l, null).COMPACT()
            },
            remove: function(l) {
                return this.copy().REMOVE(l)
            },
            EMPTY: function() {
                var l = this;
                jQuery.each(l.keys,
                function(r) {
                    delete l.keys[r]
                });
                return l
            },
            load: function(l) {
                var r = l.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"),
                u = l.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                return new k(l.length == u.length ? "": u, l.length == r.length ? "": r)
            },
            empty: function() {
                return this.copy().EMPTY()
            },
            copy: function() {
                return new k(this)
            },
            COMPACT: function() {
                function l(r) {
                    var u = typeof r == "object" ? d(r, Array) ? [] : {}: r;
                    if (typeof r == "object") {
                        function o(m, q, v) {
                            if (d(m, Array)) m.push(v);
                            else m[q] = v
                        }
                        jQuery.each(r,
                        function(m, q) {
                            if (!d(q)) return true;
                            o(u, m, l(q))
                        })
                    }
                    return u
                }
                this.keys = l(this.keys);
                return this
            },
            compact: function() {
                return this.copy().COMPACT()
            },
            toString: function() {
                var l = [],
                r = [],
                u = function(q) {
                    q += "";
                    if (e) q = q.replace(/ /g, "+");
                    return encodeURIComponent(q)
                },
                o = function(q, v, w) {
                    if (! (!d(w) || w === false)) {
                        v = [u(v)];
                        if (w !== true) {
                            v.push("=");
                            v.push(u(w))
                        }
                        q.push(v.join(""))
                    }
                },
                m = function(q, v) {
                    var w = function(B) {
                        return ! v || v == "" ? "" + B: [v, "[", B, "]"].join("")
                    };
                    jQuery.each(q,
                    function(B, D) {
                        typeof D == "object" ? m(D, w(B)) : o(r, w(B), D)
                    })
                };
                m(this.keys);
                r.length > 0 && l.push(g);
                l.push(r.join(c));
                return l.join("")
            }
        };
        return new k(location.search, location.hash)
    })
})(jQuery.query || {});
(function(b) {
    function c() {
        var h = e(this);
        isNaN(h.datetime) || b(this).text(g(h.datetime));
        return this
    }
    function e(h) {
        h = b(h);
        if (!h.data("timeago")) {
            h.data("timeago", {
                datetime: d.datetime(h)
            });
            var j = b.trim(h.text());
            j.length > 0 && h.attr("title", j)
        }
        return h.data("timeago")
    }
    function g(h) {
        return d.inWords(f(h))
    }
    function f(h) {
        return (new Date).getTime() - h.getTime()
    }
    b.timeago = function(h) {
        return h instanceof Date ? g(h) : typeof h == "string" ? g(b.timeago.parse(h)) : g(b.timeago.datetime(h))
    };
    var d = b.timeago;
    b.extend(b.timeago, {
        settings: {
            refreshMillis: 6E4,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function(h) {
            function j(v, w) {
                return (b.isFunction(v) ? v(w) : v).replace(/%d/i, k.numbers && k.numbers[w] || w)
            }
            var k = this.settings.strings,
            l = k.prefixAgo,
            r = k.suffixAgo;
            if (this.settings.allowFuture) {
                if (h < 0) {
                    l = k.prefixFromNow;
                    r = k.suffixFromNow
                }
                h = Math.abs(h)
            }
            h = h / 1E3;
            var u = h / 60,
            o = u / 60,
            m = o / 24,
            q = m / 365;
            h = h < 45 && j(k.seconds, Math.round(h)) || h < 90 && j(k.minute, 1) || u < 45 && j(k.minutes, Math.round(u)) || u < 90 && j(k.hour, 1) || o < 24 && j(k.hours, Math.round(o)) || o < 48 && j(k.day, 1) || m < 30 && j(k.days, Math.floor(m)) || m < 60 && j(k.month, 1) || m < 365 && j(k.months, Math.floor(m / 30)) || q < 2 && j(k.year, 1) || j(k.years, Math.floor(q));
            return b.trim([l, h, r].join(" "))
        },
        parse: function(h) {
            h = b.trim(h);
            h = h.replace(/-/, "/").replace(/-/, "/");
            h = h.replace(/T/, " ").replace(/Z/, " UTC");
            h = h.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2");
            h = h.replace(/(\.\d+)/, "");
            return new Date(h)
        },
        datetime: function(h) {
            h = b(h).get(0).tagName.toLowerCase() == "time" ? b(h).attr("datetime") : b(h).attr("title");
            return d.parse(h)
        }
    });
    b.fn.timeago = function() {
        var h = this;
        h.each(c);
        var j = d.settings;
        j.refreshMillis > 0 && setInterval(function() {
            h.each(c)
        },
        j.refreshMillis);
        return h
    };
    document.createElement("abbr");
    document.createElement("time")
})(jQuery);
(function(b) {
    b.pageless = function(c) {
        b.isFunction(c) ? c.call() : b.pageless.init(c)
    };
    b.pageless.settings = {
        currentPage: 1,
        pagination: ".pagination",
        url: location.href,
        params: {},
        distance: 100,
        loaderImage: "",
        marker: null,
        scrape: function(c) {
            return c
        }
    };
    b.pageless.loaderHtml = function() {
        return b.pageless.settings.loaderHtml || '<div id="pageless-loader" style="display:none;text-align:center;width:100%;"></div>'
    };
    b.pageless.init = function(c) {
        if (!b.pageless.settings.inited) {
            b.pageless.settings.inited = true;
            c && b.extend(b.pageless.settings, c);
            b.pageless.settings.pagination && b(b.pageless.settings.pagination).remove();
            b.pageless.startListener()
        }
    };
    b.pageless.isLoading = false;
    b.fn.pageless = function(c) {
        b.pageless.init(c);
        b.pageless.el = b(this);
        if (c.loader && b(this).find(c.loader).length) b.pageless.loader = b(this).find(c.loader);
        else {
            b.pageless.loader = b(b.pageless.loaderHtml());
            b(this).append(b.pageless.loader);
            c.loaderHtml || b("#pageless-loader .msg").html(c.loaderMsg)
        }
    };
    b.pageless.loading = function(c) {
        if (c === true) {
            b.pageless.isLoading = true;
            b.pageless.loader && b.pageless.loader.fadeIn("normal")
        } else {
            b.pageless.isLoading = false;
            b.pageless.loader && b.pageless.loader.fadeOut("normal")
        }
    };
    b.pageless.stopListener = function() {
        b(window).unbind(".pageless");
        b("#" + b.pageless.settings.loader).hide()
    };
    b.pageless.startListener = function() {
        b(window).bind("scroll.pageless", b.pageless.scroll);
        b("#" + b.pageless.settings.loader).show()
    };
    b.pageless.scroll = function() {
        if (b.pageless.settings.totalPages <= b.pageless.settings.currentPage) {
            b.pageless.stopListener();
            b.pageless.settings.afterStopListener && b.pageless.settings.afterStopListener.call()
        } else {
            var c = b(document).height() - b(window).scrollTop() - b(window).height();
            if (!b.pageless.isLoading && c < b.pageless.settings.distance) {
                b.pageless.loading(true);
                b.pageless.settings.currentPage++;
                b.extend(b.pageless.settings.params, {
                    page: b.pageless.settings.currentPage
                });
                b.pageless.settings.marker && b.extend(b.pageless.settings.params, {
                    marker: b.pageless.settings.marker
                });
                c = b.pageless.settings.url;
                c = c.split("#")[0];
                b.ajax({
                    url: c,
                    type: "GET",
                    dataType: "html",
                    data: b.pageless.settings.params,
                    success: function(e) {
                        e = b.pageless.settings.scrape(e);
                        b.pageless.loader ? b.pageless.loader.before(e) : b.pageless.el.append(e);
                        b.pageless.loading(false);
                        b.pageless.settings.complete && b.pageless.settings.complete.call()
                    }
                })
            }
        }
    }
})(jQuery);
(function(b) {
    b.path = {};
    var c = {
        rotate: function(e, g) {
            var f = g * 3.141592654 / 180;
            g = Math.cos(f);
            f = Math.sin(f);
            return [g * e[0] - f * e[1], f * e[0] + g * e[1]]
        },
        scale: function(e, g) {
            return [g * e[0], g * e[1]]
        },
        add: function(e, g) {
            return [e[0] + g[0], e[1] + g[1]]
        },
        minus: function(e, g) {
            return [e[0] - g[0], e[1] - g[1]]
        }
    };
    b.path.bezier = function(e) {
        e.start = b.extend({
            angle: 0,
            length: 0.3333
        },
        e.start);
        e.end = b.extend({
            angle: 0,
            length: 0.3333
        },
        e.end);
        this.p1 = [e.start.x, e.start.y];
        this.p4 = [e.end.x, e.end.y];
        var g = c.minus(this.p4, this.p1),
        f = c.scale(g, e.start.length);
        f = c.rotate(f, e.start.angle);
        this.p2 = c.add(this.p1, f);
        g = c.scale(g, -1);
        g = c.scale(g, e.end.length);
        g = c.rotate(g, e.end.angle);
        this.p3 = c.add(this.p4, g);
        this.f1 = function(d) {
            return d * d * d
        };
        this.f2 = function(d) {
            return 3 * d * d * (1 - d)
        };
        this.f3 = function(d) {
            return 3 * d * (1 - d) * (1 - d)
        };
        this.f4 = function(d) {
            return (1 - d) * (1 - d) * (1 - d)
        };
        this.css = function(d) {
            var h = this.f1(d),
            j = this.f2(d),
            k = this.f3(d);
            d = this.f4(d);
            return {
                top: this.p1[1] * h + this.p2[1] * j + this.p3[1] * k + this.p4[1] * d + "px",
                left: this.p1[0] * h + this.p2[0] * j + this.p3[0] * k + this.p4[0] * d + "px"
            }
        }
    };
    b.path.arc = function(e) {
        for (var g in e) this[g] = e[g];
        for (this.dir = this.dir || 1; this.start > this.end && this.dir > 0;) this.start -= 360;
        for (; this.start < this.end && this.dir < 0;) this.start += 360;
        this.css = function(f) {
            f = this.start * f + this.end * (1 - f);
            f = f * 3.1415927 / 180;
            var d = Math.sin(f) * this.radius + this.center[0];
            return {
                top: Math.cos(f) * this.radius + this.center[1] + "px",
                left: d + "px"
            }
        }
    };
    b.fx.step.path = function(e) {
        var g = e.end.css(1 - e.pos);
        for (var f in g) e.elem.style[f] = g[f]
    }
})(jQuery);
(function() {
    function b(s, x, y) {
        if (s === x) return s !== 0 || 1 / s == 1 / x;
        if (s == null || x == null) return s === x;
        if (s._chain) s = s._wrapped;
        if (x._chain) x = x._wrapped;
        if (s.isEqual && n.isFunction(s.isEqual)) return s.isEqual(x);
        if (x.isEqual && n.isFunction(x.isEqual)) return x.isEqual(s);
        var C = k.call(s);
        if (C != k.call(x)) return false;
        switch (C) {
        case "[object String]":
            return s == String(x);
        case "[object Number]":
            return s != +s ? x != +x: s == 0 ? 1 / s == 1 / x: s == +x;
        case "[object Date]":
        case "[object Boolean]":
            return + s == +x;
        case "[object RegExp]":
            return s.source == x.source && s.global == x.global && s.multiline == x.multiline && s.ignoreCase == x.ignoreCase
        }
        if (typeof s != "object" || typeof x != "object") return false;
        for (var J = y.length; J--;) if (y[J] == s) return true;
        y.push(s);
        J = 0;
        var L = true;
        if (C == "[object Array]") {
            J = s.length;
            if (L = J == x.length) for (; J--;) if (! (L = J in s == J in x && b(s[J], x[J], y))) break
        } else {
            if ("constructor" in s != "constructor" in x || s.constructor != x.constructor) return false;
            for (var M in s) if (n.has(s, M)) {
                J++;
                if (! (L = n.has(x, M) && b(s[M], x[M], y))) break
            }
            if (L) {
                for (M in x) if (n.has(x, M) && !J--) break;
                L = !J
            }
        }
        y.pop();
        return L
    }
    var c = this,
    e = c._,
    g = {},
    f = Array.prototype,
    d = Object.prototype,
    h = f.slice,
    j = f.unshift,
    k = d.toString,
    l = d.hasOwnProperty,
    r = f.forEach,
    u = f.map,
    o = f.reduce,
    m = f.reduceRight,
    q = f.filter,
    v = f.every,
    w = f.some,
    B = f.indexOf,
    D = f.lastIndexOf;
    d = Array.isArray;
    var I = Object.keys,
    p = Function.prototype.bind,
    n = function(s) {
        return new G(s)
    };
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) exports = module.exports = n;
        exports._ = n
    } else c._ = n;
    n.VERSION = "1.3.1";
    var z = n.each = n.forEach = function(s, x, y) {
        if (s != null) if (r && s.forEach === r) s.forEach(x, y);
        else if (s.length === +s.length) for (var C = 0, J = s.length; C < J; C++) {
            if (C in s && x.call(y, s[C], C, s) === g) return
        } else for (C in s) if (n.has(s, C)) if (x.call(y, s[C], C, s) === g) return
    };
    n.map = n.collect = function(s, x, y) {
        var C = [];
        if (s == null) return C;
        if (u && s.map === u) return s.map(x, y);
        z(s,
        function(J, L, M) {
            C[C.length] = x.call(y, J, L, M)
        });
        if (s.length === +s.length) C.length = s.length;
        return C
    };
    n.reduce = n.foldl = n.inject = function(s, x, y, C) {
        var J = arguments.length > 2;
        if (s == null) s = [];
        if (o && s.reduce === o) {
            if (C) x = n.bind(x, C);
            return J ? s.reduce(x, y) : s.reduce(x)
        }
        z(s,
        function(L, M, O) {
            if (J) y = x.call(C, y, L, M, O);
            else {
                y = L;
                J = true
            }
        });
        if (!J) throw new TypeError("Reduce of empty array with no initial value");
        return y
    };
    n.reduceRight = n.foldr = function(s, x, y, C) {
        var J = arguments.length > 2;
        if (s == null) s = [];
        if (m && s.reduceRight === m) {
            if (C) x = n.bind(x, C);
            return J ? s.reduceRight(x, y) : s.reduceRight(x)
        }
        var L = n.toArray(s).reverse();
        if (C && !J) x = n.bind(x, C);
        return J ? n.reduce(L, x, y, C) : n.reduce(L, x)
    };
    n.find = n.detect = function(s, x, y) {
        var C;
        A(s,
        function(J, L, M) {
            if (x.call(y, J, L, M)) {
                C = J;
                return true
            }
        });
        return C
    };
    n.filter = n.select = function(s, x, y) {
        var C = [];
        if (s == null) return C;
        if (q && s.filter === q) return s.filter(x, y);
        z(s,
        function(J, L, M) {
            if (x.call(y, J, L, M)) C[C.length] = J
        });
        return C
    };
    n.reject = function(s, x, y) {
        var C = [];
        if (s == null) return C;
        z(s,
        function(J, L, M) {
            x.call(y, J, L, M) || (C[C.length] = J)
        });
        return C
    };
    n.every = n.all = function(s, x, y) {
        var C = true;
        if (s == null) return C;
        if (v && s.every === v) return s.every(x, y);
        z(s,
        function(J, L, M) {
            if (! (C = C && x.call(y, J, L, M))) return g
        });
        return C
    };
    var A = n.some = n.any = function(s, x, y) {
        x || (x = n.identity);
        var C = false;
        if (s == null) return C;
        if (w && s.some === w) return s.some(x, y);
        z(s,
        function(J, L, M) {
            if (C || (C = x.call(y, J, L, M))) return g
        });
        return !! C
    };
    n.include = n.contains = function(s, x) {
        var y = false;
        if (s == null) return y;
        if (B && s.indexOf === B) return s.indexOf(x) != -1;
        return y = A(s,
        function(C) {
            return C === x
        })
    };
    n.invoke = function(s, x) {
        var y = h.call(arguments, 2);
        return n.map(s,
        function(C) {
            return (n.isFunction(x) ? x || C: C[x]).apply(C, y)
        })
    };
    n.pluck = function(s, x) {
        return n.map(s,
        function(y) {
            return y[x]
        })
    };
    n.max = function(s, x, y) {
        if (!x && n.isArray(s)) return Math.max.apply(Math, s);
        if (!x && n.isEmpty(s)) return - Infinity;
        var C = {
            computed: -Infinity
        };
        z(s,
        function(J, L, M) {
            L = x ? x.call(y, J, L, M) : J;
            L >= C.computed && (C = {
                value: J,
                computed: L
            })
        });
        return C.value
    };
    n.min = function(s, x, y) {
        if (!x && n.isArray(s)) return Math.min.apply(Math, s);
        if (!x && n.isEmpty(s)) return Infinity;
        var C = {
            computed: Infinity
        };
        z(s,
        function(J, L, M) {
            L = x ? x.call(y, J, L, M) : J;
            L < C.computed && (C = {
                value: J,
                computed: L
            })
        });
        return C.value
    };
    n.shuffle = function(s) {
        var x = [],
        y;
        z(s,
        function(C, J) {
            if (J == 0) x[0] = C;
            else {
                y = Math.floor(Math.random() * (J + 1));
                x[J] = x[y];
                x[y] = C
            }
        });
        return x
    };
    n.sortBy = function(s, x, y) {
        return n.pluck(n.map(s,
        function(C, J, L) {
            return {
                value: C,
                criteria: x.call(y, C, J, L)
            }
        }).sort(function(C, J) {
            C = C.criteria;
            J = J.criteria;
            return C < J ? -1 : C > J ? 1 : 0
        }), "value")
    };
    n.groupBy = function(s, x) {
        var y = {},
        C = n.isFunction(x) ? x: function(J) {
            return J[x]
        };
        z(s,
        function(J, L) {
            L = C(J, L);
            (y[L] || (y[L] = [])).push(J)
        });
        return y
    };
    n.sortedIndex = function(s, x, y) {
        y || (y = n.identity);
        for (var C = 0, J = s.length; C < J;) {
            var L = C + J >> 1;
            y(s[L]) < y(x) ? (C = L + 1) : (J = L)
        }
        return C
    };
    n.toArray = function(s) {
        if (!s) return [];
        if (s.toArray) return s.toArray();
        if (n.isArray(s)) return h.call(s);
        if (n.isArguments(s)) return h.call(s);
        return n.values(s)
    };
    n.size = function(s) {
        return n.toArray(s).length
    };
    n.first = n.head = function(s, x, y) {
        return x != null && !y ? h.call(s, 0, x) : s[0]
    };
    n.initial = function(s, x, y) {
        return h.call(s, 0, s.length - (x == null || y ? 1 : x))
    };
    n.last = function(s, x, y) {
        return x != null && !y ? h.call(s, Math.max(s.length - x, 0)) : s[s.length - 1]
    };
    n.rest = n.tail = function(s, x, y) {
        return h.call(s, x == null || y ? 1 : x)
    };
    n.compact = function(s) {
        return n.filter(s,
        function(x) {
            return !! x
        })
    };
    n.flatten = function(s, x) {
        return n.reduce(s,
        function(y, C) {
            if (n.isArray(C)) return y.concat(x ? C: n.flatten(C));
            y[y.length] = C;
            return y
        },
        [])
    };
    n.without = function(s) {
        return n.difference(s, h.call(arguments, 1))
    };
    n.uniq = n.unique = function(s, x, y) {
        y = y ? n.map(s, y) : s;
        var C = [];
        n.reduce(y,
        function(J, L, M) {
            if (0 == M || (x === true ? n.last(J) != L: !n.include(J, L))) {
                J[J.length] = L;
                C[C.length] = s[M]
            }
            return J
        },
        []);
        return C
    };
    n.union = function() {
        return n.uniq(n.flatten(arguments, true))
    };
    n.intersection = n.intersect = function(s) {
        var x = h.call(arguments, 1);
        return n.filter(n.uniq(s),
        function(y) {
            return n.every(x,
            function(C) {
                return n.indexOf(C, y) >= 0
            })
        })
    };
    n.difference = function(s) {
        var x = n.flatten(h.call(arguments, 1));
        return n.filter(s,
        function(y) {
            return ! n.include(x, y)
        })
    };
    n.zip = function() {
        for (var s = h.call(arguments), x = n.max(n.pluck(s, "length")), y = new Array(x), C = 0; C < x; C++) y[C] = n.pluck(s, "" + C);
        return y
    };
    n.indexOf = function(s, x, y) {
        if (s == null) return - 1;
        var C;
        if (y) {
            y = n.sortedIndex(s, x);
            return s[y] === x ? y: -1
        }
        if (B && s.indexOf === B) return s.indexOf(x);
        y = 0;
        for (C = s.length; y < C; y++) if (y in s && s[y] === x) return y;
        return - 1
    };
    n.lastIndexOf = function(s, x) {
        if (s == null) return - 1;
        if (D && s.lastIndexOf === D) return s.lastIndexOf(x);
        for (var y = s.length; y--;) if (y in s && s[y] === x) return y;
        return - 1
    };
    n.range = function(s, x, y) {
        if (arguments.length <= 1) {
            x = s || 0;
            s = 0
        }
        y = arguments[2] || 1;
        for (var C = Math.max(Math.ceil((x - s) / y), 0), J = 0, L = new Array(C); J < C;) {
            L[J++] = s;
            s += y
        }
        return L
    };
    var E = function() {};
    n.bind = function(s, x) {
        var y, C;
        if (s.bind === p && p) return p.apply(s, h.call(arguments, 1));
        if (!n.isFunction(s)) throw new TypeError;
        C = h.call(arguments, 2);
        return y = function() {
            if (! (this instanceof y)) return s.apply(x, C.concat(h.call(arguments)));
            E.prototype = s.prototype;
            var J = new E,
            L = s.apply(J, C.concat(h.call(arguments)));
            if (Object(L) === L) return L;
            return J
        }
    };
    n.bindAll = function(s) {
        var x = h.call(arguments, 1);
        if (x.length == 0) x = n.functions(s);
        z(x,
        function(y) {
            s[y] = n.bind(s[y], s)
        });
        return s
    };
    n.memoize = function(s, x) {
        var y = {};
        x || (x = n.identity);
        return function() {
            var C = x.apply(this, arguments);
            return n.has(y, C) ? y[C] : (y[C] = s.apply(this, arguments))
        }
    };
    n.delay = function(s, x) {
        var y = h.call(arguments, 2);
        return setTimeout(function() {
            return s.apply(s, y)
        },
        x)
    };
    n.defer = function(s) {
        return n.delay.apply(n, [s, 1].concat(h.call(arguments, 1)))
    };
    n.throttle = function(s, x) {
        var y, C, J, L, M, O = n.debounce(function() {
            M = L = false
        },
        x);
        return function() {
            y = this;
            C = arguments;
            var S = function() {
                J = null;
                M && s.apply(y, C);
                O()
            };
            J || (J = setTimeout(S, x));
            if (L) M = true;
            else s.apply(y, C);
            O();
            L = true
        }
    };
    n.debounce = function(s, x) {
        var y;
        return function() {
            var C = this,
            J = arguments;
            clearTimeout(y);
            y = setTimeout(function() {
                y = null;
                s.apply(C, J)
            },
            x)
        }
    };
    n.once = function(s) {
        var x = false,
        y;
        return function() {
            if (x) return y;
            x = true;
            return y = s.apply(this, arguments)
        }
    };
    n.wrap = function(s, x) {
        return function() {
            var y = [s].concat(h.call(arguments, 0));
            return x.apply(this, y)
        }
    };
    n.compose = function() {
        var s = arguments;
        return function() {
            for (var x = arguments, y = s.length - 1; y >= 0; y--) x = [s[y].apply(this, x)];
            return x[0]
        }
    };
    n.after = function(s, x) {
        if (s <= 0) return x();
        return function() {
            if (--s < 1) return x.apply(this, arguments)
        }
    };
    n.keys = I ||
    function(s) {
        if (s !== Object(s)) throw new TypeError("Invalid object");
        var x = [];
        for (var y in s) if (n.has(s, y)) x[x.length] = y;
        return x
    };
    n.values = function(s) {
        return n.map(s, n.identity)
    };
    n.functions = n.methods = function(s) {
        var x = [];
        for (var y in s) n.isFunction(s[y]) && x.push(y);
        return x.sort()
    };
    n.extend = function(s) {
        z(h.call(arguments, 1),
        function(x) {
            for (var y in x) s[y] = x[y]
        });
        return s
    };
    n.defaults = function(s) {
        z(h.call(arguments, 1),
        function(x) {
            for (var y in x) if (s[y] == null) s[y] = x[y]
        });
        return s
    };
    n.clone = function(s) {
        if (!n.isObject(s)) return s;
        return n.isArray(s) ? s.slice() : n.extend({},
        s)
    };
    n.tap = function(s, x) {
        x(s);
        return s
    };
    n.isEqual = function(s, x) {
        return b(s, x, [])
    };
    n.isEmpty = function(s) {
        if (n.isArray(s) || n.isString(s)) return s.length === 0;
        for (var x in s) if (n.has(s, x)) return false;
        return true
    };
    n.isElement = function(s) {
        return !! (s && s.nodeType == 1)
    };
    n.isArray = d ||
    function(s) {
        return k.call(s) == "[object Array]"
    };
    n.isObject = function(s) {
        return s === Object(s)
    };
    n.isArguments = function(s) {
        return k.call(s) == "[object Arguments]"
    };
    if (!n.isArguments(arguments)) n.isArguments = function(s) {
        return !! (s && n.has(s, "callee"))
    };
    n.isFunction = function(s) {
        return k.call(s) == "[object Function]"
    };
    n.isString = function(s) {
        return k.call(s) == "[object String]"
    };
    n.isNumber = function(s) {
        return k.call(s) == "[object Number]"
    };
    n.isNaN = function(s) {
        return s !== s
    };
    n.isBoolean = function(s) {
        return s === true || s === false || k.call(s) == "[object Boolean]"
    };
    n.isDate = function(s) {
        return k.call(s) == "[object Date]"
    };
    n.isRegExp = function(s) {
        return k.call(s) == "[object RegExp]"
    };
    n.isNull = function(s) {
        return s === null
    };
    n.isUndefined = function(s) {
        return s === void 0
    };
    n.has = function(s, x) {
        return l.call(s, x)
    };
    n.noConflict = function() {
        c._ = e;
        return this
    };
    n.identity = function(s) {
        return s
    };
    n.times = function(s, x, y) {
        for (var C = 0; C < s; C++) x.call(y, C)
    };
    n.escape = function(s) {
        return ("" + s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    };
    n.mixin = function(s) {
        z(n.functions(s),
        function(x) {
            N(x, n[x] = s[x])
        })
    };
    var F = 0;
    n.uniqueId = function(s) {
        var x = F++;
        return s ? s + x: x
    };
    n.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var Q = /.^/,
    H = function(s) {
        return s.replace(/\\\\/g, "\\").replace(/\\'/g, "'")
    };
    n.template = function(s, x) {
        var y = n.templateSettings;
        s = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(y.escape || Q,
        function(J, L) {
            return "',_.escape(" + H(L) + "),'"
        }).replace(y.interpolate || Q,
        function(J, L) {
            return "'," + H(L) + ",'"
        }).replace(y.evaluate || Q,
        function(J, L) {
            return "');" + H(L).replace(/[\r\n\t]/g, " ") + ";__p.push('"
        }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');";
        var C = new Function("obj", "_", s);
        if (x) return C(x, n);
        return function(J) {
            return C.call(this, J, n)
        }
    };
    n.chain = function(s) {
        return n(s).chain()
    };
    var G = function(s) {
        this._wrapped = s
    };
    n.prototype = G.prototype;
    var K = function(s, x) {
        return x ? n(s).chain() : s
    },
    N = function(s, x) {
        G.prototype[s] = function() {
            var y = h.call(arguments);
            j.call(y, this._wrapped);
            return K(x.apply(n, y), this._chain)
        }
    };
    n.mixin(n);
    z(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
    function(s) {
        var x = f[s];
        G.prototype[s] = function() {
            var y = this._wrapped;
            x.apply(y, arguments);
            var C = y.length;
            if ((s == "shift" || s == "splice") && C === 0) delete y[0];
            return K(y, this._chain)
        }
    });
    z(["concat", "join", "slice"],
    function(s) {
        var x = f[s];
        G.prototype[s] = function() {
            return K(x.apply(this._wrapped, arguments), this._chain)
        }
    });
    G.prototype.chain = function() {
        this._chain = true;
        return this
    };
    G.prototype.value = function() {
        return this._wrapped
    }
}).call(this);
(function() {
    var b = this,
    c = b.Backbone,
    e = Array.prototype.slice,
    g = Array.prototype.splice,
    f;
    f = typeof exports !== "undefined" ? exports: (b.Backbone = {});
    f.VERSION = "0.9.1";
    var d = b._;
    if (!d && typeof require !== "undefined") d = require("underscore");
    var h = b.jQuery || b.Zepto || b.ender;
    f.setDomLibrary = function(p) {
        h = p
    };
    f.noConflict = function() {
        b.Backbone = c;
        return this
    };
    f.emulateHTTP = false;
    f.emulateJSON = false;
    f.Events = {
        on: function(p, n, z) {
            var A;
            p = p.split(/\s+/);
            for (var E = this._callbacks || (this._callbacks = {}); A = p.shift();) {
                A = E[A] || (E[A] = {});
                var F = A.tail || (A.tail = A.next = {});
                F.callback = n;
                F.context = z;
                A.tail = F.next = {}
            }
            return this
        },
        off: function(p, n, z) {
            var A, E, F;
            if (p) {
                if (E = this._callbacks) for (p = p.split(/\s+/); A = p.shift();) {
                    F = E[A];
                    delete E[A];
                    if (n && F) for (;
                    (F = F.next) && F.next;) F.callback === n && (!z || F.context === z) || this.on(A, F.callback, F.context)
                }
            } else delete this._callbacks;
            return this
        },
        trigger: function(p) {
            var n, z, A, E;
            if (! (z = this._callbacks)) return this;
            A = z.all;
            for ((p = p.split(/\s+/)).push(null); n = p.shift();) {
                A && p.push({
                    next: A.next,
                    tail: A.tail,
                    event: n
                });
                if (n = z[n]) p.push({
                    next: n.next,
                    tail: n.tail
                })
            }
            for (E = e.call(arguments, 1); n = p.pop();) {
                z = n.tail;
                for (A = n.event ? [n.event].concat(E) : E;
                (n = n.next) !== z;) n.callback.apply(n.context || this, A)
            }
            return this
        }
    };
    f.Events.bind = f.Events.on;
    f.Events.unbind = f.Events.off;
    f.Model = function(p, n) {
        var z;
        p || (p = {});
        if (n && n.parse) p = this.parse(p);
        if (z = D(this, "defaults")) p = d.extend({},
        z, p);
        if (n && n.collection) this.collection = n.collection;
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = d.uniqueId("c");
        if (!this.set(p, {
            silent: true
        })) throw new Error("Can't create an invalid model");
        delete this._changed;
        this._previousAttributes = d.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    d.extend(f.Model.prototype, f.Events, {
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return d.clone(this.attributes)
        },
        get: function(p) {
            return this.attributes[p]
        },
        escape: function(p) {
            var n;
            if (n = this._escapedAttributes[p]) return n;
            n = this.attributes[p];
            return this._escapedAttributes[p] = d.escape(n == null ? "": "" + n)
        },
        has: function(p) {
            return this.attributes[p] != null
        },
        set: function(p, n, z) {
            var A, E;
            if (d.isObject(p) || p == null) {
                A = p;
                z = n
            } else {
                A = {};
                A[p] = n
            }
            z || (z = {});
            if (!A) return this;
            if (A instanceof f.Model) A = A.attributes;
            if (z.unset) for (E in A) A[E] = void 0;
            if (!this._validate(A, z)) return false;
            if (this.idAttribute in A) this.id = A[this.idAttribute];
            n = this.attributes;
            var F = this._escapedAttributes,
            Q = this._previousAttributes || {},
            H = this._setting;
            this._changed || (this._changed = {});
            this._setting = true;
            for (E in A) {
                p = A[E];
                d.isEqual(n[E], p) || delete F[E];
                z.unset ? delete n[E] : (n[E] = p);
                if (this._changing && !d.isEqual(this._changed[E], p)) {
                    this.trigger("change:" + E, this, p, z);
                    this._moreChanges = true
                }
                delete this._changed[E];
                if (!d.isEqual(Q[E], p) || d.has(n, E) != d.has(Q, E)) this._changed[E] = p
            }
            if (!H) { ! z.silent && this.hasChanged() && this.change(z);
                this._setting = false
            }
            return this
        },
        unset: function(p, n) { (n || (n = {})).unset = true;
            return this.set(p, null, n)
        },
        clear: function(p) { (p || (p = {})).unset = true;
            return this.set(d.clone(this.attributes), p)
        },
        fetch: function(p) {
            p = p ? d.clone(p) : {};
            var n = this,
            z = p.success;
            p.success = function(A, E, F) {
                if (!n.set(n.parse(A, F), p)) return false;
                z && z(n, A)
            };
            p.error = f.wrapError(p.error, n, p);
            return (this.sync || f.sync).call(this, "read", this, p)
        },
        save: function(p, n, z) {
            var A, E;
            if (d.isObject(p) || p == null) {
                A = p;
                z = n
            } else {
                A = {};
                A[p] = n
            }
            z = z ? d.clone(z) : {};
            if (z.wait) E = d.clone(this.attributes);
            p = d.extend({},
            z, {
                silent: true
            });
            if (A && !this.set(A, z.wait ? p: z)) return false;
            var F = this,
            Q = z.success;
            z.success = function(H, G, K) {
                G = F.parse(H, K);
                if (z.wait) G = d.extend(A || {},
                G);
                if (!F.set(G, z)) return false;
                Q ? Q(F, H) : F.trigger("sync", F, H, z)
            };
            z.error = f.wrapError(z.error, F, z);
            n = this.isNew() ? "create": "update";
            n = (this.sync || f.sync).call(this, n, this, z);
            z.wait && this.set(E, p);
            return n
        },
        destroy: function(p) {
            p = p ? d.clone(p) : {};
            var n = this,
            z = p.success,
            A = function() {
                n.trigger("destroy", n, n.collection, p)
            };
            if (this.isNew()) return A();
            p.success = function(F) {
                p.wait && A();
                z ? z(n, F) : n.trigger("sync", n, F, p)
            };
            p.error = f.wrapError(p.error, n, p);
            var E = (this.sync || f.sync).call(this, "delete", this, p);
            p.wait || A();
            return E
        },
        url: function() {
            var p = D(this.collection, "url") || D(this, "urlRoot") || I();
            if (this.isNew()) return p;
            return p + (p.charAt(p.length - 1) == "/" ? "": "/") + encodeURIComponent(this.id)
        },
        parse: function(p) {
            return p
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return this.id == null
        },
        change: function(p) {
            if (this._changing || !this.hasChanged()) return this;
            this._moreChanges = this._changing = true;
            for (var n in this._changed) this.trigger("change:" + n, this, this._changed[n], p);
            for (; this._moreChanges;) {
                this._moreChanges = false;
                this.trigger("change", this, p)
            }
            this._previousAttributes = d.clone(this.attributes);
            delete this._changed;
            this._changing = false;
            return this
        },
        hasChanged: function(p) {
            if (!arguments.length) return ! d.isEmpty(this._changed);
            return this._changed && d.has(this._changed, p)
        },
        changedAttributes: function(p) {
            if (!p) return this.hasChanged() ? d.clone(this._changed) : false;
            var n, z = false,
            A = this._previousAttributes;
            for (var E in p) if (!d.isEqual(A[E], n = p[E]))(z || (z = {}))[E] = n;
            return z
        },
        previous: function(p) {
            if (!arguments.length || !this._previousAttributes) return null;
            return this._previousAttributes[p]
        },
        previousAttributes: function() {
            return d.clone(this._previousAttributes)
        },
        isValid: function() {
            return ! this.validate(this.attributes)
        },
        _validate: function(p, n) {
            if (n.silent || !this.validate) return true;
            p = d.extend({},
            this.attributes, p);
            p = this.validate(p, n);
            if (!p) return true;
            n && n.error ? n.error(this, p, n) : this.trigger("error", this, p, n);
            return false
        }
    });
    f.Collection = function(p, n) {
        n || (n = {});
        if (n.comparator) this.comparator = n.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        p && this.reset(p, {
            silent: true,
            parse: n.parse
        })
    };
    d.extend(f.Collection.prototype, f.Events, {
        model: f.Model,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(p) {
                return p.toJSON()
            })
        },
        add: function(p, n) {
            var z, A, E, F, Q, H = {},
            G = {};
            n || (n = {});
            p = d.isArray(p) ? p.slice() : [p];
            z = 0;
            for (A = p.length; z < A; z++) {
                if (! (E = p[z] = this._prepareModel(p[z], n))) throw new Error("Can't add an invalid model to a collection");
                if (H[F = E.cid] || this._byCid[F] || (Q = E.id) != null && (G[Q] || this._byId[Q])) throw new Error("Can't add the same model to a collection twice");
                H[F] = G[Q] = E
            }
            for (z = 0; z < A; z++) { (E = p[z]).on("all", this._onModelEvent, this);
                this._byCid[E.cid] = E;
                if (E.id != null) this._byId[E.id] = E
            }
            this.length += A;
            g.apply(this.models, [n.at != null ? n.at: this.models.length, 0].concat(p));
            this.comparator && this.sort({
                silent: true
            });
            if (n.silent) return this;
            z = 0;
            for (A = this.models.length; z < A; z++) if (H[(E = this.models[z]).cid]) {
                n.index = z;
                E.trigger("add", E, this, n)
            }
            return this
        },
        remove: function(p, n) {
            var z, A, E, F;
            n || (n = {});
            p = d.isArray(p) ? p.slice() : [p];
            z = 0;
            for (A = p.length; z < A; z++) if (F = this.getByCid(p[z]) || this.get(p[z])) {
                delete this._byId[F.id];
                delete this._byCid[F.cid];
                E = this.indexOf(F);
                this.models.splice(E, 1);
                this.length--;
                if (!n.silent) {
                    n.index = E;
                    F.trigger("remove", F, this, n)
                }
                this._removeReference(F)
            }
            return this
        },
        get: function(p) {
            if (p == null) return null;
            return this._byId[p.id != null ? p.id: p]
        },
        getByCid: function(p) {
            return p && this._byCid[p.cid || p]
        },
        at: function(p) {
            return this.models[p]
        },
        sort: function(p) {
            p || (p = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            var n = d.bind(this.comparator, this);
            if (this.comparator.length == 1) this.models = this.sortBy(n);
            else this.models.sort(n);
            p.silent || this.trigger("reset", this, p);
            return this
        },
        pluck: function(p) {
            return d.map(this.models,
            function(n) {
                return n.get(p)
            })
        },
        reset: function(p, n) {
            p || (p = []);
            n || (n = {});
            for (var z = 0, A = this.models.length; z < A; z++) this._removeReference(this.models[z]);
            this._reset();
            this.add(p, {
                silent: true,
                parse: n.parse
            });
            n.silent || this.trigger("reset", this, n);
            return this
        },
        fetch: function(p) {
            p = p ? d.clone(p) : {};
            if (p.parse === undefined) p.parse = true;
            var n = this,
            z = p.success;
            p.success = function(A, E, F) {
                n[p.add ? "add": "reset"](n.parse(A, F), p);
                z && z(n, A)
            };
            p.error = f.wrapError(p.error, n, p);
            return (this.sync || f.sync).call(this, "read", this, p)
        },
        create: function(p, n) {
            var z = this;
            n = n ? d.clone(n) : {};
            p = this._prepareModel(p, n);
            if (!p) return false;
            n.wait || z.add(p, n);
            var A = n.success;
            n.success = function(E, F) {
                n.wait && z.add(E, n);
                A ? A(E, F) : E.trigger("sync", p, F, n)
            };
            p.save(null, n);
            return p
        },
        parse: function(p) {
            return p
        },
        chain: function() {
            return d(this.models).chain()
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function(p, n) {
            if (p instanceof f.Model) {
                if (!p.collection) p.collection = this
            } else {
                p = p;
                n.collection = this;
                p = new this.model(p, n);
                p._validate(p.attributes, n) || (p = false)
            }
            return p
        },
        _removeReference: function(p) {
            this == p.collection && delete p.collection;
            p.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(p, n, z, A) {
            if (! ((p == "add" || p == "remove") && z != this)) {
                p == "destroy" && this.remove(n, A);
                if (n && p === "change:" + n.idAttribute) {
                    delete this._byId[n.previous(n.idAttribute)];
                    this._byId[n.id] = n
                }
                this.trigger.apply(this, arguments)
            }
        }
    });
    d.each(["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"],
    function(p) {
        f.Collection.prototype[p] = function() {
            return d[p].apply(d, [this.models].concat(d.toArray(arguments)))
        }
    });
    f.Router = function(p) {
        p || (p = {});
        if (p.routes) this.routes = p.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var j = /:\w+/g,
    k = /\*\w+/g,
    l = /[-[\]{}()+?.,\\^$|#\s]/g;
    d.extend(f.Router.prototype, f.Events, {
        initialize: function() {},
        route: function(p, n, z) {
            f.history || (f.history = new f.History);
            d.isRegExp(p) || (p = this._routeToRegExp(p));
            z || (z = this[n]);
            f.history.route(p, d.bind(function(A) {
                A = this._extractParameters(p, A);
                z && z.apply(this, A);
                this.trigger.apply(this, ["route:" + n].concat(A));
                f.history.trigger("route", this, n, A)
            },
            this));
            return this
        },
        navigate: function(p, n) {
            f.history.navigate(p, n)
        },
        _bindRoutes: function() {
            if (this.routes) {
                var p = [];
                for (var n in this.routes) p.unshift([n, this.routes[n]]);
                n = 0;
                for (var z = p.length; n < z; n++) this.route(p[n][0], p[n][1], this[p[n][1]])
            }
        },
        _routeToRegExp: function(p) {
            p = p.replace(l, "\\$&").replace(j, "([^/]+)").replace(k, "(.*?)");
            return new RegExp("^" + p + "$")
        },
        _extractParameters: function(p, n) {
            return p.exec(n).slice(1)
        }
    });
    f.History = function() {
        this.handlers = [];
        d.bindAll(this, "checkUrl")
    };
    var r = /^[#\/]/,
    u = /msie [\w.]+/,
    o = false;
    d.extend(f.History.prototype, f.Events, {
        interval: 50,
        getFragment: function(p, n) {
            if (p == null) if (this._hasPushState || n) {
                p = window.location.pathname;
                if (n = window.location.search) p += n
            } else p = window.location.hash;
            p = decodeURIComponent(p);
            p.indexOf(this.options.root) || (p = p.substr(this.options.root.length));
            return p.replace(r, "")
        },
        start: function(p) {
            if (o) throw new Error("Backbone.history has already been started");
            this.options = d.extend({},
            {
                root: "/"
            },
            this.options, p);
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
            p = this.getFragment();
            var n = document.documentMode;
            if (n = u.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7)) {
                this.iframe = h('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(p)
            }
            if (this._hasPushState) h(window).bind("popstate", this.checkUrl);
            else if (this._wantsHashChange && "onhashchange" in window && !n) h(window).bind("hashchange", this.checkUrl);
            else if (this._wantsHashChange) this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            this.fragment = p;
            o = true;
            p = window.location;
            n = p.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !n) {
                this.fragment = this.getFragment(null, true);
                window.location.replace(this.options.root + "#" + this.fragment);
                return true
            } else if (this._wantsPushState && this._hasPushState && n && p.hash) {
                this.fragment = p.hash.replace(r, "");
                window.history.replaceState({},
                document.title, p.protocol + "//" + p.host + this.options.root + this.fragment)
            }
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function() {
            h(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            o = false
        },
        route: function(p, n) {
            this.handlers.unshift({
                route: p,
                callback: n
            })
        },
        checkUrl: function() {
            var p = this.getFragment();
            if (p == this.fragment && this.iframe) p = this.getFragment(this.iframe.location.hash);
            if (p == this.fragment || p == decodeURIComponent(this.fragment)) return false;
            this.iframe && this.navigate(p);
            this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function(p) {
            var n = this.fragment = this.getFragment(p);
            return d.any(this.handlers,
            function(z) {
                if (z.route.test(n)) {
                    z.callback(n);
                    return true
                }
            })
        },
        navigate: function(p, n) {
            if (!o) return false;
            if (!n || n === true) n = {
                trigger: n
            };
            var z = (p || "").replace(r, "");
            if (! (this.fragment == z || this.fragment == decodeURIComponent(z))) {
                if (this._hasPushState) {
                    if (z.indexOf(this.options.root) != 0) z = this.options.root + z;
                    this.fragment = z;
                    window.history[n.replace ? "replaceState": "pushState"]({},
                    document.title, z)
                } else if (this._wantsHashChange) {
                    this.fragment = z;
                    this._updateHash(window.location, z, n.replace);
                    if (this.iframe && z != this.getFragment(this.iframe.location.hash)) {
                        n.replace || this.iframe.document.open().close();
                        this._updateHash(this.iframe.location, z, n.replace)
                    }
                } else window.location.assign(this.options.root + p);
                n.trigger && this.loadUrl(p)
            }
        },
        _updateHash: function(p, n, z) {
            if (z) p.replace(p.toString().replace(/(javascript:|#).*$/, "") + "#" + n);
            else p.hash = n
        }
    });
    f.View = function(p) {
        this.cid = d.uniqueId("view");
        this._configure(p || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    };
    var m = /^(\S+)\s*(.*)$/,
    q = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    d.extend(f.View.prototype, f.Events, {
        tagName: "div",
        $: function(p) {
            return this.$el.find(p)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this.$el.remove();
            return this
        },
        make: function(p, n, z) {
            p = document.createElement(p);
            n && h(p).attr(n);
            z && h(p).html(z);
            return p
        },
        setElement: function(p, n) {
            this.$el = h(p);
            this.el = this.$el[0];
            n !== false && this.delegateEvents();
            return this
        },
        delegateEvents: function(p) {
            if (p || (p = D(this, "events"))) {
                this.undelegateEvents();
                for (var n in p) {
                    var z = p[n];
                    d.isFunction(z) || (z = this[p[n]]);
                    if (!z) throw new Error('Event "' + p[n] + '" does not exist');
                    var A = n.match(m),
                    E = A[1];
                    A = A[2];
                    z = d.bind(z, this);
                    E += ".delegateEvents" + this.cid;
                    A === "" ? this.$el.bind(E, z) : this.$el.delegate(A, E, z)
                }
            }
        },
        undelegateEvents: function() {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function(p) {
            if (this.options) p = d.extend({},
            this.options, p);
            for (var n = 0, z = q.length; n < z; n++) {
                var A = q[n];
                if (p[A]) this[A] = p[A]
            }
            this.options = p
        },
        _ensureElement: function() {
            if (this.el) this.setElement(this.el, false);
            else {
                var p = D(this, "attributes") || {};
                if (this.id) p.id = this.id;
                if (this.className) p["class"] = this.className;
                this.setElement(this.make(this.tagName, p), false)
            }
        }
    });
    f.Model.extend = f.Collection.extend = f.Router.extend = f.View.extend = function(p, n) {
        p = B(this, p, n);
        p.extend = this.extend;
        return p
    };
    var v = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    f.sync = function(p, n, z) {
        var A = v[p],
        E = {
            type: A,
            dataType: "json"
        };
        if (!z.url) E.url = D(n, "url") || I();
        if (!z.data && n && (p == "create" || p == "update")) {
            E.contentType = "application/json";
            E.data = JSON.stringify(n.toJSON())
        }
        if (f.emulateJSON) {
            E.contentType = "application/x-www-form-urlencoded";
            E.data = E.data ? {
                model: E.data
            }: {}
        }
        if (f.emulateHTTP) if (A === "PUT" || A === "DELETE") {
            if (f.emulateJSON) E.data._method = A;
            E.type = "POST";
            E.beforeSend = function(F) {
                F.setRequestHeader("X-HTTP-Method-Override", A)
            }
        }
        if (E.type !== "GET" && !f.emulateJSON) E.processData = false;
        return h.ajax(d.extend(E, z))
    };
    f.wrapError = function(p, n, z) {
        return function(A, E) {
            E = A === n ? E: A;
            p ? p(n, E, z) : n.trigger("error", n, E, z)
        }
    };
    var w = function() {},
    B = function(p, n, z) {
        var A;
        A = n && n.hasOwnProperty("constructor") ? n.constructor: function() {
            p.apply(this, arguments)
        };
        d.extend(A, p);
        w.prototype = p.prototype;
        A.prototype = new w;
        n && d.extend(A.prototype, n);
        z && d.extend(A, z);
        A.prototype.constructor = A;
        A.__super__ = p.prototype;
        return A
    },
    D = function(p, n) {
        if (! (p && p[n])) return null;
        return d.isFunction(p[n]) ? p[n]() : p[n]
    },
    I = function() {
        throw new Error('A "url" property or function must be specified');
    }
}).call(this);
window.Modernizr = function(b, c, e) {
    function g(n) {
        u.cssText = n
    }
    function f(n, z) {
        return typeof n === z
    }
    function d(n, z) {
        for (var A in n) if (u[n[A]] !== e) return z == "pfx" ? n[A] : true;
        return false
    }
    function h(n, z, A) {
        for (var E in n) {
            var F = z[n[E]];
            if (F !== e) return A === false ? n[E] : f(F, "function") ? F.bind(A || z) : F
        }
        return false
    }
    function j(n, z, A) {
        var E = n.charAt(0).toUpperCase() + n.substr(1),
        F = (n + " " + o.join(E + " ") + E).split(" ");
        return f(z, "string") || f(z, "undefined") ? d(F, z) : (F = (n + " " + m.join(E + " ") + E).split(" "), h(F, z, A))
    }
    var k = {},
    l = c.documentElement,
    r = c.createElement("modernizr"),
    u = r.style;
    b = " -webkit- -moz- -o- -ms- ".split(" ");
    var o = "Webkit Moz O ms".split(" "),
    m = "Webkit Moz O ms".toLowerCase().split(" ");
    r = {};
    var q = [],
    v = q.slice,
    w,
    B = function(n, z, A, E) {
        var F, Q, H, G = c.createElement("div"),
        K = c.body,
        N = K ? K: c.createElement("body");
        if (parseInt(A, 10)) for (; A--;) {
            H = c.createElement("div");
            H.id = E ? E[A] : "modernizr" + (A + 1);
            G.appendChild(H)
        }
        return F = ["&#173;<style>", n, "</style>"].join(""),
        G.id = "modernizr",
        (K ? G: N).innerHTML += F,
        N.appendChild(G),
        K || (N.style.background = "", l.appendChild(N)),
        Q = z(G, n),
        K ? G.parentNode.removeChild(G) : N.parentNode.removeChild(N),
        !!Q
    },
    D = {}.hasOwnProperty,
    I; ! f(D, "undefined") && !f(D.call, "undefined") ? (I = function(n, z) {
        return D.call(n, z)
    }) : (I = function(n, z) {
        return z in n && f(n.constructor.prototype[z], "undefined")
    });
    Function.prototype.bind || (Function.prototype.bind = function(n) {
        var z = this;
        if (typeof z != "function") throw new TypeError;
        var A = v.call(arguments, 1),
        E = function() {
            if (this instanceof E) {
                var F = function() {};
                F.prototype = z.prototype;
                F = new F;
                var Q = z.apply(F, A.concat(v.call(arguments)));
                return Object(Q) === Q ? Q: F
            }
            return z.apply(n, A.concat(v.call(arguments)))
        };
        return E
    });
    (function(n, z) {
        n = n.join("");
        var A = z.length;
        B(n,
        function(E) {
            E = E.childNodes;
            for (var F = {}; A--;) F[E[A].id] = E[A];
            k.csstransforms3d = (F.csstransforms3d && F.csstransforms3d.offsetLeft) === 9 && F.csstransforms3d.offsetHeight === 3
        },
        A, z)
    })([, ["@media (", b.join("transform-3d),("), "modernizr){#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join("")], [, "csstransforms3d"]);
    r.csstransforms3d = function() {
        var n = !!j("perspective");
        return n && "webkitPerspective" in l.style && (n = k.csstransforms3d),
        n
    };
    for (var p in r) I(r, p) && (w = p.toLowerCase(), k[w] = r[p](), q.push((k[w] ? "": "no-") + w));
    return g(""),
    r = null,
    k._version = "2.5.3",
    k._prefixes = b,
    k._domPrefixes = m,
    k._cssomPrefixes = o,
    k.testProp = function(n) {
        return d([n])
    },
    k.testAllProps = j,
    k.testStyles = B,
    l.className = l.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (" js " + q.join(" ")),
    k
} (this, this.document);
var new_pins = {
    html: "",
    number: 0,
    old_title: ""
},
followers_json = null,
cache = {},
lastXhr,
media_url = "http://assets.pinterest.com/",
useLazyLoad = !window.navigator.userAgent.match(/ipad.*OS 4_/gi),
pinterestReferrer = window.location.href;
window.onerror = function(b, c, e) {
    /*$.ajax({url:"/report_error/",type:"POST",dataType:"json",data:{exception_type:b,url:c||window.location.href,line:e}});return true*/
};
function getCookie(b) {
    var c = null;
    if (document.cookie && document.cookie != "") for (var e = document.cookie.split(";"), g = 0; g < e.length; g++) {
        var f = jQuery.trim(e[g]);
        if (f.substring(0, b.length + 1) == b + "=") c = decodeURIComponent(f.substring(b.length + 1))
    }
    return c
}
$("html").ajaxSend(function(b, c) {
    c.setRequestHeader("X-Pinterest-Referrer", pinterestReferrer);
    c.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
});
function setCookie(b, c, e) {
    if (e) {
        var g = new Date;
        g.setTime(g.getTime() + e * 24 * 60 * 60 * 1E3);
        e = "; expires=" + g.toGMTString()
    } else e = "";
    document.cookie = b + "=" + c + e + "; path=/"
}
function deleteCookie(b) {
    setCookie(b, "", -1)
}
$.extend({
    getUrlVars: function() {
        for (var b = [], c, e = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), g = 0; g < e.length; g++) {
            c = e[g].split("=");
            b.push(c[0]);
            b[c[0]] = c[1]
        }
        return b
    },
    getUrlVar: function(b) {
        return $.getUrlVars()[b]
    }
});
(function(b) {
    b.fn.extend({
        defaultValue: function(c, e) {
            b(this).focus(function() {
                b(this).val() == c && b(this).val("")
            }).blur(function() {
                if (b(this).val() == "") {
                    b(this).val(c);
                    e && b(this).addClass(e)
                }
            })
        }
    })
})(jQuery);
if (!Array.indexOf) Array.prototype.indexOf = function(b) {
    for (var c = 0; c < this.length; c++) if (this[c] == b) return c;
    return - 1
};
function is_video(b) {
    return /^http:\/\/img\.youtube\.com/.test(b) || /^http:\/\/b\.vimeocdn\.com/.test(b)
}
function getHTML(b) {
    var c = $(b).wrap("<div />").parent().html();
    $(b).unwrap();
    return c
}

var ScrollToTop = ScrollToTop || {
    setup: function() {
        var b = $(window).height() / 2;
        $(window).scroll(function() { (window.innerWidth ? window.pageYOffset: document.documentElement.scrollTop) >= b ? $("#ScrollToTop").removeClass("Offscreen") : $("#ScrollToTop").addClass("Offscreen")
        });
        $("#ScrollToTop").click(function() {
            $("html, body").animate({
                scrollTop: "0px"
            },
            400);
            return false
        })
    }
},
Modal = Modal || {
    setup: function() {
        $(document).keydown(function(b) {
            if (b.keyCode == 27) {
                var c = $(".ModalContainer:visible").attr("id");
                if (c) Modal.close(c);
                else $("#zoomScroll").length && window.history.back();
                b.preventDefault()
            }
        })
    },
    show: function(b) {
        var c = $("#" + b),
        e = $(".modal:first", c),
        g = c.parent(),
        f = this;
        c.find(".close").on("click",
        function() {
            f.trigger("cancel")
        });
        if (g[0] !== $("body")[0]) {
            $("body").append(c);
            c.data("parent", g)
        }
        $("body").addClass("noscroll");
        c.show();
        g = e.outerHeight();
        e.css("margin-bottom", "-" + g / 2 + "px");
        setTimeout(function() {
            c.addClass("visible");
            c.css("-webkit-transform", "none")
        },
        1);
        this.trigger("show", b);
        return false
    },
    close: function(b) {
        var c = $("#" + b);
        c.data("parent") && c.data("parent").append(c);
        $("#zoomScroll").length === 0 && $("body").removeClass("noscroll");
        c.removeClass("visible");
        setTimeout(function() {
            c.hide();
            c.css("-webkit-transform", "translateZ(0)")
        },
        251);
        this.trigger("close", b);
        return false
    }
};

_.extend(Modal, Backbone.Events);

var Arrays = {
    conjunct: function(b) {
        if (b.length == 1) return b[0];
        else {
            b = b.slice(0);
            last = b.pop();
            b.push("and " + last);
            return b.join(", ")
        }
    }
};

$(document).ready(function() {
    ScrollToTop.setup();
    Modal.setup();
    $(".tipsyHover").tipsy({
        gravity: "n",
        delayIn: 0.1,
        delayOut: 0.1,
        opacity: 0.7,
        live: true,
        html: true
    });
    $("#query").focus(function() {
        cache && $(this).catcomplete("search", $(this).val())
    });
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function(c, e) {
            var g = this,
            f = "";
            $.each(e,
            function(d, h) {
                if (h.category != f) {
                    c.append("<li class='ui-autocomplete-category'>" + h.category + "</li>");
                    f = h.category
                }
                g._renderItem(c, h)
            });
            e = {
                link: "/search/?q=" + this.term
            };
            $("<li></li>").data("item.autocomplete", e).append("<a href='/search/?q=" + this.term + "' class='ui-corner-all' tabindex='-1' style='font-weight:bold; min-height:0 !important;'>Search for " + this.term + "</a>").appendTo(c)
        }
    });
    var b = $("#query").catcomplete({
        source: function(c, e) {
            Tagging.getFriends(c,
            function(g) {
                var f = g;
                if (myboards) {
                    f = tagmate.filter_options(myboards, c.term);
                    f = g.concat(f)
                }
                for (g = 0; g < f.length; g++) f[g].value = f[g].label;
                e(f)
            })
        },
        minLength: 1,
        delay: 0,
        appendTo: "#SearchAutocompleteHolder",
        select: function(c, e) {
            document.location.href = e.item.link
        }
    });
    if (typeof b.data("catcomplete") != "undefined") b.data("catcomplete")._renderItem = function(c, e) {
        var g = "<a href='" + e.link + "'><img src='" + e.image + "' class='AutocompletePhoto' alt='Photo of " + e.label + "' width='38px' height='38px'/><span class='AutocompleteName'>" + e.label + "</span></a>";
        return $("<li></li>").data("item.autocomplete", e).append(g).appendTo(c)
    };
    $("#query").defaultValue($("#query").attr("placeholder"), "default_value");
    $("#Search #query_button").click(function() {
        $("#Search form").submit();
        return false
    });
    $("body").on("click", "a[rel=nofollow]",
    function(c) {
        var e = $(this).attr("href");
        if (e === "#") return c.isDefaultPrevented();
        if (!e.match(/^(http|https):\/\//) || e.match(/(http:\/\/|https:\/\/|\.)pinterest\.com\//gi) || $(this).hasClass("safelink")) return true;
        c = (c = $(this).parents(".pin").attr("data-id") || $(this).parents(".pin").attr("pin-id") || $(this).attr("data-id")) ? "&pin=" + c: "";
        var g = $(this).parents(".comment").attr("comment-id");
        g = g ? "&comment_id=" + g: "";
        var f = (new jsSHA(getCookie("csrftoken"), "ASCII")).getHash("HEX");
        window.open("//" + window.location.host + "/offsite/?url=" + encodeURIComponent(e) + "&shatoken=" + f + c + g);
        return false
    })
});
Twitter = new(function() {
    var b = this;
    this.startTwitterConnect = function() {
        b._twitterWindow = window.open("/connect/twitter/", "Pinterest", "location=0,status=0,width=800,height=400");
        b._twitterInterval = window.setInterval(b.completeTwitterConnect, 1E3)
    };
    this.completeTwitterConnect = function() {
        if (b._twitterWindow.closed) {
            window.clearInterval(b._twitterInterval);
            window.location.reload()
        }
    }
});
Facebook = new(function() {
    var b = this;
    this.startFacebookConnect = function(c, e, g, f) {
        g = g == undefined ? true: g;
        var d = "/connect/facebook/",
        h = "?";
        if (c) {
            d += h + "scope=" + c;
            h = "&"
        }
        if (e) {
            d += h + "enable_timeline=1";
            h = "&"
        }
        if (f) d += h + "ref_page=" + f;
        b._facebookWindow = window.open(d, "Pinterest", "location=0,status=0,width=800,height=400");
        if (g) b._facebookInterval = window.setInterval(this.completeFacebookConnect, 1E3)
    };
    this.completeFacebookConnect = function() {
        if (b._facebookWindow.closed) {
            window.clearInterval(b._facebookInterval);
            window.location.reload()
        }
    }
});
Google = new(function() {
    var b = this;
    this.startGoogleConnect = function() {
        b._googleWindow = window.open("/connect/google/", "Google", "location=0,status=0,width=800,height=400");
        b._googleInterval = window.setInterval(b.completeGoogleConnect, 1E3)
    };
    this.completeGoogleConnect = function() {
        if (b._googleWindow.closed) {
            window.clearInterval(b._googleInterval);
            window.location.reload()
        }
    }
});
Yahoo = new(function() {
    var b = this;
    this.startYahooConnect = function() {
        b._yahooWindow = window.open("/connect/yahoo/", "Yahoo", "location=0,status=0,width=800,height=400");
        b._yahooInterval = window.setInterval(b.completeYahooConnect, 1E3)
    };
    this.completeYahooConnect = function() {
        if (b._yahooWindow.closed) {
            window.clearInterval(b._yahooInterval);
            window.location.reload()
        }
    }
});
(function(b) {
    function c(g) {
        return typeof g == "object" ? g: {
            top: g,
            left: g
        }
    }
    var e = b.scrollTo = function(g, f, d) {
        b(window).scrollTo(g, f, d)
    };
    e.defaults = {
        axis: "xy",
        duration: parseFloat(b.fn.jquery) >= 1.3 ? 0 : 1
    };
    e.window = function() {
        return b(window)._scrollable()
    };
    b.fn._scrollable = function() {
        return this.map(function() {
            var g = this;
            if (! (!g.nodeName || b.inArray(g.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1)) return g;
            g = (g.contentWindow || g).document || g.ownerDocument || g;
            return b.browser.safari || g.compatMode == "BackCompat" ? g.body: g.documentElement
        })
    };
    b.fn.scrollTo = function(g, f, d) {
        if (typeof f == "object") {
            d = f;
            f = 0
        }
        if (typeof d == "function") d = {
            onAfter: d
        };
        if (g == "max") g = 9E9;
        d = b.extend({},
        e.defaults, d);
        f = f || d.speed || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) f /= 2;
        d.offset = c(d.offset);
        d.over = c(d.over);
        return this._scrollable().each(function() {
            function h(m) {
                k.animate(u, f, d.easing, m &&
                function() {
                    m.call(this, g, d)
                })
            }
            var j = this,
            k = b(j),
            l = g,
            r,
            u = {},
            o = k.is("html,body");
            switch (typeof l) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(l)) {
                    l = c(l);
                    break
                }
                l = b(l, this);
            case "object":
                if (l.is || l.style) r = (l = b(l)).offset()
            }
            b.each(d.axis.split(""),
            function(m, q) {
                var v = q == "x" ? "Left": "Top",
                w = v.toLowerCase(),
                B = "scroll" + v,
                D = j[B],
                I = e.max(j, q);
                if (r) {
                    u[B] = r[w] + (o ? 0 : D - k.offset()[w]);
                    if (d.margin) {
                        u[B] -= parseInt(l.css("margin" + v)) || 0;
                        u[B] -= parseInt(l.css("border" + v + "Width")) || 0
                    }
                    u[B] += d.offset[w] || 0;
                    if (d.over[w]) u[B] += l[q == "x" ? "width": "height"]() * d.over[w]
                } else {
                    q = l[w];
                    u[B] = q.slice && q.slice( - 1) == "%" ? parseFloat(q) / 100 * I: q
                }
                if (/^\d+$/.test(u[B])) u[B] = u[B] <= 0 ? 0 : Math.min(u[B], I);
                if (!m && d.queue) {
                    D != u[B] && h(d.onAfterFirst);
                    delete u[B]
                }
            });
            h(d.onAfter)
        }).end()
    };
    e.max = function(g, f) {
        var d = f == "x" ? "Width": "Height";
        f = "scroll" + d;
        if (!b(g).is("html,body")) return g[f] - b(g)[d.toLowerCase()]();
        d = "client" + d;
        var h = g.ownerDocument.documentElement;
        g = g.ownerDocument.body;
        return Math.max(h[f], g[f]) - Math.min(h[d], g[d])
    }
})(jQuery);
(function() {
    jQuery.each({
        getSelection: function() {
            var b = this.jquery ? this[0] : this;
            return ("selectionStart" in b &&
            function() {
                var c = b.selectionEnd - b.selectionStart;
                return {
                    start: b.selectionStart,
                    end: b.selectionEnd,
                    length: c,
                    text: b.value.substr(b.selectionStart, c)
                }
            } || document.selection &&
            function() {
                b.focus();
                var c = document.selection.createRange();
                if (c == null) return {
                    start: 0,
                    end: b.value.length,
                    length: 0
                };
                var e = b.createTextRange(),
                g = e.duplicate();
                e.moveToBookmark(c.getBookmark());
                g.setEndPoint("EndToStart", e);
                var f = g.text.length,
                d = f;
                for (e = 0; e < f; e++) g.text.charCodeAt(e) == 13 && d--;
                f = g = c.text.length;
                for (e = 0; e < g; e++) c.text.charCodeAt(e) == 13 && f--;
                return {
                    start: d,
                    end: d + f,
                    length: f,
                    text: c.text
                }
            } ||
            function() {
                return {
                    start: 0,
                    end: b.value.length,
                    length: 0
                }
            })()
        },
        setSelection: function(b, c) {
            var e = this.jquery ? this[0] : this,
            g = b || 0,
            f = c || 0;
            return ("selectionStart" in e &&
            function() {
                e.focus();
                e.selectionStart = g;
                e.selectionEnd = f;
                return this
            } || document.selection &&
            function() {
                e.focus();
                var d = e.createTextRange(),
                h = g;
                for (i = 0; i < h; i++) if (e.value[i].search(/[\r\n]/) != -1) g -= 0.5;
                h = f;
                for (i = 0; i < h; i++) if (e.value[i].search(/[\r\n]/) != -1) f -= 0.5;
                d.moveEnd("textedit", -1);
                d.moveStart("character", g);
                d.moveEnd("character", f - g);
                d.select();
                return this
            } ||
            function() {
                return this
            })()
        },
        replaceSelection: function(b) {
            var c = this.jquery ? this[0] : this,
            e = b || "";
            return ("selectionStart" in c &&
            function() {
                c.value = c.value.substr(0, c.selectionStart) + e + c.value.substr(c.selectionEnd, c.value.length);
                return this
            } || document.selection &&
            function() {
                c.focus();
                document.selection.createRange().text = e;
                return this
            } ||
            function() {
                c.value += e;
                return this
            })()
        }
    },
    function(b) {
        jQuery.fn[b] = this
    })
})();

var tagmate = tagmate || {
    USER_TAG_EXPR: "@\\w+(?: \\w*)?",
    HASH_TAG_EXPR: "#\\w+",
    USD_TAG_EXPR: "\\$(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
    GBP_TAG_EXPR: "\\\u00a3(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
    filter_options: function(b, c) {
        for (var e = [], g = 0; g < b.length; g++) {
            var f = b[g].label.toLowerCase(),
            d = c.toLowerCase();
            d.length <= f.length && f.indexOf(d) == 0 && e.push(b[g])
        }
        return e
    },
    sort_options: function(b) {
        return b.sort(function(c, e) {
            c = c.label.toLowerCase();
            e = e.label.toLowerCase();
            if (c > e) return 1;
            else if (c < e) return - 1;
            return 0
        })
    }
};

(function(b) {
    function c(d, h, j) {
        d = d.substring(j || 0).search(h);
        return d >= 0 ? d + (j || 0) : d
    }
    function e(d) {
        return d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }
    function g(d, h, j) {
        var k = {};
        for (tok in h)
        if (j && j[tok]) {
            var l = {},
            r = {};
            for (key in j[tok]) {
                var u = j[tok][key].value,
                o = j[tok][key].label,
                m = e(tok + o),
                q = ["(?:^(", ")$|^(", ")\\W|\\W(", ")\\W|\\W(", ")$)"].join(m),
                v = 0;
                for (q = new RegExp(q, "gm");
                (v = c(d.val(), q, v)) > -1;) {
                    var w = r[v] ? r[v] : null;
                    if (!w || l[w].length < o.length) r[v] = u;
                    l[u] = o;
                    v += o.length + 1
                }
            }
            for (v in r)
            k[tok + r[v]] = tok
        }
        else {
            l = null;
            for (q = new RegExp("(" + h[tok] + ")", "gm"); l = q.exec(d.val());)
            k[l[1]] = tok
        }
        d = [];
        for (m in k)
        d.push(m);
        return d
    }
    var f = {
        "@": tagmate.USER_TAG_EXPR,
        "#": tagmate.HASH_TAG_EXPR,
        $: tagmate.USD_TAG_EXPR,
        "\u00a3": tagmate.GBP_TAG_EXPR
    };
    b.fn.extend({
        getTags: function(d, h) {
            var j = b(this);
            d = d || j.data("_tagmate_tagchars");
            h = h || j.data("_tagmate_sources");
            return g(j, d, h)
        },
        tagmate: function(d) {
            function h(o, m, q) {
                for (m = new RegExp("[" + m + "]"); q >= 0 && !m.test(o[q]); q--);
                return q
            }
            function j(o) {
                var m = o.val(),
                q = o.getSelection(),
                v = -1;
                o = null;
                for (tok in u.tagchars) {
                    var w = h(m, tok, q.start);
                    if (w > v) {
                        v = w;
                        o = tok
                    }
                }
                m = m.substring(v + 1, q.start);
                if ((new RegExp("^" + u.tagchars[o])).exec(o + m)) return o + m;
                return null
            }
            function k(o, m, q) {
                var v = o.val(),
                w = o.getSelection();
                w = h(v, m[0], w.start);
                var B = v.substr(0, w);
                v = v.substr(w + m.length);
                o.val(B + m[0] + q + v);
                v = w + q.length + 1;
                o.setSelection(v, v);
                u.replace_tag && u.replace_tag(m, q)
            }
            function l(o, m) {
                m = tagmate.sort_options(m);
                for (var q = 0; q < m.length; q++) {
                    var v = m[q].label,
                    w = m[q].image;
                    q == 0 && o.html("");
                    var B = "<span>" + v + "</span>";
                    if (w) B = "<img src='" + w + "' alt='" + v + "'/>" + B;
                    v = u.menu_option_class;
                    if (q == 0) v += " " + u.menu_option_active_class;
                    o.append("<div class='" + v + "'>" + B + "</div>")
                }
            }
            function r(o, m) {
                var q = m == "down" ? ":first-child": ":last-child",
                v = m == "down" ? "next": "prev";
                m = o.children("." + u.menu_option_active_class);
                if (m.length == 0) m = o.children(q);
                else {
                    m.removeClass(u.menu_option_active_class);
                    m = m[v]().length > 0 ? m[v]() : m
                }
                m.addClass(u.menu_option_active_class);
                v = o.children();
                var w = Math.floor(b(o).height() / b(v[0]).height()) - 1;
                if (b(o).height() % b(v[0]).height() > 0) w -= 1;
                for (q = 0; q < v.length && b(v[q]).html() != b(m).html(); q++);
                q > w && q - w >= 0 && q - w < v.length && o.scrollTo(v[q - w])
            }
            var u = {
                tagchars: f,
                sources: null,
                capture_tag: null,
                replace_tag: null,
                menu: null,
                menu_class: "tagmate-menu",
                menu_option_class: "tagmate-menu-option",
                menu_option_active_class: "tagmate-menu-option-active"
            };
            return this.each(function() {
                function o() {
                    w.hide();
                    var D = j(m);
                    if (D) {
                        var I = D[0],
                        p = D.substr(1),
                        n = m.getSelection(),
                        z = h(m.val(), I, n.start);
                        n.start - z <= D.length &&
                        function(A) {
                            if (typeof u.sources[I] === "object") A(tagmate.filter_options(u.sources[I], p));
                            else typeof u.sources[I] === "function" ? u.sources[I]({
                                term: p
                            },
                            A) : A()
                        } (function(A) {
                            if (A && A.length > 0) {
                                l(w, A);
                                w.css("top", m.outerHeight() - 1 + "px");
                                w.show();
                                for (var E = m.data("_tagmate_sources"), F = 0; F < A.length; F++) {
                                    for (var Q = false, H = 0; ! Q && H < E[I].length; H++)
                                    Q = E[I][H].value == A[F].value;
                                    Q || E[I].push(A[F])
                                }
                            }
                            D && u.capture_tag && u.capture_tag(D)
                        })
                    }
                }
                d && b.extend(u, d);
                var m = b(this);
                m.data("_tagmate_tagchars", u.tagchars);
                var q = {};
                for (var v in u.sources)
                q[v] = [];
                m.data("_tagmate_sources", q);
                var w = u.menu;

                if (!w) {
                    w = b("<div class='" + u.menu_class + "'></div>");
                    m.after(w)
                }
                m.offset();
                w.css("position", "absolute");
                w.hide();
                var B = false;
                b(m).unbind(".tagmate").bind("focus.tagmate",
                function() {
                    o()
                }).bind("blur.tagmate",
                function() {
                    setTimeout(function() {
                        w.hide()
                    },
                    300)
                }).bind("click.tagmate",
                function() {
                    o()
                }).bind("keydown.tagmate",
                function(D) {
                    if (w.is(":visible")) if (D.keyCode == 40) {
                        r(w, "down");
                        B = true;
                        return false
                    } else if (D.keyCode == 38) {
                        r(w, "up");
                        B = true;
                        return false
                    } else if (D.keyCode == 13) {
                        D = w.children("." + u.menu_option_active_class).text();
                        var I = j(m);
                        if (I && D) {
                            k(m, I, D);
                            w.hide();
                            B = true;
                            return false
                        }
                    }
                    else if (D.keyCode == 27) {
                        w.hide();
                        B = true;
                        return false
                    }
                }).bind("keyup.tagmate",
                function() {
                    if (B) {
                        B = false;
                        return true
                    }
                    o()
                });
                b("." + u.menu_class + " ." + u.menu_option_class).die("click.tagmate").live("click.tagmate",
                function() {
                    var D = b(this).text(),
                    I = j(m);
                    k(m, I, D);
                    w.hide();
                    B = true;
                    return false
                })
            })
        }
    })
})(jQuery);
(function(b) {
    function c(f) {
        var d;
        if (f && f.constructor == Array && f.length == 3) return f;
        if (d = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) return [parseInt(d[1]), parseInt(d[2]), parseInt(d[3])];
        if (d = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) return [parseFloat(d[1]) * 2.55, parseFloat(d[2]) * 2.55, parseFloat(d[3]) * 2.55];
        if (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) return [parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16)];
        if (d = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) return [parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16)];
        return g[b.trim(f).toLowerCase()]
    }
    function e(f, d) {
        var h;
        do {
            h = b.curCSS(f, d);
            if (h != "" && h != "transparent" || b.nodeName(f, "body")) break;
            d = "backgroundColor"
        } while ( f = f . parentNode );
        return c(h)
    }
    b.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"],
    function(f, d) {
        b.fx.step[d] = function(h) {
            if (h.state == 0) {
                h.start = e(h.elem, d);
                h.end = c(h.end)
            }
            h.elem.style[d] = "rgb(" + [Math.max(Math.min(parseInt(h.pos * (h.end[0] - h.start[0]) + h.start[0]), 255), 0), Math.max(Math.min(parseInt(h.pos * (h.end[1] - h.start[1]) + h.start[1]), 255), 0), Math.max(Math.min(parseInt(h.pos * (h.end[2] - h.start[2]) + h.start[2]), 255), 0)].join(",") + ")"
        }
    });
    var g = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
jQuery.cookie = function(b, c, e) {
    if (arguments.length > 1 && String(c) !== "[object Object]") {
        e = jQuery.extend({},
        e);
        if (c === null || c === undefined) e.expires = -1;
        if (typeof e.expires === "number") {
            var g = e.expires,
            f = e.expires = new Date;
            f.setDate(f.getDate() + g)
        }
        c = String(c);
        return document.cookie = [encodeURIComponent(b), "=", e.raw ? c: encodeURIComponent(c), e.expires ? "; expires=" + e.expires.toUTCString() : "", e.path ? "; path=" + e.path: "", e.domain ? "; domain=" + e.domain: "", e.secure ? "; secure": ""].join("")
    }
    e = c || {};
    f = e.raw ?
    function(d) {
        return d
    }: decodeURIComponent;
    return (g = (new RegExp("(?:^|; )" + encodeURIComponent(b) + "=([^;]*)")).exec(document.cookie)) ? f(g[1]) : null
};
if (!window.JSON) window.JSON = {};

(function() {
    function b(r) {
        return r < 10 ? "0" + r: r
    }
    function c(r) {
        d.lastIndex = 0;
        return d.test(r) ? '"' + r.replace(d,
        function(u) {
            var o = k[u];
            return typeof o === "string" ? o: "\\u" + ("0000" + u.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + r + '"'
    }
    function e(r, u) {
        var o, m, q = h,
        v, w = u[r];
        if (w && typeof w === "object" && typeof w.toJSON === "function") w = w.toJSON(r);
        if (typeof l === "function") w = l.call(u, r, w);
        switch (typeof w) {
        case "string":
            return c(w);
        case "number":
            return isFinite(w) ? String(w) : "null";
        case "boolean":
        case "null":
            return String(w);
        case "object":
            if (!w) return "null";
            h += j;
            v = [];
            if (Object.prototype.toString.apply(w) === "[object Array]") {
                m = w.length;
                for (r = 0; r < m; r += 1)
                v[r] = e(r, w) || "null";
                u = v.length === 0 ? "[]": h ? "[\n" + h + v.join(",\n" + h) + "\n" + q + "]": "[" + v.join(",") + "]";
                h = q;
                return u
            }
            if (l && typeof l === "object") {
                m = l.length;
                for (r = 0; r < m; r += 1) {
                    o = l[r];
                    if (typeof o === "string") if (u = e(o, w)) v.push(c(o) + (h ? ": ": ":") + u)
                }
            }
            else {
                for (o in w)
                if (Object.hasOwnProperty.call(w, o)) if (u = e(o, w)) {
                    v.push(c(o) + (h ? ": ": ":") + u);
                }
            }
            u = v.length === 0 ? "{}": h ? "{\n" + h + v.join(",\n" + h) + "\n" + q + "}": "{" + v.join(",") + "}";
            h = q;
            return u
        }
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z": null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var g = window.JSON,
    f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    h, j, k = {
        "\u0008": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\u000c": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    l;
    if (typeof g.stringify !== "function") g.stringify = function(r, u, o) {
        var m;
        j = h = "";
        if (typeof o === "number") for (m = 0; m < o; m += 1) j += " ";
        else if (typeof o === "string") j = o;
        if ((l = u) && typeof u !== "function" && (typeof u !== "object" || typeof u.length !== "number")) throw new Error("JSON.stringify");
        return e("", {
            "": r
        })
    };
    if (typeof g.parse !== "function") g.parse = function(r, u) {
        function o(m, q) {
            var v, w, B = m[q];
            if (B && typeof B === "object") for (v in B) if (Object.hasOwnProperty.call(B, v)) {
                w = o(B, v);
                if (w !== undefined) B[v] = w;
                else delete B[v]
            }
            return u.call(m, q, B)
        }
        r = String(r);
        f.lastIndex = 0;
        if (f.test(r)) r = r.replace(f,
        function(m) {
            return "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice( - 4)
        });
        if (/^[\],:{}\s]*$/.test(r.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            r = eval("(" + r + ")");
            return typeof u === "function" ? o({
                "": r
            },
            "") : r
        }
        throw new SyntaxError("JSON.parse");
    }
})();

(function() {
    var b = function(o) {
        var m = [],
        q = o.length * 8,
        v;
        for (v = 0; v < q; v += 8)
        m[v >> 5] |= (o.charCodeAt(v / 8) & 255) << 24 - v % 32;
        return m
    },
    c = function(o) {
        var m = [],
        q = o.length,
        v,
        w;
        for (v = 0; v < q; v += 2) {
            w = parseInt(o.substr(v, 2), 16);
            if (isNaN(w)) return "INVALID HEX STRING";
            else m[v >> 3] |= w << 24 - 4 * (v % 8)
        }
        return m
    },
    e = function(o) {
        var m = "",
        q = o.length * 4,
        v, w;
        for (v = 0; v < q; v += 1) {
            w = o[v >> 2] >> (3 - v % 4) * 8;
            m += "0123456789abcdef".charAt(w >> 4 & 15) + "0123456789abcdef".charAt(w & 15)
        }
        return m
    },
    g = function(o) {
        var m = "",
        q = o.length * 4,
        v, w, B;
        for (v = 0; v < q; v += 3) {
            B = (o[v >> 2] >> 8 * (3 - v % 4) & 255) << 16 | (o[v + 1 >> 2] >> 8 * (3 - (v + 1) % 4) & 255) << 8 | o[v + 2 >> 2] >> 8 * (3 - (v + 2) % 4) & 255;
            for (w = 0; w < 4; w += 1)
            m += v * 8 + w * 6 <= o.length * 32 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(B >> 6 * (3 - w) & 63) : ""
        }
        return m
    },
    f = function(o, m) {
        return o << m | o >>> 32 - m
    },
    d = function(o, m, q) {
        return o ^ m ^ q
    },
    h = function(o, m, q) {
        return o & m ^ ~o & q
    },
    j = function(o, m, q) {
        return o & m ^ o & q ^ m & q
    },
    k = function(o, m) {
        var q = (o & 65535) + (m & 65535);
        return ((o >>> 16) + (m >>> 16) + (q >>> 16) & 65535) << 16 | q & 65535
    },
    l = function(o, m, q, v, w) {
        var B = (o & 65535) + (m & 65535) + (q & 65535) + (v & 65535) + (w & 65535);
        return ((o >>> 16) + (m >>> 16) + (q >>> 16) + (v >>> 16) + (w >>> 16) + (B >>> 16) & 65535) << 16 | B & 65535
    },
    r = function(o, m) {
        var q = [],
        v,
        w,
        B,
        D,
        I,
        p,
        n,
        z,
        A = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
        E = [1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782];
        o[m >> 5] |= 128 << 24 - m % 32;
        o[(m + 65 >> 9 << 4) + 15] = m;
        z = o.length;
        for (p = 0; p < z; p += 16) {
            m = A[0];
            v = A[1];
            w = A[2];
            B = A[3];
            D = A[4];
            for (n = 0; n < 80; n += 1) {
                q[n] = n < 16 ? o[n + p] : f(q[n - 3] ^ q[n - 8] ^ q[n - 14] ^ q[n - 16], 1);
                I = n < 20 ? l(f(m, 5), h(v, w, B), D, E[n], q[n]) : n < 40 ? l(f(m, 5), d(v, w, B), D, E[n], q[n]) : n < 60 ? l(f(m, 5), j(v, w, B), D, E[n], q[n]) : l(f(m, 5), d(v, w, B), D, E[n], q[n]);
                D = B;
                B = w;
                w = f(v, 30);
                v = m;
                m = I
            }
            A[0] = k(m, A[0]);
            A[1] = k(v, A[1]);
            A[2] = k(w, A[2]);
            A[3] = k(B, A[3]);
            A[4] = k(D, A[4])
        }
        return A
    },
    u = function(o, m) {
        this.strToHash = this.strBinLen = this.sha1 = null;
        if ("HEX" === m) {
            if (0 !== o.length % 2) return "TEXT MUST BE IN BYTE INCREMENTS";
            this.strBinLen = o.length * 4;
            this.strToHash = c(o)
        }
        else if ("ASCII" === m || "undefined" === typeof m) {
            this.strBinLen = o.length * 8;
            this.strToHash = b(o)
        }
        else return "UNKNOWN TEXT INPUT TYPE"
    };
    u.prototype = {
        getHash: function(o) {
            var m = null,
            q = this.strToHash.slice();
            switch (o) {
            case "HEX":
                m = e;
                break;
            case "B64":
                m = g;
                break;
            default:
                return "FORMAT NOT RECOGNIZED"
            }
            if (null === this.sha1) this.sha1 = r(q, this.strBinLen);
            return m(this.sha1)
        },
        getHMAC: function(o, m, q) {
            var v;
            v = [];
            var w = [];
            switch (q) {
            case "HEX":
                q = e;
                break;
            case "B64":
                q = g;
                break;
            default:
                return "FORMAT NOT RECOGNIZED"
            }
            if ("HEX" === m) {
                if (0 !== o.length % 2) return "KEY MUST BE IN BYTE INCREMENTS";
                m = c(o);
                o = o.length * 4
            }
            else if ("ASCII" === m) {
                m = b(o);
                o = o.length * 8
            }
            else return "UNKNOWN KEY INPUT TYPE";
            if (64 < o / 8) {
                m = r(m, o);
                m[15] &= 4294967040
            }
            else if (64 > o / 8) m[15] &= 4294967040;
            for (o = 0; o <= 15; o += 1) {
                v[o] = m[o] ^ 909522486;
                w[o] = m[o] ^ 1549556828
            }
            v = r(v.concat(this.strToHash), 512 + this.strBinLen);
            v = r(w.concat(v), 672);
            return q(v)
        }
    };
    window.jsSHA = u
})();

var Router = function() {
    var b;
    if (!window.history.pushState) return null;
    b = new Backbone.Router({
        routes: {
            "pin/:pinID/": "zoom",
            "pin/:pinID/repin/": "repin",
            ".*": "other"
        }
    });
    Backbone.history.start({
        pushState: true,
        silent: true
    });
    return b
} ();
var BoardLayout = function() {
    return {
        setup: function(b) {
            if (!this.setupComplete) {
                this.setupFlow();
                $(function() {
                    if (window.userIsAuthenticated) {
                        Like.gridListeners();
                        Follow.listeners();
                        Comment.gridComment();
                        RepinDialog2.setup()
                    }
                    Zoom.setup()
                });
                this.center = !!b;
                this.setupComplete = true
            }
        },
        setupFlow: function(b) {
            if (!this.flowSetupComplete) {
                BoardLayout.allPins();
                b || $(window).resize(_.throttle(function() {
                    BoardLayout.allPins()
                },
                200));
                this.flowSetupComplete = true
            }
        },
        pinsContainer: ".BoardLayout",
        pinArray: [],
        orderedPins: [],
        mappedPins: {},
        nextPin: function(b) {
            b = this.orderedPins.indexOf(b) + 1;
            if (b >= this.orderedPins.length) return 0;
            return this.orderedPins[b]
        },
        previousPin: function(b) {
            b = this.orderedPins.indexOf(b) - 1;
            if (b >= this.orderedPins.length) return 0;
            return this.orderedPins[b]
        },
        columnCount: 4,
        columns: 0,
        columnWidthInner: 192,
        columnMargin: 15,
        columnPadding: 30,
        columnContainerWidth: 0,
        allPins: function() {
            var b = $(this.pinsContainer + " .pin"),
            c = this.getContentArea();
            this.columnWidthOuter = this.columnWidthInner + this.columnMargin + this.columnPadding;
            this.columns = Math.max(this.columnCount, parseInt(c / this.columnWidthOuter, 10));
            if (b.length < this.columns) this.columns = Math.max(this.columnCount, b.length);
            c = this.columnWidthOuter * this.columns - this.columnMargin;
            var e = document.getElementById("wrapper");
            if (e) e.style.width = c + "px";
            $(".LiquidContainer").css("width", c + "px");
            for (c = 0; c < this.columns; c++)
            this.pinArray[c] = 0;
            document.getElementById("SortableButtons") ? this.showPins() : this.flowPins(b, true);
            if ($("#ColumnContainer .pin").length === 0 && window.location.pathname === "/") {
                $("#ColumnContainer").addClass("empty");
                setTimeout(function() {
                    window.location.reload()
                },
                5E3)
            }
        },
        newPins: function() {
            var b = window.jQuery ? ":last": ":last-of-type",
            c = $(this.pinsContainer + b + " .pin");
            c = c.length > 0 ? c: $(this.pinsContainer + b + " .pin");
            this.flowPins(c)
        },
        flowPins: function(b, c) {
            if (c) {
                this.mappedPins = {};
                this.orderedPins = []
            }
            if (this.pinArray.length > this.columns) this.pinArray = this.pinArray.slice(0, this.columns);
            for (c = 0; c < b.length; c++)
            this.positionPin(b[c]);
            this.updateContainerHeight();
            this.showPins();

            window.useLazyLoad && LazyLoad.invalidate()
        },
        positionPin: function(b) {
            var c = $(b).attr("data-id");
            if (c && this.mappedPins[c]) $(b).remove();
            else {
                var e = _.indexOf(this.pinArray, Math.min.apply(Math, this.pinArray)),
                g = this.shortestColumnTop = this.pinArray[e];
                b.style.top = g + "px";
                b.style.left = e * this.columnWidthOuter + "px";
                b.setAttribute("data-col", e);
                this.pinArray[e] = g + b.offsetHeight + this.columnMargin;
                this.mappedPins[c] = this.orderedPins.length;
                this.orderedPins.push(c)
            }
        },
        showPins: function() {
            $.browser.msie && parseInt($.browser.version, 10) == 7 || $(this.pinsContainer).css("opacity", 1);
            var b = $(this.pinsContainer);
            setTimeout(function() {
                b.css({
                    visibility: "visible"
                })
            },
            200)
        },
        imageLoaded: function() {
            $(this).removeClass("lazy")
        },
        getContentArea: function() {
            return this.contentArea || document.documentElement.clientWidth
        },
        updateContainerHeight: function() {
            $("#ColumnContainer").height(Math.max.apply(Math, this.pinArray))
        }
    }
} ();
var LazyLoad = new(function() {
    var b = this,
    c = 0,
    e = 0,
    g = 100,
    f = $(window);
    b.images = {};
    b.invalidate = function() {
        $("img.lazy").each(function(u, o) {
            u = $(o);
            b.images[u.attr("data-id")] = u;
            h(u) && j(u)
        })
    };
    b.check = function() {
        var u, o = false;
        return function() {
            if (!o) {
                o = true;
                clearTimeout(u);
                u = setTimeout(function() {
                    o = false;
                    d()
                },
                200)
            }
        }
    } ();
    var d = function() {
        var u = 0,
        o = 0;
        for (var m in b.images) {
            var q = b.images[m];
            u++;
            if (h(q)) {
                j(q);
                o++
            }
        }
    };
    b.stop = function() {
        f.unbind("scroll", k);
        f.unbind("resize", l)
    };
    var h = function(u) {
        return u.offset().top <= g
    },
    j = function(u) {
        if (u.hasClass("lazy")) {
            var o = u.attr("data-src"),
            m = u.attr("data-id");
            u.load(function() {
                if (u[0]) u[0].style.opacity = "1";
                delete b.images[m]
            });
            u.attr("src", o);
            u.removeClass("lazy");
            if (u[0]) u[0].style.opacity = "0"
        }
    },
    k = function() {
        c = $(window).scrollTop();
        r();
        b.check()
    },
    l = function() {
        e = $(window).height();
        r();
        b.check()
    },
    r = function() {
        g = c + e + 600
    };
    if (window.useLazyLoad) {
        f.ready(function() {
            k();
            l()
        });
        f.scroll(k);
        f.resize(l)
    }
});
var FancySelect = function() {
    var b;
    return {
        setup: function(c, e, g) {
            function f() {
                b.hide();
                j.hide()
            }
            function d() {
                j.show();
                b.show()
            }
            var h = $('<div class="FancySelect"><div class="current"><span class="CurrentSelection"></span><span class="DownArrow"></span></div><div class="FancySelectList"><div class="wrapper"><ul></ul></div></div></div>'),
            j = $(".FancySelectList", h),
            k = $("ul", j),
            l = $(".CurrentSelection", h),
            r = "",
            u,
            o;
            b || (b = $('<div class="FancySelectOverlay"></div>').appendTo("body"));
            c = $(c);
            u = c.prop("selectedIndex");
            e = e ||
            function() {
                return '<li data="' + $(this).val() + '"><span>' + $(this).text() + "</span></li>"
            };
            o = $("option", c);
            o.each(function(m) {
                r += e.call(this, m, m === u)
            });
            k.html(r);
            l.text(o.eq(u).text());
            c.before(h);
            c.hide();
            h.click(function() {
                d()
            });
            b.click(function() {
                f()
            });
            k.on("click", "li",
            function() {
                var m = $(this).prevAll().length;
                l.text($(this).text());
                c.prop("selectedIndex", m);
                f();
                g && g($(this).attr("data"));
                return false
            })
        }
    }
} ();

var boardPicker = function() {
    return {
        setup: function(b, c, e) {
            b = $(b);
            var g = $(".boardListOverlay", b.parent()),
            f = $(".boardList", b),
            d = $(".currentBoard", b),
            h = $("ul", f);
            b.click(function() {
                f.show();
                g.show()
            });
            g.click(function() {
                f.hide();
                g.hide()
            });
            $(h).on("click", "li",
            function() {
                if (!$(this).hasClass("noSelect")) {
                    d.text($(this).text());
                    g.hide();
                    f.hide();
                    c && c($(this).attr("data"))
                }
                return false
            });
            b = $(".createBoard", f);
            var j = $("input", b),
            k = $(".Button", b),
            l = $(".CreateBoardStatus", b);
            j.defaultValue("Create New Board");
            k.click(function() {
                if (k.attr("disabled") == "disabled") return false;
                if (j.val() == "Create New Board") {
                    l.html("Enter a board name").css("color", "red").show();
                    return false
                }
                l.html("").hide();
                k.addClass("disabled").attr("disabled", "disabled");
                $.post("/board/create/", {
                    name: j.val(),
                    pass_category: true
                },
                function(r) {
                    if (r && r.status == "success") {
                        h.append("<li data='" + r.id + "'><span>" + $("<div/>").text(r.name).html() + "</span></li>");
                        f.hide();
                        d.text(r.name);
                        j.val("").blur();
                        k.removeClass("disabled").removeAttr("disabled");
                        e && e(r.id)
                    }
                    else {
                        l.html(r.message).css("color", "red").show();
                        k.removeClass("disabled").removeAttr("disabled")
                    }
                },
                "json");
                return false
            })
        }
    }
} ();

var CropImage = function() {
    this.initialize.apply(this, arguments)
};

(function() {
    var b = Backbone.View.extend({
        el: "#CropImage",
        events: {
            "click .cancel": "onClose",
            "click .save": "onSave",
            "mousedown .drag": "onStartDrag"
        },
        dragging: false,
        mousePosition: {},
        initialize: function() {
            _.bindAll(this, "onDragging", "onStopDragging", "onImageLoaded");
            _.defaults(this.options, {
                title: "Crop Image",
                buttonTitle: "Save",
                size: {
                    width: 222,
                    height: 150
                }
            });
            this.$holder = this.$el.find(".holder");
            this.$bg = this.$el.find(".holder .bg");
            this.$overlay = this.$el.find(".holder .overlayContent");
            this.$frame = this.$el.find(".holder .frame");
            this.$mask = this.$el.find(".holder .mask");
            this.$footer = this.$el.find(".footer");
            this.$button = this.$el.find(".footer .Button.save");
            this.$spinner = this.$el.find(".holder .spinner")
        },
        render: function() {
            this.$el.find(".header span").text(this.options.title);
            this.$button.text(this.options.buttonTitle).removeClass("disabled");
            this.$holder.show().css("height", this.options.size.height + 120 + 40);
            this.$footer.find(".buttons").css("visibility", "visible");
            this.$footer.find(".complete").hide();
            this.$bg.html("").show();
            this.$spinner.hide();
            this.options.className && this.$el.addClass(this.options.className);
            this.options.overlay && this.$overlay.html("").append(this.options.overlay);
            var c = this.bounds = {
                left: this.$holder.width() / 2 - this.options.size.width / 2,
                width: this.options.size.width,
                top: 60,
                height: this.options.size.height
            };
            c.ratio = c.height / c.width;
            this.$frame.css(c);
            this.$mask.find("span").each(function(e, g) {
                e === 0 && $(g).css({
                    top: 0,
                    left: 0,
                    right: 0,
                    height: c.top
                });
                e === 1 && $(g).css({
                    top: c.top,
                    left: c.left + c.width,
                    right: 0,
                    height: c.height
                });
                e === 2 && $(g).css({
                    top: c.top + c.height,
                    left: 0,
                    right: 0,
                    bottom: 0
                });
                e === 3 && $(g).css({
                    top: c.top,
                    left: 0,
                    width: c.left,
                    height: c.height
                })
            });
            this.options.image && this.setImage(this.options.image)
        },
        onClose: function() {
            this.trigger("close");
            return false
        },
        onSave: function() {
            this.trigger("save");
            return false
        },
        onImageLoaded: function(c) {
            if (this.$img.height() === 0) return setTimeout(this.onImageLoaded, 200, c);
            this.$img.removeAttr("width").removeAttr("height");
            c = this.imageBounds = {
                originalWidth: this.$img.width(),
                originalHeight: this.$img.height()
            };
            c.ratio = c.originalHeight / c.originalWidth;
            this.$img.css({
                visibility: "visible",
                opacity: 1
            });
            this.fitImage();
            this.centerImage();
            this.hideSpinner()
        },
        onStartDrag: function(c) {
            this.mousePosition = {
                x: c.pageX,
                y: c.pageY
            };
            this.startPosition = {
                x: parseInt(this.$bg.css("left"), 10),
                y: parseInt(this.$bg.css("top"), 10)
            };
            this.trigger("startDrag");
            this.dragging = true;
            $("body").on({
                mousemove: this.onDragging,
                mouseup: this.onStopDragging
            });
            c.preventDefault()
        },
        onDragging: function(c) {
            var e = {
                top: this.startPosition.y + (c.pageY - this.mousePosition.y),
                left: this.startPosition.x + (c.pageX - this.mousePosition.x)
            };
            if (this.enforceBounds(e)) {
                this.$bg.css(e);
                c.preventDefault()
            }
        },
        onStopDragging: function() {
            this.trigger("stopDrag");
            this.dragging = false;
            $("body").off({
                mousemove: this.onDragging,
                mouseup: this.onStopDragging
            })
        },
        enforceBounds: function(c) {
            c.top = Math.min(c.top, this.bounds.top);
            c.left = Math.min(c.left, this.bounds.left);
            if (c.left + this.imageBounds.width < this.bounds.left + this.bounds.width) c.left = this.bounds.left + this.bounds.width - this.imageBounds.width + 1;
            if (c.top + this.imageBounds.height < this.bounds.top + this.bounds.height) c.top = this.bounds.top + this.bounds.height - this.imageBounds.height + 1;
            return c
        },
        showComplete: function() {
            this.$footer.find(".buttons").css("visibility", "hidden");
            this.$footer.find(".complete").fadeIn(300);
            this.hideSpinner()
        },
        setImage: function(c) {
            this.showSpinner();
            var e = this.$img = $("<img>");
            e.load(this.onImageLoaded).css({
                opacity: "0.01",
                visibility: "hidden"
            });
            e.attr("src", c);
            this.$bg.html(e)
        },
        fitImage: function() {
            var c = 1;
            c = this.imageBounds.ratio >= this.bounds.ratio ? this.bounds.width / this.imageBounds.originalWidth: this.bounds.height / this.imageBounds.originalHeight;
            this.scaleImage(c, 10)
        },
        centerImage: function() {
            var c = this.$holder.height() - 40,
            e = this.$holder.width();
            this.$bg.css({
                top: c / 2 - this.$bg.height() / 2 + 1,
                left: e / 2 - this.$bg.width() / 2 + 1
            })
        },
        scaleImage: function(c, e) {
            var g = this.imageBounds.width = this.imageBounds.originalWidth * c + e || 0;
            c = this.imageBounds.height = this.imageBounds.originalHeight * c + e || 0;
            this.$img.attr("width", g);
            this.$img.attr("height", c)
        },
        getOffset: function() {
            return {
                x: Math.abs(parseInt(this.$bg.css("left"), 10) - this.bounds.left),
                y: Math.abs(parseInt(this.$bg.css("top"), 10) - this.bounds.top)
            }
        },
        getScale: function() {
            return this.$img.width() / this.imageBounds.originalWidth
        },
        saving: function() {
            this.showSpinner();
            this.$button.addClass("disabled")
        },
        showSpinner: function() {
            this.$spinner.show()
        },
        hideSpinner: function() {
            this.$spinner.hide()
        }
    });
    CropImage.prototype = {
        initialize: function() {
            _.bindAll(this, "save", "close")
        },
        show: function(c) {
            var e = this;
            c = this.view = new b(c);
            this.options = this.view.options;
            c.on("save", this.save);
            c.on("close", this.close);
            c.on("stopDrag",
            function() {
                e.trigger("dragComplete")
            });
            Modal.show("CropImage");
            c.render()
        },
        setImage: function(c) {
            this.view.setImage(c)
        },
        setParams: function(c) {
            this.options.params = c
        },
        save: function() {
            var c = this,
            e = this.view.getOffset(),
            g = this.view.getScale();
            e = _.extend({
                x: e.x,
                y: e.y,
                width: this.options.size.width,
                height: this.options.size.height,
                scale: g
            },
            this.options.params || {});
            this.view.saving();
            this.trigger("saving", e);
            $.ajax({
                url: this.options.url,
                data: e,
                dataType: "json",
                type: "POST",
                success: function(f) {
                    c.view.hideSpinner();
                    c.trigger("save", f);
                    c.options.delay !== 0 && c.view.showComplete();
                    setTimeout(c.close, c.options.delay || 1200)
                }
            })
        },
        close: function() {
            Modal.close("CropImage");
            this.view.undelegateEvents();
            this.trigger("close");
            delete this.view;
            delete this.options
        }
    };
    _.extend(CropImage.prototype, Backbone.Events)
})();
var BoardCoverSelector = function() {
    this.initialize.apply(this, arguments)
};
(function() {
    var b = null;
    BoardCoverSelector.prototype = {
        pins: null,
        index: null,
        boardURL: null,
        initialize: function() {
            if (b) {
                b.cancel();
                b = null
            }
            _.bindAll(this, "onKeyup", "onPinsLoaded", "onSave", "onSaving", "removeListeners", "next", "previous");
            b = this;
            this.options = {};
            this.imageCrop = new CropImage;
            this.imageCrop.on("close", this.removeListeners);
            this.imageCrop.on("save", this.onSave);
            this.imageCrop.on("saving", this.onSaving);
            this.imageCrop.on("dragComplete",
            function() {
                trackGAEvent("board_cover", "dragged")
            });
            this.$img = $("<img>")
        },
        loadPins: function() {
            $.ajax({
                url: this.options.boardURL + "pins/",
                dataType: "json",
                success: this.onPinsLoaded
            });
            this.boardURL = this.options.boardURL
        },
        show: function(c) {
            this.options = c;
            this.imageCrop.show({
                className: "BoardCover",
                overlay: this.overlayContent(),
                params: {
                    pin: c.pin
                },
                image: this.options.image,
                size: {
                    width: 222,
                    height: 150
                },
                title: c.title || "Select a cover photo and drag to position it.",
                buttonTitle: c.buttonTitle || "Set Cover",
                url: this.options.boardURL + "cover/",
                delay: c.delay
            });
            if (!this.pins || this.boardURL != this.options.boardURL) this.loadPins();
            else this.options.image || this.setIndex(0);
            trackGAEvent("board_cover", "show");
            $("body").keyup(this.onKeyup)
        },
        onPinsLoaded: function(c) {
            var e = null;
            if (this.options.image) {
                var g = this.options.image;
                _.each(c.pins,
                function(f, d) {
                    if (e == null && g.match(new RegExp(f.image_key, "gi"))) e = d
                })
            }
            this.index = e || 0;
            this.pins = c.pins;
            if (this.pins.length !== 0) {
                this.pins.length === 1 ? this.hideArrows() : this.preload([e - 1, e + 1]);
                e === null && this.setIndex(0)
            }
        },
        onKeyup: function(c) {
            if (this.index !== null) {
                c.keyCode === 37 && this.previous();
                c.keyCode === 39 && this.next();
                c.keyCode === 27 && this.imageCrop.close();
                c.keyCode === 13 && this.imageCrop.save()
            }
        },
        overlayContent: function() {
            var c = this.$holder = $("<div class='BoardOverlay'></div>"),
            e = $('<button class="prev Button WhiteButton Button13" type="button"><em></em></button>').click(this.previous),
            g = $('<button class="next Button WhiteButton Button13" type="button"><em></em></button>').click(this.next);
            c.append("<h3 class='serif'>" + this.options.boardName + "</h3>");
            c.append(e, g);
            return c
        },
        next: function() {
            this.index === this.pins.length - 1 ? this.setIndex(0) : this.setIndex(this.index + 1);
            trackGAEvent("board_cover", "toggle_pin");
            return false
        },
        previous: function() {
            this.index === 0 ? this.setIndex(this.pins.length - 1) : this.setIndex(this.index - 1);
            trackGAEvent("board_cover", "toggle_pin");
            return false
        },
        setIndex: function(c) {
            var e = this.pins[c];
            if (e) {
                this.imageCrop.setImage(e.url);
                this.imageCrop.setParams({
                    pin: e.id
                });
                this.index = c;
                this.preload([this.index - 2, this.index - 1, this.index + 1, this.index + 2])
            }
        },
        preload: function(c) {
            var e = this;
            _.each(c,
            function(g) {
                if (g = e.pins[g])(new Image).src = g.url
            })
        },
        hideArrows: function() {
            this.$holder.find(".arrow").hide()
        },
        removeListeners: function() {
            $("body").unbind("keyup", this.onKeyup)
        },
        onSaving: function() {
            this.hideArrows()
        },
        onSave: function(c) {
            this.options.success && this.options.success(c);
            trackGAEvent("board_cover", "saved")
        }
    };
    _.extend(BoardCoverSelector.prototype, Backbone.Events)
})();

var AddDialog = function() {
    return {
        setup: function(b) {
            var c = "#" + b,
            e = $(c),
            g = $(".Buttons .RedButton", e),
            f = $(".mainerror", e),
            d = $(".DescriptionTextarea", e);
            BoardPicker.setup(c + " .BoardPicker",
            function(h) {
                $(c + " #id_board").val(h)
            },
            function(h) {
                $(c + " #id_board").val(h)
            });
            AddDialog.shareCheckboxes(b);
            Tagging.initTextarea(c + " .DescriptionTextarea");
            Tagging.priceTag(c + " .DescriptionTextarea", c + " .ImagePicker");
            CharacterCount.setup(c + " .DescriptionTextarea", c + " .CharacterCount", c + " .Button");
            g.click(function() {
                if (g.hasClass("disabled")) return false;
                trackGAEvent("pin", "clicked", "add_dialogue");
                if (d.val() === "" || d.val() === "Describe your pin...") {
                    f.html("Please describe your pin").slideDown(300);
                    return false
                }
                else f.slideUp(300,
                function() {
                    f.html("")
                });
                g.addClass("disabled").html("Pinning...");
                $("#id_details", e).val(d.val());
                Tagging.loadTags(c + " .DescriptionTextarea", c + " #peeps_holder", c + " #id_tags", c + " #currency_holder");
                $("form", e).ajaxSubmit({
                    url: "/pin/create/",
                    type: "POST",
                    dataType: "json",
                    iframe: true,
                    success: function(h) {
                        if (h.status == "success") {
                            trackGAEvent("pin", "success", "add_dialogue");
                            window.location = h.url
                        }
                        else if (h.captcha) {
                            RecaptchaDialog.challenge();
                            AddDialog.reset(b)
                        }
                        else f.html(h.message).slideDown(300)
                    }
                });
                return false
            })
        },
        reset: function(b) {
            b === "CreateBoard" && CreateBoardDialog.reset();
            b === "ScrapePin" && ScrapePinDialog.reset();
            b === "UploadPin" && UploadPinDialog.reset();
            AddDialog._resets[b] && AddDialog._resets[b]()
        },
        close: function(b, c) {
            $("#" + b).addClass("super");
            Modal.show(c)
        },
        childClose: function(b, c) {
            var e = this,
            g = $("#" + c);
            $(".ModalContainer", g);
            e.reset(c);
            $("#" + b).removeClass("super");
            Modal.close(b);
            Modal.close(c)
        },
        pinBottom: function(b) {
            var c = $("#" + b);
            $(".PinBottom", c).slideDown(300,
            function() {
                var e = $(".modal:first", c);
                e.css("margin-bottom", "-" + e.outerHeight() / 2 + "px")
            })
        },
        shareCheckboxes: function(b) {
            function c(f) {
                var d = $("#" + b),
                h = $(".publish_to_" + f, d),
                j = $("#id_publish_to_" + f, d);
                h.change(function() {
                    if (h.is(":checked")) {
                        j.attr("checked", "checked");
                        h.parent().addClass("active")
                    }
                    else {
                        j.removeAttr("checked");
                        h.parent().removeClass("active")
                    }
                });
                var k = h.is(":checked");
                return function() {
                    if (k) {
                        h.parent().addClass("active");
                        h.attr("checked", "checked")
                    }
                    else {
                        h.parent().removeClass("active");
                        h.removeAttr("checked")
                    }
                }
            }
            var e = c("facebook"),
            g = c("twitter");
            AddDialog._resets = AddDialog._resets || {};
            AddDialog._resets[b] = function() {
                e();
                g()
            }
        }
    }
} ();
var Home = function() {
    return {
        setup: function() {
            var b = null,
            c = $(window),
            e = false;
            $(document).ready(function() {
                if ($("#CategoriesBarPage #TopNagCallout").length) {
                    $("#SearchAutocompleteHolder ul").css("top", "71px");
                    $("#UnauthCallout .Nag").css("top", "110px")
                }
            });
            $(window).scroll(function() {
                var g = c.scrollTop() >= 44;
                if ($("#CategoriesBarPage #TopNagCallout").length) g = c.scrollTop() >= 80;
                b || (b = $("#CategoriesBar, .Nag"));
                if (!e && g) {
                    b.addClass("fixed");
                    e = true
                } else if (e && !g) {
                    b.removeClass("fixed");
                    e = false
                }
            });
            $("#home_request_invite_button").click(function() {
                var g = $(this);
                if ($("#home_request_invite").val() == "Your Email Address" || $("#home_request_invite").val() == "") $(".signup span").html("Please enter an email").css("color", "red");
                else {
                    g.addClass("pressed").attr("disabled", "disabled");
                    $.post("/", {
                        email: $("#home_request_invite").val()
                    },
                    function(f) {
                        if (f.status == "success") {
                            $(".signup span").html("Thanks. You're on the list!").css("color", "green");
                            $("#home_request_invite").val("")
                        } else {
                            $(".signup span").html(f.message).css("color", "red");
                            this_button.removeAttr("disabled").removeClass("pressed")
                        }
                    },
                    "json")
                }
                return false
            });
            $(".remove_activity_rec").live("click",
            function() {
                $this_element = $(this);
                $.get("/remove_follow_recommend/?rec_id=" + $(this).attr("data-remove_id"),
                function(g) {
                    if (g && g.status == "success") {
                        window.activity_feed.update_ui_followed_succeeded($this_element);
                        g = $(this).parent().siblings(".hidden")[0];
                        $(g).removeClass("hidden")
                    } else alert(g.message)
                })
            });
            $(".remove_activity_invite").live("click",
            function() {
                var g = $(this);
                $.get("/remove_invite/?rec_id=" + $(this).attr("data-remove_id"),
                function(f) {
                    if (f.status == "success") {
                        window.activity_feed.update_ui_invited_user(g);
                        f = $(this).parent().siblings(".hidden")[0];
                        $(f).removeClass("hidden")
                    } else alert(f.message)
                })
            });
            $("#follow_all_link").live("click",
            function() {
                $.get("/follow_all_recommends/",
                function(g) {
                    g && g.status == "success" ? window.activity_feed.update_ui_followed_all_recommened() : alert(g.message)
                })
            });
            $("#invite_all_link").live("click",
            function() {
                $.get("/invite_all/",
                function(g) {
                    g && g.status == "success" ? window.activity_feed.update_ui_invited_all_users() : alert(g.message)
                })
            })
        },
        activityFeedSupport: function() {
            this.init = function() {
                this.invite_all_link = $("#invite_all_link");
                this.follow_all_link = $("#follow_all_link")
            };
            this.update_ui_invited_user = function(b) {
                this.fade_row(b);
                if (this.invite_all_link && this.invite_all_link.length) if (this.invite_all_link.attr("data-total_count")) {
                    b = this.invite_all_link.attr("data-total_count");
                    if (b == "1") this.hide_invites();
                    else {
                        this.invite_all_link.attr("data-total_count", b - 1);
                        this.invite_all_link.html("Invite all (" + (b - 1) + ")")
                    }
                }
            };
            this.update_ui_followed_succeeded = function(b) {
                this.fade_row(b);
                if (this.follow_all_link && this.follow_all_link.length) if (this.follow_all_link.attr("data-total_count")) {
                    b = this.follow_all_link.attr("data-total_count");
                    if (b == "1") this.hide_recommends();
                    else {
                        this.follow_all_link.attr("data-total_count", b - 1);
                        this.follow_all_link.html("Follow all (" + (b - 1) + ")")
                    }
                }
            };
            this.update_ui_invited_all_users = function() {
                this.hide_invites()
            };
            this.update_ui_followed_all_recommened = function() {
                this.hide_recommends()
            };
            this.fade_row = function(b) {
                b.parents(".story:first").fadeOut()
            };
            this.hide_invites = function() {
                this.invite_all_link.parents("#invite_friends:first").fadeOut()
            };
            this.hide_recommends = function() {
                this.follow_all_link.parents("#recommended_friends:first").fadeOut()
            }
        }
    }
} ();
var GetNewPins = function() {
    return {
        timeout: null,
        timeoutLength: 8192,
        timeoutLengthMax: 524288,
        marker: 0,
        indicator: "#NewIndicator",
        newPins: {
            html: "",
            number: 0,
            old_title: $("title").html()
        },
        setTimeout: function() {
            var b = this;
            b.timeout = setTimeout("GetNewPins.checkForPins()", b.timeoutLength)
        },
        resetTimeout: function() {
            window.clearTimeout(this.timeout);
            this.setTimeout()
        },
        trigerOnScroll: function() {
            var b = this;
            b.setTimeout();
            $(window).bind("scroll",
            function() {
                b.timeoutLength = 8192;
                b.resetTimeout()
            })
        },
        checkForPins: function() {
            var b = this;
            $.get("/new/", {
                marker: b.marker,
                number: b.newPins.number
            },
            function(c) {
                if (c.number > 0) {
                    var e = b.indicator;
                    b.marker = c.marker;
                    b.newPins.html += c.html;
                    b.newPins.number += c.number;
                    $("title").html("(" + b.newPins.number + ") " + b.newPins.old_title);
                    $(e).html(c.total_number_str);
                    $(e).hasClass("Offscreen") && $(e).removeClass("Offscreen");
                    if (b.timeoutLength < b.timeoutLengthMax) b.timeoutLength *= 2;
                    b.setTimeout()
                }
            })
        },
        showNewPins: function() {
            var b = this,
            c = b.indicator;
            $(".feed").length > 0 ? $(".feed").after(b.newPins.html) : $("#ColumnContainer").prepend(b.newPins.html);
            BoardLayout.allPins();
            $(c).addClass("Offscreen");
            $(c).html("");
            $("title").html(b.newPins.old_title);
            b.newPins = {
                html: "",
                number: 0,
                old_title: $("title").html()
            };
            b.resetTimeout();
            $("html, body").animate({
                scrollTop: "0px"
            },
            400);
            return false
        }
    }
} ();
var BoardSort = BoardSort || {
    StartButton: "#slk_sort_boards",
    SaveButton: "#RearrangeButton",
    FollowButtons: ".followBoard .Button",
    Container: ".sortable",
    Objects: ".pinBoard",
    Helper: "#SortableButtons",
    showControls: function() {
        $(this.Helper).slideDown();
        $(this.FollowButtons).hide();
        $(this.Objects).addClass("inMotion")
    },
    hideControls: function() {
        $(this.Helper).slideUp();
        $(this.FollowButtons).show();
        $(this.Objects).removeClass("inMotion")
    },
    start: function() {
        this.showControls();
        $(this.Container).sortable();
        return false
    },
    save: function() {
        trackGAEvent("rearrange_board_save", "clicked");
        this.hideControls();
        $(this.Container).sortable("destroy");
        $(this.Objects).removeClass("inMotion");
        var b = [];
        $(this.Objects).each(function() {
            b.push(this.id.replace("board", ""))
        });
        $.post($(this.SaveButton).attr("href"), {
            order_array: b.toString()
        },
        function(c) {
            if (c.status == "success") {
                trackGAEvent("rearrange_board_save", "success");
                console.log("Sorting saved.");
                $("#SortStatus").html("Saved!").css("color", "green").stop().css("opacity", "1").animate({
                    opacity: "0"
                },
                5E3)
            } else {
                console.log("Sorting failed.");
                $("#SortStatus").html("Saved Failed &mdash; <a href='#' onclick='boardSort.save(); return false' style='font-weight: 300;'>Try Again</a>?").css("color", "#221919").css("opacity", "1")
            }
        });
        return false
    },
    cancel: function() {
        this.hideControls();
        window.location.reload();
        return false
    }
};
var Follow = function() {
    return {
        listeners: function() {
            var b = this;
            $(".followbutton").live("click",
            function() {
                trackGAEvent("follow_board", "clicked");
                b.followBoard($(this));
                return false
            });
            $(".unfollowbutton").live("click",
            function() {
                trackGAEvent("unfollow_board", "clicked");
                b.unfollowBoard($(this));
                return false
            });
            $(".followuserbutton").live("click",
            function() {
                trackGAEvent("follow_user", "clicked");
                b.followUser($(this));
                return false
            });
            $(".unfollowuserbutton").live("click",
            function() {
                trackGAEvent("unfollow_user", "clicked");
                b.unfollowUser($(this));
                return false
            });
            $(".ignorerecommendationbutton").live("click",
            function() {
                b.ignoreUser($(this));
                return false
            })
        },
        followBoard: function(b) {
            var c = this;
            this.setFollowBoardButton(b, {
                follow: false,
                disabled: true
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                error: function() {
                    c.setFollowBoardButton(b, {
                        follow: true,
                        disabled: false
                    })
                },
                success: function(e) {
                    if (e.status == "failure") {
                        if (e.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        c.setFollowBoardButton(b, {
                            follow: true,
                            disabled: true
                        });
                        alert(e.message);
                        return false
                    }
                    trackGAEvent("follow_board", "success");
                    c.setFollowBoardButton(b, {
                        follow: false,
                        disabled: false
                    })
                }
            })
        },
        unfollowBoard: function(b) {
            var c = this;
            this.setFollowBoardButton(b, {
                follow: true,
                disabled: true
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    unfollow: 1
                },
                error: function() {
                    c.setFollowBoardButton(b, {
                        follow: false,
                        disabled: false
                    })
                },
                success: function() {
                    trackGAEvent("unfollow_board", "success");
                    c.setFollowBoardButton(b, {
                        follow: true,
                        disabled: false
                    })
                }
            })
        },
        followUser: function(b) {
            var c = $("#profile").length != 0 ? "Unfollow All": "Unfollow",
            e = this;
            if (b.data("text-unfollow")) c = b.data("text-unfollow");
            var g = b.text();
            b.text(c).removeClass("followuserbutton").addClass("disabled unfollowuserbutton").attr("disabled", "disabled");
            var f = $(".followbutton");
            f.each(function() {
                e.setFollowBoardButton($(this), {
                    follow: false,
                    disabled: false
                })
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                error: function() {},
                success: function(d) {
                    if (d.status == "failure") {
                        if (d.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        b.text(g).removeClass("disabled clickable unfollowuserbutton").addClass("followuserbutton").attr("disabled", "disabled");
                        f.each(function() {
                            e.setFollowBoardButton($(this), {
                                follow: true,
                                disabled: false
                            })
                        });
                        alert(d.message);
                        return false
                    }
                    trackGAEvent("follow_user", "success");
                    b.removeAttr("disabled").addClass("clickable");
                    $(window).trigger("user:followed", [b])
                }
            })
        },
        unfollowUser: function(b) {
            var c = $("#profile").length != 0 ? "Follow All": "Follow",
            e = this;
            if (b.data("text-follow")) c = b.data("text-follow");
            b.text(c).removeClass("disabled clickable unfollowuserbutton").addClass("followuserbutton").attr("disabled", "disabled");
            $(".unfollowbutton").each(function() {
                e.setFollowBoardButton($(this), {
                    follow: true,
                    disabled: false
                })
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    unfollow: 1
                },
                error: function() {},
                success: function() {
                    trackGAEvent("unfollow_user", "success");
                    b.removeAttr("disabled");
                    $(window).trigger("user:unfollowed", [b])
                }
            })
        },
        ignoreUser: function(b) {
            var c = _.map(b.closest(".section").find(".FollowStory"),
            function(e) {
                return $(e).attr("data-user-id")
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    displayed_user_ids: c
                },
                error: function() {},
                success: function(e) {
                    var g = b.closest(".story"),
                    f = b.closest(".section"),
                    d = Follow.countStories(f);
                    trackGAEvent("ignore_user", "success", "source", b.data("source"));
                    e = $(e.html).css("padding-top", g.css("padding-top"));
                    e.insertAfter(g).hide();
                    Follow.replaceRecommendation(g, d, e, f)
                }
            })
        },
        replaceRecommendation: function(b, c, e, g) {
            b.fadeOut(350,
            function() {
                b.remove();
                Follow.handleChangingStories(c, Follow.countStories(g));
                e.fadeIn(350)
            })
        },
        countStories: function(b) {
            return b.find(".FollowStory").length
        },
        handleChangingStories: function(b, c) {
            if (c == 0) {
                var e = $("#UserRecommendations");
                e.fadeOut(350,
                function() {
                    e.remove()
                })
            }
            b != c && BoardLayout.allPins()
        },
        followUserHomeActivity: function(b) {
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    is_home: true
                },
                error: function() {},
                success: function() {
                    trackGAEvent("follow_user_home_activity", "success");
                    window.activity_feed.update_ui_followed_succeeded(b)
                }
            })
        },
        pullRecommendation: function(b, c) {
            b = _.map($(b).closest(".section").find(".FollowStory"),
            function(e) {
                return $(e).attr("data-user-id")
            });
            $.ajax({
                url: "/recommendations/",
                type: "GET",
                dataType: "json",
                data: {
                    displayed_user_ids: b
                },
                success: function(e) {
                    c($(e.html))
                }
            })
        },
        setFollowBoardButton: function(b, c) {
            var e = c.disabled;
            if (c.follow) {
                c = b.data("text-follow") || "Follow";
                b.removeClass("disabled clickable unfollowbutton").addClass("followbutton")
            } else {
                c = b.data("text-unfollow") || "Unfollow";
                b.removeClass("followbutton").addClass("disabled clickable unfollowbutton")
            }
            e ? b.attr("disabled", "disabled") : b.removeAttr("disabled");
            b.text(c)
        }
    }
} ();
var Comment = function() {
    return {
        gridShowButton: function(b) {
            b.show();
            BoardLayout.allPins()
        },
        gridComment: function() {
            var b = this;
            $(".write textarea");
            $("#ColumnContainer").on("focus", ".write .GridComment",
            function() {
                var c = $(this).parents(".pin").first(),
                e = $(this).parent().find(".Button");
                b.gridShowButton(e);
                e = b.getCommenters(c.find(".comments .comment"));
                c = b.getPinner(c.find("div.attribution:first"));
                e[c.link] = c;
                Tagging.initTextarea($(this), e)
            });
            $("#ColumnContainer").on("click", ".actions .comment",
            function() {
                trackGAEvent("comment_button", "clicked");
                var c = $(this),
                e = c.parents(".pin").find(".write"),
                g = e.find(".Button");
                if (c.hasClass("disabled")) {
                    e.slideUp("fast",
                    function() {
                        e.find("textarea").blur();
                        BoardLayout.allPins()
                    });
                    c.removeClass("disabled clickable")
                } else {
                    g.css("visibility", "hidden");
                    e.slideDown("fast",
                    function() {
                        g.css("visibility", "visible");
                        e.find("textarea").focus()
                    });
                    c.addClass("disabled clickable")
                }
                return false
            });
            $("#ColumnContainer").on("click", ".write .Button",
            function() {
                trackGAEvent("comment_submit", "clicked", "grid");
                var c = $(this),
                e = c.parent(),
                g = c.parents("form"),
                f = c.parents(".pin"),
                d = $(".CommentsCount", f),
                h = $("textarea", f),
                j = h.val(),
                k = $("div.comments", f),
                l = $(".all", f);
                if (j != "") {
                    Tagging.loadTags($(".GridComment", e), $(".pin_comment_replies", e));
                    if (!c.hasClass("disabled")) {
                        c.addClass("disabled");
                        $.ajax({
                            url: g.attr("action"),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: j,
                                replies: $(".pin_comment_replies", e).val(),
                                home: "1",
                                path: window.location.pathname
                            },
                            error: function(r) {
                                alert(r.message)
                            },
                            success: function(r) {
                                trackGAEvent("comment_submit", "success", "grid");
                                if (r.status == "fail" && r.captcha) {
                                    RecaptchaDialog.challenge();
                                    return false
                                }
                                var u = $(r.html).hide();
                                d.html(r.count_str);
                                if (l.length != 0) {
                                    l.before(u);
                                    l.html(r.all_str)
                                } else if (k.length === 0) {
                                    f.find(".attribution").after("<div class='comments colormuted'></div>");
                                    f.find(".comments").html(u);
                                    d.removeClass("hidden")
                                } else f.find("div.comments .comment:last").after(u);
                                h.remove();
                                g.prepend(h.clone().text(""));
                                u.slideDown("fast",
                                function() {
                                    BoardLayout.allPins()
                                })
                            },
                            complete: function() {
                                c.removeClass("disabled")
                            }
                        })
                    }
                }
            })
        },
        closeupComment: function() {
            var b = $("#CloseupComment"),
            c = $("#PostComment");
            b.focus(function() {
                $("#PinAddCommentControls").slideDown(250)
            });
            b.bind("keyup",
            function() {
                $("#CloseupComment").val() != "" ? c.removeClass("disabled") : c.addClass("disabled")
            });
            var e = this.getCommenters(".PinComments .comment"),
            g = this.getPinner("#PinPinner");
            e[g.link] = g;
            Tagging.initTextarea("#CloseupComment", e);
            c.click(function() {
                trackGAEvent("comment_submit", "clicked", "closeup");
                Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
                var f = $(this),
                d = $("#pin_comment_replies").val(),
                h = b.val();
                if (h != "") {
                    $.trim(h);
                    if (!f.hasClass("disabled")) {
                        f.addClass("disabled");
                        $.ajax({
                            url: $("#post_comment_url").val(),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: h,
                                replies: d,
                                path: window.location.pathname
                            },
                            error: function(j) {
                                alert(j.message)
                            },
                            success: function(j) {
                                if (j.status == "fail" && j.captcha) {
                                    RecaptchaDialog.challenge(function() {
                                        f.removeClass("disabled")
                                    });
                                    return false
                                } else if (j.status == "fail") alert(j.message);
                                else {
                                    trackGAEvent("comment_submit", "success", "closeup");
                                    Tagging.initTextarea("#CloseupComment");
                                    b.val("");
                                    $("#pin_comment_replies").val("");
                                    var k = $(j.html).css({
                                        "background-color": "#fbffcc"
                                    });
                                    $(".PinComments").append(k)
                                }
                                k.removeClass("hidden").animate({
                                    backgroundColor: "#f2f0f0",
                                    display: "block"
                                },
                                1200)
                            }
                        })
                    }
                }
                return false
            })
        },
        zoomComment: function() {
            var b = $("#zoom"),
            c = $("#CloseupComment", b),
            e = $("#PostComment", b);
            c.focus(function() {
                $("#PinAddCommentControls", b).slideDown(250)
            });
            c.bind("keyup",
            function() {
                c.val() != "" ? e.removeClass("disabled") : e.addClass("disabled")
            });
            var g = this.getCommenters("#zoom .PinComments .comment"),
            f = this.getPinner("#PinPinner");
            g[f.link] = f;
            Tagging.initTextarea("#CloseupComment", g);
            e.click(function() {
                trackGAEvent("comment_submit", "clicked", "zoom");
                Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
                var d = $(this),
                h = $("#pin_comment_replies", b).val(),
                j = c.val();
                if (j != "") {
                    $.trim(j);
                    if (!d.hasClass("disabled")) {
                        d.addClass("disabled");
                        $.ajax({
                            url: $("#post_comment_url", b).val(),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: j,
                                replies: h,
                                path: window.location.pathname
                            },
                            error: function(k) {
                                alert(k.message)
                            },
                            success: function(k) {
                                if (k.status == "fail" && k.captcha) {
                                    RecaptchaDialog.challenge(function() {
                                        d.removeClass("disabled")
                                    });
                                    return false
                                } else if (k.status == "fail") alert(k.message);
                                else {
                                    trackGAEvent("comment_submit", "success", "zoom");
                                    Tagging.initTextarea("#CloseupComment");
                                    c.val("");
                                    $("#pin_comment_replies", b).val("");
                                    k = $(k.html).css({
                                        "background-color": "#fbffcc"
                                    });
                                    $(".PinComments", b).append(k)
                                }
                                k.removeClass("hidden").animate({
                                    backgroundColor: "#ffffff",
                                    display: "block"
                                },
                                220)
                            }
                        })
                    }
                }
                return false
            })
        },
        getCommenters: function(b) {
            var c = {};
            $(b).each(function(e, g) {
                g = $(g);
                e = g.find("p a:first").attr("href"); ! e || c[e] || (c[e] = {
                    label: g.find("p a:first").text(),
                    value: e.replace(/\//g, ""),
                    image: g.find("img:first").attr("src"),
                    link: e
                })
            });
            return c
        },
        getPinner: function(b) {
            b = $(b);
            var c = b.find("a").attr("href");
            return {
                label: b.find("p:first a:first").text(),
                value: c.replace(/\//g, ""),
                image: b.find("a img:first").attr("src"),
                link: c
            }
        }
    }
} ();
var Logout = function() {
    return {
        logout: function() {
            trackGAEvent("logout", "attempt");
            $.ajax({
                url: "/logout/",
                type: "POST",
                dataType: "json",
                data: {},
                error: function(b) {
                    alert(b.message)
                },
                success: function() {
                    trackGAEvent("logout", "success");
                    window.location = "/"
                }
            })
        }
    }
} ();
var zoomCount = 0,
Zoom = function() {
    return {
        HTMLloading: "<div id='loading'><img src='" + media_url + "images/rotating_pin.png' alt='Loading Animation' /></div>",
        HTMLshow: "<div id='zoomScroll' class='visible loading'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
        HTMLzoom: "<div id='zoomScroll'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
        setup: function() {
            if (window.location.hash == "#_=_") window.location.hash = "";
            var b = this,
            c = !navigator.userAgent.match(/ipad|ipod|iphone|android/i) && !!window.Router;
            isWebkit = $.browser.webkit;
            isFireFox = $.browser.mozilla;
            isChrome = navigator.userAgent.match(/chrome/i);
            isFireFox && $("body").addClass("extraScroll");
            isChrome && $("body").addClass("hidefixed");
            if (c) {
                Router.on("route:zoom",
                function(e) {
                    if (!b.open) {
                        isWebkit ? b.zoom(e) : b.show(e);
                        b.open = true
                    }
                });
                Router.on("route:other",
                function() {
                    b.close()
                });
                if (isWebkit) {
                    zoomTimer = 220;
                    c = '<style type="text/css">#zoomScroll,#zoomScroll.visible #zoom,#zoomScroll.visible .PinImage img,#zoom .PriceContainer,#zoom .PriceContainer *,#zoom .convo .ImgLink,#zoom .convo .ImgLink img,#zoom .comments .comment,#zoom #loading img{-moz-transition: all ' + zoomTimer / 1E3 + "s ease-out; -webkit-transition: all " + zoomTimer / 1E3 + "s ease-out;}</style>";
                    $("head").append(c);
                    $("#ColumnContainer").on("mousedown", ".PinImage",
                    function() {
                        $(this).parents(".pin").addClass("spring")
                    });
                    $("#ColumnContainer").on("mouseout", ".spring",
                    function() {
                        $(this).removeClass("spring")
                    })
                }
                $("#ColumnContainer").on("click", ".PinImage",
                function(e) {
                    if (e.cntrlKey || e.metaKey) return true;
                    e = $(this).parents(".pin").attr("data-id");
                    zoomCount++;
                    trackGAEvent("zoom_pin", "clicked", zoomCount);
                    Router.navigate("/pin/" + e + "/", {
                        trigger: true
                    });
                    return false
                })
            }
        },
        zoom: function(b) {
            var c = this;
            htmlZoom = c.HTMLzoom.replace("%PIN_ID%", b);
            $("body").addClass("noscroll").append(htmlZoom);
            var e = $("#zoomScroll"),
            g = $("#zoom");
            setTimeout(function() {
                e.addClass("visible");
                var h = $(window).width() / 2;
                g.css("left", h + "px");
                d.filmDimensions[1] != 0 && d.elem.css({
                    width: d.filmDimensions[0] + "px",
                    height: d.filmDimensions[1] + "px"
                });
                if (f.isVideo) {
                    $(".PinImage", g).css("background-color", "black");
                    d.elem.css({
                        opacity: "0"
                    })
                }
                setTimeout(function() {
                    zoomFinished = true;
                    e.addClass("loading");
                    f.isVideo ? f.elem.find(".video").show() : d.elem.attr("src", d.src)
                },
                zoomTimer)
            },
            1);
            var f = {};
            f.id = b;
            f.elem = $('div[data-id="' + f.id + '"]');
            f.elem.addClass("zoomed");
            f.elem.find(".video").hide();
            f.HTMLimage = getHTML(f.elem.find(".PinImage"));
            f.offset = f.elem.offset();
            f.isVideo = f.elem.find(".video").length;
            f.elem.removeClass("spring");
            var d = {};
            d.src = f.elem.find(".PinImageImg").attr("src").replace("_b.jpg", "_f.jpg");
            d.preload = new Image;
            d.preload.src = d.src;
            g.html(f.HTMLimage).css({
                top: f.offset.top - $(window).scrollTop() + "px",
                left: f.offset.left + "px"
            }).append(c.HTMLloading).find(".PinImage").attr("href", "javascript:void[0]").wrap("<div id='PinImageHolder'></div>");
            d.elem = $(".PinImageImg", g);
            d.origin = $(".zoomed .PinImageImg");
            d.thumbDimensions = f.isVideo ? ["192", "144"] : [d.origin.width(), d.origin.height()];
            d.filmDimensions = [f.elem.attr("data-width"), f.elem.attr("data-height")];
            d.elem.css({
                width: d.thumbDimensions[0] + "px",
                height: d.thumbDimensions[1] + "px"
            });
            c.ajax(f.id);
            c.closeListeners(f.id)
        },
        show: function(b) {
            var c = this,
            e = c.HTMLshow.replace("%PIN_ID%", b);
            $("body").addClass("noscroll").append(e);
            $("#zoomScroll");
            e = $("#zoom");
            var g = {};
            g.id = b;
            g.elem = $('div[data-id="' + g.id + '"]');
            g.elem.addClass("zoomed");
            g.HTMLimage = getHTML(g.elem.find(".PinImage"));
            g.isVideo = g.elem.find(".video").length;
            e.html(g.HTMLimage).append(c.HTMLloading).find(".PinImage").attr("href", "javascript:void[0]").wrap("<div id='PinImageHolder'></div>");
            b = $(window).width() / 2;
            e.css("left", (isFireFox ? b - 7 : b) + "px");
            b = {};
            b.elem = $(".PinImageImg", e);
            b.src = g.elem.find(".PinImageImg").attr("src").replace("_b.jpg", "_f.jpg");
            b.filmDimensions = g.isVideo ? ["600", "450"] : [g.elem.attr("data-width"), g.elem.attr("data-height")];
            g.isVideo && e.find(".video").remove();
            b.elem.attr("src", b.src).css({
                width: b.filmDimensions[0] + "px",
                height: b.filmDimensions[1] + "px"
            });
            c.ajax(g.id);
            c.closeListeners(g.id)
        },
        ajax: function(b) {
            var c = this,
            e = $("#zoom");
            this.cancelAjax();
            this.xhr = $.ajax({
                url: "/pin/" + b + "/",
                dataType: "json",
                error: function(g, f) {
                    if (f !== "abort") {
                        f = "Could not fetch pin :-/";
                        if (navigator.onLine) {
                            if (g.status === 404) f = "This pin has been deleted."
                        } else f = "No Internet Connection :-/";
                        e.append("<div id='error'><p class='colormuted'></p></div>").removeClass("loaded");
                        $("#error p").html(f)
                    }
                },
                success: function(g) {
                    if (isWebkit) typeof zoomFinished != "undefined" ? c.renderSuccess(g) : e.one("webkitTransitionEnd",
                    function() {
                        c.renderSuccess(g)
                    });
                    else c.renderSuccess(g)
                },
                complete: function() {
                    c.xhr = null
                },
                timeout: 2E4
            })
        },
        renderSuccess: function(b) {
            var c = $("#zoomScroll"),
            e = $("#zoom");
            e.prepend(b.header);
            $("#PinImageHolder").append(b.buttons);
            e.append(b.footer);
            c.addClass("loaded");
            c.removeClass("loading");
            $("<div>&nbsp;</div>").css({
                height: 0,
                "margin-top": "-10px"
            }).insertAfter(e)
        },
        closeListeners: function() {
            var b = this;
            $("#zoomScroll").click(function(c) {
                if ($(c.target).is("#zoomScroll, #SocialShare ul, #SocialShare li")) {
                    window.history.back();
                    b.close();
                    b.cancelAjax()
                }
            })
        },
        close: function() {
            if (this.open) {
                trackGAEvent("zoom_pin", "closed", zoomCount);
                $("#zoomScroll").remove();
                $("body").removeClass("noscroll");
                $(".zoomed").removeClass("zoomed");
                delete zoomFinished;
                return this.open = false
            }
        },
        cancelAjax: function() {
            if (this.xhr && this.xhr.abort) {
                this.xhr.abort();
                this.xhr = null
            }
        }
    }
} ();
var Like = function() {
    function b(c) {
        var e = $(c).height();
        window.setTimeout(function() {
            e !== $(c).height() && BoardLayout.allPins()
        },
        1)
    }
    return {
        ajaxLike: function(c, e, g, f) {
            $.ajax({
                url: "/pin/" + c + "/like/",
                type: "POST",
                dataType: "json",
                data: f,
                error: function(d) {
                    e(d)
                },
                success: function(d) {
                    g(d)
                },
                timeout: 2E4
            })
        },
        ajaxUnlike: function(c, e, g, f) {
            $.ajax({
                url: "/pin/" + c + "/like/",
                type: "POST",
                dataType: "json",
                data: f,
                error: function(d) {
                    e(d)
                },
                success: function(d) {
                    g(d)
                },
                timeout: 2E4
            })
        },
        gridListeners: function() {
            var c = this;
            $("#ColumnContainer").on("click", ".likebutton",
            function() {
                trackGAEvent("like", "clicked", "grid");
                c.gridLike($(this));
                return false
            });
            $("#ColumnContainer").on("click", ".unlikebutton",
            function() {
                trackGAEvent("unlike", "clicked", "grid");
                c.gridUnlike($(this));
                return false
            })
        },
        gridLike: function(c) {
            c.removeClass("likebutton").addClass("disabled unlikebutton").html(c.data("text-unlike"));
            var e = c.parents(".pin"),
            g = e.children(".stats"),
            f = g.find(".LikesCount");
            this.ajaxLike(e.attr("data-id"),
            function() {},
            function(d) {
                if (d.status == "success") {
                    b(g);
                    f.removeClass("hidden").html(d.count_str);
                    trackGAEvent("like", "success");
                    c.addClass("clickable")
                } else {
                    if (d.captcha) {
                        RecaptchaDialog.challenge();
                        return false
                    }
                    c.removeClass("disabled unlikebutton").addClass("likebutton");
                    alert(d.message)
                }
            })
        },
        gridUnlike: function(c) {
            c.removeClass("disabled clickable unlikebutton").addClass("likebutton").html("<em></em> " + c.data("text-like"));
            c = c.parents(".pin");
            var e = c.children(".stats"),
            g = e.find(".LikesCount");
            this.ajaxUnlike(c.attr("data-id"),
            function() {},
            function(f) {
                b(e);
                g.html(f.count_str);
                f.count || g.addClass("hidden");
                f.status == "success" && trackGAEvent("unlike", "success")
            },
            {
                unlike: 1
            })
        },
        zoomListeners: function() {
            var c = this;
            $("#PinImageHolder").on("click", ".ZoomLikeButton",
            function() {
                trackGAEvent("like", "clicked", "zoom");
                c.zoomLike($(this));
                return false
            });
            $("#PinImageHolder").on("click", ".ZoomUnlikeButton",
            function() {
                c.zoomUnlike($(this));
                return false
            })
        },
        zoomLike: function(c) {
            c.removeClass("ZoomLikeButton").addClass("ZoomUnlikeButton disabled clickable").html(c.data("text-unlike"));
            this.gridLike($(".zoomed .likebutton"))
        },
        zoomUnlike: function(c) {
            c.removeClass("ZoomUnlikeButton disabled clickable ").addClass("ZoomLikeButton").html("<em></em>" + c.data("text-like"));
            this.gridUnlike($(".zoomed .unlikebutton"))
        },
        closeupListeners: function() {
            var c = this;
            $("#PinActionButtons").on("click", ".like_pin",
            function() {
                trackGAEvent("like", "clicked", "closeup");
                c.closeupLike($(this));
                return false
            });
            $("#PinActionButtons").on("click", ".unlike_pin",
            function() {
                trackGAEvent("unlike", "clicked", "closeup");
                c.closeupUnlike($(this));
                return false
            })
        },
        closeupLike: function(c) {
            var e = this,
            g = $("#PinLikes");
            c.removeClass("like_pin").addClass("disabled clickable unlike_pin").html(c.data("text-unlike"));
            g.removeClass("hidden");
            c = c.attr("data-id");
            e.ajaxLike(c,
            function() {
                e.closeupUnlike()
            },
            function(f) {
                if (f.status == "fail" && f.captcha) {
                    RecaptchaDialog.challenge();
                    return false
                }
                trackGAEvent("like", "success");
                g.append(f.html)
            })
        },
        closeupUnlike: function(c) {
            var e = this,
            g = $("#PinLikes");
            c.removeClass("disabled clickable unlike_pin").addClass("like_pin").html("<em></em>" + c.data("text-like"));
            $("a", g).length === 1 && g.addClass("hidden");
            c = c.attr("data-id");
            e.ajaxUnlike(c,
            function() {
                e.closeupLike()
            },
            function(f) {
                trackGAEvent("unlike", "success");
                $("#PinLikes a[href='/" + f.username + "/']").fadeOut("fast").remove()
            },
            {
                unlike: 1
            })
        }
    }
} ();
var Closeup = function() {
    return {
        setup: function() {
            $("#PinReport").live("click",
            function() {
                trackGAEvent("pinreport", "clicked", "closeup");
                Modal.show("ReportModal");
                return false
            });
            $("#ReportModal .Button").click(function() {
                trackGAEvent("report_modal", "clicked", "closeup");
                $.post("flag/", {
                    reason: $("#ReportModal input[name=reason]:checked").val(),
                    explanation: $("#ReportModal textarea").val()
                },
                function(c) {
                    $("#ReportModal .SubmitButton").addClass("disabled").text("Reporting...");
                    if (c.status == "success") {
                        trackGAEvent("report_modal", "success", "closeup");
                        $("#ReportModal .modal").addClass("PostSuccess");
                        $("#ReportModal .modal form").hide();
                        $(".PostSuccess").append('<p class="ReportSuccess">Thanks for reporting this pin! Our team will review the pin and delete it if it violates the <a href="/about/terms/">Pinterest Terms of Use</a>.</p>');
                        setTimeout(function() {
                            Modal.close("ReportModal");
                            Closeup.resetReportModal();
                            $("#ReportModal .SubmitButton").addClass("disabled").html("Send Email")
                        },
                        5E3);
                        $("#PinReport").remove()
                    } else alert(c.message)
                },
                "json");
                return false
            });
            var b;
            $("body").on("click", "a.ReportComment",
            function() {
                trackGAEvent("commentreport", "clicked", "closeup");
                b = $(this);
                Modal.show("ReportCommentModal");
                return false
            });
            $("#ReportCommentModal .Button").click(function() {
                trackGAEvent("report_comment_modal", "clicked", "closeup");
                $.post(b.attr("href"), {
                    comment_id: b.attr("data"),
                    reason: $("#ReportCommentModal input[name=reason]:checked").siblings("label").text(),
                    explanation: $("#ReportCommentModal textarea").val()
                },
                function(c) {
                    $("#ReportModal .SubmitButton").addClass("disabled").text("Reporting...");
                    if (c.status == "success") {
                        trackGAEvent("report_modal", "success", "closeup");
                        $("#ReportCommentModal .modal").addClass("PostSuccess");
                        $("#ReportCommentModal .modal form").hide();
                        $(".PostSuccess").append('<p class="ReportSuccess">Our team will review the delete the comment if it violates our <br/><a href="http://pinterest.com/about/use">Acceptable Use Policy</a>.</p>');
                        setTimeout(function() {
                            Modal.close("ReportCommentModal");
                            Closeup.resetReportCommentModal();
                            $("#ReportCommentModal .SubmitButton").addClass("disabled").html("Send Email")
                        },
                        1500);
                        b.replaceWith('<p class="floatRight" style="margin-right:0px"><strong>Thanks for reporting!</strong></p>')
                    } else alert(c.message)
                },
                "json");
                return false
            });
            $("#EmailModal form").submit(function() {
                trackGAEvent("email_modal", "submit", "closeup");
                var c = $("#MessageRecipientName").val(),
                e = $("#MessageRecipientEmail").val(),
                g = $("#MessageBody").val();
                if (!c) {
                    $("#MessageRecipientName").parent().find(".error").html("Please enter recipient name.");
                    return false
                }
                if (!e) {
                    $("#MessageRecipientEmail").parent().find(".error").html("Please enter recipient email.");
                    return false
                }
                $("#EmailModal .SubmitButton").addClass("disabled").text("Sending...");
                $.ajax({
                    type: "POST",
                    url: $(this).attr("action"),
                    data: {
                        name: c,
                        email: e,
                        message: g
                    },
                    complete: function(f) {
                        f = $.parseJSON(f.responseText);
                        if (f.status == "success") {
                            trackGAEvent("email_modal", "success", "closeup");
                            $("#EmailModal .SubmitButton").text("Sent!");
                            setTimeout(function() {
                                Modal.close("EmailModal");
                                Closeup.resetEmailModal();
                                $("#EmailModal .SubmitButton").addClass("disabled").html("Send Email")
                            },
                            500)
                        } else {
                            $("#EmailModal .SubmitButton").removeClass("disabled").html("Send Email");
                            f.message == "Invalid email address" && $("#MessageRecipientEmail").parent().after($("#EmailModal .error"));
                            $("#EmailModal .error").html(f.message)
                        }
                    }
                });
                return false
            });
            $("#SocialShare #PinEmbed").click(function() {
                trackGAEvent("pin_embed", "clicked", "closeup");
                var c = $("#PinImageHolder img");
                if ($("#PinImageHolder iframe").length) c = $("#PinImageHolder iframe");
                var e = c.width();
                c = c.height();
                max_closeup_image_width = e;
                max_closeup_image_height = c;
                $("#EmbedImageWidth").val(e);
                $("#EmbedImageHeight").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 + e + "' height ='" + c + embed_code_html_2);
                Modal.show("EmbedModal")
            });
            $("#EmbedImageWidth").keyup(function() {
                $(this).val() > max_closeup_image_width && $("#EmbedImageWidth").val(max_closeup_image_width);
                var c = parseInt($("#EmbedImageWidth").val() * max_closeup_image_height / max_closeup_image_width, 10);
                $("#EmbedImageHeight").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 + $("#EmbedImageWidth").val() + "' height ='" + $("#EmbedImageHeight").val() + embed_code_html_2);
                return false
            });
            $("#EmbedImageHeight").keyup(function() {
                $(this).val() > max_closeup_image_height && $("#EmbedImageHeight").val(max_closeup_image_height);
                var c = parseInt(Math.ceil($("#EmbedImageHeight").val() * max_closeup_image_width / max_closeup_image_height), 10);
                $("#EmbedImageWidth").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 + $("#EmbedImageWidth").val() + "' height ='" + $("#EmbedImageHeight").val() + embed_code_html_2);
                return false
            });
            $(".DeleteComment").live("click",
            function() {
                trackGAEvent("delete_comment", "clicked", "closeup");
                var c = $(this);
                if (c.attr("ban")) if (!confirm("Are you sure you want to ban " + c.attr("username") + "?")) return false;
                c.trigger("mouseleave");
                var e = c.parents(".comment");
                e.slideUp("slow");
                $.ajax({
                    url: c.attr("href"),
                    type: "POST",
                    dataType: "json",
                    data: {
                        comment: c.attr("data")
                    },
                    error: function(g) {
                        e.show();
                        g.message.length > 0 && alert(g.message)
                    },
                    success: function() {
                        trackGAEvent("delete_comment", "success", "closeup");
                        e.remove()
                    }
                });
                return false
            })
        },
        resetReportModal: function() {
            $("#ReportModal .PostSuccess").removeClass("PostSuccess");
            $("#ReportModal .ReportSuccess").remove();
            $('#ReportModal .option input[type="radio"]').attr("checked", false);
            $("#ReportModal select option:first-child").attr("selected", "selected");
            $("#ReportModal .Button").addClass("disabled");
            $("#ReportPin").val("").blur();
            $("#ReportModal form").show()
        },
        resetReportCommentModal: function() {
            $("#ReportCommentModal .PostSuccess").removeClass("PostSuccess");
            $("#ReportCommentModal .ReportSuccess").remove();
            $('#ReportCommentModal .option input[type="radio"]').attr("checked", false);
            $("#ReportCommentModal select option:first-child").attr("selected", "selected");
            $("#ReportCommentModal .Button").addClass("disabled");
            $("#ReportCommentModal form").show()
        },
        resetEmailModal: function() {
            $("#MessageRecipientEmail").val("").blur();
            $("#MessageRecipientName").val("").blur();
            $("#MessageBody").val("").blur();
            $("#EmailModal .error").html("")
        }
    }
} ();
var InviteForm = function() {
    return {
        setup: function() {
            var b = $("#SendInvites"),
            c = $("#EmailAddresses .email");
            b.click(function() {
                trackGAEvent("invite_form", "clicked");
                c.each(function() {
                    var e = $(this),
                    g = $("textarea[name=message]"),
                    f = e.parent("li").children(".helper"); ! e.val() == "" && InviteForm.submit(e.val(), g.val(), "somebody",
                    function() {
                        trackGAEvent("invite_form", "success");
                        e.removeClass("error");
                        f.html("Invite Sent!").css("color", "green").slideDown();
                        e.val("").keyup();
                        g.val("").keyup()
                    },
                    function(d) {
                        e.addClass("error");
                        f.html(d.message).css("color", "red").slideDown()
                    })
                })
            })
        },
        submit: function(b, c, e, g, f) {
            $.post("/invite/new/", {
                name: e,
                message: c,
                email: b
            },
            function(d) {
                d.status == "success" ? g(d) : f(d)
            },
            "json")
        }
    }
} ();
var InviteModal = function() {
    return {
        show: function(b, c) {
            var e = this;
            $("#InviteModalName").empty().text(b);
            $("#InviteModalEmail").empty().text(c);
            Modal.show("InviteModal");
            $("#InviteModalMessage").val("").keyup().focus();
            $("#InviteModal .SubmitButton").unbind("click").click(function() {
                var g = $(this),
                f = $("#InviteModalMessage").val(),
                d = $(".inputstatus");
                g.addClass("disabled");
                InviteForm.submit(c, f, b,
                function() {
                    d.text("").empty().css("margin-bottom", "0px");
                    d.removeClass("error").html("<span style='color: green; font-size: 18px; font-weight: 300;'>Success!</span>").css("margin-bottom", "14px");
                    setTimeout(function() {
                        Modal.close("InviteModal");
                        d.text("").empty().css("margin-bottom", "0px");
                        g.removeClass("disabled")
                    },
                    1300);
                    e.trigger("invite:sent")
                },
                function() {
                    d.text("Sorry, an error has occurred. Please try again.").css("margin-bottom", "14px");
                    g.removeClass("disabled");
                    e.trigger("invite:failed")
                })
            })
        }
    }
} ();
_.extend(InviteModal, Backbone.Events);

var FancyForm = function() {
    return {
        inputs: ".Form input, .Form textarea",
        button: ".SubmitButton",
        setup: function() {
            var b = this;
            this.inputs = $(this.inputs);
            b.inputs.each(function() {
                var c = $(this);
                b.checkVal(c)
            });
            b.inputs.live("keyup blur",
            function() {
                var c = $(this);
                b.checkVal(c);
                var e = c.parents("ul"),
                g = c.parents(".Form").find(b.button);
                c.parents("li").hasClass("NoCheck") || b.checkDisabled(e, g)
            });
            $(b.button).live("click",
            function() {
                var c = $(this).attr("data-form");
                if ($(this).hasClass("disabled")) return false;
                else $("#" + c + " form").submit()
            })
        },
        checkVal: function(b) {
            b.val().length > 0 ? b.parent("li").addClass("val") : b.parent("li").removeClass("val")
        },
        checkDisabled: function(b, c) {
            b.children("li:not(.optional)").length <= b.children("li.val").length ? c.removeClass("disabled") : c.addClass("disabled")
        }
    }
} ();

var MAX_PIN_CHARACTER_COUNT = 500,
CharacterCount = CharacterCount || {
    setup: function(b, c, e, g) {
        b = $(b);
        c = $(c);
        e = $(e);
        b.focus(function() {
            CharacterCount.showCount(b, c, e, g)
        }).bind("keyup.cc input.cc paste.cc",
        function() {
            CharacterCount.showCount(b, c, e, g)
        })
    },
    truncateData: function(b, c) {
        b = $(b);
        c = c || MAX_PIN_CHARACTER_COUNT;
        b.val().length > c && b.val(b.val().substr(0, c - 3) + "...")
    },
    showCount: function(b, c, e, g) {
        g = g || MAX_PIN_CHARACTER_COUNT;
        b = g - b.val().length;
        c.text(b).show();
        b < 0 || b >= g ? e.addClass("disabled") : e.removeClass("disabled");
        b < 0 ? c.addClass("error") : c.removeClass("error")
    }
};

var Tagging = function() {
    return {
        friends: null,
        friendsLinks: {},
        getFriends: function(b, c, e) {
            var g = b.term;
            (function(f) {
                Tagging.friends ? f() : $.get("/x2ns4tdf0cd7cc9b/_getfriends/",
                function(d) {
                    Tagging.friends = [];
                    $.each(d,
                    function(h, j) {
                        Tagging.friends.push({
                            label: j.name,
                            value: j.username,
                            image: j.image,
                            link: "/" + j.username + "/",
                            category: "People"
                        });
                        Tagging.friendsLinks["/" + j.username + "/"] = 1
                    });
                    f()
                })
            })(function() {
                var f = [];
                if (e) for (name in e) Tagging.friendsLinks[name] || !e.hasOwnProperty(name) || f.push(e[name]);
                f = f.concat(Tagging.friends);
                if (Tagging.ignore) f = _.filter(f,
                function(d) {
                    return ! Tagging.ignore[d.link]
                });
                if (g) f = tagmate.filter_options(f, g);
                c(f)
            })
        },
        initInput: function(b, c, e) {
            b = $(b);
            var g = $("<div class='CollabAutocompleteHolder'></div>");
            b.after(g);
            b.autocomplete({
                source: Tagging.getFriends,
                minLength: 1,
                delay: 5,
                appendTo: g,
                change: function(f, d) {
                    c && c(d.item)
                },
                select: function(f, d) {
                    c && c(d.item, true);
                    return false
                },
                position: {
                    my: "left top",
                    at: "left bottom",
                    offset: "0 -1"
                }
            }).keydown(function(f) {
                f.which == 13 && e && e()
            });
            b.data("autocomplete")._renderItem = function(f, d) {
                return $("<li></li>").data("item.autocomplete", d).append("<a href='" + d.link + "'><img src='" + d.image + "' class='AutocompletePhoto' alt='Photo of " + d.label + "' width='38px' height='38px'/><span class='AutocompleteName'>" + d.label + "</span></a>").appendTo(f)
            }
        },
        initTextarea: function(b, c) {
            b = $(b);
            var e = {};
            e["@"] = tagmate.USER_TAG_EXPR;
            e["#"] = tagmate.HASH_TAG_EXPR;
            e.$ = tagmate.USD_TAG_EXPR;
            e["\u00a3"] = tagmate.GBP_TAG_EXPR;
            b.tagmate({
                tagchars: e,
                sources: {
                    "@": function(g, f) {
                        Tagging.getFriends(g, f, c)
                    }
                }
            })
        },
        loadTags: function(b, c, e, g) {
            b = $(b).getTags();
            for (var f = [], d = [], h = null, j = 0; j < b.length; j++) {
                b[j][0] == "@" && f.push(b[j].substr(1));
                b[j][0] == "#" && d.push(b[j].substr(1));
                if (b[j][0] == "$" || b[j][0] == "\u00a3") h = b[j]
            }
            $(c).val(f.join(","));
            $(e).val(d.join(","));
            $(g).val(h)
        },
        priceTag: function(b, c) {
            function e() {
                var g = $(".price", c);
                if (g.length <= 0) {
                    g = $("<div class='price'></div>");
                    c.prepend(g)
                }
                var f = b.getTags({
                    $: tagmate.USD_TAG_EXPR,
                    "\u00a3": tagmate.GBP_TAG_EXPR
                });

                if (f && f.length > 0) {
                    g.text(f[f.length - 1]);
                    g.addClass("visible")
                }
                else {
                    g.removeClass("visible");
                    g.text("")
                }
            }
            b = $(b);
            c = $(c);
            b.unbind(".priceTag").bind("keyup.priceTag", e).bind("focus.priceTag", e).bind("change.priceTag", e);
            e()
        }
    }
} ();

var ScrapePinDialog = ScrapePinDialog || {
    id: "ScrapePin",
    setup: function() {
        var b = this;
        AddDialog.setup(b.id);
        b.initScraperInput()
    },
    initScraperInput: function() {
        function b(k) {
            return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(k)
        }
        function c(k) {
            var l = true;
            if (k.indexOf("http") != 0) k = "http://" + k;
            if (k == "") l = false;
            if (k == "http://") l = false;
            if (k.length < 2) l = false;
            if (k.indexOf(".") == -1) l = false;
            b(k) || (l = false);
            return l
        }
        function e() {
            var k = $("#" + ScrapePinDialog.id),
            l = $("#ScrapePinInput").val();
            if (j !== l) {
                j = l;
                if (c(l)) {
                    if (l.indexOf("http") != 0) l = "http://" + l;
                    $(".load", k).show();
                    $(".ImagePicker .Images ul", k).empty();
                    l = escape(l);
                    setTimeout(g, 5E3);
                    images_count = 0;
                    imagesArray = [];
                    msg = "";
                    $.getJSON("/pin/create/find_images/", {
                        url: l
                    },
                    function(r) {
                        if (r.status === "success") {
                            images_count = r.images.length;
                            for (var u = 0; u < r.images.length; u++) {
                                urlImage = new Image;
                                urlImage.src = r.images[u];
                                msg += "<br/>Loading " + urlImage.src;
                                urlImage.onload = function() {
                                    images_count -= 1;
                                    images_count == 0 && f()
                                };
                                imagesArray.push(urlImage)
                            }
                            r.title.length > 80 ? $("#id_title").val(r.title.substring(0, 79)) : $("#id_title").val(r.title);
                            $(".load", k).hide();
                            $("#id_link").val($("#scrape_url").val());
                            $("#PinSourceURL").html("Source: " + l).removeClass("hidden");
                            AddDialog.pinBottom("ScrapePin");
                            $(".Arrows", k).addClass("holla").show();
                            $("#ScrapeButton").removeClass("disabled")
                        } else {
                            $(".load", k).hide();
                            $("#ScrapeButton").removeClass("disabled");
                            alert("We couldn't find any images: " + r.message)
                        }
                    })
                } else alert("Not a valid URL!")
            }
        }
        function g() {
            if (images_count > 0) {
                images_count = -1;
                f()
            }
        }
        function f() {
            strHtml = "";
            imgFound = false;
            for (var k = foundCtr = 0; k < imagesArray.length; k++) {
                img = imagesArray[k];
                if (img.width >= 150 && img.height >= 50) {
                    imgFound = true;
                    foundCtr++;
                    strHtml += "<li>" + (is_video(img.src) ? "<img src='" + media_url + "images/VideoIndicator.png' alt='Video Icon' class='video' />": "") + "<img src='" + img.src + "' width='156px' alt='' /></li>"
                }
            }
            if (strHtml != "") {
                $("#ScrapePin .ImagePicker .Images ul").html(strHtml);
                d(foundCtr)
            } else alert("No Large Images Found.")
        }
        function d() {
            var k = function(r, u) {
                im = $(u).find("img")[0];
                if ($(im).hasClass("video")) im = $(u).find("img")[1];
                src = $(im).attr("src");
                $("#id_img_url").val(src);
                $("#id_link").val($("#ScrapePinInput").val())
            },
            l = $("#ScrapePin .ImagePicker .Images").jcarousel({
                buttonNextHTML: null,
                buttonPrevHTML: null,
                initCallback: function(r) {
                    $("#ScrapePin .imagePickerNext").click(function() {
                        r.next();
                        return false
                    });
                    $("#ScrapePin .imagePickerPrevious").click(function() {
                        r.prev();
                        return false
                    })
                },
                animation: "fast",
                itemVisibleInCallback: {
                    onAfterAnimation: k
                },
                scroll: 1
            });
            k(l, $("#ScrapePin .ImagePicker").find("li")[0], 1, "next")
        }
        function h() {
            var k = $("#ScrapeButton");
            if (c($("#ScrapePinInput").val())) {
                k.addClass("disabled");
                e()
            } else {
                alert("Please enter a valid website URL");
                k.removeClass("disabled")
            }
        }
        var j = "";
        $("#ScrapePinInput").bind("keydown",
        function(k) {
            k.keyCode === 13 && h()
        });
        $("#ScrapeButton").click(function() {
            h();
            return false
        })
    },
    reset: function() {
        var b = $("#" + this.id);
        $("#ScrapePinInput", b).val("");
        $(".PinBottom", b).hide();
        $(".modal", b).css("margin-bottom", "0");
        $(".Buttons .Button", b).removeClass("disabled").html("Pin It");
        ScrapePinDialog.initScraperInput()
    }
};
var Nag = Nag || {
    setup: function(b) {
        var c = $(".Nag").outerHeight();
        $("#" + b + " .NagSpacer").css("height", c + "px");
        if ($(".CloseupLeft").length > 0) {
            b = parseInt($(".CloseupLeft").css("top"), 10) + c;
            $(".CloseupLeft").css("top", b + "px")
        }
    },
    hide: function(b) {
        b = $("#" + b);
        var c = $(".Nag", b).outerHeight();
        $(".Sheet", b).css("top", "-" + c + "px").css("bottom", c + "px");
        setTimeout("$('.UndoSheet').css('top','0px').css('bottom','0px')", 1100)
    }
};
var CategorizeBoard = function() {
    return {
        setup: function(b) {
            Nag.setup(b);
            $("#" + b + " select").bind("change",
            function() {
                $("#" + b + " option:selected").attr("value") != "" && setTimeout("CategorizeBoard.hideSheets()", 100)
            })
        },
        hideSheets: function() {
            Nag.hide("CategoryCallout");
            CategorizeBoard.addCategory()
        },
        addCategory: function() {
            var b = $("#CategorySelect option:selected"),
            c = b.text();
            b = b.attr("value");
            $("#CategoryCallout .UndoSheet").show().find("p span").text(c);
            $.post(boardEndpoint, {
                category: b
            },
            function(e) {
                data = $.parseJSON(e);
                if (!data.status == "success") {
                    $("#CategoryCallout .error").html(data.message).show();
                    CategorizeBoard.undoCategory()
                }
            });
            return false
        },
        undoCategory: function() {
            $("#CategoryCallout .Nag").outerHeight();
            $(".UndoSheet").css("top", "-100px").css("bottom", "100px");
            $("#CategorySelect option:first").attr("selected", "selected");
            $.post(boardEndpoint, {
                undo: "1"
            },
            function() {});
            setTimeout("CategorizeBoard.newHeights()", 750)
        },
        newHeights: function() {
            $("#CategoryCallout .Sheet1").css("top", "auto").css("bottom", "auto !important");
            $("#CategoryCallout .Sheet2").css("top", "0px").css("bottom", "-3px");
            $("#CategoryCallout .Sheet3").css("top", "0px").css("bottom", "-5px")
        }
    }
} ();
var UploadPinDialog = UploadPinDialog || {
    id: "UploadPin",
    setup: function() {
        var b = this,
        c = $("#" + b.id);
        AddDialog.setup(b.id);
        $("input[type=file]", c).change(function() {
            trackGAEvent("upload_file", "submitted");
            AddDialog.pinBottom(b.id);
            $(".ImagePicker ul", c).html("<li><img src='http://passets-cdn.pinterest.com/images/load2.gif' class='load' alt='Loading Indicator' /></li>");
            $(".ImagePicker .load", c).show();
            $("form", c).ajaxSubmit({
                type: "POST",
                dataType: "json",
                iframe: true,
                url: "/pin/preview/",
                success: function(e) {
                    if (e.status === "success") {
                        trackGAEvent("upload_file", "success");
                        $(".load", c).hide();
                        $(".ImagePicker ul", c).html("<li><img src='" + e.image_url + "' /></li>")
                    } else alert(e.message)
                }
            });
            return false
        })
    },
    reset: function() {
        var b = $("#" + this.id);
        $("input[type=file]", b).val("");
        $(".PinBottom", b).hide();
        $(".modal", b).css("margin-bottom", "0");
        $(".Buttons .Button", b).removeClass("disabled").html("Pin It")
    }
};
var RecaptchaPublicKey = "6LdYxc8SAAAAAHyLKDUP3jgHt11fSDW_WBwSPPdF",
RecaptchaDialog = function() {
    return {
        challenge: function(b) {
            var c = $("#CaptchaDialog");
            Modal.show("CaptchaDialog");
            $.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js",
            function() {
                Recaptcha.create(RecaptchaPublicKey, $("#Captcha", c)[0], {
                    theme: "clean",
                    callback: Recaptcha.focus_response_field
                });
                $(".Button", c).click(function() {
                    $("#CaptchaDialog span.error").text("").hide();
                    RecaptchaDialog.submit(Recaptcha.get_challenge(), Recaptcha.get_response(), b)
                })
            })
        },
        submit: function(b, c, e) {
            $.post("/verify_captcha/", {
                challenge: b,
                response: c
            },
            function(g) {
                if (g.status == "success") {
                    Modal.close("CaptchaDialog");
                    Recaptcha.destroy();
                    e && e()
                } else {
                    $("#CaptchaDialog span.error").text("Try again").slideDown();
                    Recaptcha.reload()
                }
            },
            "json")
        }
    }
} (),
RecaptchaPrompt = function() {
    return {
        challenge: function() {
            var b = $(".CaptchaPrompt");
            Recaptcha.create(RecaptchaPublicKey, $("#Captcha div", b)[0], {
                theme: "clean",
                callback: Recaptcha.focus_response_field
            });
            $("#Button", b).click(function() {
                $("#CaptchaError").text("").hide();
                RecaptchaPrompt.submit(Recaptcha.get_challenge(), Recaptcha.get_response())
            })
        },
        submit: function(b, c) {
            $.post("/verify_captcha/" + window.location.search, {
                challenge: b,
                response: c
            },
            function(e) {
                if (e.status == "success") window.location = e.url;
                else {
                    $("#CaptchaError").text("Try again").show();
                    Recaptcha.reload()
                }
            },
            "json")
        }
    }
} ();
var CreateBoardDialog = function() {
    return {
        setup: function() {
            function b() {
                if (!f) {
                    f = true;
                    Tagging.initInput("#CreateBoard input.collaborator_name",
                    function(d, h) {
                        g = d;
                        h && $("#CreateBoard .submit_collaborator").click()
                    },
                    function() {})
                }
            }
            function c() {
                var d = [];
                $("#CurrentCollaborators .collaborator", e).each(function() {
                    d.push($(this).attr("username"))
                });
                return d
            }
            var e = $("#CreateBoard"),
            g = null,
            f = false;
            b();
            $("#CreateBoard input.collaborator_name").defaultValue($("#CreateBoard input.collaborator_name").val());
            $(".submit_collaborator", e).click(function() {
                trackGAEvent("submit_board_collaborator", "clicked", "create_board_dialogue");
                if (g) {
                    var d = '<li username="' + g.value + '" class="collaborator invite"><a href="' + g.value + '"><img class="collaborator_image" src="' + g.image + '" alt="Collaborator Photo"></a><a class="collaborator_name" href="' + g.value + '">' + g.label + '</a><a href="#" class="delete_collaborator invite" value="' + g.value + '">Remove</a></li>';
                    $("#CurrentCollaborators", e).prepend(d);
                    $(".collaborator_name", e).val("");
                    g = null
                }
            });
            $(".delete_collaborator", e).live("click",
            function() {
                trackGAEvent("delete_collaborator", "clicked", "create_board_dialogue");
                $(this).parent().remove();
                return false
            });
            BoardPicker.setup("#CreateBoard .BoardPicker",
            function(d) {
                $("#id_category", e).val(d)
            });
            $("#BoardName", e).keyup(function() {
                $(".board_name.error", e).html() !== "" && $(".board_name.error", e).html("")
            });
            $(".Submit .Button", e).click(function() {
                trackGAEvent("create_board", "clicked", "create_board_dialogue");
                if ($("#BoardName", e).val() == "Board Name" || $("#BoardName", e).val() == "") {
                    $(".CreateBoardStatus", e).html("Please enter a board name").show();
                    return false
                }
                var d = $("#id_category", e).val(),
                h = $(".Submit .Button", e);
                h.attr("disabled", "disabled").addClass("disabled").html("Creating &hellip;");
                var j = {
                    name: $("#BoardName", e).val(),
                    collaborator: $("input[name='change_BoardCollaborators']:checked", e).val(),
                    collaborators: c()
                };
                if (d) j.category = d;
                $.post("/board/create/", j,
                function(k) {
                    if (k.status == "success") {
                        trackGAEvent("create_board", "success", "create_board_dialogue");
                        e.hide();
                        $("#BoardName", e).val("Board Name");
                        $(".CreateBoardStatus", e).html("").hide();
                        $("#id_category", e).val("");
                        $(".CurrentCategory", e).text("Select a Category");
                        window.location = k.url
                    }
                    else {
                        $(".CreateBoardStatus", e).html(k.message).show();
                        h.removeAttr("disabled").removeClass("pressed").html("Create")
                    }
                },
                "json");
                return false
            })
        },
        reset: function() {
            $("#BoardName").val("");
            $("input[value='me']").attr("checked", true);
            $("#CurrentCollaborators").empty()
        }
    }
} ();
var Login = function() {
    return {
        setup: function() {
            $(".AuthForm").submit(function() {
                $(".Button", this).addClass("disabled")
            });
            $("#resetPassword").click(function() {
                $("#AuthForm").hide();
                $("#ResetForm").show();
                return false
            });
            $("#backToLogin").click(function() {
                $("#AuthForm").show();
                $("#ResetForm").hide();
                return false
            })
        }
    }
} ();

var EditPin = function() {
    return {
        setup: function() {
            Tagging.initTextarea("#description_pin_edit");
            Tagging.priceTag("#description_pin_edit", "#PinEditPreview");
            $("#PinEdit").submit(function() {
                Tagging.loadTags("#description_pin_edit", "#id_pin_replies", "#pin_tags", "#id_buyable")
            });
            $("#description_pin_edit").keyup(function() {
                $("#postDescription").html($(this).val())
            })
        },
        deletePin: function() {
            var b = $("#DeletePin .SubmitButton");
            b.addClass("disabled").text(b.data("text-deleting"));
            $.post("/pin/" + pinID + "/delete/", {},
            function(c) {
                if (c.status == "success") {
                    trackGAEvent("delete_pin", "success");
                    window.location = c.url
                }
                else alert(c.message)
            },
            "json")
        }
    }
} ();

var EditBoard = function() {
    return {
        setup: function() {
            $("#BoardEdit input.collaborator_name").defaultValue($("#BoardEdit input.collaborator_name").val());
            BoardPicker.setup("#BoardEdit .BoardPicker",
            function(b) {
                $("#BoardEdit #id_category").val(b)
            });
            $("#BoardEdit .submit_collaborator").click(function() {
                trackGAEvent("submit_collaborator", "clicked", "edit_board_dialogue");
                if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test($("#BoardEdit input.collaborator_name").val())) {
                    $("#InviteCollaborator").show();

                    $("#InviteCollaborator #invite_email").val($("#BoardEdit input.collaborator_name").val());
                    invite_email = $("#BoardEdit input.collaborator_name").val();
                    $("#invite_email, #invite_message").blur();
                    $("#BoardEdit input.collaborator_name").val("Enter a name")
                }
                else {
                    var b = $("#BoardEdit .add_collaborators").find("input").serialize();
                    $.post(board_collaborator, b,
                    function(c) {
                        if (c.status == "success") {
                            Tagging.ignore[c.profile_url] = 1;
                            trackGAEvent("submit_collaborator", "success", "edit_board_dialogue");
                            $("#BoardEdit input.collaborator_username").val("");
                            $("#BoardEdit input.collaborator_name").val("");
                            c = '<li class="collaborator unaccepted"><a href="' + c.profile_url + '"><img class="collaborator_image" src="' + c.avatar_url + '" alt="Collaborator Photo" /></a><a class="collaborator_name" href="' + c.profile_url + '">' + c.full_name + '</a><a href="#" class="delete_collaborator" value="' + c.username + '" tooltip="Remove ' + c.full_name + '">x</a><span class="note">Invite sent!</span></li>';
                            c = $(c);
                            $("#BoardEdit .add_collaborators ul").prepend(c);
                            c.find("a.delete_collaborator").tipsy({
                                title: "tooltip",
                                gravity: "s",
                                fade: true,
                                html: true
                            })
                        }
                        else alert("Looks like something went wrong! We're looking into it. Try again.")
                    })
                }
                return false
            });
            $("body").on("click", "a.delete_collaborator",
            function() {
                trackGAEvent("delete_colaborator", "clicked", "edit_board_dialogue");

                var b = $(this),
                c = b.hasClass("invite") ? board_collaborator + "delete/": board_collaborator,
                e = b.attr("data-name") || b.parent().find(".collaborator_name").text(),
                g = "Are you sure you want to remove " + e + " from this board?";
                if (e === "yourself") g = "Are you sure you want to leave this board and remove it from your profile?";
                $("#DeleteCollaborator .message").text(g);
                Modal.show("DeleteCollaborator");
                EditBoard.deleteCollaborator = function() {
                    $.post(c, {
                        collaborator_username: b.attr("value"),
                        remove: true
                    },
                    function(f) {
                        if (f.status == "success") {
                            trackGAEvent("delete_collaborator", "success", "edit_board_dialogue");
                            b.parent().remove();
                            if (e === "yourself") window.location.href = "/me/";
                            Tagging.ignore && delete Tagging.ignore["/" + b.attr("value") + "/"]
                        }
                        else alert("Something went wrong. Try Again.");
                        Modal.close("DeleteCollaborator")
                    })
                };
                return false
            });
            $("#invite_submit").submit(function() {
                trackGAEvent("invite_board", "submit", "edit_board_dialogue");
                $.post("/invite/new/", {
                    name: "somebody",
                    email: $("#invite_email").val(),
                    message: $("#invite_message").val(),
                    board_user: board_username,
                    board_name: board_slug
                },
                function(b) {
                    data = $.parseJSON(b);
                    if (data.status == "success") {
                        trackGAEvent("invite_board", "success", "edit_board_dialogue");
                        $("#invite_name").val("");
                        $("#invite_email").val("");
                        $("#invite_response").html("Invite sent successfully to " + invite_email + ".").show().delay(2E3).fadeOut(500)
                    }
                    else $("#invite_response").html(data.message)
                });
                return false
            });
            $("#invite_submit").submit(function() {
                var b = 'Hi!\n\nI wanted to invite you to Pinterest so you can help contribute to my pinboard, "' + board_body_name + '". Pinterest is a place to catalog things you love. You can create pinboards on anything, from fashion, to gadgets, to art.\n\nEnjoy!';
                $("#InviteCollaborator").fadeOut(250);
                $("#InviteCollaborator #invite_email").val("");
                $("#InviteCollaborator #invite_message").val(b);
                $("#InviteCollaborator #invite_response").val("")
            })
        },
        init_ac: function() {
            if (!ac_init) {
                ac_init = true;
                Tagging.ignore = {};
                $("#BoardEdit .add_collaborators a.collaborator_name").each(function(b, c) {
                    Tagging.ignore[$(c).attr("href")] = 1
                });
                Tagging.initInput("#BoardEdit input.collaborator_name",
                function(b, c) {
                    $("#BoardEdit input.collaborator_username").val(b ? b.value: "");
                    $("#BoardEdit input.collaborator_name").val(b ? b.label: "");
                    c && $("#BoardEdit .submit_collaborator").click()
                },
                function() {})
            }
        },
        deleteBoard: function() {
            trackGAEvent("delete_board", "clicked", "edit_board_dialogue");
            var b = $("#DeleteBoard .SubmitButton"),
            c = window.location.pathname.split("/")[1];
            b.addClass("disabled").text("Deleting...");
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: board_settings,
                success: function(e) {
                    trackGAEvent("delete_board", "success", "edit_board_dialogue");
                    if (e.status == "done") window.location = "/" + c;
                    else alert("Board delete failed - please refresh and try again. We are very sorry :-/")
                },
                error: function() {
                    alert("Board delete failed - please refresh and try again. We are very sorry :-/")
                }
            })
        }
    }
} ();

(function(b) {
    b.fn.extend({
        switcher: function(c) {
            b.extend({},
            c);
            if (! (b.browser.msie && b.browser.version < 9)) return this.each(function() {
                function e() {
                    h.checkbox.bind("change.switch", d);
                    h.switcher.live("click.switch", f)
                }
                function g(l, r) {
                    return b('<div class="switch"><div class="shadow"></div><div class="border"><div class="knob"><div class="circle"><div class="inner circle"></div></div><div class="labels"><label class="on">' + l + '</label><label class="off">' + r + "</label></div></div></div></div>")
                }
                function f() {
                    h.checkbox.attr("checked") !== "checked" ? h.checkbox.prop("checked", true) : h.checkbox.prop("checked", false);
                    d()
                }
                function d() {
                    h.x = h.switcher.find(".knob").offset().left;
                    var l = b(".shadow", h.switcher);
                    if (h.checkbox.attr("checked") == "checked") {
                        b(".knob", h.switcher).css("margin-left", "62%");
                        l.addClass("on");
                        console.log("moveKnob on")
                    } else {
                        b(".knob", h.switcher).css("margin-left", "0%");
                        l.removeClass("on");
                        console.log("moveKnob off")
                    }
                }
                var h = {
                    checkbox: b(),
                    switcher: b(),
                    clicked: false,
                    moved: false,
                    startX: 0,
                    x: 0
                },
                j = b(this).data("text-on"),
                k = b(this).data("text-off");
                h.switcher = g(j, k);
                h.checkbox = b(this);
                h.checkbox.hide();
                h.checkbox.after(h.switcher);
                h.startX = h.switcher.find(".knob").offset().left;
                e();
                d()
            })
        }
    })
})(jQuery);
var SelectedFriendView = Backbone.View.extend({
    tagName: "li",
    className: "friend",
    events: {
        "click .close": "unselect"
    },
    initialize: function(b) {
        this.selector = b.selector;
        this.friend = b.friend;
        this.unselectedView = b.unselectedView;
        this.render()
    },
    render: function() {
        this.$el.html(FriendSelector.templates.selectedFriend(this.friend));
        this.$el.appendTo(this.selector.addedList);
        return this
    },
    unselect: function() {
        this.unselectedView.toggleSelectedMultiple();
        this.remove()
    }
}),
UnselectedFriendView = Backbone.View.extend({
    tagName: "li",
    className: "friend",
    initialize: function(b) {
        this.ul = b.ul;
        this.friend = b.friend;
        this.selector = b.selector;
        this.isSelected = false;
        this.render()
    },
    events: {
        "click .Button": "toggleSelected"
    },
    toggleSelected: function() {
        this.selector.multiple ? this.toggleSelectedMultiple() : this.toggleSelectedSingle()
    },
    toggleSelectedMultiple: function() {
        if (this.isSelected) {
            this.selector.toggleSelected(this);
            this.$el.removeClass("added");
            this.isSelected = false;
            this.$el.show()
        } else if (this.selector.canAdd()) {
            new SelectedFriendView({
                friend: this.friend,
                selector: this.selector,
                unselectedView: this
            });
            this.selector.toggleSelected(this);
            this.$el.addClass("added");
            this.isSelected = true;
            this.$el.hide()
        }
    },
    toggleSelectedSingle: function() {
        this.selector.toggleSelected(this);
        this.$el.find(".Button").toggleClass("disabled");
        (this.isSelected = !this.isSelected) && this.selector.selectionComplete()
    },
    applyFilter: function(b) {
        var c = this.$el,
        e = c.find(".name");
        if (this.friend.name.match(b)) {
            e.data("original", c.html() + "");
            b = (e.text() + "").replace(b, "<strong>$1</strong>");
            e.html(b);
            this.selector.unaddedList.append(c)
        } else {
            c.data("original") && c.html(c.data("original"));
            c.detach()
        }
        return c
    },
    render: function() {
        this.$el.html($(FriendSelector.templates.unselectedFriend(this.friend)));
        this.ul.append(this.$el);
        return this
    }
}),
Poller = function(b) {
    this.options = {
        maxRetries: 0
    };
    this.tries = 0;
    this.options = _.extend(this.options, b);
    this.start = function() {
        this.poll()
    };
    this.stop = function() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = null
        }
    };
    this.poll = function() {
        var c = this;
        $.ajax({
            url: c.options.url,
            dataType: "json",
            cache: false,
            success: function(e) {
                c.tries += 1;
                if (e.success && _.isFunction(c.options.success)) c.options.success(e);
                else if (c.options.maxRetries > 0 && c.tries > c.options.maxRetries) _.isFunction(c.options.retriesExceeded) && c.options.retriesExceeded();
                else {
                    c.timeout = window.setTimeout(c.poll, c.options.timeout);
                    _.isFunction(c.options.error) && c.options.error(e)
                }
            }
        })
    };
    _.bindAll(this);
    return this
},
FriendSelector = Backbone.View.extend({
    events: {
        "click .ActionButton": "selectionComplete",
        "keyup .filter-term": "filterFriends"
    },
    initialize: function(b) {
        _.isUndefined(FriendSelector.templates) && FriendSelector.loadTemplates();
        this.multiple = _.isBoolean(b.multiple) ? b.multiple: true;
        this.url = this.$el.data("url");
        this.maxSelections = parseInt(this.$el.data("max-selections"));
        this.unaddedList = this.$el.find(".friend-list");
        this.loading = this.$el.find(".loading");
        this.confirm = this.$el.find(".invite-confirm");
        this.confirmRecipients = this.$el.find(".invite-recipients");
        this.unaddedList.hide();
        if (this.multiple) {
            this.addedList = this.$el.find(".added-friends ul");
            this.counter = this.$el.find(".current-selections")
        }
        this.maxRetries = b.maxRetries ? b.maxRetries: 8;
        _.isFunction(b.selectionMade) && this.$el.on("selection:made", b.selectionMade);
        _.isFunction(b.noAccess) && this.$el.on("selection:no-access", b.noAccess);
        this.filterFriends = _.debounce(this.filterFriends, 100);
        this.unselectedFriends = [];
        this.selectedFriends = [];
        this.friendList = b.friendList;
        var c = this;
        this.poller = new Poller({
            url: c.url,
            timeout: 1E3,
            maxRetries: c.maxRetries,
            retriesExceeded: b.retriesExceeded,
            error: function(e) {
                if (!e.has_access) {
                    c.poller.stop();
                    c.loading.fadeOut(300,
                    function() {
                        c.$el.trigger("selection:no-access", [e, c])
                    })
                }
            },
            success: function(e) {
                if (e.friends && e.friends.length > 0) window.location.reload();
                else {
                    c.friendList = e.friends;
                    c.loading.fadeOut(350);
                    c.buildFriendViews()
                }
            }
        });
        if (_.isArray(this.friendList)) this.buildFriendViews();
        else {
            this.friendList = null;
            this.findFriends()
        }
        this.updateCounter();
        this.$el.data("selector", this);
        this.$el.find(".filter-term").val("");
        this.setOffsets();
        $(window).resize(_.bind(this.setOffsets, this))
    },
    setOffsets: function() {
        var b = this.$el.find(".unadded-friends");
        this.$el.find(".added-friends").css("left", b.offset().left + b.width() + 20)
    },
    findFriends: function() {
        this.loading.removeClass("hidden");
        this.poller.start();
        return this
    },
    filterFriends: function(b) {
        b = $(b.currentTarget).val();
        var c = new RegExp("(" + b + ")", "i");
        _.each(this.unselectedFriends,
        function(e) {
            e.applyFilter(c)
        })
    },
    removeFriends: function(b) {
        this.friendList = _.reject(this.friendList,
        function(e) {
            return _.include(b, e.id)
        });
        _.each(this.unselectedFriends,
        function(e) {
            _.include(b, e.friend.id) && e.$el.remove()
        });
        this.selectedFriends = [];
        if (this.addedList) {
            var c = this.addedList.find("li");
            c.fadeOut(350,
            function() {
                c.remove()
            })
        }
    },
    canAdd: function() {
        return this.maxSelections ? this.selectedFriends.length < this.maxSelections: true
    },
    toggleSelected: function(b) {
        b.isSelected ? this.setUnselected(b) : this.setSelected(b);
        this.updateCounter()
    },
    updateCounter: function() {
        if (this.counter) {
            this.unaddedList.fadeTo(this.canAdd() ? 1 : 0.2);
            this.counter.html(this.maxSelections - this.selectedFriends.length)
        }
    },
    setSelectedState: function(b, c) {
        if (!this.multiple) this.selectedFriends = [];
        if (c) this.selectedFriends.push(b);
        else this.selectedFriends = _.without(this.selectedFriends, b)
    },
    setUnselected: function(b) {
        this.selectedFriends = this.multiple ? _.without(this.selectedFriends, b) : []
    },
    setSelected: function(b) {
        if (this.multiple) this.selectedFriends.push(b);
        else this.selectedFriends = [b]
    },
    buildFriendViews: function() {
        var b = this;
        _.each(this.friendList,
        function(c) {
            c = new UnselectedFriendView({
                ul: b.unaddedList,
                friend: c,
                selector: b
            });
            b.unselectedFriends.push(c.render())
        });
        this.unaddedList.fadeIn(350)
    },
    afterSelection: function() {
        var b = _.pluck(this.selectedFriends, "friend");
        this.removeFriends(_.pluck(b, "id"));
        this.confirmRecipients.html(Arrays.conjunct(_.pluck(b, "name")));
        this.confirm.fadeIn(500).delay(3E3).fadeOut(500)
    },
    selectionCancelled: function() {
        _.each(this.selectedFriends,
        function(b) {
            b.toggleSelected()
        });
        this.selectedFriends = [];
        this.unaddedList.find(".disabled").toggleClass("disabled")
    },
    selectionComplete: function() {
        this.$el.trigger("selection:made", [_.pluck(this.selectedFriends, "friend"), this])
    }
},
{
    initAll: function() {
        FriendSelector.loadTemplates();
        $(".friend-selector").each(function(b, c) {
            new FriendSelector({
                el: c
            })
        })
    },
    loadTemplates: function() {
        FriendSelector.templates = {
            unselectedFriend: _.template($("#template-unselected-friend").html()),
            selectedFriend: _.template($("#template-selected-friend").html())
        }
    }
});
$(window).ready(function() {
    "placeholder" in document.createElement("input") || $("[placeholder]").focus(function() {
        var b = $(this);
        if (b.val() == b.attr("placeholder")) {
            b.val("");
            b.removeClass("placeholder")
        }
    }).blur(function() {
        var b = $(this);
        if (b.val() == "" || b.val() == b.attr("placeholder")) {
            b.addClass("placeholder");
            b.val(b.attr("placeholder"))
        }
    }).blur().parents("form").submit(function() {
        $(this).find("[placeholder]").each(function() {
            var b = $(this);
            b.val() == b.attr("placeholder") && b.val("")
        })
    })
});
var RepinDialog2 = function() {
    function b(H) {
        var G = {};
        G[A + "transform"] = H;
        return G
    }
    function c(H, G) {
        return b("scale(" + H + "," + G + ")")
    }
    function e(H, G) {
        H = Math.floor(H);
        G = Math.floor(G);
        return w && !I ? {
            left: H + "px",
            top: G + "px"
        }: b("translate(" + H + "px," + G + "px)")
    }
    function g(H, G) {
        G = $.extend({
            url: "/pin/" + H + "/repindata/",
            dataType: "json",
            success: function() {},
            failure: function() {
                RepinDialog2.close()
            }
        },
        G || {});
        $.ajax(G)
    }
    function f(H) {
        return $('div[data-id="' + H + '"]')
    }
    function d(H, G) {
        var K = Math.min(Math.floor(G / H * v), q);
        H = Math.floor(K / G * H);
        return {
            height: K,
            width: H
        }
    }
    function h(H, G, K) {
        H = u(H, G, K);
        $("body").append(H.css({
            visibility: "hidden",
            position: "absolute"
        }));
        G = {
            base: H,
            height: H.height(),
            width: H.width()
        };
        H.remove().css({
            visibility: "",
            position: ""
        });
        return G
    }
    function j(H, G) {
        var K = $("form", G),
        N = $(".Buttons .Button", G),
        s = $(".DescriptionTextarea", G);
        H = $(".CharacterCount", G);
        var x = $(".mainerror", G);
        AddDialog.shareCheckboxes("Repin2");
        CharacterCount.setup(s, H, N);
        $("#publish_to_facebook", G).click(function() {
            $(this).data("publish-fb") || Facebook.startFacebookConnect("publish_stream", false, false)
        });
        N.click(function() {
            if (s.val() == "") {
                x.html(s.data("text-error-empty")).slideDown();
                return false
            }
            $("#repin_details", K).val(s.val());
            Tagging.loadTags(s, $("#repin_comment_replies", K), $("#repin_tags", K), $("#repin_currency_holder", K));
            K.submit();
            return false
        });
        K.submit(function() {
            if (N.hasClass("disabled")) return false;
            trackGAEvent("repin_submit", "clicked", "dialogue");
            N.addClass("disabled").html(N.data("text-pinning"));
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                dataType: "json",
                data: $(this).serialize(),
                success: function(y) {
                    var C;
                    if (y.status == "success") {
                        trackGAEvent("repin_submit", "success", "dialogue");
                        C = $('<div class="PostSuccess">' + $("#Repin .PostSuccess").html() + "</div>");
                        $(".BoardLink", C).attr("href", y.board_url).text(y.board_name);
                        $(".PinLink", C).attr("href", y.repin_url);
                        $("#repin_success_board_id", C).val(y.board_id);
                        G.empty().append(C);
                        C = 2500;
                        var J = $("#Repin2 .PostSuccess .suggestion");
                        if (y.suggestion) {
                            trackGAEvent("repin_submit", "viewed", "suggestion");
                            J.find(".boardHolder").html(y.suggestion);
                            J.fadeIn(500);
                            C = 1E4;
                            $(".pinBoard .followBoard a", J).click(function() {
                                clearTimeout(E);
                                trackGAEvent("repin_submit", "clicked", "suggestion");
                                E = setTimeout(function() {
                                    RepinDialog2.close()
                                },
                                1E3)
                            })
                        } else J.hide();
                        clearTimeout(E);
                        E = setTimeout(function() {
                            RepinDialog2.close()
                        },
                        C)
                    } else {
                        N.removeClass("disabled").html(N.data("text-pin-it"));
                        alert(y.message)
                    }
                },
                error: function() {
                    N.removeClass("disabled").html(N.data("text-pin-it"))
                }
            });
            return false
        });
        Tagging.initTextarea(s);
        Tagging.priceTag(s, $(".PinImagePreview", G));
        CharacterCount.truncateData(s, 500);
        BoardPicker.setup($(".BoardPicker", G),
        function(y) {
            $("#repin_board", G).val(y)
        },
        function(y) {
            $("#repin_board", G).val(y)
        });
        $.browser.msie || window.setTimeout(function() {
            s.focus().select()
        },
        1)
    }
    function k() {
        var H, G, K, N;
        if (!p) {
            G = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;visibility:hidden;"><div style="height:100px;"></div>');
            H = $("div", G);
            K = $('<div style="width:50px;height:50px;overflow:hidden;overflow-y:scroll;position:absolute;visibility:hidden;"><div style="height:100px;"></div>');
            N = $("div", K);
            $("body").append(G, K);
            H = H.innerWidth() - N.innerWidth();
            G.remove();
            K.remove();
            $("head").append('<style type="text/css">.noscroll.extraScroll,.noscroll.extraScroll #CategoriesBar,.noscroll.extraScroll #Header {margin-right:' + H + "px;}</style>");
            $("body").addClass("extraScroll");
            D && $("body").addClass("hidefixed");
            p = true
        }
    }
    function l(H, G) {
        var K = new Image;
        if (typeof G === "function") K.onload = G;
        K.src = H
    }
    function r(H, G) {
        H && H.length && l(H.attr("src").replace(/_(b|c)\.jpg$/, "_f.jpg"), G)
    }
    function u(H, G, K) {
        var N = $("#Repin"),
        s = $('<div id="Repin2"></div>'),
        x = $(".PinForm", N).clone();
        K && x.prepend(K.clone());
        x.prepend($('<div class="PinImagePreview pin priceReveal"></div>').css({
            height: G.height + "px"
        }));
        s.append(x, $("#repinform", N).clone());
        $("#repin_pin_id", s).val(H);
        $("form", s).attr("action", "/pin/" + H + "/repin/");
        return s
    }
    function o(H, G, K) {
        K = '<div class="PinBorder"></div><img class="PinImagePreviewImg" src="' + G.imgurl + '" width="' + K.width + '" height="' + K.height + '" />';
        if (G.video) K += '<img src="' + media_url + 'images/VideoIndicator.png" alt="Video Icon" class="video" />';
        if (G.buyable) K += '<div class="price">$' + G.buyable + "</div>";
        $(".PinImagePreview", H).html(K);
        $(".DescriptionTextarea", H).val(G.details).parent("li").addClass("val");
        $("#repin_tags", H).val(G.tags.join(","));
        $("#repin_comment_replies", H).val(G.reply_usernames.join(","));
        return H
    }
    var m = "visible",
    q = 300,
    v = 370,
    w = $.browser.webkit,
    B = $.browser.mozilla,
    D = navigator.userAgent.match(/chrome/i),
    I = navigator.userAgent.match(/ipad/i),
    p = false,
    n = Modernizr.csstransforms3d && !navigator.userAgent.match(/ipod|iphone|android/i),
    z = !!window.Router,
    A = "",
    E = 0,
    F = {},
    Q = {};
    if (w) A = "-webkit-";
    else if (B) A = "-moz-";
    if (z) {
        Router.on("route:repin",
        function(H) {
            RepinDialog2.show(H, true)
        });
        Router.on("route:zoom",
        function() {
            RepinDialog2.close(true)
        });
        Router.on("route:other",
        function() {
            RepinDialog2.close(true)
        })
    }
    return {
        setup: function() {
            var H = this,
            G;
            $("#ColumnContainer").on("click", ".repin_link",
            function(K) {
                trackGAEvent("repin_button", "clicked", "board_layout");
                G = $(this).closest(".pin").attr("data-id");
                H.show(G);
                K.preventDefault()
            })
        },
        show: function(H, G) {
            if (!this.currentPinID) {
                k();
                this.currentPinID = H;
                z && !G && Router.navigate("/pin/" + H + "/repin/");
                if (n) if ($("#zoom").length) this.flipFromCloseupModal(H);
                else $(".CloseupRight").length ? this.flipFromCloseupPage(H) : this.flipFromGrid(H);
                else if ($("#zoom").length) this.simpleShowFromCloseupModal(H);
                else $(".CloseupRight").length ? this.simpleShowFromCloseupPage(H) : this.simpleShowFromGrid(H)
            }
        },
        flip: function(H, G, K, N, s, x, y) {
            function C() {
                if (!R.isFlipping && R.backContent && S) {
                    var V = $(".PinImagePreviewImg", ea);
                    V.attr("src", V.attr("src").replace("_b.jpg", "_f.jpg"))
                }
            }
            function J() {
                var V = $(window),
                ga = V.height();
                V = V.width();
                ba.css(e(V < X ? X / 2 : V / 2, ga < W ? W / 2 : ga / 2))
            }
            function L() {
                J()
            }
            function M() {
                if (!R.isFlipping && R.backContent) {
                    ea.empty().append(R.backContent);
                    C();
                    j(H, R.backContent);
                    B && !ca.length && Y.addClass(m);
                    $(window).on("resize", L)
                }
            }
            var O = this,
            S = false,
            R = {
                isFlipping: true,
                frontSource: N
            },
            T = d(G, K);
            G = N.outerWidth();
            K = N.outerHeight();
            var U = N.offset();
            y = h(H, T, y);
            var aa = y.base,
            X = y.width,
            W = y.height,
            Z = G / X,
            da = K / W,
            ca = $("#zoomScroll"),
            Y,
            ba,
            fa,
            ea;
            r(s,
            function() {
                S = true;
                C()
            });
            Y = $('<div id="flipScroll" class="repinMask"><div id="flip"><div class="front face"><div class="repinWrapper"></div></div><div class="back face"><div class="repinWrapper"></div></div></div></div>');
            R.startScale = [Z, da];
            R.container = Y;
            R.resizeFn = L;
            ba = $("#flip", Y);
            s = $(".front", ba);
            fa = $(".repinWrapper", s);
            y = $(".back", ba);
            ea = $(".repinWrapper", y);
            ba.css(e(U.left + G / 2, U.top - $(window).scrollTop() + K / 2));
            s.css({
                top: -Math.floor(K / 2) + "px",
                left: -Math.floor(G / 2) + "px"
            });
            fa.append(x, $('<div class="faceMask"></div>')).css({
                height: K + "px",
                width: G + "px"
            });
            y.css({
                top: -Math.floor(W / 2) + "px",
                left: -Math.floor(X / 2) + "px"
            });
            ea.html("<img id='BackLoader' src='" + media_url + "images/MidLoader.gif' alt='Loading...' />").css($.extend({
                height: W + "px",
                width: X + "px"
            },
            c(Z, da)));
            ca.addClass("notransition");
            $("body").addClass("noscroll").append(Y);
            N.addClass("invisible");
            g(H, {
                success: function(V) {
                    if (!R.isClosing) {
                        R.backContent = o(aa, V, T);
                        M()
                    }
                }
            });
            setTimeout(function() {
                var V = $(window).height();
                J();
                V < W && Y.scrollTop(W - V);
                fa.css(c(1 / Z, 1 / da));
                ea.css(b(""));
                ba.addClass("flipping flipped"); ! B && !ca.length && Y.addClass(m);
                setTimeout(function() {
                    ba.removeClass("flipping");
                    if (!R.isClosing) {
                        R.isFlipping = false;
                        M()
                    }
                },
                401)
            },
            1);
            O.closeListeners(H);
            F[H] = R
        },
        flipFromCloseupModal: function(H) {
            var G = $("#zoom"),
            K = $(".PinImageImg", G),
            N = K.height(),
            s = K.width();
            if (K && !K.length) {
                K = $(".PinImage", G);
                N = K.attr("data-height");
                s = K.attr("data-width");
                K = null
            }
            this.flip(H, s, N, G, K, $('<div id="zoom" class="pin"></div>').html(G.html()), $(".AttributionSource", G))
        },
        flipFromCloseupPage: function(H) {
            var G = $(".CloseupRight > .WhiteContainer"),
            K = $("#pinCloseupImage"),
            N = K.height(),
            s = K.width();
            if (K && !K.length) {
                K = $("#pinCloseupVideo");
                N = K.attr("data-height");
                s = K.attr("data-width");
                K = null
            }
            this.flip(H, s, N, G, K, G.clone(), $(".AttributionSource", G))
        },
        flipFromGrid: function(H) {
            var G = f(H);
            this.flip(H, G.attr("data-width"), G.attr("data-height"), G, $(".PinImageImg", G), $('<div class="pin"></div>').html(G.html()), $(".AttributionSource", G))
        },
        simpleShow: function(H, G, K, N) {
            function s() {
                var T = $(window),
                U = T.height();
                T = T.width();
                U = U < O ? 0 : Math.floor((U - O) / 2);
                T = T < M ? 0 : Math.floor((T - M) / 2);
                (R || C).css({
                    top: U + "px",
                    left: T + "px"
                })
            }
            function x() {
                s()
            }
            var y = $('<div class="repinMask simpleRepin"><div id="Repin2"><img id="BackLoader" src="' + media_url + 'images/MidLoader.gif" alt="Loading..." /></div></div>'),
            C = $("#Repin2", y),
            J = d(G, K);
            G = h(H, J, N);
            var L = G.base,
            M = G.width,
            O = G.height,
            S = {};
            G = $("body");
            K = this;
            var R;
            G.addClass("noscroll");
            y.addClass(m);
            C.css({
                height: O + "px",
                width: M + "px"
            });
            s();
            G.append(y);
            S.resizeFn = x;
            S.container = y;
            g(H, {
                success: function(T) {
                    var U = $(window).height();
                    if (!S.isClosing) {
                        trackGAEvent("flip_grid_form", "success", "repin");
                        R = o(L, T, J);
                        C.replaceWith(R);
                        s();
                        U < O && y.scrollTop(O - U);
                        j(H, R);
                        $(window).on("resize", x)
                    }
                }
            });
            K.closeListeners(H);
            Q[H] = S
        },
        simpleShowFromCloseupModal: function(H) {
            var G = $("#zoom"),
            K = $(".PinImageImg", G);
            this.simpleShow(H, K.width(), K.height(), $(".AttributionSource", G))
        },
        simpleShowFromCloseupPage: function(H) {
            var G = $(".CloseupRight > .WhiteContainer"),
            K = $("#pinCloseupImage");
            this.simpleShow(H, K.width(), K.height(), $(".AttributionSource", G))
        },
        simpleShowFromGrid: function(H) {
            var G = f(H);
            this.simpleShow(H, G.attr("data-width"), G.attr("data-height"), $(".AttributionSource", G))
        },
        closeListeners: function() {
            var H = this,
            G = $(".repinMask");
            G.click(function(K) {
                $(K.target).is(G) && H.close()
            });
            $(document).keydown(function(K) {
                if (K.keyCode == 27) {
                    H.close();
                    K.preventDefault()
                }
            })
        },
        close: function(H) {
            function G() {
                C.remove();
                K.length || $("body").removeClass("noscroll")
            }
            var K = $("#zoomScroll"),
            N,
            s,
            x,
            y,
            C,
            J;
            if (J = this.currentPinID) {
                clearTimeout(E);
                (function() {
                    var L = $("#Repin .CurrentBoard"),
                    M = $("#Repin2 .CurrentBoard"),
                    O = $("#Repin2 #repin_board"),
                    S = $("#Repin #repin_board");
                    if (!M.length) {
                        M = $("#Repin2 .BoardLink");
                        O = $("#Repin2 #repin_success_board_id")
                    }
                    if (M.length) {
                        L.text(M.text());
                        S.val(O.val())
                    }
                })();
                z && !H && window.history.back();
                this.currentPinID = null;
                if (F[J]) {
                    N = $("#flip", C).addClass("flipping");
                    H = F[J];
                    H.isClosing = true;
                    H.isFlipping = false;
                    s = H.startScale;
                    y = H.frontSource;
                    x = y.offset();
                    C = H.container;
                    C.removeClass(m);
                    N.removeClass("flipped").css(e(x.left + y.outerWidth() / 2, x.top - $(window).scrollTop() + y.outerHeight() / 2));
                    $(".back .repinWrapper", N).empty().css(c(s[0], s[1]));
                    $(".front .repinWrapper", N).css(b(""));
                    N.addClass("flipping");
                    setTimeout(function() {
                        y.removeClass("invisible");
                        window.setTimeout(function() {
                            K.removeClass("notransition")
                        },
                        1);
                        G();
                        F[J] = null
                    },
                    401);
                    $(window).off("resize", H.resizeFn)
                } else if (Q[J]) {
                    H = Q[J];
                    H.isClosing = true;
                    C = H.container;
                    G();
                    Q[J] = null;
                    $(window).off("resize", H.resizeFn)
                }
            }
        }
    }
} ();
var MobileNagControl = function() {
    this.hideNagCookie = P.MobileNagConfig.HIDE_NAG_COOKIE;
    this.csrf = P.MobileNagConfig.CSRF_TOKEN;
    this.nagType = P.MobileNagConfig.nag_type;
    this.hasTopNag = P.MobileNagConfig.has_top_nag;
    this.enabledNags = P.MobileNagConfig.nag_support;
    this.body = $(document.body);
    this.currentLocation = window.location;
    this.userAgent = navigator ? navigator.userAgent: "";
    this.nagBar = $("#AppNag")
};
a = MobileNagControl.prototype;
a.init = function() {
    $(".Nag").length && this.body.addClass("hazYellowNag");
    document.URL.match(/\/pin\//) && this.body.addClass("hazCloseUp");
    this.hasTopNag && $(document.body).addClass("topNag");
    this.nagType && this.nagType != "unauth" && $(document.body).addClass("appNag");
    this.renderUnauthNags();
    this.attachHandlers()
};
a.getRequestPath = function() {
    return this.currentLocation.pathname
};
a.attachHandlers = function() {
    var b = this;
    $(".close", this.nagBar).click(function() {
        CookieManager.set_cookie(b.hideNagCookie, "1");
        b.closeNag();
        b.trackCloseNag();
        return false
    });
    $(".open", this.nagBar).click(function() {
        b.trackClickNag();
        window.setTimeout(function() {
            DeepLinking.redirectApp()
        },
        300);
        return false
    })
};
a.closeNag = function() {
    this.body.removeClass("appNag");
    this.nagBar.hide()
};
a.trackCloseNag = function() {
    $.post("/close_mobile_nag/", {
        nag_type: this.nagType,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.trackClickNag = function() {
    $.post("/click_mobile_nag/", {
        nag_type: this.nagType,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.trackViewNag = function(b) {
    $.post("/view_mobile_nag/", {
        nag_type: b,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.renderUnauthNags = function() {
    var b = "",
    c = navigator ? navigator.userAgent: "",
    e = CookieManager.get_cookie(this.hideNagCookie);
    if (this.nagType == "unauth" && !e) {
        if (c.match(/iphone/i)) b = "iphone";
        else if (c.match(/ipad/i)) b = "ipad";
        else if (c.match(/android/i)) b = "android";
        if (b && this.enabledNags && this.enabledNags.indexOf(b) >= 0) {
            $(document.body).addClass("topNag");
            $("." + b, this.appNag).show();
            $(".unauth", this.appNag).show();
            this.trackViewNag(b)
        }
    }
};
var DeepLinking = {
    android_app_dl_url: "https://play.google.com/store/apps/details?id=com.pinterest",
    apple_app_dl_url: "http://itunes.apple.com/us/app/pinterest/id429047995",
    app_url: "pinterest://",
    app_url2: "pinit12://",
    deep_link_cookie: "deep_linking_cookie",
    current_location: window.location,
    android_redirect_key: "p_android_return",
    init: function() { ! CookieManager.get_cookie(this.deep_link_cookie) && this.handleDeepLink()
    },
    handleDeepLink: function() {
        return this.isValidSource() && this.isIOS()
    },
    isValidSource: function() {
        var b = this.current_location.search;
        return b && b.match(/utm_medium=email/g) != null
    },
    isIOS: function() {
        return navigator && navigator.userAgent.match(/iP/i) != null
    },
    isAndroid: function() {
        return navigator && navigator.userAgent.match(/android/i) != null
    },
    redirectApp: function() {
        var b = this,
        c = b.app_url + this.current_location.href,
        e = null,
        g = b.app_url2 + this.current_location.href.replace(/(http:\/\/)|(https:\/\/)/, "");
        CookieManager.delete_cookie(this.deep_link_cookie);
        if (this.isIOS()) {
            window.location = c;
            window.setTimeout(function() {
                CookieManager.set_cookie(b.deep_link_cookie, "1");
                window.location = b.apple_app_dl_url
            },
            50)
        } else if (this.isAndroid()) {
            e = document.createElement("iframe");
            e.style.visibility = "hidden";
            e.src = g;
            e.onload = function() {
                window.location = b.android_app_dl_url
            };
            document.body.appendChild(e)
        }
    },
    getAndroidRedirectUrl: function(b) {
        b = b.indexOf("?") >= 0 ? b + "&": b + "?";
        b += this.android_redirect_key + "=1";
        return b
    }
},
CookieManager = {
    set_cookie: function(b, c, e) {
        var g = new Date,
        f = "";
        if (e) {
            g.setTime(g.getTime() + e * 24 * 60 * 60 * 1E3);
            f = "; expires=" + g.toGMTString()
        }
        document.cookie = b + "=" + c + f + "; path=/"
    },
    delete_cookie: function(b) {
        this.set_cookie(b, "", -1)
    },
    get_cookie: function(b) {
        var c = null,
        e = null,
        g = null;
        if (document.cookie && document.cookie != "") {
            e = document.cookie.split(";");
            for (var f = 0; f < e.length; f++) {
                g = jQuery.trim(e[f]);
                if (g.substring(0, b.length + 1) == b + "=") c = decodeURIComponent(g.substring(b.length + 1))
            }
        }
        return c
    }
};
DeepLinking.init();
$(document).bind("ready.deep_links",
function() {
    window.P && window.P.MobileNagConfig && window.P.MobileNagConfig.nag_type && (new MobileNagControl).init()
});
(function(b) {
    b.fn.passStrength = function(c, e, g, f) {
        return this.each(function() {
            var d = b(this);
            b(d).unbind().bind("keyup blur",
            function() {
                if (b(this).val() !== null) {
                    var h = b.fn.teststrength(b(this).val(), f, g);
                    if (h[2]) {
                        c.attr("disabled", "disabled");
                        c.addClass("disabled")
                    } else {
                        c.removeAttr("disabled");
                        c.removeClass("disabled")
                    }
                    e.html(h[0]);
                    e.removeClass(f.badPassStyle);
                    e.removeClass(f.goodPassStyle);
                    e.removeClass(f.strongPassStyle);
                    e.addClass(h[1])
                }
            })
        })
    };
    b.fn.teststrength = function(c, e, g) {
        var f = 0;
        if (c.length < 6) return [e.shortPassStr, e.badPassStyle, 1];
        if (e.userid.length > 0 && c.toLowerCase() == e.userid.toLowerCase()) return [e.samePasswordStr, e.badPassStyle, 1];
        if (jQuery.inArray(c.toLowerCase(), g) > -1) return [e.blackPassStr, e.badPassStyle, 1];
        f += c.length * 2;
        f += b.fn.uniqueCharacters(c) * 3;
        if (c.match(/(.*[0-9].*[0-9].*[0-9])/)) f += 15;
        if (c.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)) f += 15;
        if (c.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) f += 10;
        if (c.match(/([a-zA-Z])/) && c.match(/([0-9])/)) f += 15;
        if (c.match(/([!,@,#,$,%,\^,&,*,?,_,~])/) && c.match(/([0-9])/)) f += 15;
        if (c.match(/([!,@,#,$,%,\^,&,*,?,_,~])/) && c.match(/([a-zA-Z])/)) f += 15;
        if (c.match(/^[a-z]+$/) || c.match(/^[A-Z]+$/) || c.match(/^\d+$/)) f -= 10;
        if (f < 34) return [e.badPassStr, e.badPassStyle, 0];
        if (f < 68) return [e.goodPassStr, e.goodPassStyle, 0];
        return [e.strongPassStr, e.strongPassStyle, 0]
    }
})(jQuery);
$.fn.uniqueCharacters = function(b) {
    for (var c = {}, e = 0, g = 0; g < b.length; g++) if (! (b.charAt(g) in c)) {
        c[b.charAt(g)] = true;
        e++
    }
    return e
};
