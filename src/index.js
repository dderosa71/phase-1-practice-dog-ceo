console.log('%c HI', 'color: firebrick')

const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogImgUrl = "https://dog.ceo/api/breeds/image/random/4"

document.addEventListener('DOMContentLoaded', () => {
    fetch(dogImgUrl)
        .then(resp => resp.json())
        .then(resp => {
            const imageLinks = Object.values(resp.message);
            imageLinks.forEach(link => createImage(link))
        })
    fetch(breedUrl)
        .then(resp => resp.json())
        .then(obj => {
            const breeds = Object.keys(obj.message)
            breeds.forEach(breed => addDogBreeds(breed)
            )
        })
   
    const breedDropdown = document.querySelector('#breed-dropdown')
    
    breedDropdown.addEventListener('change', e => {
        const liNodeList = document.querySelectorAll('li')
        let liArray = liNodeList.values()
        const filterSelection = breedDropdown.options[breedDropdown.selectedIndex].text;
        liNodeList.forEach(item => dropdownFilter(filterSelection, item))    
    })
})

//Creates all the images
function createImage(link) {
    const imageContainter = document.querySelector('#dog-image-container');
    const img = document.createElement('img');
    img.setAttribute('src', `${link}`)
    imageContainter.appendChild(img)
}
//Create list of breeds
function addDogBreeds(breed) {
    const breedList = document.querySelector('#dog-breeds');
    li = document.createElement('li');
    li.innerText = `${breed}`;
    breedList.appendChild(li)

    //Updates style if li is clicked to update the color
    const newLi = document.querySelector('ul :last-child');
    newLi.addEventListener('click', (e) => e.target.style.color = 'red')
}
//Filter on list
function dropdownFilter(filterSelection, liBreedElement){
    const firstLetterOfBreed = liBreedElement.innerText[0]
    console.log(filterSelection, firstLetterOfBreed)
    if (filterSelection === firstLetterOfBreed) {
        liBreedElement.style.display = 'none'
        console.log('hideme')
    }else{
        liBreedElement.style.display = 'block'
        console.log('leave me')
    }
}