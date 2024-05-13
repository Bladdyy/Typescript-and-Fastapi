"use strict";
const x1 = document.getElementById("x1");
const y1 = document.getElementById("y1");
const x2 = document.getElementById("x2");
const y2 = document.getElementById("y2");
const pict = document.getElementById("pict");
const color = document.getElementById("color");
const submitButton = document.getElementById("submitBtn");
const deleteButton = document.getElementById("deleteBtn");
let click_x = -1;
let click_y = -1;
let rect = {
    color: "",
    x1: -1,
    y1: -1,
    x2: -1,
    y2: -1,
};
let del_bool = false;
function to_default() {
    del_bool = false;
    document.getElementById("ocolor").setAttribute("value", "Brak");
    document.getElementById("ox1").setAttribute("value", "Brak");
    document.getElementById("oy1").setAttribute("value", "Brak");
    document.getElementById("ox2").setAttribute("value", "Brak");
    document.getElementById("oy2").setAttribute("value", "Brak");
}
function new_rec() {
    if (!(color.value === "" || x1.value === "" || x2.value === "" || y1.value === "" || y2.value === "")) {
        const rec = { color: color.value,
            x1: parseInt(x1.value),
            y1: parseInt(y1.value),
            x2: parseInt(x2.value),
            y2: parseInt(y2.value) };
        add_rec(rec);
    }
}
function add_rec(rectangle) {
    to_default();
    if (rectangle.x2 - rectangle.x1 > 0 && rectangle.y2 - rectangle.y1 > 0) {
        const new_rec = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        new_rec.setAttribute("x", rectangle.x1.toString());
        new_rec.setAttribute("y", rectangle.y1.toString());
        new_rec.setAttribute("width", (rectangle.x2 - rectangle.x1).toString());
        new_rec.setAttribute("height", (rectangle.y2 - rectangle.y1).toString());
        new_rec.setAttribute("fill", rectangle.color);
        pict === null || pict === void 0 ? void 0 : pict.appendChild(new_rec);
    }
}
function clicked(x, y) {
    click_x = x;
    click_y = y;
}
function unclicked(x, y) {
    if (click_x != -1 && click_y != -1 && x != click_x && y != click_y) {
        let col = "black";
        if (!(color.value === "")) {
            col = color.value;
        }
        const rec = { color: col,
            x1: Math.min(click_x, x),
            y1: Math.min(click_y, y),
            x2: Math.max(click_x, x),
            y2: Math.max(click_y, y) };
        add_rec(rec);
        click_x = -1;
        click_y = -1;
    }
}
function del(x, y) {
    if (click_x == x && click_y == y) {
        if (del_bool && x >= rect.x1 && y >= rect.y1 && x <= rect.x2 && y <= rect.y2) {
            delete_rec();
        }
        else {
            let rects = document.querySelectorAll('rect');
            let len = rects.length - 1;
            let seek = true;
            while (len >= 0 && seek) {
                let temp = rects[len];
                let x_r = parseInt(temp.getAttribute('x'));
                let y_r = parseInt(temp.getAttribute('y'));
                let rec_width = parseInt(temp.getAttribute('width'));
                let rec_length = parseInt(temp.getAttribute('height'));
                if (x_r <= x && y_r <= y && y_r + rec_length >= y && x_r + rec_width >= x) {
                    rect.x1 = x_r;
                    rect.x2 = x_r + rec_width;
                    rect.y1 = y_r;
                    rect.y2 = y_r + rec_length;
                    rect.color = temp.getAttribute('fill');
                    seek = false;
                    del_bool = true;
                    document.getElementById("ocolor").setAttribute("value", rect.color);
                    document.getElementById("ox1").setAttribute("value", rect.x1.toString());
                    document.getElementById("oy1").setAttribute("value", rect.y1.toString());
                    document.getElementById("ox2").setAttribute("value", rect.x2.toString());
                    document.getElementById("oy2").setAttribute("value", rect.y2.toString());
                }
                len--;
            }
            if (seek) {
                to_default();
            }
        }
    }
}
function delete_rec() {
    if (del_bool) {
        del_bool = false;
        let rects = document.querySelectorAll('rect');
        let len = rects.length - 1;
        let seek = true;
        while (len >= 0 && seek) {
            let temp = rects[len];
            let x_r = parseInt(temp.getAttribute('x'));
            let y_r = parseInt(temp.getAttribute('y'));
            let rec_width = parseInt(temp.getAttribute('width'));
            let rec_length = parseInt(temp.getAttribute('height'));
            if (x_r <= click_x && y_r <= click_y && y_r + rec_length >= click_y && x_r + rec_width >= click_x) {
                temp.remove();
                seek = false;
            }
            len--;
        }
        to_default();
    }
}
submitButton.addEventListener("click", new_rec);
deleteButton.addEventListener("click", delete_rec);
pict === null || pict === void 0 ? void 0 : pict.addEventListener("mousedown", (event) => { clicked(event.offsetX, event.offsetY); });
pict === null || pict === void 0 ? void 0 : pict.addEventListener("mouseup", (event) => { unclicked(event.offsetX, event.offsetY); });
pict === null || pict === void 0 ? void 0 : pict.addEventListener("click", (event) => { del(event.offsetX, event.offsetY); });
