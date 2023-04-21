const API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxx';
const submitIcon = document.querySelector('#submit-icon');
const inputElement = document.querySelector('input');
const imageSection = document.querySelector('.images-section');
const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');



const fetchImages = async () => {

    try {
        loader.style.display = "inline";
        submitIcon.style.pointerEvents = "none";
        
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
    
            },
            body: JSON.stringify({
                "prompt": inputElement.value,
                "n": 4,
                "size": "1024x1024",
            })
        });
        const data = await response.json();
        console.log(data);
        imageContainer?.remove();
        loader.style.display = "none";
        data?.data.forEach(images => {
            const imgContainer = document.createElement('div');
            
            imgContainer.classList.add('image-container');
            const imageElement = document.createElement('img');
            imageElement.setAttribute('src', images.url);

            imgContainer.append(imageElement);

            imageSection.append(imgContainer);
            
        });
        submitIcon.style.pointerEvents = "auto";

    } catch (error) {
        console.log(error);
    }


}

submitIcon.addEventListener('click', fetchImages);

document.addEventListener("DOMContentLoaded", () => {
    loader.style.display = "none";
  });
