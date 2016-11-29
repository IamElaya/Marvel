
var React = require('react');
var ReactDOM = require('react-dom');
var api = require('marvel-comics-api');

import NavBar from './components/NavBar.js'
import Footer from './components/Footer.js'
import Body from './components/Body.js'
import Header from './components/Header.js'
import Characters from './components/Characters.js'

const keys = {
  public: '62b90bff7ee74248f2d2d4717bc4afac',
  private: '9ad87557cac2adae4a2d4870629ee096d2a1c288'
}


var App = React.createClass({
  getInitialState: function () {
    return {
      characterName: 'Jean',
    };
  },

  paginate(query, cb) {
    var that = this
    var noop = function () {}
    var pages = 2
    var numPages = 0
    var images = []
    var names = []
    var links = []
    cb = cb || noop
    query = query || {} 
    api('characters', {
      publicKey: keys.public,
      privateKey: keys.private,
      timeout: 4000,
      query: {
        'nameStartsWith': that.state.characterName
      }
    }, function (err, body, resp) {
      if (err) {
        return cb(new Error('invalid request; Marvel server may have timed out'))
      }
      if (!(/^2/.test(resp.statusCode))) {
        return cb(new Error(body.status || body.message))
      }
      var data = body.data
      data.results
        .filter(validItem)
        .forEach(function (item){
          console.log(item);
          var name = item.name
          var description = item.description
          var thumb = item.thumbnail
          var uri = thumb.path + '/portrait_uncanny.' + thumb.extension
          var link = item.urls[0].url
          links.push(link)
          images.push(uri)
          names.push(name)
          $("#images").append("<figure class='col-xs-12 col-md-1'><div class='marvelCharacter'><img src='" + uri + "'></a><hr class='white'><h1>" + name + "</h1><a style='display: none;' href='" + link + "'></a></div></figure>")

        });
        $(".marvelCharacter").on("click", function() {
          console.log($(this).find("a").attr('href'))
          $('.imagetext').text($(this).find("h1").html()); 
          $('.imagepreview').attr('src', $(this).find("img").attr('src')); // here asign the image to the modal when the user click the enlarge link
          $('.imagelink').attr('href', $(this).find('a').attr('href'))
          $('.imagemodal').modal('show'); // imagemodal is the id attribute assigned to the bootstrap modal, then i use the show function
        });

      var offset = data.offset
      var count = data.count
      numPages++
      if (numPages < pages && offset + count < data.total) {
        query.offset = offset + count
        paginate(query, cb)
      } else {
        cb(null)
      }
    });

    function validItem (item) {
      var ignores = [
        'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'
      ]
      if (!item.thumbnail || !item.thumbnail.path) {
        return false
      }
      var thumb = item.thumbnail
      return thumb.path.indexOf('image_not_available') === -1
        && ignores.indexOf(thumb.path) === -1
    }
  },

  render: function () {
    return (
      <div id="container">
        <NavBar />
        <Header />
        <div id="characters" className="container">
          <Body />
          <Characters paginate={this.paginate} />
        </div>
        <Footer />
      </div>
    )
  }
  
});



ReactDOM.render(<App />, document.getElementById('app')); 

export default App