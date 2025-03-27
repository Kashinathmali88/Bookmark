const model = document.getElementById('model');
const modelShow = document.getElementById('show-model');
const modelClose = document.getElementById('close-model');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmark-continer');

let bookmarks = [];

// show model . foucus on inlpur

function showModel()
{
    model.classList.add('show-model');
    websiteNameEl.focus();
}

modelShow.addEventListener('click',showModel);

modelClose.addEventListener('click',()=> model.classList.remove('show-model'));

window.addEventListener('click',(e)=>(e.target === model ? model.classList.remove('show-model'):false));

// validate form

function validate(nameValue,urlValue)
{
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

        const regex = new RegExp(expression);
        
        
        if(!nameValue || !urlValue)
        {
            alert('Please submit values for both fields');
            return false;
        }
       if(!urlValue.match(regex))
       {
        alert('Please provid a valid web address');
        return false;
       }
    //    valid
       return true;
}

// build book marks

function buildBookmarks()
{
    // remove all bookmark element
   bookmarkContainer.textContent = '';

    // build item
    bookmarks.forEach((bookmark)=> {
        const {name , url} = bookmark;
        // item
        const item = document.createElement('div');
        item.classList.add('item');

        // close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fa-solid' , 'fa-xmark');
        closeIcon.setAttribute('title','Delete Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);


        // favicon 

        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');

        const favicon = document.createElement('img');
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);

        // links

        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank');
        link.textContent = name;

        // Append to bookmark continer

        linkInfo.append(favicon,link);
        item.append(closeIcon,linkInfo);
        bookmarkContainer.appendChild(item);
        
    })
}

// fatch bookmarks

function fatchBookmarks()
{
    // get if have it 
    if(localStorage.getItem('bookmarks'))
    {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    else
    {
        bookmarks = [
            {
                name:'google',
                url:'https://google.com',
            },
            
        ];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    buildBookmarks();
}

// delete bookmark

function deleteBookmark(url)
{
    bookmarks.forEach((bookmark,i)=>{
        if(bookmark.url === url)
        {
            bookmarks.splice(i,1);
        }
    });
    // update bookmarks array in localstorgae
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fatchBookmarks();
    
}

// handel data form

function storeBookmark(e)
{
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue  = websiteUrlEl.value;
    if(!urlValue.includes('http://' ,'https://'))
    {
        urlValue = `https://${urlValue}`;
    }
    if(!validate(nameValue,urlValue))
    {
        return false;
    }

    const bookmark = {
        name:nameValue,
        url:urlValue
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fatchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}
// event listener

bookmarkForm.addEventListener('submit',storeBookmark);

// on load 

fatchBookmarks();