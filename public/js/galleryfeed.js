function imageDOMObject(imageJSON, user) {
    const galleryDiv = document.createElement('div');
    galleryDiv.className = 'd-flex flex-wrap';
    
    const card = document.createElement('div');
    card.setAttribute('id', imageJSON._id);
    card.setAttribute('style', 'max-width:30%; heigh: auto; margin:auto; padding:1.5em;');
    card.className = 'card';
    colDiv.appendChild(card);
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-img';
    card.appendChild(cardBody);

    const contentSpan = document.createElement('p');
    contentSpan.className = 'post-content card-text';
    contentSpan.innerHTML = postJSON.content;
    cardBody.appendChild(contentSpan);

    const inkspiredButton = document.createElement('a');
    inkspiredButton.className = 'card-link';
    inkspiredButton.innerHTML = 'inkspired';
    inkspiredButton.href = "#";
    cardBody.appendChild(inkspiredButton);
    
    const inkspiredIcon = document.createElement('i');
    inkspiredIcon.className = 'fa fa-plus-square';
    inkspiredIcon.setAttribute('aria-hidden', 'true')
    inkspiredButton.appendChild(inkspiredIcon)
    
    const inkedButton = document.createElement('a');
    inkedButton.className = 'card-link';
    inkedButton.innerHTML = 'inked';
    inkedButton.href = "#";
    cardBody.appendChild(inkedButton);
    
    const inkedIcon = document.createElement('i');
    inkedIcon.className = 'fa fa-paint-brush';
    inkedIcon.setAttribute('aria-hidden', 'true')
    inkedButton.appendChild(inkedIcon)

    const cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer';
    card.appendChild(cardFooter);

    const creatorSpan = document.createElement('a');
    creatorSpan.className = 'post-creator card-title';
    creatorSpan.innerHTML = postJSON.creator_name;
    cardFooter.appendChild(creatorSpan);

    return card;
}


/*function newPostDOMObject() {
  const newPostDiv = document.createElement('div');
  newPostDiv.className = 'input-group my-3';

  // input for creating a new Post
  const newPostContent = document.createElement('input');
  newPostContent.setAttribute('type', 'text');
  newPostContent.setAttribute('placeholder', 'New Post');
  newPostContent.className = 'form-control';
  newPostContent.setAttribute('id', 'post-content-input');
  newPostDiv.appendChild(newPostContent);

  const newPostButtonDiv = document.createElement('div');
  newPostButtonDiv.className = 'input-group-append';
  newPostDiv.appendChild(newPostButtonDiv);

  const newPostSubmit = document.createElement('button');
  newPostSubmit.innerHTML = 'Submit';
  newPostSubmit.className = 'btn btn-outline-primary';
  // here: handler for when we submit the post
  newPostSubmit.addEventListener('click', submitPostHandler);
  newPostButtonDiv.appendChild(newPostSubmit);

  return newPostDiv;
}*/

function submitPostHandler() {
  // TO BE IMPLEMENTED:
  // submit the post to our newly implemented database
  const newPostInput = document.getElementById('post-content-input');

  const data = {
      content: newPostInput.value,
  };

  post('/api/images', data);
  // what is this next line doing?
  newPostInput.value = '';
}

// {
//   _id: "5a53ba14a6078f28283eb9a1",
//   creator_name: "Rupayan Neogy", 
//   parent: "5a53b37189c7bb15141e9e40", 
//   content: "I think a good name is Winston"
// }


// Makes API requests and calls helper functions
function renderGallery(user) {
  const imagesDiv = document.getElementById('gallery-images');
  get('/api/images', {}, function(imagesArr) {
    for (let i = 0; i < imagesArr.length; i++) {
      const currentImage = imagesArr[i];
      imagesDiv.prepend(imageDOMObject(currentImage, user));
    }
  });
}