

const api = "http://teamgandhi.000webhostapp.com/api";
const wikiToken = sessionStorage.getItem( 'wikiToken' );
const userEmail = sessionStorage.getItem('userEmail')

if ( !wikiToken && !userEmail ) {
  location.href="signin.html"
} else {
 
  document.querySelector( "#user-email" ).innerText = userEmail;
  document.querySelector( "#logout-button" ).addEventListener( 'click', ( e ) => {
    e.preventDefault();
    sessionStorage.removeItem("wikiToken");
    sessionStorage.removeItem( "userEmail" );
    
    setTimeout(() => {
      location.href="index.html"
    }, 2000);
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
        console.log(response);
      });
    }
    addPosts()
    setTimeout(() => {
      document.location.reload()
    }, 1000);

  })

}
