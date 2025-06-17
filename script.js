// Voyagoo - Moroccan Travel Website JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }



















    // Trip Planner Functionality
    const cityData = {
        "Casablanca": {
          activity: "Visit Hassan II Mosque",
          food: "Seafood Bastilla",
          pack: "Smart casual clothes, comfortable shoes"
        },
        "Fes": {
          activity: "Explore the Medina of Fes",
          food: "Pastilla",
          pack: "Comfortable walking shoes, sunhat"
        },
        "Chefchaouen": {
          activity: "Wander the blue streets",
          food: "Tagine",
          pack: "Camera, sunscreen"
        },
        "Sahara Desert": {
          activity: "Camel trek and desert camp",
          food: "Mechoui",
          pack: "Layered clothes, scarf, sunglasses"
        },
        "Marrakech": {
          activity: "Visit Jardin Majorelle",
          food: "Tanjia",
          pack: "Light clothes, sunhat"
        },
        "Rabat": {
          activity: "Tour the Kasbah of the Udayas",
          food: "Harira soup",
          pack: "Comfortable shoes, light jacket"
        },
        "Agadir": {
          activity: "Relax at the beach",
          food: "Fresh grilled sardines",
          pack: "Beachwear, flip flops"
        },
        "Tangier": {
          activity: "Explore the medina and Caves of Hercules",
          food: "Couscous with vegetables",
          pack: "Comfortable shoes, light jacket"
        }
      };
    
      const form = document.getElementById('plannerForm');
      const itineraryResult = document.getElementById('itineraryResult');
      const itineraryDays = document.getElementById('itineraryDays');
    
      form.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const selectedCities = Array.from(document.getElementById('citySelect').selectedOptions).map(option => option.value);
        const numDays = parseInt(document.getElementById('numDays').value);
    
        if (selectedCities.length === 0) {
          alert("Please select at least one city.");
          return;
        }
        if (isNaN(numDays) || numDays < 1) {
          alert("Please enter a valid number of days.");
          return;
        }
    
        let itineraryHTML = "";
        for (let day = 1; day <= numDays; day++) {
          const city = selectedCities[(day - 1) % selectedCities.length];
          const data = cityData[city];
          itineraryHTML += `
            <div class="day-item">
              <h3>Day ${day}: ${city}</h3>
              <p><strong>Activities:</strong> ${data.activity}</p>
              <p><strong>Food to Try:</strong> ${data.food}</p>
              <p><strong>What to Pack:</strong> ${data.pack}</p>
            </div>
          `;
        }
    
        itineraryDays.innerHTML = itineraryHTML;
        itineraryResult.style.display = "block";
        window.scrollTo({ top: itineraryResult.offsetTop - 20, behavior: 'smooth' });
      });
      
      
      
      function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 40.7128, lng: -74.0060 },
          zoom: 13,
        });
  
        const service = new google.maps.places.PlacesService(map);
        const request = {
          query: 'restaurants',
          fields: ['name', 'geometry'],
        };
  
        service.textSearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
              new google.maps.Marker({
                position: results[i].geometry.location,
                map: map,
                title: results[i].name,
              });
            }
          }
        });
      }












  
    // voting quize
    document.addEventListener("DOMContentLoaded", () => {
        const voteButtons = document.querySelectorAll('.vote-btn');
  
        voteButtons.forEach(button => {
          const voteCountEl = button.querySelector('.vote-count');
          const voteKey = `vote-${button.dataset.id}`;
  
          // Check if already voted
          if (localStorage.getItem(voteKey) === 'voted') {
            button.classList.add('voted');
          }
  
          button.addEventListener('click', function () {
            let voteCount = parseInt(voteCountEl.textContent);
  
            if (button.classList.contains('voted')) {
              voteCount--;
              button.classList.remove('voted');
              localStorage.removeItem(voteKey);
            } else {
              voteCount++;
              button.classList.add('voted');
              localStorage.setItem(voteKey, 'voted');
            }
  
            voteCountEl.textContent = voteCount;
  
            // Animation
            voteCountEl.classList.add('vote-animation');
            setTimeout(() => {
              voteCountEl.classList.remove('vote-animation');
            }, 300);
          });
        });
      });

  

    

    // Downloadable Content Flip Effect
    const downloadCards = document.querySelectorAll('.download-card');
    
    if (downloadCards.length) {
        downloadCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.querySelector('.download-card-inner').style.transform = 'rotateY(180deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.querySelector('.download-card-inner').style.transform = 'rotateY(0)';
            });
        });
    }

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('nav a, .hero-content a');
    
    if (navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Check if link is to a section on the page
                const targetId = this.getAttribute('href');
                
                if (targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Close mobile menu if open
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            hamburger.classList.remove('active');
                        }
                        
                        // Scroll to section
                        targetSection.scrollIntoView({behavior: 'smooth'});
                    }
                }
            });
        });
    }

    // Scroll Animation for Elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length) {
        // Add fade-in class when elements enter viewport
        window.addEventListener('scroll', function() {
            fadeElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.classList.add('visible');
                }
            });
        });
        
        // Trigger scroll event once to check for elements already in viewport
        window.dispatchEvent(new Event('scroll'));
    }
});






