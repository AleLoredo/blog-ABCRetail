const btnLike = document.getElementById('btnLike');
const btnDislike = document.getElementById('btnDislike');
const likeCounter = document.getElementById('like-counter');
const dislikeCounter = document.getElementById('dislike-counter');

let likeCount = 0;
let dislikeCount = 0;

btnLike.addEventListener('click', () => {
    likeCount++;
    likeCounter.textContent = likeCount;
});
  
  btnDislike.addEventListener('click', () => {
    dislikeCount++;
    dislikeCounter.textContent = dislikeCount;
});