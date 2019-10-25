
const api = "http://teamgandhi.000webhostapp.com/api";
const wikiToken = sessionStorage.getItem( 'wikiToken' );
const userEmail = sessionStorage.getItem('userEmail')

if ( !wikiToken && !userEmail ) {
  console.log("not logged in");
  location.href="signin.html"
} else {
  console.log('logged in');
  document.querySelector( "#logout" ).addEventListener( 'click', ( e ) => {
    e.preventDefault();
    sessionStorage.removeItem("wikiToken");
    sessionStorage.removeItem( "userEmail" );
    console.log('yh');
    setTimeout(() => {
      location.href="signin.html"
    }, 1000);
  } )  
  document.querySelector('#add-post-button').addEventListener("click", (e) => {
    e.preventDefault();
    console.log( 'show-modal' )
    const addPosts = () => {
      const postBody = document.querySelector("#post-content").value

      var form = new FormData();
      form.append(
        "token",
        sessionStorage.getItem('wikiToken')
      );
      form.append("post", postBody);
      form.append("topic", "tester");

      var settings = {
        url: `${api}/create_post.php`,
        method: "POST",
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form
      };

      $.ajax(settings).done(function(response) {
        console.log('entered');
        console.log(JSON.parse(response));
      });
    }
    addPosts();
    console.log('done');
    setTimeout(() => {
      document.location.reload()
    }, 10000);

  })

}
