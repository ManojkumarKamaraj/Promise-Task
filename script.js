function element(tag, classname, id, text) {
    const tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
}
const container = element("div", "container", "", "");
const head1 = element("h1", "text-center", "title", "Rest Countries-Weather");
const row = element("div", "row", "", "")

const response = fetch("https://restcountries.com/v3.1/all")
response.then((data) => data.json())
    .then((ele) => {
        for (let i = 0; i < ele.length; i++) {
            const col = document.createElement("div");
            col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4"
            col.innerHTML = `
          <div class="card h-100 ">
          <div class= "card-header">
          <h5 class= "card-title text-center">${ele[i].name.common}</h5>
          </div>
          <div class ="img-box">
          <img src=${ele[i].flags.png} class = "card-img-top" alt ="flag-image"/>
          </div>
          <div class="card-body">
          <div class="card-text text-center">Region: ${ele[i].region}</div>
          <div class="card-text text-center">Capital: ${ele[i].capital}</div>
          <div class="card-text text-center">Country Code: ${ele[i].cca3}</div>
          <button class="btn - btn-primary">Click for Weather</button>
          </div>
          </div>
          `
            row.append(col)
        }
        let buttons = document.querySelectorAll("button")
        buttons.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                let latlong = ele[index].latlng
                let lat = latlong[0];
                let lon = latlong[1]
                let weatherapi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=96612d6bec8e49cb7f28fcf41989dd88`)
                weatherapi.then((data) => data.json())
                    .then((result) => {
                        alert(`Weather of ${ele[index].name.common} is ${Math.floor(result.main.temp)}🌡C`)
                    })
            })

        }
        )

    })
container.append(row)
document.body.append(head1, container)