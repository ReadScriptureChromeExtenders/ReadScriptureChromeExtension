const CHAPTER = document.getElementById('chapter');
const VERSE = document.getElementById('verse');

const getExodus = () => {
  fetch('http://app.readscripture.org/api/exodus.json')
  .then(res => res.json())
  .then(bookText => {
    console.log(bookText);
    CHAPTER.textContent = bookText.book + bookText.chapters[0].chapterNum;
    verseArray = bookText.chapters[0].verses.map(verseObj => verseObj.chardata);
    VERSE.textContent = verseArray.join(' ');
  }).catch(err => console.error(err))
}

getExodus();