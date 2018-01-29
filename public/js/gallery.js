function main() {

    get('/api/inked', {}, function (inkedArr) {
        for (let i = inkedArr.length - 1; i >= 0; i--) {
            renderGallery(inkedArr[i]);
        }
    });

    get('/api/whoami', {}, function (user) {
        renderNavbar(user);
    });
}


function renderGallery(inkedJSON) {

    const postContainer = document.getElementById('photo-holder');
    const cardDiv = document.createElement('div');
    cardDiv.className = "card photo-container";
    cardDiv.setAttribute("style", 'padding:0px');
    cardDiv.setAttribute('style', 'background:url(\'https://s3.amazonaws.com/inkspire/' + encodeURIComponent(inkedJSON.image_url) + '\') 50% 50% no-repeat; background-size:cover;');
    //    
    //    const cardImg = document.createElement('img');
    //    cardImg.className = 'card-img';
    //    const url = "https://s3.amazonaws.com/inkspire/" + inkedJSON.image_url;
    //    cardImg.setAttribute('src', url);
    //    cardDiv.appendChild(cardImg);

    const overlayText = document.createElement('div');

    //THIS IS THE EXPAND ICON TO ZOOM IMAGES
    const expandButton = document.createElement('a');
    expandButton.setAttribute('name', encodeURIComponent(inkedJSON.image_url));
    expandButton.className = "trash-link";
    expandButton.href = "#expand";
    expandButton.onclick = function () {
        expandButton.setAttribute('onclick', 'zoomImage(this)');
    }
    overlayText.prepend(expandButton);

    const expandIcon = document.createElement('i');

    expandIcon.className = "fas fa-expand-arrows-alt hoverleft";
    expandIcon.setAttribute('id', "expand-icon");

    expandIcon.setAttribute('aria-hidden', 'true');
    expandButton.prepend(expandIcon);
    //-----

    const overlayPostContent = document.createElement('h1');
    const overlayPostAuthor = document.createElement('small');
    const overlayPostArtist = document.createElement('small');

    const postAuthorIcon = document.createElement('i');
    postAuthorIcon.className = 'far fa-lightbulb';
    overlayPostAuthor.appendChild(postAuthorIcon);
    overlayPostAuthor.className = "post-creator";

    const postArtistIcon = document.createElement('i');
    postArtistIcon.className = 'fa fa-paint-brush';
    overlayPostArtist.appendChild(postArtistIcon);
    overlayPostArtist.className = "post-creator";
    overlayPostArtist.innerHTML += ("  " + inkedJSON.creator_name);

    const artistLink = document.createElement('a');
    artistLink.setAttribute('href', '/u/profile?' + inkedJSON.creator_id);
    artistLink.appendChild(overlayPostArtist);

    get('/api/posts', {}, function (postsArr) {
        for (let i = 0; i < postsArr.length; i++) {
            if (inkedJSON.post_id == postsArr[i]._id) {
                overlayPostContent.innerHTML = postsArr[i].content;
                expandButton.setAttribute('id', postsArr[i].content);
                overlayPostAuthor.innerHTML += ("  " + postsArr[i].creator_name);
                overlayPostContent.setAttribute("style", "color:#464a4c;")

                const contentLink = document.createElement('a');
                contentLink.className = "shadow";
                contentLink.setAttribute('href', '/p/idea?' + postsArr[i]._id);

                contentLink.appendChild(overlayPostContent);

                const authorLink = document.createElement('a');
                authorLink.setAttribute('href', '/u/profile?' + postsArr[i].creator_id);
                authorLink.appendChild(overlayPostAuthor);
                overlayText.prepend(contentLink);
                overlayText.appendChild(authorLink);

                const timeStamp = document.createElement('p');
                timeStamp.className = 'time-stamp';
                var date = new Date(postsArr[i].date);
                timeStamp.innerText = date.toLocaleDateString();
                timeStamp.setAttribute('style', 'font-size:0.75em');
                overlayText.append(timeStamp);

            }
        }
    });

    overlayText.appendChild(artistLink);

    //overlayText.setAttribute('style', "display: table-cell; vertical-align: middle;");
    overlayText.className = 'text overlay d-flex flex-column align-items-center justify-content-center';

    cardDiv.appendChild(overlayText);
    postContainer.appendChild(cardDiv);
}

function zoomImage(ink) {
    console.log(ink);
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('img01');
    const captionText = document.getElementById('caption');

    modal.style.display = 'block';
    modalImg.src = 'https://s3.amazonaws.com/inkspire/' + ink.getAttribute('name');
    captionText.innerHTML = ink.getAttribute('id');
}

main();
