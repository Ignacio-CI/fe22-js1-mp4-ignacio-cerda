const container = document.querySelector('#anime-container');

// Det här skapar en 5x5 matrix av fyrkanter. 
// Jag la till width och height i en variabel för att ha mer control så kan man ändra dem om skärmen är förstor eller förliten.
for(let i=0; i<5; i++){
    for(let j=0; j<5; j++){
        let width = 48;
        let height = 48;
        // skapa mellanrum mellan fyrkanterna
        let gap = 20;
        let x = 8 + (width + gap) * i;
        let y = 8 + (height + gap) * j;

        const squareLarge = document.createElement('div');
        squareLarge.setAttribute('id', 'sqr-large');
        squareLarge.style.width = `${width}px`;
        squareLarge.style.height = `${height}px`;
        squareLarge.style.border = '2px solid white';
        squareLarge.style.borderRadius = '50%';
        squareLarge.style.position = 'absolute';
        squareLarge.style.translate = `${x}px ${y}px`;
        container.appendChild(squareLarge);
        
        // skapa random små fyrkanter inuti de stora fyrkanter. 
        // De skapas varje gång lopparna kör (25 gånger totalt) men skapas bara om Math.random är större än 0.5.
        // Varje gång man uppdaterar browsern kommer ett nytt random nummer mellan 0 och 1. 
        // Detta gör att de små fyrkanter skapas varje gång på random platser. 
        
        if(Math.random() > 0.5){
        const squareSmall = document.createElement('div');
        squareSmall.setAttribute('id', 'sqr-small');
        squareSmall.style.width = `${width - 16}px`;
        squareSmall.style.height = `${height - 16}px`;
        squareSmall.style.border = '2px solid white';
        squareSmall.style.position = 'absolute';
        squareSmall.style.translate = `${x + 8}px ${y + 8}px`;
        container.appendChild(squareSmall);
        }        
    }   
}

// Skapa en animation för de stora fyrkanterna. 
const squareLgAnimation = {
    targets: '#sqr-large',
    scale: [
        {value: .1, easing: 'easeOutSine', duration: 500},
        {value: 1, easing: 'easeInOutQuad', duration: 1200}
      ],
    delay: anime.stagger(200, {grid: [25, 5], from: 'center'}),
    borderRadius: '8%',
    border: `2px solid hsl(${anime.random(0,360)}, 80%, 80%)`,
    duration: 5000,
    direction: 'alternate',
    autoplay: false,
    loop: true   
}

// Skapa en animation för de småa fyrkanterna.
const squareSmAnimation = {
    targets: '#sqr-small',
    rotateZ: anime.stagger([0, 90], {grid: [25, 5], from: 'center', axis: 'x'}),
    delay: anime.stagger(200),
    scale: 1.1,
    duration: 5000,
    borderRadius: '8%',
    direction: 'alternate',
    autoplay: false,
    loop: true
}

const squareLg = anime(squareLgAnimation);
const squareSm = anime(squareSmAnimation);

// kontrollknappar (play, pause, stop och change)
const playBtn = document.querySelector('#play');
playBtn.addEventListener('click', squareLg.play);
playBtn.addEventListener('click', squareSm.play);

const pauseBtn = document.querySelector('#pause');
pauseBtn.addEventListener('click', squareLg.pause);
pauseBtn.addEventListener('click', squareSm.pause);

const stopBtn = document.querySelector('#stop');
stopBtn.addEventListener('click', () => {
    squareLg.restart();
    squareLg.pause();
    squareSm.restart();
    squareSm.pause();
});

// changeBtn gör att man kan uppdatera browsern genom location.reload funtionen.
// Varje gån man klickar så kommer ett nytt random nummer och därmed små fyrkanter på random platser i matrixen.
const changeBtn = document.querySelector('#change')
changeBtn.addEventListener('click', () => location.reload())
