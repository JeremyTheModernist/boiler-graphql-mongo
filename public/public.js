// import Axios from "axios";

var query = `{
    post(title: "The Best Tacos in the World"){
  title
      description
      author{
        name
        age
      }
    }
  }`;

var body = document.querySelector("body");
var ul = document.createElement("ul");

function makeCard(data) {
	var { post } = data;
	for (let key in post) {
		var li = document.createElement("li");
		li.textContent = `${post[key]}`;
		ul.appendChild(li);
		body.appendChild(ul);
	}
}

axios({
	url: `http://localhost:3262/graphql?query=${query}`,
	method: "get"
}).then(res => {
	console.log("axios res", res.data.data.post);
	var { data } = res.data;
	makeCard(data);
});

console.log("axios", axios);
