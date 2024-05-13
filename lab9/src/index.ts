import axios from 'axios';

const submitButton = document.getElementById("submitBtn") as HTMLButtonElement

function create_pict(json: any): SVGSVGElement{
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "border border-dark")
    svg.setAttribute("width", "380")
    svg.setAttribute("height", "380")
    svg.setAttribute("viewBox", "0 0 380 380")
    let rects = json['rects']
    rects.forEach(function (value: { [x: string]: string; }) {
        const new_rec = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        new_rec.setAttribute("x", value['x'])
        new_rec.setAttribute("y", value['x'])
        new_rec.setAttribute("width", value['width'])
        new_rec.setAttribute("height", value['height'])
        new_rec.setAttribute("fill", value['color'])
        svg.appendChild(new_rec)
      })
    return svg
}

async function add_pic(id: number): Promise<void>{
    try {
        let response = await axios.get("http://localhost:8000/picture/" + id.toString());
        const spinner = document.getElementById("spin" + id.toString()) as HTMLElement
        spinner.remove()
        const new_pic = document.getElementById("pic" + id.toString()) as HTMLElement
        if (response.data['rects'].length > 100){
            set_button(id, 1)
        }
        else{
            new_pic.appendChild(create_pict(response.data))
        }
    } catch (error) {
        const spinner = document.getElementById("spin" + id.toString()) as HTMLElement
        spinner.remove()
        set_button(id, 0)
    }
}

function set_button(id: number, which: number): void{
    const pic_place = document.getElementById("pic" + id.toString()) as HTMLElement

    const button = document.createElement('button');
    button.textContent = 'Reload';
    button.setAttribute("id", "click" + id.toString())
    button.addEventListener("click", (event) => {spinner_back(id)});

    const br = document.createElement('br');
    br.setAttribute("id", "br" + id.toString())

    const text = document.createElement('p');
    text.setAttribute("id", "p" + id.toString())
    if (which == 0){
        text.textContent = "There was an error while loading your image."
    }
    else{
        text.textContent = "Size of the image was too big.  "
    }
    pic_place.appendChild(text)
    pic_place.appendChild(br)
    pic_place.appendChild(button)
}
function spinner_back(id: number): void{
    const But = document.getElementById("click" + id.toString()) as HTMLButtonElement
    const Br = document.getElementById("br" + id.toString()) as HTMLButtonElement
    const text = document.getElementById("p" + id.toString()) as HTMLButtonElement
    Br.remove()
    text.remove()
    But.removeEventListener("click", (event) => {spinner_back(id)})
    But.remove()
    var elem = document.createElement('div');
    elem.setAttribute("class", "spinner-border")
    elem.setAttribute("role", "status")
    elem.setAttribute("id", "spin" + id.toString())
    var elem2 = document.createElement('span');
    elem2.setAttribute("class", "sr-only")
    elem.appendChild(elem2)
    const pict = document.getElementById("pic" + id.toString()) as HTMLElement
    pict.appendChild(elem)
    add_pic(id)
}

function add_pic_first(): void{
    submitButton.remove()
    let ids = [1, 2, 3, 4, 5, 6]
    ids.forEach(function (value) {
        add_pic(value);
      })
}

submitButton.addEventListener("click", add_pic_first);