// Helper Functions
const activities = {
    'Fes': ['Visit the ancient Medina', 'Explore the Al-Attarine Madrasa', 'Shop at the tanneries', 'Try traditional Fassi cuisine'],
    'Chefchaouen': ['Wander the blue streets', 'Hike to the Spanish Mosque', 'Shop for local handicrafts', 'Relax in Plaza Uta el-Hammam'],
    'Sahara': ['Camel trek at sunset', 'Overnight in a desert camp', 'Stargazing', 'Sandboarding'],
    'Marrakech': ['Explore Jemaa el-Fnaa', 'Visit Bahia Palace', 'Tour the Majorelle Garden', 'Shop in the souks'],
    'Casablanca': ['Visit Hassan II Mosque', 'Stroll along La Corniche', 'Explore the Old Medina', 'Visit Mohammed V Square'],
    'Rabat': ['Visit the Kasbah of the Udayas', 'Explore Chellah Necropolis', 'See Hassan Tower', 'Wander the Medina'],
    'Agadir': ['Relax on Agadir Beach', 'Visit the Kasbah', 'Shop at Souk El Had', 'Try surfing'],
    'Tanger': ['Walk the Kasbah', 'Visit the Caves of Hercules', 'Explore the American Legation Museum', 'Stroll through the medina']
  };

  const food = {
    'Fes': ['Pastilla', 'Fassi Harira Soup', 'Zaalouk'],
    'Chefchaouen': ['Goat Cheese', 'Tagine with preserved lemons', 'Mint Tea'],
    'Sahara': ['Medfouna (Berber Pizza)', 'Lamb Mechoui', 'Dates'],
    'Marrakech': ['Tangia', 'Couscous', 'Orange Juice'],
    'Casablanca': ['Seafood Bastilla', 'Harira', 'Mint Tea'],
    'Rabat': ['Moroccan Sardines', 'Rfissa', 'Almond Briwat'],
    'Agadir': ['Grilled Fish', 'Berber Tagine', 'Fresh Juices'],
    'Tanger': ['Bissara', 'Seafood Tagine', 'Mint Tea']
  };

  const clothing = {
    'Fes': ['Comfortable walking shoes', 'Light layers', 'Head covering for religious sites'],
    'Chefchaouen': ['Walking shoes', 'Camera', 'Light jacket for evenings'],
    'Sahara': ['Sun hat', 'Sunglasses', 'Scarf for sand', 'Warm clothes for night'],
    'Marrakech': ['Breathable clothing', 'Sun protection', 'Modest attire for medina'],
    'Casablanca': ['Smart casual attire', 'Light jacket', 'Comfortable shoes'],
    'Rabat': ['Light layers', 'Comfortable walking shoes', 'Sun protection'],
    'Agadir': ['Beachwear', 'Light clothing', 'Flip flops'],
    'Tanger': ['Casual chic', 'Walking shoes', 'Light sweater for evenings']
  };

  function showPackingList() {
    const selectedCities = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
    const days = parseInt(document.getElementById('daysInput').value);
    const output = document.getElementById('packingOutput');
    output.innerHTML = `<h3>Your packing list for ${days} day(s) in: ${selectedCities.join(', ')}</h3>`;

    selectedCities.forEach(city => {
      const cityBlock = document.createElement('div');
      cityBlock.innerHTML = `<h4>${city}</h4>`;

      if (activities[city]) {
        const ul = document.createElement('ul');
        ul.innerHTML = `<strong>Activities:</strong>` + activities[city].map(a => `<li>${a}</li>`).join('');
        cityBlock.appendChild(ul);
      }

      if (food[city]) {
        const ul = document.createElement('ul');
        ul.innerHTML = `<strong>Food to Try:</strong>` + food[city].map(f => `<li>${f}</li>`).join('');
        cityBlock.appendChild(ul);
      }

      if (clothing[city]) {
        const ul = document.createElement('ul');
        ul.innerHTML = `<strong>Clothing Suggestions:</strong>` + clothing[city].map(c => `<li>${c}</li>`).join('');
        cityBlock.appendChild(ul);
      }

      output.appendChild(cityBlock);
    });
  }





