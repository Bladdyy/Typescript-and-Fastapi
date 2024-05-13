
var ws = new WebSocket("ws://localhost:8000/ws");
const div = document.getElementById("pics") as HTMLElement

ws.onmessage = function(event) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "border border-dark")
    svg.setAttribute("width", "380")
    svg.setAttribute("height", "380")
    svg.setAttribute("viewBox", "0 0 380 380")
    let rects = JSON.parse(event.data)['rects']
    rects.forEach(function (value: { [x: string]: string; }) {
        const new_rec = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        new_rec.setAttribute("x", value['x'])
        new_rec.setAttribute("y", value['x'])
        new_rec.setAttribute("width", value['width'])
        new_rec.setAttribute("height", value['height'])
        new_rec.setAttribute("fill", value['color'])
        svg.appendChild(new_rec)
      })
    div.appendChild(svg)
};
ws.onopen = function(event) {
    console.log("connected")
}
ws.onclose = function(event) {
    console.log("closed connection")
    if (!event.wasClean){
        var ws = new WebSocket("ws://localhost:8000/ws");
    }
}
ws.onerror = function(event) {
    console.error("disconnected")
    var ws = new WebSocket("ws://localhost:8000/ws");
}