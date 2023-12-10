const API_KEY="45ab46f4c6154041b91948b614f0301e";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    bindData(data.articles);
}
function reload(){
    window.location.reload(); 
}
function bindData(articles){
    const cardContainer=document.getElementById('card-container');
    const newsCardTemplate=document.getElementById('template-news-card');


    cardContainer.innerHTML="";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
        
    });
}

function  fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    
    const newsSource=cardClone.querySelector('#news-source');
    const newsDes=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDes.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // click karne per open new page and news
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });

}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id); 
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');

}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;

})