// Get Quiz Result
document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitQuiz");
    const retakeBtn = document.getElementById("retakeBtn");
    const quizSection = document.getElementById("quiz");
    const resultBox = quizSection.querySelector(".quiz-result");
    const quizQuestions = quizSection.querySelectorAll(".quiz-question");
    const resultTitle = document.getElementById("resultTitle");
    const resultImage = document.getElementById("resultImage");
    const resultDescription = document.getElementById("resultDescription");
  
    const getQuizResult = (selection) => {
      const key = selection.replace(/[0-9]/g, '');
  
      const results = {
        'tajine': {
          title: 'You are a Moroccan Tajine!',
          description: 'You are patient, warm, and bring people together.',
          image: 'https://public.youware.com/users-website-assets/prod/6617000a-0003-4406-a25d-516aa675a951/ai-generated-8999592_1280.png'
        },
        'couscous': {
          title: 'You are Moroccan Couscous!',
          description: 'Versatile and loved by all, you bring harmony.',
          image: 'https://public.youware.com/users-website-assets/prod/6617000a-0003-4406-a25d-516aa675a951/lamb-4506612_1280.jpg'
        },
        'mintTea': {
          title: 'You are Moroccan Mint Tea!',
          description: 'You’re refreshing, energetic, and super welcoming.',
          image: 'https://public.youware.com/users-website-assets/prod/6617000a-0003-4406-a25d-516aa675a951/moroccan-mint-2396530_1280.jpg'
        },
        'pastilla': {
          title: 'You are Moroccan Pastilla!',
          description: 'A surprising mix, you’re both sweet and bold.',
          image: 'https://public.youware.com/users-website-assets/prod/6617000a-0003-4406-a25d-516aa675a951/morocco-5271734_1280.jpg'
        }
      };
  
      return results[key] || results['tajine'];
    };
  
    // Handle option selection per question
    document.querySelectorAll(".quiz-options").forEach(optionGroup => {
      const options = optionGroup.querySelectorAll(".quiz-option");
      options.forEach(option => {
        option.addEventListener("click", () => {
          options.forEach(opt => opt.classList.remove("selected"));
          option.classList.add("selected");
        });
      });
    });
  
    // Submit quiz and show results
    submitBtn.addEventListener("click", () => {
      let selections = [];
      quizQuestions.forEach(q => {
        const selected = q.querySelector(".quiz-option.selected");
        if (selected) selections.push(selected.getAttribute("data-value"));
      });
  
      if (selections.length !== quizQuestions.length) {
        alert("Please answer all the questions!");
        return;
      }
  
      // Count frequency of each answer type (without trailing numbers)
      const counted = {};
      selections.forEach(s => {
        const key = s.replace(/[0-9]/g, '');
        counted[key] = (counted[key] || 0) + 1;
      });
  
      // Get the most frequent answer
      const result = Object.entries(counted).sort((a, b) => b[1] - a[1])[0][0];
      const quizResult = getQuizResult(result);
  
      // Show result
      resultTitle.textContent = quizResult.title;
      resultImage.src = quizResult.image;
      resultDescription.textContent = quizResult.description;
  
      resultBox.style.display = "block";
      quizQuestions.forEach(q => q.style.display = "none");
      submitBtn.style.display = "none";
    });
  
    // Retake quiz logic
    retakeBtn.addEventListener("click", () => {
      resultBox.style.display = "none";
      quizQuestions.forEach(q => q.style.display = "block");
      submitBtn.style.display = "inline-block";
  
      document.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
    });
  });
  



// Download Content (for Postcards and Wallpapers)
function downloadContent(contentUrl, fileName) {
    const a = document.createElement('a');
    a.href = contentUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
    }, 100);
}


document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

