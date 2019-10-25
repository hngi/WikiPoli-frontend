let mainBody = document.querySelector('#main-body-container')
const api = "http://teamgandhi.000webhostapp.com/api";

const wikiToken = sessionStorage.getItem("wikiToken");
const userEmail = sessionStorage.getItem("userEmail");

if ( wikiToken && userEmail ) {
  document.querySelector( "#main-navbar" ).innerHTML = `<h4 class="navbar-item" style="text-ah4gn: right">${userEmail}</li class="navbar-item">`;
}


function showPostReq () {
  var form = new FormData();
  var settings = {
  url: `${api}/show_post.php`,
  method: "GET",
  timeout: 0,
  processData: false,
  mimeType: "multipart/form-data",
  contentType: false,
  data: form
};

$.ajax(settings).done(function(response) {
  console.log( JSON.parse( response ) );
  const objResponse = JSON.parse(response)
  if (  objResponse.res === "All Posts Gotten" && objResponse.status === 200 ) {
    console.log('yes')
    const allPosts = objResponse.data;
    mainBody.innerHTML = ''
    allPosts.forEach( ( post ) => {
      mainBody.innerHTML += `
      <div class="col-sm">
				<div class="post">
				<h4>Post</h4>
					<p>${post.post}
          </p>
          <div style=${ !wikiToken ? 'display:none' : 'display: block' } class="icon">
        
						<a href="" class="" aria-hideen="true"><img src="https://res.cloudinary.com/siyfa/image/upload/v1571760606/zbjtlwqjffgwvyc9klvc.png" style="width: 25px;"></a>
						<a href=""><img src="https://res.cloudinary.com/siyfa/image/upload/v1571761066/a4zha34vheoeyzypvpqu.png" style="width: 25px;"></a>
		                <a href=""><img src="https://res.cloudinary.com/siyfa/image/upload/v1571761008/bzosk4pcqvpldu59bo0w.png" style="width: 25px;"></i></a>
		                <a href="" aria-hideen="true"><img src="https://res.cloudinary.com/siyfa/image/upload/v1571760662/hq5ctfvhjv3r05bqdski.png" style="width: 25px;"></a>
					</div>
				</div>
			</div>
      `;
    } );
  }
} );
}

showPostReq()


